# Drive Backup Issue - March 26, 2026

## Problem
Backup failed - rclone config is empty. No remote named "openclaw" configured.

## Required Action
Need to configure rclone with Google Drive:
```bash
rclone config
```

Create a remote named "openclaw" pointing to Google Drive, then re-run the backup.

## Status
- ❌ Failed at 00:02 UTC