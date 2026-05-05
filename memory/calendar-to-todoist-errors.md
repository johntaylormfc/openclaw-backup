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

## 2026-05-02 19:35 UTC - Token Empty (Recurring)
- **Error:** Token file `/home/john/.openclaw/secure/google-oauth-token.json` is 0 bytes
- **Symptom:** Script exits with "Token file is empty. Initiating re-authorization..."
- **Status:** Needs re-authentication
- **Action Required:** Re-run with `--reauth` and complete the OAuth flow in a browser
- **Reauth URL:** already saved in `/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt`
- **Problem:** Manual browser-based OAuth (stdin prompt) cannot complete in this non-interactive cron environment
- **Possible Fix:** Try automated `run-oauth-pw.js` (uses Playwright + Xvfb) or provide a fresh token file manually
- **Notification:** Telegram/WhatsApp notification attempted but may fail if no chats configured


## 2026-05-05 04:03 UTC
- **Error:** `invalid_grant`
- **Status:** Token revoked by Google, needs re-auth
- **Reauth URL:** Available at `/home/john/.openclaw/secure/google-oauth-reauth-url.txt`
- **Fix:** Run `node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js --reauth`

## 2026-05-05 05:02 UTC - invalid_grant
- **Error:** `invalid_grant` during token refresh
- **Status:** Token expired/revoked, needs re-authentication
- **Reauth URL:** already saved in `/home/john/.openclaw/secure/google-oauth-reauth-url.txt`
- **Action Required:** Manual browser auth needed - run with `--reauth` interactively OR use `run-oauth-pw.js` if available
