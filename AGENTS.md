# OpenClaw Workspace Instructions

**OPERATING MODEL:** See OPERATING_MODEL.md — governs all task framing, response standards, and working style. This file takes precedence for operational guidance.

This workspace uses process documents in /home/john/.openclaw/workspace/openclaw-docs/:
- KANBAN.md, TICKET_TEMPLATE.md, AGENT_RULES.md, STATUS_RULES.md

## Task-Framing (Mandatory for Substantive Requests)

Every substantive task must be framed before tools are touched:
- **TASK** — What exactly needs to happen?
- **INTENT** — Why does John want this? What outcome matters?
- **ENVIRONMENT** — What files, containers, services, paths are involved?
- **CONSTRAINTS** — What must not break?
- **OUTPUT** — What does done look like?
- **SUCCESS CRITERIA** — How to verify?
- **PLAN** — Smallest next step (one tool call at a time)

## Mandatory Rules

### Browser Testing (Playwright)
- **ALWAYS verify dashboard/UI changes with Playwright** before reporting "fixed" or "done"
- Install: `cd /tmp && npm init -y > /dev/null && npm install playwright > /dev/null 2>&1`
- Test with a script that: loads the page, triggers the action, checks for console errors and visible error text
- Do NOT declare a UI fix complete without Playwright verification
- Never mark Complete unless all acceptance criteria met and evidenced
- If task cannot be completed, move to Blocked immediately with:
  - what was completed, what failed, why, what user must do to unblock, next step
- Always keep an activity log showing what was done and why
- Status must reflect reality, not effort or optimism

## Ticket Creation
If user asks to create/add/log/open/raise a ticket/task/card:
- Use `create_ticket` skill
- Create in /home/john/.openclaw/workspace/kanban/new/
- Reply with the file created

## Idea Creation
If user asks to create/add/log/suggest an idea:
- Use `create_idea` skill
- Create in /home/john/.openclaw/workspace/kanban/idea/
- Keep as idea until explicitly accepted
- Reply with the file created

## Ticket vs Idea
- **Idea**: suggestion, user wants to consider later, cron proposing work, approval needed
- **Ticket**: user clearly wants active work now, ready to pick up from kanban/new

## Idea Approval/Rejection
- **Approve**: use `accept_idea` → convert to ticket in kanban/new/
- **Reject**: use `reject_idea` → move to kanban/rejected/ with reason

## Governance
Ideas in kanban/idea/ are suggestions only - not live work until explicitly accepted.
