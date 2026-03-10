# Ticket
**ID:** OC-0008
**Title:** OpenClaw cron job dashboard UI
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** ARR_Bot
**Created:** 2026-03-09 17:50
**Last Updated:** 2026-03-10 08:35

## Goal
Add a cron jobs management section to the dashboard showing all scheduled jobs, their next run times, and enable/disable toggle. Visual feedback for job status would improve UX.

## Why
Currently cron jobs are invisible. A dashboard view would provide visibility into scheduled automation and health checks.

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0018
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-09 17:50  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0018  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

- **Timestamp:** 2026-03-10 08:31  
  **Action:** Ticket picked up by cron job  
  **Result:** Moved to kanban/in-progress  
  **Why:** Cron job found no in-progress tickets, selected oldest new ticket  
  **Evidence:** MV command executed  
  **Next Step:** Analyse request and confirm scope

- **Timestamp:** 2026-03-10 08:35  
  **Action:** Scope analysis complete  
  **Result:** Identified current state and required changes  
  **Why:** Reviewed Cron.jsx, API, and backend to understand implementation  
  **Evidence:** Found Cron.jsx at /home/john/ARR/dashboard-v2/src/components/Cron.jsx with basic UI  
  **Findings:** 
  - Cron jobs data: /tmp/arr-cronjobs.json (populated by cron job c8695ada-f27d-4f76-bec1-013fe52389c2)
  - Current UI shows: name, schedule expr, enabled (green dot), next run time
  - Missing: enable/disable toggle (no backend API), visual status (last run, errors, duration)
  **Next Step:** Enhance Cron.jsx with better visual feedback; note that enable/disable requires backend API

## Current Position
Analyzed scope. Current Cron.jsx has basic functionality. Need to enhance UI for visual feedback. Enable/disable toggle requires backend API support.

## Blocker

*Resolved 2026-03-10 09:18 - Backend API added*

**Resolution:**
- Added `PUT /api/cronjobs/:id/toggle` endpoint to arr-dashboard server.js
- Endpoint updates both JSON file and calls OpenClaw CLI  
- Tested successfully - toggle working

### Next Step
Add toggle UI to Cron.jsx frontend component
- Cannot implement enable/disable toggle without backend API
- No /api/cronjobs/:id/toggle or similar endpoint exists

### Why It Failed
- Backend (arr-dashboard server.js) only provides GET for cronjobs
- No POST/PUT endpoints to update job enabled state
- Would need to call `openclaw cron update` command

### Evidence
- server.js line 1000-1010: only GET endpoint exists
- openclaw cron CLI has update command but not exposed via dashboard API

### Why This Blocks Completion
- Full ticket completion requires enable/disable toggle
- Frontend can be enhanced but toggle won't function without backend

### What You Need To Do
1. Decide if you want enable/disable functionality (requires backend API work)
2. OR approve partial completion with enhanced visual status only

### Next Step After Unblock
- If approved: Add toggle UI + backend API for enable/disable
- If partial approved: Complete UI enhancement for visual feedback

## Completion Summary
Not complete - partial implementation possible but full feature needs backend API.
