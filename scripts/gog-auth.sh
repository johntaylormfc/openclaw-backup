#!/bin/bash
# gog-auth.sh - completes OAuth in two steps without interactive terminal
ACCOUNT="johntaylormfc@gmail.com"
REDIRECT_HOST="openclaw.bcdev.co.uk"
SERVICES="gmail,calendar,drive,contacts"

echo "=== Step 1: Getting auth URL ==="
AUTH_OUTPUT=$(gog auth add $ACCOUNT --services $SERVICES --redirect-host $REDIRECT_HOST --remote --step 1 --force-consent 2>&1)
echo "$AUTH_OUTPUT"

# Extract auth_url
AUTH_URL=$(echo "$AUTH_OUTPUT" | grep "^auth_url" | cut -f2)
STATE=$(echo "$AUTH_URL" | grep -oP '(?<=state=)[^&]+')
echo ""
echo "STATE=$STATE"
echo "AUTH_URL=$AUTH_URL"
echo ""
echo "Open this URL in browser:"
echo "$AUTH_URL"
echo ""
echo "After granting access, paste the redirect URL here:"
read -r REDIRECT_URL
echo ""

echo "=== Step 2: Completing auth ==="
gog auth add $ACCOUNT --services $SERVICES --redirect-host $REDIRECT_HOST --remote --step 2 --auth-url "$REDIRECT_URL" --force-consent 2>&1
