# Connection Info - {{container_name}}

## Container
- Name: {{container_name}}
- Country: {{country}}
- Version: {{version}}
- User: {{user}}
- Tenant: default

## Access
- **Recommended Web URL:** http://{{host_ip}}:{{web_port}}/BC/?tenant=default
- **Sign-In Shortcut:** http://{{host_ip}}:{{web_port}}/BC/SignIn?tenant=default
- Legacy Web URL (may fail): http://{{host_ip}}:{{web_port}}/BC/
- Dev URL: http://{{host_ip}}:{{dev_port}}

## From Another PC on LAN
1. Ensure you're on the same network
2. Open browser to: http://{{host_ip}}:{{web_port}}/BC/?tenant=default
3. Login with:
   - Username: {{user}}
   - Password: REDACTED

## Ports
- Web: {{web_port}}
- Dev: {{dev_port}}
- Tenant: default

## Firewall (if needed)
To allow access from another PC:
```bash
# Run on host (requires sudo):
sudo ufw allow {{web_port}}/tcp
sudo ufw allow {{dev_port}}/tcp
```

## Notes
- Generated: {{timestamp}}
- Logs: /home/john/.openclaw/workspace/bc_reliability/logs/
