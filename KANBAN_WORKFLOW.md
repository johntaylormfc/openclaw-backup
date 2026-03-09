# OpenClaw Kanban Workflow

## Create a new idea in plain English
Use in OpenClaw:
Create an idea to ...

## Create a new live ticket in plain English
Use in OpenClaw:
Create a ticket to ...

## Accept an idea
Use in OpenClaw:
Accept idea IDEA-####

## Reject an idea
Use in OpenClaw:
Reject idea IDEA-#### because <reason>

## Manually process the next live ticket
Use in OpenClaw:
Read and follow /home/john/.openclaw/workspace/RUN_NEXT_TICKET.md and process the next ticket.

## Manual cron-style safe pickup
Use in OpenClaw:
Read and follow /home/john/.openclaw/workspace/RUN_NEXT_TICKET_CRON.md and process at most one approved live ticket.

## Check board folders
Run on Beelink:
find /home/john/.openclaw/workspace/kanban -type f | sort

## Check current in-progress tickets
Run on Beelink:
find /home/john/.openclaw/workspace/kanban/in-progress -type f | sort

## Check new tickets waiting in queue
Run on Beelink:
find /home/john/.openclaw/workspace/kanban/new -type f | sort

## Check cron worker runs
Run on Beelink:
openclaw cron runs --id 007bd1be-d806-4058-8cf5-61a2e583cca0 --limit 5

## Dashboard
Open:
http://<beelink-ip>:5000

The dashboard now shows:
- Ideas
- New
- In Progress
- Blocked
- Complete
- Rejected

Filesystem folders:
- kanban/idea = pending ideas only
- kanban/accepted = accepted ideas archive
- kanban/rejected = rejected ideas archive
- kanban/new = approved live tickets waiting for pickup

## Rules
- Ideas are suggestions only until accepted
- Accepted ideas are archived in kanban/accepted
- Rejected ideas are archived in kanban/rejected
- Only tickets in kanban/new are live work
- Cron picks up at most one live ticket at a time
- If anything required cannot be completed, the ticket must be Blocked
- Status must reflect reality, not effort
