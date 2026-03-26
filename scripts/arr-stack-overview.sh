#!/bin/bash
# ARR Stack Overview — checks health of all ARR services
# Usage: ./arr-stack-overview.sh [--alert]

ALERT_MODE="$1"
TOKEN="hx4nEu4W2ZoXsiEfWRCAQcgDsNzzht7kpBUfsGHhqxzEsgHhLll2g39woASs1c"
WHATSAPP_URL="http://192.168.1.146:5001/webhook/whatsapp"
ALERT_STATE="/home/john/.openclaw/workspace/arr-alert-state.json"
NOW="$(date +%s)"
ONE_DAY=86400

# Sonarr
sonarr_health() {
    curl -s "http://192.168.1.146:8989/api/v3/health?apiKey=e990b7b615554edeaca78919ade1e975" | \
        python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if not d else 'ISSUES:'+','.join([x['type'] for x in d]))"
}

# Radarr (key: a43e5fe67a7d45c7a488aaa93c78f0a1)
radarr_health() {
    curl -s "http://192.168.1.146:7878/api/v3/health?apiKey=a43e5fe67a7d45c7a488aaa93c78f0a1" | \
        python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if not d else 'ISSUES:'+','.join([x['type'] for x in d]))"
}

# Prowlarr (key: 17756336779d494b92c56ac4095dab9a)
prowlarr_health() {
    curl -s "http://192.168.1.146:9696/api/v1/health?apiKey=17756336779d494b92c56ac4095dab9a" | \
        python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if not d else 'ISSUES:'+','.join([x['type'] for x in d]))"
}

# Transmission (check container health)
transmission_status() {
    docker ps --filter name=transmission --format "{{.Status}}" 2>/dev/null | grep -q "healthy" && echo "healthy" || echo "UNHEALTHY"
}

# Dashboard
dashboard_status() {
    curl -s -o /dev/null -w "%{http_code}" "http://192.168.1.146:5000" | grep -q "200" && echo "OK" || echo "DOWN"
}

# Sonarr queue
sonarr_queue() {
    result=$(curl -s "http://192.168.1.146:8989/api/v3/queue?apiKey=e990b7b615554edeaca78919ade1e975&includeUnknown=true&page=1&pageSize=1")
    count=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('totalRecords',0))" 2>/dev/null || echo "0")
    echo "$count queued"
}

echo "=== ARR Stack Overview $(date) ==="
echo "Sonarr:      $(sonarr_health 2>/dev/null || echo 'UNREACHABLE')"
echo "Radarr:      $(radarr_health 2>/dev/null || echo 'UNREACHABLE')"
echo "Prowlarr:    $(prowlarr_health 2>/dev/null || echo 'UNREACHABLE')"
echo "Transmission: $(transmission_status)"
echo "Dashboard:   $(dashboard_status)"
echo "Sonarr Queue: $(sonarr_queue)"

# Alert logic
if [ "$ALERT_MODE" = "--alert" ]; then
    issues=""
    [ "$(sonarr_health 2>/dev/null)" != "OK" ] && issues="${issues}Sonarr "
    [ "$(radarr_health 2>/dev/null)" != "OK" ] && issues="${issues}Radarr "
    [ "$(prowlarr_health 2>/dev/null)" != "OK" ] && issues="${issues}Prowlarr "
    [ "$(transmission_status)" != "healthy" ] && issues="${issues}Transmission "
    [ "$(dashboard_status)" != "OK" ] && issues="${issues}Dashboard "

    if [ -n "$issues" ]; then
        msg="ARR Alert: ${issues}issues detected"
        last_alert=$(cat "$ALERT_STATE" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('last_alert',0))" 2>/dev/null || echo "0")
        if [ $((NOW - last_alert)) -gt $ONE_DAY ]; then
            curl -s -X POST "$WHATSAPP_URL" \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $TOKEN" \
                -d "{\"message\":\"$msg\",\"to\":\"+447967688452\"}" 2>/dev/null
            echo "$NOW" > "$ALERT_STATE.tmp"
            python3 -c "import json; d={'last_alert':$NOW}; f=open('$ALERT_STATE','w'); json.dump(d,f); f.close()" 2>/dev/null
            [ -f "$ALERT_STATE.tmp" ] && rm "$ALERT_STATE.tmp"
            echo "Alert sent: $msg"
        else
            echo "Alert suppressed (last sent $(( (NOW - last_alert) / 3600 ))h ago)"
        fi
    else
        echo "All clear — no alerts needed"
    fi
fi
