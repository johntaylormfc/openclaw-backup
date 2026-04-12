# Idea
**ID:** (new — author on review)
**Title:** OC-0049 stale — Tautulli WhatsApp morning digest never progressed
**Ticket:** OC-0049
**Status:** Review
**Priority:** Medium
**Author:** review-stale-tickets cron
**Created:** 2026-04-12 08:04

## Problem
OC-0049 was auto-picked up at 06:03 on 2026-04-11 and has had zero activity since. The ticket is well-scoped (Tautulli API → WhatsApp morning digest of yesterday's watched content) and reuses existing infrastructure (tautulli, WhatsApp integration).

## Why this needs attention
This is a low-effort, high-delight feature. All the hard parts (WhatsApp API, tautulli API auth) already exist in the codebase. The incremental work is just the logic to query Tautulli and format the digest.

## Suggested next steps
1. Assign owner
2. Analyse: identify the exact Tautulli API endpoint for watch history (last day)
3. Prepare: map the fields (title, first-play, duration) and WhatsApp message format
4. Implement as a daily cron

## Urgency
Medium-low — quality of life improvement, but genuinely easy to ship given existing integrations.
