#!/bin/sh
# NAS single-mount entrypoint wrapper
# Creates symlinks so /tv, /movies, /downloads, etc. point to /data subdirectories
# This enables hardlinks across all ARR paths since they share the same NFS filesystem

echo "[nas-entrypoint] Setting up NFS symlinks..."

# Map of container paths -> NAS subdirectory names
NAS_DIRS="/tv:TV /movies:Movies /books:Books /downloads:Downloads /complete:Complete /incomplete:incomplete-downloads /backups:backups"

for PAIR in $NAS_DIRS; do
    CONTAINER_PATH="${PAIR%%:*}"
    NAS_SUBDIR="${PAIR##*:}"
    if [ ! -e "$CONTAINER_PATH" ]; then
        echo "  Symlink: $CONTAINER_PATH -> /data/$NAS_SUBDIR"
        ln -s "/data/$NAS_SUBDIR" "$CONTAINER_PATH"
    else
        echo "  Skip: $CONTAINER_PATH already exists"
    fi
done

echo "[nas-entrypoint] Starting original entrypoint: $@"
exec "$@"
