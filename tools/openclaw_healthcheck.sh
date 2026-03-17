#!/bin/bash
# OpenClaw Health Check Script
# Run via cron: hourly health snapshot

echo "=== OpenClaw Health Check ==="
echo "Time: $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo ""

# Gateway Status
echo "--- Gateway Status ---"
openclaw gateway status 2>&1 | head -20
echo ""

# System Resources
echo "--- System Resources ---"
echo "Disk usage:"
df -h / | tail -1 | awk '{print "  Used: " $3 " / " $2 " (" $5 ")"}'
echo "Memory usage:"
free -h | awk '/^Mem:/ {print "  Used: " $3 " / " $2}'
echo ""

# Recent Errors (last hour)
echo "--- Recent Errors (last hour) ---"
LOG_FILE="/tmp/openclaw/openclaw-$(date +%Y-%m-%d).log"
if [ -f "$LOG_FILE" ]; then
    ERRORS=$(grep -i "error\|exception\|fail" "$LOG_FILE" 2>/dev/null | tail -5)
    if [ -n "$ERRORS" ]; then
        echo "$ERRORS"
    else
        echo "  No recent errors"
    fi
else
    echo "  Log file not found"
fi
echo ""

# Uptime
echo "--- Uptime ---"
uptime | sed 's/^/  /'
echo ""

echo "=== Check Complete ==="
