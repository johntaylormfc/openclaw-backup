# OpenClaw Ticket Template

```markdown
# Ticket
**ID:** OC-####
**Title:**
**Status:** Idea / New / In Progress / Blocked / Complete
**Outcome State:** Succeeded / Partial / Blocked / Failed
**Priority:** Low / Medium / High / Critical
**Owner:**
**Created:**
**Last Updated:**

## Goal
State the exact outcome this ticket is intended to achieve.

## Why
Explain why this work matters.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Context
Record all relevant working context:
- Environment:
- Repo / Project:
- Paths:
- URLs / Services:
- Dependencies:
- Constraints / Assumptions:

## Task Checklist
- [ ] Analyse request
- [ ] Prepare approach
- [ ] Implement changes
- [ ] Validate result
- [ ] Commit / push changes
- [ ] Write summary

## Activity Log
Use chronological entries showing what was done and why.

### Entry Template
**Timestamp:** YYYY-MM-DD HH:MM  
**Action:** What was done  
**Result:** What happened  
**Why:** Why this action was taken  
**Evidence:** Logs, URLs, outputs, screenshots, file names, test results  
**Next Step:** What should happen next

### Entries
-

## Current Position
Summarise the current state of the ticket in plain English.

## Blocker
Leave blank unless the ticket is blocked.

### Blocker Summary
What could not be completed?

### What Was Completed
-

### What Failed
-

### Why It Failed
-

### Evidence
-

### Why This Blocks Completion
-

### What You Need To Do
-

### Next Step After Unblock
-

## Completion Summary
Only complete this section when the ticket is genuinely finished.

### Delivered
-

### Validation Performed
-

### Outcome Against Acceptance Criteria
- Criterion 1:
- Criterion 2:
- Criterion 3:

### Known Limitations
- None / list any remaining limits
```

---

## Example Minimal Ticket

```markdown
# Ticket
**ID:** OC-0042
**Title:** Create Business Central sandbox container for remote AL development
**Status:** In Progress
**Outcome State:** Partial
**Priority:** High
**Owner:** OpenClaw Builder Agent
**Created:** 2026-03-06 09:00
**Last Updated:** 2026-03-06 09:20

## Goal
Create a working Business Central container that can be accessed from another PC on the same network.

## Why
The user needs to publish and debug AL extensions remotely from another development machine.

## Acceptance Criteria
- [x] Container creation script prepared
- [x] Container started
- [ ] BC web client reachable reliably from another PC
- [ ] Ready for extension publish/testing

## Context
- Environment: Windows PC running Docker
- Repo / Project: BC sandbox setup
- Paths: C:\bc-containers\sandbox
- URLs / Services: http://192.168.1.228:8082/BC/
- Dependencies: Docker, BC container helper, network access
- Constraints / Assumptions: 8080 already in use, so alternative port required

## Task Checklist
- [x] Analyse request
- [x] Prepare approach
- [x] Implement changes
- [ ] Validate result
- [ ] Commit / push changes
- [ ] Write summary

## Activity Log

### Entries
- **Timestamp:** 2026-03-06 09:05  
  **Action:** Checked likely port conflicts  
  **Result:** Found 8080 unsuitable for this setup  
  **Why:** Needed a port that would not clash with existing services  
  **Evidence:** Existing service already bound to 8080  
  **Next Step:** Use 8082 in script

- **Timestamp:** 2026-03-06 09:12  
  **Action:** Prepared container creation script  
  **Result:** Script completed successfully  
  **Why:** Needed a repeatable setup for BC sandbox creation  
  **Evidence:** Script saved and ready to run  
  **Next Step:** Validate web client access

- **Timestamp:** 2026-03-06 09:20  
  **Action:** Tested BC web client URL  
  **Result:** Standard URL failed, tenant-specific variant worked  
  **Why:** Needed to confirm usable access from browser  
  **Evidence:** /BC/ failed, /BC/?tenant=default worked  
  **Next Step:** Move ticket to Blocked until URL pattern is confirmed

## Current Position
Container setup work is partly complete, but the environment cannot yet be classed as ready because the expected BC URL is not working consistently.

## Blocker

### Blocker Summary
Could not complete reliable Business Central web client validation.

### What Was Completed
- Port selection
- Script preparation
- Container startup attempt
- URL testing

### What Failed
- Expected BC web client endpoint did not work reliably

### Why It Failed
- The standard URL failed sign-in, but the tenant-specific URL worked

### Evidence
- Failed: http://192.168.1.228:8082/BC/
- Worked: http://192.168.1.228:8082/BC/?tenant=default

### Why This Blocks Completion
The environment cannot be confirmed as ready for remote AL publish/testing until the correct access pattern is known.

### What You Need To Do
- Confirm the correct target URL format
- Fix or confirm web client/container auth setup

### Next Step After Unblock
Re-test browser access and then validate extension publish.

## Completion Summary
Not complete.
```

---

## Usage Rule

Use this template for every ticket from **New** onward.

Never mark a ticket **Complete** unless all required acceptance criteria are satisfied. If any required task cannot be completed, move the ticket to **Blocked** and fill in the blocker section fully.

