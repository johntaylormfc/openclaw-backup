# Gmail OAuth Re-authentication Needed

**Created:** 2026-04-12 00:30 UTC
**Priority:** High
**Status:** In Progress

## Issue
The email-to-todoist cron job failed with `invalid_grant` - Gmail OAuth token has expired and requires re-authentication.

## Manual Action Required
1. Run: `node /home/john/.openclaw/workspace/scripts/email-to-todoist.js`
2. Open the displayed URL in a browser
3. Complete Google OAuth flow
4. Paste the redirect URL back into the terminal

## Domains Monitored
- galloway-macleod.co.uk
- bcdev.co.uk
- bcdevltd.com

## Notes
- Token file was cleared at 2026-04-11 23:30 UTC
- Script is located at `/home/john/.openclaw/workspace/scripts/email-to-todoist.js`

---
**Auto-Pickup:** Started at 2026-04-12 01:02 by pick-up-new-tickets cron
