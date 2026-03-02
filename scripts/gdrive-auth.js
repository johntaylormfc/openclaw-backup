#!/usr/bin/env node
const { google } = require('googleapis');
const fs = require('fs');
const http = require('http');
const url = require('url');
const opener = require('opener');

const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';
const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';

const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web;

// Full Drive scopes
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send'
];

const oauth2Client = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  'http://localhost:3000'
);

// Generate auth URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log('Opening browser for authorization...');
opener(authUrl);

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/') {
    const code = parsedUrl.query.code;
    if (code) {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log('Token saved!');
        res.end('Authorization successful! You can close this tab.');
        server.close();
        process.exit(0);
      } catch (e) {
        console.error('Error getting token:', e.message);
        res.end('Error: ' + e.message);
        server.close();
        process.exit(1);
      }
    }
  }
});

server.listen(3001, () => {
  console.log('Waiting for callback...');
});
