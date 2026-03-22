# OC-0018 — Skill Marketplace Integration

**Status:** Rejected
**Duplicate fix:** 2026-03-22 — merged duplicate root-owned file into this john-owned file

**Ticket:** OC-0018-openclaw-skill-marketplace-integration.md  
**Status:** Blocked (file permissions prevented updating original ticket)  
**Picked up:** 2026-03-19 09:00 UTC

---

## What Happened
- Cron runner picked up OC-0018 (oldest ticket in kanban/new)
- Moved to kanban/in-progress
- Assessed scope → too vague to safely implement
- **Could not update the original ticket file** — it is owned by root and I don't have sudo

## Blocker: Scope Is Undefined

The ticket says "implement a skill marketplace... similar to npm packages" — this is a large feature with many possible implementations. I need John to answer **5 quick questions** before I can proceed.

---

### Questions John Must Answer

**1. Build vs. extend existing?**
The `clawhub` CLI already has `search`, `install`, and `publish` commands. Is this ticket about:
- (A) Integrating/invoking clawhub from OpenClaw
- (B) Building something new and different

**2. Registry/UI approach?**
- (A) Web UI catalog → calls clawhub CLI under the hood
- (B) New independent registry API + database
- (C) Something else

**3. Install destination?**
Where should installed skills go?
- (A) `~/.openclaw/skills/` (current location)
- (B) New dedicated folder
- (C) Per-workspace

**4. Publishing?**
Can users publish skills to the marketplace?
- (A) Yes, authenticated publishing
- (B) No, curated/approved only
- (C) Not in scope

**5. ONE priority feature?**
If I can only implement one thing, pick the most important:
- (A) Browse/search skills (read-only)
- (B) One-click install
- (C) Dashboard card showing featured skills

---

## After John Answers
I'll update the original ticket, write a concrete implementation plan, and proceed.

## Ticket Original File
`/home/john/.openclaw/workspace/kanban/in-progress/OC-0018-openclaw-skill-marketplace-integration.md`  
*(root-owned, could not update — see above)*
