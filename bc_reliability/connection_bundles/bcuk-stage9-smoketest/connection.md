# Connection Info - bcuk-stage9-smoketest

## Container
- Name: bcuk-stage9-smoketest
- Country: UK
- Version: latest
- User: john

## Access (Direct IP - No DNS Required)
- Web URL: http://192.168.1.146:18000
- Dev Port: 192.168.1.146:19000

## Optional: Friendly URLs (Requires DNS Setup)
- Friendly: http://bcuk-stage9-smoketest.lan/ (requires router DNS config)

## From Another PC on LAN
1. Open browser to: http://192.168.1.146:18000
2. Login with:
   - Username: john
   - Password: REDACTED

## Ports
- Web: 18000
- Dev: 19000

## Firewall (if needed)
To allow access from another PC:
```bash
# Run on host (requires sudo):
sudo ufw allow 18000/tcp
sudo ufw allow 19000/tcp
```

## Notes
- Generated: 2026-03-05 15:52
- Logs: ~/.openclaw/workspace/bc_reliability/logs/
