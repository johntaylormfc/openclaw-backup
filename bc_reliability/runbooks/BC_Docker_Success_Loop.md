# BC Docker Success Loop

## Canonical Step-by-Step Process

Every BC container task MUST follow this loop to ensure reliability and reproducibility.

### Phase 1: Pre-flight Check
```bash
~/.openclaw/workspace/bc_reliability/scripts/bc_preflight.sh
```
- Verify Docker daemon is reachable
- Check compose is available
- Verify disk space (>10% free)
- Check CPU/RAM availability
- Scan for port conflicts
- Validate network connectivity

### Phase 2: Port Allocation
```bash
~/.openclaw/workspace/bc_reliability/scripts/allocate_ports.sh <container_key>
```
- Reserve ports in the deterministic range (18000-18999)
- Avoid 8080, standard web ports
- Generate stable mappings for web + dev endpoints

### Phase 3: Build Configuration
1. Use existing skills:
   - skills/bc-container
   - skills/docker-compose-generator
2. Generate compose/config with allocated ports
3. Validate configuration before execution

### Phase 4: Build/Run with Retry
```bash
~/.openclaw/workspace/bc_reliability/scripts/bc_build_loop.sh \
  --container <name> \
  --version <version> \
  --country UK
```

**Retry Logic:**
- Attempt 1: Initial build
- Attempt 2: Apply error-specific fix (see Fix Recipes)
- Attempt 3: Deep diagnostics + manual intervention request

### Phase 5: Post-Run Validation
- Health check: container status = running
- Port check: expected ports listening
- Service check: BC web client accessible
- Log check: no critical errors in container logs

### Phase 6: Documentation
- Write success summary to logs/
- Update Failure Playbook if new issue encountered
- Update ports_map.json with final mappings

## One-Command Workflow

For simple container creation, use the CLI:

```bash
# Set password (do not use directly in command)
export BC_PASSWORD='your_password'

# Create new container
bc-new bcuk-latest --country UK --version latest

# Or dry-run to test
bc-new bcuk-test --country UK --version latest --dry-run
```

## Helper Commands

```bash
bc-list        # List all BC containers
bc-info <name> # Show container details
bc-stop <name> # Stop container
bc-rm <name>  # Remove container (use --force)
```
- On failure: Always capture full logs before retry
- Use error taxonomy to classify
- Apply appropriate fix recipe
- Stop after 3 failures and request manual input

## Success Criteria
- Container status: running
- Health: healthy (if healthcheck defined)
- Web endpoint: accessible
- No credential errors
