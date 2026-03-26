# Docker Hygiene Check — 2026-03-26

**Time:** 07:00 UTC (Europe/London)  
**Check:** Daily Docker Hygiene

---

## Results

| Check | Status | Value |
|-------|--------|-------|
| Docker Daemon | ✅ Reachable | — |
| Docker Compose | ✅ Available | — |
| Disk Space | ✅ OK | 47% (226G free of 444G) |
| Memory | ✅ Available | 10728MB |
| Port Conflicts | ✅ None | BC range clear |
| Running Containers | ✅ | 36 |
| Total Containers | ✅ | 37 (1 stopped) |
| Docker Images | ⚠️ | 60 |

---

## Preflight Summary
- **Preflight:** 0 issues
- **Log:** `/home/john/.openclaw/workspace/bc_reliability/logs/preflight_20260326_070139.md`

---

## Notes
- No port conflicts in Business Central range
- 60 Docker images present (consider cleanup if unused)
- 37 total containers (36 running, 1 stopped)
- Disk usage at 47% — healthy

**Next Run:** Tomorrow 07:00 UTC
