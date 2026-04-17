#!/usr/bin/env node
/**
 * Enhanced Daily Standup — OC-0052
 * Gathers: weather, Todoist, calendar, container health, disk trending,
 * kanban overnight activity, ARR status, cron failures, open issues
 */

const fs = require('fs');
const { execSync } = require('child_process');

// === CONFIG ===
const TODOIST_TOKEN = '213a9e5a7b4fdee755dd844909202252821b45e0';
const TODOIST_API = 'https://api.todoist.com/api/v1';
const GOOGLE_CALENDAR_ID = 'primary';
const WHATSAPP_URL = 'http://192.168.1.146:5001/webhook/whatsapp';
const WHATSAPP_TOKEN = 'hx4nEu4W2ZoXsiEfWRCAQcgDsNzzht7kpBUfsGHhqxzEsgHhLll2g39woASs1c';
const WHATSAPP_TO = '+447967688452';
const STATE_FILE = '/home/john/.openclaw/workspace/state/auto-recovery-state.json';
const LOG_FILE = '/home/john/.openclaw/workspace/logs/auto-recovery.log';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTodos() {
  try {
    const res = execSync(`curl -s -H "Authorization: Bearer ${TODOIST_TOKEN}" "${TODOIST_API}/tasks?limit=20"`, { timeout: 10000 });
    const data = JSON.parse(res.toString());
    const tasks = data.results || [];
    const overdue = tasks.filter(t => !t.checked && t.due && new Date(t.due.date) < new Date());
    const today = tasks.filter(t => !t.checked && t.due && t.due.date === new Date().toISOString().split('T')[0]);
    return { overdue, today, total: tasks.filter(t => !t.checked).length };
  } catch(e) {
    return { overdue: [], today: [], total: 0, error: e.message };
  }
}

function getContainers() {
  try {
    const res = execSync('docker ps --format "{{.Names}}|{{.Status}}"', { timeout: 10000 });
    const lines = res.toString().trim().split('\n').filter(Boolean);
    const unhealthy = [];
    const healthy = [];
    for (const line of lines) {
      const [name, status] = line.split('|');
      if (status && (status.includes('Exited') || status.includes('Restarting') || status.includes('unhealthy'))) {
        unhealthy.push({ name, status: status.replace(/\s*\(\d+ seconds?\)/, '') });
      } else if (name) {
        healthy.push(name);
      }
    }
    return { healthy: healthy.length, unhealthy, total: lines.length };
  } catch(e) {
    return { healthy: 0, unhealthy: [], error: e.message };
  }
}

function getDiskSpace() {
  try {
    const res = execSync('df -h /home/john 2>/dev/null | tail -1 || df -h / | tail -1', { encoding: 'utf8', timeout: 5000 }).trim();
    const parts = res.split(/\s+/);
    return { total: parts[1] || '?', used: parts[2] || '?', available: parts[3] || '?', usePct: parts[4] || '?' };
  } catch {
    return null;
  }
}

function getKanbanOvernight() {
  // Check kanban directories for activity since yesterday
  const dirs = {
    new: '/home/john/.openclaw/workspace/kanban/new',
    inProgress: '/home/john/.openclaw/workspace/kanban/in-progress',
    blocked: '/home/john/.openclaw/workspace/kanban/blocked',
    done: '/home/john/.openclaw/workspace/kanban/done',
  };
  const yesterday = new Date(Date.now() - 28 * 60 * 60 * 1000); // 28h ago
  const result = { new: [], inProgress: [], blocked: [], done: [] };

  for (const [key, dir] of Object.entries(dirs)) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const stat = fs.statSync(`${dir}/${file}`);
        if (stat.mtime > yesterday) {
          const content = fs.readFileSync(`${dir}/${file}`, 'utf8');
          const title = content.match(/^\*\*Title:\*\*\s*(.+)/m) || content.match(/^#.*?:\s*(.+)/m) || [null, file];
          result[key].push({ id: file.replace('.md',''), title: title[1] || file });
        }
      }
    } catch { /* skip */ }
  }
  return result;
}

function getARRQueue() {
  // Quick check of download queue counts via Radarr/Sonarr API
  const endpoints = [
    { name: 'Radarr', url: 'http://localhost:7878', key: 'emulator' },
    { name: 'Sonarr', url: 'http://localhost:8989', key: 'emulator' },
  ];
  const result = {};
  for (const { name, url, key } of endpoints) {
    try {
      const res = execSync(`curl -s "${url}/api/v3/queue?page=1&pageSize=1" -H "X-Api-Key: ${key}"`, { encoding: 'utf8', timeout: 8000 });
      const data = JSON.parse(res);
      result[name] = { total: data.totalRecords || 0 };
    } catch {
      result[name] = { total: 0 };
    }
  }
  return result;
}

function getCronFailures() {
  try {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    const disabled = state.cronDisabled || {};
    const entries = Object.values(disabled).filter(j => j && j.at && (Date.now() - j.at < 7 * 24 * 60 * 60 * 1000));
    return entries;
  } catch {
    return [];
  }
}

