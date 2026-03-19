# Idea

**ID:** IDEA-0087
**Title:** [STALE REVIEW] OC-0014 — Ollama integration blocked 4 days with no implementation
**Status:** pending-review
**Created:** 2026-03-19 04:03
**Source:** Automated stale review (cron)

## Why This Needs Attention

OC-0014 (Local Ollama Model Integration for OpenClaw) has been **blocked for 4 days** with zero implementation work done. Only initial investigation happened (Ollama running but empty, OpenClaw uses MiniMax).

### What's Done
- Confirmed Ollama running on localhost:11434 with no models installed
- Confirmed OpenClaw uses minimax provider only

### What's Blocking
The blocker section lists 3 scope questions John must answer:
1. Which Ollama model to use (llama3, mistral, codellama, etc.)?
2. Should I install a model locally, or just configure OpenClaw to use existing Ollama endpoint?
3. Is this for a specific agent (ARR_Bot) or global OpenClaw config?

### Options
1. **Answer the 3 questions** — reply to this idea or the ticket directly
2. **Defer** — move ticket with a note on when you'll answer
3. **Abandon** — if you don't need local Ollama, close it

### What to Decide
Does local Ollama integration still interest you? If yes, answer the scope questions. If no, close it out.

**Reviewer:** Arnold 🦞 (cron agent)
**Review Date:** 2026-03-19
