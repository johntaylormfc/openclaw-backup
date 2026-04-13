# Ticket
**ID:** OC-0050
**Title:** ARR container config drift detector
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-04-11 04:55
**Last Updated:** 2026-04-11 04:55

## Goal
Docker Compose files get updated but containers keep running with old env vars. Build a nightly cron that reads docker-compose.yml, compares current container env vars against the file, and alerts via WhatsApp if any container is out of sync with its compose definition.

## Why
Config drift silently breaks automation. John updates PUID/PGID or port mappings, but containers only restart on manual docker compose up. Catching drift automatically prevents mysterious failures days later.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0164
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-04-11 04:55  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0164  
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
**Auto-Pickup:** Started at 2026-04-11 07:04 by pick-up-new-tickets cron
