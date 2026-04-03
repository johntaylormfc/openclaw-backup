# OpenClaw Kanban Workflow

## Board Structure (6 columns)
```
kanban/
  idea/        ← cron drops ideas here for John's review
  new/         ← accepted by John, ready for cron to pick up
  in-progress/ ← cron is actively working
  done/        ← cron finished, awaiting John's sign-off
  complete/    ← John confirmed, fully done
  blocked/     ← issue hit, blocker documented, John needs to act
```

## Flow Summary
```
cron creates idea → idea/
John reviews → accept (→ new/) or reject (→ rejected/)
Cron picks up → new/ → in-progress/
Work complete → in-progress/ → done/ → John notified
Work blocked → in-progress/ → blocked/ → John notified
John unblocks → blocked/ → new/ → cron picks up again
John signs off → done/ → complete/
```

## Kanban Folder Commands
```
Board:     find /home/john/.openclaw/workspace/kanban -type f | sort
New:       find /home/john/.openclaw/workspace/kanban/new -type f | sort
In Prog:   find /home/john/.openclaw/workspace/kanban/in-progress -type f | sort
Done:      find /home/john/.openclaw/workspace/kanban/done -type f | sort
Complete:  find /home/john/.openclaw/workspace/kanban/complete -type f | sort
Blocked:   find /home/john/.openclaw/workspace/kanban/blocked -type f | sort
Ideas:     find /home/john/.openclaw/workspace/kanban/idea -type f | sort
```

## Dashboard
Open: http://192.168.1.146:5000

The dashboard shows: Ideas | New | In Progress | Blocked | Done | Complete

## Rules
- Only OC-#### prefixed items go in new/ (accepted ideas become tickets)
- IDEA-#### items belong in idea/ — nowhere else
- done = awaiting John, not a final state
- John must actively confirm complete/
- Blocked tickets must document exactly what needs to happen to unblock
- Cron picks up at most one ticket at a time
