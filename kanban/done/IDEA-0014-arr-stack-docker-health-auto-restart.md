# Idea
**ID:** IDEA-0014
**Title:** ARR stack Docker health auto-restart
**Status:** Accepted
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-09 17:22
**Last Updated:** 2026-03-09 17:49

## Summary
Implement automatic container health monitoring that restarts unhealthy Sonarr/Radarr/Lidarr containers. Use docker health checks + a lightweight watcher script to detect unhealthy state and restart before manual intervention.

## Why It Might Matter
ARR containers can become unhealthy (stuck downloads, API timeouts) but don't auto-recover. This would reduce manual intervention and downtime.

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
Accepted on 2026-03-09 17:49 and converted to ticket OC-0005.

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea accepted and converted into live ticket OC-0005.
