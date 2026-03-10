#!/usr/bin/env node
const { google } = require('googleapis');
const fs = require('fs');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const creds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const { client_id, client_secret } = creds.web;

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost');

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/drive'
  ]
});

console.log('\n🔗 Open this URL in your browser:\n');
console.log(authUrl + '\n');
console.log('When redirected, copy the FULL URL from your browser address bar.');
console.log('The URL will look like: http://localhost/?code=xxx&scope=xxx\n');

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Paste the redirect URL: ', async (url) => {
  // Extract code from URL if full URL provided
  let code = url;
  if (url.includes('code=')) {
    try {
      const urlObj = new URL(url);
      code = urlObj.searchParams.get('code');
    } catch (e) {
      // URL parsing failed, try extracting code manually
      const match = url.match(/[?&]code=([^&]+)/);
      if (match) code = match[1];
    }
  }
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    const tokenPath = `${CONFIG_PATH}/google-oauth-token.json`;
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
    console.log('\n✅ Token saved! You can now run the email/calendar scripts.');
  } catch (err) {
    console.error('\n❌ Error:', err.message);
  }
  process.exit(0);
});
