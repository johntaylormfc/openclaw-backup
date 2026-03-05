const { google } = require('googleapis');
const fs = require('fs');

const CREDENTIALS_PATH = '/home/john/.openclaw/workspace/config/google-oauth.json';
const TOKEN_PATH = '/home/john/.openclaw/secure/google-oauth-token.json';

const code = process.argv[2];
if (!code) {
  console.log('Usage: node exchange_code.js <CODE_FROM_OAUTH_URL>');
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8')).web;
const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  'http://localhost'
);

oauth2Client.getToken(code, (err, token) => {
  if (err) {
    console.log('Error:', err.message);
    return;
  }
  console.log('Token received!');
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
  console.log('Saved to:', TOKEN_PATH);
});
