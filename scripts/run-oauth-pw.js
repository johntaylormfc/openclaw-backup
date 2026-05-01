#!/usr/bin/env node
/**
 * Gmail OAuth via Playwright - use Playwright's bundled Chromium
 */
const { chromium } = require('/home/john/.npm-global/lib/node_modules/playwright');
const http = require('http');
const url = require('url');
const fs = require('fs');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const TOKEN_PATH = CONFIG_PATH + '/google-oauth-token.json';
const REDIRECT_PORT = 9967;

const creds = JSON.parse(fs.readFileSync(CONFIG_PATH + '/google-oauth.json', 'utf8')).web;
const { client_id, client_secret } = creds;

const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive.readonly';
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&prompt=consent`;

console.log('Auth URL:', authUrl);

// HTTP server to catch redirect
let server;
let getCode;
const codePromise = new Promise(r => { getCode = r; });
server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const code = parsed.query.code;
  if (code) {
    console.log('✅ Got auth code!');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>✅ Authentication Successful!</h1><p>You can close this window.</p></body></html>');
    server.close();
    getCode(code);
  } else {
    res.writeHead(400);
    res.end('No code');
  }
});

server.listen(REDIRECT_PORT, '127.0.0.1', async () => {
  console.log(`Server on ${REDIRECT_PORT}. Launching Playwright Chromium on Xvfb...`);

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--disable-gpu', '--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(authUrl, { waitUntil: 'networkidle0' });

    console.log('Page loaded. URL:', page.url().substring(0, 80));

    // Wait for redirect
    const code = await codePromise;

    console.log('Exchanging code for tokens...');
    const params = new URLSearchParams({
      code, client_id, client_secret, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code',
    });
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const tokens = await resp.json();
    if (!resp.ok) throw new Error('Token failed: ' + JSON.stringify(tokens));

    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || '',
      token_type: tokens.token_type || 'Bearer',
      expiry_date: (Date.now() / 1000 + tokens.expires_in) * 1000,
      scope: SCOPE,
    };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
    console.log('✅ Token saved! Expires in:', tokens.expires_in, 'seconds');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
    process.exit(process.exitCode || 0);
  }
});

setTimeout(() => {
  console.error('⏰ Timeout');
  process.exit(1);
}, 300000);