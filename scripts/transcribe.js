#!/usr/bin/env node
/**
 * Voice Note Transcription using Deepgram
 * Usage: node transcribe.js <audio_file>
 */

const fs = require('fs');
const https = require('https');

const API_KEY = '5eac7fadeb745001af5576b5b17ac2127a0d3327';
const AUDIO_FILE = process.argv[2];

if (!AUDIO_FILE) {
  console.error('Usage: node transcribe.js <audio_file>');
  process.exit(1);
}

if (!fs.existsSync(AUDIO_FILE)) {
  console.error('File not found:', AUDIO_FILE);
  process.exit(1);
}

const audioData = fs.readFileSync(AUDIO_FILE);

const options = {
  hostname: 'api.deepgram.com',
  port: 443,
  path: '/v1/listen?model=nova-2&smart_format=true',
  method: 'POST',
  headers: {
    'Authorization': `Token ${API_KEY}`,
    'Content-Type': 'audio/ogg',
    'Content-Length': audioData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const transcript = json.results?.channels?.[0]?.alternatives?.[0]?.transcript;
      if (transcript) {
        console.log(transcript);
      } else {
        console.error('No transcript found');
        process.exit(1);
      }
    } catch (e) {
      console.error('Parse error:', e.message);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
  process.exit(1);
});

req.write(audioData);
req.end();
