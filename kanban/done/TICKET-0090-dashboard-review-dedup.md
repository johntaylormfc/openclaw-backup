# Ticket: Dashboard Review - Remove Duplication & Streamline Sections

## Description
The dashboard has significant duplication across sections. Tasks, activity, and status appear in 3+ places. This review identifies all issues and implements fixes.

## Key Problems Found

### Duplication Issues
1. **"Active Work"** appears in Dashboard stats AND Kanban overview panel
2. **"Waiting on John"** appears in Dashboard section AND Kanban overview panel
3. **"Recent Activity"** appears in Dashboard section, Kanban overview, AND card entries
4. **"Completed" items** appear in both Kanban (as column) AND dedicated Completed section
5. **Container health** shown in Dashboard stats AND full Containers section
6. **"My Tasks" (Todoist)** and **"Kanban" (filesystem)** - two separate task systems with unclear distinction

### Navigation Issues
- Sidebar "Second Brain" could be clearer as "Notes"
- Dashboard stat cards don't link to their detailed sections
- Quick Links are uncategorized flat grid

## Implementation Plan

### 1. Dashboard - Strip to True Overview
**REMOVE:**
- "Waiting on John" section (duplicate - shows in Kanban)
- "Recent Activity" section (duplicate - shows in Kanban)
- "Active Work" count from stats (duplicate - shown in Kanban)

**KEEP & IMPROVE:**
- 4 stat cards: Containers, Disk Usage, Ideas count, New Tickets (link to Kanban)
- Container health summary bar (links to Containers)
- ARR Services status (links to Containers)
- Quick Links (categorize: Media, Management, Tools)
- ARR Backup status
- Make stat cards clickable → navigate to relevant section

### 2. Kanban - Remove Redundant Overview Panels
**REMOVE:**
- "Active Work" overview panel (board itself IS the overview)
- "Waiting on John" overview panel (already filterable via column)
- "Recent Activity" overview panel (already visible per-card)

**KEEP:**
- Full board with all columns
- Card detail modal
- Search and status filter
- Process next button

### 3. Completed Section
**KEEP** as-is (it IS the complete view, useful for looking back)
**NOTE:** Add small info badge that says "Completed items from filesystem kanban"

### 4. Sidebar Improvements
- Rename "Second Brain" → "Notes" (more intuitive)

### 5. Optional: My Tasks clarification
- Keep Todoist "My Tasks" separate from filesystem Kanban
- But clarify via label: "My Tasks (Todoist)" already shows this distinction

## Acceptance Criteria
- [x] Dashboard shows NO duplicate information from Kanban
- [x] Dashboard stat cards are clickable → navigate to section
- [x] Kanban board no longer has duplicate overview panels
- [x] Quick Links categorized in Dashboard
- [x] Sidebar "Second Brain" renamed to "Notes"
- [x] No broken functionality after changes
- [x] Build succeeds: `cd /home/john/ARR/dashboard-v2 && npm run build`

## Status
- **Stage**: done
- **Created**: 2026-03-19
- **Updated**: 2026-03-19

## Notes
Ref: Sidebar has 9 items. Removing duplication will make the app feel cleaner and more purposeful.

## Completion Log
- Built and deployed to http://192.168.1.146:5000
- Committed as f13059e to local git repo
- Backup: index.html.backup-20260319-0706
