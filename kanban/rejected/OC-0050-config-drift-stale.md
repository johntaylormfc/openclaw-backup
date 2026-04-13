# Idea
**ID:** (new — author on review)
**Title:** OC-0050 stale — ARR config drift detector never progressed
**Ticket:** OC-0050
**Status:** Review
**Priority:** Medium
**Author:** review-stale-tickets cron
**Created:** 2026-04-12 08:04

## Problem
OC-0050 was auto-picked up at 07:04 on 2026-04-11 and has had zero activity since. The ticket describes a clear ops need: nightly compare of live container env vars against docker-compose.yml with WhatsApp alert on drift.

## Why this needs attention
Config drift is a silent killer — PUID/PGID changes, port remappings, env var updates applied to compose but not picked up until random failures. A nightly check is cheap to run and directly actionable.

## Suggested next steps
1. Assign owner
2. Analyse: identify all ARR container compose files and the env vars to compare
3. Prepare: choose a drift-detection approach (docker inspect vs env diff script)
4. Implement as a nightly cron with WhatsApp alert on mismatch

## Urgency
Medium — ops reliability improvement. Worth prioritising before a silent config drift causes a real outage.
