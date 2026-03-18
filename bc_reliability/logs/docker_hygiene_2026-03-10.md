# Docker Hygiene Check — 2026-03-10

**Time:** 07:00 UTC  
**Host:** Beelink

## Preflight Check
```
=== BC Docker Preflight Check ===
✅ Docker daemon reachable
✅ Docker Compose available
✅ Disk space OK: 40%
✅ Memory available: 20754MB
✅ No port conflicts in BC range
Running containers: 34
=== Preflight Complete: 0 issues ===
```

## Disk Usage
| Filesystem | Size | Used | Avail | Use% |
|------------|------|------|-------|------|
| /dev/nvme0n1p2 | 444G | 166G | 255G | 40% |

## Container Stats
- **Total (docker ps -a):** 42 containers
- **Running:** 34 containers

## Image Stats
- **Total images:** 53

## Metric Summary
| | Status |
|--------|--------|
| Docker daemon | ✅ OK |
| Disk space | ✅ 40% used |
| Memory | ✅ 20.7GB available |
| Containers | 42 total |
| Images | 53 total |
| Port conflicts | ✅ None |

**Result:** ✅ All checks passed — no issues detected.
