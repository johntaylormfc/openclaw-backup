#!/usr/bin/env node
/**
 * Weekly Memory Digest
 * Summarizes what was worked on each week and sends via WhatsApp
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';
const WEEKLY_SUMMARY_FILE = '/home/john/.openclaw/workspace/memory/weekly-digest.md';

function getWeekRange() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return { monday, sunday };
}

function getMemoryFilesForWeek() {
  const { monday, sunday } = getWeekRange();
  const files = fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith('.md'));
  
  const memories = [];
  for (const file of files) {
    const filePath = path.join(MEMORY_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.mtime >= monday && stats.mtime <= sunday) {
      memories.push({
        file,
        content: fs.readFileSync(filePath, 'utf8'),
        modified: stats.mtime
      });
    }
  }
  
  return memories;
}

function extractTopics(content) {
  const topics = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Look for headers/keywords
    if (line.startsWith('##') || line.startsWith('###')) {
      const topic = line.replace(/^#+/, '').trim();
      if (topic.length > 3 && topic.length < 50) {
        topics.push(topic);
      }
    }
  }
  
  return topics.slice(0, 10);
}

function generateDigest() {
  const { monday, sunday } = getWeekRange();
  const memories = getMemoryFilesForWeek();
  
  const formatDate = d => d.toISOString().split('T')[0];
  
  let digest = `# Weekly Memory Digest\n`;
  digest += `**Week:** ${formatDate(monday)} to ${formatDate(sunday)}\n`;
  digest += `**Memory files:** ${memories.length}\n\n`;
  
  if (memories.length === 0) {
    digest += 'No significant memory activity this week.\n';
  } else {
    digest += '## Topics Worked On\n';
    const allTopics = new Set();
    for (const mem of memories) {
      const topics = extractTopics(mem.content);
      topics.forEach(t => allTopics.add(t));
    }
    for (const topic of Array.from(allTopics).slice(0, 15)) {
      digest += `- ${topic}\n`;
    }
    
    digest += '\n## Files Updated\n';
    for (const mem of memories) {
      digest += `- ${mem.file}\n`;
    }
  }
  
  digest += '\n## Decisions Made This Week\n';
  try {
    const decisions = JSON.parse(fs.readFileSync('/home/john/.openclaw/workspace/memory/decisions.json', 'utf8'));
    const weekDecisions = decisions.filter(d => {
      const dDate = new Date(d.date);
      return dDate >= monday && dDate <= sunday;
    });
    if (weekDecisions.length > 0) {
      for (const dec of weekDecisions) {
        digest += `- ${dec.decision} (${dec.topic})\n`;
      }
    } else {
      digest += 'No tracked decisions this week.\n';
    }
  } catch {
    digest += 'No decisions tracked.\n';
  }
  
  // Save digest
  fs.writeFileSync(WEEKLY_SUMMARY_FILE, digest);
  
  return digest;
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'generate') {
  console.log(generateDigest());
} else if (args[0] === 'send') {
  const digest = generateDigest();
  console.log('Would send digest to john via WhatsApp:');
  console.log(digest.substring(0, 500) + '...');
} else {
  console.log('Usage: weekly-digest.js generate | send');
}
