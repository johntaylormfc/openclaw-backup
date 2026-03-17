#!/usr/bin/env node
/**
 * YouTube Ideas Scanner
 * Searches YouTube via web search, analyzes results, adds ideas to kanban
 */

const KANBAN_API = 'http://localhost:4000/api/kanban';

function extractYouTubeVideos(results) {
  const videos = [];
  for (const r of results) {
    if (r.url && r.url.includes('youtube.com/watch')) {
      const match = r.url.match(/v=([^&]+)/);
      videos.push({
        videoId: match ? match[1] : null,
        title: r.title.replace(/<<<.*?>>>/g, '').trim(),
        description: r.description.replace(/<<<.*?>>>/g, '').trim(),
        url: r.url
      });
    }
  }
  return videos;
}

function extractIdeasFromContent(title, description) {
  const ideas = [];
  const content = `${title} ${description}`.toLowerCase();
  
  console.log(`\n📺 Analyzing: ${title.substring(0, 60)}...`);
  
  // OpenClaw-specific ideas
  if (content.includes('openclaw') || content.includes('clawdbot') || content.includes('moltbot')) {
    
    if (content.includes('tutorial') || content.includes('beginner') || content.includes('crash course')) {
      ideas.push({
        title: `Skill idea from video: ${title.substring(0, 40)}`,
        description: `From YouTube tutorial "${title}". ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('deploy') || content.includes('install') || content.includes('setup')) {
      ideas.push({
        title: 'New deployment guide idea',
        description: `Video "${title}" covers setup: ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('telegram')) {
      ideas.push({
        title: 'Telegram bot improvement idea',
        description: `From "${title}": ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('mcp')) {
      ideas.push({
        title: 'MCP integration idea',
        description: `Video "${title}": ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('autonomous') || content.includes('automation')) {
      ideas.push({
        title: 'Automation workflow idea',
        description: `From "${title}": ${description.substring(0, 250)}`
      });
    }
  }
  
  // ARR/Media server ideas
  if (content.includes('sonarr') || content.includes('radarr') || content.includes('plex') || content.includes('arr') || content.includes('media server')) {
    
    if (content.includes('setup') || content.includes('install')) {
      ideas.push({
        title: 'ARR setup feature idea',
        description: `Video "${title}": ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('automation') || content.includes('workflow')) {
      ideas.push({
        title: 'ARR automation idea',
        description: `From "${title}": ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('tips') || content.includes('trick')) {
      ideas.push({
        title: 'Media server tips idea',
        description: `Tips video "${title}": ${description.substring(0, 250)}`
      });
    }
    
    if (content.includes('docker') || content.includes('container')) {
      ideas.push({
        title: 'Docker improvement idea',
        description: `From "${title}": ${description.substring(0, 250)}`
      });
    }
  }
  
  return ideas;
}

async function addIdeaToKanban(idea) {
  try {
    const response = await fetch(KANBAN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: idea.title,
        description: idea.description,
        type: 'idea',
        column: 'ideas'
      })
    });
    return response.ok;
  } catch (e) {
    console.error('Failed to add idea:', e.message);
    return false;
  }
}

async function run() {
  const searchTerm = process.argv[2] || 'OpenClaw automation AI agent';
  console.log(`=== YouTube Ideas Scanner ===`);
  console.log(`Searching for: ${searchTerm}\n`);
  
  // Run web_search via exec
  const { execSync } = require('child_process');
  let results = [];
  
  try {
    const output = execSync(`openclaw web search --query "${searchTerm} YouTube tutorial" --count 8`, {
      encoding: 'utf8',
      timeout: 30000
    });
    // Parse the output - it's JSON
    const parsed = JSON.parse(output);
    results = parsed.results || [];
  } catch (e) {
    console.error('Web search failed:', e.message);
    // Fallback to direct search
    try {
      const output = execSync(`echo '[]'`, { encoding: 'utf8' });
    } catch {}
  }
  
  const videos = extractYouTubeVideos(results);
  console.log(`Found ${videos.length} YouTube videos`);
  
  let totalIdeas = 0;
  
  for (const video of videos) {
    const ideas = extractIdeasFromContent(video.title, video.description);
    console.log(`   Found ${ideas.length} ideas`);
    
    for (const idea of ideas) {
      const added = await addIdeaToKanban(idea);
      if (added) {
        console.log(`   ✅ Added: ${idea.title.substring(0, 50)}...`);
        totalIdeas++;
      }
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Videos analyzed: ${videos.length}`);
  console.log(`Ideas added: ${totalIdeas}`);
}

run().catch(console.error);
