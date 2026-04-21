# Golf Scorer — GitHub Spark Prompt

**Goal:** Rebuild the Golf Scorer championship tournament management system as a modern React web app with Supabase backend.

---

## What The App Does

Golf Scorer is a full-featured golf tournament management system for the Golf Scorer championship series. It lets tournament organizers run real-time scored golf competitions with live leaderboards, multiple tournament support, player handicap tracking, and group-based PIN authentication.

**Target users:** Golf club administrators running tournaments, and players entering/viewing scores during events.

---

## Core Features (5 Main Areas)

### 1. Tournament Management
- Create/edit/delete tournaments — each has name, year, course name, 18-hole layout (par + stroke index per hole), slope rating, course rating, start/end dates
- Only ONE tournament is active at a time (database trigger enforces this)
- Tournament status: upcoming → active → completed
- Upload a tournament logo (stored as URL)
- Switch between completed tournaments to view historical results

### 2. Player Management
- Add/edit/delete players — name, handicap, CDH number (CONGU handicap number), bio, photo URL
- Player profile shows full scoring history across all tournaments
- World Handicap System (WHS) calculations:
  - **Playing Handicap** = Handicap × (Slope Rating / 113) — rounded to nearest integer
  - **Stableford points** = 2 + (par − strokes received), with extra stroke on holes where stroke index ≤ playing handicap and stroke index ≤ remainder

### 3. Group Management + PIN Authentication
- Players are assigned to groups (threesomes/foursomes)
- When groups are auto-generated, each group gets a **unique random 4-digit PIN** (1000–9999) stored in the database
- **Admin PIN** (1991) → full access to all tabs: Tournaments, Course, Setup, Scoring, Leaderboard, Players, History
- **Group PIN** → limited access: only Scoring and Leaderboard tabs, only their own group's scores
- Score inputs for other groups are grayed out/read-only for group users

### 4. Real-Time Scoring
- Select a tee time group and enter scores hole-by-hole
- **Medal format:** strokes taken per hole, net score = gross − playing handicap
- **Stableford format:** stableford points per hole (auto-calculated)
- NR (No Return) button for unfinished holes — hole counts as net par
- Running total shows cumulative score as each hole is entered
- Extra stroke logic: hole gives +1 stroke if stroke index ≤ playing handicap AND stroke index ≤ remainder
- Score colour coding: eagle/birdie/par/bogey/double

### 5. Live Leaderboard
- Ranks all players by net score (Medal) or total Stableford points
- Collapsible player rows — tap to expand and see hole-by-hole breakdown
- Tee times displayed per group
- Automatically updates as scores are entered

---

## UI/UX

