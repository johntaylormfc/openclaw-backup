#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path

WORKSPACE = Path("/home/john/.openclaw/workspace")
IDEA_DIR = WORKSPACE / "kanban" / "idea"

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text[:60] or "new-idea"

def next_idea_id() -> str:
    existing = []
    for path in (WORKSPACE / "kanban").rglob("IDEA-*.md"):
        m = re.search(r"IDEA-(\d{4,})", path.name)
        if m:
            existing.append(int(m.group(1)))
    next_num = max(existing, default=0) + 1
    return f"IDEA-{next_num:04d}"

def build_idea(idea_id: str, title: str, summary: str, why: str, priority: str, source: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    return f"""# Idea
**ID:** {idea_id}
**Title:** {title}
**Status:** Idea
**Suggested Priority:** {priority}
**Source:** {source}
**Created:** {now}
**Last Updated:** {now}

## Summary
{summary}

## Why It Might Matter
{why}

## Suggested Outcome
If accepted, this idea should be converted into a live ticket with clear acceptance criteria and put into kanban/new.

## Suggested Acceptance Criteria
- [ ] Scope is clear enough to become a live ticket
- [ ] Why this work matters is understood
- [ ] Suggested next step is recorded

## Context
- Environment: /home/john/.openclaw/workspace
- Source: {source}

## Suggested Next Step
Review the idea and either accept it into a live ticket or reject it with a reason.

## Approval Decision
Pending

## Rejection Reason
Leave blank unless rejected.

## Notes
Idea created automatically from a plain-English request.
"""

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--title", required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--why", required=True)
    parser.add_argument("--priority", default="Medium", choices=["Low", "Medium", "High"])
    parser.add_argument("--source", default="User")
    args = parser.parse_args()

    IDEA_DIR.mkdir(parents=True, exist_ok=True)

    idea_id = next_idea_id()
    filename = f"{idea_id}-{slugify(args.title)}.md"
    output_path = IDEA_DIR / filename

    content = build_idea(
        idea_id=idea_id,
        title=args.title,
        summary=args.summary,
        why=args.why,
        priority=args.priority,
        source=args.source,
    )

    output_path.write_text(content, encoding="utf-8")
    print(output_path)

if __name__ == "__main__":
    main()
