#!/usr/bin/env node
/**
 * Send Queued Notifications
 * Copies queue from arr-webhook-notifier container, outputs formatted messages
 * Cron with announce delivery sends them via WhatsApp
 */

const fs = require('fs');
const { execSync } = require('child_process');

const TEMP_QUEUE = '/tmp/arr_notif_queue.jsonl';
const OUTPUT_FILE = '/tmp/notify_output.txt';

function main() {
  // Copy queue out of container
  try {
    execSync('docker cp arr-webhook-notifier:/tmp/arr_notifications.jsonl /tmp/arr_notif_queue.jsonl 2>/dev/null');
  } catch(e) {
    console.log('NO_QUEUE');
    return;
  }

  if (!fs.existsSync(TEMP_QUEUE) || fs.statSync(TEMP_QUEUE).size === 0) {
    console.log('QUEUE_EMPTY');
    return;
  }

  const content = fs.readFileSync(TEMP_QUEUE, 'utf8').trim();
  const lines = content.split('\n').filter(l => l.trim());

  const messages = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      const msg = entry.message;
      if (!msg) continue;
      // Skip malformed old tautulli entries
      if (msg.includes('TAUTULLI') && msg.includes('Unknown')) continue;
      if (msg.includes('SONARR') && msg.includes('Unknown')) continue;
      messages.push(msg);
    } catch(e) {}
  }

  if (messages.length === 0) {
    console.log('NO_NEW_NOTIFICATIONS');
    return;
  }

  // Don't clear - script filters old entries, new ones get re-sent
  // This avoids permission issues with truncating inside container

  // Output formatted messages — cron announce delivery sends to WhatsApp
  const output = messages.map((m, i) => `📋 Notification ${i + 1}:\n${m}`).join('\n\n---\n\n');
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`NOTIFICATIONS_READY:${messages.length}`);
  console.log(output);
  
  fs.unlinkSync(TEMP_QUEUE);
}

main();
