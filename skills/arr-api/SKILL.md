# ARR API Health Skill

## Purpose
Wraps Sonarr, Radarr, Prowlarr, Plex, Tautulli, SABnzbd, qBittorrent, and Transmission REST APIs into discoverable tool calls. Enables OpenClaw agents (including cron and webhook-triggered runs) to check health, query download queues, fetch library stats, trigger rescans, and answer ARR status questions conversationally.

## Service Endpoints
| Service | URL | API Key |
|---------|-----|---------|
| Sonarr | http://192.168.1.146:8989 | e990b7b615554edeaca78919ade1e975 |
| Radarr | http://192.168.1.146:7878 | a43e5fe67a7d45c7a488aaa93c78f0a1 |
| Prowlarr | http://192.168.1.146:9696 | 17756336779d494b92c56ac4095dab9a |
| Plex | http://192.168.1.146:32400 | (managed via token) |
| Tautulli | http://192.168.1.146:8181 | (api_key in config) |
| SABnzbd | http://192.168.1.146:8080 | (from config) |
| qBittorrent | http://192.168.1.146:8081 | (admin:admin) |
| Transmission | http://192.168.1.146:9091 | (transmission) |

## Operations

### sonarr_health
Check Sonarr system health.
```bash
curl -s "http://192.168.1.146:8989/api/v3/health?apiKey=e990b7b615554edeaca78919ade1e975"
```

### sonarr_queue
List Sonarr download queue (pending/failed/warning).
```bash
curl -s "http://192.168.1.146:8989/api/v3/queue?apiKey=e990b7b615554edeaca78919ade1e975&includeUnknown=true"
```

### sonarr_system_status
Get Sonarr version and sync status.
```bash
curl -s "http://192.168.1.146:8989/api/v3/system/status?apiKey=e990b7b615554edeaca78919ade1e975"
```

### sonarr_rescan
Trigger a series scan (by root folder).
```bash
# First get root folders
curl -s "http://192.168.1.146:8989/api/v3/rootfolder?apiKey=e990b7b615554edeaca78919ade1e975"
# Then trigger rescan
curl -s -X POST "http://192.168.1.146:8989/api/v3/command?apiKey=e990b7b615554edeaca78919ade1e975" \
  -H "Content-Type: application/json" \
  -d '{"name":"RescanSeries","rootFolderPaths":["/data"]}'
```

### radarr_health
Check Radarr system health.
```bash
curl -s "http://192.168.1.146:7878/api/v3/health?apiKey=a43e5fe67a7d45c7a488aaa93c78f0a1"
```

### radarr_queue
List Radarr download queue.
```bash
curl -s "http://192.168.1.146:7878/api/v3/queue?apiKey=a43e5fe67a7d45c7a488aaa93c78f0a1&includeUnknown=true"
```

### radarr_system_status
Get Radarr version and disk space.
```bash
curl -s "http://192.168.1.146:7878/api/v3/system/status?apiKey=a43e5fe67a7d45c7a488aaa93c78f0a1"
```

### radarr_rescan
Trigger a movie rescan.
```bash
curl -s -X POST "http://192.168.1.146:7878/api/v3/command?apiKey=a43e5fe67a7d45c7a488aaa93c78f0a1" \
  -H "Content-Type: application/json" \
  -d '{"name":"RescanMovie","movieIds":[null]}'
```

### prowlarr_indexers
List all indexers and their status.
```bash
curl -s "http://192.168.1.146:9696/api/v1/indexer?apiKey=17756336779d494b92c56ac4095dab9a"
```

### prowlarr_health
Check Prowlarr system health.
```bash
curl -s "http://192.168.1.146:9696/api/v1/health?apiKey=17756336779d494b92c56ac4095dab9a"
```

### plex_library_stats
Get Plex library sections and total content.
```bash
# Get libraries
curl -s "http://192.168.1.146:32400/library/sections?X-Plex-Token=<token>"
```

### plex_now_playing
Get currently playing media.
```bash
curl -s "http://192.168.1.146:32400/status/sessions?X-Plex-Token=<token>"
```

### tautulli_activity
Get current Plex activity via Tautulli.
```bash
curl -s "http://192.168.1.146:8181/api/v2?apikey=<key>&cmd=get_activity"
```

### tautulli_library_stats
Get library statistics.
```bash
curl -s "http://192.168.1.146:8181/api/v2?apikey=<key>&cmd=get_library_stats"
```

### tautulli_watchdog
Get watchdog notifications (recent threshold alerts).
```bash
curl -s "http://192.168.1.146:8181/api/v2?apikey=<key>&cmd=get_watchdog_stats"
```

### sabnzbd_queue
Get SABnzbd queue and history.
```bash
curl -s "http://192.168.1.146:8080/api?output=json&apikey=<key>&mode=queue"
curl -s "http://192.168.1.146:8080/api?output=json&apikey=<key>&mode=history"
```

### qbittorrent_torrents
List active torrents with seeding stats.
```bash
curl -s -u "admin:admin" "http://192.168.1.146:8081/api/v2/torrents?filter=active&hashes=true"
```

### transmission_torrents
List active torrents with seeder counts.
```bash
curl -s -H "X-Transmission-Session-Id: <session_id>" \
  -d '{"method":"torrent-get","arguments":{"fields":["name","percentDone","seeders","peers"]}}' \
  http://192.168.1.146:9091/transmission/rpc
```

### stack_overview
Combined health check of all services. Returns a summary report.
```
Checks: Sonarr health, Radarr health, Prowlarr indexers, Transmission status, Dashboard
Sends: WhatsApp alert if any service is down/unhealthy
```

## WhatsApp Alert Integration
To send alerts via WhatsApp, use the mission-control webhook:
```bash
curl -s -X POST "http://192.168.1.146:5001/webhook/whatsapp" \
  -H "Content-Type: application/json" \
  -d '{"message":"ARR Stack Alert: <service> is unhealthy","to":"+447967688452"}'
```

## Cron Usage
For hourly monitoring via OpenClaw cron, use `exec` tool with the above curl commands and parse responses for failures.

## Error Suppression
For alert suppression (once/day per error type), track last-alerted timestamp in:
`/home/john/.openclaw/workspace/arr-alert-state.json`
