# Idea

**ID:** IDEA-0113  
**Ticket:** OC-0032  
**Title:** OC-0032 stalled — implement or close ARR log monitor cron  
**Status:** Idea  
**Priority:** Medium  
**Author:** Arnold 🦞 (stale review cron)  
**Created:** 2026-03-27 09:05  

## Problem
OC-0032 (OpenClaw ARR Log Monitor Alert Cron) has been in-progress since 2026-03-26 09:25 with scope confirmed (hourly, errors only, once/day per error type) but no implementation. Multiple auto-pickup cron runs have occurred without delivering the log scanning script or WhatsApp alert configuration.

## Why This Needs Attention
- Container crashes and API errors in ARR services are currently silent failures
- The scoped solution (errors only, gentle once/day nag) is well-thought-out and non-spammy
- Stale status suggests either blockers exist or the auto-pickup cron isn't the right mechanism for this task

## Suggested Actions
1. Implement the log scanning script now (this session) — scope is clear, no ambiguity
2. If blockers exist (e.g. can't read logs from containers, WhatsApp API issues), move to Blocked with specific reasons
3. If the work was done but ticket not updated, close it
4. Consider whether this belongs as a cron job or a skill (SKILL.md) that wraps Docker log reading

## Source Ticket
OC-0032 — OpenClaw ARR Log Monitor Alert Cron
