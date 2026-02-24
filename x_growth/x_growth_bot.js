#!/usr/bin/env node
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Load auth
const authPath = path.join(__dirname, '.x_auth.json');
const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));

const client = new TwitterApi({
  appKey: auth.apiKey,
  appSecret: auth.apiSecret,
  accessToken: auth.accessToken,
  accessSecret: auth.accessSecret,
});

const rwClient = client.readWrite;

// Phase limits - updated Feb 24, 2026
const PHASES = {
  A: { days: 3, posts: 2, replies: 4, follows: 4, likes: 16 },
  B: { days: 11, posts: 5, replies: 10, follows: 8, likes: 25 },
  C: { days: Infinity, posts: 10, replies: 20, follows: 15, likes: 50 }
};

// Rate limiting - avoid 429 errors
const RATE_LIMIT_DELAY = 2000; // 2 seconds between actions

// Current phase
const startDate = new Date('2026-02-23');
const today = new Date();
const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

let currentPhase = 'A';
if (daysSinceStart > 14) currentPhase = 'C';
else if (daysSinceStart > 3) currentPhase = 'B';

const LIMITS = PHASES[currentPhase];
const phaseName = `Phase ${currentPhase}`;

const metricsPath = path.join(__dirname, 'x_metrics_log.csv');

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTodayMetrics() {
  const today = getTodayStr();
  if (!fs.existsSync(metricsPath)) return { posts: 0, replies: 0, follows: 0, likes: 0 };
  
  const lines = fs.readFileSync(metricsPath, 'utf8').trim().split('\n');
  for (let i = lines.length - 1; i >= 1; i--) {
    if (lines[i].startsWith(today)) {
      const cols = lines[i].split(',');
      return {
        posts: parseInt(cols[2]) || 0,
        replies: parseInt(cols[3]) || 0,
        follows: parseInt(cols[4]) || 0,
        likes: parseInt(cols[5]) || 0
      };
    }
  }
  return { posts: 0, replies: 0, follows: 0, likes: 0 };
}

function updateMetrics(posts, replies, follows, likes) {
  const current = getTodayMetrics();
  const today = getTodayStr();
  
  const newPosts = current.posts + posts;
  const newReplies = current.replies + replies;
  const newFollows = current.follows + follows;
  const newLikes = current.likes + likes;
  
  let lines = [];
  if (fs.existsSync(metricsPath)) {
    lines = fs.readFileSync(metricsPath, 'utf8').trim().split('\n');
  } else {
    lines = ['date,phase,posts,replies,follows,likes,followers_gained,notes'];
  }
  
  const newLine = `${today},${currentPhase},${newPosts},${newReplies},${newFollows},${newLikes},0,Auto-updated`;
  
  let found = false;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(today)) {
      lines[i] = newLine;
      found = true;
      break;
    }
  }
  if (!found) lines.push(newLine);
  
  fs.writeFileSync(metricsPath, lines.join('\n') + '\n');
  
  return { posts: newPosts, replies: newReplies, follows: newFollows, likes: newLikes };
}

async function searchAndReply(query, replyText) {
  const current = getTodayMetrics();
  
  if (current.replies >= LIMITS.replies) {
    console.log(`[${phaseName}] Reached daily reply limit (${LIMITS.replies})`);
    return null;
  }
  
  try {
    const search = await rwClient.v2.search(query, { max_results: 10 });
    
    let count = 0;
    for await (const tweet of search) {
      if (count >= 2) break; // Max 2 per run to avoid rate limits
      if (tweet.author_id === auth.accountId) continue;
      
      console.log(`[${phaseName}] Replying to: ${tweet.text.substring(0, 50)}...`);
      
      await delay(RATE_LIMIT_DELAY); // Rate limit protection
      
      try {
        const reply = await rwClient.v2.reply(replyText, tweet.id);
        updateMetrics(0, 1, 0, 0);
        console.log(`[${phaseName}] Replied!`);
        count++;
      } catch (e) {
        if (e.code === 429) {
          console.log('Rate limited, stopping...');
          break;
        }
      }
    }
  } catch (e) {
    console.error('Search error:', e.message);
  }
  
  return null;
}

