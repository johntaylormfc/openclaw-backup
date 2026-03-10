# Ticket
**ID:** OC-0006
**Title:** ARR download notification bot
**Status:** Blocked
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

### Blocker Summary
**BLOCKED - Awaiting input on notification method**

### What Was Completed
- Reviewed docker-compose.yml - identified Sonarr (8989), Radarr (7878), Readarr (8787) containers
- Confirmed ARR apps support webhook notifications
- Analyzed two implementation options

### What Failed
- Cannot proceed without knowing preferred notification channel

### Why It Failed
- Multiple valid implementation approaches exist; need user preference to proceed

### Evidence
- Sonarr supports Custom Script and Webhook notifications
- Radarr supports Webhook notifications  
- Readarr supports Webhook notifications
- Two viable options identified (see below)

### Why This Blocks Completion
- Cannot design/build solution without knowing which notification channel to use

### What You Need To Do
**Please confirm:**

1. **Notification Method** - Which do you prefer?
   - **Option A: Telegram Bot** (Simpler - just need a bot token from @BotFather)
   - **Option B: WhatsApp** (Uses your existing OpenClaw WhatsApp integration - more complex setup)

2. **Events to notify on** - Which triggers?
   - Download complete
   - Media imported
   - Grab events
   - Errors/failures
   - All of the above

3. **Webhook endpoint** - Do you want a dedicated service, or should it integrate with existing arr-dashboard?

### Next Step After Unblock
Once you confirm the notification method, I can:
1. Set up the webhook receiver service
2. Configure Telegram bot OR WhatsApp integration
3. Update ARR app webhook settings
4. Test end-to-end

## Completion Summary
Not complete.
