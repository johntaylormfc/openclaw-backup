#!/usr/bin/env node
/**
 * Test Google Drive upload
 */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';
const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';

const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web;

const oauth2Client = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  'http://localhost'
);

oauth2Client.setCredentials(token);
const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function testUpload() {
  // Create test file content
  const testContent = 'Test file created at ' + new Date().toISOString();
  const testPath = '/tmp/gdrive-test-' + Date.now() + '.txt';
  fs.writeFileSync(testPath, testContent);
  
  try {
    const response = await drive.files.create({
      resource: {
        name: 'ARR_Bot_Test_' + Date.now() + '.txt',
        mimeType: 'text/plain'
      },
      media: {
        body: fs.createReadStream(testPath)
      }
    });
    console.log('SUCCESS! File ID:', response.data.id);
    console.log('WebViewLink:', response.data.webViewLink);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

testUpload();
