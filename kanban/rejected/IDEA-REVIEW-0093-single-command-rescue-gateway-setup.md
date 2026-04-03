# Idea
**ID:** IDEA-REVIEW-0093
**Title:** First-class `openclaw gateway rescue` single-command rescue bot setup
**Status:** Idea
**Suggested Priority:** Low
**Source:** Cron
**Created:** 2026-03-19
**Last Updated:** 2026-03-19

## Summary
The OpenClaw docs describe running a "rescue bot" — a second isolated gateway on the same host for fallback access when the primary bot is misbehaving — but the setup process is a multi-step manual procedure requiring careful port spacing, profile creation, and config management. This idea proposes a single `openclaw gateway rescue setup` command that creates an isolated rescue gateway with sensible defaults (different port, separate workspace, separate state dir) in one shot.

## Why It Might Matter
For power users who depend on OpenClaw as a critical daily tool, having an out-of-band rescue gateway is a valuable safety net. However, the current multi-step isolation checklist (4 env vars, port spacing ≥20, workspace suffix, profile flag) is error-prone and discourages adoption. A single opinionated command would make the rescue bot pattern accessible to more users, reducing downtime when the primary gateway has config issues or is unreachable.

## Suggested Outcome
`openclaw gateway rescue setup` (or similar) produces a fully isolated rescue gateway on a non-conflicting port with:
- Auto-selected port (primary + 100 or user-specified)
- Separate `--profile rescue` / `--state-dir` / `--workspace`
- Service installed and ready to start
- Clear instructions printed for how to start/access the rescue bot

## Suggested Acceptance Criteria
- [ ] Single command creates all required isolation (config, state, workspace, port)
- [ ] Port conflicts are detected and reported before setup completes
- [ ] Rescue gateway is installable as a system service (`openclaw --profile rescue gateway install`)
- [ ] Documentation page for rescue bot setup is replaced/augmented with this command
- [ ] Existing manual multi-gateway docs remain available for custom configurations

## Context
- Current docs: https://docs.openclaw.ai/gateway/multiple-gateways.md (rescue-bot guide)
- Isolation requirements: `OPENCLAW_CONFIG_PATH`, `OPENCLAW_STATE_DIR`, `agents.defaults.workspace`, `gateway.port`, ≥20 port spacing for derived browser/canvas/CDP ports
- Profile flag: `openclaw --profile rescue …` auto-scopes config path and state dir
- Related existing ideas: none directly covering rescue bot UX

## Suggested Next Step
Prototype the command as a new CLI subcommand or wrapper script. Identify which flags/options (port, profile name, workspace suffix) should be configurable vs auto-sensed from the primary gateway.

## Approval Decision
Pending

## Rejection Reason

## Notes

## Implementation (2026-03-22)
- Script: `/home/john/.openclaw/workspace/scripts/gateway-rescue.sh`
- Checks: process, port, config JSON, disk, memory, logs, Docker containers
- Auto-fixes: restart gateway, clear stale lock files
- Usage: `bash gateway-rescue.sh` or `bash gateway-rescue.sh --dry-run`
- Tested: gateway healthy, no issues found
