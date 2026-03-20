You are reviewing tickets in:

/home/john/.openclaw/workspace/kanban/in-progress/

## Pre-flight: Check existing idea count per ticket

Before creating any new ideas, scan the idea folder and count how many ideas already exist per ticket ID:

```bash
# For each stale ticket found, count existing ideas for that ticket ID
for ticket_id in OC-XXXX; do
  count=$(grep -rl "oc-0018\|OC-0018" /home/john/.openclaw/workspace/kanban/idea/ 2>/dev/null | wc -l)
  echo "$ticket_id: $count existing ideas"
done
```

## Rules

1. **Deduplicate strictly.** Before creating an idea for a ticket, check `/home/john/.openclaw/workspace/kanban/idea/` for any file whose body mentions that ticket ID (e.g. "OC-0018"). If a file already exists for that ticket, **skip creating a new one** and instead:
   - If the ticket has 3+ existing ideas: **notify John via WhatsApp** with the message: "⚠️ Ticket [TICKET_ID] has [N] ideas but keeps appearing stale. Review or close it: [brief reason]"
   - If the ticket has 1-2 existing ideas: silently skip — don't add another

2. **Only create ideas for genuine improvements.** A ticket being stale is a system problem, not automatically an idea. Create an idea only if:
   - The ticket identifies a real ARR/OpenClaw improvement opportunity
   - The improvement hasn't already been captured in existing ideas
   - The idea adds new information or urgency beyond what's already in existing ideas

3. **Consolidate, don't duplicate.** If OC-0018 has inconsistent status AND duplicate files, create ONE combined idea, not separate ones.

4. **Escalate persistently stale tickets.** If the same ticket appears stale 3+ times in recent reviews, the next run should escalate via WhatsApp instead of creating yet another idea.

5. Do not directly complete, block, or move tickets. Create review ideas only.

6. Keep ideas practical and reviewable.
