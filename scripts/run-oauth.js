#!/usr/bin/env node
/**
 * Run Gmail OAuth flow - opens Chrome and captures the auth code
 */
const { google } = require('googleapis');
const fs = require('fs');
const { execSync, spawn } = require('child_process');
const http = require('http');
const url = require('url');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';

const creds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const { client_id, client_secret } = creds.web;

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost');

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/drive'
  ],
  prompt: 'consent'
});

console.log('Auth URL:', authUrl);

// Start a local HTTP server to catch the redirect
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const code = parsed.query.code;
  
  if (code) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>✅ Authentication Successful!</h1><p>You can close this window. Check the terminal.</p></body></html>');
    server.close();
    
    console.log('\n✅ Got auth code! Exchanging for tokens...\n');
    
    oauth2Client.getToken(code).then(({ tokens }) => {
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log('✅ Token saved to:', TOKEN_PATH);
      console.log('Access token expires:', new Date(tokens.expiry_date));
      process.exit(0);
    }).catch(err => {
      console.error('❌ Error exchanging token:', err.message);
      process.exit(1);
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No code received');
  }
});

server.listen(80, () => {
  console.log('HTTP server listening on port 80...');
  console.log('Opening Chrome...');
  
  // Open Chrome in fullscreen kiosk mode
  try {
    execSync('/usr/bin/google-chrome --kiosk --incognito "' + authUrl + '"', { 
      detached: true, 
      stdio: 'ignore' 
    });
    console.log('Chrome opened! Complete the auth in the browser.');
    console.log('Waiting for redirect...');
  } catch (e) {
    console.error('Failed to open Chrome:', e.message);
    console.log('\nManually open this URL in your browser:');
    console.log(authUrl);
  }
});

// Timeout after 5 minutes
setTimeout(() => {
  console.log('\n⏰ Timeout reached. Closing server.');
  server.close();
  process.exit(1);
}, 300000);