### Visual Style
- **Colours:** Forest green (#047857) primary, emerald (#10b981) accent, gold (#f59e0b) for highlights, cream (#fef3c7) for PIN box
- **Fonts:** Merriweather (serif, headings) + Open Sans (body) via Google Fonts
- **Pattern:** Hero section uses green gradient + subtle diamond SVG pattern
- **Buttons:** Green gradient, rounded, classic shadow, hover-lift effect
- **Cards:** Trophy-gold gradient for 1st place, white cards with shadow
- **Tabs:** Horizontal scrollable tab bar on mobile, row of pill tabs on desktop
- **Responsive:** Mobile-first — works on phone at tournament, desktop for admin

### Screens
1. **PIN Entry** — Clean numeric keypad, masked input, green logo header, "Invalid PIN" error
2. **Tournaments** — Grid of tournament cards with status badges (upcoming/active/completed/archived)
3. **Course** — Table of 18 holes: Hole #, Par, Stroke Index — editable by admin
4. **Setup** — Auto-generate groups (threesomes/foursomes) + manual group editor with drag-to-add players
5. **Scoring** — Group selector buttons with PIN shown in monospace, score entry grid (hole-by-hole inputs)
6. **Leaderboard** — Ranked list, expandable rows, score colours
7. **Players** — Card grid of player profiles, add/edit player modal with image upload
8. **History** — Per-player score history across tournaments

### Admin Documents (auto-generated)
- **Scoring Manual** — Printable HTML scoring guide for players
- **Admin Guide** — Full admin instructions

---

## Tech Stack

- **Frontend:** React 18 SPA — single `app.js` (all components in one file via React.createElement), Tailwind CSS CDN + custom CSS, Google Fonts
- **Backend:** Supabase (PostgreSQL + auth + storage)
- **External API:** `golfcourseapi.com` for course data (key hardcoded in app.js)
- **Deploy:** Netlify (static hosting)
- **Icons:** Custom inline SVG icon set (Trophy, Users, Plus, Edit, Award, Trash)

---

## Database Schema (Supabase PostgreSQL)

```
players        — id (UUID), name, handicap, cdh_number, bio, photo_url, created_at
tournaments    — id (UUID), name, year, course_name, slope_rating, course_rating, start_date, end_date, is_active, status, logo_url
holes          — id (UUID), tournament_id (FK), hole_number (1-18), par, stroke_index
groups         — id (UUID), tournament_id (FK), name, pin (unique 4-digit), tee_time
group_players  — group_id (FK), player_id (FK)
scores         — id (UUID), group_id (FK), player_id (FK), hole_number, strokes, stableford_points, nr_flag
```

**Trigger:** Only one `is_active = true` tournament at a time.

---

## File Structure (target)

```
index.html        — loads CDN libraries + app.js
app.js            — all React components + logic (3000+ lines, refactor into modules if possible)
styles.css        — custom CSS, fonts, effects
database_setup.sql — complete DDL for Supabase SQL editor
migrations/       — incremental schema changes
admin-guide.html  — printable admin manual
scoring-manual.html — printable player scoring guide
README.md         — setup instructions
```

---

## Security Notes (for rebuild)
- Supabase anon key is exposed in app.js — move to Netlify env vars or serverless function
- Add Supabase Row Level Security (RLS) policies per table
- PINs stored in plain text — hash them

---

## Prompt for Spark

> Build a golf tournament management web app called **Golf Scorer** with the following spec:
>
> **Stack:** React 18 SPA with Tailwind CSS + custom CSS (Merriweather + Open Sans fonts), deployed to Netlify. Supabase PostgreSQL backend. No build step — single HTML file loads React and Supabase from CDN.
>
> **Auth:** PIN-based. Admin PIN (1991) gets full access. Group PINs (auto-generated 4-digit) get restricted access to only their group's scoring tab and leaderboard. Numeric keypad on mobile.
>
> **5 main features:**
> 1. **Tournament Management** — create/edit/delete tournaments with 18-hole course setup (par + stroke index per hole), slope/course rating, status flow: upcoming → active → completed. Only one active tournament at a time (enforced by DB trigger).
> 2. **Player Management** — add/edit players (name, handicap, CDH number, photo). View player history across all tournaments. World Handicap System: playing handicap = handicap × (slope/113). Stableford: 2 + (par − strokes received), +1 stroke on holes where stroke index ≤ playing handicap and stroke index ≤ remainder.
> 3. **Group Management** — auto-generate playing groups (threesomes/foursomes) or manually create groups. Each group gets a unique random 4-digit PIN. PINs shown on scoring screen in monospace font.
> 4. **Real-Time Scoring** — hole-by-hole score entry. Medal (strokes) and Stableford (auto-calculated points). NR (No Return) for unfinished holes. Running total. Extra stroke logic. Score colours: eagle/birdie/par/bogey/double.
> 5. **Live Leaderboard** — ranked by net score (Medal) or Stableford points. Collapsible rows with hole-by-hole breakdown. Updates as scores are entered.
>
> **Visual:** Forest green (#047857) primary, emerald accent, gold highlights. Trophy-gold gradient for 1st place. Classic shadow, hover-lift on buttons. Mobile-first responsive. Green gradient hero with diamond SVG pattern.
>
> **Database schema:** players, tournaments, holes, groups, group_players, scores. Single active tournament trigger. Full SQL setup script included.
>
> **Deliverables:** index.html, app.js, styles.css, database_setup.sql, migrations/, admin-guide.html, scoring-manual.html, README.md.
>
> **Constraints:** No build step. Mobile-first. PIN authentication with role separation (admin vs group). WHS handicap calculations. Medal and Stableford scoring. Live leaderboard with expandable hole-by-hole detail.
