# Idea
**ID:** IDEA-0110
**Title:** OpenClaw ARR Log Monitor + Alert Cron
**Status:** Rejected
**Suggested Priority:** High
**Source:** Web research
**Created:** 2026-03-23 19:12
**Last Updated:** 2026-03-30 19:16

## Summary
Use OpenClaw's native cron scheduler with the exec tool to periodically scan Docker container logs for errors and warnings across the ARR stack (Sonarr, Radarr, Prowlarr, Bazarr, SABnzbd, qBittorrent, Transmission) and send WhatsApp alerts when issues are detected — including failed downloads, API timeouts, and disk space warnings.

## Why It Might Matter
Container crashes or API errors in ARR services are silent until the user notices missing downloads. An OpenClaw cron job with the exec tool can catch these early and push alerts directly to WhatsApp with actionable context.

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket
- [ ] Why this work matters is understood
- [ ] Suggested next step is recorded

## Context
- Environment: /home/john/.openclaw/workspace
- Source: Web research

## Suggested Next Step
Review the idea and either accept it into a live ticket or reject it with a reason.

## Approval Decision
Rejected on 2026-03-30 19:16.

## Rejection Reason
Duplicate — already has ticket (see complete/ or done/)

## Notes
Idea rejected on 2026-03-30 19:16. Reason: Duplicate — already has ticket (see complete/ or done/)
