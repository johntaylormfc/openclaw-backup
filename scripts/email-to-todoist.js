#!/usr/bin/env node
/**
 * Email to Todoist Cron Job
 * Runs every 30 minutes to check emails from specific domains and create Todoist tasks
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Check for --reauth flag FIRST, before any token checks
if (process.argv.includes('--reauth')) {
  console.log('=== Re-authorization Required ===');
  console.log('Generating new authorization URL...\n');
  
  const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
  const credsData = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
  const { client_id, client_secret } = credsData.web;
  
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost');
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/drive.readonly'
    ]
  });
  
  fs.writeFileSync('/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt', authUrl);
  
  console.log('🔗 Open this URL in your browser to authenticate:\n');
  console.log(authUrl + '\n');
  console.log('⏳ After authenticating, you will be redirected to a blank page.');
  console.log('   Copy the URL from your browser address bar and paste it here.\n');
  
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
  rl.question('Paste the full redirect URL: ', async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      
      // Save new tokens to secure path (matching calendar-to-todoist)
      const newCreds = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope || 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive.readonly',
        token_type: 'Bearer',
        expiry_date: tokens.expiry_date
      };
      
      fs.writeFileSync('/home/john/.openclaw/secure/google-oauth-token.json', JSON.stringify(newCreds, null, 2));
      console.log('\n✅ New tokens saved! Run the script again to process emails.');
    } catch (err) {
      console.error('❌ Error getting tokens:', err.message);
    }
    rl.close();
  });
  
  // Keep process alive for input
  setTimeout(() => {}, 60000);
  process.exit(0);
}

// Token path for regular execution
const tokenPath = '/home/john/.openclaw/secure/google-oauth-token.json';
const configTokenPath = '/home/john/.openclaw/workspace/config/google-oauth-token.json';

// Check if token exists in secure path, fall back to config path
let effectiveTokenPath = fs.existsSync(tokenPath) ? tokenPath : configTokenPath;

const gmailCredsRaw = fs.readFileSync(effectiveTokenPath, 'utf8');
if (!gmailCredsRaw.trim()) {
  console.log('⚠️  Token file is empty. Initiating re-authorization...');
  console.log('Run with --reauth flag to generate a new authorization URL.');
  process.exit(1);
}

const gmailCreds = JSON.parse(gmailCredsRaw);
const credsData = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth.json`, 'utf8'));
const todoistKey = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/todoist.json`, 'utf8')).todoist.api_key;

// Authenticate with auto-refresh
const oauth2Client = new google.auth.OAuth2(
  credsData.web.client_id,
  credsData.web.client_secret,
  'http://localhost'
);

oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scope,
  token_type: 'Bearer',
  expiry_date: gmailCreds.expiry_date
});

// Auto-refresh on 401 errors
const originalRequest = oauth2Client.request.bind(oauth2Client);
oauth2Client.request = async (...args) => {
  try {
    return await originalRequest(...args);
  } catch (e) {
    if (e.code === 401 || (e.response && e.response.status === 401)) {
      console.log('🔄 Token expired, refreshing...');
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
      gmailCreds.access_token = credentials.access_token;
      gmailCreds.refresh_token = credentials.refresh_token || gmailCreds.refresh_token;
      gmailCreds.expiry_date = credentials.expiry_date;
      fs.writeFileSync(tokenPath, JSON.stringify(gmailCreds, null, 2));
      console.log('✅ Token refreshed and saved');
      return await originalRequest(...args);
    }
    throw e;
  }
};

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Get last run time
function getLastRun() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const lastRun = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')).lastRun;
      // Subtract 1 hour to catch emails in the gap window
      const d = new Date(lastRun);
      d.setHours(d.getHours() - 1);
      return d.toISOString();
    }
  } catch (e) {}
  // Default: last 24 hours
  const date = new Date();
  date.setHours(date.getHours() - 24);
  return date.toISOString();
}

// Save last run time
function saveLastRun() {
  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastRun: new Date().toISOString() }));
}

// Get existing Todoist tasks to avoid duplicates
async function getExistingTasks() {
  const response = await fetch(`https://api.todoist.com/api/v1/tasks`, {
    headers: { 'Authorization': `Bearer ${todoistKey}` }
  });
  if (!response.ok) {
    const err = await response.text();
    console.error(`Todoist API error: ${err}`);
    return [];
  }
  const data = await response.json();
  return data.results || [];
}

// Check if task already exists for this email (by message ID in description)
function taskExists(existingTasks, messageId) {
  return existingTasks.some(t => {
    const desc = (t.description || '').toLowerCase();
    return desc.includes(messageId.toLowerCase());
  });
}

// Create Todoist task
async function createTask(subject, from, snippet, messageId) {
  const gmailLink = `https://mail.google.com/mail/u/0/#inbox/${messageId}`;
  const taskContent = `Email: ${subject} | From: ${from}`;
  const taskDescription = `Gmail: ${gmailLink}\n\nSummary: ${snippet}`;
  
  const response = await fetch('https://api.todoist.com/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${todoistKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: taskContent,
      description: taskDescription,
      priority: 3 // High priority
    })
  });
  
  if (response.ok) {
    const task = await response.json();
    console.log(`✅ Created task: ${taskContent}`);
    return task;
  } else {
    const err = await response.text();
    console.error(`❌ Failed to create task: ${err}`);
    return null;
  }
}

// Process emails
async function processEmails() {
  console.log('=== Email to Todoist Cron ===');
  console.log('Domains:', MONITORED_DOMAINS.join(', '));
  
  const lastRun = getLastRun();
  console.log('Checking emails since:', lastRun);
  
  try {
    // Search for emails from monitored domains
    const query = `after:${Math.floor(new Date(lastRun).getTime() / 1000)}`;
    const result = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 50
    });
    
    const messages = result.data.messages || [];
    console.log(`Found ${messages.length} recent emails`);
    
    // Get existing Todoist tasks for duplicate check
    const existingTasks = await getExistingTasks();
    console.log(`Checking against ${existingTasks.length} existing Todoist tasks`);
    
    let newTasks = 0;
    
    for (const msg of messages) {
      const detail = await gmail.users.messages.get({ 
        userId: 'me', 
        id: msg.id,
        format: 'full'
      });
      
      const headers = detail.data.payload.headers;
      const from = headers.find(h => h.name === 'From')?.value || '';
      const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
      const date = headers.find(h => h.name === 'Date')?.value;
      const snippet = detail.data.snippet || '';
      
      // Check if from monitored domain
      const isMonitored = MONITORED_DOMAINS.some(d => from.toLowerCase().includes(d));
      
      if (isMonitored) {
        console.log(`\n📧 From: ${from}`);
        console.log(`   Subject: ${subject}`);
        
        // Check for duplicates by message ID
        if (taskExists(existingTasks, msg.id)) {
          console.log('   ⏭️  Duplicate found, skipping');
          continue;
        }
        
        // Create task
        const task = await createTask(subject, from, snippet, msg.id);
        if (task) newTasks++;
        
        // Add to existing list to avoid creating multiple for same email
        existingTasks.push({ description: `Gmail Message ID: ${msg.id}` });
      }
    }
    
    console.log(`\n=== Summary ===`);
    console.log(`New tasks created: ${newTasks}`);
    
    // Save state
    saveLastRun();
    
    // Only notify if new tasks were created or error
    if (newTasks > 0) {
      const { execSync } = require('child_process');
      try {
        execSync(`openclaw message send --to +447967688452 --message "📧 Email sync: ${newTasks} new task(s) added to Todoist"`, { stdio: 'ignore' });
      } catch (e) {}
    }
    
  } catch (e) {
    console.error('Error:', e.message);
    if (e.message.includes('invalid_grant')) {
      console.log('⚠️ Gmail OAuth token expired - needs re-authentication');
    }
    try {
      const { execSync } = require('child_process');
      execSync(`openclaw message send --to +447967688452 --message "❌ Email→Todoist error: ${e.message}"`, { stdio: 'ignore' });
    } catch (e2) {}
    process.exit(1);
  }
}

processEmails();
