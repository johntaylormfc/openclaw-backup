#!/bin/bash
# Email to Todoist - with conditional notification

cd /home/john/.openclaw/workspace/scripts

# Run the script and capture output
OUTPUT=$(node email-to-todoist.js 2>&1)
EXIT_CODE=$?

echo "$OUTPUT"

# Check if new tasks were created
if echo "$OUTPUT" | grep -q "NEW TASKS CREATED"; then
    # Send WhatsApp notification
    openclaw message send --channel whatsapp --target +447967688452 --message "📧 Email to Todoist: New task(s) created from email"
fi
