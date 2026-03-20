#!/usr/bin/env node
/**
 * YouTube Ideas Scanner — ARR & OpenClaw
 * Searches YouTube via web search, analyzes results, adds actionable ideas to kanban
 * Strict filtering: only specific, actionable ideas get created
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const KANBAN_API = 'http://localhost:4000/api/kanban';
const IDEA_DIR = path.join(__dirname, '..', 'kanban', 'idea');

// ─── Deduplication ──────────────────────────────────────────────────────────

function existingIdeaCount(ticketId) {
  try {
    const files = fs.readdirSync(IDEA_DIR);
    const normalized = ticketId.toLowerCase();
    return files.filter(f => {
      try {
        const content = fs.readFileSync(path.join(IDEA_DIR, f), 'utf8').toLowerCase();
        return content.includes(normalized);
      } catch { return false; }
    }).length;
  } catch { return 0; }
}

function hasSimilarTitle(newTitle) {
  try {
    const files = fs.readdirSync(IDEA_DIR);
    const normalized = newTitle.toLowerCase();
    const newWords = normalized.split(/\s+/).filter(w => w.length > 4);
    return files.some(f => {
      try {
        const existing = fs.readFileSync(path.join(IDEA_DIR, f), 'utf8').toLowerCase();
        // Check for word overlap
        const overlap = newWords.filter(w => existing.includes(w)).length;
        return overlap >= 3; // 3+ shared words = similar
      } catch { return false; }
    });
  } catch { return false; }
}

function shouldNotifyJohn(count, reason) {
  console.log(`   ⚠️  Should notify John: ${count} ideas for "${reason}", count=${count}`);
}

// ─── Idea Quality Filter ─────────────────────────────────────────────────────

const VAGUE_PATTERNS = [
  /^arr\s+(setup|install|feature|improvement|automation)\s+idea$/i,
  /^docker\s+(improvement|setup|install)\s+idea$/i,
  /^media\s+server\s+tips?\s+idea$/i,
  /^new\s+deployment\s+guide\s+idea$/i,
  /^telegram\s+bot\s+improvement\s+idea$/i,
  /^automation\s+workflow\s+idea$/i,
  /^mcp\s+integration\s+idea$/i,
  /^skill\s+idea\s+from\s+video:/i,
];

function isVague(title) {
  return VAGUE_PATTERNS.some(p => p.test(title.trim()));
}

function extractTicketId(title) {
  const match = title.match(/OC[-\s]?(\d+)/i);
  return match ? `OC-${match[1]}` : null;
}

// ─── Parse web search results ────────────────────────────────────────────────

function parseWebSearchOutput(output) {
  try {
    // Output is JSON from openclaw web search
    const parsed = JSON.parse(output);
    return parsed.results || [];
  } catch {
    return [];
  }
}

function extractYouTubeVideos(results) {
  const videos = [];
  for (const r of results) {
    if (!r.url) continue;
    if (r.url.includes('youtube.com/watch') || r.url.includes('youtu.be/')) {
      const match = r.url.match(/v=([^&]+)/) || r.url.match(/youtu\.be\/([^?]+)/);
      videos.push({
        videoId: match ? match[1] : null,
        title: (r.title || '').replace(/<<<.*?>>>/g, '').trim(),
        description: (r.description || r.snippet || '').replace(/<<<.*?>>>/g, '').trim(),
        url: r.url
      });
    }
  }
  return videos;
}

// ─── Extract specific, actionable ideas ──────────────────────────────────────

function extractIdeasFromContent(video) {
  const { title, description, url } = video;
  const ideas = [];
  const content = `${title} ${description}`.toLowerCase();

  // Only look for very specific patterns
  const specificPatterns = [
    {
      // e.g. "how to use Sonarr hardlinks to save disk space"
      regex: /hardlink/i,
      title: `Hardlink optimization for NAS storage`,
      why: `Videos covering hardlinks with Sonarr/Radarr describe a specific disk-space saving technique relevant to OC-0019`
    },
    {
      regex: /trash.?guide|enhanced?.?media.?manager/i,
      title: `Apply Plex Trash Guide settings`,
      why: `Trash Guide settings are a well-known Plex reliability improvement`
    },
    {
      regex: /plex.*docker.*optimize|docker.*plex.*tweak/i,
      title: `Docker Plex container optimization`,
      why: `Specific Docker-for-Plex optimizations can improve transcoding performance`
    },
    {
      regex: /sonarr.*profile|radarr.*profile|quality.*profile.*arr/i,
      title: `ARR quality profile optimization`,
      why: `Better quality profiles reduce unnecessary re-downloads and storage waste`
    },
    {
      regex: /overseerr.*setup|jellyseerr.*setup/i,
      title: `Overseerr/Jellyseerr setup automation`,
      why: `Request management automation can improve media discovery workflow`
    },
    {
      regex: /arr.*backup|radarr.*backup.*script|sonarr.*backup.*automation/i,
      title: `Automated ARR config backup`,
      why: `Reliable automated backups prevent config loss`
    },
    {
      regex: /openclaw.*skill|clawd?hub.*install/i,
      title: `OpenClaw skill installation workflow`,
      why: `Better skill discovery/installation would improve agent capabilities`
    },
    {
      regex: /openclaw.*health.*check|openclaw.*monitor/i,
      title: `OpenClaw health monitoring improvements`,
      why: `Improved health monitoring reduces downtime`
    },
    {
      regex: /arr.*notification.*whatsapp|sonarr.*whatsapp|radarr.*whatsapp/i,
      title: `ARR WhatsApp notifications for new media`,
      why: `WhatsApp notifications for new downloads improves media arrival awareness`
    },
  ];

  for (const pattern of specificPatterns) {
    if (pattern.regex.test(content)) {
      // Check dedup
      if (hasSimilarTitle(pattern.title)) {
        console.log(`   ⏭️  Skipping (similar idea exists): ${pattern.title}`);
        continue;
      }
      if (isVague(pattern.title)) {
        console.log(`   ⏭️  Skipping (too vague): ${pattern.title}`);
        continue;
      }
      ideas.push({
        title: pattern.title,
        description: `From YouTube video "${title}" (${url}). ${description.substring(0, 200)}`,
        why: pattern.why
      });
    }
  }

  return ideas;
}

// ─── Add idea via filesystem ──────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-{2,}/g, '-').substring(0, 60) || 'new-idea';
}

function nextIdeaId() {
  const files = fs.readdirSync(IDEA_DIR).filter(f => f.startsWith('IDEA-'));
  const nums = files.map(f => {
    const m = f.match(/IDEA-(\d+)/);
    return m ? parseInt(m[1]) : 0;
  });
  return `IDEA-${Math.max(...nums, 0) + 1}`.padStart(8, '0');
}

function createIdeaFile(title, description, why) {
  const id = nextIdeaId();
  const filename = `${id}-${slugify(title)}.md`;
  const filepath = path.join(IDEA_DIR, filename);
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

  const content = `# Idea
**ID:** ${id}
**Title:** ${title}
**Status:** pending-review
**Suggested Priority:** Medium
**Source:** YouTube Ideas Cron
**Created:** ${now}
**Last Updated:** ${now}

## Summary
${description}

## Why It Might Matter
${why}

## Suggested Outcome
If accepted, convert to a live ticket with clear acceptance criteria.

## Approval Decision
Pending

## Rejection Reason

## Notes
Source: YouTube video analysis via youtube-ideas.js
`;

  fs.writeFileSync(filepath, content);
  return filepath;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run(searchTerm, category) {
  console.log(`\n=== YouTube Ideas Scanner — ${category} ===`);
  console.log(`Searching: ${searchTerm}`);

  let results = [];
  try {
    const output = execSync(`openclaw web search --query "${searchTerm} tutorial" --count 8`, {
      encoding: 'utf8',
      timeout: 45000
    });
    results = parseWebSearchOutput(output);
  } catch (e) {
    console.error('Web search failed:', e.message);
    console.log('No results fetched, exiting.');
    return { searched: 0, ideas: 0, skipped: 0 };
  }

  const videos = extractYouTubeVideos(results);
  console.log(`Videos found: ${videos.length}`);

  let ideasCreated = 0;
  let skippedVague = 0;
  let skippedDuplicate = 0;

  for (const video of videos) {
    const ideas = extractIdeasFromContent(video);
    if (ideas.length === 0) continue;

    for (const idea of ideas) {
      if (isVague(idea.title)) {
        skippedVague++;
        continue;
      }
      if (hasSimilarTitle(idea.title)) {
        skippedDuplicate++;
        continue;
      }
      try {
        const filepath = createIdeaFile(idea.title, idea.description, idea.why);
        console.log(`   ✅ Created: ${idea.title}`);
        ideasCreated++;
      } catch (e) {
        console.error('   ❌ Failed to create idea:', e.message);
      }
    }
  }

  const total = ideasCreated + skippedVague + skippedDuplicate;
  console.log(`\n=== ${category} Summary ===`);
  console.log(`Videos: ${videos.length} | Ideas created: ${ideasCreated} | Skipped vague: ${skippedVague} | Skipped duplicate: ${skippedDuplicate}`);

  return { searched: videos.length, ideas: ideasCreated, skippedVague, skippedDuplicate };
}

const category = process.argv[2] || 'ARR';
const searchTerms = {
  'ARR': 'Sonarr Radarr Plex Docker media server',
  'OpenClaw': 'OpenClaw AI agent automation',
};

run(searchTerms[category] || category, category).catch(console.error);
