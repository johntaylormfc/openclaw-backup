# Idea
**ID:** IDEA-0109
**Title:** ARR Webhook → OpenClaw Agent Bridge
**Status:** Idea
**Suggested Priority:** High
**Source:** Web research
**Created:** 2026-03-23 19:11
**Last Updated:** 2026-03-23 19:11

## Summary
Use OpenClaw's built-in /hooks/agent webhook endpoint to receive events from Prowlarr/Radarr/Sonarr (downloads, imports, upgrades) and trigger OpenClaw agent turns that automatically rescan Plex/Jellyfin libraries, send WhatsApp notifications, or log activity — turning the ARR stack into a reactive, conversational system.

## Why It Might Matter
OpenClaw already has a first-class webhook ingress system at /hooks/agent. Wiring this to ARR events (via custom scripts in Sonarr/Radarr/Prowlarr) creates a powerful event-driven automation layer without any extra infrastructure.

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
Pending

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea created automatically from a plain-English request.
