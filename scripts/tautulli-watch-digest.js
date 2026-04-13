#!/usr/bin/env node
/**
 * Tautulli Watch Digest
 * Fetches yesterday's watch history for the primary user and outputs a formatted digest
 * for WhatsApp delivery via cron announce.
 */

const https = require('http');
const fs = require('fs');

// Config
const TAUTULLI_HOST = process.env.TAUTULLI_HOST || '192.168.1.146';
const TAUTULLI_PORT = process.env.TAUTULLI_PORT || '8181';
const TAUTULLI_APIKEY = process.env.TAUTULLI_APIKEY || '1213172adf7144f8a85a1d1daae2b581';
const USER_ID = process.env.TAUTULLI_USER_ID || '1503984';
const OUTPUT_FILE = '/tmp/tautulli-digest.txt';

function apiGet(cmd, params = {}) {
  return new Promise((resolve, reject) => {
    const q = new URLSearchParams({ apikey: TAUTULLI_APIKEY, cmd, ...params });
    const options = {
      hostname: TAUTULLI_HOST,
      port: TAUTULLI_PORT,
      path: `/api/v2?${q}`,
      method: 'GET',
    };
    let data = '';
    const req = https.request(options, res => {
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse failed: ${data}`)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function formatDuration(seconds) {
  if (!seconds || seconds < 60) return '<1 min';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function getYesterdayRange() {
  // Work in UTC to match Tautulli timestamps
  const now = new Date();
  const startTs = Math.floor(now.getTime() / 1000) - 86400; // ~midnight UTC yesterday
  const endTs = startTs + 86399;
  // dateStr in UTC: use UTC date, not local
  const d = new Date(startTs * 1000);
  const dateStr = d.toISOString().split('T')[0];
  return { startTs, endTs, dateStr };
}

async function main() {
  const { startTs, endTs, dateStr } = getYesterdayRange();

  let allHistory;
  try {
    // Tautulli's start_date/end_date params appear unreliable — fetch latest and filter client-side
    const res = await apiGet('get_history', { user_id: USER_ID, length: 50 });
    allHistory = res.response.data.data || [];
  } catch (e) {
    fs.writeFileSync(OUTPUT_FILE, `ERROR: Could not fetch Tautulli history: ${e.message}`);
    console.log('ERROR_FETCH');
    return;
  }

  // Filter to yesterday by timestamp
  const filtered = allHistory.filter(r => {
    const ts = r.date;
    return ts >= startTs && ts <= endTs;
  });

  if (filtered.length === 0) {
    fs.writeFileSync(OUTPUT_FILE, `No watch history for ${dateStr}`);
    console.log(`EMPTY:${dateStr}`);
    return;
  }

  // Group by show/movie
  const groups = {};
  for (const r of filtered) {
    const key = r.media_type === 'movie' ? r.title : (r.grandparent_title || r.title);
    if (!groups[key]) {
      groups[key] = {
        title: r.media_type === 'movie' ? r.title : (r.grandparent_title || r.title),
        type: r.media_type,
        year: r.year,
        episodes: [],
        totalDuration: 0,
      };
    }
    if (r.media_type === 'episode') {
      groups[key].episodes.push({
        title: r.title,
        season: r.parent_media_index,
        episode: r.media_index,
        duration: r.duration || 0,
      });
    }
    groups[key].totalDuration += r.duration || 0;
  }

  const totalTime = filtered.reduce((s, r) => s + (r.duration || 0), 0);
  const lines = [];
  lines.push(`📺 Yesterday's Watch (${dateStr})`);
  lines.push(`───────────────────`);
  lines.push(`${filtered.length} items · ${formatDuration(totalTime)} total`);
  lines.push('');

  for (const [key, show] of Object.entries(groups)) {
    if (show.type === 'movie') {
      lines.push(`🎬 ${show.title}${show.year ? ` (${show.year})` : ''}`);
      lines.push(`   ${formatDuration(show.totalDuration)}`);
    } else {
      const epCount = show.episodes.length;
      const epList = show.episodes.map(e => `S${e.season}E${e.episode}`).join(', ');
      lines.push(`📺 ${show.title} (${epCount} ep${epCount !== 1 ? 's' : ''})`);
      lines.push(`   ${epList} · ${formatDuration(show.totalDuration)}`);
    }
    lines.push('');
  }

  const output = lines.join('\n').trim();
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`DIGEST_READY:${Object.keys(groups).length} titles, ${filtered.length} items`);
  console.log(output);
}

main().catch(e => {
  fs.writeFileSync(OUTPUT_FILE, `ERROR: ${e.message}`);
  console.log('ERROR:', e.message);
  process.exit(1);
});
