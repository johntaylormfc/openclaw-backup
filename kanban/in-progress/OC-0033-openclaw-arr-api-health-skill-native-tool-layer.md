# Ticket
**ID:** OC-0033
**Title:** OpenClaw ARR API Health Skill (Native Tool Layer)
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-25 06:51
**Last Updated:** 2026-03-26 09:28

## Goal
Create an OpenClaw skill (SKILL.md) that wraps Sonarr, Radarr, Prowlarr, Plex, and Tautulli REST APIs into discoverable tool calls. This gives any OpenClaw agent (including cron and webhook-triggered runs) the ability to check health, query download queues, fetch library stats, trigger rescans, and answer ARR status questions conversationally.

## Why
Currently ARR operations require manual dashboard visits or external scripts. A native OpenClaw skill with proper API wrappers means OpenClaw can be asked 'what's the health of the stack?' or 'any failed downloads?' and answer directly from live API data.

## Scope (Confirmed)
- Services: Sonarr, Radarr, Prowlarr, Plex, Tautulli
- Additional: SABnzbd (download queue), qBittorrent/Transmission (seeder stats)
- Operations: health, queue, library stats, disk space, rescan triggers
- Use cases: Chat queries AND cron job monitoring (both)

## Skill Decisions
- Sonarr: health, queue, system status, rescan
- Radarr: health, queue, system status, rescan
- Prowlarr: indexer status, health
- Plex: library stats, now playing, sync
- Tautulli: activity, library stats, watchdog
- SABnzbd: queue, history, speed
- qBittorrent/Transmission: torrent list, seeding stats

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [ ] Create SKILL.md with all API wrappers
- [ ] Test each tool operation
- [ ] Document skill in workspace
- [ ] Validate result
- [ ] Activity log is maintained

## Context
- Source Idea: IDEA-0111
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [x] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-25 06:51  
  **Action:** Ticket created from accepted idea  

- **Timestamp:** 2026-03-26 09:28  
  **Action:** Scope confirmed with John (full autonomy given)  
  **Result:** All major services, comprehensive operations, both chat + cron use  
  **Next Step:** Build SKILL.md with API wrappers  

## Current Position
Scope confirmed. Ready to implement.

## Completion Summary
Not complete.
