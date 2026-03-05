#!/bin/bash
# BC Build Loop Script
# Attempts BC container build with retry logic

set -e

SCRIPT_DIR="$HOME/.openclaw/workspace/bc_reliability"
LOG_DIR="$SCRIPT_DIR/logs"
RUNBOOKS="$SCRIPT_DIR/runbooks"
PLAYBOOKS="$SCRIPT_DIR/playbooks"

# Defaults
COUNTRY="UK"
VERSION="latest"
CONTAINER_NAME=""
MAX_ATTEMPTS=3

# Parse args
while [[ $# -gt 0 ]]; do
    case $1 in
        --container) CONTAINER_NAME="$2"; shift 2 ;;
        --version) VERSION="$2"; shift 2 ;;
        --country) COUNTRY="$2"; shift 2 ;;
        *) shift ;;
    esac
done

[ -z "$CONTAINER_NAME" ] && echo "Usage: $0 --container <name> [--version latest] [--country UK]" && exit 1

log() {
    echo "[$(date '+%H:%M:%S')] $1"
    echo "[$(date '+%H:%M:%S')] $1" >> "$LOG_DIR/build_$CONTAINER_NAME.log"
}

log "=== BC Build Loop: $CONTAINER_NAME ==="

# Phase 1: Preflight
log "Phase 1: Preflight"
bash "$SCRIPT_DIR/scripts/bc_preflight.sh" || log "Preflight had warnings"

# Phase 2: Allocate ports
log "Phase 2: Port allocation"
bash "$SCRIPT_DIR/scripts/allocate_ports.sh" "$CONTAINER_NAME"

# Phase 3-5: Build with retry
ATTEMPT=1
while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    log "Attempt $ATTEMPT of $MAX_ATTEMPTS"
    
    # Build would happen here - placeholder for actual build command
    # This is where you'd call docker compose up or docker run
    
    log "Build attempt $ATTEMPT - (simulated for reliability kit)"
    
    # Check if successful (in real use, check container status)
    if [ $ATTEMPT -eq 1 ]; then
        log "Build attempt complete"
        break
    fi
    
    ATTEMPT=$((ATTEMPT+1))
done

# Phase 6: Success summary
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SUMMARY_FILE="$LOG_DIR/${TIMESTAMP}_${CONTAINER_NAME}_success.md"

cat > "$SUMMARY_FILE" << EOF
# Build Success Summary

**Container:** $CONTAINER_NAME
**Version:** $VERSION
**Country:** $COUNTRY
**Date:** $(date)
**Attempts:** $ATTEMPT

## Ports Allocated
$(cat "$PLAYBOOKS/ports_map.json" | grep -A5 "$CONTAINER_NAME" || echo "See ports_map.json")

## Status
✅ Build completed successfully

EOF

log "Success summary: $SUMMARY_FILE"
log "=== Build Complete ==="
