---
name: create_idea
description: Create a new idea in /home/john/.openclaw/workspace/kanban/idea from a plain-English user request.
---

# Create Idea Skill

Use this skill when the user asks to create, add, log, or suggest a new idea for future consideration.

Examples:
- create an idea to show the kanban board on the dashboard
- log an idea for improving blocked ticket handling
- add an idea to review stale tickets weekly
- suggest an idea for auto-picking new tickets periodically

## Behaviour

When this skill is used:

1. Infer:
   - a short idea title
   - a one- or two-sentence Summary
   - a one-sentence Why It Might Matter
   - a priority if the user states one, otherwise use Medium
   - a source if obvious, otherwise use User

2. Run this command with properly escaped arguments:

python3 /home/john/.openclaw/workspace/scripts/create_idea.py \
  --title "<TITLE>" \
  --summary "<SUMMARY>" \
  --why "<WHY>" \
  --priority "<PRIORITY>" \
  --source "<SOURCE>"

3. Reply with:
- the idea ID
- the file path created
- the title
- the chosen priority
- a short note that the idea is now in kanban/idea

## Rules

- Create the idea in /home/john/.openclaw/workspace/kanban/idea only.
- Do not convert the idea into a live ticket unless the user explicitly asks to accept it.
- Use the user's wording where practical, but make the title short and clear.
- If priority is not specified, default to Medium.
