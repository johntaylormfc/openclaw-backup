#!/bin/bash
# OpenClaw Cron Error Triage Script
# Run periodically to catch and diagnose cron failures

echo "=== Cron Triage ==="
echo "Time: $(date)"
echo ""

# Check for failed cron job runs
echo "--- Failed Jobs (from jobs.json) ---"
grep -o '"id": "[^"]*"' /home/john/.openclaw/cron/jobs.json 2>/dev/null | while read id; do
  job_id=$(echo "$id" | cut -d'"' -f4)
  status=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq -r ".jobs[] | select(.id == \"$job_id\") | .state.lastStatus // .state.lastStatus // empty" 2>/dev/null)
  if [ "$status" = "error" ]; then
    name=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq -r ".jobs[] | select(.id == \"$job_id\") | .name" 2>/dev/null)
    err=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq -r ".jobs[] | select(.id == \"$job_id\") | .state.lastError // empty" 2>/dev/null)
    consec=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq -r ".jobs[] | select(.id == \"$job_id\") | .state.consecutiveErrors // 0" 2>/dev/null)
    echo "  - $name (id: $job_id)"
    echo "    consecutiveErrors: $consec, lastError: $err"
  fi
done || echo "No recent failures"
echo ""

# Check gateway health via process list
echo "--- Gateway Process ---"
pgrep -f 'openclaw.*gateway' | head -3 | xargs -I{} ps -p {} -o pid,etime,cmd 2>/dev/null || echo "Gateway not running"
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
ok_count=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq '[.jobs[] | select(.state.lastStatus == "ok")] | length' 2>/dev/null || echo 0)
err_count=$(cat /home/john/.openclaw/cron/jobs.json 2>/dev/null | jq '[.jobs[] | select(.state.lastStatus == "error")] | length' 2>/dev/null || echo 0)
echo "OK jobs: $ok_count"
echo "Error jobs: $err_count"
echo ""

echo "=== Triage Complete ==="