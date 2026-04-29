# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard
192.168.1.146:5000 | src: /home/john/ARR/dashboard-v2/ | build: `npm run build` | ext: johntaylormfc.ddns.net

## ARR Ports
Sonarr :8989 | Radarr :7878 | Prowlarr :9696 | keys: memory/credentials.md

## GSPro 192.168.1.228
WinRM bot/BotBotBot! p5985 | SSH bot/BotBotBot! | admin john/M0therwell9!

## Credentials
keys: memory/credentials.md | OpenCF PID 176958 Beelink | DNS openclaw.bcdev.co.uk pending

## Voice
Deepgram Nova-2 | /home/john/.openclaw/workspace/scripts/transcribe.js

## John
Ideas→kanban | PRs→GitHub | WhatsApp | backup b.dashboard | never restore DB for UI

## Open Issues
- GLApproval AL0219 encoding: 8 .al files need UTF-8 NO BOM on GSPro
- Gmail OAuth: needs manual browser flow
- Drive OAuth scope error since Apr 14
- DNS CNAME pending: openclaw.bcdev.co.uk
- fe28d320 cron job skipping (payload.kind misconfigured)

## Patterns
- WhatsApp 499 disconnects ~30min cycle, self-heals within ~3s
- Snapshot backups every 2 days: 1.0-1.7 MB
- Gateway log staleness → false DOWN detections (watchdog cron fixed)
- RAM pressure triggers hermes SIGKILL

## 2026-04-26 Weekly Summary
- ✅ Snapshot backups (Apr 19,20,21,22,25)
- ✅ Hermes file handoff live (Apr 21) - cron 64e0a4372611
- ✅ Gateway watchdog keepalive added (Apr 23)
- ✅ Dashboard stable all week

## 2026-04-27 Daily Review
- ✅ Gateway watchdog passed all checks
- ✅ ARR stack healthy
- ✅ OpenClaw updated to 2026.4.25 (aa36ee6)
- ✅ WhatsApp auto-reconnecting after 499s
- fe28d320 cron job still skipping

## 2026-04-29 Promotions
- hermes_handoff.js working (OpenClaw ↔ Hermes task handoff)
- Gateway uptime ~271k-385k seconds after restart