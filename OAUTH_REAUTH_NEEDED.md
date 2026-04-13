# Gmail OAuth Re-authentication Required

**Date:** 2026-04-13 12:01 UTC
**Script:** email-to-todoist.js
**Error:** invalid_grant - Token has been expired or revoked

## What happened
The stored Gmail OAuth refresh token has been revoked or expired by Google. This happens periodically and requires manual re-authentication.

## To fix
1. Visit this URL in your browser:
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=784690914094-oculuegghv5t57r25e514s7du6c3bnek.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost

2. Sign in with the Gmail account used for the ARR bot

3. After granting permissions, you'll be redirected to `http://localhost/?code=...`

4. Copy that entire URL and save it - or run:
   node /home/john/.openclaw/workspace/scripts/email-to-todoist.js
   
   It will prompt you to paste the URL.

5. The script will exchange the code for a new token and save it automatically.

## Or: Delete the old token file and re-run
```bash
rm /home/john/.openclaw/workspace/config/google-oauth-token.json
node /home/john/.openclaw/workspace/scripts/email-to-todoist.js
```