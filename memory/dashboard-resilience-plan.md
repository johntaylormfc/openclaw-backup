# Dashboard Resilience Plan

## Current Problems

1. **Fragile code** - Small changes break the entire dashboard
2. **No version control** - Can't roll back when things break
3. **Can't verify fixes** - Browser tool not working reliably
4. **No change memory** - We lose track of what we changed and what worked

---

## Proposed Solution

### 1. GitHub Version Control for Dashboard

**Create repo:** `johntaylormfc/arr-dashboard`

**Workflow:**
- All dashboard changes committed to git with descriptive messages
- Each change = one commit with clear description
- Can roll back to any previous working version
- Full history of what changed and when

**Commands to implement:**
```bash
# Initialize git in dashboard folder
cd /home/john/ARR/dashboard
git init
git add .
git commit -m "Initial dashboard v1"

# After each change:
git add .
git commit -m "DESCRIPTION OF WHAT CHANGED"
git push origin main
```

### 2. Automated Deployment

**Option A: Simple (recommended)**
- After `git push`, manually deploy: `docker cp ... && docker restart`
- Keep it simple since we have limited time

**Option B: GitHub Actions**
- Auto-deploy on push to main branch
- More complex to set up

### 3. Fix Browser Verification

**Problem:** Browser tool needs Chrome extension connected

**Solution:** 
- Use web_fetch for simple checks (works for APIs)
- For visual verification, I need you to either:
  - Connect a Chrome tab via the OpenClaw extension, OR
  - Tell me what you see when you check

**Alternative:** Add self-test API endpoints that verify the UI renders correctly

### 4. Change Tracking System

**Before making changes:**
1. Document current state in memory file
2. Make the change
3. Test locally via curl
4. If works, commit to git with description

**Memory file to maintain:**
- `/home/john/.openclaw/workspace/memory/dashboard-changes.md`
- Record: date, change description, what broke (if anything), what worked

### 5. Testing Checklist

Before telling you "it's fixed", I will:
1. ✅ Verify API endpoints return expected data (curl)
2. ✅ Check HTML has correct code (grep)
3. ⚠️ Visual verification (needs browser connection)
4. Give you specific instructions on what to test

---

## Implementation Priority

| Priority | Action | Effort | Status |
|----------|--------|--------|--------|
| 1 | Set up GitHub repo for dashboard | 15 min | ✅ Done |
| 2 | Commit current working state | 5 min | ✅ Done |
| 3 | Create change log memory file | 10 min | ✅ Done |
| 4 | Add self-test API endpoint | 20 min | ✅ Done |
| 5 | Configure browser for verification | 10 min | ⏳ Pending |

## Testing Checklist (Run before saying "it's fixed")

```bash
# 1. Verify API works
curl -s http://localhost:4000/api/kanban | jq '.tasks | length, .ideas | length'
# Expected: tasks: 7, ideas: 41

# 2. Verify HTML has changes  
curl -s http://localhost:4000 | grep -c "Agents"
# Expected: > 0

# 3. Run self-test
curl -s http://localhost:4000/api/self-test | jq '.allOk'
# Expected: true
```

---

## What Worked Well (Historical)

- SQLite over JSON for persistence (kanban, notes)
- Volume mount for data persistence in Docker
- Modular API endpoints (/api/kanban, /api/notes, etc.)
- Adding new columns to match data

## What Broke Things

- Copying to wrong file path (/app/index.html vs /app/public/index.html)
- Not restarting container after changes
- Column name mismatches (backlog vs new)
- Missing API endpoints when fetching data
