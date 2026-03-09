# Idea
**ID:** IDEA-0017
**Title:** OpenClaw plugin auto-reload on failure
**Status:** Accepted
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-09 17:27
**Last Updated:** 2026-03-09 17:50

## Summary
Implement automatic plugin reload/recovery when a plugin fails to load (like the WhatsApp createPluginRuntimeStore error). The gateway should attempt recovery after transient failures rather than staying in error state.

## Why It Might Matter
Plugins can fail to load (as seen with WhatsApp error). Auto-recovery would improve reliability without manual intervention.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket
- [ ] Why this work matters is understood
- [ ] Suggested next step is recorded

## Context
- Environment: /home/john/.openclaw/workspace
- Source: Cron

## Suggested Next Step
Review the idea and either accept it into a live ticket or reject it with a reason.

## Approval Decision
Accepted on 2026-03-09 17:50 and converted to ticket OC-0007.

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea accepted and converted into live ticket OC-0007.
