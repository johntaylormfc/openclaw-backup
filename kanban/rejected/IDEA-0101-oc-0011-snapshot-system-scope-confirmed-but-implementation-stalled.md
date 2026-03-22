# Idea

**ID:** IDEA-0101
**Title:** OC-0011 — Snapshot system: scope confirmed 8h ago, no implementation started
**Status:** Rejected
**Source:** Cron stale review (2026-03-20 04:03 UTC)
**Created:** 2026-03-20 04:03

## Why This Needs Attention

OC-0011 (OpenClaw Restore Points / Snapshot System) scope was confirmed by John on **2026-03-19 19:53** — answering "everything, nightly cron, Google Drive, 7-day retention, overwrite on restore, tar.gz". The ticket activity log shows:
- Last entry (19:53): "Scope confirmed by John via WhatsApp"
- **Next Step recorded:** "Implement snapshot script"
- **No further activity logged.**

It is now ~8 hours later and nothing has been done on the implementation.

## What's Done
- ✅ Scope confirmed (all 6 questions answered)
- ✅ Ticket moved to in-progress
- ✅ Activity log entry made

## What's Not Done
- ❌ Snapshot script not written
- ❌ Restore script not written
- ❌ Google Drive upload not configured
- ❌ 7-day retention pruning not configured
- ❌ Cron job not set up

## Why It Might Be Stalled
- Night hours (john may be asleep — UK time 04:03)
- Agent may have moved on to other tasks
- No explicit handoff or follow-up scheduled

## Options
1. **Continue now** — if an agent is available, start implementing the snapshot script
2. **Schedule follow-up** — set a reminder/cron to revisit in a few hours
3. **Split the work** — break into smaller tickets (snapshot script, restore script, Google Drive auth, cron setup)
4. **Defer** — if John wants to review the approach before scripting begins

## Suggested Next Step
Pick up OC-0011 and start the snapshot script. The scope is confirmed and the next action is clear.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-20
