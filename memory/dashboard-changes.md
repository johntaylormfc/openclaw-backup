# Dashboard Change Log

## 2026-02-18

### Initial Setup
- Created GitHub repo: johntaylormfc/arr-dashboard
- Committed working v1.0 state

### Created dashboard-debug Skill
- Added skill at /home/john/openclaw/skills/dashboard-debug/SKILL.md
- Documents how to use chrome-devtools-mcp via mcporter
- Always use this skill when debugging dashboard issues

### Fix: JavaScript Errors (2026-02-18 08:10)
- **Problem:** Console error "Cannot set properties of null (setting 'innerHTML')"
- **Cause:** Multiple missing/null elements + function hoisting issue with loadNotes
- **Fixes:**
  - Added quickActions div that was missing from HTML
  - Added null checks for all getElementById calls
  - Moved loadNotes function before showSection to fix hoisting
  - Fixed tags parsing (API returns string, not array)
  - Wrapped loadData in try-catch
- **Testing:** Used chrome-devtools-mcp to check console errors
- **Result:** ✅ No more errors, Kanban renders correctly

### What Works Well
- SQLite persistence (kanban, notes)
- Volume mount for data at /tmp
- API endpoints working (/api/kanban, /api/notes, /api/tasks)
- Dashboard at http://192.168.1.146:4000
- mcporter + chrome-devtools-mcp for debugging

### Common Issues & Fixes
- Copy to wrong path: Use /app/index.html not /app/public/index.html
- Always restart container after changes: `docker restart arr-dashboard`
- Column name mismatch: Data uses "new", dashboard expected "backlog" - added both
- Null element errors: Always check if getElementById returns null before setting innerHTML/textContent

### Testing Commands
```bash
# Check API works
curl -s http://localhost:4000/api/kanban | jq '.tasks | length, .ideas | length'
curl -s http://localhost:4000/api/notes | jq '.notes | length'

# Check HTML has changes
curl -s http://localhost:4000 | grep -c "Agents"

# Chrome DevTools debugging
mcporter call chrome-devtools.list_console_messages
mcporter call chrome-devtools.take_snapshot
```
