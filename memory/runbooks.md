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
