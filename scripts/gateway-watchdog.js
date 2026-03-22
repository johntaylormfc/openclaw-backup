#!/usr/bin/env node
/**
 * Gateway Watchdog
 * Checks gateway health and notifies on restart
 */

const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

const GATEWAY_URL = 'http://127.0.0.1:18789';
const STATE_FILE = '/tmp/gateway-watchdog.state';
const TOKEN = 'd3ba6ef8256497ca2e45253ded692f590dc32bcf9bed31bf';

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 5000 }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function checkGateway() {
  try {
    const { status, data } = await httpGet(`${GATEWAY_URL}/health`);
    if (status === 200) {
      const json = JSON.parse(data);
      return { up: json.status === 'live', status: json };
    }
    return { up: false, status: null };
  } catch(e) {
    return { up: false, status: null, error: e.message };
  }
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch(e) {
    return { lastUp: null, lastCheck: null, wasDown: false };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
}

async function sendWhatsApp(message) {
  try {
    const payload = JSON.stringify({
      channel: 'whatsapp',
      to: '+447967688452',
      text: message
    });
    
    const options = {
      hostname: '127.0.0.1',
      port: 18789,
      path: '/v1/messages/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data }));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  } catch(e) {
    return { error: e.message };
  }
}

async function main() {
  const state = loadState();
  const check = await checkGateway();
  const now = Date.now();
  
  console.log(`[watchdog] Gateway: ${check.up ? 'UP' : 'DOWN'}`);
  
  if (check.up) {
    if (state.wasDown) {
      // Gateway just came back up - notify!
      const downtime = state.lastCheck ? Math.round((now - state.lastCheck) / 1000) : '?';
      const msg = `⚠️ OpenClaw Gateway is back online\n\n- Was down for ~${downtime}s\n- Status: ${check.status?.status || 'unknown'}\n- Time: ${new Date().toISOString()}`;
      
      console.log('[watchdog] Gateway restarted! Sending notification...');
      const result = await sendWhatsApp(msg);
      console.log('[watchdog] WhatsApp result:', result.status || result.error);
      
      // Clear wasDown flag
      state.wasDown = false;
    }
    state.lastUp = now;
  } else {
    if (state.lastUp !== null && !state.wasDown) {
      // First time we detect it as down
      console.log('[watchdog] Gateway down detected, will notify on recovery...');
      state.wasDown = true;
    }
  }
  
  state.lastCheck = now;
  saveState(state);
}

main().catch(e => {
  console.error('[watchdog] Error:', e.message);
  process.exit(1);
});
