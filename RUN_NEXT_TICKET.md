You are operating inside this workspace:

/home/john/.openclaw/workspace

Before doing anything else, read these files:

- /home/john/.openclaw/workspace/AGENTS.md
- /home/john/.openclaw/workspace/openclaw-docs/KANBAN.md
- /home/john/.openclaw/workspace/openclaw-docs/TICKET_TEMPLATE.md
- /home/john/.openclaw/workspace/openclaw-docs/AGENT_RULES.md
- /home/john/.openclaw/workspace/openclaw-docs/STATUS_RULES.md

Then:

1. Find the next ticket to process in:
/home/john/.openclaw/workspace/kanban/new/

2. Pick the oldest ticket unless a ticket clearly states higher priority.

3. Move the ticket to:
/home/john/.openclaw/workspace/kanban/in-progress/
when work starts.

4. Update the ticket as you work, including:
- Status
- Outcome State
- Last Updated
- Task Checklist
- Activity Log
- Current Position

5. If any required dependency, permission, missing input, technical issue, or failed step prevents completion:
- move the ticket to /home/john/.openclaw/workspace/kanban/blocked/
- fully complete the Blocker section
- clearly state exactly what the user must do to unblock it

6. Only move a ticket to:
/home/john/.openclaw/workspace/kanban/complete/
if all acceptance criteria are genuinely satisfied and evidenced.

7. Never mark partial work as complete.

8. Keep status truthful. Status must reflect reality, not effort.

9. Make all ticket updates practical and auditable.

10. If resuming a blocked ticket, first confirm the blocker is genuinely removed, then move it back to In Progress before completing it.

Your job is to process one ticket properly, not many tickets badly.
