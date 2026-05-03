
## 2026-04-12 00:30 UTC - OAuth Token Expired

- Cron job failed with `invalid_grant`
- Cleared expired token at `/home/john/.openclaw/workspace/config/google-oauth-token.json`
- Script requires manual re-auth: `node /home/john/.openclaw/workspace/scripts/email-to-todoist.js`
- Ticket created: `kanban/new/gmail-oauth-reauth-needed.md`
- Client ID: 784690914094-70uo4kt0p0tddmqa3rirc9oscditseou.apps.googleusercontent.com

## 2026-05-03 12:30 UTC - Token Missing / Needs Re-auth
- Cron run failed: `ENOENT: no such file or directory, open '/home/john/.openclaw/workspace/config/google-oauth-token.json'`
- Root cause: symlink points to `/home/john/.openclaw/secure/google-oauth-token.json` which doesn't exist
- Re-auth URL available at `/home/john/.openclaw/workspace/config/google-oauth-reauth-url.txt` (from 2026-04-14)
- Script requires `--reauth` flag + interactive browser OAuth flow — not possible in cron context
- **Action needed:** Manual re-authentication required. Run with `--reauth` flag or via TUI.
