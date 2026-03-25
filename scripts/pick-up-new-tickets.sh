#!/bin/bash
# pick-up-new-tickets.sh
# Checks kanban/new for unstarted tickets and begins work on the oldest one.
# Reports to WhatsApp when work begins.

NEW_DIR="/home/john/.openclaw/workspace/kanban/new"
IN_PROGRESS_DIR="/home/john/.openclaw/workspace/kanban/in-progress"
WHATSAPP_MSG_FILE="/tmp/pickup_msg.txt"

# Check if there are any new tickets
shopt -s nullglob
tickets=("$NEW_DIR"/*.md)
shopt -u nullglob

if [ ${#tickets[@]} -eq 0 ]; then
  echo "No new tickets to pick up."
  exit 0
fi

# Get the oldest ticket (by creation date in filename or filesystem time)
# Use ls -t to sort by modification time, take the oldest
oldest=$(ls -t "$NEW_DIR"/*.md 2>/dev/null | tail -1)

if [ -z "$oldest" ]; then
  echo "No tickets found."
  exit 0
fi

ticket_name=$(basename "$oldest")
echo "Picking up ticket: $ticket_name"

# Move to in-progress
mv "$oldest" "$IN_PROGRESS_DIR/"

# Extract ticket ID and title for WhatsApp message
ticket_id=$(echo "$ticket_name" | sed 's/\.md$//')
title=$(grep "^**Title:**" "$IN_PROGRESS_DIR/$ticket_name" 2>/dev/null | sed 's/^\*\*Title:\*\* //' | head -c 80)

# Update the ticket status in-place
if [ -f "$IN_PROGRESS_DIR/$ticket_name" ]; then
  sed -i 's/^\*\*Status:\*\*.*/**Status:** In Progress/' "$IN_PROGRESS_DIR/$ticket_name" 2>/dev/null
  # Add a note that auto-pickup started
  timestamp=$(date '+%Y-%m-%d %H:%M')
  {
    echo ""
    echo "---"
    echo "**Auto-Pickup:** Started at $timestamp by pick-up-new-tickets cron"
  } >> "$IN_PROGRESS_DIR/$ticket_name"
fi

# Build WhatsApp message
cat > "$WHATSAPP_MSG_FILE" << EOF
🔧 *Auto-picked up new ticket*

*$title*

Started work automatically. I'll report back when there's something to review.
EOF

# Send WhatsApp
curl -s -X POST "http://localhost:8080/api/notify" \
  -H "Content-Type: application/json" \
  -d "{\"message\": $(cat "$WHATSAPP_MSG_FILE" | jq -Rs .)}" \
  2>/dev/null || echo "$(cat "$WHATSAPP_MSG_FILE")"

rm -f "$WHATSAPP_MSG_FILE"
echo "Done. Ticket $ticket_id picked up."
