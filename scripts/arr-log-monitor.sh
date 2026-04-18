#!/bin/bash
# ARR Log Monitor — scans ARR container logs for errors/warnings and alerts
# Usage: ./arr-log-monitor.sh [--dry-run]
# Runs via cron: every 30 min

set -uo pipefail

ALERT_MODE="${1:-}"
TOKEN="hx4nEu4W2ZoXsiEfWRCAQcgDsNzzht7kpBUfsGHhqxzEsgHhLll2g39woASs1c"
WHATSAPP_URL="http://192.168.1.146:5001/webhook/whatsapp"
STATE_FILE="/home/john/.openclaw/workspace/arr-log-alert-state.json"
LOG_FILE="/home/john/.openclaw/workspace/logs/arr-log-monitor.log"
SINCE_MINUTES="${SINCE_MINUTES:-30}"

# Containers to monitor (in order of priority)
CONTAINERS="sonarr radarr prowlarr sabnzbd transmission flaresolverr readarr bazarr ombi overseerr jellyseerr tautulli"

# Error patterns (case-insensitive)
ERROR_PATTERNS="error|failed|fatal|crash|killed|unhealthy|timeout|permission denied|disk full|no space left"
# Known benign / already-monitored issues to suppress
IGNORE_PATTERNS="SocketException|symbolic link.*file exists|HttpClient.*HTTP Error|CancellationToken|stack trace|System\.Net\.|at System\.|at NzbDrone|An admin is not configured|Indexer is disabled till.*due to recent failures"

# Cooldown: don't re-alert for same issue within this many seconds
COOLDOWN=3600

mkdir -p "$(dirname "$LOG_FILE")" "$(dirname "$STATE_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M')] $*" >> "$LOG_FILE"
}

send_alert() {
    local container="$1"
    local error_count="$2"
    local sample_error="$3"
    local msg="ARR Log Alert: ${container^^} — ${error_count} error(s) in last ${SINCE_MINUTES}min. Sample: ${sample_error:0:100}"

    if [ "$ALERT_MODE" = "--dry-run" ]; then
        echo "[DRY-RUN] Would send: $msg"
        return
    fi

    curl -s -X POST "$WHATSAPP_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "{\"message\":\"$msg\",\"to\":\"+447967688452\"}" > /dev/null 2>&1
    log "ALERT SENT: $msg"
}

check_container() {
    local container="$1"
    local now_secs
    now_secs=$(date +%s)
    local key_prefix="${container}_alert"

    # Check if container is running
    if ! docker ps --format '{{.Names}}' 2>/dev/null | grep -q "^${container}$"; then
        return
    fi

    # Get recent log lines
    local logs
    logs=$(docker logs --since "${SINCE_MINUTES}m" --tail 100 "$container" 2>&1 | tail -50)
    [ -z "$logs" ] && return

    # Find error lines (excluding cosmetic/known benign messages and blank lines)
    local error_lines
    error_lines=$(echo "$logs" | grep -iE "$ERROR_PATTERNS" 2>/dev/null | grep -viE "$IGNORE_PATTERNS" | grep -v '^$' || true)
    [ -z "$error_lines" ] && return

    local error_count
    error_count=$(echo "$error_lines" | grep -c . || true)
    [ "$error_count" -eq 0 ] && return
    [ "$error_count" -eq 0 ] && return

    # Get the most recent/serious error (strip binary noise)
    local sample
    sample=$(echo "$error_lines" | tail -1 | tr -cd '[:print:]\n' | head -c 150)

    # Check cooldown
    local last_alert_ts=0
    if [ -f "$STATE_FILE" ]; then
        last_alert_ts=$(python3 -c "
import json, sys
try:
    d = json.load(open('$STATE_FILE'))
    print(d.get('containers', {}).get('$container', {}).get('last_alert', 0))
except: print(0)
" 2>/dev/null || echo "0")
    fi

    local age=$((now_secs - last_alert_ts))
    if [ "$age" -gt "$COOLDOWN" ]; then
        send_alert "$container" "$error_count" "$sample"
        # Update state — save last_alert for this container
        python3 -c "
import json, sys, os

state_file = '$STATE_FILE'
try:
    with open(state_file) as f:
        state = json.load(f)
except:
    state = {'containers': {}}

if '$container' not in state['containers']:
    state['containers']['$container'] = {}
state['containers']['$container']['last_alert'] = $now_secs
state['containers']['$container']['sample'] = '${sample//\'/\"}'
state['last_run'] = '$(date -u +%Y-%m-%dT%H:%M:%SZ)'

with open(state_file, 'w') as f:
    json.dump(state, f)
" 2>/dev/null
    else
        log "Suppressed (${container}, cooldown ${age}s < ${COOLDOWN}s)"
    fi
}

log "=== ARR Log Monitor run ==="

for container in $CONTAINERS; do
    check_container "$container"
done

log "Run complete at $(date)"
