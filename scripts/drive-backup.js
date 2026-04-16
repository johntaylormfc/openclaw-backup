#!/usr/bin/env node
/**
 * Google Drive Backup Script - Uses Google Drive API
 * Backs up workspace files to Google Drive → OpenClaw/
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';

// Load credentials
const creds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const token = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));

const oauth2Client = new google.auth.OAuth2(
  creds.web.client_id,
  creds.web.client_secret,
  'http://localhost'
);
oauth2Client.setCredentials({
  access_token: token.access_token,
  refresh_token: token.refresh_token,
  scope: token.scope,
  token_type: 'Bearer',
  expiry_date: token.expiry_date
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Auto-save tokens on refresh
oauth2Client.on('tokens', (tokens) => {
  try {
    const saved = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));
    fs.writeFileSync(`${CONFIG_PATH}/google-oauth-token.json`, JSON.stringify(Object.assign(saved, tokens), null, 2));
    console.log('[drive-backup] Token refreshed');
  } catch(e) { console.error('[drive-backup] Token save error:', e.message); }
});

// OpenClaw folder in Google Drive
const OPENCLAW_FOLDER_ID = '13rBLT8yDcpe8neNykDyMpTGAH6tX3bB8';

async function ensureFolder(name, parentId) {
  // Check if exists
  const existing = await drive.files.list({
    q: `name="${name}" and "${parentId}" in parents and trashed=false`,
    fields: 'files(id, name)'
  });
  if (existing.data.files.length > 0) {
    return existing.data.files[0].id;
  }
  // Create
  const created = await drive.files.create({
    resource: { name, parents: [parentId], mimeType: 'application/vnd.google-apps.folder' },
    fields: 'id'
  });
  return created.data.id;
}

async function uploadFile(filePath, destName, folderId) {
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping (not found): ${filePath}`);
    return false;
  }
  
  const stats = fs.statSync(filePath);
  const mimeType = 'application/octet-stream';
  
  // Delete existing
  const existing = await drive.files.list({
    q: `name="${destName}" and "${folderId}" in parents and trashed=false`,
    fields: 'files(id)'
  });
  if (existing.data.files.length > 0) {
    await drive.files.delete({ fileId: existing.data.files[0].id });
  }
  
  const media = { body: fs.createReadStream(filePath) };
  await drive.files.create({
    resource: { name: destName, parents: [folderId] },
    media,
    fields: 'id, name'
  });
  return true;
}

async function backup() {
  console.log('=== Google Drive Backup ===');
  let backedUp = 0;
  const date = new Date().toISOString().slice(0,10);
  const WORKSPACE_PATH = '/home/john/.openclaw/workspace';
  
  try {
    // Ensure subfolders
    const backupsId = await ensureFolder('backups', OPENCLAW_FOLDER_ID);
    const memoryId = await ensureFolder('memory', OPENCLAW_FOLDER_ID);
    
    // 1. Dashboard DB (SQLite)
    const dbPath = '/home/john/.openclaw/workspace/dashboard-data/dashboard.db';
    if (fs.existsSync(dbPath)) {
      const uploaded = await uploadFile(dbPath, `dashboard-${date}.db`, backupsId);
      if (uploaded) console.log('✅ Dashboard DB');
      backedUp++;
    }
    
    // 2. Memory files (last 7 days)
    const memoryDir = path.join(WORKSPACE_PATH, 'memory');
    if (fs.existsSync(memoryDir)) {
      const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md') && !f.startsWith('archived')).slice(-7);
      for (const file of files) {
        await uploadFile(path.join(memoryDir, file), file, memoryId);
      }
      console.log(`✅ Memory files (${files.length})`);
      backedUp++;
    }
    
    // 3. Core workspace files
    const coreFiles = ['MEMORY.md', 'AGENTS.md', 'USER.md', 'SOUL.md', 'TOOLS.md', 'HEARTBEAT.md'];
    for (const file of coreFiles) {
      const filePath = path.join(WORKSPACE_PATH, file);
      if (fs.existsSync(filePath)) {
        await uploadFile(filePath, file, backupsId);
      }
    }
    console.log(`✅ Core files (${coreFiles.length})`);
    backedUp++;
    
    console.log(`\n🎉 Backup complete! (${backedUp} categories)`);
    console.log('Location: Google Drive → OpenClaw/');
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backup();