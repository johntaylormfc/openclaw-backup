# ARR_Bot Memory

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard
192.168.1.146:5000 (4000=old) | src: /home/john/ARR/dashboard-v2/ | build: `npm run build` | ext: johntaylormfc.ddns.net

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

## Open
GLApproval AL0219→re-encode 8 .al UTF-8 NO BOM | Vector Gemini 403 | OAuth midmonth | DNS CNAME pending

## 2026-04-14 RDP Black Screen Fix (Beelink)
- Fix: `xfwm4 --replace --display=:10.0` + `xfdesktop --display=:10.0`
- RDP client fallback: Display→Colors=High(16-bit), Experience→untick bitmap caching

## Open Issues

- GLApproval AL0219 encoding: 8 .al files need re-encode UTF-8 NO BOM on GSPRO
- Vector Gemini 403 | OAuth refresh failures | DNS CNAME pending

## 2026-04-16 Review
- ✅ Snapshot backup successful (Google Drive upload)
- ✅ Auto-recovery monitor stable - all systems healthy
- ✅ Kanban ticket processing running multiple times daily
- ✅ ARR log monitor working - detecting indexer rate-limits
- ℹ️ GitHub backup WhatsApp notification still failing (no API configured - known issue)

## 2026-04-17 Review
### What Went Well
- ✅ Auto-Recovery cron optimized - runs in ~12s, no more timeouts
- ✅ Transmission container fixed - healthcheck retuned, now healthy
- ✅ Ideas queue quality improved - tightened web search filter
- ✅ Dashboard enhancements - ARR Queue, Cron Health, Activity Feed panels
- ✅ Dashboard z-index fix deployed (glass-card layering)
- ✅ hermes+OpenClaw config verified - separate ports, no conflicts
- ✅ System healthy - 41 OK jobs, 0 error jobs most of day

### What Could Be Improved
- Gmail OAuth still needs manual browser flow (John at TTY)
- Drive OAuth scope error unresolved since Apr 14
- hermes transient SIGKILL at 15:51 - RAM pressure issue
- fe28d320 cron job keeps skipping (misconfigured payload.kind)

### Patterns/Learnings
- RAM pressure triggers hermes SIGKILL - monitor free memory
- MiniMax API transient overloads - jobs auto-retry successfully
- Dashboard z-index issues with glass-card - add relative z-50 to header
- Auto-recovery direct exec > agentTurn (faster, more reliable)