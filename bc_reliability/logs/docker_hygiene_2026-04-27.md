# Docker Hygiene Check — 2026-04-27

**Time:** 07:00 BST | 06:00 UTC  
**Host:** Beelink | Disk: 43% used

---

## Preflight Result
- Docker daemon: ✅ reachable
- Docker Compose: ✅ available
- Disk space: ✅ 43% used (244GB free of 444GB)
- Memory: ✅ 21437MB available
- Port conflicts: ✅ none in BC range
- **Issues found:** 0

---

## Containers
- **Total:** 25 running
- **Unhealthy:** `plex` (1)
- All others: healthy / normal uptime

### Status by container
| Container | Uptime | Health |
|---|---|---|
| plex | 3 days | ⚠️ unhealthy |
| omnitools | 12h | ✅ healthy |
| calibre-web | 24h | ✅ healthy |
| sonarr | 2 days | ✅ healthy |
| duplicati | 2 days | ✅ healthy |
| arr-dashboard-v2 | 2 days | ✅ healthy |
| homer | 2 days | ✅ healthy |
| portainer | 2 days | — |
| sabnzbd | 2 days | ✅ healthy |
| tautulli | 2 days | ✅ healthy |
| watchtower | 2 days | — |
| arr-webhook-notifier | 2 days | ✅ healthy |
| tdarr-node | 3 days | ✅ healthy |
| tdarr | 3 days | ✅ healthy |
| overseerr | 3 days | ✅ healthy |
| radarr | 3 days | ✅ healthy |
| readarr | 3 days | ✅ healthy |
| prowlarr | 3 days | ✅ healthy |
| flaresolverr | 3 days | ✅ healthy |
| health-watcher | 3 days | ✅ healthy |
| arr-dashboard | 3 days | ✅ healthy |
| transmission | 3 days | ✅ healthy |
| gluetun | 3 days | ✅ healthy |
| vpn-coordinator | 3 days | ✅ healthy |
| homepage | 3 days | ✅ healthy |

---

## Images
- **Total:** 24 unique images
- **Largest:** `haveagitgat/tdarr:latest` (4.2GB), `arr-arr-dashboard:latest` (1.33GB)

---

## Notes
- Plex is unhealthy — monitor or investigate.
- No action taken (observation only).