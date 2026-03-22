#!/usr/bin/env node
/**
 * Daily Memory Log
 * Creates/updates today's memory file with conversation summaries
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';
const WORKSPACE = '/home/john/.openclaw/workspace';
const TODAY = new Date().toISOString().split('T')[0];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = DAY_NAMES[new Date().getDay()];

function getMemoryPath() {
  return path.join(MEMORY_DIR, `${TODAY}.md`);
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch(e) {
    return '';
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function getSessionSummary() {
  // Look for recent session transcripts
  const transcriptsDir = path.join(WORKSPACE, 'transcripts');
  if (!fs.existsSync(transcriptsDir)) return null;
  
  const files = fs.readdirSync(transcriptsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ f, mtime: fs.statSync(path.join(transcriptsDir, f)).mtime.getTime() }))
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, 3);
  
  if (!files.length) return null;
  
  let totalMessages = 0;
  let totalWords = 0;
  const recentFiles = files.map(({ f }) => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(transcriptsDir, f), 'utf8'));
      const messages = Array.isArray(content) ? content : (content.messages || []);
      const words = messages.reduce((sum, m) => sum + (m.text || '').split(/\s+/).length, 0);
      totalMessages += messages.length;
      totalWords += words;
      return { name: f, messages: messages.length, date: new Date(files.find(x => x.f === f).mtime).toISOString() };
    } catch(e) {
      return null;
    }
  }).filter(Boolean);
  
  if (!totalMessages) return null;
  
  return {
    files: recentFiles,
    totalMessages,
    totalWords
  };
}

function createOrUpdateDailyMemory() {
  const memPath = getMemoryPath();
  const existing = readFile(memPath);
  
  // Check if already has today's header
  const hasTodayHeader = existing.includes(`# ${TODAY}`);
  
  if (existing && hasTodayHeader) {
    console.log(`[memory] ${TODAY} already exists, checking for updates...`);
    return { action: 'skip', reason: 'already_exists' };
  }
  
  // Build header
  const header = `# ${TODAY} — ${dayName}\n\n`;
  
  // Get session summary
  const sessionInfo = getSessionSummary();
  
  let content = header;
  
  if (sessionInfo) {
    content += `## Session Activity\n`;
    content += `- ${sessionInfo.totalMessages} messages, ~${Math.round(sessionInfo.totalWords / 100) * 100} words\n`;
    content += `- Recent sessions: ${sessionInfo.files.map(f => f.name.replace('.json', '')).join(', ')}\n\n`;
  }
  
  content += `## Summary\n\n<!-- Add today's conversation summary below this line -->\n\n---\n`;
  
  if (existing) {
    // Prepend today's section to existing file
    content = content + existing;
  }
  
  writeFile(memPath, content);
  console.log(`[memory] Created/updated ${memPath}`);
  return { action: 'created', path: memPath };
}

// Run
const result = createOrUpdateDailyMemory();
console.log(`[memory] Result: ${result.action}`);
if (result.path) console.log(`[memory] Path: ${result.path}`);
