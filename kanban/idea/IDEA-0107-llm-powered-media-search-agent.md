# Idea
**ID:** IDEA-0107
**Title:** LLM-Powered Natural Language Media Search Agent
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-23 08:00
**Last Updated:** 2026-03-23 08:00

## Summary
Add an AI agent that lets john search his media library using natural language queries like "find me sci-fi movies from the 90s" or "what action movies did Tom Cruise star in?" The agent queries Plex API and returns matching results via WhatsApp or dashboard.

## Why It Matters
Scrolling through Plex library to find specific content is time-consuming. An LLM-powered search would let john quickly find media using conversational queries, leveraging existing metadata without manual tagging.

## Suggested Outcome
- Integrate with existing Ollama or OpenAI API
- Create a WhatsApp bot interface (or dashboard input) that accepts search queries
- Query Plex library metadata (or json exported from Plex) to find matching media
- Return results with title, year, and streaming availability

## Suggested Acceptance Criteria
- [ ] Responds to natural language queries via WhatsApp or dashboard
- [ ] Returns relevant results from Plex library for 80%+ of queries
- [ ] Handles edge cases: no results found, ambiguous queries
- [ ] Response time under 10 seconds

## Context
- Plex API: http://192.168.1.146:32400
- Notification: WhatsApp via arr-webhook-notifier (port 9001)
- LLM options: Ollama (already referenced in OC-0014), or cloud API
- Dashboard: http://192.168.1.146:5000

## Suggested Next Step
Test Plex API with basic search queries to understand available metadata, then design prompt for LLM.

## Approval Decision
Pending Review

## Notes
Idea created by Cron on 2026-03-23 08:00