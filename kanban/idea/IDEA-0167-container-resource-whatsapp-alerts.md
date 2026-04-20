# Idea
**ID:** IDEA-0167
**Title:** Container resource usage WhatsApp alerts
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-04-20
**Last Updated:** 2026-04-20

## Summary
Run a periodic check (every 15 min) that reads container CPU/memory usage via docker stats --format json. Alert via WhatsApp if any container exceeds CPU 80% or memory 90% for more than 3 consecutive checks.

## Why It Might Matter
High resource usage causes containers to become unresponsive (especially Bazarr with large libraries). Early alerts give time to restart or tune before the stack falls over. Uses existing WhatsApp integration.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket