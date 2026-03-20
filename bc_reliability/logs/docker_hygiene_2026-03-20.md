# Docker Hygiene Check - 2026-03-20

**Time:** 07:00 UTC  
**Host:** Beelink

---

## 1. Preflight Check (`bc_preflight.sh`)

| Check | Status |
|-------|--------|
| Docker daemon | ✅ Reachable |
| Docker Compose | ✅ Available |
| Disk space | ✅ OK (42%) |
| Memory | ✅ Available (20510MB) |
| Port conflicts | ✅ None in BC range |

**Running containers:** 31  
**Preflight result:** ✅ 0 issues

---

## 2. Disk Usage

| Filesystem | Size | Used | Avail | Use% |
|------------|------|------|-------|------|
| /dev/nvme0n1p2 | 444G | 174G | 248G | 42% |

**Status:** ✅ Healthy (42% used)

---

## 3. Container Count

- **Total (including header):** 33 lines
- **Running containers:** 31

---

## 4. Image Count

- **Total (including header):** 54 lines  
- **Images:** ~53

---

## Summary

| Metric | Value | Status |
|--------|-------|--------|
| Preflight | 0 issues | ✅ |
| Disk usage | 42% | ✅ |
| Containers | 31 running | ✅ |
| Images | ~53 | ✅ |

**Overall Status:** ✅ All checks passed
