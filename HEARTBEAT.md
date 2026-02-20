# HEARTBEAT.md

# Keep empty (or comments only) to skip heartbeats.

## Before Dashboard Changes
**ALWAYS** backup first: `cp /home/john/ARR/dashboard/index.html /home/john/ARR/dashboard/index.html.backup-$(date +%Y%m%d-%H%M)`

## Activity Logging
Every heartbeat:
1. Read heartbeat-state.json
2. Update: active project, current task, recent decisions, blockers
3. Write back

## Kanban Task Work
Every heartbeat:
1. Check http://localhost:4000/api/kanban for backlog/todo tasks
2. Pick first, move to in-progress: POST /api/kanban/:id/move {"column": "in-progress"}
3. Work the task to completion
4. Move to complete: POST /api/kanban/:id/move {"column": "complete"}
5. Update heartbeat-state.json with what was done
6. WhatsApp john (+447967688452) with completion summary

## Dashboard Health Monitor
Every heartbeat:
1. Check: curl -s http://192.168.1.146:4000 | head -c 100
2. If fail: docker restart arr-dashboard
3. Check kanban data: curl -s http://localhost:4000/api/kanban | jq '.ideas | length'
4. Verify /tmp/dashboard.db exists
5. Update heartbeat-state.json with status

## Memory Maintenance
Once per day (check hour, only once):
1. Read today's memory file, create if missing
2. Log significant events
3. Update MEMORY.md with learnings
4. Clear heartbeat-state.json after review

## Weekend Memory Capture
Every Saturday & Sunday heartbeat:
1. Check if today's memory file exists: ls memory/$(date +%Y-%m-%d).md
2. If missing, create it with: # Weekend Notes - [date]
3. Log: current time, any cron job executions, any tasks worked on
4. Force a minimal daily entry even if no major events
5. This ensures continuity even during low-activity periods
