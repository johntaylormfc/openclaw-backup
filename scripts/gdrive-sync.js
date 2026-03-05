#!/usr/bin/env node
/**
 * Google Drive Sync Utility
 * Uploads research documents to Google Drive
 * Uses OAuth (not Service Account) for full Drive access
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';
const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';
const SERVICE_ACCOUNT_PATH = '/home/john/.openclaw/workspace/config/google-service-account.json';
const RESEARCH_DIR = '/home/john/.openclaw/workspace/memory';
const RESEARCH_FOLDER_NAME = 'ARR Research Docs';

// Use Service Account for cron-friendly auth
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

async function getOrCreateFolder(drive, parentId = null) {
  const query = `name='${RESEARCH_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  if (parentId) query += ` and '${parentId}' in parents`;
  
  const response = await drive.files.list({ q: query, fields: 'files(id, name)' });
  
  if (response.data.files.length > 0) {
    return response.data.files[0].id;
  }
  
  // Create folder
  const folderMetadata = {
    name: RESEARCH_FOLDER_NAME,
    mimeType: 'application/vnd.google-apps.folder'
  };
  if (parentId) folderMetadata.parents = [parentId];
  
  const folder = await drive.files.create({ resource: folderMetadata, fields: 'id' });
  return folder.data.id;
}

async function uploadFile(drive, folderId, filePath) {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if file already exists
  const existing = await drive.files.list({
    q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
    fields: 'files(id, name)'
  });
  
  if (existing.data.files.length > 0) {
    // Update existing file
    const fileId = existing.data.files[0].id;
    await drive.files.update({
      fileId,
      resource: { name: fileName },
      media: { body: fileContent }
    });
    console.log(`Updated: ${fileName}`);
    return fileId;
  } else {
    // Upload new file
    const response = await drive.files.create({
      resource: {
        name: fileName,
        parents: [folderId]
      },
      media: { body: fileContent }
    });
    console.log(`Uploaded: ${fileName}`);
    return response.data.id;
  }
}

async function syncResearchDocs() {
  // Get or create folder
  const folderId = await getOrCreateFolder(drive);
  console.log(`Research folder ID: ${folderId}`);
  
  // Get all research files
  if (!fs.existsSync(RESEARCH_DIR)) {
    console.log('Research directory not found');
    return;
  }
  
  const files = fs.readdirSync(RESEARCH_DIR).filter(f => f.startsWith('research-') && f.endsWith('.md'));
  console.log(`Found ${files.length} research files`);
  
  const FOLDER_URL = 'https://drive.google.com/drive/folders/' + folderId;
  
  for (const file of files) {
    try {
      const filePath = path.join(RESEARCH_DIR, file);
      await uploadFile(drive, folderId, filePath);
      
      // Append Drive link to local file
      const driveLink = `\n\n---\n**Google Drive:** ${FOLDER_URL}\n`;
      fs.appendFileSync(filePath, driveLink);
      console.log(`Added Drive link to ${file}`);
    } catch (e) {
      console.error(`Error uploading ${file}: ${e.message}`);
    }
  }
  
  console.log('Sync complete!');
}

// Run if called directly
if (require.main === module) {
  syncResearchDocs().catch(console.error);
}

module.exports = { syncResearchDocs };
