# Idea
**ID:** IDEA-0164
**Title:** ARR container config drift detector
**Status:** Accepted
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-04-11 04:42
**Last Updated:** 2026-04-11 04:55

## Summary
Docker Compose files get updated but containers keep running with old env vars. Build a nightly cron that reads docker-compose.yml, compares current container env vars against the file, and alerts via WhatsApp if any container is out of sync with its compose definition.

## Why It Might Matter
Config drift silently breaks automation. John updates PUID/PGID or port mappings, but containers only restart on manual docker compose up. Catching drift automatically prevents mysterious failures days later.

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
Accepted on 2026-04-11 04:55 and converted to ticket OC-0050.

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea accepted and converted into live ticket OC-0050.
