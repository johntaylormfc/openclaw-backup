# TOOLS.md - Local Notes

## THE SITE (Dashboard) - CRITICAL
- **URL**: http://192.168.1.146:5000 (NOT 4000!)
- Port 4000 = old static site (don't use)
- Port 5000 = NEW BC Dev Limited Dashboard with API
- Source: /home/john/ARR/dashboard-v2/
- Build: `cd /home/john/ARR/dashboard-v2 && npm run build`
- Containers: arr-dashboard (port 4000, API), arr-dashboard-v2 (port 5000, nginx proxy)

## Chrome DevTools MCP
- Use for dashboard testing/debugging
- `browser action=start profile=chrome` → snapshot → act

## TTS
- Voice: "Nova"

## SearXNG (local search)
- http://127.0.0.1:8890

## Quick Links (External Access)
The dashboard uses johntaylormfc.ddns.net for quick links when accessed externally.
Update in: /home/john/ARR/dashboard-v2/src/utils/index.js
