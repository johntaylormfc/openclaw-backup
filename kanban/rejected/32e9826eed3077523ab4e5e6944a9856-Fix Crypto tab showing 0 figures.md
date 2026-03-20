# Ticket

**ID:** 32e9826eed3077523ab4e5e6944a9856
**Title:** Fix Crypto tab showing 0 figures
**Status:** Rejected
**Column:** rejected
**Priority:** Medium
**Created:** 2026-02-20T16:34:08.432Z
**Last Updated:** 2026-02-20T16:34:08.432Z
**Created By:** user
**Type:** task

## Summary
Crypto tab was not displaying data because container could not access /tmp/crypto.json. Fixed by mounting host /tmp into container. Data now showing correctly.

## Activity Log

