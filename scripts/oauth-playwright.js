#!/usr/bin/env node
/**
 * Gmail OAuth via Playwright - launch Chrome manually on :10, then attach via CDP
 */
const { chromium } = require('/home/john/.npm-global/lib/node_modules/playwright');
const http = require('http');
const url = require('url');
const fs = require('fs');
const { spawn } = require('child_process');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const TOKEN_PATH = CONFIG_PATH + '/google-oauth-token.json';
const PORT = 9002;

const creds = JSON.parse(fs.readFileSync(CONFIG_PATH + '/google-oauth.json', 'utf8')).web;
const { client_id, client_secret } = creds;

const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive';

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&prompt=consent`;

console.log('Auth URL:', authUrl);
console.log('Redirect URI:', REDIRECT_URI);

// HTTP server to catch redirect
let server;
const codePromise = new Promise(r => {
  server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const code = parsed.query.code;
    if (code) {
      console.log('Got code!');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>Authenticated! You can close this window.</h1></body></html>');
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
  let chromeProcess;
  try {
    // Start Chrome manually on DISPLAY=:10 with CDP debugging enabled
    const chromeArgs = [
      '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
      '--auth-server-whitelist="*"',
      '--remote-debugging-port=9222',
      '--user-data-dir=/tmp/pw-gmail-oauth',
      authUrl
    ];
    
    console.log('Starting Chrome on DISPLAY=:10...');
    chromeProcess = spawn('google-chrome', chromeArgs, {
      env: { ...process.env, DISPLAY: ':10' },
      detached: true,
      stdio: 'ignore'
    });
    chromeProcess.unref();
    
    // Wait for Chrome to start and CDP to be ready
    console.log('Waiting for Chrome to start...');
    await new Promise(r => setTimeout(r, 5000));
    
    // Connect via CDP
    console.log('Connecting via CDP...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages().find(p => !p.url().startsWith('chrome://')) || ctx.pages()[0] || await ctx.newPage();
    
    console.log('Current URL:', page.url());
    
    // If URL is not the auth URL yet (we navigated to it via command line), wait
    if (!page.url().includes('accounts.google.com')) {
      console.log('Navigating to auth URL...');
      await page.goto(authUrl, { waitUntil: 'networkidle', timeout: 300000 });
    }
    
    console.log('Waiting for redirect with code...');
    // Poll URL for up to 5 minutes
    const startTime = Date.now();
    while (Date.now() - startTime < 300000) {
      const currentUrl = page.url();
      if (currentUrl.includes('localhost') && currentUrl.includes('code=')) {
        const parsed = url.parse(currentUrl, true);
        if (parsed.query.code) {
          console.log('Code received!');
          const code = parsed.query.code;
          
          const params = new URLSearchParams({
            code, client_id, client_secret, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code',
          });
          const resp = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST', body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
          const tokens = await resp.json();
          if (!resp.ok) throw new Error('Token exchange failed: ' + JSON.stringify(tokens));
          
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
          break;
        }
      }
      if (currentUrl.includes('?error=')) {
        const parsed = url.parse(currentUrl, true);
        throw new Error('OAuth error: ' + parsed.query.error);
      }
      await page.waitForTimeout(2000);
      console.log('Still waiting... current URL:', page.url().substring(0, 60));
    }
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (chromeProcess) {
      try { process.kill(-chromeProcess.pid, 'SIGKILL'); } catch(_) {}
    }
    server.close();
  }
})();
