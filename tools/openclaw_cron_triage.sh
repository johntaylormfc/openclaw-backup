#!/bin/bash
# OpenClaw Cron Error Triage Script
# Run periodically to catch and diagnose cron failures

echo "=== Cron Triage ==="
echo "Time: $(date)"
echo ""

# Check gateway status
echo "--- Gateway Status ---"
openclaw gateway status 2>&1 || echo "Gateway check failed"
echo ""

# Check for failed cron jobs
echo "--- Recent Cron Runs ---"
cron action=list 2>&1 | head -30
echo ""

# Check gateway logs for errors
echo "--- Recent Errors (last 50 lines) ---"
journalctl --user -u openclaw-gateway -n 50 --no-pager 2>/dev/null | grep -iE "(error|failed|exception|critical)" | tail -20 || echo "No recent errors in journal"
echo ""

# Check cron scheduler status
echo "--- Cron Scheduler ---"
cron action=status 2>&1
echo ""

# Summary
echo "=== Triage Complete ==="
