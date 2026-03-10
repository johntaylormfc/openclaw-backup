#!/usr/bin/env node
/**
 * Calendar to Todoist Sync
 * Pulls events from Google Calendar and creates Todoist tasks for follow-ups
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/home/john/.openclaw/workspace/config';
const STATE_FILE = '/tmp/calendar-cron-lastrun.json';

// Load credentials
const gmailCreds = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/google-oauth-token.json`, 'utf8'));
const todoistKey = JSON.parse(fs.readFileSync(`${CONFIG_PATH}/todoist.json`, 'utf8')).todoist.api_key;

// Authenticate
// Required scopes for this script
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/drive.readonly'
];

const oauth2Client = new google.auth.OAuth2(
  gmailCreds.client_id,
  gmailCreds.client_secret,
  'http://localhost'
);

oauth2Client.setCredentials({
  access_token: gmailCreds.access_token,
  refresh_token: gmailCreds.refresh_token,
  scope: gmailCreds.scope,  // Note: singular "scope" not "scopes"
  token_type: 'Bearer',
  expiry_date: gmailCreds.expiry_date
});

// Auto-refresh on 401 errors and handle scope issues
const originalRequest = oauth2Client.request.bind(oauth2Client);
oauth2Client.request = async (...args) => {
  try {
    return await originalRequest(...args);
  } catch (e) {
    const status = e.response?.status;
    const errorMsg = e.response?.data?.error_description || e.message;
    
    // Handle insufficient scope error
    if (status === 403 && errorMsg.includes('insufficient authentication scopes')) {
      console.log('❌ Token scopes are insufficient for Calendar access.');
      console.log('⚠️  Please re-authorize the application with calendar scope.');
      console.log('   Run: node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js --reauth');
      process.exit(1);
    }
    
    if (e.code === 401 || status === 401) {
      console.log('🔄 Token expired, refreshing...');
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
      // Save refreshed tokens
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

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
const TODOIST_API = 'https://api.todoist.com/api/v1/tasks';

// Check for --reauth flag
if (process.argv.includes('--reauth')) {
  console.log('=== Re-authorization Required ===');
  console.log('Generating new authorization URL...\n');
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
  console.log('Please visit this URL to authorize:');
  console.log(authUrl);
  console.log('\nThen enter the authorization code:');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Code: ', async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      
      // Save new tokens
      const newCreds = {
        ...gmailCreds,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scopes: tokens.scope || SCOPES.join(' '),
        expiry_date: tokens.expiry_date
      };
      fs.writeFileSync(`${CONFIG_PATH}/google-oauth-token.json`, JSON.stringify(newCreds, null, 2));
      console.log('✅ New tokens saved successfully!');
      console.log('You can now run the sync again.');
    } catch (err) {
      console.error('Error getting tokens:', err.message);
    }
    readline.close();
  });
  process.exit(0);
}

async function getExistingTasks() {
  const response = await fetch(TODOIST_API, {
    headers: { 'Authorization': `Bearer ${todoistKey}` }
  });
  if (!response.ok) {
    console.error(`Todoist API error: ${response.status} ${response.statusText}`);
    return [];
  }
  const data = await response.json();
  return Array.isArray(data) ? data : (data.results || []);
}

async function createTask(title, dueString, description) {
  const response = await fetch(TODOIST_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${todoistKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: title,
      due_string: dueString,
      description: description
    })
  });
  if (!response.ok) {
    const err = await response.text();
    console.error(`Failed to create task: ${err}`);
    return null;
  }
  return response.json();
}

async function syncCalendar() {
  console.log('=== Calendar to Todoist Sync ===');
  
  // Get time range (today + tomorrow)
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfTomorrow = new Date(startOfDay);
  endOfTomorrow.setDate(endOfTomorrow.getDate() + 2);
  
  const timeMin = startOfDay.toISOString();
  const timeMax = endOfTomorrow.toISOString();
  
  try {
    // Fetch calendar events
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    });
    
    const eventList = events.data.items || [];
    console.log(`Found ${eventList.length} events in next 48 hours`);
    
    // Get existing Todoist tasks to avoid duplicates
    const existingTasks = await getExistingTasks();
    console.log(`Checking against ${existingTasks.length} existing Todoist tasks`);
    
    let newTasksCreated = 0;
    
    for (const event of eventList) {
      const title = event.summary || 'Untitled Event';
      const eventId = event.id;
      const eventLink = event.htmlLink;
      
      // Check if we already have a task for this event
      const isDuplicate = existingTasks.some(t => 
        t.description && t.description.includes(eventId)
      );
      
      if (isDuplicate) {
        console.log(`⏭️  ${title} - duplicate, skipping`);
        continue;
      }
      
      // Parse start time for due date
      let dueString = 'today';
      if (event.start && event.start.dateTime) {
        const eventDate = new Date(event.start.dateTime);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (eventDate >= tomorrow) {
          dueString = eventDate.toISOString().split('T')[0];
        }
      }
      
      // Create task
      const description = `From calendar: ${eventLink}\nEvent ID: ${eventId}`;
      await createTask(title, dueString, description);
      console.log(`✅ Created task: ${title} (due: ${dueString})`);
      newTasksCreated++;
    }
    
    console.log(`\n=== Summary ===`);
    console.log(`New tasks created: ${newTasksCreated}`);
    
  } catch (error) {
    console.error('Error syncing calendar:', error.message);
    process.exit(1);
  }
}

syncCalendar();
