---
name: accept_idea
description: Accept an idea from /home/john/.openclaw/workspace/kanban/idea and convert it into a live ticket in /home/john/.openclaw/workspace/kanban/new.
---

# Accept Idea Skill

Use this skill when the user asks to accept or approve an idea.

Examples:
- accept IDEA-0001
- approve idea IDEA-0002
- accept the idea to show the kanban on the dashboard

## Behaviour

When this skill is used:

1. Identify the idea file in:
   /home/john/.openclaw/workspace/kanban/idea/

2. Run this command:

python3 /home/john/.openclaw/workspace/scripts/accept_idea.py \
  --idea-file "<IDEA_FILE>"

3. Reply with:
- the idea ID
- the new ticket file created
- a short note that the idea has been accepted and converted into a live ticket in kanban/new

## Rules

- Only accept ideas that currently exist in /home/john/.openclaw/workspace/kanban/idea/
- Do not start processing the new ticket unless the user explicitly asks
- If the user refers to an idea by title rather than exact filename, find the best matching idea file first
