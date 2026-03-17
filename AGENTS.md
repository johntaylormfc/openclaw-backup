# OpenClaw Workspace Instructions

This workspace uses process documents in /home/john/.openclaw/workspace/openclaw-docs/:
- KANBAN.md, TICKET_TEMPLATE.md, AGENT_RULES.md, STATUS_RULES.md

## Mandatory Rules
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
