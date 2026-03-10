# Ticket
**ID:** OC-0006
**Title:** ARR download notification bot
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** 2026-03-09 17:50
**Last Updated:** 2026-03-09 23:31

## Goal
Create a WhatsApp/Telegram bot that sends real-time notifications when Sonarr/Radarr/Lidarr complete downloads, import media, or encounter errors. Use webhook integration from ARR apps.

## Why
Currently john checks the dashboard manually for download status. Push notifications would provide immediate awareness of completed downloads or issues.

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all genuinely finished

## Context
- Source Idea: IDEA-0016
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [x] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** 2026-03-09 17:50  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea IDEA-0016  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

- **Timestamp:** 2026-03-09 23:31  
  **Action:** Analysis & scope review  
  **Result:** Ticket moved to In Progress, then Blocked  
  **Why:** This is a significant development task requiring architectural decisions  
  **Evidence:** Reviewed ARR stack (Sonarr, Radarr, Readarr) - all support webhooks  
  **Next Step:** Need input on notification method before proceeding

## Current Position
Analyzed the ARR stack. Sonarr, Radarr, and Readarr all support webhook notifications. Need confirmation on implementation approach.

## Blocker

*Resolved - John confirmed WhatsApp via WhatsApp on 2026-03-10*

### Resolution
- **Notification Method:** WhatsApp (via OpenClaw)
- **Events:** All (download complete, import, grab, errors)
- **Integration:** Existing arr-dashboard service

### Next Step
Implement the webhook receiver and WhatsApp notification flow

- **Timestamp:** 2026-03-10 03:47  
  **Action:** Unblocked - John confirmed WhatsApp  
  **Result:** Ticket moved to In Progress  
  **Why:** John replied "Via whatsapp please" confirming notification method  
  **Evidence:** WhatsApp message from +447967688452  
  **Next Step:** Implement webhook receiver for ARR apps → send notifications via OpenClaw WhatsApp
