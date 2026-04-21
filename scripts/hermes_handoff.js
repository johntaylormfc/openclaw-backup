#!/usr/bin/env node
/**
 * hermes_handoff.js
 * 
 * Drop a task for Hermes to process, wait for result.
 * Writes task to ~/.hermes/tasks/in/{id}.json
 * Polls ~/.hermes/tasks/out/{id}.json until complete or timeout.
 * 
 * Usage:
 *   node hermes_handoff.js "Do something useful" [id]
 *   node hermes_handoff.js --wait {id}
 * 
 * Result printed to stdout on success.
 */

const fs = require('fs');
const path = require('path');

const TASKS_IN  = '/home/john/.hermes/tasks/in';
const TASKS_OUT = '/home/john/.hermes/tasks/out';
const TASKS_DONE = '/home/john/.hermes/tasks/done';
const POLL_INTERVAL_MS = 10000;  // 10 sec
const TIMEOUT_MS = 300000;       // 5 min

function log(msg) {
  console.error(`[HermesHandoff] ${msg}`);
}

function writeTask(id, prompt) {
  const task = {
    id,
    prompt,
    created_at: new Date().toISOString(),
  };
  const file = path.join(TASKS_IN, `${id}.json`);
  fs.writeFileSync(file, JSON.stringify(task, null, 2));
  log(`Task written: ${file}`);
}

function readResult(id) {
  const file = path.join(TASKS_OUT, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function waitForResult(id) {
  const start = Date.now();
  while (Date.now() - start < TIMEOUT_MS) {
    const result = readResult(id);
    if (result) {
      log(`Result received for ${id}`);
      return result;
    }
    log(`Waiting for result... (${Math.floor((Date.now()-start)/1000)}s)`);
    // Sleep
    const wakeAt = Date.now() + POLL_INTERVAL_MS;
    while (Date.now() < wakeAt) {
      require('child_process').execSync(`sleep ${Math.ceil((wakeAt - Date.now())/1000)}`);
    }
  }
  log(`TIMEOUT after ${TIMEOUT_MS/1000}s`);
  return null;
}

async function main() {
  // Ensure directories exist
  [TASKS_IN, TASKS_OUT, TASKS_DONE].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  const args = process.argv.slice(2);
  
  if (args[0] === '--wait') {
    // Just wait for existing task
    const id = args[1];
    if (!id) { console.error("Usage: node hermes_handoff.js --wait {id}"); process.exit(1); }
    const result = waitForResult(id);
    if (result) {
      console.log(result.result || JSON.stringify(result));
    } else {
      console.error(`TIMEOUT: No result for ${id}`);
      process.exit(2);
    }
    return;
  }

  const prompt = args[0];
  const id = args[1] || `OC-${Date.now()}`;

  if (!prompt) {
    console.error("Usage: node hermes_handoff.js \"prompt text\" [id]");
    process.exit(1);
  }

  log(`Submitting task ${id}: ${prompt.substring(0, 50)}...`);
  writeTask(id, prompt);
  
  const result = waitForResult(id);
  if (result) {
    console.log(result.result || JSON.stringify(result));
    process.exit(0);
  } else {
    log(`No result received for ${id} — Hermes may still be processing`);
    log(`Poll manually with: node hermes_handoff.js --wait ${id}`);
    process.exit(3);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
