# Idea

**IDEA:** (auto-generated)
**Title:** Review stale ticket OC-0005 - inconsistent status and no activity
**Status:** Pending Review
**Priority:** Medium
**Source:** Cron

## Summary
Ticket OC-0005 (ARR stack Docker health auto-restart) is in the in-progress folder but shows status "New" in the ticket header. The activity log only contains the initial creation entry from 17:49 (2+ hours ago) with no evidence of active work. This is inconsistent with the status rules which require that:
- Tickets in the in-progress folder should have status "In Progress"
- In Progress tickets should show active work taking place

## Why It Matters
Keeping tickets with inconsistent status damages board accuracy and makes it hard to track real progress. The status rules require status to reflect reality.

## Suggested Action
Either:
1. Move ticket back to New if work hasn't started, or
2. Update status to In Progress and add activity log entries showing active work

## Ticket Reference
- File: /home/john/.openclaw/workspace/kanban/in-progress/OC-0005-arr-stack-docker-health-auto-restart.md
- Current status in header: New
- Folder location: in-progress/
- Last activity: 2026-03-09 17:49 (creation)
