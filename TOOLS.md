# TOOLS.md

**OPERATING MODEL:** OPERATING_MODEL.md

## Dashboard (CRITICAL)
- URL: http://192.168.1.146:5000 (NOT 4000 — old static site)
- Source: /home/john/ARR/dashboard-v2/ | Build: `cd /home/john/ARR/dashboard-v2 && npm run build`
- External: johntaylormfc.ddns.net | Restart: `docker restart arr-dashboard arr-dashboard-v2`

## Quick Links
SearXNG: http://127.0.0.1:8890 | Mission Control: http://192.168.1.146:5001/

## Playwright (ALWAYS for dashboard changes)
`cd /tmp && npm init -y > /dev/null && npm install playwright > /dev/null 2>&1`
Test: load → navigate → trigger → check console errors + visible error text
