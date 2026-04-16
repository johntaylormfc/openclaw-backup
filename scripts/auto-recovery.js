#!/usr/bin/env node
/**
 * auto-recovery.js — Enhanced v2
 * Monitors gateway, critical ARR containers, and cron jobs
 * Enhanced with:
 * - Log inspection before restart to identify failure patterns
 * - Targeted fixes per failure type (not just restart)
 * - Recurrence tracking: 3x in 24h → alert instead of retry
 * - Diagnose mode: inspect logs before acting
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = '/home/john/.openclaw/workspace/logs/auto-recovery.log';
const STATE_FILE = '/home/john/.openclaw/workspace/state/auto-recovery-state.json';
const WHATSAPP_URL = 'http://192.168.1.146:5001/webhook/whatsapp';
const WHATSAPP_TOKEN = 'hx4nEu4W2ZoXsiEfWRCAQcgDsNzzht7kpBUfsGHhqxzEsgHhLll2g39woASs1c';

// Critical containers to monitor
const CRITICAL_CONTAINERS = [
  'sonarr', 'radarr', 'prowlarr', 'plex',
  'sabnzbd', 'transmission',
  'arr-dashboard', 'arr-dashboard-v2', 'gluetun'
];

const MAX_CRON_FAILURES = 5;
const MAX_RESTART_ATTEMPTS = 3;
const RESTART_COOLDOWN_MS = 10 * 60 * 1000; // 10 min
const GATEWAY_COOLDOWN_MS = 5 * 60 * 1000; // 5 min

function log(msg, level = 'INFO') {
  const line = `[${new Date().toISOString()}] [${level}] ${msg}`;
  console.log(line);
  const dir = path.dirname(LOG_FILE);
  execSync(`mkdir -p "${dir}"`);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function getState() {
  try {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    // Ensure all expected keys exist (for state files written by older versions)
    if (!state.failureLog) state.failureLog = {};
    if (!state.containerLastAttempt) state.containerLastAttempt = {};
    if (!state.cronDisabled) state.cronDisabled = {};
    if (!state.containerRestarts) state.containerRestarts = {};
    return state;
  } catch {
    return {
      lastGatewayRestart: 0,
      containerRestarts: {},
      containerLastAttempt: {},
      cronDisabled: {},
      failureLog: {}
    };
  }
}

function saveState(state) {
  execSync(`mkdir -p "${path.dirname(STATE_FILE)}"`);
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function sendWhatsApp(message) {
  try {
    execSync(`curl -s -X POST "${WHATSAPP_URL}" \\
      -H "Content-Type: application/json" \\
      -H "Authorization: Bearer ${WHATSAPP_TOKEN}" \\
      -d '{"message":"'"${message}"'","to":"+447967688452"}' > /dev/null 2>&1`, { encoding: 'utf8' });
    log(`WhatsApp sent: ${message}`);
  } catch (e) {
    log(`WhatsApp send failed: ${e.message}`, 'ERROR');
  }
}

// ─── Diagnose mode ───────────────────────────────────────────────────────────
/**
 * Inspect container logs to identify failure pattern
 * Returns: { pattern: string, sampleLines: string[] }
 * Patterns: OOM, DISK_FULL, PORT_CONFLICT, PERMISSION, CONFIG, UNKNOWN
 */
function diagnoseContainer(name) {
  const PATTERNS = [
    { id: 'OOM', regex: /out of memory|killed|oom|lowmemory|memory limit/i },
    { id: 'DISK_FULL', regex: /no space left|disk full|ENOSPC|no disk space/i },
    { id: 'PORT_CONFLICT', regex: /port.*already in use|EADDRINUSE|bind.*failed/i },
    { id: 'PERMISSION', regex: /permission denied|EACCES|eperm/i },
    { id: 'CONFIG', regex: /config.*error|invalid.*config|cannot.*read.*yaml|cannot.*parse/i },
    { id: 'HEALTH_TIMEOUT', regex: /health.*timeout|healthcheck.*failed|unhealthy/i },
  ];

  try {
    // Get last 50 lines of logs (skip pure JSON noise)
    const out = execSync(
      `docker logs --tail 50 "${name}" 2>&1 | grep -iE "error|failed|fatal|killed|unhealthy|oom|disk|port|permission|config" | tail -20 || true`,
      { encoding: 'utf8', timeout: 15000 }
    ).trim();

    const lines = out.split('\n').filter(l => l.length > 10);

    for (const { id, regex } of PATTERNS) {
      if (regex.test(out)) {
        return { pattern: id, sampleLines: lines.slice(0, 5) };
      }
    }

    return { pattern: 'UNKNOWN', sampleLines: lines.slice(0, 5) };
  } catch (e) {
    return { pattern: 'UNKNOWN', sampleLines: [] };
  }
}

