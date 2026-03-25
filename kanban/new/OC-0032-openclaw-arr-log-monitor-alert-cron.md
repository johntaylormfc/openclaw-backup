# Ticket
**ID:** OC-0032
**Title:** OpenClaw ARR Log Monitor + Alert Cron
**Status:** New
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-25 06:50
**Last Updated:** 2026-03-25 06:50

## Goal
Use OpenClaw's native cron scheduler with the exec tool to periodically scan Docker container logs for errors and warnings across the ARR stack (Sonarr, Radarr, Prowlarr, Bazarr, SABnzbd, qBittorrent, Transmission) and send WhatsApp alerts when issues are detected — including failed downloads, API timeouts, and disk space warnings.

## Why
Container crashes or API errors in ARR services are silent until the user notices missing downloads. An OpenClaw cron job with the exec tool can catch these early and push alerts directly to WhatsApp with actionable context.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0110
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-25 06:50  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0110  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

## Current Position
Ticket created from accepted idea and ready for pickup.

## Blocker

### Blocker Summary

### What Was Completed
-

### What Failed
-

### Why It Failed
-

### Evidence
-

### Why This Blocks Completion
-

### What You Need To Do
-

### Next Step After Unblock
-

## Completion Summary
Not complete.
