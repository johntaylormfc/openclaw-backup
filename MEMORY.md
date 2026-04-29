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

## 2026-04-26 Daily Review
- ✅ Cron jobs executed: healthcheck, ARR log monitor, dashboard backup, calendar-to-todoist, email-to-todoist
- ✅ WhatsApp auto-reconnecting reliably after ~499 disconnects
- fe28d320 cron job still skipping (persistent payload.kind misconfigured)

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

## Promoted From Short-Term Memory (2026-04-27)

<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:24:27 -->
- Time: 2026-04-20T20:34:19.753Z Topics: dashboard, memory, openclaw, health, ideas Messages: 3 Summary: [cron:healthcheck-hourly-001 Hourly Health Snapshot] Run healthcheck: ~/.openclaw/workspace/tools/openclaw_healthcheck.sh Current time: Monday, April [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-20.md:24-27]
<!-- openclaw-memory-promotion:memory:memory/2026-04-20.md:31:34 -->
- Time: 2026-04-20T20:34:19.752Z Topics: docker, dashboard, github, openclaw, health, ideas Messages: 608 [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-20.md:31-33]

## Promoted From Short-Term Memory (2026-04-28)

<!-- openclaw-memory-promotion:memory:memory/2026-04-21.md:10:10 -->
- **Confirmed working:** [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-21.md:10-10]
<!-- openclaw-memory-promotion:memory:memory/2026-04-21.md:15:15 -->
- **OpenClaw side script:** `/home/john/.openclaw/workspace/scripts/hermes_handoff.js` [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-21.md:15-15]
<!-- openclaw-memory-promotion:memory:memory/2026-04-21.md:20:23 -->
- **Handoff flow working:** OpenClaw → writes JSON to ~/.hermes/tasks/in/{id}.json → Hermes cron (every 5m) picks it up, skill task-handoff loads → Hermes processes task, writes result to ~/.hermes/tasks/out/{id}.json [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-21.md:20-23]

---

## 2026-04-27 Daily Review

### What Went Well
- ✅ Gateway watchdog passed all checks (08:05–18:10 BST)
- ✅ Dashboard .146:5000 responding
- ✅ ARR stack: all containers healthy
- ✅ OpenClaw updated to 2026.4.25 (aa36ee6), gateway restarted successfully
- ✅ Cron jobs executed: healthcheck, ARR log monitor, dashboard backup, calendar-to-todoist, email-to-todoist, session transcript capture
- ✅ WhatsApp auto-reconnecting after 499 disconnects (~30 min cycles)

### What Could Be Improved
- WhatsApp 499 disconnects every ~30 min (self-healing, known issue)
- Several cron jobs failing at WhatsApp announce step: Daily Review (23:00), ARR Config Backup (03:00), MiniMax Guard (03:15), EMT Token Check (06:00), Backup to GiDrive (06:00)
- fe28d320 cron job still skipping (persistent payload.kind misconfigured)

### New Patterns/Learnings
- WhatsApp channel instability persists but self-heals reliably
- Gateway uptime stable at ~271k-385k seconds after restart

### Stale Issues
- GLApproval AL0219 encoding: 8 .al files need UTF-8 NO BOM on GSPro
- DNS CNAME pending: openclaw.bcdev.co.uk
- fe28d320 cron job skipping

## Promoted From Short-Term Memory (2026-04-29)

<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:25:28 -->
- Time: 2026-04-22T21:20:02.314Z Topics: docker, github, openclaw, health Messages: 9 Summary: [cron:b32c33b3-8ccf-466b-92a4-e7c3ca64a8b3 Auto-Recovery Monitor] Run: node /home/john/.openclaw/workspace/scripts/auto-recovery.js Output the result. [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-22.md:25-28]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:32:35 -->
- Time: 2026-04-22T21:20:02.314Z Topics: memory, openclaw Messages: 3 Summary: [cron:a26f16a2-e5b6-4d31-86d3-031670712bc3 Daily Memory Log] Run: node /home/john/.openclaw/workspace/scripts/daily-memory-log.js This reads session- [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-22.md:32-35]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:38:41 -->
- Time: 2026-04-22T21:20:02.314Z Topics: dashboard, memory, github, openclaw Messages: 6 Summary: [cron:bea36ad2-b3dc-4d8a-80a3-d7822e61fa5e Drive Backup] Execute: node /home/john/.openclaw/workspace/scripts/drive-backup.js Current time: Wednesday, [score=0.850 recalls=0 avg=0.620 source=memory/2026-04-22.md:38-41]
<!-- openclaw-memory-promotion:memory:memory/2026-04-22.md:29:29 -->
- Decisions: will be; will fix; will remove [score=0.840 recalls=0 avg=0.620 source=memory/2026-04-22.md:29-29]
