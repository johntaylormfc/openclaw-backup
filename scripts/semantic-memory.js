#!/usr/bin/env node
/**
 * Semantic Memory Search with Embeddings
 * Uses Ollama to create embeddings and search memories semantically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MEMORY_DIR = '/home/john/.openclaw/workspace/memory';
const OLLAMA_HOST = 'http://192.168.1.228:11434';
const MODEL = 'nomic-embed-text';  // or 'mxbai-embed-large'

async function getEmbedding(text) {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, prompt: text })
    });
    const data = await response.json();
    return data.embedding;
  } catch (e) {
    console.error('Embedding error:', e.message);
    return null;
  }
}

function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function indexMemories() {
  console.log('Indexing memories with embeddings...');
  
  const files = fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith('.md'));
  const index = {};
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(MEMORY_DIR, file), 'utf8');
    const embedding = await getEmbedding(content);
    
    if (embedding) {
      index[file] = {
        content: content.substring(0, 5000),  // First 5000 chars
        embedding,
        updated: fs.statSync(path.join(MEMORY_DIR, file)).mtime
      };
    }
  }
  
  // Save index
  fs.writeFileSync('/tmp/memory-index.json', JSON.stringify(index, null, 2));
  console.log(`Indexed ${Object.keys(index).length} memories`);
  return index;
}

async function searchMemories(query, topK = 5) {
  console.log(`Searching for: ${query}`);
  
  let index;
  try {
    const indexData = fs.readFileSync('/tmp/memory-index.json', 'utf8');
    index = JSON.parse(indexData);
  } catch {
    index = await indexMemories();
  }
  
  const queryEmbedding = await getEmbedding(query);
  if (!queryEmbedding) {
    console.log('Failed to get query embedding, falling back to keyword search');
    return keywordSearch(query);
  }
  
  const results = [];
  
  for (const [file, data] of Object.entries(index)) {
    const similarity = cosineSimilarity(queryEmbedding, data.embedding);
    results.push({
      file,
      similarity,
      content: data.content.substring(0, 300)
    });
  }
  
  results.sort((a, b) => b.similarity - a.similarity);
  
  return results.slice(0, topK);
}

function keywordSearch(query) {
  const files = fs.readdirSync(MEMORY_DIR).filter(f => f.endsWith('.md'));
  const results = [];
  const queryLower = query.toLowerCase();
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(MEMORY_DIR, file), 'utf8');
    if (content.toLowerCase().includes(queryLower)) {
      results.push({
        file,
        similarity: 1,
        content: content.substring(0, 300)
      });
    }
  }
  
  return results.slice(0, 5);
}

// CLI
const args = process.argv.slice(2);
if (args[0] === 'index') {
  indexMemories().then(() => process.exit(0));
} else if (args[0] === 'search') {
  searchMemories(args.slice(1).join(' ')).then(results => {
    console.log('\n=== Results ===');
    results.forEach((r, i) => {
      console.log(`\n${i+1}. ${r.file} (${(r.similarity * 100).toFixed(1)}% match)`);
      console.log(r.content);
    });
    process.exit(0);
  });
} else {
  console.log('Usage: node semantic-memory.js [index|search <query>]');
}
