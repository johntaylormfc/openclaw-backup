#!/usr/bin/env python3
from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

WORKSPACE = Path("/home/john/.openclaw/workspace")
KANBAN_NEW = WORKSPACE / "kanban" / "new"
TEMPLATE = WORKSPACE / "openclaw-docs" / "TICKET_TEMPLATE.md"

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text[:60] or "new-ticket"

def next_ticket_id() -> str:
    kanban = WORKSPACE / "kanban"
    existing = []
    for path in kanban.rglob("OC-*.md"):
        m = re.search(r"OC-(\d{4,})", path.name)
        if m:
            existing.append(int(m.group(1)))
    next_num = max(existing, default=0) + 1
    return f"OC-{next_num:04d}"

def build_ticket(ticket_id: str, title: str, goal: str, why: str, priority: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    return f"""# Ticket
**ID:** {ticket_id}
**Title:** {title}
**Status:** New
**Outcome State:** Partial
**Priority:** {priority}
**Owner:** Unassigned
**Created:** {now}
**Last Updated:** {now}

## Goal
{goal}

## Why
{why}

## Acceptance Criteria
- [ ] Define and confirm scope
- [ ] Start work by moving ticket to In Progress
- [ ] Maintain activity log
- [ ] Move to Blocked if any required dependency prevents completion
- [ ] Move to Complete only when all required work is genuinely finished

## Context
- Environment: /home/john/.openclaw/workspace
- Repo / Project:
- Paths:
- URLs / Services:
- Dependencies:
- Constraints / Assumptions:

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Commit / push changes
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** {now}  
  **Action:** Ticket created  
  **Result:** Ticket added to kanban/new  
  **Why:** User requested a new ticket in plain English  
  **Evidence:** Auto-generated from create_ticket.py  
  **Next Step:** Agent can pick up the ticket when asked

## Current Position
Ticket created and ready for pickup.

## Blocker

### Blocker Summary

### What Was Completed
-

### What Failed
-

### Why It Failed
-

### Evidence
-

### Why This Blocks Completion
-

### What You Need To Do
-

### Next Step After Unblock
-

## Completion Summary
Not complete.
"""

def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--title", required=True)
    parser.add_argument("--goal", required=True)
    parser.add_argument("--why", required=True)
    parser.add_argument("--priority", default="Medium", choices=["Low", "Medium", "High", "Critical"])
    args = parser.parse_args()

    KANBAN_NEW.mkdir(parents=True, exist_ok=True)

    ticket_id = next_ticket_id()
    slug = slugify(args.title)
    filename = f"{ticket_id}-{slug}.md"
    output_path = KANBAN_NEW / filename

    content = build_ticket(
        ticket_id=ticket_id,
        title=args.title,
        goal=args.goal,
        why=args.why,
        priority=args.priority,
    )

    output_path.write_text(content, encoding="utf-8")
    print(output_path)

if __name__ == "__main__":
    main()
