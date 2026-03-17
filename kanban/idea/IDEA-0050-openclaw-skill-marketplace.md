# Idea
**ID:** IDEA-0050
**Title:** OpenClaw Skill Marketplace Integration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-12
**Last Updated:** 2026-03-12

## Summary
Implement a skill discovery and marketplace system for OpenClaw that allows users to browse, search, and install community-created skills directly from a centralized registry, similar to npm packages.

## Why It Might Matter
The YouTube tutorials and blog posts show strong community interest in skills (Todoist, Notion, Obsidian, WHOOP integrations). A marketplace would make it easier for users to discover and install useful skills without manually copying configs. Based on OpenClaw blog: "Skill Marketplace: Discover and install community skills more easily" is a planned feature.

## Suggested Outcome
Users can run commands like `openclaw skills install todoist` or browse a web UI to discover and install community skills with one click.

## Suggested Acceptance Criteria
- [ ] CLI command to search available skills
- [ ] CLI command to install a skill from marketplace
- [ ] Registry of community skills (JSON-based, hosted on GitHub or similar)
- [ ] Web UI integration with dashboard for skill browsing
- [ ] Documentation for submitting new skills to marketplace

## Context
- Source: OpenClaw 2026 blog and YouTube tutorials
- Related: existing skills system in ~/openclaw/skills/

## Suggested Next Step
Research existing skill format, define marketplace schema, and prototype CLI install command.

## Approval Decision
Pending

## Rejection Reason

## Notes
Could start with a simple GitHub-based JSON registry before building full web infrastructure.
