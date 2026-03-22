# Idea
**ID:** IDEA-0089
**Title:** [UNRESOLVED] OC-0016 — still exists in BOTH in-progress AND new folders (4 days)
**Status:** Rejected
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-19 08:03
**Last Updated:** 2026-03-22 04:02

## Summary
OC-0016 appears in two places simultaneously — `/kanban/in-progress/` and `/kanban/new/` — creating an inconsistency that was flagged 4 days ago (IDEA-0084, created 2026-03-19 00:03) but never resolved. The in-progress copy has activity log entries dated 2026-03-19 01:00 UTC claiming the ticket was picked up, but the filesystem mtime is still 2026-03-11 22:51 — suggesting the activity log may have been edited in place without actually moving or acting on the ticket.

## Why It Might Matter
Duplicate tickets cause confusion about which is authoritative, waste agent time, and create false impressions of progress. The ticket has also been blocked since it was created (2026-03-11) with no meaningful implementation work done.

## Suggested Outcome
John picks one copy as authoritative and deletes the other. Additionally, answer the 3 scope questions in the blocker so the ticket can actually be worked on or formally closed.

## Suggested Acceptance Criteria
- [ ] One OC-0016 copy deleted (keep in-progress OR keep in new, delete the other)
- [ ] Scope questions answered OR ticket formally rejected/closed

## Context
- Ticket: `kanban/in-progress/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md`
- Also at: `kanban/new/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md`
- Previous idea: IDEA-0084 (pending-review, not acted on)
- Last meaningful activity: 2026-03-11 22:51 (ticket creation) — 8 days ago
- Scope blocker: 3 questions unanswered (which providers, routing triggers, cost prefs)

## Suggested Next Step
1. Decide: keep which copy? (new/ or in-progress/)
2. Answer the 3 scope questions from the blocker section:
   - Which LLM providers to add?
   - What routing triggers (per-agent, per-tag, automatic, manual)?
   - Cost/complexity preferences?

## Approval Decision
Rejected on 2026-03-22 04:02.

## Rejection Reason
Duplicate - superseded by IDEA-0099

## Notes
Idea rejected on 2026-03-22 04:02. Reason: Duplicate - superseded by IDEA-0099
