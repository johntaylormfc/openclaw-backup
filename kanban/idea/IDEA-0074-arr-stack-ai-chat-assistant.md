# Idea
**ID:** IDEA-0074
**Title:** ARR Stack AI Chat Assistant
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-16

## Summary
A local AI chatbot that can answer questions about the ARR stack status, recent downloads, media library stats, container health, and more via a simple chat interface.

## Why It Might Matter
Currently checking stack status requires logging into multiple UIs or running docker commands. An AI assistant could provide instant answers to questions like "What did I download this week?" or "Are all containers healthy?" making the stack more accessible and easier to manage.

## Suggested Outcome
A chat interface (web or CLI) powered by a local LLM that can query the ARR stack APIs and docker socket to provide intelligent responses.

## Suggested Acceptance Criteria
- [ ] Chat interface can respond to status queries
- [ ] Can list recent downloads across Radarr/Sonarr
- [ ] Can report container health status
- [ ] Can provide media library statistics
- [ ] Runs locally without external API calls

## Context
Could use Ollama with a lightweight model, or integrate with existing MCP servers. Would need read-only access to Arr APIs and docker socket.

## Suggested Next Step
Prototype with Ollama + basic query endpoints

## Approval Decision
Pending

## Rejection Reason

## Notes
