# UniFi DNS/DHCP Setup for BC Containers

## Overview

This guide helps you set up local DNS so BC container hostnames like `bcuk-stage9-smoketest.lan` resolve automatically on your network.

## Option 1: Use Router DHCP DNS (Recommended)

### Steps

1. **Log into UniFi Controller**
   - Open UniFi Network application
   - Go to Settings → Networks

2. **Find your LAN Network**
   - Click on LAN (or your local network)

3. **Set DHCP Name Server**
   - Under "DHCP Name Server", select "Manual"
   - Enter: `192.168.1.146` (Beelink IP)
   - Save

4. **Verify on Windows PC**
   ```cmd
   ipconfig /flushdns
   nslookup bcuk-stage9-smoketest.lan
   ```

### Rollback
- Set DHCP Name Server back to "Automatic" or your router's IP

---

## Option 2: Use Windows Hosts File (Alternative)

If router DNS doesn't work:

1. Open Notepad as Administrator
2. Edit: `C:\Windows\System32\drivers\etc\hosts`
3. Add:
   ```
   192.168.1.146  bcuk-stage9-smoketest.lan
   ```

---

## Current DNS Records

| Container | Hostname | IP |
|-----------|----------|-----|
| bcuk-stage9-smoketest | bcuk-stage9-smoketest.lan | 192.168.1.146 |

---

## Troubleshooting

### DNS Not Working
1. Flush DNS: `ipconfig /flushdns`
2. Check DNS server: `ipconfig /all | findstr /C:"DNS Servers"`
3. Verify router points to Beelink for DNS

### Container Not Accessible
- Check bc-proxy: `bc-proxy status`
- Check firewall: `sudo ufw status`

---

## bc-dns Command

Generate updated DNS records:
```bash
bc-dns
```

Sync to DNS server:
```bash
bc-dns-sync
```
