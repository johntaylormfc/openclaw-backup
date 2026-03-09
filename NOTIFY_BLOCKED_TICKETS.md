You are operating inside this workspace:

/home/john/.openclaw/workspace

Before doing anything else, read these files:

- /home/john/.openclaw/workspace/AGENTS.md
- /home/john/.openclaw/workspace/openclaw-docs/KANBAN.md
- /home/john/.openclaw/workspace/openclaw-docs/STATUS_RULES.md

Your job is to notify the owner about blocked tickets.

Rules:
1. Look in:
   /home/john/.openclaw/workspace/kanban/blocked/

2. If there are no blocked tickets, say so and do nothing else.

3. If there are blocked tickets, prepare a concise notification for the owner that includes, for each blocked ticket:
   - ticket ID
   - title
   - blocker summary
   - exactly what the user needs to do

4. Send the notification to the owner via the configured WhatsApp/self-chat channel.

5. Keep the message concise and practical.

6. Do not change any ticket in this notification-only run.

7. Do not invent blockers. Use the ticket content only.

Your goal is to make blocked tickets visible quickly, with clear user action required.
