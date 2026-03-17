# Idea
**ID:** IDEA-0082
**Title:** Gluetun VPN Container for ARR Stack
**Status:** Idea
**Suggested Priority:** High
**Source:** Cron
**Created:** 2026-03-16
**Last Updated:** 2026-03-16

## Summary
Integrate Gluetun VPN container (by qdm12) into the ARR stack to provide VPN-protected downloads for qBittorrent. Gluetun supports WireGuard, OpenVPN, and many VPN providers including Mullvad.

## Why It Matters
Running download clients behind a VPN is essential for privacy and avoiding ISP notices. Gluetun is the recommended VPN solution for Docker in 2026, supporting WireGuard (Mullvad's GotaTun just passed a security audit), automatic reconnections, and kill-switch functionality. The Corelab 2026 guide recommends Gluetun as the standard.

## Suggested Outcome
- Gluetun container added to docker-compose
- Configured with chosen VPN provider (Mullvad recommended based on recent audit)
- qBittorrent routed through Gluetun network
- Kill-switch tested and working
- VPN status visible in logs/container health

## Suggested Acceptance Criteria
- [ ] Gluetun deployed with VPN provider credentials
- [ ] qBittorrent network routed through Gluetun
- [ ] Kill-switch tested (VPN disconnect stops downloads)
- [ ] Logs confirm VPN connection established

## Context
- Gluetun GitHub: https://github.com/qdm12/gluetun
- Mullvad WireGuard audit: March 2026 - "no major vulnerabilities found"
- Corelab 2026 ARR guide recommends Gluetun over OpenVPN-based solutions
- qBittorrent is currently not VPN-protected

## Suggested Next Step
Choose VPN provider, obtain credentials, add Gluetun to compose, test with small download.

## Approval Decision
Pending

## Rejection Reason

## Notes
Different from torrent VPN automation (IDEA-0022 in rejected) - focuses specifically on Gluetun container deployment and integration.
