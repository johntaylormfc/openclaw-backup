# Docker Hygiene Check - 2026-04-19

**Time:** 07:00 (Europe/London)

## Results

| Check | Result | Status |
|-------|-------|--------|
| bc_preflight.sh | 0 issues, 29 running containers | ✅ PASS |
| Disk /home/john | 50% used (208G/444G) | ✅ OK |
| Containers | 32 running | ✅ OK |
| Images | 61 total | ✅ OK |

## Details

### Preflight (bc_preflight.sh)
- Docker daemon: reachable ✅
- Docker Compose: available ✅
- Disk space: 50% ✅
- Memory available: 9212MB ✅
- Port conflicts: none ✅
- Running containers: 29

### Disk Usage
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  444G  208G  213G  50% /
```

### Container Count
- Total: 32 (docker ps -a includes header)

### Image Count
- Total: 61 (docker images includes header)

## Notes
- No prune performed (observation only)
- Log written at 07:02 UTC