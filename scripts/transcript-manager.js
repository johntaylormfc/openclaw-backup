#!/usr/bin/env node
/**
 * Session Transcript Manager
 * Reads from agent session directories and writes summaries to memory/
 */

const fs = require('fs');
const path = require('path');

const TRANSCRIPT_DIR = '/home/john/.openclaw/agents/main/sessions';
const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';
const SUMMARY_JSON = '/home/john/.openclaw/workspace/memory/session-summaries.json';
const SUMMARY_MD = '/home/john/.openclaw/workspace/memory/session-summaries.md';

// Ensure directories exist
if (!fs.existsSync(MEMORY_DIR)) {
  fs.mkdirSync(MEMORY_DIR, { recursive: true });
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getRecentSessions(maxAgeMinutes = 120) {
  if (!fs.existsSync(TRANSCRIPT_DIR)) return [];
  const now = Date.now();
  const maxAge = maxAgeMinutes * 60 * 1000;

  return fs.readdirSync(TRANSCRIPT_DIR)
    .filter(f => f.endsWith('.jsonl') && !f.includes('.deleted.'))
    .filter(f => {
      const stat = fs.statSync(path.join(TRANSCRIPT_DIR, f));
      return (now - stat.mtimeMs) < maxAge;
    })
    .map(f => path.join(TRANSCRIPT_DIR, f));
}

function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map(block => {
      if (typeof block === 'string') return block;
      if (block.type === 'text') return block.text || '';
      if (block.text) return block.text;
      return '';
    }).filter(Boolean).join('\n');
  }
  if (content.text) return content.text;
  return '';
}

function parseMessages(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n');
    const messages = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.type !== 'message') continue;

        const role = entry.message?.role || 'unknown';
        const rawContent = entry.message?.content;
        const text = extractText(rawContent);

        if (text) {
          messages.push({ role, text });
        }
      } catch {
        // Skip malformed lines
      }
    }
    return messages;
  } catch (e) {
    return [];
  }
}

function generateSummary(sessionId, messages) {
  if (!messages || messages.length === 0) return null;

  const text = messages.map(m => m.text || '').join(' ');
  const textLower = text.toLowerCase();

  // Topic detection
  const topicMap = {
    'arr': ['sonarr', 'radarr', 'prowlarr', 'sabnzbd', 'qbittorrent', 'arr stack'],
    'docker': ['docker', 'container', 'compose', 'docker-compose'],
    'dashboard': ['dashboard', 'kanban', 'tickets'],
    'memory': ['memory', 'remember', 'forget'],
    'github': ['github', 'repo', 'git push'],
    'email': ['email', 'gmail', 'todoist'],
    'openclaw': ['openclaw', 'cron', 'gateway', 'skill', 'clawhub'],
    'mission-control': ['mission control', 'oc-0035'],
    'health': ['health', 'monitor', 'alert'],
    'bc': ['business central', 'bcdev', 'navision'],
    'ideas': ['idea', 'kanban', 'backlog']
  };

  const topics = [];
  for (const [topic, keywords] of Object.entries(topicMap)) {
    if (keywords.some(k => textLower.includes(k))) topics.push(topic);
  }

  // Extract key decisions
  const decisionPatterns = [
    /\b(decided|agreed|approved|approved?|close[sd]?|reject(?:ed)?)\b/gi,
    /\b(will|going to|must|should)\s+\w+/gi
  ];
  const decisions = [];
  const seen = new Set();
  for (const pattern of decisionPatterns) {
    const matches = text.match(pattern) || [];
    for (const m of matches) {
      const norm = m.toLowerCase().substring(0, 50);
      if (!seen.has(norm)) { seen.add(norm); decisions.push(m); }
    }
  }

  return {
    sessionId,
    date: getToday(),
    time: new Date().toISOString(),
    topics,
    messageCount: messages.length,
    firstMsg: text.substring(0, 150).replace(/\n+/g, ' ').trim(),
    lastMsg: text.slice(-200).replace(/\n+/g, ' ').trim(),
    decisions: decisions.slice(0, 5),
    contributors: [...new Set(messages.map(m => m.role).filter(Boolean))]
  };
}

