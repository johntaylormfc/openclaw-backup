const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: 'JWLYbIXetTkYYf0dyGWpCeSVA',
  appSecret: 'mZsVDFVgF4e9cx3aMzca7l4yI0zuoiBAYiTfwiqNddlSNetV4D',
  accessToken: '2025975988010770434-yfUyPDhhJU4XLeJVnQHWDYLtfZCO0b',
  accessSecret: 'NbKbSkwbJxzxOS347VoyynFqARNr6z9NqlbEZ3HiJnT3Q',
});

const readonlyClient = client.readWrite;

async function main() {
  // Get user info
  const me = await readonlyClient.v2.me({ 'user.fields': 'public_metrics' });
  console.log('Authenticated as:', me.data.name, '@' + me.data.username);
  console.log('Followers:', me.data.public_metrics.followers_count);
  
  // Get recent tweets
  const tweets = await readonlyClient.v2.userTimeline('MyNewClawBot', {
    max_results: 5
  });
  console.log('\nRecent tweets:');
  for await (const tweet of tweets) {
    console.log('-', tweet.text.substring(0, 80) + '...');
  }
}

main().catch(console.error);
