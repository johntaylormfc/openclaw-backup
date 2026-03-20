# Idea

**ID:** IDEA-0103
**Title:** OC-0018 — Two files in in-progress folder causing confusion, need merge
**Status:** pending-review
**Source:** Cron stale review (2026-03-20 08:05 UTC)
**Created:** 2026-03-20 08:05

## Why This Needs Attention

Two files exist for OC-0018 in the same folder:

1. `OC-0018-openclaw-skill-marketplace-integration.md`
   - Status: `New`
   - Owner: `Unassigned`
   - Last Updated: 2026-03-18 22:28

2. `OC-0018_BLOCKED.md`
   - Status: `blocked` (inline, not in header)
   - Contains scope questions for John
   - Last Updated: 2026-03-19 09:04

## What's Wrong

- The actual ticket (`OC-0018-openclaw-skill-marketplace-integration.md`) was never updated after being picked up
- The blocker content is in a separate file instead of inline in the ticket
- John cannot see the scope questions when looking at the ticket
- Both files listed together in the folder cause confusion about what the actual state is

## Options

1. **Merge blocker into original ticket** — manually add blocker section to `OC-0018-openclaw-skill-marketplace-integration.md` and delete `OC-0018_BLOCKED.md`
2. **Delete duplicate** — if the blocker doc is the source of truth, merge its content into the original ticket
3. **John answers questions** — once answered, an agent can consolidate everything into a single updated ticket

## What Needs to Happen

Someone needs to consolidate the two OC-0018 files into one, with:
- Blocker section inline
- Status accurately reflecting blocked
- Scope questions clearly listed for John to answer

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-20