function loadExistingSummaries() {
  if (!fs.existsSync(SUMMARY_JSON)) return [];
  try {
    return JSON.parse(fs.readFileSync(SUMMARY_JSON, 'utf8'));
  } catch { return []; }
}

function saveSummaries(summaries) {
  const seen = new Set();
  const unique = summaries.filter(s => {
    const key = `${s.sessionId}-${s.date}`;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0, 200);

  fs.writeFileSync(SUMMARY_JSON, JSON.stringify(unique, null, 2));

  // Generate markdown summary
  let md = `# Session Summaries\n\n_Last updated: ${new Date().toISOString()}_\n\n`;
  for (const s of unique.slice(0, 30)) {
    md += `## ${s.date} | ${s.topics.join(', ') || 'General'} | ${s.messageCount} msgs\n`;
    if (s.decisions && s.decisions.length) {
      md += `> Decisions: ${s.decisions.slice(0, 3).join('; ')}\n`;
    }
    md += `> ${s.firstMsg}\n\n`;
  }

  fs.writeFileSync(SUMMARY_MD, md);
}

function appendToTodayMemory(summaries) {
  const today = getToday();
  const todayFile = path.join(MEMORY_DIR, `${today}.md`);
  const existing = fs.existsSync(todayFile) ? fs.readFileSync(todayFile, 'utf8') : '';

  const todaySummaries = summaries.filter(s => s.date === today);
  if (todaySummaries.length === 0) return;

  // Build session entries
  const entries = todaySummaries.map(s => {
    let entry = `### Session: ${s.sessionId.substring(0, 8)}...\n` +
      `Time: ${s.time}\n` +
      `Topics: ${s.topics.join(', ') || 'General'}\n` +
      `Messages: ${s.messageCount}\n` +
      `Summary: ${s.firstMsg}`;
    if (s.decisions.length) {
      entry += `\nDecisions: ${s.decisions.join('; ')}`;
    }
    return entry;
  }).join('\n\n');

  if (existing.includes(`## Sessions ${today}`)) return; // Already wrote today

  const header = existing ? '\n\n---\n\n' : '';
  const section = `## Sessions ${today}\n\n${entries}`;
  fs.writeFileSync(todayFile, existing + header + section);
}

function update(sinceMinutes = 120) {
  const files = getRecentSessions(sinceMinutes);
  if (files.length === 0) {
    console.log('No recent sessions found');
    return;
  }

  console.log(`Processing ${files.length} recent session(s)`);
  const summaries = loadExistingSummaries();

  for (const file of files) {
    const sessionId = path.basename(file, '.jsonl');
    const messages = parseMessages(file);
    if (messages.length === 0) continue;

    const summary = generateSummary(sessionId, messages);
    if (!summary) continue;

    const existingIdx = summaries.findIndex(
      s => s.sessionId === summary.sessionId && s.date === summary.date
    );
    if (existingIdx >= 0) {
      summaries[existingIdx] = summary;
    } else {
      summaries.unshift(summary);
    }
    console.log(`  [${sessionId.substring(0, 8)}] ${summary.messageCount} msgs | ${summary.topics.join(', ') || 'general'}`);
  }

  saveSummaries(summaries);
  appendToTodayMemory(summaries);
  console.log(`Done. ${summaries.length} total summaries`);
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'update') {
  const mins = parseInt(args[1] || '120', 10);
  update(mins);
} else if (args[0] === 'save') {
  const sessionId = args[1];
  const messages = JSON.parse(args[2] || '[]');
  const summary = generateSummary(sessionId, messages);
  if (summary) {
    const summaries = loadExistingSummaries();
    summaries.unshift(summary);
    saveSummaries(summaries);
    appendToTodayMemory(summaries);
  }
} else if (args[0] === 'search') {
  const summaries = loadExistingSummaries();
  const query = args.slice(1).join(' ').toLowerCase();
  const results = summaries.filter(s =>
    s.topics.some(t => t.includes(query)) ||
    s.firstMsg.toLowerCase().includes(query) ||
    (s.decisions || []).some(d => d.toLowerCase().includes(query))
  );
  console.log(JSON.stringify(results.slice(0, 10), null, 2));
} else {
  update(120);
}
