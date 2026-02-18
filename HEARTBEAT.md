# HEARTBEAT.md

# Keep this file empty (or with only with comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## Activity Logging (Every Heartbeat)
Track ongoing work context for better daily reviews:
1. Read heartbeat-state.json to get current activity
2. Update with: active project, current task, recent decisions, any blockers
3. Write back to heartbeat-state.json

Example state (heartbeat-state.json):
```json
{
  "lastActivityUpdate": "2026-02-18T11:00:00Z",
  "activeProject": "Dashboard health monitoring",
  "currentTask": "Fixing kanban sync issues",
  "recentDecisions": ["Migrated kanban to SQLite", "Added dashboard health checks"],
  "blockers": ["YouTube scan jobs failing"]
}
```

## Kanban Task Work
Every heartbeat:
1. Check kanban API (http://localhost:4000/api/kanban) for tasks where column is "backlog" or "todo"
2. If items exist, pick the first one
3. Move it to "in-progress" column via POST to /api/kanban/:id/move with {"column": "in-progress"}
4. WORK ON THE TASK to completion (read description, implement, test)
5. When done, move to "complete" column with {"column": "complete"}
6. Update heartbeat-state.json with what was completed (add to recentDecisions)
7. Send WhatsApp message to john (+447967688452) with what was completed

Note: The API returns flat tasks with a "column" field, not columns with items. Use: `curl -s http://localhost:4000/api/kanban | jq '[.tasks[] | select(.column == "backlog" or .column == "todo")] | length'`

## Dashboard Health Monitor
Every heartbeat (every 30 min):
1. Check dashboard responds: `curl -s http://192.168.1.146:4000 | head -c 100`
2. If fails, restart container: `docker restart arr-dashboard`
3. Check kanban has data: `curl -s http://localhost:4000/api/kanban | jq '.ideas | length'`
4. If ideas < 5 or tasks = 0 after container restart, investigate
5. Check persistence: verify /tmp/dashboard.db exists and has data
6. Check cron jobs synced: verify arr-cronjobs.json was updated recently
7. Update heartbeat-state.json with current dashboard status

## Memory Maintenance
Once per day (check hour, only do this once):
1. Read today's memory file if it exists
2. If not, create memory/YYYY-MM-DD.md with today's date as header
3. Log significant events that happened (dashboard changes, cron jobs, issues fixed)
4. At end of day, update MEMORY.md with any important learnings
5. Clear heartbeat-state.json after daily review
