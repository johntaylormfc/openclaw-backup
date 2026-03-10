# ARR_Bot Memory

## CRITICAL: The Site (Dashboard)
- **URL**: http://192.168.1.146:5000 (THIS IS "THE SITE" - not port 4000!)
- **IMPORTANT**: When john says "site", "website", or "dashboard" he ALWAYS means port 5000
- Port 4000 = old dashboard (static, no API) - IGNORE THIS ONE
- Port 5000 = NEW BC Dev Limited Dashboard with API proxy
- **NEVER edit files in /home/john/ARR/dashboard/ - that's the old site
- Always edit files in /home/john/ARR/dashboard-v2/

## Dashboard Architecture
- **Frontend**: /home/john/ARR/dashboard-v2/ (React + Vite)
- **Build**: `cd /home/john/ARR/dashboard-v2 && npm run build`
- **Backend API**: Docker container "arr-dashboard" on port 4000
- **Proxy**: Docker container "arr-dashboard-v2" on port 5000 (nginx proxying both static + API)
- **DB**: /home/john/ARR/dashboard-data/dashboard.db
- **Container names**: arr-dashboard (API, port 4000), arr-dashboard-v2 (nginx proxy, port 5000)

## When Dashboard Breaks
1. Check if container arr-dashboard is running (port 4000)
2. Check if container arr-dashboard-v2 is running (port 5000)
3. Rebuild frontend: `cd /home/john/ARR/dashboard-v2 && npm run build`
4. Restart containers: `docker restart arr-dashboard arr-dashboard-v2`
5. If port 5000 shows old site: `docker rm -f arr-dashboard-v2 && docker run -d --name arr-dashboard-v2 -p 5000:80 -v /home/john/ARR/dashboard-v2/dist:/usr/share/nginx/html:ro -v /home/john/ARR/dashboard-v2/nginx:/etc/nginx/conf.d:ro --network media-network nginx:alpine`

## Dashboard Development
- Quick Links are in: /home/john/ARR/dashboard-v2/src/utils/index.js
- Quick Links use johntaylormfc.ddns.net for external access
- Rebuild after any changes: `npm run build`
- API proxy config: /home/john/ARR/dashboard-v2/nginx/default.conf

## ARR Stack Services

### Sonarr
- URL: http://192.168.1.146:8989
- API Key: e990b7b615554edeaca78919ade1e975 (updated March 9, 2026)
- Container: 3f1a866150fc_sonarr

### Radarr
- URL: http://192.168.1.146:7878

## Dashboard (old)
- URL: http://192.168.1.146:4000
- DB: /data/dashboard.db

## John's Preferences
- Ideas → kanban queue
- PRs for GitHub changes
- WhatsApp for communication
- **ALWAYS backup before dashboard changes**:
  - `cp index.html index.html.backup-$(date +%Y%m%d-%H%M)`
  - `cp dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)`

## Active Cron Jobs
- Update Cron Jobs List: every 5 min
- GitHub Repo Review: hourly
- Daily Review: 23:00 daily
- **Email to Todoist**: Failing - needs calendar.readonly scope + re-auth (2026-03-03)
- **Calendar to Todoist**: Failing - needs calendar.readonly scope + re-auth (2026-03-03)
- Weekly MEMORY.md Auto-Curation: Sunday 5am (MiniMax only, no embeddings)
- Weekly Ownership & Health Check: Wednesday/Sunday 5am

## Docker Doctor Agent
- **Created**: March 4, 2026
- **Location**: ~/.openclaw/skills/docker-doctor/
- **Role**: Diagnostic specialist for Docker environments — inspects and diagnoses ONLY, never makes changes
- **Files**: SKILL.md (usage guide), AGENT.md (agent prompt), scripts/diagnose.sh
- **Usage**: "Run docker doctor diagnostics" or "Diagnose container X"

## Key Patterns & Learnings
- **Never restore database to fix UI issues** - debug actual issue instead
- Use Chrome DevTools MCP for dashboard debugging
- Kanban ideas column works well as task capture
- **gdrive-sync recurring failures**: Service Account quota limits causing 5/6 file upload failures - may need to space out uploads or use different auth method
- **Gmail OAuth tokens expire frequently**: Need periodic re-authentication or refresh token mechanism
- **Container file persistence**: Critical host files (like /tmp/trading.json) may not exist in containers - always verify file presence when debugging API issues
- **Session linking works**: Linking dmScope to "main" successfully shared context between WhatsApp and webchat
- **OAuth scope drift**: Calendar API requires calendar.readonly scope in addition to Gmail scope - scripts that worked previously may need updated scopes on re-auth
- **BCContainerHelper required**: Raw BC Docker images need BCContainerHelper module for proper initialization - containers exit with "ServiceSettings.ps1" error without it
- **GSPRO Docker setup**: Use alternative ports (18080, 17046-17049) to avoid conflicts; HNS networking issues on Windows containers can be fixed with Docker factory reset
- **MiniMax-only provider**: March 5th - Successfully enforced MiniMax-M2.5 as sole LLM provider (purged Anthropic)
- **Root file auto-fix**: Root-owned workspace files can get auto-fixed by system cleanup (observed between Stage 2 and 3 remediation)
- **Gemini embeddings disabled**: Gemini API returning 403 errors - disabled vector memory flush to avoid costs
- **Weekly health monitoring**: Created automated scans for root files and cron health (runs Wed/Sun 5am)
- **Sensitive data in memory**: Password exposed in March 5th memory - need scrubber for future
- **BC Container tenant parameter**: March 6th - BC containers require `?tenant=default` in URL after Docker restart
- **Weekly review effectiveness**: March 8th - Daily Review cron successfully identifies patterns and blockers; helps maintain system health awareness

