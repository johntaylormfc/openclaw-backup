# Ticket
**ID:** OC-0045
**Title:** Docker Image Update Watcher for ARR Stack
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-30 08:05
**Last Updated:** 2026-03-30 08:05

## Goal
A scheduled cron that periodically checks whether newer Docker image tags are available for John's ARR containers (Sonarr, Radarr, Prowlarr, PlexAutoscan, etc.) and sends a WhatsApp/Mission Control alert — without auto-updating, keeping control in John's hands.

## Why
ARR containers run best when kept up to date, but manually checking each image is tedious. A lightweight watcher surfaces updates as a weekly digest, so nothing falls dangerously out of date without John noticing.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0159
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-30 08:05  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0159  
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

---
**Auto-Pickup:** Started at 2026-03-30 08:08 by pick-up-new-tickets cron
