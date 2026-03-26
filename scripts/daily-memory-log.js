#!/usr/bin/env node
/**
 * Daily Memory Log
 * Creates/updates today's memory file with session summaries
 * Reads from session-summaries.json (populated by hourly transcript-manager.js)
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';
const SUMMARY_JSON = '/home/john/.openclaw/workspace/memory/session-summaries.json';
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

function getTodaySummaries() {
  if (!fs.existsSync(SUMMARY_JSON)) return [];
  try {
    const all = JSON.parse(fs.readFileSync(SUMMARY_JSON, 'utf8'));
    // Get all entries for today
    return all.filter(s => s.date === TODAY);
  } catch(e) {
    return [];
  }
}

function getTopTopics(summaries) {
  const counts = {};
  for (const s of summaries) {
    for (const t of s.topics || []) {
      counts[t] = (counts[t] || 0) + s.messageCount;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);
}

function buildDailyEntry() {
  const summaries = getTodaySummaries();
  const topTopics = getTopTopics(summaries);
  const totalMsgs = summaries.reduce((sum, s) => sum + (s.messageCount || 0), 0);

  // Get decisions from today's sessions
  const decisions = summaries
    .flatMap(s => s.decisions || [])
    .filter(Boolean)
    .slice(0, 5);

  // Get top contributors
  const contributors = [...new Set(summaries.flatMap(s => s.contributors || []))];

  // Key session info
  const bigSession = summaries.sort((a, b) => (b.messageCount || 0) - (a.messageCount || 0))[0];

  let entry = `# ${TODAY} (${dayName})\n\n`;
  entry += `## Sessions Today\n`;
  entry += `- ${summaries.length} sessions, ${totalMsgs} total messages\n`;
  entry += `- Topics: ${topTopics.join(', ') || 'General'}\n`;
  if (contributors.includes('assistant')) {
    entry += `- Agents active\n`;
  }

  if (bigSession && bigSession.topics && bigSession.topics.length) {
    entry += `\n## Main Session (${bigSession.messageCount} msgs)\n`;
    entry += `Topics: ${bigSession.topics.join(', ')}\n`;
    entry += `Summary: ${bigSession.firstMsg}\n`;
  }

  if (decisions.length) {
    entry += `\n## Decisions Today\n`;
    for (const d of decisions) {
      entry += `- ${d}\n`;
    }
  }

  entry += `\n---\n`;
  return entry;
}

function main() {
  const memoryPath = getMemoryPath();
  const existing = fileExists(memoryPath) ? readFile(memoryPath) : '';

  // Check if we already have a proper entry for today
  if (existing.includes(`## Sessions Today`)) {
    console.log(`Daily entry for ${TODAY} already exists. Skipping.`);
    return;
  }

  const entry = buildDailyEntry();

  // If file exists, append; otherwise create
  if (existing) {
    writeFile(memoryPath, existing + '\n\n' + entry);
  } else {
    writeFile(memoryPath, entry);
  }

  console.log(`Daily memory entry written to ${memoryPath}`);
  console.log(entry);
}

main();
