#!/bin/bash
# use-case-hunter.sh — Daily OpenClaw use case discovery
# Deduplication: skips creating ideas whose title/url/repo already exists in kanban/idea/

set -eo pipefail

KANBAN_IDEA_DIR="/home/john/.openclaw/workspace/kanban/idea"
TODAY=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d\ %H:%M)
LOGFILE="/home/john/.openclaw/workspace/logs/use-case-hunter.log"
TRACK_FILE="/tmp/use-case-hunter-seen.txt"

mkdir -p "$KANBAN_IDEA_DIR" "/home/john/.openclaw/workspace/logs"

log() { echo "[$TIMESTAMP] $*" >> "$LOGFILE"; }

# ─────────────────────────────────────────
# Build dedup sets from ALL kanban folders
# (idea/, complete/, done/, rejected/) so we
# never create duplicate ideas
# ─────────────────────────────────────────
KNOWN_TITLES=$(mktemp)
KNOWN_URLS=$(mktemp)
KNOWN_REPOS=$(mktemp)

KANBAN_DIR="/home/john/.openclaw/workspace/kanban"
for dir in idea complete done rejected; do
  [ -d "$KANBAN_DIR/$dir" ] && find "$KANBAN_DIR/$dir" -name "*.md" -type f 2>/dev/null || true
done | while IFS= read -r file; do
  # Extract and normalise title — use fgrep for exact string match on markdown bold syntax
  title=$(fgrep "**Title:**" "$file" 2>/dev/null | sed 's/^\*\*Title:\*\* *//' | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr -d '\r' || true)
  echo "$title" >> "$KNOWN_TITLES"

  # Extract URL
  url=$(fgrep "## URL" "$file" 2>/dev/null | head -1 | sed 's/## URL//' | sed 's/^ *//' | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]\r' || true)
  echo "$url" >> "$KNOWN_URLS"

  # Extract GitHub repo name (format: "GitHub: owner/repo | description")
  repo=$(echo "$title" | sed -n 's/^GitHub: \([^|]*\)|.*/\1/Ip' | tr '[:upper:]' '[:lower:]' | tr -d '\r' || true)
  echo "$repo" >> "$KNOWN_REPOS"
done

sort -u "$KNOWN_TITLES" -o "$KNOWN_TITLES"
sort -u "$KNOWN_URLS"   -o "$KNOWN_URLS"
sort -u "$KNOWN_REPOS"  -o "$KNOWN_REPOS"

log "Dedupe sets loaded from existing ideas"

# ─────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────
slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-' | head -c 40
}

found_new() {
  local name="$1" url="$2" repo="$3"
  local title_norm url_norm repo_norm
  title_norm=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr -d '\r')
  url_norm=$(echo "$url" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]\r')
  repo_norm=$(echo "$repo" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]\r')

  # Check URL first (most reliable for web results)
  if [ -n "$url_norm" ] && grep -qFx "$url_norm" "$KNOWN_URLS" 2>/dev/null; then
    log "Skipped duplicate URL: $url_norm"; return 1
  fi
  # Check title
  if [ -n "$title_norm" ] && grep -qFx "$title_norm" "$KNOWN_TITLES" 2>/dev/null; then
    log "Skipped duplicate title: $title_norm"; return 1
  fi
  # Check GitHub repo
  if [ -n "$repo_norm" ] && grep -qFx "$repo_norm" "$KNOWN_REPOS" 2>/dev/null; then
    log "Skipped duplicate repo: $repo_norm"; return 1
  fi
  return 0
}

create_idea() {
  local prefix="$1" title="$2" url="$3" source="$4"
  local slug norm norm_url norm_title norm_repo

  slug=$(slugify "$title")
  norm=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr -d '\r')
  norm_url=$(echo "$url" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]\r')

  # Ensure unique filename
  local idea_file="$KANBAN_IDEA_DIR/$(printf '%04d' "$NEXT_NUM")-$prefix-$slug.md"
  local counter=0
  while [ -f "$idea_file" ]; do
    counter=$((counter + 1))
    idea_file="$KANBAN_IDEA_DIR/$(printf '%04d' "$NEXT_NUM")-$prefix-${slug}_${counter}.md"
  done

  cat > "$idea_file" << EOF
