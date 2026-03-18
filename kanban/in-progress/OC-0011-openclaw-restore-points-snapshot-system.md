# Ticket
**ID:** OC-0011
**Title:** OpenClaw Restore Points / Snapshot System
**Status:** in-progress (blocked)
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-11 21:29
**Last Updated:** 2026-03-18 17:00

## Goal
Implement a restore point/snapshot system for OpenClaw that allows users to easily backup and restore their configuration, memory, skills, and channel settings.

## Why
This work was accepted from idea IDEA-0025.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0025
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-18 17:00
  **Action:** Picked up from kanban/new — no in-progress tickets found
  **Result:** Ticket moved to kanban/in-progress/
  **Why:** No other tickets in progress; this is the oldest ticket in new/
  **Evidence:** ls kanban/in-progress/ was empty
  **Next Step:** Block immediately — scope needs to be confirmed with John

- **Timestamp:** 2026-03-18 08:03
  **Action:** Status review — file was in in-progress/ but status field was "New"
  **Result:** Moved to kanban/new/ — ticket was never actually picked up
  **Why:** Folder/status mismatch found during stale review
  **Evidence:** File had no in-progress activity, status field was "New"
  **Next Step:** Agent can pick up when requested

- **Timestamp:** 2026-03-11 21:29
  **Action:** Ticket created from accepted idea
  **Result:** Ticket added to kanban/new
  **Why:** User accepted idea IDEA-0025
  **Evidence:** Created via accept_idea.py
  **Next Step:** Agent can pick up the ticket when requested

## Current Position
Ticket is in-progress but blocked waiting for scope confirmation from John.

## Blocker

### Blocker Summary
Scope not confirmed — need John to define what this feature should actually cover and how it should work before any implementation.

### What Was Completed
- Ticket moved to kanban/in-progress/

### What Failed
- Cannot proceed without scope confirmation

### Why It Failed
- The goal ("backup and restore config, memory, skills, and channel settings") is broad with many possible interpretations. Key decisions needed before any implementation.

### Evidence
- Ticket acceptance criteria starts with "Scope is confirmed" as a prerequisite
- No technical design or scope decision has been made

### Why This Blocks Completion
- Multiple fundamental design decisions are unresolved. Without them, any implementation would be guesswork that may not match John's intent.

### What You Need To Decide
1. **What to backup:** All of the following, or a subset?
   - `/home/john/.openclaw/` workspace files (AGENTS.md, SOUL.md, IDENTITY.md, USER.md, TOOLS.md, MEMORY.md)
   - Skill definitions (files under `~/.npm-global/lib/node_modules/openclaw/skills/`)
   - OpenClaw config (gateway settings, node config, channel configs)
   - Docker Compose state and env files
   - Dashboard config (dashboard-v2 repo)
2. **When it triggers:** Manual only, cron-scheduled, or both?
3. **Where snapshots are stored:** Local filesystem (specify path), or something else?
4. **Retention:** Keep all snapshots, or prune old ones (e.g. keep last N)?
5. **Restore mechanism:** Overwrite current files, restore to a named point, or both?
6. **Format:** Plain tar/zip archive, or versioned + timestamped directories?

### Next Step After Unblock
Once scope is confirmed, implement the snapshot and restore scripts/logic per the agreed design.

## Completion Summary
Not complete.
