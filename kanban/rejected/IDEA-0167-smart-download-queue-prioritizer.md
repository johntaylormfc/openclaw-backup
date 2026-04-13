# Idea
**ID:** IDEA-0167
**Title:** Smart download queue prioritizer
**Status:** Rejected
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-04-13 08:00

## Summary
Build a script that analyzes Sonarr/Radarr queues and prioritizes downloads based on library gaps. If a requested movie is part of a series where missing episodes exist, boost its priority. Also factor in: file age in queue, quality profile match, and storage headroom to ensure downloads complete before storage fills.

## Why It Matters
Downloads currently process FIFO. Smart prioritization ensures the most valuable content (library-filling items) get bandwidth first, and prevents failed downloads due to storage limits mid-queue.

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

## Rejection Reason
Rejected by Arnold on 2026-04-13
