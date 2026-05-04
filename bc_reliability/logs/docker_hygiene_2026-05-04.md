# Docker Hygiene Check - 2026-05-04

**Time:** 07:00 (Europe/London)  
**Run:** docker-hygiene-daily-001

## Results

| Check | Status | Value |
|-------|--------|-------|
| Preflight | ✅ Pass | 0 issues |
| Disk | ✅ OK | 46% (230GB free) |
| Containers | ✅ OK | 25 running |
| Images | ✅ OK | 25 cached |

## Details

### Preflight Check
- Docker daemon: reachable
- Docker Compose: available
- Disk space: 46%
- Memory available: 21285MB
- Port conflicts: none
- Running containers: 25

### Disk Usage
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  444G  192G  230G  46% /
```

### Container Count
- Total (incl. header): 26
- Running containers: 25

### Image Count
- Total (incl. header): 26
- Cached images: 25

## Actions Taken
- Observation only - no auto-cleanup performed

## Next Check
Scheduled: 2026-05-05 07:00 UTC