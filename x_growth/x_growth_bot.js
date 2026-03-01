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

// Phase limits - updated Feb 27, 2026
// Note: Reply is limited - can only reply to users who mention us or engage with our posts
const PHASES = {
  A: { days: 3, posts: 2, replies: 4, follows: 4, likes: 16 },
  B: { days: 11, posts: 5, replies: 10, follows: 8, likes: 25 },
  C: { days: Infinity, posts: 10, replies: 20, follows: 15, likes: 50 }
};

// Current phase
const startDate = new Date('2026-02-23');
const today = new Date();
const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

let currentPhase = 'A';
if (daysSinceStart > 14) currentPhase = 'C';
else if (daysSinceStart > 3) currentPhase = 'B';

const LIMITS = PHASES[currentPhase];
const cumulativeMultiplier = daysSinceStart;
const limits = {
  posts: LIMITS.posts * cumulativeMultiplier,
  replies: LIMITS.replies * cumulativeMultiplier,
  follows: LIMITS.follows * cumulativeMultiplier,
  likes: LIMITS.likes * cumulativeMultiplier
};
const phaseName = `Phase ${currentPhase}`;

const metricsPath = path.join(__dirname, 'x_metrics_log.csv');

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTodayMetrics() {
  const todayStr = getTodayStr();
  if (!fs.existsSync(metricsPath)) return { posts: 0, replies: 0, follows: 0, likes: 0 };
  
  const lines = fs.readFileSync(metricsPath, 'utf8').trim().split('\n');
  for (let i = lines.length - 1; i >= 1; i--) {
    if (lines[i].startsWith(todayStr)) {
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
  const todayStr = getTodayStr();
  
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
  
  const newLine = `${todayStr},${phaseName},${newPosts},${newReplies},${newFollows},${newLikes},0,0,N/A,N/A,Auto-updated`;
  
  let found = false;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(todayStr)) {
      lines[i] = newLine;
      found = true;
      break;
    }
  }
  if (!found) lines.push(newLine);
  
  fs.writeFileSync(metricsPath, lines.join('\n') + '\n');
  console.log(`Updated metrics: ${newPosts} posts, ${newReplies} replies, ${newFollows} follows, ${newLikes} likes`);
  
  return { posts: newPosts, replies: newReplies, follows: newFollows, likes: newLikes };
}

async function searchAndReply(query, replyText) {
  const current = getTodayMetrics();
  
  if (current.replies >= limits.replies) {
    console.log(`[${phaseName}] Reached daily reply limit (${limits.replies})`);
    return null;
  }
  
  try {
    // Use recent search endpoint with correct params (max_results: 10-100)
    const search = await rwClient.v2.get('tweets/search/recent', { 
      query: query, 
      max_results: 10 
    });
    
    let count = 0;
    for (const tweet of search.data || []) {
      if (count >= 2) break;
      if (tweet.author_id === auth.accountId) continue;
      
      console.log(`[${phaseName}] Replying to: ${tweet.text.substring(0, 50)}...`);
      
      await delay(2000);
      
      try {
        const reply = await rwClient.v2.reply(replyText, tweet.id);
        updateMetrics(0, 1, 0, 0);
        console.log(`[${phaseName}] Replied!`);
        count++;
      } catch (e) {
        if (e.code === 429) { console.log('Rate limited'); break; }
        console.log('Reply error:', e.message);
      }
    }
  } catch (e) {
    console.error('Search error:', e.message);
  }
  return null;
}

