# ARR_Bot Memory

## CRITICAL: The Site (Dashboard)
- **URL**: http://192.168.1.146:5000 (THIS IS "THE SITE" - not port 4000!)
- Port 4000 = old dashboard (static, no API)
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

## Key Patterns & Learnings
- **Never restore database to fix UI issues** - debug actual issue instead
- Use Chrome DevTools MCP for dashboard debugging
- Kanban ideas column works well as task capture

## Known Issues
- Exec tool can hang after system compaction

## Today's Events (2026-03-02)
- X Growth Bot fully removed (directory, cron jobs, dashboard section)
- Trading bot RSI thresholds widened: 35/65 → 25/75 (more trades)
- Google OAuth re-authenticated - Gmail API working
- Tested WhatsApp messaging - working
