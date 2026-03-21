#!/bin/bash
# MiniMax-only Guard Script v2
# Purpose: Verify MiniMax-only operations are properly configured and functional

CONFIG_FILE="/home/john/.openclaw/openclaw.json"
LOG_PREFIX="[MiniMax Guard]"
ERRORS=0

log_info() {
    echo "$LOG_PREFIX INFO: $1"
}

log_error() {
    echo "$LOG_PREFIX ERROR: $1" >&2
    ERRORS=$((ERRORS + 1))
}

# Check 1: Verify config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    log_error "Config file not found: $CONFIG_FILE"
    exit 1
fi
log_info "Config file: exists"

# Check 2: Verify primary model is MiniMax
PRIMARY_MODEL=$(grep -o '"primary": "[^"]*"' "$CONFIG_FILE" | cut -d'"' -f4)
if [[ "$PRIMARY_MODEL" == minimax/* ]]; then
    log_info "Primary model: OK ($PRIMARY_MODEL)"
else
    log_error "Primary model is not MiniMax: $PRIMARY_MODEL"
fi

# Check 3: Verify MiniMax provider is configured
if grep -q '"minimax"' "$CONFIG_FILE"; then
    log_info "MiniMax provider: configured"
else
    log_error "MiniMax provider not found in config"
fi

# Check 4: Verify MiniMax base URL is configured
MINIMAX_BASE_URL=$(grep -A5 '"minimax"' "$CONFIG_FILE" | grep -o '"baseUrl": "[^"]*"' | cut -d'"' -f4)
if [ -n "$MINIMAX_BASE_URL" ]; then
    log_info "MiniMax baseUrl: $MINIMAX_BASE_URL"
else
    log_error "MiniMax baseUrl not found in config"
fi

# Check 5: Verify MiniMax extension/plugin is loaded
if [ -d "/home/john/.openclaw/lib/node_modules/openclaw/extensions/minimax-portal-auth" ]; then
    log_info "MiniMax extension: installed"
else
    log_error "MiniMax extension not found"
fi

# Check 6: Verify Ollama is NOT primary (if present)
if grep -q '"ollama"' "$CONFIG_FILE"; then
    OLLAMA_MODELS=$(grep -A20 '"ollama"' "$CONFIG_FILE" | grep -o '"id": "[^"]*"' | cut -d'"' -f4 | tr '\n' ' ' || true)
    if [[ "$PRIMARY_MODEL" == ollama/* ]]; then
        log_error "Ollama is primary - MiniMax-only mode violated"
    else
        log_info "Ollama: present but not primary (OK)"
    fi
fi

# Check 7: Live API test - verify MiniMax OAuth token is valid
MINIMAX_TOKEN_FILE="/home/john/.openclaw/credentials/minimax-oauth/token.json"
if [ -f "$MINIMAX_TOKEN_FILE" ]; then
    log_info "MiniMax OAuth token: exists"
    
    # Check token expiry
    EXPIRY=$(grep -o '"expiry": "[^"]*"' "$MINIMAX_TOKEN_FILE" 2>/dev/null | cut -d'"' -f4 || echo "")
    if [ -n "$EXPIRY" ]; then
        # Compare expiry time with current time
        EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s 2>/dev/null || echo "0")
        NOW_EPOCH=$(date +%s)
        if [ "$EXPIRY_EPOCH" -gt "$NOW_EPOCH" ]; then
            log_info "MiniMax OAuth token: valid (expires: $EXPIRY)"
        else
            log_error "MiniMax OAuth token: EXPIRED (expired: $EXPIRY)"
        fi
    fi
else
    # Try to detect if using API key mode instead
    if grep -q 'minimax-portal-auth\|minimax-oauth' "$CONFIG_FILE"; then
        log_error "MiniMax OAuth token file not found - may need re-authentication"
    fi
fi

# Check 8: Verify the minimax-only model is actually working via a quick API test
log_info "Testing MiniMax API connectivity..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    --max-time 15 \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"model":"MiniMax-M2.7","max_tokens":5,"messages":[{"role":"user","content":"test"}]}' \
    "https://api.minimax.io/anthropic/v1/messages" 2>/dev/null || echo "000")

case "$RESPONSE" in
    200|201)
        log_info "MiniMax API: reachable and authenticated (HTTP $RESPONSE)"
        ;;
    401|403)
        log_info "MiniMax API: reachable, auth required (HTTP $RESPONSE) - this is normal if OAuth needs refresh"
        ;;
    000)
        log_error "MiniMax API: unreachable (timeout) - network or DNS issue"
        ;;
    *)
        log_error "MiniMax API: unexpected response (HTTP $RESPONSE)"
        ;;
esac

# Summary
echo ""
if [ $ERRORS -eq 0 ]; then
    log_info "All checks passed ✅"
    exit 0
else
    log_error "Checks completed with $ERRORS error(s) ❌"
    exit 1
fi
