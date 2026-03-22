#!/usr/bin/env node
/**
 * drive-arr-backup.js
 * Uploads ARR backup tar.gz to Google Drive → BC Dev Limited/ARR Backups/
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';

// Load credentials
const creds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const gmailCreds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));

const oauth2Client = new google.auth.OAuth2(
  creds.web.client_id,
  creds.web.client_secret,
  'http://localhost'
);
oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scope,
  token_type: 'Bearer',
  expiry_date: gmailCreds.expiry_date
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// ARR backups folder in Google Drive — uses existing backups folder
const ARR_BACKUP_FOLDER_ID = '13rBLT8yDcpe8neNykDyMpTGAH6tX3bB8'; // OpenClaw backups folder

async function uploadArrBackup(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`[drive-arr-backup] File not found: ${filePath}`);
    process.exit(1);
  }

  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);
  const date = new Date().toISOString().slice(0, 10);

  console.log(`[drive-arr-backup] Uploading ${fileName} (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);

  // Check for existing backup with same name and delete it first (for 7-day rotation)
  const existing = await drive.files.list({
    q: `name="${fileName}" and "${ARR_BACKUP_FOLDER_ID}" in parents and trashed=false`,
    fields: 'files(id, name)'
  });

  if (existing.data.files.length > 0) {
    for (const f of existing.data.files) {
      await drive.files.delete({ fileId: f.id });
      console.log(`[drive-arr-backup] Deleted old: ${f.name}`);
    }
  }

  const fileSize = stats.size;
  const media = {
    mimeType: 'application/gzip',
    body: fs.createReadStream(filePath)
  };

  const resource = {
    name: fileName,
    parents: [ARR_BACKUP_FOLDER_ID]
  };

  // Use simple create for small files, resmable for large
  if (fileSize < 5 * 1024 * 1024) {
    await drive.files.create({ resource, media, fields: 'id, name' });
  } else {
    // Multipart upload for files > 5MB
    const res = await drive.files.create({
      resource,
      media,
      fields: 'id, name',
      uploadType: 'resumable'
    });
  }

  console.log(`[drive-arr-backup] Uploaded: ${fileName}`);

  // Prune old backups on Drive (keep 7 days)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);

  const oldBackups = await drive.files.list({
    q: `"${ARR_BACKUP_FOLDER_ID}" in parents and trashed=false and name contains "arr_backup_"`,
    fields: 'files(id, name, createdTime)'
  });

  let pruned = 0;
  for (const f of oldBackups.data.files) {
    const created = new Date(f.createdTime);
    if (created < cutoff) {
      await drive.files.delete({ fileId: f.id });
      console.log(`[drive-arr-backup] Pruned old: ${f.name}`);
      pruned++;
    }
  }

  if (pruned > 0) {
    console.log(`[drive-arr-backup] Pruned ${pruned} old backup(s)`);
  } else {
    console.log(`[drive-arr-backup] No old backups to prune`);
  }
}

// Run
const backupFile = process.argv[2];
if (!backupFile) {
  // Find latest backup
  const { execSync } = require('child_process');
  const latest = execSync(
    `ls -t /home/john/ARR/backups/arr_backup_*.tar.gz 2>/dev/null | head -1`,
    { encoding: 'utf8' }
  ).trim();
  if (!latest) {
    console.error('[drive-arr-backup] No ARR backup found');
    process.exit(1);
  }
  uploadArrBackup(latest).catch(e => { console.error(e); process.exit(1); });
} else {
  uploadArrBackup(backupFile).catch(e => { console.error(e); process.exit(1); });
}