#!/usr/bin/env node
/**
 * Cron Health Monitor
 * Checks cron job health and reports issues
 */

const { execSync } = require('child_process');

console.log('🔍 Cron Health Monitor');
console.log('=======================\n');

try {
  // Get cron job list
  const cronList = JSON.parse(execSync('openclaw cron list --json', { encoding: 'utf8' }));
  
  const jobs = cronList.jobs || [];
  const now = Date.now();
  
  let issues = [];
  let healthy = 0;
  
  for (const job of jobs) {
    if (!job.enabled) continue;
    
    const state = job.state || {};
    const lastRun = state.lastRunAtMs || 0;
    const nextRun = state.nextRunAtMs || 0;
    const status = state.lastStatus || 'unknown';
    const consecutiveErrors = state.consecutiveErrors || 0;
    const lastError = state.lastError || '';
    
    // Check for errors
    if (status === 'error') {
      issues.push({
        name: job.name,
        jobId: job.id,
        errors: consecutiveErrors,
        lastError: lastError.substring(0, 100)
      });
    } else if (status === 'ok') {
      healthy++;
    }
  }
  
  console.log(`📊 Total Jobs: ${jobs.length}`);
  console.log(`✅ Healthy: ${healthy}`);
  console.log(`❌ Issues: ${issues.length}\n`);
  
  if (issues.length > 0) {
    console.log('⚠️  Jobs with errors:\n');
    for (const issue of issues) {
      console.log(`  - ${issue.name}`);
      console.log(`    Errors: ${issue.errors}`);
      console.log(`    Last: ${issue.lastError}`);
      console.log('');
    }
  } else {
    console.log('✅ All cron jobs healthy!');
  }
  
  process.exit(issues.length > 0 ? 1 : 0);
  
} catch (error) {
  console.error('Error running cron monitor:', error.message);
  process.exit(1);
}
