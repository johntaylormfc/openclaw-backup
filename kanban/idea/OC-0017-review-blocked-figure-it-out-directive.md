# Idea
**ID:** IDEA-####
**Title:** Resolve blocked ticket OC-0017 — clarify or retire "Figure It Out" directive
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-19 06:01
**Last Updated:** 2026-03-19 06:01

## Summary
Ticket OC-0017 has been blocked since 2026-03-19 because it lacks any technical scope. It references a YouTube video but never defines what "Figure It Out" actually means, where it should live, or what specific behavior changes are expected. This idea proposes that John either clarifies the scope now or formally rejects/deprioritises the ticket so it stops appearing as a blocker.

## Why It Might Matter
Blocked tickets represent incomplete work that is stuck waiting on something. OC-0017 has been stuck for 2 days (at time of writing) with no resolution. Either it needs a clear answer from John to unblock, or it should be closed so the kanban reflects realistic priorities.

## Suggested Outcome
Either:
- John provides a 1–2 sentence definition of what "Figure It Out" should do and where it lives, after which Arnold can proceed with implementation, OR
- John rejects/declines the idea, ticket is moved to rejected with reason

## Suggested Acceptance Criteria
- [ ] John has responded with scope clarification OR has formally rejected the idea
- [ ] If accepted: ticket OC-0017 is moved back to In Progress with a defined scope
- [ ] If rejected: ticket OC-0017 is moved to kanban/rejected/ with a rejection reason

## Context
- Blocked ticket: `kanban/blocked/OC-0017-implement-figure-it-out-autonomous-directive-for-agents.md`
- Source idea: `IDEA-0046`
- Blocked since: 2026-03-19 02:00
- Key unanswered questions (from the blocker log):
  1. What should "Figure It Out" do differently when an agent hits an unknown task?
  2. Should this be a system prompt addition, a config flag, a workspace directive, or a new skill?
  3. Is this tied to a specific YouTube video that could be linked for reference?

## Suggested Next Step
John reviews OC-0017's blocker log and answers the 4 questions listed there. A single message with brief answers would be enough to unblock.

## Approval Decision
Pending

## Rejection Reason

## Notes
Cron job `e73b9bf1-e442-4006-a511-3ec322e9d1c5` runs daily at 06:00. This idea will be regenerated if the ticket remains blocked.