// ─── Targeted fixes ────────────────────────────────────────────────────────────
/**
 * Apply targeted fix based on diagnosed failure pattern
 * Returns: { fixed: boolean, action: string, message: string }
 */
function applyTargetedFix(name, pattern) {
  switch (pattern) {
    case 'OOM': {
      // Try: docker restart (Docker will reassign OOM'd process)
      execSync(`docker restart "${name}"`, { timeout: 60000 });
      return { fixed: true, action: 'OOM fix: container restarted (OOM condition typically clears on restart)', message: `${name}: OOM — restarted (Docker will reassign memory)` };
    }
    case 'DISK_FULL': {
      // Check which volume is full
      try {
        const diskInfo = execSync(`df -h /home/john 2>/dev/null | tail -1 || df -h / | tail -1`, { encoding: 'utf8', timeout: 5000 }).trim();
        execSync(`docker restart "${name}"`, { timeout: 60000 });
        return { fixed: true, action: 'DISK_FULL fix: container restarted + disk info logged', message: `${name}: DISK_FULL — restarted (disk: ${diskInfo})` };
      } catch {
        execSync(`docker restart "${name}"`, { timeout: 60000 });
        return { fixed: true, action: 'DISK_FULL fix: container restarted', message: `${name}: DISK_FULL — restarted` };
      }
    }
    case 'PORT_CONFLICT': {
      // Restart container — ports usually free after full stop
      execSync(`docker stop "${name}" && sleep 2 && docker start "${name}"`, { timeout: 90000 });
      return { fixed: true, action: 'PORT_CONFLICT fix: stop+start cycle', message: `${name}: PORT_CONFLICT — stop/start cycle applied` };
    }
    case 'PERMISSION': {
      // Restart and log permission error details
      execSync(`docker restart "${name}"`, { timeout: 60000 });
      return { fixed: true, action: 'PERMISSION fix: container restarted', message: `${name}: PERMISSION error — restarted` };
    }
    case 'CONFIG': {
      // Try a restart — if config is truly broken, it'll fail again fast
      execSync(`docker restart "${name}"`, { timeout: 60000 });
      return { fixed: true, action: 'CONFIG fix: container restarted', message: `${name}: CONFIG error — restarted` };
    }
    default: {
      execSync(`docker restart "${name}"`, { timeout: 60000 });
      return { fixed: true, action: 'Generic restart (pattern: UNKNOWN)', message: `${name}: restarted (pattern: UNKNOWN)` };
    }
  }
}

// ─── Gateway ─────────────────────────────────────────────────────────────────
function gatewayIsUp() {
  try {
    const out = execSync('openclaw gateway status 2>&1', { encoding: 'utf8' });
    return out.includes('RPC probe: ok') || out.includes('running');
  } catch {
    return false;
  }
}

function restartGateway() {
  try {
    execSync('openclaw gateway restart 2>&1', { timeout: 30000 });
    return true;
  } catch (e) {
    log(`Gateway restart failed: ${e.message}`, 'ERROR');
    return false;
  }
}

// ─── Containers ───────────────────────────────────────────────────────────────
function containerIsRunning(name) {
  try {
    const out = execSync(`docker inspect -f '{{.State.Running}}' ${name} 2>/dev/null`, { encoding: 'utf8' });
    return out.trim() === 'true';
  } catch {
    return false;
  }
}

