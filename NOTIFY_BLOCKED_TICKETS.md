# NOTIFY_BLOCKED_TICKETS.md

## Purpose
Check for blocked tickets in the kanban and notify john of any blockers.

## Process
1. List files in: /home/john/.openclaw/workspace/kanban/blocked/
2. For each blocked ticket, read the blocker reason
3. If there are blocked tickets, send WhatsApp to +447967688452 with summary
4. If no blocked tickets, do nothing

## Notes
- This file is read by cron job "Notify blocked tickets"
- Runs every 3 hours
