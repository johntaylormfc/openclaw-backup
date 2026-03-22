# Idea Review

**ID:** IDEA-REVIEW-041f9567fcf5d812a45580cfcbfbc863
**Source:** Cron — Create ideas from blocked tickets
**Created:** 2026-03-22T10:05:00+00:00

## Summary
The Daily Review & Learning cron (11 PM daily) is missing certain weekday memory captures — specifically March 16 (Friday), March 20 (Friday), and March 21 (Saturday) are all missing. The investigation found the weekend memory capture cron correctly handles Saturdays and Sundays, but the weekday daily cron has gaps.

## Why This Matters
Memory gaps break continuity of the daily review system. If Arnold can't reference recent days reliably, context is lost and quality of responses degrades.

## Suggested Priority
Medium

## What John Needs To Decide
1. Should the 11 PM daily cron be capturing Fridays specifically (it currently should, but isn't)?
2. Or is there a known reason the daily cron misses some weekdays (e.g., cron not firing, file write failures, permission issue)?
3. Or should the weekend cron be extended to include Fridays as a safety net?

## Next Step
John to investigate why the 11 PM Daily Review & Learning cron is missing certain days, or confirm a manual fix is acceptable.
