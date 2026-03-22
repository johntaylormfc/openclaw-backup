# Idea

**ID:** IDEA-0085
**Title:** [STALE REVIEW] OC-0011 — Restore Points snapshot system blocked 2+ days on scope
**Status:** Rejected
**Created:** 2026-03-19 04:03
**Source:** Automated stale review (cron)

## Why This Needs Attention

OC-0011 (OpenClaw Restore Points / Snapshot System) has been **blocked for ~2 days** waiting on John to answer 6 scope questions about what to back up, when, where, and how.

### What's Done
- Ticket moved to in-progress on 2026-03-18 17:00

### What's Blocking
The blocker section lists 6 open questions John must answer:
1. What to backup (workspace files, skills, OpenClaw config, Docker state, dashboard?)
2. When it triggers (manual, cron, or both?)
3. Where snapshots are stored (local path — specify)
4. Retention (keep all, or last N?)
5. Restore mechanism (overwrite, named restore points, or both?)
6. Format (tar/zip, or timestamped directories?)

### Options
1. **Answer the 6 questions** — reply to this idea or the ticket directly with your decisions
2. **Defer** — move ticket to blocked with a note on when you'll answer
3. **Abandon** — if you no longer want this feature, close the ticket

### What to Decide
Does this still matter to you? If yes, answer the scope questions in the ticket. If no, close it out.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-19
