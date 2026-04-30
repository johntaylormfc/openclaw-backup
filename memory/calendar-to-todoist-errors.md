# Calendar-to-Todoist Error Log

## 2026-04-30 17:35 UTC
- **Error:** `SyntaxError: Unexpected end of JSON input` at JSON.parse (line 15)
- **Root Cause:** Token file `/home/john/.openclaw/secure/google-oauth-token.json` is empty (0 bytes)
- **Status:** Needs re-authentication
- **Reauth URL:** already generated in `/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt`

## Notes
- Same issue as email-to-todoist and drive-openclaw-backup (both failed with same error today)
- All three scripts share the same OAuth token file
- Manual re-auth required: `node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js --reauth`