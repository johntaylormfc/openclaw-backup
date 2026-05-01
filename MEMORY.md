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
- Drive OAuth scope error since Apr 14 (read-only affected, writes ok)
- fe28d320 cron job skipping (payload.kind misconfigured)
- DNS CNAME pending: openclaw.bcdev.co.uk

## Working Patterns
- WhatsApp 499 self-heals within ~3s
- Snapshot backups every 2 days: 1.0-2.0 MB
- Gateway log staleness → false DOWN (fixed via watchdog cron)