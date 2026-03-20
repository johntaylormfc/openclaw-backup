# Idea

**ID:** IDEA-0102
**Title:** OC-0018 — blocker doc exists but ticket not updated + scope questions unanswered 19h
**Status:** pending-review
**Source:** Cron stale review (2026-03-20 04:03 UTC)
**Created:** 2026-03-20 04:03

## Why This Needs Attention

OC-0018 (Skill Marketplace) has a layered inconsistency problem:

### Layer 1: Status/folder mismatch
- Ticket file: `OC-0018-openclaw-skill-marketplace-integration.md`
- Folder location: `kanban/in-progress/`
- Ticket `Status:` field: `New`
- Ticket `Owner:` field: `Unassigned`

### Layer 2: Blocked doc exists but ticket wasn't updated
- `OC-0018_BLOCKED.md` (in same folder) documents scope questions from 2026-03-19 09:00 UTC
- Notes: "could not update original ticket — owned by root"
- 5 scope questions posted for John, **none answered**
- ~19 hours have passed

### Layer 3: Duplicate idea already exists
- IDEA-0090 flagged the status/folder mismatch on 2026-03-19 16:05
- That idea is still `pending-review` — unresolved

## What's Happening
The cron agent on 2026-03-19 moved OC-0018 to in-progress, hit a permissions error trying to update the ticket, created a separate blocker doc, and posted scope questions — but the actual ticket file was never updated and John never answered the questions.

## Options
1. **John answers the 5 scope questions** — then an agent can update the ticket and proceed
2. **Resolve the permissions issue** — `chown` the ticket file so agents can edit it
3. **Merge blocker into ticket** — manually edit the ticket to add blocker content inline
4. **Move back to kanban/new/** — acknowledge OC-0018 wasn't genuinely picked up
5. **Close it** — if the skill marketplace isn't a priority right now

## What Needs to Happen
Either John answers these 5 questions (from the blocker doc):
1. Build vs extend clawhub?
2. Web UI vs new registry?
3. Install destination?
4. Publishing — yes/no/curated?
5. ONE priority feature (browse, install, or dashboard card)?

...OR the ticket is formally blocked/moved/deferred.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-20
