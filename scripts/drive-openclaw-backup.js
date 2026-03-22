#!/usr/bin/env node
/**
 * OpenClaw Snapshot & Restore
 * 
 * Usage:
 *   node drive-openclaw-backup.js          — create and upload snapshot
 *   node drive-openclaw-backup.js --list   — list available snapshots
 *   node drive-openclaw-backup.js --restore <snapshot-name>  — restore from snapshot
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// === CONFIG ===
const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const WORKSPACE = '/home/john/.openclaw/workspace';
const CONFIG = '/home/john/.openclaw/config';
const SNAPSHOT_NAME_PREFIX = 'openclaw-snapshot';

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

// === SNAPSHOT ===
async function createSnapshot() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const snapshotName = `${SNAPSHOT_NAME_PREFIX}_${timestamp}.tar.gz`;
  const tempPath = `/tmp/${snapshotName}`;
  
  console.log(`[snapshot] Creating ${snapshotName}...`);
  
  // Exclude large/variable dirs
  const excludeDirs = [
    '--exclude=node_modules',
    '--exclude=.git',
    '--exclude=memory/archived',
    '--exclude=canvas',
    '--exclude=reports',
    '--exclude=backups',
    '--exclude=logs',
    '--exclude=*.log',
    '--exclude=openclaw.sqlite*',
    '--exclude=workspace.db',
    '--exclude=dashboard.db',
    '--exclude=*.db-journal'
  ];
  
  // Snapshot workspace and config
  const dirs = [WORKSPACE, CONFIG];
  const tarCmd = `tar ${excludeDirs.join(' ')} -czf ${tempPath} ${dirs.join(' ')} 2>/dev/null`;
  execSync(tarCmd, { stdio: 'pipe' });
  
  const stats = fs.statSync(tempPath);
  console.log(`[snapshot] Created ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  
  return { snapshotName, tempPath, stats };
}

// === UPLOAD ===
async function ensureFolder() {
  const result = await drive.files.list({
    q: `name="OpenClaw Snapshots" and mimeType="application/vnd.google-apps.folder" and trashed=false`,
    fields: 'files(id, name)'
  });
  
  if (result.data.files.length > 0) {
    return result.data.files[0].id;
  }
  
  // Create folder
  const folder = await drive.files.create({
    resource: {
      name: 'OpenClaw Snapshots',
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  });
  
  console.log(`[snapshot] Created Drive folder: OpenClaw Snapshots`);
  return folder.data.id;
}

async function uploadSnapshot(snapshotName, tempPath, stats) {
  // Ensure folder exists
  const folderId = await ensureFolder();
  
  // Check for existing with same name
  const existing = await drive.files.list({
    q: `name="${snapshotName}" and "${folderId}" in parents and trashed=false`,
    fields: 'files(id, name)'
  });
  
  if (existing.data.files.length > 0) {
    for (const f of existing.data.files) {
      await drive.files.delete({ fileId: f.id });
      console.log(`[snapshot] Deleted old: ${f.name}`);
    }
  }
  
  const media = {
    mimeType: 'application/gzip',
    body: fs.createReadStream(tempPath)
  };
  
  const resource = {
    name: snapshotName,
    parents: [folderId]
  };
  
  const fileSize = stats.size;
  if (fileSize < 5 * 1024 * 1024) {
    await drive.files.create({ resource, media, fields: 'id, name' });
  } else {
    await drive.files.create({ resource, media, fields: 'id, name', uploadType: 'resumable' });
  }
  
  console.log(`[snapshot] Uploaded: ${snapshotName}`);
  
  // Prune old snapshots (keep 7 days)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  
  const oldSnapshots = await drive.files.list({
    q: `"${folderId}" in parents and trashed=false and name contains "${SNAPSHOT_NAME_PREFIX}_"`,
    fields: 'files(id, name, createdTime)'
  });
  
  let pruned = 0;
  for (const f of oldSnapshots.data.files) {
    const created = new Date(f.createdTime);
    if (created < cutoff) {
      await drive.files.delete({ fileId: f.id });
      console.log(`[snapshot] Pruned old: ${f.name}`);
      pruned++;
    }
  }
  
  if (pruned > 0) {
    console.log(`[snapshot] Pruned ${pruned} old snapshot(s)`);
  }
  
  // Cleanup temp
  fs.unlinkSync(tempPath);
  console.log(`[snapshot] Done.`);
}

// === LIST ===
async function listSnapshots() {
  const folderId = await ensureFolder();
  const result = await drive.files.list({
    q: `"${folderId}" in parents and trashed=false and name contains "${SNAPSHOT_NAME_PREFIX}_"`,
    fields: 'files(id, name, createdTime, size)',
    orderBy: 'createdTime desc'
  });
  
  console.log('\nAvailable OpenClaw Snapshots:\n');
  for (const f of (result.data.files || [])) {
    const date = new Date(f.createdTime).toLocaleString('en-GB');
    const size = f.size ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : '?';
    console.log(`  ${f.name}`);
    console.log(`    ${date} | ${size}\n`);
  }
  
  if (!result.data.files?.length) {
    console.log('  No snapshots found.\n');
  }
}

// === RESTORE ===
async function restoreSnapshot(snapshotName) {
  const tempPath = `/tmp/${snapshotName}`;
  
  console.log(`[restore] Downloading ${snapshotName}...`);
  
  // Download
  const folderId = await ensureFolder();
  const files = await drive.files.list({
    q: `name="${snapshotName}" and "${folderId}" in parents and trashed=false`,
    fields: 'files(id, name)'
  });
  
  if (!files.data.files.length) {
    console.error(`[restore] Snapshot not found: ${snapshotName}`);
    process.exit(1);
  }
  
  const fileId = files.data.files[0].id;
  const dest = fs.createWriteStream(tempPath);
  await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  
  // Actually download
  await new Promise((resolve, reject) => {
    drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' })
      .then(res => {
        res.data.pipe(dest);
        dest.on('finish', resolve);
        res.data.on('error', reject);
      })
      .catch(reject);
  });
  
  console.log(`[restore] Extracting to /...`);
  
  // Extract over live files
  execSync(`tar -xzf ${tempPath} -C /`, { stdio: 'inherit' });
  fs.unlinkSync(tempPath);
  
  console.log(`[restore] Done. OpenClaw restored from ${snapshotName}.`);
}

// === MAIN ===
const arg = process.argv[2];

(async () => {
  try {
    if (arg === '--list') {
      await listSnapshots();
    } else if (arg === '--restore') {
      const snapshotName = process.argv[3];
      if (!snapshotName) {
        console.error('Usage: --restore <snapshot-name>');
        process.exit(1);
      }
      await restoreSnapshot(snapshotName);
    } else if (!arg) {
      const { snapshotName, tempPath, stats } = await createSnapshot();
      await uploadSnapshot(snapshotName, tempPath, stats);
    } else {
      console.log('Usage: node drive-openclaw-backup.js [--list|--restore <name>]');
    }
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
