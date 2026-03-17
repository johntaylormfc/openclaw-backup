# Runbooks

> **Last updated:** 2026-03-17 17:14 UTC

---

## Quick Health Check

```bash
# Gateway running?
openclaw gateway status

# No errors?
openclaw doctor

# Cron healthy?
openclaw cron status

# Dashboard?
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/
```

---

## Post-Reboot

```bash
systemctl --user start openclaw-gateway.service
sleep 10
openclaw gateway status
```

---

## Fix Lock Error

```bash
# Find locks
find ~/.openclaw -maxdepth 4 -type f -iname '*lock*'

# If process dead, remove lock
rm ~/.openclaw/agents/main/sessions/<session-id>.jsonl.lock
```

---

## Fix Permissions

```bash
sudo chown -R $(whoami):$(whoami) ~/.openclaw
find ~/.openclaw -maxdepth 6 -type d -exec chmod u+rwx,go-rwx {} \;
find ~/.openclaw -maxdepth 6 -type f -exec chmod u+rw,go-rwx {} \;
```

---

## Backup Memory

```bash
tar -czf ~/openclaw-backups/memory-$(date +%Y%m%d).tgz ~/.openclaw/workspace/memory/
cp ~/.openclaw/memory/main.sqlite ~/.openclaw/memory/main.sqlite.$(date +%Y%m%d)
```

---

## Harbor Runbooks (Curated Mirror)

### OpenClaw Ops Runbook
- **Location:** `~/.openclaw/workspaces/bcdevltd/harbor/40-runbooks/openclaw_ops_runbook.md`
- **Contents:** Start/stop gateway, config locations, cron management, fix lock errors, fix permissions, ports

### Restore Log
- **Location:** `~/.openclaw/workspaces/bcdevltd/harbor/40-runbooks/restore_log.md`
- **Contents:** Step-by-step restore from backup, ownership fixes, cron restore

### Memory Health
- **Location:** `~/.openclaw/workspaces/bcdevltd/harbor/40-runbooks/memory_health.md`
- **Contents:** Memory audit, why semantic search disabled (no embedding provider), weekly checks

### Daily Ops
- **Location:** `~/.openclaw/workspaces/bcdevltd/harbor/40-runbooks/daily_ops.md`
- **Contents:** Today's checks, blockers, approvals needed

### Backlog
- **Location:** `~/.openclaw/workspaces/bcdevltd/harbor/10-tickets/BACKLOG.md`
- **Contents:** Prioritized tickets, backlog, done items
