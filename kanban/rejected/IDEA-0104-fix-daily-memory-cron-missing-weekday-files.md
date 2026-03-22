# Idea: Fix Daily Memory Cron Missing Weekday Files

**ID:** IDEA-0104
**Title:** Fix Daily Memory Cron — Missing March 16, 20, 21 Files
**Status:** Rejected
**Priority:** medium
**Source:** Cron

## Summary
The "Daily Review & Learning" cron (11 PM daily) is missing certain weekday files — specifically March 16, 20, and 21 are absent from ~/.openclaw/workspace/memory/. Meanwhile the "Weekend Memory Capture" cron correctly fires on Saturdays and Sundays. The gap is weekdays, not weekends.

## Why It Matters
Memory files are the agent's continuity layer. Missing days mean gaps in context for future troubleshooting, decision review, and learning. If the cron is silently failing on weekdays, this will compound over time.

## What Needs Deciding
1. **Extend Weekend Memory Capture to include Fridays** — change cron from `0,6` (Sat/Sun) to `1-6` (Mon–Sat)? Covers Mon–Fri at 10 AM.
2. **Debug the Daily Review & Learning cron** — find out why it's skipping days (could be a cron delivery issue, gateway downtime, or the agent not completing the turn).
3. **Manual fill** — create 2026-03-16.md manually now and confirm which cron John wants to own daily capture going forward.

## Suggested Next Step
Ask John which approach he prefers, then implement the cron adjustment or document the fix.
