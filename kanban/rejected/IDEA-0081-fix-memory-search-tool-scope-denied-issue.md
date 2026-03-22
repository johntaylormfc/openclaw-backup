# Idea
**ID:** IDEA-0081
**Title:** Fix memory_search tool scope denied issue
**Status:** Rejected
**Suggested Priority:** High
**Source:** Daily Review
**Created:** 2026-03-18 23:02
**Last Updated:** 2026-03-22 16:53

## Summary
OpenClaw memory_search tool returns scope denied in session context. QMD backend works but the tool itself blocks semantic search requests.

## Why It Might Matter
Without fix, semantic memory search is unusable even with QMD fallback configured.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket
- [ ] Why this work matters is understood
- [ ] Suggested next step is recorded

## Context
- Environment: /home/john/.openclaw/workspace
- Source: Daily Review

## Suggested Next Step
Review the idea and either accept it into a live ticket or reject it with a reason.

## Approval Decision
Rejected on 2026-03-22 16:53.

## Rejection Reason
Vector memory is disabled and daily memory system covers recall needs

## Notes
Idea rejected on 2026-03-22 16:53. Reason: Vector memory is disabled and daily memory system covers recall needs