# Idea
**ID:** $(basename "$idea_file" .md | sed 's/-[0-9]*-/-/; s/^IDEA-/IDEA-/')
**Title:** $title
**Status:** Pending Review
**Suggested Priority:** Medium
**Source:** $source (use-case-hunter)
**Created:** $TODAY
**Last Updated:** $TODAY

## Summary
$title

## URL
${url:-}

## Why It Might Matter
Found during daily web search for OpenClaw use cases.

## Suggested Outcome
- [ ] Review and evaluate
- [ ] Accept or reject

## Context
- Source: $source via SearXNG
- Found: $TIMESTAMP

## Approval Decision
Pending Review
EOF

  echo "$norm" >> "$KNOWN_TITLES"
  echo "$norm_url" >> "$KNOWN_URLS"
  new_idea_names+=("$title")
  new_ideas=$((new_ideas + 1))
  NEXT_NUM=$((NEXT_NUM + 1))
  log "Created idea: $idea_file"
}

# Count existing ideas for numbering
shopt -s nullglob
IDEA_FILES=("$KANBAN_IDEA_DIR"/*.md)
IDEA_COUNT=${#IDEA_FILES[@]}
NEXT_NUM=$((IDEA_COUNT + 1))
shopt -u nullglob

log "Starting use case hunt #$NEXT_NUM"

declare -a new_idea_names
new_ideas=0
WHATSAPP_MSG="🔍 *OpenClaw Use Case Hunt — $TODAY*\n\n"

# ─────────────────────────────────────────
# 1. ClawHub — popular skills
# ─────────────────────────────────────────
log "Searching ClawHub..."
clawhub_skills=$(curl -s "https://clawhub.com/api/skills?sort=popular&limit=5" 2>/dev/null | \
  jq -r '.[] | select(.name | contains("openclaw") or contains("arr") or contains("automation")) | .name' 2>/dev/null | head -3 || true)

if [ -n "$clawhub_skills" ]; then
  while IFS= read -r skill; do
    [ -z "$skill" ] && continue
    if found_new "ClawHub Skill: $skill" "" ""; then
      create_idea "clawhub" "ClawHub Skill: $skill" "" "ClawHub"
    fi
  done <<< "$clawhub_skills"
fi

# ─────────────────────────────────────────
# 2. Reddit r/OpenClaw — hot posts
# ─────────────────────────────────────────
log "Searching Reddit..."
reddit_raw=$(curl -s "https://www.reddit.com/r/OpenClaw/hot/.json?limit=5" \
  -H "User-Agent: Mozilla/5.0" 2>/dev/null || true)

if [ -n "$reddit_raw" ]; then
  reddit_count=0
  while IFS= read -r post; do
    [ -z "$post" ] || [[ $reddit_count -ge 2 ]] && continue
    if found_new "$post" "" ""; then
      create_idea "reddit" "$post" "" "Reddit r/OpenClaw"
      reddit_count=$((reddit_count + 1))
    fi
  done < <(echo "$reddit_raw" | jq -r '.data.children[].data.title' 2>/dev/null)
fi

# ─────────────────────────────────────────
# 3. GitHub — top openclaw/arr repos
# ─────────────────────────────────────────
log "Searching GitHub..."
github_results=$(curl -s "https://api.github.com/search/repositories?q=openclaw+openclaw-agent+OR+openclaw-skill+OR+openclaw-plugin&sort=stars&per_page=10" \
  -H "Accept: application/vnd.github.v3+json" 2>/dev/null | \
  jq -r '.items[0:3][] | "\(.full_name) |\(.description // "no description")"' 2>/dev/null || true)

if [ -n "$github_results" ]; then
  while IFS= read -r repo; do
    [ -z "$repo" ] && continue
    full_name=$(echo "$repo" | cut -d'|' -f1 | tr -d '[:space:]')
    desc=$(echo "$repo" | cut -d'|' -f2- | sed 's/^ *//')
    if found_new "GitHub: $repo" "" "$full_name"; then
      create_idea "github-$(slugify "$full_name")" "GitHub: $repo" "https://github.com/$full_name" "GitHub"
    fi
  done <<< "$github_results"
fi

# ─────────────────────────────────────────
# 4. Discord — skip (no reliable free API)
# ─────────────────────────────────────────
log "Skipping Discord (no free API)"

# ─────────────────────────────────────────
# 5. Web search via SearXNG (local)
# ─────────────────────────────────────────
log "Searching via SearXNG..."
# Targeted queries: find real OpenClaw implementations, not listicles
# Filter out known listicle domains
WEB_EXCLUDE_DOMAINS="sphere.com|make-use-of.com|techrepublic.com|medium.com/|ilovepc.io|digitalcitizen.life|home_network_engineer"

for query in "openclaw+self-hosted+automation+workflow" "openclaw+ai+agent+setup+guide" "openclaw+open+source+use+case"; do
  searxng_raw=$(curl -s "http://127.0.0.1:8890/search?q=${query}&format=json&engines=google,duckduckgo&count=8" 2>/dev/null || true)
  if [ -n "$searxng_raw" ]; then
    while IFS= read -r title && IFS= read -r url; do
      [ -z "$title" ] || [ -z "$url" ] && continue
      # Skip known listicle/aggregator domains
      if echo "$url" | grep -qiE "$WEB_EXCLUDE_DOMAINS"; then
        log "Skipped listicle domain: $url"; continue
      fi
      # Skip very short titles (likely headlines)
      if [ "${#title}" -lt 20 ]; then
        log "Skipped short title: $title"; continue
      fi
      if found_new "$title" "$url" ""; then
        create_idea "web" "$title" "$url" "Web search via SearXNG"
        web_count=$((web_count + 1))
        [[ $web_count -ge 1 ]] && break 2  # Max 1 web result per run
      fi
    done < <(echo "$searxng_raw" | jq -r '.results[] | "\(.title)\n\(.url)"' 2>/dev/null)
  fi
done

# ─────────────────────────────────────────
# WhatsApp digest
# ─────────────────────────────────────────
if [ "$new_ideas" -gt 0 ]; then
  WHATSAPP_MSG="${WHATSAPP_MSG}Found *$new_ideas new idea(s)*:\n\n"
  for name in "${new_idea_names[@]}"; do
    WHATSAPP_MSG="${WHATSAPP_MSG}• $name\n"
  done
  WHATSAPP_MSG="${WHATSAPP_MSG}\nReview anytime — accept to fill out requirements!"
else
  WHATSAPP_MSG="${WHATSAPP_MSG}No new ideas today. Checked ClawHub, Reddit, GitHub, and web. Try again tomorrow!"
fi

log "Hunt complete. New ideas: $new_ideas"

# Output summary — cron delivery handles WhatsApp notification
echo ""
echo "🔍 OpenClaw Use Case Hunt — $TODAY"
echo ""
if [ "$new_ideas" -gt 0 ]; then
  echo "Found $new_ideas new idea(s):"
  for name in "${new_idea_names[@]}"; do
    echo "• $name"
  done
  echo ""
  echo "Review anytime — accept to fill out requirements!"
else
  echo "No new ideas today. Checked ClawHub, Reddit, GitHub, and web."
  echo "Try again tomorrow!"
fi
echo ""
echo "Hunt complete: $new_ideas new ideas added."

# Cleanup
rm -f "$KNOWN_TITLES" "$KNOWN_URLS" "$KNOWN_REPOS"
