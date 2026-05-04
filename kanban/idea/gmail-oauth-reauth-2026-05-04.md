# Gmail OAuth Re-auth Needed

**Status:** needs-action  
**Created:** 2026-05-04 04:30 UTC  
**Priority:** high  

## Problem
Email-to-Todoist cron job failed with `invalid_grant` - Gmail OAuth token expired.

## Fix Required
Run re-auth flow in browser and paste the redirect URL back:

```bash
node /home/john/.openclaw/workspace/scripts/email-to-todoist.js --reauth
```

Then:
1. Open the URL from `/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt`
2. Authorize the app
3. Copy the redirect URL (will show blank page after `http://localhost/?code=...`)
4. Paste it back to the script prompt

## Note
This needs to be done manually since it's browser-based OAuth. The cron cannot complete this non-interactively.