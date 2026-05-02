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

## 2026-05-01 04:33 UTC - Token Empty (Recurring)
- **Error:** Token file `/home/john/.openclaw/secure/google-oauth-token.json` is 0 bytes
- **Symptom:** Infinite loop of "Token file is empty. Initiating re-authorization..."
- **Fix:** Re-run with `--reauth` and complete the OAuth flow in a browser
- **Notified:** SMS sent to john at +447967688452

## 2026-05-02 08:34 UTC - Token Empty (Recurring)
- **Error:** Token file empty (`/home/john/.openclaw/secure/google-oauth-token.json` is 0 bytes)
- **Status:** Needs re-authentication
- **Action Required:** Run `node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js --reauth` and provide the authorization code
- **Reauth URL:** already saved in `/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt`
- **Note:** WhatsApp not connected, Telegram bot has no chats. User notification failed.

