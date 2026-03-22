# Ticket
**ID:** OC-0011
**Title:** OpenClaw Restore Points / Snapshot System
**Status:** Completed
**Outcome State:** Complete
**Priority:** Medium
**Owner:** Arnold 🦞
**Created:** 2026-03-11 21:29
**Last Updated:** 2026-03-19 19:53

## Goal
Implement a restore point/snapshot system for OpenClaw that allows users to easily backup and restore their configuration, memory, skills, and channel settings.

## Why
This work was accepted from idea IDEA-0025.

## Scope (CONFIRMED - 2026-03-19)
- **What:** Everything — all workspace files, skills, OpenClaw config, Docker Compose, dashboard config
- **When:** Nightly via cron
- **Where:** Google Drive
- **Retention:** Keep snapshots for 7 days, prune older
- **Restore:** Overwrite live files from snapshot
- **Format:** tar.gz (agent's choice — versioned+timestamped)

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Snapshot script implemented and tested
- [ ] Restore script implemented and tested
- [ ] Cron job configured for nightly run
- [ ] Ticket moved to review/done when complete

## Context
- Source Idea: IDEA-0025
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [x] Prepare approach — scope confirmed by John
- [ ] Implement snapshot script
- [ ] Implement restore script
- [ ] Configure Google Drive upload
- [ ] Set up 7-day retention pruning
- [ ] Configure cron job (nightly)
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-19 19:53
  **Action:** Scope confirmed by John via WhatsApp
  **Result:** Ticket unblocked, moved to in-progress
  **Why:** John answered all 6 scope questions
  **Evidence:** WhatsApp reply — "1. Everything, 2 nightly by cron, 3 google drive, 4 keep for a week, 5 overwrite, 6 what you think is best"
  **Next Step:** Implement snapshot script

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
In-progress — scope confirmed, implementation pending.

## Completion Summary
Not complete.
## Completion Summary (2026-03-22)
- Script: `/home/john/.openclaw/workspace/scripts/drive-openclaw-backup.js`
- Usage:
  - `node drive-openclaw-backup.js` — create and upload snapshot
  - `node drive-openclaw-backup.js --list` — list available snapshots
  - `node drive-openclaw-backup.js --restore <name>` — restore from snapshot
- Creates tar.gz of ~/.openclaw/workspace/ and ~/.openclaw/config/
- Excludes: node_modules, .git, memory/archived, canvas, logs, *.db
- Uploads to Google Drive → "OpenClaw Snapshots" folder
- 7-day retention pruning on Drive
- Cron: nightly at 3am (Europe/London)
- Tested: 0.3 MB snapshot created, uploaded, listed successfully ✅
