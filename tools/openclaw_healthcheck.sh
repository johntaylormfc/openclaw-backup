#!/bin/bash
# OpenClaw Healthcheck Script
# Runs hourly to capture system health state
# Outputs: JSON + Markdown

OUTPUT_JSON="$HOME/.openclaw/status/health.json"
OUTPUT_MD="$HOME/.openclaw/status/health.md"
LOG_DIR="$HOME/.openclaw/logs"
CONFIG="$HOME/.openclaw/openclaw.json"
JOBS="$HOME/.openclaw/cron/jobs.json"

TIMESTAMP=$(date -Iseconds)

# Gateway health
GATEWAY_STATUS=$(systemctl --user is-active openclaw-gateway 2>/dev/null || echo "unknown")
GATEWAY_PID=$(systemctl --user show openclaw-gateway -p MainPID --value 2>/dev/null || echo "0")

# Dashboard health
DASH_HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://192.168.1.146:5000 2>/dev/null || echo "000")

# Cron stats
CRON_ENABLED=$(cat "$JOBS" | python3 -c "import json,sys; print(len([j for j in json.load(sys.stdin)['jobs'] if j['enabled']]))" 2>/dev/null || echo "0")
CRON_ERRORS=$(cat "$JOBS" | python3 -c "import json,sys; print(len([j for j in json.load(sys.stdin)['jobs'] if j['enabled'] and j.get('state',{}).get('lastStatus') == 'error']))" 2>/dev/null || echo "0")

# MiniMax-only compliance (using Python for precision)
MINIMAX_CHECK=$(python3 - "$CONFIG" << 'PYEOF'
import json, sys
with open(sys.argv[1]) as f:
    d = json.load(f)
providers = d.get('models', {}).get('providers', {})
auth = d.get('auth', {}).get('profiles', {})
aliases = d.get('agents', {}).get('defaults', {}).get('models', {}).get('aliases', {})
issues = []
if 'anthropic' in providers: issues.append('anthropic provider')
if 'openrouter' in providers: issues.append('openrouter provider')
if 'anthropic:default' in auth: issues.append('anthropic auth')
for k in aliases:
    if 'anthropic' in k.lower() or 'claude' in k.lower():
        issues.append(f'alias:{k}')
print('issues' if issues else 'compliant')
PYEOF
)
MINIMAX_STATUS="$MINIMAX_CHECK"

# Root-owned files in workspace
ROOT_FILES=$(find "$HOME/.openclaw/workspace" -user root 2>/dev/null | wc -l)

# Disk usage
DISK_USAGE=$(df -h "$HOME" | tail -1 | awk '{print $5}')

# Recent errors (last 20 lines)
RECENT_ERRORS=$(tail -20 "$LOG_DIR/error.log" 2>/dev/null | head -10 || echo "No error.log")

# Generate JSON
cat > "$OUTPUT_JSON" << JSONEOF
{
  "timestamp": "$TIMESTAMP",
  "gateway": {
    "status": "$GATEWAY_STATUS",
    "pid": "$GATEWAY_PID"
  },
  "dashboard": {
    "http_code": $DASH_HTTP
  },
  "cron": {
    "enabled_jobs": $CRON_ENABLED,
    "error_jobs": $CRON_ERRORS
  },
  "minimax_compliance": "$MINIMAX_STATUS",
  "workspace": {
    "root_owned_files": $ROOT_FILES
  },
  "disk_usage_percent": "$DISK_USAGE"
}
JSONEOF

# Generate Markdown
cat > "$OUTPUT_MD" << MDEOF
# OpenClaw Health Status

**Timestamp:** $TIMESTAMP

## Gateway
- Status: $GATEWAY_STATUS
- PID: $GATEWAY_PID

## Dashboard
- HTTP Code: $DASH_HTTP

## Cron Jobs
- Enabled: $CRON_ENABLED
- Errors: $CRON_ERRORS

## MiniMax Compliance
- Status: $MINIMAX_STATUS

## Workspace
- Root-owned files: $ROOT_FILES

## Disk
- Usage: $DISK_USAGE

## Recent Errors (redacted)
\`\`\`
$RECENT_ERRORS
\`\`\`
MDEOF

echo "Healthcheck complete: $OUTPUT_JSON, $OUTPUT_MD"
