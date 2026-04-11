# Idea
**ID:** IDEA-0162
**Title:** VPN-aware rolling restart orchestrator for ARR stack
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-04-11 04:42
**Last Updated:** 2026-04-11 04:55

## Summary
When gluetun VPN restarts (e.g. reconnect), transmission and threadfin lose connectivity. Create a startup-order orchestrator that watches gluetun health and triggers graceful restart of VPN-dependent containers in the correct order (gluetun → threadfin → transmission → sonarr/radarr/bazarr).

## Why It Might Matter
VPN reconnections currently leave dependent containers in a broken state until manual restart. Automating graceful rolling restarts keeps the stack self-healing without manual intervention.

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
Accepted on 2026-04-11 04:55 and converted to ticket OC-0048.

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea accepted and converted into live ticket OC-0048.
