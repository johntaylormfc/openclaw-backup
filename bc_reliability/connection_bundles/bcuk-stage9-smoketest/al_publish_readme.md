# AL Publish Guide - bcuk-stage9-smoketest

## Quick Start

### 1. Set Password (Don't store in files!)
PowerShell:
$env:BC_PASSWORD = "your_password"

### 2. Configure VS Code
Copy contents to .vscode/:
- vscode_launch.template.json -> launch.json
- vscode_settings.template.json -> settings.json

### 3. Publish
Press F5 in VS Code

## Connection Options

### Option A: Friendly URL (Recommended)
- URL: http://bcuk-stage9-smoketest.lan/
- Requires DNS/hosts entry
- See: bc-dns

### Option B: Direct Access
- Web: http://192.168.1.146:18000
- Dev: http://192.168.1.146:19000

## Troubleshooting

| Issue | Solution |
|-------|----------|
| DNS not found | Run win_connectivity_check.ps1 |
| Auth failed | Set BC_PASSWORD env var |
| Port blocked | Check firewall |
