---
name: bc-workflows
description: Plain-English workflows for BC AL apps - build, deploy, and manage containerized Business Central extensions.
metadata: {"clawdbot":{"emoji":"🚀","requires":{"scripts":["bc-new","bc-info","bc-vscode","bc-url","bc-proxy","git","gh"]}}}
---

# BC Workflows

Plain-English skill for BC app development and deployment.

## Setup

First, set your credentials (run once):
```bash
export BC_PASSWORD='your_bc_password'
export GH_TOKEN='your_github_token'  # Optional: for automated GitHub push
```

## Plain-English Intents

### Supported Commands

1. **Build and Deploy**
   "Build a new app called [name] from the attached spec and push to GitHub and deploy to container on [target]"
   
2. **Update Existing**
   "Update the app [name] from the attached spec and push changes and deploy"

3. **Container Only**
   "Just build container for [name] and return URL"

4. **Show URL**
   "Show URL for [name]"

5. **List Apps**
   "List all apps"

## Examples (WhatsApp)

1. "Build a new app called DemoApp from the attached spec and push to GitHub and deploy locally"
2. "Update the app MyApp from the attached spec and push changes"
3. "Build container for TestApp and return URL"
4. "Show URL for bcuk-prod"
5. "List all apps"

## How It Works

1. **Intent Router** - Parses plain English into structured plan
2. **Spec Discovery** - Finds spec.md from inbox locations
3. **BC Container** - Uses bc-shortcuts for container management
4. **GitHub Integration** - Creates/updates repos under johntaylormfc
5. **Output** - Returns direct IP:port URLs (No DNS required)

## Output Format

Always returns:
- Direct Web URL: http://<IP>:<web_port>
- Dev Port: <IP>:<dev_port>
- GitHub repo status (if pushed)

## Notes

- Uses MiniMax only (no Anthropic/Claude)
- Secrets are read from environment variables only
- Direct IP URLs - no DNS required
- GSPro target falls back to local if not configured
