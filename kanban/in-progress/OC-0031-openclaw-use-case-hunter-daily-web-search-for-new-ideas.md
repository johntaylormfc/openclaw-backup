# Ticket
**ID:** OC-0031
**Title:** OpenClaw Use Case Hunter — Daily Web Search for New Ideas
**Status:** In Progress
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Arnold 🦞
**Created:** 2026-03-25 06:48
**Last Updated:** 2026-03-25

## Goal
Daily cron job that searches the web for interesting OpenClaw setups, skills, and automations from other users. Creates kanban ideas from noteworthy findings and reports to WhatsApp.

## Why
Keeps the idea pipeline fresh with external learnings. Could surface useful automations or workflows that would otherwise be missed.

## Scope (Locked)
- **Sources:** ClawHub, Reddit (r/OpenClaw), GitHub, Discord, general web
- **Query:** OpenClaw use cases, skills, automations
- **Results per run:** Top 3 most interesting
- **Frequency:** Daily (once a day)
- **Output:** New ideas → kanban/idea; digest → WhatsApp
- **Noteworthy criteria:** Anything new that we don't currently do

## Acceptance Criteria
- [x] Scope confirmed (see above)
- [ ] Daily cron job created and enabled
- [ ] Script searches all 5 sources
- [ ] Top 3 ideas written to kanban/idea per run
- [ ] Daily WhatsApp digest sent with new idea titles
- [ ] Ticket closed after 1 successful run confirmed

## Activity Log
### Entries
- **2026-03-25 06:48** — Ticket created from accepted idea IDEA-0108
- **2026-03-25** — Scope locked: all sources, top 3, daily, noteworthy = new ideas we don't do

## Script Location
/home/john/.openclaw/workspace/scripts/use-case-hunter.sh

## Cron
Daily at 09:00 UTC — isolated agentTurn session
