# Remote Publish Checklist - Windows PC

## Prerequisites

1. **VS Code** with AL extension installed
2. **BC User** credentials (username: john)
3. **Network access** to host PC

## Setup Steps

### 1. Set Password (Local Machine)
On your Windows PC, never store the password in files:


### 2. Get Current Connection Info
From the host PC, run:
=== BC Container Info: bcuk-stage9-smoketest ===

Container not found

Note the:
- Host IP address
- Web port
- Dev port

### 3. Configure VS Code

Copy these settings to your .vscode/launch.json:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Remote - bcuk-stage9-smoketest",
      "type": "al",
      "request": "launch",
      "server": "http://192.168.1.146",
      "port": 19000,
      "serverInstance": "BC",
      "authentication": "UserPassword",
      "breakpointMethod": "SPA",
      "launchBrowser": true
    }
  ]
}
```

### 4. Test Connection

1. Open your AL project in VS Code
2. Press F5 to publish
3. If prompted, enter credentials:
   - Username: john
   - Password: (use $env:BC_PASSWORD)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check firewall on host; run  |
| Auth failed | Ensure BC_PASSWORD env var is set on Windows |
| Wrong port | Check bc-info output for current ports |
| Web works, publish fails | Dev port may be blocked; check firewall |

## Firewall Commands (Run on Host)
```bash
# Allow BC ports
sudo ufw allow 18000/tcp
sudo ufw allow 19000/tcp
```

