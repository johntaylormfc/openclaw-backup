# Ticket
**ID:** OC-0026
**Title:** OpenClaw Reliability Monitoring & Auto-Recovery
**Status:** done
**Outcome State:** Complete
**Priority:** Medium
**Owner:** Arnold 🦞
**Created:** 2026-03-18 22:31
**Last Updated:** 2026-03-19 21:02

## Goal
Add auto-recovery for OpenClaw gateway, critical containers, and cron jobs.

## What Was Done
- Implemented `/home/john/.openclaw/workspace/scripts/auto-recovery.js`
- **Gateway:** Auto-restarts if down (5-min cooldown)
- **Containers:** Auto-restarts critical ARR containers if down (Sonarr, Radarr, Plex, etc.) with 3-attempt limit and 10-min cooldown
- **Cron jobs:** Auto-disables any job after 5 consecutive failures
- All actions logged to `/home/john/.openclaw/workspace/logs/auto-recovery.log`
- State tracked in `/home/john/.openclaw/workspace/state/auto-recovery-state.json`
- Cron job added: "Auto-Recovery Monitor" — runs every 5 minutes, notifies on WhatsApp if action taken

## Acceptance Criteria
- [x] Auto-recovery script created and tested
- [x] Gateway auto-restart implemented
- [x] Container auto-restart implemented
- [x] Cron job auto-disable implemented
- [x] Cron job configured (every 5 min)
- [x] WhatsApp notification on recovery action
- [x] Ticket completed

## Activity Log
### Entries
- **Timestamp:** 2026-03-19 21:02
  **Action:** John confirmed: all 3 auto-recovery types
  **Result:** Implemented full auto-recovery script, tested OK, cron added
  **Next Step:** Close ticket

## Completion Summary
**OC-0026 closed as Complete.** Full auto-recovery implemented:
- Gateway auto-restart (5-min cooldown)
- Container auto-restart for 11 critical ARR containers (3-attempt limit, 10-min cooldown)
- Cron jobs auto-disabled after 5 consecutive failures
- Runs every 5 minutes via "Auto-Recovery Monitor" cron job