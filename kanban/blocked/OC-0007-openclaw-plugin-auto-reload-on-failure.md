# Ticket
**ID:** OC-0007
**Title:** OpenClaw plugin auto-reload on failure
**Status:** Blocked
**Outcome State:** Waiting on Input
**Priority:** Medium
**Owner:** OpenClaw Agent
**Created:** 2026-03-09 17:50
**Last Updated:** 2026-03-10 14:47

## Goal
Implement automatic plugin reload/recovery when a plugin fails to load (like the WhatsApp createPluginRuntimeStore error). The gateway should attempt recovery after transient failures rather than staying in error state.

## Why
Plugins can fail to load (as seen with WhatsApp error). Auto-recovery would improve reliability without manual intervention.

## Acceptance Criteria
- [x] Scope is confirmed
- [ ] Implementation approach is designed and approved
- [ ] Retry logic added to plugin loader
- [ ] Configuration options for retry behavior added
- [ ] Activity log is maintained
- [x] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0017
- Environment: /home/john/openclaw/
- Relevant Files:
  - src/plugins/loader.ts (main plugin loading logic)
  - src/gateway/server-plugins.ts (gateway plugin loading)
- Key Functions:
  - loadOpenClawPlugins() - main entry point
  - recordPluginError() - handles plugin load errors

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
  **Why:** User accepted idea IDEA-0017  
  **Evidence:** Created via accept_idea.py  

- **Timestamp:** 2026-03-10 03:21  
  **Action:** Ticket moved to In Progress  
  **Result:** Started scope analysis  
  **Why:** Cron job picked up oldest ticket from kanban/new  
  **Evidence:** Analyzed src/plugins/loader.ts (~600 lines)  

- **Timestamp:** 2026-03-10 03:25  
  **Action:** Scope analysis completed  
  **Result:** Confirmed plugin loading architecture  
  **Why:** Need to understand current error handling before proposing changes  
  **Evidence:** Found recordPluginError() function handles failures; no retry mechanism exists  

- **Timestamp:** 2026-03-10 14:47  
  **Action:** Ticket moved to Blocked  
  **Result:** Status updated to Blocked  
  **Why:** Waiting on user approval of implementation approach  
  **Evidence:** Proposed 3 approaches, need John to choose  

## Current Position
Scope analysis complete. Three implementation approaches proposed. Ticket is waiting for John to review and approve an approach before implementation can proceed.

## Blocker

### Blocker Summary
**BLOCKED - Waiting on user input for implementation approach**

### What Was Completed
- Analyzed plugin loading architecture in src/plugins/loader.ts
- Identified key functions: loadOpenClawPlugins(), recordPluginError()
- Confirmed no retry mechanism currently exists
- Proposed 3 implementation approaches

### What Failed
Cannot proceed with implementation without user approval of approach

### Why It Failed
Multiple valid implementation options exist - need user preference to proceed

### Evidence
- Plugin loading code reviewed
- Proposed approaches documented in ticket

### Why This Blocks Completion
The implementation cannot begin until John reviews and approves one of the proposed approaches

### What You Need To Do
Review the proposed approaches below and confirm which to implement:

**Proposed Approach:**
1. Add optional retry config to plugins (maxRetries, retryDelayMs)
2. Modify loadOpenClawPlugins() to retry on transient failures
3. Add retry attempts to diagnostics/logs
4. Only mark as "error" after all retries exhausted

**Alternative Approaches:**
A) Runtime health check - periodically check failed plugins and reload
B) On-demand reload - API endpoint to reload a specific plugin
C) Startup retry only - retry failed plugins on next gateway restart

### Next Step After Unblock
Implement the approved approach in src/plugins/loader.ts

## Completion Summary
Not complete.
