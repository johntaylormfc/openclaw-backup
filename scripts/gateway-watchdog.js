#!/usr/bin/env node
/**
 * Gateway Watchdog v2
 * Checks gateway health via process presence + log activity, notifies on restart
 */

const fs = require('fs');
const { execSync } = require('child_process');

const GATEWAY_LOG = '/home/john/.hermes/logs/gateway.log';
const STATE_FILE = '/tmp/gateway-watchdog.state';
const MIN_UP_TIME_SEC = 60; // consider "up" if process has been running > 60s

function getGatewayPID() {
  try {
    // Use --oldest to get the real gateway process, not transient wrappers/subshells
    const out = execSync('pgrep --oldest -f "hermes_cli.main gateway"', { encoding: 'utf8' });
    return parseInt(out.trim(), 10);
  } catch (e) {
    return null;
  }
}

function getGatewayUptime() {
  try {
    const pid = getGatewayPID();
    if (!pid) return 0;
    
    // Get start time using ps with explicit format
    const out = execSync(`ps -p ${pid} -o lstart=`, { encoding: 'utf8' });
    const startStr = out.trim(); // e.g. "Mon Mar 30 17:13:15 2026"
    
    const startTime = new Date(startStr);
    if (Number.isNaN(startTime.getTime())) return 0;
    
    const now = Date.now();
    return Math.floor((now - startTime.getTime()) / 1000);
  } catch (e) {
    return 0;
  }
}

function getLogRecentError() {
  try {
    const log = fs.readFileSync(GATEWAY_LOG, 'utf8');
    const lines = log.trim().split('\n');
    const recent = lines.slice(-50);
    
    for (const line of recent) {
      if (line.includes('ERROR') && !line.includes('vision') && !line.includes('Telegram') && !line.includes('auth')) {
        return line;
      }
    }
    return null;
  } catch (e) {
    return 'Cannot read log';
  }
}

function isLogActive() {
  // Gateway is active if process is running (log mtime is secondary)
  const pid = getGatewayPID();
  if (!pid) return false;
  
  try {
    const stat = fs.statSync(GATEWAY_LOG);
    // Use mtimeMs directly - both Date.now() and stat.mtimeMs are UTC ms, timezone-neutral
    const ageSec = (Date.now() - stat.mtimeMs) / 1000;
    return ageSec < 900; // log touched in last 15 min
  } catch (e) {
    return false;
  }
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    return { lastUp: null, lastCheck: null, wasDown: false, notifiedRecovery: false };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
}

async function sendWhatsApp(message) {
  const { execSync } = require('child_process');
  try {
    const escaped = message.replace(/'/g, "'\\''");
    const cmd = `openclaw message send --channel whatsapp --target +447967688452 --message '${escaped}'`;
    const out = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
    return { status: 200, data: out.trim() };
  } catch (e) {
    const out = e.stdout || '';
    const err = e.stderr || '';
    if (out.includes('Sent via gateway') || out.includes('Message ID')) return { status: 200, data: out.trim() };
    return { status: 500, data: (out + ' ' + err).trim() || e.message };
  }
}

async function main() {
  const state = loadState();
  const now = Date.now();
  
  // Primary check: process uptime
  const uptime = getGatewayUptime();
  const processUp = uptime >= MIN_UP_TIME_SEC;
  
  // Secondary check: log is being actively written
  const logActive = isLogActive();
  
  // Combined status
  const isUp = processUp && logActive;
  
  console.log(`[watchdog] Gateway: ${isUp ? 'UP' : 'DOWN'} (uptime: ${uptime}s, log active: ${logActive})`);
  
  if (isUp) {
    if (state.wasDown && !state.notifiedRecovery) {
      // Gateway just came back up - notify!
      const downtime = state.lastCheck ? Math.round((now - state.lastCheck) / 1000) : '?';
      const recentError = getLogRecentError();
      
      let msg = `🦞 OpenClaw Gateway is back online\n\n`;
      if (state.downtimeSec) {
        msg += `- Down for ~${Math.floor(state.downtimeSec / 60)}m ${state.downtimeSec % 60}s\n`;
      }
      msg += `- Status: ${recentError ? 'OK (error was logged)' : 'OK'}\n`;
      msg += `- Time: ${new Date().toISOString()}`;
      
      console.log('[watchdog] Gateway restarted! Sending notification...');
      const result = await sendWhatsApp(msg);
      console.log('[watchdog] WhatsApp result:', result.status || result.error);
      
      state.notifiedRecovery = true;
    }
    state.lastUp = now;
    state.wasDown = false;
    state.notifiedRecovery = false;
  } else {
    // Process is down or starting up
    if (state.lastUp !== null && !state.wasDown) {
      // First time we detect it as down
      console.log('[watchdog] Gateway down detected, will notify on recovery...');
      state.wasDown = true;
      state.downtimeSec = state.lastUp ? Math.round((now - state.lastUp) / 1000) : 0;
    }
  }
  
  state.lastCheck = now;
  saveState(state);
}

main().catch(e => {
  console.error('[watchdog] Error:', e.message);
  process.exit(1);
});
