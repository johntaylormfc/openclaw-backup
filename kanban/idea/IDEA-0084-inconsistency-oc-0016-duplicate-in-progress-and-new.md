# Idea

**ID:** IDEA-0084
**Title:** [INCONSISTENCY] OC-0016 — ticket duplicated across in-progress AND new folders
**Status:** pending-review
**Created:** 2026-03-19 00:03
**Source:** Automated stale/inconsistency review

## What the Problem Is

OC-0016 exists in **two places simultaneously**:
- `/home/john/.openclaw/workspace/kanban/in-progress/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md`
- `/home/john/.openclaw/workspace/kanban/new/OC-0016-implement-per-task-llm-routing-switch-between-different-mode.md`

The **in-progress copy** has an activity log entry dated 2026-03-18 08:03 that says:
> "Moved to kanban/new/ — ticket was never actually picked up"

But the file was never actually removed from `in-progress/`. The `new/` copy does NOT have that activity log entry.

### Result
- Two copies, one with extra log entries the other doesn't have
- Status field in both says "New" — consistent but wrong location for in-progress
- This is a copy/move accident from the previous stale review

## Options

1. **Keep new/, delete in-progress/** — ticket was correctly identified as never picked up; clean copy is in new/
2. **Keep in-progress/, delete new/** — agent may have been about to pick it up
3. **Investigate further** — check session logs to see what actually happened

## What to Decide
Which copy is authoritative? Or just pick one and delete the other.

**Reviewer:** john
**Review Date:** 2026-03-19
