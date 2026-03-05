# BC Failure Playbook

## Living Catalog of Failures and Fixes

This playbook captures known failure signatures and their proven solutions.

---

## Port Conflicts

### Signature
```
Error: bind: address already in use
Ports: 8080, 443, or custom port
```

### Evidence Required
- `docker ps -a` output
- `netstat -tlnp | grep <port>`
- Container logs

### Likely Causes
- Previous container not cleaned up
- Another service using same port
- Port range exhaustion

### Fix Recipe
1. Find conflicting container: `docker ps -a | grep <port>`
2. Stop/remove: `docker stop <id> && docker rm <id>`
3. Or update ports in compose and re-run

---

## Docker Network/DNS Failures

### Signature
```
Error: network not found
DNS resolution failed for: <container>
```

### Evidence Required
- `docker network ls`
- `docker network inspect <network>`
- Container network settings

### Fix Recipe
1. Recreate network: `docker network create <network>`
2. Reconnect containers: `docker network connect <network> <container>`
3. Check docker-compose networks section

---

## Image Pull/Auth Failures

### Signature
```
Error: image pull failed
unauthorized: authentication required
```

### Evidence Required
- `docker images | grep <image>`
- Registry auth status
- Image tags

### Fix Recipe
1. Login to registry: `docker login <registry>`
2. Use correct tag: latest vs specific version
3. Check credentials not expired

---

## Container Healthcheck Failures

### Signature
```
Error: container healthcheck never healthy
Status: starting | unhealthy
```

### Evidence Required
- `docker inspect <container> --format='{{.State.Health}}'`
- Container logs: `docker logs <container>`

### Fix Recipe
1. Check healthcheck script in Dockerfile
2. Increase timeout if service starts slow
3. Check service logs for startup errors

---

## BC Service Tier Failures

### Signature
```
Error: Business Central service did not start
HTTP 500 from service
```

### Evidence Required
- Container logs
- SQL Server connectivity
- License file status

### Fix Recipe
1. Check SQL connection string
2. Verify license file mounted correctly
3. Wait for dependent services (SQL, AD)
4. Check event viewer in container

---

## Credential Errors

### Signature
```
Error: authentication failed
invalid credentials
```

### Fix Recipe
1. Verify credentials in environment/secrets
2. Check credential format (username@domain)
3. Use container-specific credentials
4. Never log passwords - redact in all outputs

---

## Resource Exhaustion

### Signature
```
Error: no space left on device
OOM: cannot allocate memory
```

### Evidence Required
- `df -h` on host
- `docker system df`
- Container resource limits

### Fix Recipe
1. Clean stopped containers: `docker container prune`
2. Clean unused volumes: `docker volume prune`
3. DO NOT run `docker system prune -a` without manual approval
4. Add disk space monitoring

---

## TLS/Certificate Errors

### Signature
```
Error: certificate invalid
SSLHandshakeException
```

### Fix Recipe
1. Check certificate files mounted
2. Verify hostname matches certificate
3. Use valid certificates (not self-signed for production)

---

## Permission Issues

### Signature
```
Error: permission denied
access denied to path
```

### Evidence Required
- `ls -la` on host path
- Container user in Dockerfile

### Fix Recipe
1. Check file ownership (not root:root)
2. Fix: `chown -R john:john <path>`
3. Add user to docker group if needed

---

## Learning Log

| Date | Issue | Fix Applied | Worked? |
|------|-------|--------------|---------|
| 2026-03-05 | Created playbook | - | - |
