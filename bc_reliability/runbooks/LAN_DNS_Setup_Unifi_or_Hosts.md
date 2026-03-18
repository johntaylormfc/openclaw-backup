# LAN DNS Setup Guide

## Overview

To use friendly URLs like `http://bcuk-stage9-smoketest.lan/`, you need DNS resolution.

---

## Option 1: Router DNS (Preferred)

### UniFi
1. Go to Settings > Networks > LAN > DHCP Name Server
2. Add static DNS entry:
   - Name: bcuk-stage9-smoketest
   - IP: 192.168.1.146
3. Repeat for each container

### Other Routers
Look for "Static DNS" or "Host Overrides" in your router settings.

---

## Option 2: Windows Hosts File

Edit `C:\Windows\System32\drivers\etc\hosts`:

```
192.168.1.146 bcuk-stage9-smoketest.lan
```

Run Notepad as Administrator to edit.

---

## Option 3: Pi-hole / AdGuard

Add local DNS records:

| Domain | IP |
|--------|-----|
| bcuk-stage9-smoketest.lan | 192.168.1.146 |

---

## Current Containers

| Container | Hostname | Web Port |
|-----------|----------|----------|
| bcuk-stage9-smoketest | bcuk-stage9-smoketest.lan | 18000 |

---

## Test Without DNS

Use curl with Host header:
```bash
curl -H "Host: bcuk-stage9-smoketest.lan" http://192.168.1.146:80/
```

Or in browser, add to URL:
```
http://192.168.1.146:80/
```
And use browser DevTools to set Host header (advanced).
