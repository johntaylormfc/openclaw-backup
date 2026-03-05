# Connection Info - latest

## Container
- Name: latest
- Country: UK
- Version: latest
- User: john

## Access
- Web URL: http://192.168.1.146:18002
- Dev URL: http://192.168.1.146:19001

## From Another PC on LAN
1. Ensure you're on the same network
2. Open browser to: http://192.168.1.146:18002
3. Login with:
   - Username: john
   - Password: REDACTED

## Ports
- Web: 18002
- Dev: 19001

## Firewall (if needed)
To allow access from another PC:
```bash
# Run on host (requires sudo):
sudo ufw allow 18002/tcp
sudo ufw allow 19001/tcp
```

## Notes
- Generated: Thu  5 Mar 15:53:08 GMT 2026
- Logs: /home/john/.openclaw/workspace/bc_reliability/logs/
