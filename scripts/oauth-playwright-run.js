#!/usr/bin/env node
/**
 * Gmail OAuth - Chrome already has the page open. 
 * Just wait for the redirect with the code.
 */
const { chromium } = require('/home/john/.npm-global/lib/node_modules/playwright');
const http = require('http');
const url = require('url');
const fs = require('fs');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const TOKEN_PATH = CONFIG_PATH + '/google-oauth-token.json';
const PORT = 9002;

const creds = JSON.parse(fs.readFileSync(CONFIG_PATH + '/google-oauth.json', 'utf8')).web;
const { client_id, client_secret } = creds;

const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive';

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&prompt=consent`;

console.log('Connecting to existing Chrome on :10 (port 9222)...');
console.log('Auth URL:', authUrl);

// HTTP server to catch redirect
let server;
const codePromise = new Promise(r => {
  server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const code = parsed.query.code;
    if (code) {
      console.log('Got code!');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>Authenticated!</h1></body></html>');
      server.close();
      r(code);
    } else {
      res.writeHead(400);
      res.end('No code');
    }
  });
  server.listen(PORT, '127.0.0.1', () => console.log(`HTTP server on ${PORT}`));
});

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    let page = ctx.pages().find(p => p.url().includes('accounts.google.com'));
    if (!page) {
      page = ctx.pages()[0];
    }
    
    console.log('Found page URL:', page.url().substring(0, 80));
    
    // Wait indefinitely for the redirect
    console.log('Waiting for user to complete login in Chrome...');
    const code = await codePromise;
    
    console.log('Exchanging code for tokens...');
    const params = new URLSearchParams({
      code, client_id, client_secret, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code',
    });
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const tokens = await resp.json();
    if (!resp.ok) throw new Error('Token failed: ' + JSON.stringify(tokens));
    
    console.log('Token SUCCESS! expires in:', tokens.expires_in, 'sec');
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || '',
      token_type: tokens.token_type || 'Bearer',
      expiry_date: (Date.now() / 1000 + tokens.expires_in) * 1000,
      scope: SCOPE,
    };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
    console.log('Token saved to:', TOKEN_PATH);
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
})();
