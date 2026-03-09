#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
REJECTED_DIR = WORKSPACE / "kanban" / "rejected"

def replace_field(text: str, label: str, value: str) -> str:
    pattern = rf"(\*\*{re.escape(label)}:\*\*\s*).+"
    return re.sub(pattern, lambda m: m.group(1) + value, text, count=1)

def replace_section(text: str, heading: str, value: str) -> str:
    pattern = rf"(## {re.escape(heading)}\n)(.*?)(?=\n## |\Z)"
    replacement = rf"\1{value}\n"
    return re.sub(pattern, replacement, text, count=1, flags=re.S)

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--idea-file", required=True)
    parser.add_argument("--reason", required=True)
    args = parser.parse_args()

    idea_path = Path(args.idea_file)
    if not idea_path.exists():
        raise SystemExit(f"Idea file not found: {idea_path}")

    text = idea_path.read_text(encoding="utf-8")
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    text = replace_field(text, "Status", "Rejected")
    text = replace_field(text, "Last Updated", now)
    text = replace_section(text, "Approval Decision", f"Rejected on {now}.")
    text = replace_section(text, "Rejection Reason", args.reason)
    text = replace_section(text, "Notes", f"Idea rejected on {now}. Reason: {args.reason}")

    REJECTED_DIR.mkdir(parents=True, exist_ok=True)
    rejected_path = REJECTED_DIR / idea_path.name
    rejected_path.write_text(text, encoding="utf-8")

    idea_path.unlink()

    print(rejected_path)

if __name__ == "__main__":
    main()
