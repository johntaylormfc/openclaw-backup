# Ticket
**ID:** OC-0030
**Title:** Docker Compose Healthcheck Automation for ARR Containers
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-25 06:47
**Last Updated:** 2026-03-26 09:22

## Goal
Add proper healthcheck configurations to all ARR containers in docker-compose.yml and create a monitoring script that alerts when any container becomes unhealthy, then auto-restarts the unhealthy container.

## Why
ARR containers can stop responding without obvious symptoms. Healthchecks would provide early warning via the dashboard or WhatsApp notification, preventing missed downloads and reducing downtime.

## Scope (Confirmed)
- All containers that support healthchecks in `/home/john/ARR/docker-compose.yml`
- Including but not limited to: Sonarr, Radarr, Prowlarr, SABnzbd, Bazarr, qBittorrent, Transmission, and any other ARR/Dashboard containers running

## Alert Destination
- Both: WhatsApp to +447967688452 AND dashboard status page

## Auto-Restart
- Yes: auto-restart unhealthy containers

## Acceptance Criteria
- [x] Scope is confirmed
- [x] Work is started by moving ticket to In Progress
- [ ] Implement healthcheck configs for all applicable containers
- [ ] Create monitoring script with WhatsApp + dashboard alerts
- [ ] Configure auto-restart on unhealthy
- [ ] Validate result
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: IDEA-0105
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [x] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-25 06:47  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0105  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

- **Timestamp:** 2026-03-25 20:53  
  **Action:** Auto-picked up by cron job  
  **Result:** Ticket moved to In Progress  
  **Evidence:** pick-up-new-tickets cron  

- **Timestamp:** 2026-03-26 09:22  
  **Action:** Scope confirmed with John  
  **Result:** Scope = all containers, WhatsApp + dashboard alerts, auto-restart  
  **Next Step:** Implement healthcheck configs in docker-compose.yml  

## Current Position
Scope confirmed. Ready to implement.

## Completion Summary
Not complete.

---
**Auto-Pickup:** Started at 2026-03-26 10:07 by pick-up-new-tickets cron

---
**Auto-Pickup:** Started at 2026-03-26 13:04 by pick-up-new-tickets cron
