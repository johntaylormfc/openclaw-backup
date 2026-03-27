# HEARTBEAT.md — Arnold 🦞

## Operating Model
Follow OPERATING_MODEL.md for all task framing and response standards.

## SMART MEMORY LOADING (first, every heartbeat)
1. Read memory/projects.md — compact project registry
2. Read MEMORY.md — curated long-term memory
3. Only load daily notes (memory/YYYY-MM-DD.md) when asked about specific past work

---

## Heartbeat Protocol

### 1. Assess State (every heartbeat)
Before doing anything, answer:
- **Active project:** What is currently being worked on?
- **Current task:** What specific subtask is in progress?
- **Blockers:** What is preventing forward progress?
- **Next step:** What is the smallest sensible next action?

### 2. System Health Check
- [ ] Dashboard (port 5000): `curl -s http://192.168.1.146:5000 | head -c 100` → restart if fail
- [ ] Gateway: `curl -s http://127.0.0.1:18789 | head -c 50` → check if responsive
- [ ] Docker containers: `docker ps --format "{{.Names}} {{.Status}}" | grep -v healthy | head -10`

### 3. Kanban Scan
- [ ] Ideas backlog: `ls ~/.openclaw/workspace/kanban/idea/*.md 2>/dev/null | wc -l`
- [ ] New tickets: `ls ~/.openclaw/workspace/kanban/new/*.md 2>/dev/null | wc -l`
- [ ] In-progress: `ls ~/.openclaw/workspace/kanban/in-progress/*.md 2>/dev/null | head -5`
- [ ] Blocked: `ls ~/.openclaw/workspace/kanban/blocked/*.md 2>/dev/null | head -5`

### 4. Task Selection Logic
```
IF blockers exist → work on clearing blockers
ELSE IF active task is incomplete → continue active task
ELSE IF new tickets exist → pick highest priority, work it
ELSE IF ideas backlog >= 3 → triage and review
ELSE → monitor and log
```

### 5. Before Any Dashboard/File Changes
Always do first:
```bash
cp /home/john/ARR/dashboard-v2/index.html index.html.backup-$(date +%Y%m%d-%H%M)
cp /home/john/.openclaw/workspace/dashboard-data/dashboard.db dashboard.db.backup-$(date +%Y%m%d-%H%M)
```

---

## Task Execution Standards

### New Request — Frame First
Before touching tools, write out:
- **TASK:** What exactly needs to happen?
- **INTENT:** Why does John want this? What matters most?
- **ENVIRONMENT:** What files, containers, services, paths are involved?
- **CONSTRAINTS:** What must not break? What is the边界?
- **OUTPUT:** What does done look like?
- **SUCCESS CRITERIA:** How to verify?
- **PLAN:** Smallest next step — exactly one tool call

### During Work
- State the current goal before each tool call
- After each result: what changed, what it means, what next
- Do not continue a failed plan — reassess and adapt
- Log significant decisions to today's memory file

### After Work
- Update heartbeat-state.json with current status
- Log event to memory/YYYY-MM-DD.md if significant
- Verify success criteria before declaring done

---

## Memory Maintenance (once/day)
- Read/create today's memory file
- Log significant events (decisions, completions, failures, discoveries)
- Update MEMORY.md if new learnings apply

---

## Operational Notes
- Dashboard: http://192.168.1.146:5000 (port 4000 = old, ignore)
- Arr API skills at: /home/john/.openclaw/workspace/skills/arr-api/
- Scripts: /home/john/.openclaw/workspace/scripts/
- Kanban: /home/john/.openclaw/workspace/kanban/
- Mission Control: http://192.168.1.146:5001/

<!-- managed-memory-status:start -->
## Memory Status
- QMD Memory Backend: **enabled** (BM25 + vector hybrid, MMR, temporal decay)
- Session Transcript Capture: **enabled** (20:30 UTC daily)
- Daily Memory Log: **enabled** (21:00 weekdays)
- Weekly MEMORY.md Auto-Curation: **enabled** (Sundays 05:00)
- Memory Flush Threshold: **13000 tokens**
<!-- managed-memory-status:end -->
