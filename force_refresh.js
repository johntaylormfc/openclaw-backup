// force_refresh.js - Force token refresh and save
const fs = require('fs');
const { google } = require('googleapis');

const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';
const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';

const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web;
const tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

const oauth2Client = new google.auth.OAuth2(creds.client_id, creds.client_secret, 'http://localhost');
oauth2Client.setCredentials(tokenData);

oauth2Client.refreshAccessToken().then(tokens => {
  console.log('Token refreshed. Expiry:', new Date(tokens.expiry_date).toISOString());
  const merged = Object.assign(JSON.parse(fs.readFileSync(TOKEN_PATH)), tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
  console.log('Saved to', TOKEN_PATH);
}).catch(e => { console.error('Error:', e.message); process.exit(1); });