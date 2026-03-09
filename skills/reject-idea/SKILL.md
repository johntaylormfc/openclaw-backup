---
name: reject_idea
description: Reject an idea from /home/john/.openclaw/workspace/kanban/idea and move it into /home/john/.openclaw/workspace/kanban/rejected with a reason.
---

# Reject Idea Skill

Use this skill when the user asks to reject or decline an idea.

Examples:
- reject IDEA-0001 because duplicate
- decline idea IDEA-0002 because not needed
- reject the dashboard idea because we already have a better plan

## Behaviour

When this skill is used:

1. Identify the idea file in:
   /home/john/.openclaw/workspace/kanban/idea/

2. Identify a rejection reason from the user's request.
   If no reason is given, use:
   Not approved at this time

3. Run this command:

python3 /home/john/.openclaw/workspace/scripts/reject_idea.py \
  --idea-file "<IDEA_FILE>" \
  --reason "<REASON>"

4. Reply with:
- the idea ID
- the rejected file path
- the rejection reason
- a short note that the idea has been moved to kanban/rejected

## Rules

- Only reject ideas that currently exist in /home/john/.openclaw/workspace/kanban/idea/
- If the user refers to an idea by title rather than exact filename, find the best matching idea file first
- Always include a rejection reason
