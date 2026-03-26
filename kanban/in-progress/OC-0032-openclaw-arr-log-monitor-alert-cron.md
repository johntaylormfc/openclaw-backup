# Ticket
**ID:** OC-0032
**Title:** OpenClaw ARR Log Monitor Alert Cron
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-25 06:50
**Last Updated:** 2026-03-26 09:25

## Goal
Use OpenClaw's native cron scheduler with the exec tool to periodically scan Docker container logs for errors and warnings across the ARR stack and send WhatsApp alerts when issues are detected.

## Why
Container crashes or API errors in ARR services are silent until the user notices missing downloads. An OpenClaw cron job with the exec tool can catch these early and push alerts directly to WhatsApp with actionable context.

## Scope (Confirmed)
- Services: Sonarr, Radarr, Prowlarr, Bazarr, SABnzbd, qBittorrent, Transmission
- Frequency: Every 1 hour
- Severity: Errors only (not warnings)
- Alert suppression: Once per day per error type — gentle nag only, not repeated spamming

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [ ] Implement log scanning for error patterns
- [ ] Create alert suppression logic (once/day/error)
- [ ] Configure WhatsApp delivery
- [ ] Validate result
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion

## Context
- Source Idea: IDEA-0110
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [x] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-25 06:50  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  

- **Timestamp:** 2026-03-26 09:25  
  **Action:** Scope confirmed with John  
  **Result:** Hourly, errors only, once/day per error type (gentle nag)  
  **Next Step:** Implement log scanning script  

## Current Position
Scope confirmed. Ready to implement.

## Completion Summary
Not complete.

---
**Auto-Pickup:** Started at 2026-03-26 11:05 by pick-up-new-tickets cron
