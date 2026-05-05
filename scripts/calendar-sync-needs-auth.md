=== Calendar to Todoist Sync Status ===
Timestamp: 2026-05-05T02:04:39Z
Status: FAILED - Token expired (invalid_grant)

Action Required:
1. Visit: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly&prompt=consent&response_type=code&client_id=784690914094-oculuegghv5t57r25e514s7du6c3bnek.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost
2. Get the authorization code
3. Run: node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js --reauth
4. Enter the code when prompted

Alternative: Send me the code and I'll run it for you.