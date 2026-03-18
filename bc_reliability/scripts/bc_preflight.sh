#!/bin/bash
# BC Docker Preflight Check
# Validates environment before BC container operations

LOG_FILE="$HOME/.openclaw/workspace/bc_reliability/logs/preflight_$(date +%Y%m%d_%H%M%S).md"
SUMMARY_FILE="$HOME/.openclaw/workspace/bc_reliability/logs/preflight_latest.md"

log() {
    echo "[$(date '+%H:%M:%S')] $1"
}

log "=== BC Docker Preflight Check ==="

ISSUES=0

# Docker daemon
if docker info >/dev/null 2>&1; then
    log "✅ Docker daemon reachable"
else
    log "❌ Docker daemon not reachable"
    ISSUES=$((ISSUES+1))
fi

# Docker compose
if docker compose version >/dev/null 2>&1; then
    log "✅ Docker Compose available"
else
    log "❌ Docker Compose not available"
    ISSUES=$((ISSUES+1))
fi

# Disk space
DISK_USAGE=$(df -h /home/john | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 90 ]; then
    log "✅ Disk space OK: ${DISK_USAGE}%"
else
    log "⚠️ Disk space low: ${DISK_USAGE}%"
    ISSUES=$((ISSUES+1))
fi

# Memory
MEM_AVAILABLE=$(free -m | awk 'NR==2{print $7}')
if [ "$MEM_AVAILABLE" -gt 500 ]; then
    log "✅ Memory available: ${MEM_AVAILABLE}MB"
else
    log "⚠️ Memory low: ${MEM_AVAILABLE}MB"
fi

# Port conflicts (scan BC range)
log "Checking port conflicts..."
CONFLICTS=0
for port in 18000 18001 18002 18003 18004 18005 19000 19001 19002 19003 19004 19005; do
    if netstat -tlnp 2>/dev/null | grep -q ":$port "; then
        log "⚠️ Port $port in use"
        CONFLICTS=$((CONFLICTS+1))
    fi
done
if [ "$CONFLICTS" -eq 0 ]; then
    log "✅ No port conflicts in BC range"
fi

# Container count
RUNNING=$(docker ps --format '{{.Names}}' | wc -l)
log "Running containers: $RUNNING"

# Write summary
cat > "$LOG_FILE" << EOF
# Preflight Check - $(date)

## Results

- Docker: $(docker info >/dev/null 2>&1 && echo 'OK' || echo 'FAILED')
- Compose: $(docker compose version >/dev/null 2>&1 && echo 'OK' || echo 'FAILED')
- Disk: ${DISK_USAGE}%
- Memory: ${MEM_AVAILABLE}MB free
- Port conflicts: $CONFLICTS
- Running containers: $RUNNING

## Issues Found: $ISSUES

EOF

cp "$LOG_FILE" "$SUMMARY_FILE"
log "Log written to: $LOG_FILE"
log "=== Preflight Complete: $ISSUES issues ==="
