#!/usr/bin/env node
/**
 * auto-recovery.js
 * Monitors OpenClaw gateway, critical ARR containers, and cron jobs
 * Auto-restarts if something is down/failing
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = '/home/john/.openclaw/workspace/logs/auto-recovery.log';
const STATE_FILE = '/home/john/.openclaw/workspace/state/auto-recovery-state.json';

// Critical containers to monitor (ARR stack core)
const CRITICAL_CONTAINERS = [
  'sonarr', 'radarr', 'prowlarr', 'plex',
  'sabnzbd', 'transmission',
  'arr-dashboard', 'arr-dashboard-v2', 'gluetun'
];

// Max consecutive failures before disabling a cron job
const MAX_CRON_FAILURES = 5;

function log(msg, level = 'INFO') {
  const line = `[${new Date().toISOString()}] [${level}] ${msg}`;
  console.log(line);
  const dir = path.dirname(LOG_FILE);
  execSync(`mkdir -p "${dir}"`);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function getState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { lastGatewayRestart: 0, containerRestarts: {}, cronDisabled: {} };
  }
}

function saveState(state) {
  execSync(`mkdir -p "${path.dirname(STATE_FILE)}"`);
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

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

function containerIsRunning(name) {
  try {
    const out = execSync(`docker inspect -f '{{.State.Running}}' ${name} 2>/dev/null`, { encoding: 'utf8' });
    return out.trim() === 'true';
  } catch {
    return false;
  }
}

function restartContainer(name) {
  try {
    execSync(`docker restart ${name}`, { timeout: 60000 });
    return true;
  } catch (e) {
    log(`Container restart failed: ${name} — ${e.message}`, 'ERROR');
    return false;
  }
}

function getCronJobs() {
  try {
    const out = execSync('openclaw cron list --json 2>/dev/null', { encoding: 'utf8' });
    return JSON.parse(out).jobs || [];
  } catch {
    return [];
  }
}

async function main() {
  log('=== Auto-Recovery Check Started ===');
  const state = getState();
  let didRecovery = false;

  // 1. Check Gateway
  if (!gatewayIsUp()) {
    const lastRestart = state.lastGatewayRestart || 0;
    const now = Date.now();
    const cooldown = 5 * 60 * 1000; // 5 min cooldown between gateway restarts

    if (now - lastRestart > cooldown) {
      log('Gateway is DOWN — restarting...', 'WARN');
      if (restartGateway()) {
        state.lastGatewayRestart = now;
        log('Gateway restarted successfully');
        didRecovery = true;
      }
    } else {
      log('Gateway down but restart in cooldown — skipping', 'WARN');
    }
  } else {
    log('Gateway: OK');
  }

  // 2. Check Critical Containers
  for (const container of CRITICAL_CONTAINERS) {
    if (!containerIsRunning(container)) {
      const restarts = state.containerRestarts[container] || 0;
      const lastAttempt = state.containerLastAttempt?.[container] || 0;
      const now = Date.now();
      const cooldown = 10 * 60 * 1000; // 10 min cooldown

      if (restarts >= 3) {
        log(`Container ${container} has failed 3 times — skipping further attempts`, 'ERROR');
        continue;
      }

      if (now - lastAttempt < cooldown) {
        log(`Container ${container} is DOWN but restart in cooldown`, 'WARN');
        continue;
      }

      log(`Container ${container} is DOWN — restarting...`, 'WARN');
      if (restartContainer(container)) {
        state.containerRestarts[container] = restarts + 1;
        state.containerLastAttempt = state.containerLastAttempt || {};
        state.containerLastAttempt[container] = now;
        log(`Container ${container} restarted successfully`);
        didRecovery = true;
      }
    } else {
      // Reset restart count on successful check
      if (state.containerRestarts[container]) {
        delete state.containerRestarts[container];
      }
    }
  }

  // 3. Check Cron Jobs — disable after MAX_CRON_FAILURES
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
          didRecovery = true;
        } catch (e) {
          log(`Failed to disable cron job ${job.name}: ${e.message}`, 'ERROR');
        }
      }
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
