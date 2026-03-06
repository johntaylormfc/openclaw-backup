---
name: create_ticket
description: Create a new Kanban ticket in /home/john/.openclaw/workspace/kanban/new from a plain-English user request.
---

# Create Ticket Skill

Use this skill when the user asks to create, add, log, open, or raise a new ticket, task, or card in plain English.

Examples:
- create a ticket to build a BC container
- add a new high priority ticket for docker auth issues
- log a task to scaffold an AL extension
- raise a ticket for fixing Business Central login on the container

## Behaviour

When this skill is used:

1. Infer:
   - a short ticket title
   - a one- or two-sentence Goal
   - a one-sentence Why
   - a priority if the user states one, otherwise use Medium

2. Run this command with properly escaped arguments:

python3 /home/john/.openclaw/workspace/scripts/create_ticket.py \
  --title "<TITLE>" \
  --goal "<GOAL>" \
  --why "<WHY>" \
  --priority "<PRIORITY>"

3. Reply with:
- the ticket ID
- the file path created
- the title
- the chosen priority
- a short note that the ticket is now in kanban/new

## Rules

- Create the ticket in /home/john/.openclaw/workspace/kanban/new only.
- Do not start processing the ticket unless the user explicitly asks.
- Use the user's wording where practical, but make the title short and clear.
- If priority is not specified, default to Medium.
- If the request is broad, still create the ticket with a sensible first-pass goal rather than refusing.
