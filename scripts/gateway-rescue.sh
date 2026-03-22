#!/bin/bash
#
# OpenClaw Gateway Rescue
# Usage: bash gateway-rescue.sh [--dry-run]
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
  DRY_RUN=true
  echo -e "${YELLOW}[DRY RUN]${NC} No changes will be made.\n"
fi

echo -e "${BLUE}=== OpenClaw Gateway Rescue ===${NC}\n"

ISSUES_FOUND=0
FIXES_APPLIED=0

log_issue() {
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo -e "${YELLOW}⚠ Issue: $1${NC}"
}

log_fix() {
  FIXES_APPLIED=$((FIXES_APPLIED + 1))
  echo -e "${GREEN}✓ Fixed: $1${NC}"
}

log_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

log_fail() {
  echo -e "${RED}✗ Failed: $1${NC}"
}

# === CHECK 1: Gateway process ===
log_info "Checking gateway process..."

if systemctl --user is-active openclaw-gateway >/dev/null 2>&1; then
  log_info "Gateway service: running"
elif pgrep -f "openclaw" >/dev/null 2>&1; then
  log_issue "Gateway process running but systemctl service is not active"
else
  log_issue "Gateway process not running"
fi

# === CHECK 2: Port responsiveness ===
log_info "Checking port 18789..."

if curl -s --connect-timeout 3 http://127.0.0.1:18789/health >/dev/null 2>&1; then
  log_info "Port 18789: responding"
else
  log_issue "Port 18789 not responding"
fi

# === CHECK 3: Port conflict ===
log_info "Checking port conflict..."

PORT_PID=$(lsof -ti:18789 2>/dev/null || true)
if [ -n "$PORT_PID" ]; then
  PORT_PROC=$(ps -p "$PORT_PID" -o comm= 2>/dev/null || true)
  if [[ "$PORT_PROC" == *"openclaw"* ]] || [[ "$PORT_PROC" == *"node"* ]]; then
    log_info "Port in use by OpenClaw (PID $PORT_PID): $PORT_PROC"
  else
    log_issue "Port 18789 in use by non-OpenClaw process: $PORT_PROC (PID $PORT_PID)"
  fi
else
  log_info "No process currently on port 18789"
fi

# === CHECK 4: Config validity ===
log_info "Checking config..."

CONFIG_FILE="$HOME/.openclaw/openclaw.json"
if [ -f "$CONFIG_FILE" ]; then
  if python3 -c "import json; json.load(open('$CONFIG_FILE'))" 2>/dev/null; then
    log_info "Config file: valid JSON"
  else
    log_issue "Config file is invalid JSON"
  fi
else
  log_issue "Config file not found: $CONFIG_FILE"
fi

# === CHECK 5: Disk space ===
log_info "Checking disk space..."

ROOT_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$ROOT_USAGE" -gt 90 ]; then
  log_issue "Disk usage critical: ${ROOT_USAGE}%"
elif [ "$ROOT_USAGE" -gt 80 ]; then
  log_issue "Disk usage high: ${ROOT_USAGE}%"
else
  log_info "Disk space: ${ROOT_USAGE}% used"
fi

# === CHECK 6: Memory ===
log_info "Checking memory..."

MEM_TOTAL=$(free -m | awk 'NR==2 {print $2}')
MEM_AVAIL=$(free -m | awk 'NR==2 {print $7}')
if [ "$MEM_AVAIL" -lt 200 ]; then
  log_issue "Memory available: ${MEM_AVAIL}MB (low)"
else
  log_info "Memory available: ${MEM_AVAIL}MB"
fi

# === CHECK 7: Gateway logs ===
log_info "Checking recent logs..."

LOG_FILE="$HOME/.openclaw/logs/gateway.log"
if [ -f "$LOG_FILE" ]; then
  LAST_ERRORS=$(tail -50 "$LOG_FILE" | grep -i "error\|exception\|fatal" | tail -5)
  if [ -n "$LAST_ERRORS" ]; then
    log_info "Recent errors in gateway.log:"
    echo "$LAST_ERRORS" | while read line; do
      echo "  $line"
    done
  else
    log_info "No recent errors in gateway.log"
  fi
else
  log_info "No gateway.log found"
fi

# === CHECK 8: Docker containers ===
log_info "Checking Docker containers..."

if command -v docker >/dev/null 2>&1; then
  ARR_RUNNING=$(docker ps --filter "name=arr-" --format "{{.Names}}" 2>/dev/null | wc -l)
  DASH_RUNNING=$(docker ps --filter "name=dashboard" --format "{{.Names}}" 2>/dev/null | wc -l)
  log_info "ARR containers running: $ARR_RUNNING"
  log_info "Dashboard containers running: $DASH_RUNNING"
else
  log_info "Docker not available for checking"
fi

# === ATTEMPT FIXES ===
echo ""
echo -e "${BLUE}=== Attempting Fixes ===${NC}\n"

# Fix 1: Restart gateway if not running
if ! curl -s --connect-timeout 2 http://127.0.0.1:18789/health >/dev/null 2>&1; then
  log_info "Attempting to restart gateway..."
  
  if [ "$DRY_RUN" = true ]; then
    log_info "[DRY RUN] Would restart openclaw-gateway"
  else
    if systemctl --user restart openclaw-gateway 2>/dev/null; then
      sleep 3
      if curl -s --connect-timeout 5 http://127.0.0.1:18789/health >/dev/null 2>&1; then
        log_fix "Gateway restarted successfully"
      else
        log_fail "Gateway restart failed to bring service up"
      fi
    else
      log_fail "systemctl restart failed (may need sudo or user session)"
    fi
  fi
fi

# Fix 2: Clear gateway lock if stale
LOCK_FILE="$HOME/.openclaw/gateway-lock.json"
if [ -f "$LOCK_FILE" ]; then
  LOCK_AGE=$(stat -c %Y "$LOCK_FILE" 2>/dev/null || echo 0)
  NOW_TIME=$(date +%s)
  LOCK_AGE_SECS=$((NOW_TIME - LOCK_AGE))
  
  if [ "$LOCK_AGE_SECS" -gt 3600 ]; then
    log_info "Stale gateway lock detected (age: ${LOCK_AGE_SECS}s)"
    if [ "$DRY_RUN" = true ]; then
      log_info "[DRY RUN] Would remove stale lock file"
    else
      rm -f "$LOCK_FILE" && log_fix "Removed stale lock file"
    fi
  fi
fi

# === SUMMARY ===
echo ""
echo -e "${BLUE}=== Summary ===${NC}"
echo -e "Issues found:   ${ISSUES_FOUND}"
echo -e "Fixes applied:  ${FIXES_APPLIED}"
echo ""

if [ "$ISSUES_FOUND" -eq 0 ]; then
  echo -e "${GREEN}✓ Gateway appears healthy${NC}"
  exit 0
elif [ "$FIXES_APPLIED" -gt 0 ]; then
  echo -e "${YELLOW}⚠ Issues found and fixes applied — check status above${NC}"
  exit 0
else
  echo -e "${RED}✗ Issues found but could not auto-fix${NC}"
  echo ""
  echo "Manual steps to try:"
  echo "  1. Check logs: tail -100 $HOME/.openclaw/logs/gateway.log"
  echo "  2. Check status: systemctl --user status openclaw-gateway"
  echo "  3. Restart manually: systemctl --user restart openclaw-gateway"
  echo "  4. Check port: lsof -i :18789"
  echo "  5. Reboot Beelink if needed"
  exit 1
fi
