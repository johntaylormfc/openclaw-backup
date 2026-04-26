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
GLApproval AL0219→re-encode 8 .al UTF-8 NO BOM | OAuth (Gmail needs re-auth) | DNS CNAME pending

## 2026-04-26 Weekly Summary

### What Went Well
- ✅ Snapshot backups working (Apr 19, 20, 21, 22, 25) - 1.0-1.7 MB range
- ✅ Hermes file handoff live (Apr 21) - test-hw-001 completed successfully
- ✅ Gateway watchdog keepalive added (Apr 23) - fixed false DOWN detections
- ✅ WhatsApp auto-reconnecting reliably after 499 disconnects (~30min cycles)
- ✅ Dashboard stable all week

### What Could Be Improved
- WhatsApp 499 disconnects every ~30 min - self-healing, not critical
- fe28d320 cron job still skipping (persistent payload.kind misconfigured)
- Gmail OAuth needs manual browser flow
- Drive OAuth scope error since Apr 14

### New This Week
- Hermes task handoff: cron 64e0a4372611, skill task-handoff, script hermes_handoff.js
- Gateway watchdog: */4 cron touches gateway.log to prevent stale log false alarms

### Stale Issues
- GLApproval AL0219 encoding: 8 .al files need UTF-8 NO BOM on GSPro
- DNS CNAME pending: openclaw.bcdev.co.uk

---

## 2026-04-25 Daily Review
- ✅ Snapshot backup (1.7 MB), WhatsApp reconnecting after 499s, gateway watchdog working
- WhatsApp 499 disconnects ~every 30 min, auto-reconnects within ~3s

## 2026-04-24 Daily Review
- ✅ Dashboard stable, WhatsApp reconnecting reliably, gateway watchdog keepalive working
- All cron jobs executed without errors

## 2026-04-23 Daily Review
- ✅ Snapshot backup (1.4 MB), gateway-watchdog keepalive added
- WhatsApp briefly disconnected (428) then self-healed
- fe28d320 cron job still skipping

## 2026-04-22 Daily Review
- ✅ Snapshot backup successful (1.4 MB)
- All cron jobs executed without errors
- Active dev session: ARR, dashboard, GitHub work

## 2026-04-21 - Hermes Handoff Live
- ✅ Snapshot backup (1.3 MB)
- Hermes file handoff confirmed working: test-hw-001 completed at 07:03 UTC
- Cron 64e0a4372611 "OpenClaw Task Poller" every 5m
- Script: /home/john/.openclaw/workspace/scripts/hermes_handoff.js

## 2026-04-20 Daily Review
- ✅ Snapshot backup (1.2 MB)
- 3 new kanban ideas: IDEA-0165, 0166, 0167

## 2026-04-19 Weekly Summary (Apr 13-19)
- ✅ Snapshot backup working (Apr 16, 18, 19)
- Auto-Recovery cron optimized (~12s, no timeouts)
- Transmission container fixed - healthcheck retuned
- Dashboard enhancements: ARR Queue, Cron Health, Activity Feed panels
- hermes+OpenClaw config verified - separate ports

---

## Patterns/Learnings
- WhatsApp 499 pattern: brief disconnect, auto-reconnect within ~3s
- RAM pressure triggers hermes SIGKILL - monitor free memory
- Gateway log staleness causes false DOWN detections - fixed with */4 cron
- Snapshot backups every 2 days: consistent 1.0-1.7 MB range
- fe28d320 cron job persistent failure - needs permanent fix

## Open Issues
- GLApproval AL0219 encoding: 8 .al files need re-encode UTF-8 NO BOM on GSPRO
- Gmail OAuth: needs manual browser flow (`gog auth add` at TTY)
- Drive OAuth scope error (since Apr 14) - needs re-auth
- DNS CNAME pending for openclaw.bcdev.co.uk
- fe28d320 cron job keeps skipping (misconfigured payload.kind)

## 2026-04-14 RDP Black Screen Fix (Beelink)
- Fix: `xfwm4 --replace --display=:10.0` + `xfdesktop --display=:10.0`
- RDP client fallback: Display→Colors=High(16-bit), Experience→untick bitmap caching