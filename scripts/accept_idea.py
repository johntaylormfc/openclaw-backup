#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path

WORKSPACE = Path("/home/john/.openclaw/workspace")
NEW_DIR = WORKSPACE / "kanban" / "new"

def next_ticket_id() -> str:
    existing = []
    for path in (WORKSPACE / "kanban").rglob("OC-*.md"):
        m = re.search(r"OC-(\d{4,})", path.name)
        if m:
            existing.append(int(m.group(1)))
    next_num = max(existing, default=0) + 1
    return f"OC-{next_num:04d}"

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text[:60] or "new-ticket"

def extract_field(text: str, label: str) -> str:
    m = re.search(rf"\*\*{re.escape(label)}:\*\*\s*(.+)", text)
    return m.group(1).strip() if m else ""

def extract_section(text: str, heading: str) -> str:
    pattern = rf"## {re.escape(heading)}\n(.*?)(?=\n## |\Z)"
    m = re.search(pattern, text, re.S)
    return m.group(1).strip() if m else ""

def replace_field(text: str, label: str, value: str) -> str:
    pattern = rf"(\*\*{re.escape(label)}:\*\*\s*).+"
    return re.sub(pattern, lambda m: m.group(1) + value, text, count=1)

def replace_section(text: str, heading: str, value: str) -> str:
    pattern = rf"(## {re.escape(heading)}\n)(.*?)(?=\n## |\Z)"
    replacement = rf"\1{value}\n"
    return re.sub(pattern, replacement, text, count=1, flags=re.S)

def build_ticket(ticket_id: str, title: str, goal: str, why: str, idea_id: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    return f"""# Ticket
**ID:** {ticket_id}
**Title:** {title}
**Status:** New
**Outcome State:** Partial
**Priority:** Medium
**Owner:** Unassigned
**Created:** {now}
**Last Updated:** {now}

## Goal
{goal}

## Why
{why}

## Acceptance Criteria
- [ ] Scope is confirmed
- [ ] Work is started by moving ticket to In Progress
- [ ] Activity log is maintained
- [ ] Ticket is blocked if a required dependency prevents completion
- [ ] Ticket is only completed when all required work is genuinely finished

## Context
- Source Idea: {idea_id}
- Environment: /home/john/.openclaw/workspace

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Write summary

## Activity Log
### Entries
- **Timestamp:** {now}  
  **Action:** Ticket created from accepted idea  
  **Result:** Ticket added to kanban/new  
  **Why:** User accepted idea {idea_id}  
  **Evidence:** Created via accept_idea.py  
  **Next Step:** Agent can pick up the ticket when requested

## Current Position
Ticket created from accepted idea and ready for pickup.

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
    parser = argparse.ArgumentParser()
    parser.add_argument("--idea-file", required=True)
    args = parser.parse_args()

    idea_path = Path(args.idea_file)
    if not idea_path.exists():
        raise SystemExit(f"Idea file not found: {idea_path}")

    text = idea_path.read_text(encoding="utf-8")
    idea_id = extract_field(text, "ID")
    title = extract_field(text, "Title")
    summary = extract_section(text, "Summary")
    why = extract_section(text, "Why It Might Matter")

    if not idea_id or not title:
        raise SystemExit("Could not read required fields from idea file")

    ticket_id = next_ticket_id()
    ticket_filename = f"{ticket_id}-{slugify(title)}.md"
    ticket_path = NEW_DIR / ticket_filename
    NEW_DIR.mkdir(parents=True, exist_ok=True)

    ticket_text = build_ticket(
        ticket_id=ticket_id,
        title=title,
        goal=summary or f"Implement accepted idea {idea_id}.",
        why=why or f"This work was accepted from idea {idea_id}.",
        idea_id=idea_id,
    )
    ticket_path.write_text(ticket_text, encoding="utf-8")

    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    text = replace_field(text, "Status", "Accepted")
    text = replace_field(text, "Last Updated", now)
    text = replace_section(text, "Approval Decision", f"Accepted on {now} and converted to ticket {ticket_id}.")
    text = replace_section(text, "Notes", f"Idea accepted and converted into live ticket {ticket_id}.")
    idea_path.write_text(text, encoding="utf-8")

    print(ticket_path)

if __name__ == "__main__":
    main()
