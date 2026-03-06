#!/bin/bash
# BC Container Management Skill

# SSH to GSPRO
SSH_CMD="sshpass -p 'BotBotBot!' ssh -o StrictHostKeyChecking=no bot@192.168.1.228"

# Parse command
ACTION="$1"
CONTAINER_NAME="$2"
COUNTRY="${3:-w1}"
MEMORY="${4:-6GB}"

case "$ACTION" in
  "create")
    if [ -z "$CONTAINER_NAME" ]; then
      echo "Error: Container name required. Usage: create <container-name> [country]"
      exit 1
    fi
    
    echo "Creating BC container '$CONTAINER_NAME' on GSPRO..."
    
    # Build the PowerShell command
    PS_CMD="Import-Module BCContainerHelper -Force; New-NavContainer -accept_eula -containerName $CONTAINER_NAME -artifactUrl (Get-BcArtifactUrl -type sandbox -country $COUNTRY -select Latest) -memoryLimit $MEMORY -isolation hyperv -includeAL -auth NavUserPassword -Credential (New-Object PSCredential('john', (ConvertTo-SecureString 'john' -AsPlainText -Force)))"
    
    $SSH_CMD "powershell -NoProfile -Command '$PS_CMD'" &
    echo "Container creation started. This will take several minutes..."
    echo "Check progress with: docker ps"
    ;;
    
  "delete")
    if [ -z "$CONTAINER_NAME" ]; then
      echo "Error: Container name required. Usage: delete <container-name>"
      exit 1
    fi
    
    echo "Deleting container '$CONTAINER_NAME'..."
    $SSH_CMD "docker rm -f $CONTAINER_NAME"
    ;;
    
  "list")
    echo "BC Containers on GSPRO:"
    $SSH_CMD "docker ps -a --filter 'ancestor=mcr.microsoft.com/businesscentral*'"
    ;;
    
  *)
    echo "BC Container Skill"
    echo "Usage: $0 <action> [options]"
    echo ""
    echo "Actions:"
    echo "  create <name> [country] [memory]  - Create a new BC container"
    echo "  delete <name>                     - Delete a container"
    echo "  list                              - List containers"
    echo ""
    echo "Examples:"
    echo "  $0 create myapp"
    echo "  $0 create testapp uk"
    echo "  $0 delete myapp"
    ;;
esac
