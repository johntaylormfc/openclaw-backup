# Idea
**ID:** IDEA-0090
**Title:** OC-0018 — ticket says "New" but lives in in-progress/ folder (inconsistent)
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron stale review
**Created:** 2026-03-19 16:05

## Summary
The file `kanban/in-progress/OC-0018-openclaw-skill-marketplace-integration.md` has `Status: New` in its own header, yet it sits in the `in-progress/` folder. A separate `OC-0018_BLOCKED.md` file in the same folder documents scope questions that need answering, but the actual ticket file was never updated to reflect "blocked" status or the scope decisions.

This creates a confusing state:
- Folder says "in-progress"
- Ticket status field says "New"
- A separate blocker doc exists but isn't linked from the ticket

## Why It Might Matter
- Agent picking up OC-0018 will see "Status: New" and may not realise it's blocked/awaiting scope
- The blocker questions in OC-0018_BLOCKED.md have been unanswered for ~16 hours
- Confusion about whether work has actually started

## Suggested Outcome
Either:
- (A) Move ticket back to `kanban/new/` — it was never genuinely picked up, or
- (B) Update the ticket's status field to "blocked" and merge/remove the separate blocker doc

## Suggested Acceptance Criteria
- [ ] Ticket status field matches its folder location, OR
- [ ] Ticket is moved to correct folder to match its status

## Context
- Ticket: `kanban/in-progress/OC-0018-openclaw-skill-marketplace-integration.md`
- Blocker doc: `kanban/in-progress/OC-0018_BLOCKED.md`
- Ticket status field: `New`
- Ticket folder: `in-progress/`
- Ticket last modified: 2026-03-18 22:28 (Mar 18)
- Blocker doc last modified: 2026-03-19 09:04 (Mar 19)
- OC-0011 (restore points) is the only ticket with genuine in-progress activity today

## Suggested Next Step
1. Decide: move OC-0018 back to `kanban/new/` OR update its status to "blocked" and merge the blocker questions inline
2. Delete the separate `OC-0018_BLOCKED.md` file if the blocker content is merged into the ticket

## Approval Decision
Rejected on 2026-03-22 04:02.

## Rejection Reason
Duplicate - superseded by IDEA-0103

## Notes
Idea rejected on 2026-03-22 04:02. Reason: Duplicate - superseded by IDEA-0103
