#!/usr/bin/env node
/**
 * Check if MiniMax M2.7 is accessible
 */

const { spawn } = require('child_process');

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { timeout: 30000 });
    let stdout = '', stderr = '';
    proc.stdout.on('data', d => stdout += d);
    proc.stderr.on('data', d => stderr += d);
    proc.on('close', code => resolve({ code, stdout, stderr }));
    proc.on('error', reject);
  });
}

async function check() {
  try {
    const { stdout } = await runCommand('timeout', ['25', 'openclaw', 'agent', '--to', '+447967688452', '--message', 'Reply with exactly: MODEL-M2.7-TEST']);
    const response = stdout.trim();
    
    if (response.includes('MiniMax-M2.7') || response.includes('M2.7')) {
      console.log('SUCCESS: M2.7 is accessible!');
      console.log('Response:', response);
      process.exit(0);
    } else {
      console.log('NOT YET: Still on', response);
      process.exit(1);
    }
  } catch (e) {
    console.log('ERROR:', e.message);
    process.exit(1);
  }
}

check();
