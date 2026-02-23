#!/usr/bin/env node
/**
 * People Tracker
 * Tracks contacts and clients mentioned in conversations
 */

const fs = require('fs');

const PEOPLE_FILE = '/home/john/.openclaw/workspace/memory/people.json';

// Known people patterns
const NAME_PATTERNS = [
  // Email patterns
  /([A-Za-z]+ [A-Za-z]+) <[^>]+>/g,
  // From messages
  /([A-Z][a-z]+ [A-Z][a-z]+) said/g,
  /([A-Z][a-z]+ [A-Z][a-z]+) asked/g,
  /discussed with ([A-Z][a-z]+ [A-Z][a-z]+)/g,
  /talked to ([A-Z][a-z]+ [A-Z][a-z]+)/g,
];

// Known contacts
const KNOWN_CONTACTS = {
  'john': { name: 'John Taylor', role: 'owner', company: 'BC Dev Ltd' },
  'emily': { name: 'Emily Craig', role: 'client', company: 'Galloway MacLeod' },
  'alexandros': { name: 'Alexandros Psaltoulis', role: 'client', company: 'Galloway MacLeod' },
  'ben': { name: 'Ben', role: 'unknown', company: 'Galloway MacLeod' },
  'julia': { name: 'Julia', role: 'client', company: 'unknown' },
  'marion': { name: 'Marion Glen', role: 'client', company: 'unknown' }
};

function loadPeople() {
  if (fs.existsSync(PEOPLE_FILE)) {
    return JSON.parse(fs.readFileSync(PEOPLE_FILE, 'utf8'));
  }
  return {};
}

function savePeople(people) {
  fs.writeFileSync(PEOPLE_FILE, JSON.stringify(people, null, 2));
}

function extractNames(text) {
  const names = new Set();
  
  for (const pattern of NAME_PATTERNS) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        names.add(match[1].trim());
      }
    }
  }
  
  return Array.from(names);
}

function addPerson(name, context = '', source = 'auto') {
  const people = loadPeople();
  const key = name.toLowerCase();
  
  if (!people[key]) {
    people[key] = {
      name,
      firstMention: new Date().toISOString(),
      lastMention: new Date().toISOString(),
      mentions: 1,
      contexts: [],
      source
    };
  } else {
    people[key].lastMention = new Date().toISOString();
    people[key].mentions++;
  }
  
  if (context) {
    people[key].contexts.push({
      text: context.substring(0, 200),
      date: new Date().toISOString()
    });
    // Keep last 10 contexts
    people[key].contexts = people[key].contexts.slice(-10);
  }
  
  savePeople(people);
}

function getPeople() {
  return loadPeople();
}

function searchPeople(query) {
  const people = loadPeople();
  const results = [];
  const queryLower = query.toLowerCase();
  
  for (const [key, person] of Object.entries(people)) {
    if (person.name.toLowerCase().includes(queryLower) ||
        (person.company && person.company.toLowerCase().includes(queryLower)) ||
        (person.role && person.role.toLowerCase().includes(queryLower))) {
      results.push(person);
    }
  }
  
  return results;
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'add') {
  addPerson(args[1], args.slice(2).join(' '), 'cli');
  console.log('Person added');
} else if (args[0] === 'list') {
  console.log(JSON.stringify(getPeople(), null, 2));
} else if (args[0] === 'search') {
  console.log(JSON.stringify(searchPeople(args.slice(1).join(' ')), null, 2));
} else {
  console.log('Usage: people-tracker.js add <name> [context] | list | search <query>');
}
