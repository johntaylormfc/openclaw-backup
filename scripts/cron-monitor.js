#!/usr/bin/env node
/**
 * Cron Job Health Monitor
 * Checks cron jobs status and alerts if issues found
 */

const fs = require('fs');

const JOBS_FILE = '/home/john/.openclaw/cron/jobs.json';
const ALERT_LOG = '/tmp/cron-alerts.log';

function checkCronHealth() {
  const jobs = JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8')).jobs;
  
  let issues = [];
  let healthy = 0;
  let disabled = 0;
  
  for (const job of jobs) {
    if (!job.enabled) {
      disabled++;
      continue;
    }
    
    const state = job.state || {};
    const errors = state.consecutiveErrors || 0;
    const lastStatus = state.lastStatus;
    
    // Check for issues
    if (errors > 2) {
      issues.push({
        name: job.name,
        errors,
        error: state.lastError || 'Unknown',
        lastRun: state.lastRunAtMs
      });
    } else if (lastStatus === 'ok') {
      healthy++;
    }
  }
  
  return { total: jobs.length, healthy, disabled, issues };
}

function logAlert(message) {
  const log = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(ALERT_LOG, log);
  console.log(message);
}

// Run check
const health = checkCronHealth();

console.log('=== Cron Job Health ===');
console.log(`Total: ${health.total} | Healthy: ${health.healthy} | Disabled: ${health.disabled}`);
console.log(`Issues: ${health.issues.length}`);

if (health.issues.length > 0) {
  console.log('\n⚠️ Failed Jobs:');
  for (const issue of health.issues) {
    console.log(`- ${issue.name}: ${issue.errors} errors (${issue.error})`);
    logAlert(`Job failed: ${issue.name} - ${issue.error}`);
  }
} else {
  console.log('\n✅ All jobs healthy');
}