function getRecentErrors() {
  // Last 28h of auto-recovery log for ERROR/WARN entries
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(l => l.includes('[ERROR]') || l.includes('[WARN]'));
    const cutoff = Date.now() - 28 * 60 * 60 * 1000;
    return lines.filter(l => {
      const tsMatch = l.match(/\[([\d\-T:\.Z]+)\]/);
      if (!tsMatch) return false;
      return new Date(tsMatch[1]).getTime() > cutoff;
    }).slice(-5);
  } catch {
    return [];
  }
}

function sendWhatsApp(message) {
  try {
    execSync(`curl -s -X POST "${WHATSAPP_URL}" \\
      -H "Content-Type: application/json" \\
      -H "Authorization: Bearer ${WHATSAPP_TOKEN}" \\
      -d '{"message":"'"${message}"'","to":"'"${WHATSAPP_TO}"'"}' > /dev/null 2>&1`, { encoding: 'utf8' });
  } catch { /* silent */ }
}

// ─── Weather ──────────────────────────────────────────────────────────────────
function getWeather() {
  try {
    const res = execSync('curl -s --max-time 5 "wttr.in/London?format=%C+%t"', { encoding: 'utf8', timeout: 6000 }).trim();
    if (!res || res.includes('Unknown') || res.length < 3) return null;
    return res;
  } catch {
    return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const [todos, containers, disk, kanban, arr, weather] = await Promise.all([
    Promise.resolve(getTodos()),
    Promise.resolve(getContainers()),
    Promise.resolve(getDiskSpace()),
    Promise.resolve(getKanbanOvernight()),
    Promise.resolve(getARRQueue()),
    Promise.resolve(getWeather()),
  ]);

  const cronDisabled = getCronFailures();
  const recentErrors = getRecentErrors();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  let msg = `🌅 *Good morning, John!*\n_${dateStr}_\n\n`;

  // Weather
  if (weather) {
    msg += `🌤 _Weather:_ ${weather}\n\n`;
  }

  // Todoist
  msg += `📋 _Todoist_\n`;
  if (todos.overdue.length > 0) {
    msg += `⚠️ Overdue (${todos.overdue.length}):\n`;
    todos.overdue.slice(0, 3).forEach(t => msg += `  • ${t.content.substring(0, 60)}\n`);
  } else {
    msg += `✅ No overdue tasks\n`;
  }

  // Containers
  msg += `\n🐳 _Containers_ (${containers.total} total)\n`;
  if (containers.unhealthy.length > 0) {
    msg += `🔴 ${containers.unhealthy.length} issue(s):\n`;
    containers.unhealthy.slice(0, 5).forEach(c => msg += `  • ${c.name}: ${c.status}\n`);
  } else {
    msg += `✅ All healthy\n`;
  }

  // Disk
  if (disk) {
    msg += `\n💾 _Disk:_ ${disk.used} / ${disk.total} used (${disk.usePct})\n`;
  }

  // Kanban overnight
  const kanbanNew = kanban.new.filter(t => !t.id.startsWith('OC-0051') && !t.id.startsWith('OC-0052'));
  if (kanbanNew.length > 0 || kanban.blocked.length > 0 || kanban.done.length > 0) {
    msg += `\n📋 _Kanban (since yesterday)_\n`;
    if (kanbanNew.length > 0) kanbanNew.slice(0, 3).forEach(t => msg += `  🆕 ${t.id}: ${t.title.substring(0, 50)}\n`);
    if (kanban.blocked.length > 0) kanban.blocked.slice(0, 3).forEach(t => msg += `  🔴 ${t.id}: ${t.title.substring(0, 50)}\n`);
    if (kanban.done.length > 0) kanban.done.slice(0, 3).forEach(t => msg += `  ✅ ${t.id}: ${t.title.substring(0, 50)}\n`);
  }

  // ARR Queue
  const arrTotal = Object.values(arr).reduce((s, a) => s + (a.total || 0), 0);
  if (arrTotal > 0) {
    msg += `\n📥 _ARR Queue:_ `;
    msg += Object.entries(arr).map(([k, v]) => `${k}: ${v.total}`).join(' | ');
    msg += '\n';
  }

  // Cron failures
  if (cronDisabled.length > 0) {
    msg += `\n⚠️ _Cron Disabled (${cronDisabled.length}):_\n`;
    cronDisabled.slice(0, 3).forEach(j => msg += `  • ${j.name}\n`);
  }

  // Recent errors
  if (recentErrors.length > 0) {
    msg += `\n🚨 _Recent Errors:_ ${recentErrors.length} in last 28h\n`;
    const latest = recentErrors[recentErrors.length - 1];
    const sample = latest.match(/\] \[ERROR\] (.+)/) || latest.match(/\] \[WARN\] (.+)/);
    if (sample) msg += `  Last: ${sample[1].substring(0, 80)}\n`;
  }

  msg += `\n_Have a great day!_`;

  console.log(msg);
  sendWhatsApp(msg);
}

main().catch(e => {
  console.error('Standup error:', e.message);
  process.exit(1);
});
