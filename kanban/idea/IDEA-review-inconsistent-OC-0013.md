# Idea

**IDEA:** (auto-generated)
**Title:** Review inconsistent ticket: OC-0013 ARR Stack Configuration Backup Automation

**Status:** Under Review
**Priority:** Medium
**Created:** 2026-03-16 23:25

## Why This Idea
**Ticket:** OC-0013 (in /home/john/.openclaw/workspace/kanban/in-progress/)

**Why it looks inconsistent:**
1. **Wrong folder:** Ticket status shows "In Progress" but it's in `kanban/in-progress/` folder. However, it has a blocker asking for scope confirmation from the user.
2. **Blocked but in wrong folder:** According to OpenClaw status rules, tickets that are blocked (waiting for user input, missing scope, etc.) should be in `kanban/blocked/` not `kanban/in-progress/`.
3. **Last updated:** Mar 15 20:30 (yesterday) - has a valid blocker explaining what user needs to confirm

The blocker is well-documented:
- Needs John to confirm which ARR apps need backup
- Needs location for backup storage
- Needs retention policy
- Needs backup frequency

## What Should Be Reviewed
- Move this ticket from `kanban/in-progress/` to `kanban/blocked/` to match its blocked status
- The blocking reason is valid - user input is required before work can continue
- Verify the scope questions are still accurate

## Source
Created by cron job: Review stale in-progress tickets (f2d98fc1-9e29-459c-85e5-ff8f574c21e2)
