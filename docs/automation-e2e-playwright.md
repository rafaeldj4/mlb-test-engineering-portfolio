# MLB.com E2E Automation Plan (Playwright) - Phase 3

Context
- Automation-only scope for Phase 3 E2E using Playwright + TypeScript.
- Based on docs/mlb-web-test-plan.md and docs/test-cases-mlb-com.md; focuses on highest priority flows.

Infrastructure and structure
- Base test: tests/test-base.ts extends Playwright test; set baseURL https://www.mlb.com/en; standard timeouts; screenshot on failure; trace on first retry; keep expect for assertions.
- Fixtures: mlbHomePage, mlbScoresPage, mlbSchedulePage, mlbStandingsPage, mlbStatsPage, mlbTeamsPage (Page Objects listed below).
- Page Objects:
  - tests/pages/mlbHomePage.ts: goto home, selectors for header nav, footer, main modules, language selector.
  - tests/pages/mlbScoresPage.ts: open from nav, locate game list cards or empty state.
  - tests/pages/mlbSchedulePage.ts: date control, team filter if present, game list region.
  - tests/pages/mlbStandingsPage.ts: division sections (AL/NL), team rows, W/L columns, team link navigation helper.
  - tests/pages/mlbStatsPage.ts: filter controls (e.g., hitting/pitching, season), stats table rows/columns.
  - tests/pages/mlbTeamsPage.ts: teams menu trigger, list by league/division, team page header and identity.
- Suggested test files: tests/e2e/home.e2e.spec.ts, tests/e2e/scores-schedule.e2e.spec.ts, tests/e2e/standings.e2e.spec.ts, tests/e2e/stats.e2e.spec.ts, tests/e2e/teams.e2e.spec.ts.
- Test data: known player name (e.g., "Shohei Ohtani"), sample teams ("New York Yankees", "Los Angeles Dodgers").

Automated flows (E2E)
- Home smoke: open home; assert header visible with nav links, main content module present, footer visible.
- Global navigation: from home, click Scores, Schedule, Stats, Standings; assert URL contains section keyword and page heading/title present for each.
- Scores smoke: go to Scores; expect game list container or empty-state message; no visible error banners.
- Schedule navigation: open Schedule; change date (e.g., +1 day) and verify list updates (URL param change or content differs); optional: apply team filter if available and confirm only that team is shown.
- Standings structure: open Standings; confirm expected divisions (AL East, AL Central, AL West, NL East, NL Central, NL West); verify each team row has name and W/L columns populated.
- (Optional) Standings -> Team: click a team link and confirm navigation to the correct team page (heading matches team name).
- Stats basic table: go to Stats; apply a simple filter toggle; verify stats table renders with rows and columns >0.
- Player profile smoke: search for a known player; open profile; assert player name, team label, and at least one stats section are visible.
- Teams menu - basic navigation: open Teams menu; select one or two teams; verify destination page URL/title matches selected team and logo/name visible.

Execution and reporting
- Commands: `npx playwright test` (full), `npx playwright test tests/home.e2e.spec.ts` (targeted), add `--project=chromium` for single browser.
- CI defaults: headless, traces on failure via config; HTML report under playwright-report/.
- Tag critical smoke flows with `@smoke` for quick runs if desired.
- No auth needed; rely on public baseURL; add waits based on locators, not fixed sleeps.
