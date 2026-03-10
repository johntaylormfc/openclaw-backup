# Idea

**ID:** IDEA-0047
**Title:** ARR Apps PostgreSQL Database Migration
**Status:** Idea
**Suggested Priority:** Medium
**Source:** Cron
**Created:** 2026-03-10
**Last Updated:** 2026-03-10

## Summary
Migrate ARR applications (Sonarr, Radarr, Prowlarr) from default SQLite databases to PostgreSQL for improved reliability, performance, and easier backup management.

## Why It Might Matter
The Servarr wiki now documents PostgreSQL setup for Sonarr. SQLite can cause locking issues and corruption with multiple containers accessing the database. PostgreSQL provides better concurrency, faster queries on large libraries, and more reliable backup/restore. LinuxServer.io containers support PostgreSQL natively.

## Suggested Outcome
ARR apps running on PostgreSQL with improved performance on large libraries and more robust database handling.

## Suggested Acceptance Criteria
- [ ] Evaluate current SQLite database sizes
- [ ] Set up PostgreSQL container in ARR stack
- [ ] Migrate Sonarr to PostgreSQL
- [ ] Migrate Radarr to PostgreSQL  
- [ ] Test all functionality post-migration
- [ ] Document migration steps for future reference

## Context
Source: https://wiki.servarr.com/sonarr/postgres-setup
Related: Existing ARR stack at /home/john/ARR/

## Suggested Next Step
Check current database sizes and plan PostgreSQL container setup.

## Approval Decision
Pending

## Rejection Reason

## Notes
Backup SQLite databases before migration. Consider using existing database container if available.
