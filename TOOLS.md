# TOOLS.md - Local Notes

**OPERATING MODEL:** OPERATING_MODEL.md — task framing and response standards apply to all work here.

## THE SITE (Dashboard) - CRITICAL
- **URL**: http://192.168.1.146:5000 (NOT 4000!)
- Port 4000 = old static site (don't use)
- Port 5000 = NEW BC Dev Limited Dashboard with API
- Source: /home/john/ARR/dashboard-v2/
- Build: `cd /home/john/ARR/dashboard-v2 && npm run build`
- Containers: arr-dashboard (port 4000), arr-dashboard-v2 (port 5000, nginx proxy)

## Quick Links (External Access)
- Dashboard uses johntaylormfc.ddns.net
- Update in: /home/john/ARR/dashboard-v2/src/utils/index.js

## Chrome DevTools MCP
- Use for dashboard testing/debugging

## SearXNG (local search)
- http://127.0.0.1:8890

## Browser Testing (Playwright)
- Install: `cd /tmp && npm init -y > /dev/null && npm install playwright > /dev/null 2>&1`
- Run: `cd /tmp && node << 'EOF' <test_script> EOF`
- **ALWAYS test dashboard changes with Playwright before declaring fix complete**
- Test sequence: load page → navigate to section → trigger action → check for errors
- Check for console errors (`page.on('console', ...)`) and visible error messages