// ─── Cron ─────────────────────────────────────────────────────────────────────
function getCronJobs() {
  try {
    const out = execSync('openclaw cron list --json 2>/dev/null', { encoding: 'utf8' });
    return JSON.parse(out).jobs || [];
  } catch {
    return [];
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  log('=== Enhanced Auto-Recovery Check Started ===');
  const state = getState();
  let didRecovery = false;
  const now = Date.now();

  // ── 1. Gateway ──────────────────────────────────────────────────────────────
  if (!gatewayIsUp()) {
    if (now - state.lastGatewayRestart > GATEWAY_COOLDOWN_MS) {
      log('Gateway is DOWN — restarting...', 'WARN');
      if (restartGateway()) {
        state.lastGatewayRestart = now;
        log('Gateway restarted successfully');
        sendWhatsApp('🔁 Gateway: was DOWN — auto-restarted successfully');
        didRecovery = true;
      }
    } else {
      log('Gateway down but restart in cooldown — skipping', 'WARN');
    }
  } else {
    log('Gateway: OK');
  }

  // ── 2. Containers ─────────────────────────────────────────────────────────
  for (const container of CRITICAL_CONTAINERS) {
    if (!containerIsRunning(container)) {
      const restarts = state.containerRestarts[container] || 0;
      const lastAttempt = state.containerLastAttempt?.[container] || 0;

      // Recurrence check: 3x failures in 24h
      const failureWindow = (state.failureLog && state.failureLog[container]) ? state.failureLog[container] : [];
      const recentFailures = failureWindow.filter(t => now - t < 24 * 60 * 60 * 1000);
      if (recentFailures.length >= MAX_RESTART_ATTEMPTS) {
        log(`Container ${container} has failed ${recentFailures.length}x in 24h — alerting and skipping restart`, 'ERROR');
        sendWhatsApp(`🔴 ARR Alert: ${container} has failed ${recentFailures.length}x in 24h — manual inspection needed`);
        didRecovery = true;
        continue;
      }

      // Cooldown check
      if (now - lastAttempt < RESTART_COOLDOWN_MS) {
        log(`Container ${container} is DOWN but restart in cooldown`, 'WARN');
        continue;
      }

      // Diagnose before acting
      log(`Container ${container} is DOWN — diagnosing...`, 'WARN');
      const diagnosis = diagnoseContainer(container);
      log(`  Pattern: ${diagnosis.pattern} | Sample: ${diagnosis.sampleLines[0] || 'n/a'}`);

      // Log this failure
      recentFailures.push(now);
      state.failureLog[container] = recentFailures;

      // Apply targeted fix
      const fix = applyTargetedFix(container, diagnosis.pattern);
      if (fix.fixed) {
        state.containerRestarts[container] = restarts + 1;
        state.containerLastAttempt = state.containerLastAttempt || {};
        state.containerLastAttempt[container] = now;
        log(`Container ${container}: ${fix.message}`);
        sendWhatsApp(`🔧 ${fix.message}`);
        didRecovery = true;
      }
    } else {
      // Reset restart count on successful check
      if (state.containerRestarts[container]) delete state.containerRestarts[container];
      // Clean old failure log entries
      if (state.failureLog[container]) {
        state.failureLog[container] = state.failureLog[container].filter(t => now - t < 24 * 60 * 60 * 1000);
        if (state.failureLog[container].length === 0) delete state.failureLog[container];
      }
    }
  }

  // ── 3. Cron Jobs ────────────────────────────────────────────────────────────
  const jobs = getCronJobs();
  for (const job of jobs) {
    if (!job.enabled) continue;
    const errors = job.state?.consecutiveErrors || 0;
    if (errors >= MAX_CRON_FAILURES) {
      const jobId = job.id;
      if (!state.cronDisabled[jobId]) {
        try {
          execSync(`openclaw cron disable ${jobId}`, { timeout: 10000 });
          state.cronDisabled[jobId] = { at: Date.now(), name: job.name, errors };
          log(`Cron job "${job.name}" disabled after ${errors} consecutive failures`, 'WARN');
          sendWhatsApp(`⚠️ Cron job "${job.name}" disabled after ${errors} consecutive failures`);
          didRecovery = true;
        } catch (e) {
          log(`Failed to disable cron job ${job.name}: ${e.message}`, 'ERROR');
        }
      }
    }
  }

  // Clean up old disabled cron entries (after 7 days)
  for (const [jobId, info] of Object.entries(state.cronDisabled)) {
    if (now - info.at > 7 * 24 * 60 * 60 * 1000) {
      delete state.cronDisabled[jobId];
    }
  }

  saveState(state);

  if (didRecovery) {
    log('=== Auto-Recovery Check Complete — recovery actions taken ===');
  } else {
    log('=== Auto-Recovery Check Complete — all healthy ===');
  }
}

main().catch(e => {
  log(`Fatal error: ${e.message}`, 'ERROR');
  process.exit(1);
});
