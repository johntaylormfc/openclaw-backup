#!/usr/bin/env node
/**
 * Generate OAuth URL for re-authentication
 */
const fs = require('fs');
const { google } = require('googleapis');

const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';

const creds = require(CREDS_PATH);
const oAuth2Client = new google.auth.OAuth2(
  creds.web.client_id,
  creds.web.client_secret,
  creds.web.redirect_uris[0]
);

// Required scopes for full Drive access
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/gmail.readonly'
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log('Visit this URL to re-authorize:\n');
console.log(authUrl);
console.log('\nThen run: node /home/john/.openclaw/workspace/scripts/gdrive-reauth.js <code>');
