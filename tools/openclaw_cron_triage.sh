#!/bin/bash
# OpenClaw Cron Error Triage Script
# Run this when cron jobs enter error state
# Creates triage report and optionally notifies

TRIAGE_DIR="$HOME/.openclaw/status/triage"
JOBS="$HOME/.openclaw/cron/jobs.json"
LOG_DIR="$HOME/.openclaw/logs"

TIMESTAMP=$(date -Iseconds)
DATE=$(date +%Y-%m-%d)

# Find jobs in error
ERROR_JOBS=$(cat "$JOBS" | python3 -c "
import json, sys
jobs = json.load(sys.stdin)['jobs']
for j in jobs:
    if j.get('enabled') and j.get('state',{}).get('lastStatus') == 'error':
        print(f\"{j['id']}|{j['name']}|{j['state'].get('lastError','unknown')}\")
" 2>/dev/null)

if [ -z "$ERROR_JOBS" ]; then
    echo "No cron errors found"
    exit 0
fi

echo "Found cron errors:"
echo "$ERROR_JOBS"

# For each error job, create a triage report
echo "$ERROR_JOBS" | while IFS='|' read -r id name error; do
    REPORT_FILE="$TRIAGE_DIR/${DATE}_${id}.md"
    
    cat > "$REPORT_FILE" << EOF
# Cron Error Triage

**Date:** $TIMESTAMP
**Job:** $name
**Error:** $error

## Investigation

1. Check job definition
2. Review recent logs
3. Attempt restart if safe

## Notes

- Last run status: error
- Check if delivery target exists
- Verify service availability

EOF

    echo "Created triage report: $REPORT_FILE"
done

echo "Triage complete"
