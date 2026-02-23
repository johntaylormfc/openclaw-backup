# Dashboard Change Guidelines

## ⚠️ CRITICAL: NEVER DELETE OR REPLACE THE DATABASE
- No exceptions
- No matter what issue
- Data loss is worse than broken features
- If DB is corrupted, fix the code, not the data

## Database Path
- Use `/data/dashboard.db` (mounted from host)
- NOT `/tmp/dashboard.db` (not writable)
- Use `/app/data/dashboard.db` for app-internal copies

## NEVER Do These
- ❌ Edit files inside running container (`docker exec`)
- ❌ Restore database to fix UI issues
- ❌ Deploy without syntax check
- ❌ Delete database for any reason

## ALWAYS Do These
- ✅ Edit local files only (`/home/john/ARR/dashboard/`)
- ✅ Backup DB before any change
- ✅ Run syntax check before deploy
- ✅ Run smoke test after deploy
- ✅ Log changes in CHANGE_LOG.md
- ✅ Snapshot after successful fix

## Safe Deploy Workflow

```bash
# 1. Make your changes to local files
# 2. Deploy safely
/home/john/ARR/scripts/deploy-dashboard.sh

# 3. If fails, restore DB:
cp /home/john/ARR/backups/pre-deploy-db-*.db /home/john/.openclaw/workspace/dashboard-data/
docker restart arr-dashboard
```

## Quick Commands

```bash
# Safe deploy
deploy-dashboard

# Run smoke tests
smoke-test

# Manual backup
backup-dashboard

# View change log
cat /home/john/ARR/dashboard/CHANGE_LOG.md
```

## Scripts Location
- `/home/john/ARR/scripts/deploy-dashboard.sh` - Safe deploy
- `/home/john/ARR/scripts/smoke-test.sh` - Smoke tests
- `/home/john/ARR/scripts/backup-dashboard.sh` - Backup
- `/home/john/ARR/scripts/restore-ui.sh` - Restore UI only (NOT DB)
