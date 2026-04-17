#!/usr/bin/env node
/**
 * inbox-zero-coach.js — Inbox Zero Coach
 * Monitors Gmail for inbox clutter patterns and alerts via WhatsApp.
 * 
 * Triggers an alert when:
 * - A single sender has 5+ unread emails
 * - Any unread email is older than 7 days
 * - Total unread in last 30 days is over 30
 */

const { execSync } = require('child_process');
const fs = require('fs');

const STATE_FILE  = '/home/john/.openclaw/workspace/inbox-zero-state.json';
const LOG_FILE    = '/home/john/.openclaw/workspace/logs/inbox-zero.log';
const WHATSAPP_TO = '+447967688452';
// WhatsApp delivery handled by cron delivery.mode=announce — see above

// ─── Helpers ────────────────────────────────────────────────────────────────

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
  fs.appendFileSync(LOG_FILE, `[${ts}] ${msg}\n`);
}

function gog(args) {
  try {
    const env = { ...process.env, GOG_KEYRING_PASSWORD: '' };
    return execSync(`gog ${args}`, { env, timeout: 30000, maxBuffer: 10 * 1024 * 1024 }).toString();
  } catch (e) {
    return '';
  }
}

// WhatsApp delivery is handled by cron job delivery.mode=announce
// No direct webhook call needed — output is sent automatically.
/**
 * Parse gog table output. Format:
 * ID  DATE  FROM  SUBJECT  LABELS  THREAD
 * Lines starting with # are comments/headers.
 */
function parseInboxTable(output) {
  const lines = output.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !l.startsWith('#') && !l.startsWith('ID '));

  const now = Date.now();
  const bySender = {}; // sender -> { count, emails: [{subject, date}] }

  for (const line of lines) {
    // Extract email from "Name <email>" format — find the <...> part
    const fromMatch = line.match(/<([^>]+)>/);
    if (!fromMatch) continue;
    const sender = fromMatch[1].toLowerCase();

    // Extract date (first YYYY-MM-DD or similar)
    const dateMatch = line.match(/(\d{4}-\d{2}-\d{2})/);
    const emailDate = dateMatch ? new Date(dateMatch[1]).getTime() : now;
    const ageDays = Math.floor((now - emailDate) / 86400000);

    if (!bySender[sender]) bySender[sender] = { count: 0, oldestDays: 0 };
    bySender[sender].count++;
    bySender[sender].oldestDays = Math.max(bySender[sender].oldestDays, ageDays);
  }

  return bySender;
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch(e) {
    return { lastRun: null, history: [] };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Main ─────────────────────────────────────────────────────────────────

function main() {
  log('=== Inbox Zero Coach Started ===');

  const state = loadState();
  const now   = new Date();
  const nowStr = now.toISOString().split('T')[0];

  // Get unread in last 30 days — gog limits to max 100 per search
  const raw7  = gog(`gmail search "is:unread in:inbox newer_than:7d" --max 100`);
  const raw30 = gog(`gmail search "is:unread in:inbox newer_than:30d" --max 100`);

  const bySender7  = parseInboxTable(raw7);
  const bySender30 = parseInboxTable(raw30);

  const totalUnread = Object.values(bySender30).reduce((s, v) => s + v.count, 0);
  const oldestAll    = Math.max(0, ...Object.values(bySender30).map(v => v.oldestDays));

  // Senders with 5+ unread in last 7 days
  const heavy7 = Object.entries(bySender7)
    .filter(([, v]) => v.count >= 5)
    .map(([sender, v]) => ({ sender, count: v.count, oldestDays: v.oldestDays }))
    .sort((a, b) => b.count - a.count);

  // Senders with emails 7+ days old in last 30 days
  const stale30 = Object.entries(bySender30)
    .filter(([, v]) => v.oldestDays >= 7)
    .map(([sender, v]) => ({ sender, count: v.count, oldestDays: v.oldestDays }))
    .sort((a, b) => b.oldestDays - a.oldestDays);

  const lastState = state.lastRun ? JSON.parse(state.lastRun) : null;

  // Decide whether to alert
  let shouldAlert = false;
  let lines = [];

  if (!lastState) {
    shouldAlert = true; // First run — always report
  } else {
    const newHeavy = heavy7.filter(h => !lastState.heavy7?.find(lh => lh.sender === h.sender));
    const newStale = stale30.filter(s => !lastState.stale30?.find(ls => ls.sender === s.sender));
    const totalJumped = totalUnread > (lastState.totalUnread || 0) + 5;

    if (newHeavy.length > 0 || newStale.length > 0 || totalJumped || oldestAll >= 14) {
      shouldAlert = true;
    }
  }

  if (shouldAlert || !lastState) {
    lines.push(`📬 *Inbox Zero Coach — ${nowStr}*`);
    lines.push('');
    lines.push(`Unread (7d): *${Object.values(bySender7).reduce((s,v)=>s+v.count,0)}* | (30d): *${totalUnread}*`);
    if (oldestAll > 0) lines.push(`Oldest unread: *${oldestAll} days*`);
    lines.push('');

    if (heavy7.length > 0) {
      lines.push(`🔴 Senders with 5+ unread:`);
      heavy7.slice(0, 5).forEach(h => {
        lines.push(`  • ${h.sender}: ${h.count} unread${h.oldestDays >= 7 ? ' (7d+ old)' : ''}`);
      });
      lines.push('');
    }

    if (stale30.length > 0 && stale30[0].oldestDays >= 7) {
      lines.push(`📅 Sitting 7+ days:`);
      stale30.slice(0, 5).forEach(s => {
        lines.push(`  • ${s.sender}: ${s.oldestDays}d old`);
      });
      lines.push('');
    }

    if (totalUnread > 30) {
      lines.push(`💬 ${totalUnread} unread — consider a clear-out?`);
      lines.push('Reply "inbox clean" and I\'ll archive promotions.');
      lines.push('');
    }

    lines.push('_I check daily. Reply STOP to mute._');
  }

  // Save state
  const newState = {
    lastRun: JSON.stringify({ totalUnread, oldestAll, heavy7, stale30 }),
    history: [
      ...(state.history || []),
      { date: nowStr, totalUnread, oldestAll }
    ].slice(-14)
  };
  saveState(newState);

  if (lines.length > 0) {
    console.log(lines.join('\n'));
    log('Alert: ' + lines.join(' | ').substring(0, 200));
  } else {
    log('No alert. Clean inbox. Unread (7d): ' + Object.values(bySender7).reduce((s,v)=>s+v.count,0) + ', (30d): ' + totalUnread);
  }

  log('=== Inbox Zero Coach Complete ===');
}

main();
