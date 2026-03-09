---
name: bc-shortcuts
description: BC Container shortcuts - Create, manage, and access BC containers via simple commands.
metadata: {"clawdbot":{"emoji":"🐳","requires":{"scripts":["bc-new","bc-info","bc-vscode","bc-dns","bc-proxy","bc-list","bc-rm","bc-stop"]}}}
---

# BC Shortcuts

Quick commands for BC container management.

## Setup

First, set your BC password (run this once):
```bash
export BC_PASSWORD='your_password'
```

## Commands

### 1. Create New Container (ALWAYS use lowercase john!)
```
bc new <key> [country] [version] [--dry-run]
```
Example: `bc new glapproval 18206 19206`

**Important:** Use lowercase username 'john' - uppercase fails!

### 2. Container Info
```
bc info <key>
```
Example: `bc info bcuk-stage9-smoketest`

### 3. Generate VS Code Configs
```
bc vscode <key> [--project /path/to/project]
```
Example: `bc vscode bcuk-stage9-smoketest`

### 4. Generate DNS Records
```
bc dns
```

### 5. Sync Proxy Routes
```
bc proxy
```

### 6. List Containers
```
bc list
```

### 7. Remove Container
```
bc remove <key> [--force]
```
Example: `bc remove bcuk-test --force`

### 9. Show Direct URLs (No DNS)
```
bc url <key>
```
Example: `bc url bcuk-stage9-smoketest`

**Output includes:**
- Recommended Web URL: http://<IP>:<web_port>/BC/?tenant=default
- Sign-In Shortcut: http://<IP>:<web_port>/BC/SignIn?tenant=default
- Legacy Web URL (may fail): http://<IP>:<web_port>/BC/

### 10. Full Project Setup
```
bc project <key> --project /path/to/project [--country UK] [--version latest] [--dry-run]
```
Creates container, generates VS Code configs, uploads bundle.
```
bc bundle <key> [--project /path] [--dry-run]
```
Example: `bc bundle bcuk-prod --dry-run`

## Example Prompts (WhatsApp)

1. "bc new bcuk-test UK latest"
2. "bc info bcuk-stage9-smoketest"
3. "bc vscode bcuk-prod --project /home/john/projects/myalproject"
4. "bc list"
5. "bc dns"
6. "bc bundle bcuk-acme --dry-run"
7. "bc url bcuk-acme" - Show direct IP URLs (No DNS)
8. "bc project bcuk-prod --project /path/to/project" - Full setup with VS Code

## Notes

- All commands use MiniMax-only (no Anthropic/Claude)
- Password is read from BC_PASSWORD env var - never typed in chat
- Connection bundles are saved to: ~/.openclaw/workspace/bc_reliability/connection_bundles/
