#!/usr/bin/env node
/**
 * Google Drive Backup Script
 * Backs up workspace files to Google Drive
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const WORKSPACE_PATH = '/home/john/.openclaw/workspace';
const BACKUP_FOLDER_NAME = 'ARR_Bot_Backups';

// Load credentials
const gmailCreds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));

// Authenticate
const oauth2Client = new google.auth.OAuth2(
  gmailCreds.client_id,
  gmailCreds.client_secret,
  'http://localhost'
);

oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scopes,
  token_type: 'Bearer',
  expiry_date: gmailCreds.expiry_date
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function findOrCreateFolder(folderName) {
  const response = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)'
  });
  
  if (response.data.files.length > 0) {
    return response.data.files[0].id;
  }
  
  const folder = await drive.files.create({
    resource: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  });
  
  return folder.data.id;
}

async function uploadFile(filePath, folderId) {
  const fileName = path.basename(filePath);
  const date = new Date().toISOString().split('T')[0];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Simple upload without media property
  const fileMetadata = {
    name: `${fileName}-${date}`,
    parents: [folderId]
  };
  
  const response = await drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  });
  
  // Upload content separately
  await drive.files.update({
    fileId: response.data.id,
    media: {
      mimeType: 'text/plain',
      body: fileContent
    }
  });
  
  return response.data.id;
}

async function backup() {
  console.log('=== Google Drive Backup ===');
  
  try {
    const folderId = await findOrCreateFolder(BACKUP_FOLDER_NAME);
    console.log(`Backup folder ID: ${folderId}`);
    
    const filesToBackup = [
      'MEMORY.md',
      'AGENTS.md',
      'USER.md',
      'SOUL.md',
      'TOOLS.md',
      'HEARTBEAT.md'
    ];
    
    let backedUp = 0;
    
    for (const file of filesToBackup) {
      const filePath = path.join(WORKSPACE_PATH, file);
      if (fs.existsSync(filePath)) {
        await uploadFile(filePath, folderId);
        console.log(`✅ Backed up: ${file}`);
        backedUp++;
      }
    }
    
    console.log(`\n=== Summary ===`);
    console.log(`Files backed up: ${backedUp}`);
    console.log(`Location: Google Drive > ${BACKUP_FOLDER_NAME}`);
    
  } catch (error) {
    console.error('Backup failed:', error.message);
    process.exit(1);
  }
}

backup();
