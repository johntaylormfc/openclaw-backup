# BC Docker Fix Recipes

## Automatable Fixes

### Recipe: Port Conflict

```bash
# Find conflicting container
docker ps -a | grep <port>

# Stop and remove
docker stop <container_id>
docker rm <container_id>

# Or update compose with new port
# Edit compose file, change port mapping
```

**STOP checkpoint:** If port used by host service (nginx, apache), manual decision needed.

---

### Recipe: Network Recreate

```bash
# Find network name
docker network ls

# Inspect network
docker network inspect <network>

# Recreate if needed
docker network create <network>

# Reconnect containers
docker network connect <network> <container>
```

---

### Recipe: Image Pull Retry

```bash
# Login to registry
docker login <registry>

# Pull manually
docker pull <image>:<tag>

# If auth fails, check credentials
# NEVER log credentials - use docker logout && docker login interactively
```

---

### Recipe: Resource Cleanup (Safe)

```bash
# Check usage first
docker system df

# Safe: remove stopped containers
docker container prune -f

# Safe: remove unused networks
docker network prune -f

# SAFE: remove dangling images (not all)
docker image prune -f

# STOP - Do NOT run without manual approval:
# docker system prune -a
# docker volume prune -f
```

---

### Recipe: Permission Fix

```bash
# Check current ownership
ls -la <path>

# Fix ownership (requires host access)
chown -R john:john <path>

# STOP if chown requires sudo - request manual help
```

---

### Recipe: Healthcheck Timeout

```bash
# Inspect container health
docker inspect <container> --format='{{.State.Health}}'

# Recreate with longer timeout
docker run --health-cmd="<cmd>" --health-timeout=300s ...
```

---

## When to STOP and Request Manual Input

1. **Sudo required** - chown, docker group changes
2. **docker system prune -a** - destructive
3. **docker volume prune** - destroys data
4. **Firewall/iptables changes**
5. **Host service restarts** (nginx, apache)
6. **License file issues** - BC specific
7. **SQL Server problems** - database restore needed
