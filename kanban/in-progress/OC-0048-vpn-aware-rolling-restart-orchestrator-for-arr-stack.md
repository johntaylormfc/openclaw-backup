# Ticket
**ID:** OC-0048
**Title:** VPN-aware rolling restart orchestrator for ARR stack
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-04-11 04:55
**Last Updated:** 2026-04-11 04:55

## Goal
When gluetun VPN restarts (e.g. reconnect), transmission and threadfin lose connectivity. Create a startup-order orchestrator that watches gluetun health and triggers graceful restart of VPN-dependent containers in the correct order (gluetun → threadfin → transmission → sonarr/radarr/bazarr).

## Why
VPN reconnections currently leave dependent containers in a broken state until manual restart. Automating graceful rolling restarts keeps the stack self-healing without manual intervention.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0162
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
  **Why:** User accepted idea IDEA-0162  
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
**Auto-Pickup:** Started at 2026-04-11 05:07 by pick-up-new-tickets cron