## Known Issues
- Exec tool can hang after system compaction
- **Google Drive sync failing**: Service Account has no storage quota - needs investigation (persist since Mar 6)
- **Vector memory flush failing**: 403 Forbidden from embedding service - disabled since Mar 5

## John's Critical Directives (from 2026-03-02)
1. **Memory**: Always read MEMORY.md and today's log (memory/YYYY-MM-DD.md) before taking action. Save new facts/preferences immediately to MEMORY.md.
2. **Anti-Looping**: If a command fails twice with same error, STOP - log error and ask for human intervention.
3. **Temporal Awareness**: Check current time/date when scheduling. Drop outdated info from memory.
4. **here.now**: Use for instant web hosting - skill installed at ~/.agents/skills/here-now/
5. **Tavily**: Web search MCP - 5 tools (tavily_search, tavily_extract, etc.)
6. **Firecrawl**: Web scraping MCP - 12 tools (firecrawl_scrape, crawl, search)

## Today's Events (2026-03-02)
- X Growth Bot fully removed (directory, cron jobs, dashboard section)
- Trading bot RSI thresholds widened: 35/65 → 25/75 (more trades)
- Google OAuth re-authenticated - Gmail API working
- Tested WhatsApp messaging - working

## BC Dev Contract Management Extensions

### OpenClaw Contract Management (Public SaaS)
- **GitHub**: https://github.com/johntaylormfc/openclaw-contract-management
- **Docs**: SPEC.md, USER_MANUAL.md (markdown, in repo root)
- **Local clone**: /tmp/coenclaw_tmp/
- **When updating**: Edit local clone, commit, push to master branch

### BCDev-ContractBilling (Private - On Premise)
- **GitHub**: https://github.com/johntaylormfc/BCDev-ContractBilling
- **Docs**: Spec/Specification.md, Doc/UserManual.html
- **Local**: ~/.openclaw/workspace/BCDev-ContractBilling/

### Documentation Update Protocol
When contract management features change:
1. Update SPEC.md with new/changed functionality
2. Update USER_MANUAL.md with updated instructions
3. Commit and push: `cd /tmp/coenclaw_tmp && git add -A && git commit -m "Update docs" && git push origin master`
4. Log update in today's memory file

## BC Container (GSPRO)

| Container | Web Port | URL |
|-----------|----------|-----|
| glapproval | 18206 | http://192.168.1.228:18206/BC/?tenant=default |
| bcdev | 18205 | http://192.168.1.228:18205/BC/?tenant=default |
| openclaw-contracts | 18200 | http://192.168.1.228:18200/BC/?tenant=default |

**Credentials:** john / John1234 (lowercase username!)

**SSH Access (for container creation):**
- Host: 192.168.1.228
- User: bot
- Password: BotBotBot!
- Use: `sshpass -p 'BotBotBot!' ssh bot@192.168.1.228 "command"`

**Creating new containers:**
- Use script: `pwsh -File C:/Users/bot/New-BCContainerRemote.ps1 -ContainerName <name> -WebPort <port> -DevPort <devport> -Username john -Password John1234`
- ALWAYS use lowercase username 'john' (uppercase JOHN fails!)
- Create separate container for each extension to avoid conflicts
- Increment WebPort (18207, 18208...) for each new container

**Extension development workflow:**
1. Create AL extension files in /home/john/<ExtensionName>/
2. Create VS Code config (.vscode/launch.json, .vscode/settings.json) pointing to container
3. Copy to GSPRO: `sshpass -p 'BotBotBot!' scp -r /home/john/<ExtensionName> bot@192.168.1.228:C:/`
4. Push to GitHub
5. Publish from VS Code → AL:Go

**Note:** BC containers require `?tenant=default` in URL after Docker restart (added March 6, 2026)

## Memory System
- Daily notes: memory/YYYY-MM-DD.md — raw session logs, written automatically, load on-demand
- MEMORY.md: curated long-term brain — load every heartbeat (~3K tokens)
- projects.md: compact project registry — load every heartbeat (~1K tokens)
- Vector DB: PostgreSQL + pgvector, semantic search via AI embeddings
- Smart loading: only projects.md + MEMORY.md at startup. Daily notes + vector search = on-demand only. Saves ~80% token cost vs loading everything.
- **Vector memory flush**: DISABLED (March 5, 2026) - Gemini API returning 403 errors

Last updated: 2026-03-09

## Research Policy
- If question involves facts, product specs, pricing, versions, "latest", policies: do NOT answer from memory
- First: use web/search tools
- Output must include:
  - (a) short answer
  - (b) bullets with supporting evidence
  - (c) 2-5 source links
- If browser/search tools unavailable: say "No browser tools available" and ask before proceeding
- If uncertain: state uncertainty and offer next verification steps

## OpenClaw Operational Prompt
- Objective: accurate, safe, repeatable instructions; minimize hallucinations
- No Guessing: state confidence rating [HIGH/MEDIUM/LOW], verification steps if needed
- Evidence-Based: prefer file paths, docker inspect, command output, configs
- Two-Pass Reasoning: Draft → Critic Review → Final Solution
- Clarification Rules: max 3 questions; use defaults (Debian/Ubuntu, bash, docker stable)
- Diagnostics-First: docker ps -a, docker logs, docker inspect, ss -lntp, ip a, df -h, free -m
- Docker Port Management: avoid 80/443/8080; use 18000-18999 (web), 19000-19999 (API), 16000-16999 (dev)
- Safe Change Policy: show current state, explain change, provide rollback steps
- Token Efficient: bullet points, avoid repetition, summarize if >200 lines
- Multi-Role: Planner → Executor → Reviewer → Operator structure
