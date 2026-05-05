#!/usr/bin/env node
/**
 * Complete Google OAuth re-authentication
 * Usage: node complete-reauth.js <authorization_code>
 */

const fs = require('fs');
const { google } = require('googleapis');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const TOKEN_PATH = '/home/john/.openclaw/secure/google-oauth-token.json';

if (process.argv.length < 3) {
  console.log('Usage: node complete-reauth.js <authorization_code>');
  console.log('\nGet the code from the Google authorization URL.');
  process.exit(1);
}

const authCode = process.argv[2];

const credsData = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/drive.readonly'
];

const oauth2Client = new google.auth.OAuth2(
  credsData.web.client_id,
  credsData.web.client_secret,
  'http://localhost'
);

async function completeReauth() {
  console.log('Exchanging authorization code for tokens...');
  
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    oauth2Client.setCredentials(tokens);
    
    // Build proper token format
    const newCreds = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: SCOPES.join(' '),
      token_type: 'Bearer',
      expiry_date: tokens.expiry_date
    };
    
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(newCreds, null, 2));
    console.log('✅ New tokens saved successfully!');
    console.log('You can now run the calendar sync again.');
    
    // Clean up flag files
    const flagFiles = [
      '/home/john/.openclaw/secure/calendar-sync-needs-reauth.flag'
    ];
    for (const f of flagFiles) {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
        console.log(`Cleaned up: ${f}`);
      }
    }
    
  } catch (err) {
    console.error('❌ Error getting tokens:', err.message);
    process.exit(1);
  }
}

completeReauth();