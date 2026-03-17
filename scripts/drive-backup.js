#!/usr/bin/env node
/**
 * Google Drive Backup Script - Updated for OpenClaw folder structure
 * Backs up workspace files to Google Drive → openclaw/
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const WORKSPACE_PATH = '/home/john/.openclaw/workspace';

// Load credentials
const creds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const gmailCreds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));

const oauth2Client = new google.auth.OAuth2(creds.web.client_id, creds.web.client_secret, 'http://localhost');
oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scope,
  token_type: 'Bearer',
  expiry_date: gmailCreds.expiry_date
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Folder IDs (hardcoded for efficiency)
const FOLDERS = {
  openclaw: '1E6yyfU6YA7GNyKASdsVAWWySbCR6pPk7',
  backups: '13rBLT8yDcpe8neNykDyMpTGAH6tX3bB8',
  memory: '1jJJwhj59NMQbCqnT39aV7zfrwQEA6Xqy',
  logs: '1RnYq979r-qnAqQzuE73_tmX74BxQh5GJ',
  tasks: '1D66YkTuQV15U_vdHZfg7jgh4ms7_Q40C'
};

async function uploadFile(filePath, folderId, nameOverride) {
  const fileName = nameOverride || path.basename(filePath);
  const date = new Date().toISOString().slice(0,10);
  
  const response = await drive.files.create({
    resource: { name: `${fileName}-${date}`, parents: [folderId] },
    media: { mimeType: 'text/plain', body: fs.createReadStream(filePath) },
    fields: 'id, name'
  });
  
  return response.data.id;
}

async function backup() {
  console.log('=== Google Drive Backup ===');
  let backedUp = 0;
  
  try {
    // 1. Dashboard DB (SQLite)
    const dbPath = '/home/john/.openclaw/workspace/dashboard-data/dashboard.db';
    if (fs.existsSync(dbPath)) {
      await drive.files.create({
        resource: { name: `dashboard-${new Date().toISOString().slice(0,10)}.db`, parents: [FOLDERS.backups] },
        media: { mimeType: 'application/x-sqlite3', body: fs.createReadStream(dbPath) }
      });
      console.log('✅ Dashboard DB');
      backedUp++;
    }
    
    // 2. Memory files (last 7 days)
    const memoryDir = path.join(WORKSPACE_PATH, 'memory');
    if (fs.existsSync(memoryDir)) {
      const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md')).slice(-7);
      for (const file of files) {
        await drive.files.create({
          resource: { name: file, parents: [FOLDERS.memory] },
          media: { mimeType: 'text/markdown', body: fs.createReadStream(path.join(memoryDir, file)) }
        });
      }
      console.log(`✅ Memory files (${files.length})`);
      backedUp++;
    }
    
    // 3. X Growth metrics
    const xMetrics = path.join(WORKSPACE_PATH, 'x_growth/x_metrics_log.csv');
    if (fs.existsSync(xMetrics)) {
      await drive.files.create({
        resource: { name: 'x_metrics_log.csv', parents: [FOLDERS.logs] },
        media: { mimeType: 'text/csv', body: fs.createReadStream(xMetrics) }
      });
      console.log('✅ X metrics');
      backedUp++;
    }
    
    // 4. Core workspace files
    const coreFiles = ['MEMORY.md', 'AGENTS.md', 'USER.md', 'SOUL.md', 'TOOLS.md', 'HEARTBEAT.md'];
    for (const file of coreFiles) {
      const filePath = path.join(WORKSPACE_PATH, file);
      if (fs.existsSync(filePath)) {
        await drive.files.create({
          resource: { name: file, parents: [FOLDERS.backups] },
          media: { mimeType: 'text/markdown', body: fs.createReadStream(filePath) }
        });
      }
    }
    console.log(`✅ Core files (${coreFiles.length})`);
    backedUp++;
    
    console.log(`\n🎉 Backup complete! (${backedUp} categories)`);
    console.log('Location: Google Drive → openclaw/');
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backup();
