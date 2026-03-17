#!/usr/bin/env node
/**
 * Session Transcript Manager
 * Tracks full chat history with searchable summaries
 */

const fs = require('fs');
const path = require('path');

const TRANSCRIPT_DIR = '/home/john/.openclaw/workspace/transcripts';
const SUMMARY_FILE = '/home/john/.openclaw/workspace/memory/session-summaries.md';
const SUMMARY_JSON = '/home/john/.openclaw/workspace/memory/session-summaries.json';

// Ensure directories exist
if (!fs.existsSync(TRANSCRIPT_DIR)) {
  fs.mkdirSync(TRANSCRIPT_DIR, { recursive: true });
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function saveTranscript(sessionId, messages) {
  const today = getToday();
  const file = path.join(TRANSCRIPT_DIR, `${today}.json`);
  
  let transcripts = {};
  if (fs.existsSync(file)) {
    transcripts = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  
  transcripts[sessionId] = {
    timestamp: new Date().toISOString(),
    messageCount: messages.length,
    messages: messages.slice(-50)  // Keep last 50 messages
  };
  
  fs.writeFileSync(file, JSON.stringify(transcripts, null, 2));
}

function generateSummary(sessionId, messages) {
  if (!messages || messages.length === 0) return null;
  
  const firstMsg = messages[0].content?.substring(0, 100) || 'Empty';
  const lastMsg = messages[messages.length - 1].content?.substring(0, 100) || 'Empty';
  
  // Extract topics
  const topics = [];
  const allText = messages.map(m => m.content || '').join(' ').toLowerCase();
  
  const topicKeywords = {
    'trading': ['trading', 'stocks', 'crypto', 'alpaca', 'bot'],
    'docker': ['docker', 'container', 'arr', 'sonarr', 'radarr'],
    'dashboard': ['dashboard', 'kanban', 'tasks'],
    'memory': ['memory', 'remember', 'forget'],
    'github': ['github', 'repo', 'pr'],
    'email': ['email', 'todoist', 'gmail']
  };
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(k => allText.includes(k))) {
      topics.push(topic);
    }
  }
  
  return {
    sessionId,
    date: getToday(),
    time: new Date().toISOString(),
    topics,
    firstMessage: firstMsg,
    lastMessage: lastMsg,
    messageCount: messages.length
  };
}

function updateSummaryIndex(summary) {
  let summaries = [];
  if (fs.existsSync(SUMMARY_JSON)) {
    try {
      summaries = JSON.parse(fs.readFileSync(SUMMARY_JSON, 'utf8'));
    } catch (e) {
      summaries = [];
    }
  }
  
  // Avoid duplicates
  summaries = summaries.filter(s => s.sessionId !== summary.sessionId || s.date !== summary.date);
  summaries.unshift(summary);
  
  // Keep last 100
  summaries = summaries.slice(0, 100);
  
  fs.writeFileSync(SUMMARY_JSON, JSON.stringify(summaries, null, 2));
  
  // Also update markdown
  let md = '# Session Summaries\n\n';
  for (const s of summaries.slice(0, 20)) {
    md += `## ${s.date} - ${s.topics.join(', ') || 'General'}\n`;
    md += `- Messages: ${s.messageCount}\n`;
    md += `- First: ${s.firstMessage}\n`;
    md += `- Last: ${s.lastMessage}\n\n`;
  }
  
  fs.writeFileSync(SUMMARY_FILE, md);
}

function searchTranscripts(query) {
  const files = fs.readdirSync(TRANSCRIPT_DIR).filter(f => f.endsWith('.json'));
  const results = [];
  const queryLower = query.toLowerCase();
  
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(TRANSCRIPT_DIR, file), 'utf8'));
    for (const [sessionId, transcript] of Object.entries(data)) {
      for (const msg of transcript.messages || []) {
        if ((msg.content || '').toLowerCase().includes(queryLower)) {
          results.push({
            file,
            sessionId,
            message: msg.content?.substring(0, 200)
          });
          break;  // One match per session
        }
      }
    }
  }
  
  return results.slice(0, 10);
}

function updateFromFiles(files) {
  if (!files || files.length === 0) {
    console.log('No files to update');
    return;
  }
  
  let updated = 0;
  for (const file of files) {
    try {
      if (!fs.existsSync(file)) continue;
      
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      
      for (const [sessionId, transcript] of Object.entries(data)) {
        if (transcript.messages && transcript.messages.length > 0) {
          const summary = generateSummary(sessionId, transcript.messages);
          if (summary) {
            updateSummaryIndex(summary);
            updated++;
          }
        }
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
  console.log(`Updated ${updated} session summaries`);
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'save') {
  // Usage: node transcript-manager.js save <sessionId> '<messages_json>'
  const sessionId = args[1];
  const messages = JSON.parse(args[2] || '[]');
  saveTranscript(sessionId, messages);
  
  const summary = generateSummary(sessionId, messages);
  if (summary) {
    updateSummaryIndex(summary);
  }
  console.log('Transcript saved');
} else if (args[0] === 'update') {
  // Usage: node transcript-manager.js update <file1> <file2> ...
  const files = args.slice(1);
  updateFromFiles(files);
} else if (args[0] === 'search') {
  const results = searchTranscripts(args.slice(1).join(' '));
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log('Usage: transcript-manager.js save <sessionId> <json> | update <files...> | search <query>');
}
