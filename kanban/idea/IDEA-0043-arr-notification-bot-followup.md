# Idea
**ID:** IDEA-0043
**Title:** Follow up: ARR notification bot - need user input to unblock
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-10
**Last Updated:** 2026-03-10

## Summary
Ticket OC-0006 (ARR download notification bot) is blocked awaiting john's input on notification method. This idea serves as a reminder to get the required information to proceed.

## Why It Matters
The notification bot is a useful automation that would alert john when downloads complete. It's currently stalled until we get clarification on implementation approach.

## Suggested Outcome
John responds to unblock the ticket with his preferences on:
- Notification channel (Telegram vs WhatsApp)
- Events to notify on
- Webhook endpoint approach

## Suggested Acceptance Criteria
- [ ] John provides notification method preference
- [ ] John confirms which events to notify on
- [ ] John decides on webhook endpoint approach
- [ ] Ticket OC-0006 is moved back to In Progress

## Context
**Blocked Ticket:** OC-0006
**Blocker:** Awaiting input on notification method

**Two Options Identified:**
- Option A: Telegram Bot (simpler - just needs bot token from @BotFather)
- Option B: WhatsApp (uses existing OpenClaw WhatsApp integration)

**ARR Apps:** Sonarr (8989), Radarr (7878), Readarr (8787) - all support webhooks

## Suggested Next Step
John should respond to the existing ticket blocker with his preference, or accept this idea to trigger a reminder ping.

## Approval Decision
Pending

## Rejection Reason
Leave blank unless rejected.

## Notes
Created by cron job checking blocked tickets on 2026-03-10.
