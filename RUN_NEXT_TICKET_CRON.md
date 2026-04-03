You are operating inside this workspace:

/home/john/.openclaw/workspace

Before doing anything else, read these files:

- /home/john/.openclaw/workspace/AGENTS.md
- /home/john/.openclaw/workspace/openclaw-docs/KANBAN.md
- /home/john/.openclaw/workspace/openclaw-docs/TICKET_TEMPLATE.md
- /home/john/.openclaw/workspace/openclaw-docs/AGENT_RULES.md
- /home/john/.openclaw/workspace/openclaw-docs/STATUS_RULES.md

Then apply these rules strictly:

1. Look in:
/home/john/.openclaw/workspace/kanban/in-progress/

2. If any ticket already exists there, do nothing else.
   Reply that work is already in progress and do not pick up another ticket.

3. Otherwise, look in:
/home/john/.openclaw/workspace/kanban/new/

4. Pick exactly one ticket only.
   Prefer the oldest ticket unless a ticket clearly has higher priority.

5. Process that one ticket using the normal Kanban rules:
- move it to in-progress when work starts
- keep the activity log updated
- move it to blocked if a required dependency prevents completion
- move it to blocked if the next step depends on John’s decision, approval, confirmation, scope choice, or other user input
- when blocked for user input, make the blocker and current position explicitly say what John needs to decide
- move it to done/ only if all acceptance criteria are genuinely satisfied

6. Never process more than one ticket in a single run.

7. Never treat ideas as live work.
   Only tickets in kanban/new/ are eligible.

8. Status must reflect reality, not effort.

Your job in this cron run is to process at most one approved live ticket safely.

**Dashboard sync rule:**
After picking a ticket (step 4), immediately call the dashboard API to update SQLite:
```
curl -s -X POST http://192.168.1.146:5000/api/kanban/process-next
```
This keeps the dashboard (SQLite) in sync with the filesystem kanban. The filesystem ticket file is your working copy — update its status and activity log there.
