# GSPro Runner Bootstrap Setup

## Overview

This kit helps install a GitHub Actions self-hosted runner on GSPro Windows machine.

## Prerequisites

- [ ] Docker for Windows running (Windows containers)
- [ ] BcContainerHelper module installed
- [ ] Git installed
- [ ] RDP or SSH access to GSPro (192.168.1.228)

## Step-by-Step

### Step 1: Get Runner Token

1. Go to: https://github.com/johntaylormfc/openclaw/settings/actions/runners
2. Click "Add runner"
3. Copy the registration token (starts with `ghp_`)

### Step 2: Download Runner (as Administrator)

On GSPro, open PowerShell as Administrator:

```powershell
# Download and extract runner
irm https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-win-x64-2.320.0.zip -OutFile runner.zip
Expand-Archive -Path runner.zip -DestinationPath C:\actions-runner -Force
cd C:\actions-runner

# Configure runner (replace TOKEN with your token)
.\config.cmd --unattended --url https://github.com/johntaylormfc/openclaw --token YOUR_TOKEN --name gspro-01 --labels gspro,windows --work _work

# Install as service (LocalSystem)
.\svc.bat install

# Start service
.\svc.bat start
```

## Modes

### Mode A: LocalSystem (Default - No Password)

```powershell
.\svc.bat install
.\svc.bat start
```

### Mode B: Service Account "bot" (Requires Password)

```powershell
# Will prompt for password interactively
$cred = Get-Credential -UserName "bot"
New-Service -Name "actions-runner" -BinaryPathName "C:\actions-runner\runsvc.cmd" -Credential $cred -DisplayName "GitHub Actions Runner"
```

## Verify

1. Check service: `Get-Service actions-runner`
2. Check GitHub: Runner should show "Idle" / "Online"

## Troubleshooting

- Runner not online? Check logs: `C:\actions-runner\_diag`
- Service failed? Run interactively: `.\run.cmd`

## Files Included

- `gspro_bootstrap.ps1` - Download runner
- `install_runner.ps1` - Configure and install
- `uninstall_runner.ps1` - Remove runner