async function postTweet(text) {
  const current = getTodayMetrics();
  
  if (current.posts >= limits.posts) {
    console.log(`[${phaseName}] Reached daily post limit (${limits.posts})`);
    return null;
  }
  
  try {
    await delay(2000);
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

async function likeTweets(query, count) {
  const current = getTodayMetrics();
  
  if (current.likes >= limits.likes) {
    console.log(`[${phaseName}] Reached daily like limit (${limits.likes})`);
    return;
  }
  
  try {
    const search = await rwClient.v2.get('tweets/search/recent', { 
      query: query, 
      max_results: Math.min(count + 5, 100) 
    });
    let likes = 0;
    for (const tweet of search.data || []) {
      if (likes >= count || current.likes + likes >= limits.likes) break;
      await delay(1000);
      try {
        await rwClient.v2.like(auth.accountId, tweet.id);
        console.log('Liked tweet');
        likes++;
      } catch(e) { if (e.code === 429) break; }
    }
    if (likes > 0) updateMetrics(0, 0, 0, likes);
  } catch (e) {
    console.error('Like error:', e.message);
  }
}

async function retweetFromSearch(query) {
  try {
    const search = await rwClient.v2.get('tweets/search/recent', { 
      query: query, 
      max_results: 10 
    });
    
    for (const tweet of search.data || []) {
      if (tweet.author_id === auth.accountId) continue;
      await delay(2000);
      try {
        await rwClient.v2.retweet(auth.accountId, tweet.id);
        console.log('Retweeted:', tweet.text.substring(0, 40) + '...');
        return true;
      } catch(e) { 
        console.log('Retweet error:', e.message);
        if (e.code === 429) break;
      }
    }
  } catch (e) {
    console.error('RT Search error:', e.message);
  }
  return false;
}

async function quoteTweet(text, tweetId) {
  try {
    await delay(2000);
    const quote = await rwClient.v2.quoteTweet(text, tweetId);
    console.log('Quote tweeted!');
    updateMetrics(1, 0, 0, 0);
    return quote.data.id;
  } catch (e) {
    console.error('Quote error:', e.message);
  }
  return null;
}

// Reply to mentions (X API only allows replying to mentions/engaged users)
async function replyToMentions() {
  try {
    const mentions = await rwClient.v2.userMentionTimeline(auth.accountId, { max_results: 10 });
    
    // Access the actual tweets array
    const tweets = mentions.data?.data || [];
    if (tweets.length === 0) {
      console.log('No mentions to reply to');
      return;
    }
    
    const current = getTodayMetrics();
    let replied = 0;
    
    for (const tweet of tweets) {
      if (replied >= 3) break; // Max 3 auto-replies per run
      if (current.replies + replied >= limits.replies) break;
      
      console.log('Replying to mention:', tweet.text.substring(0, 40) + '...');
      
      await delay(2000);
      try {
        // Simple acknowledgment reply
        const replies = [
          "Thanks for the mention! 🙌",
          "Appreciate it! 👍",
          "Thanks! 🚀",
          "Appreciated! 😊"
        ];
        const replyText = replies[Math.floor(Math.random() * replies.length)];
        
        await rwClient.v2.reply(replyText, tweet.id);
        console.log('Replied to mention!');
        replied++;
      } catch(e) {
        if (e.data?.detail?.includes('not allowed')) {
          console.log('Cannot reply (API restriction)');
        } else {
          console.log('Reply error:', e.message);
        }
      }
    }
    
    if (replied > 0) updateMetrics(0, replied, 0, 0);
  } catch (e) {
    console.error('Mention error:', e.message);
  }
}

// EarthMeta promotion posts (2 per day above normal limits)
const EARTHMETA_POSTS = [
  "🌍 EarthMeta ($EMT) is building a sustainable digital future! Decentralized & eco-friendly. #Crypto #Web3 #EMT",
  "🚀 Early bird opportunity! EarthMeta presale is live - secure your $EMT tokens now before the next pump! 🐦 #Crypto #Presale"
];

// Popular productivity accounts to pull followers from
const POPULAR_ACCOUNTS = [
  '783214',     // @garyvee
  '14532427',   // @JamesClear
  '222712959',  // @NatashaNel_
  '216776631',  // @TimFerriss
  '50161003',   // @TonyRobbins
];

async function postEarthMeta() {
  const earthmetaPath = path.join(__dirname, 'earthmeta_posts_today.json');
  const todayStr = getTodayStr();
  
  let posted = 0;
  if (fs.existsSync(earthmetaPath)) {
    const data = JSON.parse(fs.readFileSync(earthmetaPath, 'utf8'));
    if (data.date === todayStr) posted = data.posted || 0;
  }
  
  if (posted >= 2) {
    console.log('[EarthMeta] Already posted 2 today');
    return;
  }
  
  const postText = EARTHMETA_POSTS[posted];
  try {
    await delay(2000);
    const tweet = await rwClient.v2.tweet(postText);
    console.log('[EarthMeta] Posted!:', postText.substring(0, 40) + '...');
    
    // Track
    fs.writeFileSync(earthmetaPath, JSON.stringify({ date: todayStr, posted: posted + 1 }));
  } catch (e) {
    console.error('[EarthMeta] Post error:', e.message);
  }
}

async function followUsers(query, count) {
  const current = getTodayMetrics();
  
  if (current.follows >= limits.follows) {
    console.log(`[${phaseName}] Reached daily follow limit (${limits.follows})`);
    return;
  }
  
  try {
    // Use followers of popular accounts (API search is not available on free tier)
    const sourceAccount = POPULAR_ACCOUNTS[Math.floor(Math.random() * POPULAR_ACCOUNTS.length)];
    const users = await rwClient.v2.followers(sourceAccount, { max_results: 10 });
    
    let follows = 0;
    for (const user of users.data || []) {
      if (follows >= count || current.follows + follows >= limits.follows) break;
      await delay(1000);
      try {
        await rwClient.v2.follow(auth.accountId, user.id);
        console.log('Followed:', user.username);
        follows++;
      } catch(e) { 
        if (e.data?.errors?.[0]?.code === 429) break; // rate limit
        console.log('Follow error:', e.message); 
      }
    }
    if (follows > 0) updateMetrics(0, 0, follows, 0);
  } catch (e) {
    console.error('Follow error:', e.message);
  }
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
      listed: m.listed_count,
      likes: m.like_count
    };
  } catch (e) {
    console.error('Metrics error:', e.message);
    return null;
  }
}

