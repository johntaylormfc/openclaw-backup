# Idea
**ID:** IDEA-0042
**Title:** Decision needed: Cron job dashboard UI scope
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-11 06:04
**Last Updated:** 2026-03-11 06:04

## Summary
Ticket OC-0008 (cron job dashboard UI) is blocked waiting for John to decide on implementation scope: full toggle feature or partial visual status only.

## Why It Might Matter
The backend API for toggling cron jobs is already implemented and tested. Without a scope decision, the frontend work cannot proceed.

## Suggested Outcome
John chooses between full toggle feature or partial (visual status only) and the ticket can progress.

## Suggested Acceptance Criteria
- [ ] John reviews the two options in OC-0008
- [ ] John confirms which scope to implement
- [ ] Ticket OC-0008 moves from Blocked to In Progress

## Context
Blocked ticket: /home/john/.openclaw/workspace/kanban/blocked/OC-0008-openclaw-cron-job-dashboard-ui.md

Options:
1. Full toggle - add frontend toggle UI + backend (connects to existing PUT /api/cronjobs/:id/toggle)
2. Partial - enhanced visual status only (color-coded), skip toggle functionality

Backend API is complete and tested.

## Suggested Next Step
Review OC-0008 and choose option, then move ticket to In Progress.

## Approval Decision
Pending

## Rejection Reason

## Notes
This is a reminder follow-up idea. The ticket cannot progress without user decision on implementation scope.
