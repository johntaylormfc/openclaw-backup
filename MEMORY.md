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
- Drive OAuth: empty token file → immediate crash; scope error since Apr 14 (writes ok, reads fail)
- fe28d320 cron job skipping (payload.kind misconfigured)
- DNS CNAME pending: openclaw.bcdev.coin

## Working Patterns
- WhatsApp 499 self-heals within ~3s
- Snapshot backups every 2 days: 1.0-2.0 MB
- Gateway log staleness → false DOWN (fixed via watchdog cron)

## Promoted From Short-Term Memory (2026-05-02)

<!-- openclaw-memory-promotion:memory:memory/2026-04-25.md:17:20 -->
- Time: 2026-04-25T20:33:24.974Z Topics: docker, dashboard, openclaw Messages: 21 Summary: System: [2026-04-25 15:04:37 GMT+1] Execute: openclaw cron list --json 2>&1 | jq '.jobs' > /tmp/arr-cronjobs.json && docker cp /tmp/arr-cronjobs.json [score=0.835 recalls=0 avg=0.620 source=memory/2026-04-25.md:17-20]
<!-- openclaw-memory-promotion:memory:memory/2026-04-25.md:23:26 -->
- Time: 2026-04-25T20:33:24.974Z Topics: email, openclaw, bc Messages: 7 Summary: [cron:5d6d8f30-d40e-4330-a623-1d0cd5ba2635 Email to Todoist] Run: node /home/john/.openclaw/workspace/scripts/email-to-todoist.js Current time: Saturd [score=0.835 recalls=0 avg=0.620 source=memory/2026-04-25.md:23-26]
<!-- openclaw-memory-promotion:memory:memory/2026-04-25.md:29:32 -->
- Time: 2026-04-25T20:33:24.973Z Topics: memory, email, openclaw Messages: 45 Summary: System: [2026-04-25 14:32:13 GMT+1] WhatsApp gateway disconnected (status 499) System: [2026-04-25 14:32:16 GMT+1] WhatsApp gateway connected as +4479 [score=0.835 recalls=0 avg=0.620 source=memory/2026-04-25.md:29-32]
<!-- openclaw-memory-promotion:memory:memory/2026-04-25.md:35:38 -->
- Time: 2026-04-25T20:33:24.973Z Topics: arr, docker, openclaw, health Messages: 5 Summary: [cron:33c0c409-d4fd-44af-b2a1-040e1486e72d ARR Log Monitor] Run: /home/john/.openclaw/workspace/scripts/arr-log-monitor.sh echo "Log monitor run comp [score=0.835 recalls=0 avg=0.620 source=memory/2026-04-25.md:35-38]
