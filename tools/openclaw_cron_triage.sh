#!/bin/bash
# OpenClaw Cron Error Triage Script
# Run periodically to catch and diagnose cron failures

echo "=== Cron Triage ==="
echo "Time: $(date)"
echo ""

# Check for failed cron job runs
echo "--- Failed Jobs (from jobs.json) ---"
grep -A 20 '"lastStatus": "error"' /home/john/.openclaw/cron/jobs.json 2>/dev/null | grep -E '"name"|"lastError"|"consecutiveErrors"' | paste - - -d' ' || echo "No recent failures"
echo ""

# Check gateway health via process list
echo "--- Gateway Process ---"
pgrep -la openclaw-gateway | head -3 || echo "Gateway not running"
echo ""

# Check recent cron run logs for errors
echo "--- Recent Error Logs (last 5 runs) ---"
ls -t /home/john/.openclaw/cron/runs/*.jsonl 2>/dev/null | head -5 | while read f; do
  echo "=== $(basename $f) ==="
  grep -iE "(error|failed|exception|timeout)" "$f" 2>/dev/null | tail -3 || echo "No errors"
done
echo ""

# Quick cron state check
echo "--- Quick Status ---"
grep -c '"lastStatus": "ok"' /home/john/.openclaw/cron/jobs.json 2>/dev/null | xargs -I{} echo "OK jobs: {}"
grep -c '"lastStatus": "error"' /home/john/.openclaw/cron/jobs.json 2>/dev/null | xargs -I{} echo "Error jobs: {}"
echo ""

echo "=== Triage Complete ==="