# Ticket
**ID:** OC-0005
**Title:** ARR stack Docker health auto-restart
**Status:** New
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-09 17:49
**Last Updated:** 2026-03-09 17:49

## Goal
Implement automatic container health monitoring that restarts unhealthy Sonarr/Radarr/Lidarr containers. Use docker health checks + a lightweight watcher script to detect unhealthy state and restart before manual intervention.

## Why
ARR containers can become unhealthy (stuck downloads, API timeouts) but don't auto-recover. This would reduce manual intervention and downtime.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0014
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-09 17:49  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0014  
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