async function postTweet(text) {
  const current = getTodayMetrics();
  
  if (current.posts >= LIMITS.posts) {
    console.log(`[${phaseName}] Reached daily post limit (${LIMITS.posts})`);
    return null;
  }
  
  try {
    await delay(RATE_LIMIT_DELAY);
    const tweet = await rwClient.v2.tweet(text);
    updateMetrics(1, 0, 0, 0);
    console.log(`[${phaseName}] Posted!`);
    return tweet.data.id;
  } catch (e) {
    if (e.code === 429) console.log('Rate limited on post');
    console.error('Post error:', e.message);
  }
  
  return null;
}

async function likeTweet(tweetId) {
  const current = getTodayMetrics();
  
  if (current.likes >= LIMITS.likes) {
    console.log(`[${phaseName}] Reached daily like limit (${LIMITS.likes})`);
    return null;
  }
  
  try {
    await delay(RATE_LIMIT_DELAY);
    await rwClient.v2.like(auth.accountId, tweetId);
    updateMetrics(0, 0, 0, 1);
    console.log(`[${phaseName}] Liked!`);
    return true;
  } catch (e) {
    if (e.code === 429) console.log('Rate limited on like');
  }
  return null;
}

async function followUser(userId) {
  const current = getTodayMetrics();
  
  if (current.follows >= LIMITS.follows) {
    console.log(`[${phaseName}] Reached daily follow limit (${LIMITS.follows})`);
    return null;
  }
  
  try {
    await delay(RATE_LIMIT_DELAY);
    await rwClient.v2.follow(auth.accountId, userId);
    updateMetrics(0, 0, 1, 0);
    console.log(`[${phaseName}] Followed!`);
    return true;
  } catch (e) {
    if (e.code === 429) console.log('Rate limited on follow');
  }
  return null;
}

async function getMetrics() {
  try {
    const me = await rwClient.v2.me({ 'user.fields': 'public_metrics' });
    const data = me.data;
    const m = data.public_metrics;
    
    return {
      phase: currentPhase,
      followers: m.followers_count,
      following: m.following_count,
      tweets: m.tweet_count,
      listed: m.listed_count
    };
  } catch (e) {
    console.error('Metrics error:', e.message);
    return null;
  }
}

async function runScheduled() {
  const hour = new Date().getHours();
  const current = getTodayMetrics();
  
  console.log(`\n=== ${phaseName} Scheduled Run (${hour}:00) ===`);
  console.log(`Today: ${current.posts}/${LIMITS.posts} posts, ${current.replies}/${LIMITS.replies} replies, ${current.follows}/${LIMITS.follows} follows, ${current.likes}/${LIMITS.likes} likes`);
  
  // Morning (8-10am)
  if (hour >= 8 && hour <= 10) {
    console.log('\n[Morning]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Good morning! What\'s your top priority today? 🚀');
    }
    await searchAndReply('productivity tips', 'One addition that worked for me: [specific tip]. What\'s yours?');
  }
  
  // Afternoon (1-3pm)
  if (hour >= 13 && hour <= 15) {
    console.log('\n[Afternoon]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Afternoon check-in! How\'s your productivity going?');
    }
    await searchAndReply('learning techniques', 'Active recall + spaced repetition. Worked better than passive reading for me.');
  }
  
  // Evening (6-8pm)
  if (hour >= 18 && hour <= 20) {
    console.log('\n[Evening]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Wrapping up! What was your biggest win today? 🎯');
    }
  }
  
  console.log('\n=== Done ===\n');
}

// CLI
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

(async () => {
  switch (command) {
    case 'reply':
      await searchAndReply(arg1, arg2);
      break;
    case 'post':
      await postTweet(arg1);
      break;
    case 'like':
      await likeTweet(arg1);
      break;
    case 'follow':
      await followUser(arg1);
      break;
    case 'metrics':
      const metrics = await getMetrics();
      console.log(JSON.stringify(metrics, null, 2));
      break;
    case 'status':
      const current = getTodayMetrics();
      console.log(`Phase: ${phaseName}`);
      console.log(`Today: ${current.posts}/${LIMITS.posts} posts, ${current.replies}/${LIMITS.replies} replies, ${current.follows}/${LIMITS.follows} follows, ${current.likes}/${LIMITS.likes} likes`);
      break;
    case 'run':
      await runScheduled();
      break;
    default:
      console.log('X Growth Bot - Phase', currentPhase);
      console.log('Usage: reply/post/like/follow/metrics/status/run');
  }
})();
