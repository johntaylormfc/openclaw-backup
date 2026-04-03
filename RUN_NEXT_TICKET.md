You are operating inside this workspace:

/home/john/.openclaw/workspace

Before doing anything else, read these files:

- /home/john/.openclaw/workspace/AGENTS.md
- /home/john/.openclaw/workspace/openclaw-docs/KANBAN.md
- /home/john/.openclaw/workspace/openclaw-docs/TICKET_TEMPLATE.md
- /home/john/.openclaw/workspace/openclaw-docs/AGENT_RULES.md
- /home/john/.openclaw/workspace/openclaw-docs/STATUS_RULES.md

## Your job: process one ticket from new/ → done/

Steps:

1. **Pick up** the oldest ticket from:
   /home/john/.openclaw/workspace/kanban/new/

2. **Move it to** in-progress when work starts:
   /home/john/.openclaw/workspace/kanban/in-progress/

3. **Work the ticket** — update Status, Outcome State, Last Updated, Task Checklist, Activity Log, Current Position as you go.

4. **If you hit a blocker:**
   - Move the ticket to /home/john/.openclaw/workspace/kanban/blocked/
   - Fill in the Blocker section with the exact issue and what John must do to unblock
   - Do NOT finish the ticket — leave it blocked

5. **If the work is genuinely complete** (all acceptance criteria met):
   - Move to /home/john/.openclaw/workspace/kanban/done/
   - Send a WhatsApp to John saying the ticket is done and awaiting his sign-off

6. **Rule: never mark done unless all acceptance criteria are genuinely satisfied and evidenced.**
   Partial work stays in in-progress.

7. **Rule: status reflects reality, not effort.**

8. **Resuming a blocked ticket:**
   - Confirm the blocker is genuinely removed
   - Move it back to /home/john/.openclaw/workspace/kanban/new/
   - Wait for next cron run to pick it up again (do not move directly to in-progress)

Process one ticket properly. Done is better than thorough.
