#!/bin/bash
# MiniMax-only Guard Script
# Runs daily to ensure no Anthropic/Claude references reappear
# Scheduled: 03:15 Europe/London daily

LOGFILE="$HOME/.openclaw/logs/minimax_only_guard.log"
CONFIG="$HOME/.openclaw/openclaw.json"
JOBS="$HOME/.openclaw/cron/jobs.json"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOGFILE"
}

log "=== MiniMax-only Guard Started ==="

ERRORS=0

# Check config - use Python for precise JSON handling
python3 - "$CONFIG" "$JOBS" << 'PYEOF'
import json
import sys

config_path = sys.argv[1]
jobs_path = sys.argv[2]

errors = 0

with open(config_path) as f:
    d = json.load(f)

# Check for actual anthropic provider
providers = d.get('models', {}).get('providers', {})
if 'anthropic' in providers:
    print("Found anthropic provider - removing")
    del providers['anthropic']
    errors += 1
    
# Check auth profiles
auth = d.get('auth', {}).get('profiles', {})
if 'anthropic:default' in auth:
    print("Found anthropic:default profile - removing")
    del auth['anthropic:default']
    errors += 1

# Check aliases
models = d.get('agents', {}).get('defaults', {}).get('models', {})
aliases = models.get('aliases', {})
to_remove = [k for k in aliases.keys() if 'anthropic' in k.lower() or 'claude' in k.lower()]
for k in to_remove:
    print(f"Removing alias: {k}")
    del aliases[k]
    errors += 1

# Ensure primary model is MiniMax
d.setdefault('agents', {}).setdefault('defaults', {}).setdefault('model', {})['primary'] = 'minimax/MiniMax-M2.5'

with open(config_path, 'w') as f:
    json.dump(d, f, indent=2)

# Check jobs
with open(jobs_path) as f:
    jobs = json.load(f)

job_errors = 0
for job in jobs.get('jobs', []):
    model = job.get('payload', {}).get('model', '')
    if model and ('anthropic' in model.lower() or 'claude' in model.lower()):
        print(f"Fixing job: {job['name']}")
        job['payload']['model'] = 'minimax/MiniMax-M2.5'
        job_errors += 1
        errors += 1

if job_errors:
    with open(jobs_path, 'w') as f:
        json.dump(jobs, f, indent=2)
    print(f"Fixed {job_errors} jobs")

if errors == 0:
    print("OK - no changes needed")
else:
    print(f"Total issues: {errors}")

sys.exit(errors)
PYEOF

RESULT=$?

if [ $RESULT -eq 0 ]; then
    log "Guard: No issues found. MiniMax-only enforced."
else
    log "Guard: Fixed $RESULT issue(s)."
fi

log "=== MiniMax-only Guard Complete ==="
