# Idea
**ID:** IDEA-0054
**Title:** Todoist + OpenClaw — Agent-Driven Task Creation
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** awesome-openclaw-usecases-zh (AlexAnys)
**Created:** 2026-03-25
**Last Updated:** 2026-03-25 20:45

## Summary
OpenClaw creates, updates, and closes Todoist tasks autonomously — based on what's happening in the ARR stack, cron job outcomes, health checks, and project state. No manual task entry required.

## Why It Matters
John already has Todoist connected. This extends it so the agent proactively creates tasks from events — "Docker healthcheck failed 3 times → create Todoist task", "Download queue stalled → create follow-up task", "New idea accepted → create OC ticket".

## What You'd Need
- Event → task mapping rules
- Todoist API integration (already configured)
- Skill that translates stack events into task creation

## Outcome
- [ ] Map key ARR events to task creation rules
- [ ] Build skill for event-driven Todoist tasks
- [ ] Test on real events (failed downloads, container restarts, etc.)

## Approval Decision
Accepted on 2026-03-25 20:45 and converted to ticket OC-0038.
