#!/usr/bin/env node
/**
 * Google Drive Backup Script - Uses rclone for reliable uploads
 * Backs up workspace files to Google Drive → OpenClaw/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WORKSPACE_PATH = '/home/john/.openclaw/workspace';
const RCLONE = '/home/john/.local/bin/rclone';

function run(cmd) {
  console.log(`  Running: ${cmd.slice(0, 60)}...`);
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
  } catch (e) {
    console.error(`  Error: ${e.message}`);
    throw e;
  }
}

async function backup() {
  console.log('=== Google Drive Backup (rclone) ===');
  let backedUp = 0;
  const date = new Date().toISOString().slice(0,10);
  const openclawDir = 'openclaw:OpenClaw';

  try {
    // 1. Dashboard DB (SQLite)
    const dbPath = '/home/john/.openclaw/workspace/dashboard-data/dashboard.db';
    if (fs.existsSync(dbPath)) {
      const destPath = openclawDir + '/backups/dashboard-' + date + '.db';
      run(RCLONE + ' copyto "' + dbPath + '" "' + destPath + '"');
      console.log('✅ Dashboard DB');
      backedUp++;
    }
    
    // 2. Memory files (last 7 days)
    const memoryDir = path.join(WORKSPACE_PATH, 'memory');
    if (fs.existsSync(memoryDir)) {
      const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md')).slice(-7);
      for (const file of files) {
        const src = path.join(memoryDir, file);
        const dst = openclawDir + '/memory/' + file;
        run(RCLONE + ' copyto "' + src + '" "' + dst + '"');
      }
      console.log('✅ Memory files (' + files.length + ')');
      backedUp++;
    }
    
    // 3. X Growth metrics
    const xMetrics = path.join(WORKSPACE_PATH, 'x_growth/x_metrics_log.csv');
    if (fs.existsSync(xMetrics)) {
      const dst = openclawDir + '/logs/x_metrics_log.csv';
      run(RCLONE + ' copyto "' + xMetrics + '" "' + dst + '"');
      console.log('✅ X metrics');
      backedUp++;
    }
    
    // 4. Core workspace files
    const coreFiles = ['MEMORY.md', 'AGENTS.md', 'USER.md', 'SOUL.md', 'TOOLS.md', 'HEARTBEAT.md'];
    for (const file of coreFiles) {
      const filePath = path.join(WORKSPACE_PATH, file);
      if (fs.existsSync(filePath)) {
        const dst = openclawDir + '/backups/' + file;
        run(RCLONE + ' copyto "' + filePath + '" "' + dst + '"');
      }
    }
    console.log('✅ Core files (' + coreFiles.length + ')');
    backedUp++;
    
    console.log('\n🎉 Backup complete! (' + backedUp + ' categories)');
    console.log('Location: Google Drive → OpenClaw/');
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backup();
