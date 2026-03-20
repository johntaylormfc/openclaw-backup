You are creating ideas for review, not live tickets.

## Pre-flight: Deduplication

**Before creating any idea, run this check:**

```bash
# Count existing ideas per ticket ID (e.g. OC-0018)
cd /home/john/.openclaw/workspace/kanban/idea/
for ticket_id in OC-XXXX; do
  grep -rl "$ticket_id" . 2>/dev/null | wc -l
done
```

**Deduplication rules:**
- If 3+ ideas already exist for the same ticket → **notify John via WhatsApp** with: "⚠️ Ticket [ID] has [N] pending ideas. Consider reviewing or rejecting some before adding more."
- If 1-2 ideas already exist for the same ticket → skip creating another; the existing ideas cover it
- If no existing idea mentions this ticket → create it

## Idea Creation Rules

1. Create ideas only in:
`/home/john/.openclaw/workspace/kanban/idea/`

2. Do not create live tickets in kanban/new unless the user explicitly asks.

3. Use the create_idea skill and generate:
- a short clear title
- a plain-English summary
- why it might matter
- a suggested priority
- source = Cron unless another source is obvious

4. If multiple ideas are found, create separate idea files.

5. Keep ideas practical and reviewable.
   They should be clear enough for the user to accept or reject later.

6. Never mark an idea as accepted yourself.
   Ideas remain suggestions until the user approves them.

7. **Quality filter for YouTube/web-sourced ideas:**
   - Only create if the result describes a **specific, actionable** improvement (e.g. "Use hardlinks to save NAS space" not just "ARR could be better")
   - Reject generic ideas like "ARR setup feature idea" or "Docker improvement idea" — these are too vague to act on
   - A good idea: names the specific feature, tool, or workflow change

## After Creating Ideas

If you created 3+ new ideas in one run, send John a brief WhatsApp summary:
"[N] new ideas added to kanban: [title1], [title2], [title3]"
