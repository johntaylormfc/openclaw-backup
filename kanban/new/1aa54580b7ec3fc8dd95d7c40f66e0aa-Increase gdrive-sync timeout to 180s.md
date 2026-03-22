# Ticket

**ID:** 1aa54580b7ec3fc8dd95d7c40f66e0aa
**Title:** Increase gdrive-sync timeout to 180s
**Status:** Complete
**Column:** new
**Priority:** Medium
**Created:** 2026-03-12T23:04:01.157Z
**Last Updated:** 2026-03-12T23:04:01.157Z
**Created By:** user
**Type:** task

## Summary
The Google Drive research sync cron is timing out at 120s. Increase timeout to prevent failed syncs.

## Activity Log
- 2026-03-21 13:24 UTC — timeoutSeconds increased 120→180 in jobs.json (job fabe8448)

