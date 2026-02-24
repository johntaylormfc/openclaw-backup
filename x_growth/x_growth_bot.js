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
  B: { days: 11, posts: 5, replies: 10, follows: 8, likes: 25 },  // Days 4-14
  C: { days: Infinity, posts: 10, replies: 20, follows: 15, likes: 50 }  // Day 15+
};

// Current phase (based on days since Feb 23, 2026)
const startDate = new Date('2026-02-23');
const today = new Date();
const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

let currentPhase = 'A';
if (daysSinceStart > 14) currentPhase = 'C';
else if (daysSinceStart > 3) currentPhase = 'B';

const LIMITS = PHASES[currentPhase];
const phaseName = `Phase ${currentPhase}`;

// Tracking file
const metricsPath = path.join(__dirname, 'x_metrics_log.csv');

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getTodayMetrics() {
  const today = getTodayStr();
  if (!fs.existsSync(metricsPath)) return { posts: 0, replies: 0, follows: 0, likes: 0 };
  
  const lines = fs.readFileSync(metricsPath, 'utf8').trim().split('\n');
  // Find last line for today
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
  
  // Read all lines, replace today's line or add new
  let lines = [];
  if (fs.existsSync(metricsPath)) {
    lines = fs.readFileSync(metricsPath, 'utf8').trim().split('\n');
  } else {
    lines = ['date,phase,posts,replies,follows,likes,followers_gained,notes'];
  }
  
  const newLine = `${today},${currentPhase},${newPosts},${newReplies},${newFollows},${newLikes},0,Auto-updated`;
  
  // Find and replace today's line
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

// Search and reply to relevant tweets
async function searchAndReply(query, replyText) {
  const current = getTodayMetrics();
  
  if (current.replies >= LIMITS.replies) {
    console.log(`[${phaseName}] Reached daily reply limit (${LIMITS.replies})`);
    return null;
  }
  
  try {
    const search = await rwClient.v2.search(query, {
      max_results: 10,
      tweet: { fields: ['author_id', 'text', 'created_at'] }
    });
    
    let count = 0;
    for await (const tweet of search) {
      if (count >= 3) break; // Try up to 3
      
      // Skip own tweets and replies
      if (tweet.author_id === auth.accountId) continue;
      
      console.log(`[${phaseName}] Replying to: ${tweet.text.substring(0, 50)}...`);
      
      try {
        const reply = await rwClient.v2.reply(replyText, tweet.id);
        updateMetrics(0, 1, 0, 0);
        console.log(`[${phaseName}] Replied! ID: ${reply.data.id}`);
        count++;
        
        // Wait between replies to avoid spam detection
        await new Promise(r => setTimeout(r, 60000)); // 1 min delay
      } catch (e) {
        console.log('Reply failed, trying next...');
      }
    }
  } catch (e) {
    console.error('Search/reply error:', e.message);
  }
  
  return null;
}

// Post a tweet
async function postTweet(text) {
  const current = getTodayMetrics();
  
  if (current.posts >= LIMITS.posts) {
    console.log(`[${phaseName}] Reached daily post limit (${LIMITS.posts})`);
    return null;
  }
  
  try {
    const tweet = await rwClient.v2.tweet(text);
    updateMetrics(1, 0, 0, 0);
    console.log(`[${phaseName}] Posted! ID: ${tweet.data.id}`);
    return tweet.data.id;
  } catch (e) {
    console.error('Post error:', e.message);
  }
  
  return null;
}

// Like a tweet
async function likeTweet(tweetId) {
  const current = getTodayMetrics();
  
  if (current.likes >= LIMITS.likes) {
    console.log(`[${phaseName}] Reached daily like limit (${LIMITS.likes})`);
    return null;
  }
  
  try {
    await rwClient.v2.like(auth.accountId, tweetId);
    updateMetrics(0, 0, 0, 1);
    console.log(`[${phaseName}] Liked tweet ${tweetId}`);
    return true;
  } catch (e) {
    console.error('Like error:', e.message);
  }
  return null;
}

// Follow a user
async function followUser(userId) {
  const current = getTodayMetrics();
  
  if (current.follows >= LIMITS.follows) {
    console.log(`[${phaseName}] Reached daily follow limit (${LIMITS.follows})`);
    return null;
  }
  
  try {
    await rwClient.v2.follow(auth.accountId, userId);
    updateMetrics(0, 0, 1, 0);
    console.log(`[${phaseName}] Followed user ${userId}`);
    return true;
  } catch (e) {
    console.error('Follow error:', e.message);
  }
  return null;
}

// Get current metrics
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

// Run scheduled actions based on time of day
async function runScheduled() {
  const hour = new Date().getHours();
  const current = getTodayMetrics();
  
  console.log(`\n=== ${phaseName} Scheduled Run (${hour}:00) ===`);
  console.log(`Today: ${current.posts} posts, ${current.replies} replies, ${current.follows} follows, ${current.likes} likes`);
  console.log(`Limits: ${LIMITS.posts} posts, ${LIMITS.replies} replies, ${LIMITS.follows} follows, ${LIMITS.likes} likes`);
  
  // Morning (8-10am): Post + replies + follows
  if (hour >= 8 && hour <= 10) {
    console.log('\n[Morning Session]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Good morning! Starting the day with productivity tips. What are you working on? 🚀');
    }
    await searchAndReply('productivity tips', 'Great insight! Here\'s a tip that might help...');
    await searchAndReply('AI tools', 'Interesting point about AI! Here\'s another perspective...');
  }
  
  // Afternoon (1-3pm): Post + replies
  if (hour >= 13 && hour <= 15) {
    console.log('\n[Afternoon Session]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Afternoon check-in! How\'s your productivity going? Drop your questions below 👇');
    }
    await searchAndReply('learning tips', 'Solid advice! Adding to this...');
    await searchAndReply('study techniques', 'Great point! Here\'s what works for me...');
  }
  
  // Evening (6-8pm): Post + engagement
  if (hour >= 18 && hour <= 20) {
    console.log('\n[Evening Session]');
    if (current.posts < LIMITS.posts) {
      await postTweet('Wrapping up the day! What was your biggest win today? 🎯');
    }
    await searchAndReply('habits', 'Building good habits is key! Here\'s my approach...');
  }
  
  console.log('\n=== Run Complete ===\n');
}

// CLI interface
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
      console.log('Usage:');
      console.log('  node x_growth_bot.js reply "query" "text"');
      console.log('  node x_growth_bot.js post "text"');
      console.log('  node x_growth_bot.js like <tweetId>');
      console.log('  node x_growth_bot.js follow <userId>');
      console.log('  node x_growth_bot.js metrics');
      console.log('  node x_growth_bot.js status');
      console.log('  node x_growth_bot.js run  (scheduled actions)');
  }
})();
