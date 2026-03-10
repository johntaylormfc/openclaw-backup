#!/usr/bin/env node
/**
 * Exchange auth code for new token
 */
const fs = require('fs');
const { google } = require('googleapis');

const CREDS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';
const TOKEN_PATH = '/home/john/.openclaw/workspace/config/google-oauth-token.json';

const creds = require(CREDS_PATH);
const oAuth2Client = new google.auth.OAuth2(
  creds.web.client_id,
  creds.web.client_secret,
  creds.web.redirect_uris[0]
);

const code = process.argv[2];
if (!code) {
  console.error('Usage: node gdrive-reauth.js <authorization_code>');
  process.exit(1);
}

oAuth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error getting token:', err);
    process.exit(1);
  }
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('Token saved! New scopes:', tokens.scope);
});
