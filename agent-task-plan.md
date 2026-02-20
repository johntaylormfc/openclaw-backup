# Agent Task Execution System - Implementation Plan

## Overview
Build a complete system where:
1. Board meetings generate plans with assigned tasks
2. Tasks are distributed to specific agents
3. Agents execute their assigned tasks automatically
4. All activity is tracked with full history

## Database Schema

### Existing Tables
- `agents` - Agent definitions
- `board_meetings` - Meeting transcripts, plans, participants
- `agent_activity` - Activity log with timestamps

### New Table: agent_tasks
```sql
CREATE TABLE agent_tasks (
  id TEXT PRIMARY KEY,
  agentId TEXT,
  meetingId TEXT,
  parentTaskId TEXT,
  title TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending',  -- pending/in-progress/completed
  result TEXT,
  createdAt TEXT,
  completedAt TEXT
);
```

## Architecture

### 1. Meeting Flow (When task moves to in-progress)
```
Backlog Task Picked Up
    ↓
Create Board Meeting
    ↓
Generate Discussion (AI-style transcript with reasoning)
    ↓
Extract Subtasks from transcript
    ↓
For each subtask:
  - Create agent_task record
  - Execute task automatically
  - Record result
    ↓
Complete Meeting with full transcript + outcome
```

### 2. API Endpoints Needed
- `GET /api/command-center/tasks` - All agent tasks
- `GET /api/command-center/agents/:id/tasks` - Tasks per agent (past/present/future)
- `POST /api/command-center/tasks/:id/complete` - Mark task complete with result

### 3. Execution Engine
Parse task title for keywords and execute:
- "research" → Create research document
- "implement" / "code" → Queue for implementation
- "test" → Mark as tested
- "review" → Mark as reviewed
- "expand" / "crypto" → Execute crypto-specific actions
- Default → Acknowledge task

### 4. UI Display
Agent card shows:
- Current task (present)
- Recent completed tasks (past, last 5)
- Upcoming tasks (future)

Meeting shows:
- Full transcript with discussion
- Reasoning for decisions
- Assigned tasks per agent
- Execution results

## Implementation Steps

### Step 1: Database (db.js)
- Add agent_tasks table
- Add createAgentTask, getAgentTasks, updateAgentTask, getAllAgentTasks functions

### Step 2: Server API (server.js)
- Add /api/command-center/tasks endpoint
- Add /api/command-center/agents/:id/tasks endpoint
- Modify meeting completion to:
  - Parse subtasks from transcript
  - Create agent_task records
  - Execute each task automatically
  - Record results

### Step 3: UI Updates (index.html)
- Update agent cards to show past/present/future tasks
- Add task section to detail panel
- Improve meeting display with execution results

### Step 4: Execution Functions (server.js)
- Add executeAgentTask() function
- Task-specific handlers for common keywords
- Return results to be recorded

## Task Keywords & Handlers

| Keyword | Action |
|---------|--------|
| research, analyze | Create research document in workspace |
| implement, code, update | Mark as implemented (requires manual) |
| test, verify | Mark as tested |
| review, check | Mark as reviewed |
| document, note | Update documentation |
| expand, crypto, coin | Execute crypto expansion |
| email, gmail, todoist | Queue email integration |
| sort, order | Execute sorting logic |
| backup | Execute backup procedure |

## Test Scenarios

1. Create "Expand crypto coins" task → moves to in-progress → triggers meeting → executes crypto expansion → completes with results shown
2. Agent card shows: "Present: Research new coins" + "Past: Previous tasks"
3. Meeting shows: Full discussion + assigned tasks + execution results

## Files to Modify
1. `/home/john/ARR/dashboard/db.js` - Add table and functions
2. `/home/john/ARR/dashboard/server.js` - Add APIs and execution logic
3. `/home/john/ARR/dashboard/index.html` - Update UI

## Success Criteria
- [ ] Tasks create agent_task records
- [ ] Tasks execute automatically on completion
- [ ] Results are recorded and displayed
- [ ] Agent cards show past/present/future tasks
- [ ] Meeting transcript shows full discussion + execution results
