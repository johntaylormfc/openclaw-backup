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

## Setup
- Dashboard (old): http://192.168.1.146:4000
- DB: /data/dashboard.db (NOT /tmp - persistent across restarts)
- Container: arr-dashboard

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
- **Email to Todoist**: Failing - needs Gmail OAuth refresh token (remind john to fix)

## Key Patterns & Learnings
- **Never restore database to fix UI issues** - debug actual issue instead
- Use Chrome DevTools MCP for dashboard debugging
- Kanban ideas column works well as task capture
- **gdrive-sync recurring failures**: Service Account quota limits causing 5/6 file upload failures - may need to space out uploads or use different auth method
- **Gmail OAuth tokens expire frequently**: Need periodic re-authentication or refresh token mechanism
- **Container file persistence**: Critical host files (like /tmp/trading.json) may not exist in containers - always verify file presence when debugging API issues
- **Session linking works**: Linking dmScope to "main" successfully shared context between WhatsApp and webchat

## Known Issues
- Exec tool can hang after system compaction

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

## Memory System
- Daily notes: memory/YYYY-MM-DD.md — raw session logs, written automatically, load on-demand
- MEMORY.md: curated long-term brain — load every heartbeat (~3K tokens)
- projects.md: compact project registry — load every heartbeat (~1K tokens)
- Vector DB: PostgreSQL + pgvector, semantic search via AI embeddings
- Smart loading: only projects.md + MEMORY.md at startup. Daily notes + vector search = on-demand only. Saves ~80% token cost vs loading everything.

Last updated: 2026-03-04
