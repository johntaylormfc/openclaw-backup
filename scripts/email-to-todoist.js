#!/usr/bin/env node
/**
 * Email to Todoist Cron Job
 * Runs every 30 minutes to check emails from specific domains and create Todoist tasks
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const STATE_FILE = '/tmp/email-cron-lastrun.json';

// Domains to monitor
const MONITORED_DOMAINS = ['galloway-macleod.co.uk', 'bcdev.co.uk', 'bcdevltd.com'];

// Load credentials - create new token file if missing
const tokenPath = `${CONFIG_PATH}/google-oauth-token.json`;
if (!fs.existsSync(tokenPath)) {
  console.log('❌ No OAuth token found. Starting OAuth flow...\n');
  
  const credsPath = `${CONFIG_PATH}/google-oauth.json`;
  if (!fs.existsSync(credsPath)) {
    console.error('❌ No OAuth credentials found at:', credsPath);
    process.exit(1);
  }
  
  const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  const { client_id, client_secret } = creds.web;
  
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost');
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });
  
  console.log('🔗 Open this URL in your browser to authenticate:\n');
  console.log(authUrl + '\n');
  console.log('⏳ After authenticating, you will be redirected to a blank page.');
  console.log('   Copy the URL from your browser address bar and paste it here.\n');
  
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
  rl.question('Paste the full redirect URL: ', async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
      console.log('\n✅ Token saved! Run the script again to process emails.');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error getting token:', err.message);
      process.exit(1);
    }
  });
  process.exit(0);
}

const gmailCreds = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
const todoistKey = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/todoist.json`, 'utf8')).todoist.api_key;

// Authenticate with auto-refresh
const oauth2Client = new google.auth.OAuth2(
  gmailCreds.client_id,
  gmailCreds.client_secret,
  'http://localhost'
);

oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scopes,
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
      fs.writeFileSync(`${CONFIG_PATH}/google-oauth-token.json`, JSON.stringify(gmailCreds, null, 2));
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
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')).lastRun;
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
  const response = await fetch(`https://api.todoist.com/api/v1/tasks?project_id=`, {
    headers: { 'Authorization': `Bearer ${todoistKey}` }
  });
  const data = await response.json();
  return data.results || [];
}

// Check if task already exists for this email
function taskExists(existingTasks, emailSubject, emailFrom) {
  const searchStr = (emailSubject + ' ' + emailFrom).toLowerCase();
  return existingTasks.some(t => {
    const taskStr = t.content.toLowerCase();
    return taskStr.includes(emailFrom.toLowerCase()) || 
           (emailSubject && taskStr.includes(emailSubject.substring(0, 30).toLowerCase()));
  });
}

// Create Todoist task
async function createTask(subject, from, snippet, messageId) {
  const taskContent = `Email: ${subject} | From: ${from}`;
  const taskDescription = `${snippet}\n\nGmail Message ID: ${messageId}`;
  
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
        
        // Check for duplicates
        if (taskExists(existingTasks, subject, from)) {
          console.log('   ⏭️  Duplicate found, skipping');
          continue;
        }
        
        // Create task
        const task = await createTask(subject, from, snippet, msg.id);
        if (task) newTasks++;
        
        // Add to existing list to avoid creating multiple for same email
        existingTasks.push({ content: subject + ' ' + from });
      }
    }
    
    console.log(`\n=== Summary ===`);
    console.log(`New tasks created: ${newTasks}`);
    
    // Save state
    saveLastRun();
    
  } catch (e) {
    console.error('Error:', e.message);
    if (e.message.includes('invalid_grant')) {
      console.log('⚠️ Gmail OAuth token expired - needs re-authentication');
    }
  }
}

processEmails();
