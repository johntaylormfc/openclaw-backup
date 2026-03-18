# Docker Hygiene Check — 2026-03-18

**Time:** 07:00 UTC (Europe/London)  
**Host:** Beelink

---

## 1. Preflight Script
**Status:** ❌ NOT FOUND  
`~/.openclaw/workspace/bc_reliability/scripts/bc_preflight.sh` does not exist.

---

## 2. Disk Usage
| Filesystem | Size | Used | Avail | Use% | Mounted on |
|------------|------|------|-------|------|------------|
| /dev/nvme0n1p2 | 444G | 175G | 247G | 42% | / |

**Status:** ✅ Healthy — 247GB available (42% used)

---

## 3. Container Count
- **Total (including header):** 39 lines
- **Containers running:** Check with `docker ps` for details

---

## 4. Image Count
- **Total (including header):** 54 lines
- **Images stored:** Check with `docker images` for details

---

## Summary
| Check | Status |
|-------|--------|
| Disk Space | ✅ OK |
| Containers | ℹ️ 38 (including stopped) |
| Images | ℹ️ 53 |
| Preflight Script | ❌ Missing |

---

*Observation only — no pruning performed.*
