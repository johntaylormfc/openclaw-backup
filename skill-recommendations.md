# Top 10 Skill Recommendations for John

## Context
Based on what I know about John:
- Runs *ARR stack (Sonarr, Radarr, Prowlarr, Plex) in Docker
- Has dashboard at 192.168.1.146:4000
- Uses GitHub (johntaylormfc/arr-dashboard)
- Interested in Home Automation (Home Assistant)
- Uses Business Central
- Active OpenClaw user with multiple cron jobs

---

## 1. ARR Stack Health Monitor 🐳
**What it does:** Monitors Docker Compose stack health, auto-restarts failed containers, tracks service status  
**Why it matters:** Your ARR apps are critical - downtime means missed media. Auto-healing prevents manual intervention.  
**How often:** Continuous (cron every 5 min)  
**Priority: HIGH** ✅ Built tonight

---

## 2. Docker Resource Monitor 📊
**What it does:** Tracks CPU, memory, disk I/O for all containers. Alerts on thresholds, logs trends.  
**Why it matters:** Prevent resource exhaustion before it crashes services. NVMe optimization for Plex.  
**How often:** Continuous (cron every 10 min)  
**Priority: HIGH** ✅ Built tonight

---

## 3. GitHub Repo Automation ⚡
**What it does:** Auto-reviews PRs, runs CI checks, summarizes issues, creates branches.  
**Why it matters:** You have arr-dashboard repo - automate the GitHub workflow.  
**How often:** On-demand + hourly scans  
**Priority: HIGH**

---

## 4. Home Assistant Integration 🏠
**What it does:** Monitors HA for automation failures, entity status, logs errors.  
**Why it matters:** You have smart home setup - get alerts before things break.  
**How often:** Continuous  
**Priority: MEDIUM**

---

## 5. Media Release Calendar 📅
**What it does:** Tracks upcoming TV/movie releases from Radarr/Sonarr, syncs to calendar.  
**Why it matters:** Never miss a release, plan watching schedule.  
**How often:** Daily scan  
**Priority: MEDIUM**

---

## 6. Security Vulnerability Scanner 🔒
**What it does:** Scans Docker images for CVEs, checks for outdated containers.  
**Why it matters:** Security hardening - know vulnerabilities before they're exploited.  
**How often:** Weekly  
**Priority: MEDIUM**

---

## 7. Plex Optimization Assistant 🎬
**What it does:** Monitors transcoding, library scans, optimizes RAM/shm settings.  
**Why it matters:** Better Plex performance, NVMe + RAM transcoding setup.  
**How often:** Weekly  
**Priority: MEDIUM**

---

## 8. Multi-Server Health Monitor 🌐
**What it does:** Checks health of multiple servers (dashboard, ARR, SearXNG, etc.)  
**Why it matters:** Centralized monitoring across your infrastructure.  
**How often:** Continuous  
**Priority: LOW**

---

## 9. Cost & Usage Tracker 💰
**What it does:** Tracks Docker resource usage, estimates electricity costs, storage growth.  
**Why it matters:** Understand home server costs over time.  
**How often:** Daily  
**Priority: LOW**

---

## 10. Content Curator 🎯
**What it does:** Monitors for new content in your genres, researches trending media.  
**Why it matters:** Proactively fills your library with relevant content.  
**How often:** Daily  
**Priority: LOW**

---

## Skills Built Tonight

### 1. ARR Stack Health Monitor
- Location: `/home/john/openclaw/skills/arr-health/`
- Monitors: `docker ps --format "{{.Names}}" | grep -E 'sonarr|radarr|prowlarr|plex|qbittorrent|flare|bbarr'`
- Auto-restart on failure
- WhatsApp alert on failure

### 2. Docker Resource Monitor
- Location: `/home/john/openclaw/skills/docker-stats/`
- Uses: `docker stats --no-stream --format "{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"`
- Logs to SQLite
- Alerts on CPU > 80% or Memory > 90%
