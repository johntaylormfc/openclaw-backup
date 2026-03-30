# Idea
**ID:** IDEA-0161
**Title:** Ollama AI Media Auto-Tagger Agent
**Status:** Rejected
**Suggested Priority:** Low
**Source:** Weekly Idea Dump (Cron)
**Created:** 2026-03-30

## Summary
An OpenClaw agent that runs after new media is imported into Plex. It uses a local Ollama LLM to read media metadata (filename, file size, detected tags) and auto-suggests or applies richer tags, descriptions, and genre labels in Radarr/Sonarr — without relying on external services.

## Why It Might Matter
John already has Ollama running (per OC-0014 in rejected ideas). Extending it to auto-tag new ARR imports means better-organized libraries with minimal manual curation. Particularly useful for obscure media where Prowlarr's existing metadata is thin.

## Suggested Outcome
- [ ] Check current Ollama setup scope (OC-0014 is stalled — needs decisions)
- [ ] Design trigger: post-import webhook from Radarr/Sonarr
- [ ] Accept and scope, or reject
