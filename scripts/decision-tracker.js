#!/usr/bin/env node
/**
 * Decision Tracker
 * Extracts and tracks decisions made during sessions
 */

const fs = require('fs');
const path = require('path');

const DECISIONS_FILE = '/home/john/.openclaw/workspace/memory/decisions.json';
const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';

// Decision keywords to look for
const DECISION_PATTERNS = [
  /decided to (.+)/i,
  /chose to (.+)/i,
  /will (.+)/i,
  /going to (.+)/i,
  /prefers (.+)/i,
  /instead of (.+), chose/i,
  /agreed to (.+)/i,
  /let's (.+)/i
];

function loadDecisions() {
  if (fs.existsSync(DECISIONS_FILE)) {
    return JSON.parse(fs.readFileSync(DECISIONS_FILE, 'utf8'));
  }
  return [];
}

function saveDecisions(decisions) {
  fs.writeFileSync(DECISIONS_FILE, JSON.stringify(decisions, null, 2));
}

function extractDecisions(text, source) {
  const decisions = [];
  
  for (const pattern of DECISION_PATTERNS) {
    const matches = text.matchAll(new RegExp(pattern, 'gi'));
    for (const match of matches) {
      decisions.push({
        id: Date.now() + Math.random(),
        decision: match[1] || match[0],
        source,
        date: new Date().toISOString(),
        topic: inferTopic(text)
      });
    }
  }
  
  return decisions;
}

function inferTopic(text) {
  const textLower = text.toLowerCase();
  if (textLower.includes('trading') || textLower.includes('crypto')) return 'trading';
  if (textLower.includes('dashboard') || textLower.includes('kanban')) return 'dashboard';
  if (textLower.includes('memory')) return 'memory';
  if (textLower.includes('github') || textLower.includes('repo')) return 'github';
  if (textLower.includes('docker') || textLower.includes('arr')) return 'docker';
  if (textLower.includes('business central') || textLower.includes('bc')) return 'business-central';
  return 'general';
}

function addDecision(decision, source = 'manual') {
  const decisions = loadDecisions();
  
  // Check for duplicates
  const exists = decisions.some(d => d.decision === decision);
  if (!exists) {
    decisions.unshift({
      id: Date.now(),
      decision,
      source,
      date: new Date().toISOString(),
      topic: inferTopic(decision)
    });
    saveDecisions(decisions);
  }
}

function getDecisions(topic = null) {
  const decisions = loadDecisions();
  if (topic) {
    return decisions.filter(d => d.topic === topic);
  }
  return decisions;
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'add') {
  addDecision(args.slice(1).join(' '), args[2] || 'cli');
  console.log('Decision added');
} else if (args[0] === 'list') {
  console.log(JSON.stringify(getDecisions(args[1]), null, 2));
} else if (args[0] === 'search') {
  const query = args.slice(1).join(' ').toLowerCase();
  const decisions = loadDecisions().filter(d => 
    d.decision.toLowerCase().includes(query) || 
    d.topic.includes(query)
  );
  console.log(JSON.stringify(decisions, null, 2));
} else {
  console.log('Usage: decision-tracker.js add <decision> | list [topic] | search <query>');
}
