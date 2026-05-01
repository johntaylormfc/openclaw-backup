# Docker Hygiene Check - 2026-05-01

**Time:** 07:00 BST  
**Host:** Beelink

## Summary

| Check | Result |
|-------|--------|
| Preflight | ✅ PASSED (0 issues) |
| Disk usage | 43% (241G available) |
| Containers | 25 running |
| Images | ~25 stored |

## Preflight Output

```
=== BC Docker Preflight Check ===
✅ Docker daemon reachable
✅ Docker Compose available
✅ Disk space OK: 43%
✅ Memory available: 23859MB
Checking port conflicts...
✅ No port conflicts in BC range
Running containers: 25
=== Preflight Complete: 0 issues ===
```

## Disk

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  444G  181G  241G  43% /
```

## Container Count

- Running: 25
- Total (including stopped): ~26

## Image Count

- Stored: ~25

## Notes

- No issues detected
- All BC containers healthy
- Disk space healthy