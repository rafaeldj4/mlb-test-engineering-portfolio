# MLB.com Web Test Plan

## Product and Goals
- MLB.com is the official site of Major League Baseball: news, live scores, schedule, standings, stats, video, highlights, and links to apps/merch/tickets.
- Main goal: inform and engage fans with current content (games, standings, news, video), enable tracking of teams/players, and funnel to products (MLB app, merch, tickets).

## Test Strategy (High Level)
- Types: top-nav smoke, web functional (content, links, filters), video playback, data integration (scores/standings), basic accessibility (keyboard, roles), light i18n/l10n, perceived performance (initial load, carousels), basic tracking/ads presence.
- Approach: manual exploratory to catch UX/visual regressions and validate data; Playwright E2E for deterministic navigation/data flows; no API mocks, so use tolerant assertions for changing data (validate structure/states, not exact scores).
- Priority: 1) Global nav + home; 2) Scores/Standings/Schedule/Game detail; 3) Teams landing; 4) Video player; 5) News and search. Automate navigation and data-structure flows first.

## Critical Flows and Cases

### 1) Home + Global Navigation
- Why: entry point to all content.
- Manual: validate hero (image/title/link), cookie banner can be accepted/dismissed, carousels “Latest News/Hot Stove/Highlights” show cards with image+headline, footer legal/social links work.
- Auto (priority): nav `News/Scores/Schedule/Stats` opens correct pathname; logo returns home; “Skip to Content” focuses main.

### 2) Scores (Day Games)
- Why: core fan value; live data.
- Manual: change date (if selector), cards show teams and state (Live/Final/Upcoming), links to game detail work.
- Auto (priority): open `/scores` and verify at least 1 card with teams and state; open first game and validate URL contains `/game`.

### 3) Standings
- Why: high traffic, data-sensitive.
- Manual: tables by league/division; columns W/L/PCT/GB visible; tabs (AL/NL/Wild Card) change data.
- Auto (priority): load `/standings`, assert tables and standard headers; switch tab and verify data changes (text/row count changes).

### 4) Schedule
- Why: planning future/past games.
- Manual: date/month view; next/prev month works; team filters (if any); game links work.
- Auto (priority): load `/schedule`, move to next day/month and assert date title and list change.

### 5) Teams Landing
- Why: quick access per team.
- Manual: list of teams with logo/name; filter/search (if any); click opens team page.
- Auto (priority): open first team and verify URL `/team/{id}` and header with name.

### 6) Game Detail (Boxscore/Play-by-Play)
- Why: key experience during games.
- Manual: boxscore, scoring plays, highlights; tabs (Box/PBP/Recap) work; player/team links live.
- Auto (priority): from Scores, open first game and assert Box/PBP tabs visible; validate a summary/scoreline exists.

### 7) News Article
- Why: editorial consumption, high traffic.
- Manual: title, author/date, body, images/embeds load; internal links work.
- Auto (priority): open first article from Home “Latest News” and validate H1 visible and first paragraph present.

### 8) Video Player
- Why: high engagement.
- Manual: play/pause, mute/unmute, seek, fullscreen; ads handling (if present).
- Auto (priority): open first video, verify Play toggles to Pause and time advances (>0s) after waiting; mute toggle changes `aria-pressed`.

### 9) Global Search
- Why: fast discovery.
- Manual: open search, type “Yankees”, see suggestions (teams/players); Enter shows results with filters (All/News/Video) if present.
- Auto (priority): open search, type “Yankees”, wait for dropdown containing “Yankees”; Enter and validate results list “Yankees” in titles.

## Automation Notes (Playwright)
- Prefer accessible selectors (role/name) and assertions on structure/state, not volatile data.
- Handle dynamic content: wait for visibility and minimum counts (>0); avoid exact scores.
- Reuse helpers: openNav(tab), assertUrlContains, waitForCards(minCount), toggleTab(name).
- Enable tracing/video in CI for debugging flaky cases.

## Portfolio Value
- Risk/coverage: focus on core fan routes (scores, standings, schedule, game detail).
- User focus: basic accessibility (skip to content, focus), search/navigation UX.
- Engineering: clear prioritization, manual vs auto split, resilient assertions for live data, deliberate E2E selection with Playwright.
