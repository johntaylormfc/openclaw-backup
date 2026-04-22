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

## 2026-04-14 RDP Black Screen Fix (Beelink)
- Fix: `xfwm4 --replace --display=:10.0` + `xfdesktop --display=:10.0`
- RDP client fallback: Display→Colors=High(16-bit), Experience→untick bitmap caching

## Open Issues

- GLApproval AL0219 encoding: 8 .al files need re-encode UTF-8 NO BOM on GSPRO
- Gmail OAuth: needs manual browser flow (`gog auth add` at TTY)
- Drive OAuth scope error (since Apr 14) - needs re-auth
- DNS CNAME pending for openclaw.bcdev.co.uk
- fe28d320 cron job keeps skipping (misconfigured payload.kind)

## 2026-04-18 Daily Review
### What Went Well
- ✅ Snapshot backup successful (~1.0 MB, 03:05 UTC)
- ✅ All cron jobs running normally (healthcheck, log monitor, triage, email/calendar sync)
- ✅ System healthy - no errors in daily triage
- ✅ Weekend operations stable

### What Could Be Improved
- Limited activity - John away for weekend, minimal automation work
- No new dashboard deployments (build in progress but not completed)

### Patterns/Learnings
- Weekend mode: system self-heals, minimal automation active
- Snapshot backups running reliably (every 2 days: 16, 18, 19)

---

## 2026-04-19 Weekly Summary

### What Went Well
- ✅ Snapshot backup working reliably (Apr 16, 18, 19 all successful)
- ✅ Auto-Recovery cron optimized - runs in ~12s, no timeouts
- ✅ Transmission container fixed - healthcheck retuned, now healthy
- ✅ Dashboard enhancements - ARR Queue, Cron Health, Activity Feed panels
- ✅ Dashboard z-index fix deployed (glass-card layering)
- ✅ hermes+OpenClaw config verified - separate ports (18789 vs 44803), no conflicts
- ✅ System healthy - 41 OK jobs, 0 error jobs most of week

### What Could Be Improved
- Gmail OAuth still needs manual browser flow (John at TTY)
- Drive OAuth scope error unresolved since Apr 14
- hermes transient SIGKILL on Apr 17 (RAM pressure - 1.1GB free, 20GB swap)
- fe28d320 cron job keeps skipping (misconfigured payload.kind)

### Patterns/Learnings
- RAM pressure triggers hermes SIGKILL - monitor free memory
- MiniMax API transient overloads - jobs auto-retry successfully
- Dashboard z-index issues with glass-card - add relative z-50 to header
- Auto-recovery direct exec > agentTurn (faster, more reliable)
- Snapshot backups: tarball creation + Drive upload both working

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

## 2026-04-20 Daily Review (Apr 20)
### What Went Well
- ✅ Snapshot backup successful (1.2 MB, 03:06 UTC)
- ✅ All cron jobs executed without errors (healthcheck, triage, memory log, email sync)
- ✅ Dashboard DB backup running on schedule
- ✅ Active development session: docker, dashboard, GitHub, ARR work
- ✅ Three new kanban ideas generated (IDEA-0165, 0166, 0167)

### What Could Be Improved
- No critical issues - system running smoothly
- Consider consolidating some cron jobs for efficiency

### Patterns/Learnings
- Snapshot backups every 2 days consistently working (16, 18, 19, 20)
- System maintains health autonomously during weekdays
- fe28d320 cron job still skipping (persistent misconfigured payload.kind issue)

---

## 2026-04-20 Daily Review (Apr 19)
### What Went Well
- ✅ All cron jobs running normally through weekend
- ✅ Auto-recovery health checks passing (23:00-08:00)
- ✅ No alerts or recovery events triggered
- ✅ Weekend system stable

### What Could Be Improved
- Gateway last heartbeat still stale (2026-03-27) - but gateway responds
- No new work completed - quiet weekend

### Patterns/Learnings
- Weekend cron jobs maintaining system health autonomously
- hermes transient SIGKILL on Apr 17 (RAM pressure - 1.1GB free, 20GB swap)
- fe28d320 cron job keeps skipping (misconfigured payload.kind)