const PRODUCTIVITY_POSTS = [
  "3 productivity mistakes keeping you broke:\n- Multitasking (it's a myth)\n- Busy ≠ effective\n- No system for saying no\n\nReply with your worst one 👇",
  "Your morning routine determines your entire day.\nMine:\n- No phone for first 30 min\n- Write 3 priorities\n- Exercise before anything else\n\nWhat's your non-negotiable?",
  "Stop optimizing for busy. Optimize for impact.\nThe 80/20 rule: 20% of your actions create 80% of your results.\nFind that 20%. Double down.",
  "The problem with most to-do lists:\nThey're brain dumps, not plans.\nTry: 3 priorities max. Everything else is a 'someday' list.",
  "Productivity tip that changed my life:\nTime-block your deep work. Not 'work from 9-5' — 'write from 9-11, code from 1-4'\nProtection from context switching is everything.",
  "Most people use AI wrong. They treat it like a search engine.\nTreat it like an intern: give context, constraints, and ask it to revise.\nThe prompt is the skill.",
  "AI won't replace you. Someone using AI will.\nThe edge isn't AI itself — it's knowing how to prompt, review, and integrate it into your workflow.",
  "The fastest way to learn anything:\nDon't consume. Build.\nRead 30 min. Then build something for 2 hours.\nThat's how skills actually stick.",
  "Most 'learning' is procrastination in disguise.\nWatching tutorials ≠ getting better.\nYou learn by doing the uncomfortable thing badly first.",
  "Hot take: Most people don't want productivity.\nThey want the results without the sacrifice.\nThat's not a strategy problem. It's a desire problem."
];

const ENGAGEMENT_POSTS = [
  "Reply with one word: What's your biggest current challenge?\nI'll reply with thoughts.",
  "What's a skill you wish you learned 5 years ago?",
  "Morning people vs night people: change my mind that it doesn't matter, just consistency.",
  "Drop your best productivity tip 👇"
];

function getRandomPost() {
  const allPosts = [...PRODUCTIVITY_POSTS, ...ENGAGEMENT_POSTS];
  return allPosts[Math.floor(Math.random() * allPosts.length)];
}

async function runScheduled() {
  const hour = new Date().getHours();
  const current = getTodayMetrics();
  
  console.log(`\n=== ${phaseName} Scheduled Run (${hour}:00) ===`);
  console.log(`Today: ${current.posts}/${limits.posts} posts, ${current.replies}/${limits.replies} replies, ${current.follows}/${limits.follows} follows, ${current.likes}/${limits.likes} likes`);
  
  // Check for mentions first - X only allows replying to mentions
  await replyToMentions();
  
  // Morning (8-10am)
  if (hour >= 8 && hour <= 10) {
    console.log('\n[Morning]');
    if (current.posts < limits.posts) {
      await postTweet(getRandomPost());
    }
    await postEarthMeta(); // EarthMeta promo
    await followUsers('productivity expert', 2);
    await likeTweets('productivity tips', 5);
    await retweetFromSearch('productivity OR productivity tips');
  }
  
  // Afternoon (1-3pm)
  if (hour >= 13 && hour <= 15) {
    console.log('\n[Afternoon]');
    if (current.posts < limits.posts) {
      await postTweet(getRandomPost());
    }
    await replyToMentions();
  }
  
  // Evening (6-8pm)
  if (hour >= 18 && hour <= 20) {
    console.log('\n[Evening]');
    if (current.posts < limits.posts) {
      await postTweet(getRandomPost());
    }
    await postEarthMeta(); // EarthMeta promo
    await likeTweets('productivity', 5);
    await retweetFromSearch('productivity tips');
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
      console.log('Note: Direct reply is restricted. Use "mentions" to reply to users who mention you.');
      break;
    case 'mentions':
      await replyToMentions();
      break;
    case 'post':
      await postTweet(arg1);
      break;
    case 'like':
      await likeTweets(arg1 || 'productivity tips', parseInt(arg2) || 5);
      break;
    case 'follow':
      await followUsers(arg1 || 'productivity', parseInt(arg2) || 2);
      break;
    case 'rt':
      await retweetFromSearch(arg1 || 'productivity tips');
      break;
    case 'quote':
      // arg1 = tweetId, arg2 = quote text
      await quoteTweet(arg2, arg1);
      break;
    case 'metrics':
      const metrics = await getMetrics();
      console.log(JSON.stringify(metrics, null, 2));
      break;
    case 'status':
      const current = getTodayMetrics();
      console.log(`Phase: ${phaseName}`);
      console.log(`Today: ${current.posts}/${limits.posts} posts, ${current.replies}/${limits.replies} replies, ${current.follows}/${limits.follows} follows, ${current.likes}/${limits.likes} likes`);
      // Check EarthMeta posts
      const emPath = path.join(__dirname, 'earthmeta_posts_today.json');
      if (fs.existsSync(emPath)) {
        const emData = JSON.parse(fs.readFileSync(emPath, 'utf8'));
        console.log(`EarthMeta: ${emData.posted}/2 promo posts today`);
      }
      break;
    case 'earthmeta':
      await postEarthMeta();
      break;
    case 'run':
      await runScheduled();
      break;
    default:
      console.log('X Growth Bot - Phase', currentPhase);
      console.log('Usage: post/like/follow/rt/quote/mentions/metrics/status/run/earthmeta');
  }
})();
