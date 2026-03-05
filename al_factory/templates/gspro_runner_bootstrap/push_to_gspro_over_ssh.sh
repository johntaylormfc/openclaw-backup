#!/bin/bash
# Push runner bootstrap to GSPro via SSH
# Usage: ./push_to_gspro_over_ssh.sh

GSPRO_HOST="192.168.1.228"
GSPRO_USER="bot"
SOURCE_DIR="$HOME/.openclaw/workspace/al_factory/templates/gspro_runner_bootstrap"

echo "=== Push to GSPro ==="
echo "Source: $SOURCE_DIR"
echo "Target: $GSPRO_USER@$GSPRO_HOST:C:/actions-runner-bootstrap/"
echo ""

# Check if SSH is available
if ! command -v scp &> /dev/null; then
    echo "ERROR: scp not found"
    exit 1
fi

# Check SSH connection
echo "Testing SSH connection..."
if ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no $GSPRO_USER@$GSPRO_HOST "echo OK" 2>/dev/null; then
    echo "SSH connection OK"
else
    echo "ERROR: Cannot connect to $GSPRO_USER@$GSPRO_HOST"
    echo ""
    echo "Please configure SSH access:"
    echo "  Add to ~/.ssh/config:"
    echo "    Host gspro"
    echo "      HostName 192.168.1.228"
    echo "      User bot"
    echo "      IdentityFile ~/.ssh/id_rsa"
    echo ""
    echo "Or run manually:"
    echo "  scp -r $SOURCE_DIR/* bot@192.168.1.228:C:/actions-runner-bootstrap/"
    exit 1
fi

# Copy files
echo "Copying files..."
scp -r "$SOURCE_DIR"/* "$GSPRO_USER@$GSPRO_HOST:C:/actions-runner-bootstrap/"

if [ $? -eq 0 ]; then
    echo "Done!"
    echo ""
    echo "On GSPro, run (as Administrator):"
    echo "  cd C:\\actions-runner-bootstrap"
    echo "  .\\gspro_bootstrap.ps1"
    echo "  .\\install_runner.ps1"
else
    echo "ERROR: Copy failed"
fi