## Promoted From Short-Term Memory (2026-04-20)

<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:4:7 -->
- Time: 2026-04-15T23:10:59.934Z Topics: arr, docker, dashboard, memory, github, email, openclaw, health, bc, ideas Messages: 683 [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-15.md:4-6]
<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:8:8 -->
- Decisions: rejected; approve; approved; close; will follow [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-15.md:8-8]
<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:11:14 -->
- Time: 2026-04-15T23:10:59.923Z Topics: arr, docker, dashboard, openclaw, health Messages: 4 Summary: [cron:b32c33b3-8ccf-466b-92a4-e7c3ca64a8b3 Auto-Recovery Monitor] Run: node /home/john/.openclaw/workspace/scripts/auto-recovery.js Current time: Thur [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-15.md:11-14]
<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:17:20 -->
- Time: 2026-04-15T23:10:59.922Z Topics: arr, docker, dashboard, memory, github, email, openclaw, health, bc, ideas Messages: 10 [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-15.md:17-19]
<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:24:27 -->
- Time: 2026-04-15T23:10:59.922Z Topics: docker, dashboard, github, openclaw, ideas Messages: 9 Summary: [cron:007bd1be-d806-4058-8cf5-61a2e583cca0 Process next Kanban ticket] Read and follow /home/john/.openclaw/workspace/RUN_NEXT_TICKET_CRON.md and proc [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-15.md:24-27]
<!-- openclaw-memory-promotion:memory:memory/2026-04-13.md:5:5 -->
- **Time:** 03:02 Europe/London (02:02 UTC) [score=0.807 recalls=0 avg=0.620 source=memory/2026-04-13.md:5-5]
<!-- openclaw-memory-promotion:memory:memory/2026-04-13.md:9:10 -->
- Error: ENOENT: no such file or directory, open '/home/john/.openclaw/workspace/config/google-oauth-token.json' Script: /home/john/.openclaw/workspace/scripts/drive-openclaw-backup.js [score=0.807 recalls=0 avg=0.620 source=memory/2026-04-13.md:9-10]
<!-- openclaw-memory-promotion:memory:memory/2026-04-13.md:13:13 -->
- **Root Cause:** Google OAuth token file missing at expected path `config/google-oauth-token.json`. [score=0.807 recalls=0 avg=0.620 source=memory/2026-04-13.md:13-13]

## Promoted From Short-Term Memory (2026-04-21)

<!-- openclaw-memory-promotion:memory:memory/2026-04-15.md:21:21 -->
- Decisions: reject; rejected; will be; should go [score=0.826 recalls=0 avg=0.620 source=memory/2026-04-15.md:21-21]
<!-- openclaw-memory-promotion:memory:memory/2026-04-16.md:3:5 -->
- - **Result:** ✅ Success - **File:** openclaw-snapshot_2026-04-16T02-04-19.tar.gz (0.8 MB) - **Uploaded to:** Google Drive ## Light Sleep <!-- openclaw:dreaming:light:start --> - Candidate: Snapshot Backup — 02:04 UTC: **Result:** ✅ Success; **File:** openclaw-snapshot_2026-04-16T02-04-19.tar.gz (0.8 MB); **Uploaded to:** Google Drive [score=0.822 recalls=0 avg=0.620 source=memory/2026-04-16.md:3-9]
<!-- openclaw-memory-promotion:memory:memory/2026-04-16.md:475:478 -->
- Time: 2026-04-16T20:34:01.077Z Topics: arr, docker, github, openclaw, health Messages: 3 Summary: [cron:cron-triage-30m-001 Cron Error Triage] Run triage: ~/.openclaw/workspace/tools/openclaw_cron_triage.sh Current time: Thursday, April 16th, 2026 [score=0.812 recalls=0 avg=0.620 source=memory/2026-04-16.md:475-478]

## Promoted From Short-Term Memory (2026-04-22)

<!-- openclaw-memory-promotion:memory:memory/2026-04-16.md:479:479 -->
- Decisions: will copy [score=0.816 recalls=0 avg=0.620 source=memory/2026-04-16.md:479-479]
