# Ports and Naming Convention

## Deterministic Rules for Container Deployment

### Port Ranges

| Range | Purpose | Examples |
|-------|---------|----------|
| 18000-18999 | BC Web/Client | 18000, 18001, 18002 |
| 19000-19999 | BC Dev/API | 19000, 19001 |
| 17000-17999 | Auxiliary | SQL, Redis, etc |
| 8080 | Forbidden | Never use |
| 80/443 | Reserved | For reverse proxy only |

### Port Allocation Rules

1. **Never use 8080** - commonly conflicts
2. **Avoid 80/443** - reverse proxy territory
3. **Use deterministic mapping** - same container = same ports
4. **Leave buffer** - 2 ports per container (web + dev)

### Container Naming

Format: `<project>-<country>-<version>`

Examples:
- `bcuk-latest`
- `bcuk-v22`
- `bcde-latest`
- `bcus-v21`

### DNS Names

Format: `<container>.media.local`

Examples:
- `bcuk-latest.media.local`
- `bcde-v22.media.local`

### Port Map JSON Structure

```json
{
  "bcuk-latest": {
    "web": 18000,
    "dev": 19000,
    "created": "2026-03-05"
  },
  "bcuk-v22": {
    "web": 18001,
    "dev": 19001,
    "created": "2026-03-05"
  }
}
```

### CLI Usage

```bash
# Add to PATH (if not already)
export PATH="$HOME/.local/bin:$PATH"

# Create new container
export BC_PASSWORD='REDACTED'
bc-new bcuk-latest --country UK --version latest

# Dry run
bc-new bcuk-test --dry-run

# List containers
bc-list

# Get info
bc-info bcuk-latest

# Stop/remove
bc-stop bcuk-latest
bc-rm bcuk-latest --force
```

```bash
# Allocate ports for new container
~/.openclaw/workspace/bc_reliability/scripts/allocate_ports.sh bcuk-latest

# Check current allocations
cat ~/.openclaw/workspace/bc_reliability/playbooks/ports_map.json
```

### Manual Port Override

If you need specific ports (e.g., for client requirements):

```bash
# Pass as environment variables
export BC_WEB_PORT=18005
export BC_DEV_PORT=19005
```
