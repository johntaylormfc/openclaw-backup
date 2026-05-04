# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard
192.168.1.146:5000 | src: /home/john/ARR/dashboard-v2/ | ext: johntaylormfc.ddns.net

## ARR Ports
Sonarr :8989 | Radarr :7878 | Prowlarr :9696 | keys: memory/credentials.md

## GSPro 192.168.1.228
WinRM bot/BotBotBot! p5985 | SSH bot/BotBotBot! | admin john/M0therwell9!

## Credentials
keys: memory/credentials.md | OpenCF PID 176958 Beelink | DNS openclaw.bcdev.co.uk pending

## Voice
Deepgram Nova-2 | /home/john/.openclaw/workspace/scripts/transcribe.js

## John Prefs
Ideas→kanban | PRs→GitHub | WhatsApp | backup b.dashboard | never restore DB for UI

## Open Issues
- GLApproval AL0219 encoding: 8 .al files need UTF-8 NO BOM on GSPro
- Drive OAuth: empty token file → immediate crash (google-oauth-token.json = 0 bytes)
- fe28d320 cron job skipping (payload.kind misconfigured)
- DNS CNAME pending: openclaw.bcdev.co.uk
- Gmail OAuth: needs manual browser flow

## Working Patterns
- WhatsApp 499 self-heals within ~3s
- Snapshot backups every 2 days: 1.0-2.0 MB
- Gateway log staleness → false DOWN (fixed via watchdog cron)
- **NEW 2026-05-01:** Drive backup dual failure modes: (1) empty token = instant crash, (2) scope error = writes work, reads fail

## Promoted From Short-Term Memory (2026-05-04)

### May 3rd Learnings
- Gateway rock solid: 55+ hours uptime, no restarts over weekend
- WhatsApp: zero disconnections, self-heals within ~3s
- fe28d320 cron still skipping (payload.kind misconfigured - recurring issue)

### May 2nd Learnings
- Drive backup failed: Google OAuth token still empty (recurring since May 1st)
- Token refresh script `refresh-google-token.js` missing from workspace
- Gateway stable: 43+ hours uptime, no restarts needed
- WhatsApp: zero disconnections, self-heals within ~3s

## Promoted From Short-Term Memory (2026-05-03)

### May 2nd Learnings
- Drive backup failed: Google OAuth token still empty (recurring since May 1st)
- Token refresh script `refresh-google-token.js` missing from workspace
- Gateway stable: 43+ hours uptime, no restarts needed
- WhatsApp: zero disconnections, self-heals within ~3s

<!-- openclaw-memory-promotion:memory:memory/2026-05-03.md:1:14 -->
- Time: 2026-05-03T03:09:00.000Z Topics: drive, openclaw, backup Messages: 10 Summary: Backup Failure (03:09 UTC): Script: drive-openclaw-backup.js Error: SyntaxError: Unexpected end of JSON input at JSON.parse Root Cause: /home/john/.openclaw/secure/google-oauth-token.json is empty (0 bytes). Impact: Snapshot backup could not run. Action Required: Re-authenticate Google Drive API. [score=0.855 recalls=0 avg=0.621 source=memory/2026-05-03.md:1-14]

<!-- openclaw-memory-promotion:memory:memory/2026-05-02.md:30:34 -->
- Time: 2026-05-02T18:37:00.000Z Topics: openclaw, health Messages: 5 Summary: 2026-05-02 Evening Summary: Gateway steady ~142,192s uptime (~39.5 hours). No restarts today — stable since May 1 recovery. Watchdog running every 5 min. WhatsApp: no disconnections. [score=0.848 recalls=0 avg=0.621 source=memory/2026-05-02.md:30-34]

<!-- openclaw-memory-promotion:memory:memory/2026-05-02.md:42:46 -->
- Time: 2026-05-02T20:35:53.665Z Topics: email, openclaw Messages: 5 Summary: [cron:5d6d8f30-d40e-4330-a623-1d0cd5ba2635 Email to Todoist] Run: node /home/john/.openclaw/workspace/scripts/email-to-todoist.js Decisions: reject; will be; will work; should auto [score=0.839 recalls=0 avg=0.621 source=memory/2026-05-02.md:42-46]

<!-- openclaw-memory-promotion:memory:memory/2026-05-02.md:46:50 -->
- Time: 2026-05-02T20:35:53.667Z Topics: email, openclaw Messages: 5 Summary: [cron:5905f716-4342-4453-ac2e-a4652c43a5f3 Calendar to Todoist] Run: node /home/john/.openclaw/workspace/scripts/calendar-to-todoist.js Current time: Decisions: close; will give; will work [score=0.839 recalls=0 avg=0.621 source=memory/2026-05-02.md:46-50]

<!-- openclaw-memory-promotion:memory:memory/2026-05-01.md:1:12 -->
- Time: 2026-05-01T18:37:00.000Z Topics: openclaw, health Messages: 6 Summary: 2026-05-01 End of Day Summary: Gateway steady ~94,041s uptime (~26.1 hours). No restarts since morning recovery at ~08:47 UTC. WhatsApp: zero disconnections. Watchdog every 5 min without incident. [score=0.839 recalls=0 avg=0.621 source=memory/2026-05-01.md:1-12]