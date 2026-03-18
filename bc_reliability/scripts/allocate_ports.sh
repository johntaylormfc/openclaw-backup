#!/bin/bash
# BC Port Allocator
# Allocates deterministic ports for BC containers

PORTS_MAP="$HOME/.openclaw/workspace/bc_reliability/playbooks/ports_map.json"

usage() {
    echo "Usage: $0 <container_key>"
    echo "Example: $0 bcuk-latest"
    exit 1
}

[ -z "$1" ] && usage

CONTAINER_KEY="$1"
WEB_PORT=""
DEV_PORT=""

# Find next available ports
find_ports() {
    # Start from base ports
    local base_web=18000
    local base_dev=19000
    
    # Check existing allocations
    if [ -f "$PORTS_MAP" ]; then
        # Find highest used
        local max_web=$(cat "$PORTS_MAP" | python3 -c "import json,sys; d=json.load(sys.stdin); print(max([v.get('web',0) for v in d.values()], default=17999))")
        base_web=$((max_web + 1))
        base_dev=$((max_web + 1000))
    fi
    
    # Find free ports (simple check, could be improved)
    for port in $(seq $base_web 18999); do
        if ! netstat -tlnp 2>/dev/null | grep -q ":$port "; then
            WEB_PORT=$port
            break
        fi
    done
    
    for port in $(seq $base_dev 19999); do
        if ! netstat -tlnp 2>/dev/null | grep -q ":$port "; then
            DEV_PORT=$port
            break
        fi
    done
}

# Allocate
find_ports

if [ -z "$WEB_PORT" ] || [ -z "$DEV_PORT" ]; then
    echo "ERROR: Could not find free ports"
    exit 1
fi

# Update ports map
mkdir -p "$(dirname "$PORTS_MAP")"

if [ -f "$PORTS_MAP" ]; then
    python3 - "$CONTAINER_KEY" "$WEB_PORT" "$DEV_PORT" "$PORTS_MAP" << 'PYEOF'
import json, sys
key = sys.argv[1]
web = int(sys.argv[2])
dev = int(sys.argv[3])
path = sys.argv[4]

with open(path) as f:
    d = json.load(f)

d[key] = {"web": web, "dev": dev, "created": __import__('datetime').datetime.now().isoformat()}

with open(path, 'w') as f:
    json.dump(d, f, indent=2)

print(f"Allocated: {key} -> web:{web}, dev:{dev}")
PYEOF
else
    echo "{\"$CONTAINER_KEY\": {\"web\": $WEB_PORT, \"dev\": $DEV_PORT, \"created\": \"$(date -I)\"}}" > "$PORTS_MAP"
    echo "Created ports map with: $CONTAINER_KEY -> web:$WEB_PORT, dev:$DEV_PORT"
fi

echo "Allocated ports:"
echo "  Web:  $WEB_PORT"
echo "  Dev:  $DEV_PORT"
