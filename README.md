# mlb-test-engineering-portfolio

Practical quality engineering portfolio for the MLB Technology Internship. This repo uses Playwright to automate end-to-end tests and now includes a curated MLB.com test plan to showcase QA skills.

## Repository Contents
- `tests/example.spec.ts`: sample Playwright E2E suite (can be adapted from playwright.dev to mlb.com).
- `test-plan/mlb-web-test-plan.md`: English test plan covering critical MLB.com flows (home/nav, scores, standings, schedule, teams, game detail, news, video, search) with manual vs. automation priorities.
- `playwright.config.ts`: Playwright configuration (browsers, tracing, HTML reporter, timeouts).
- `package.json` / `package-lock.json`: project dependencies (no npm scripts yet; use `npx playwright test`).
- `playwright-report/`: generated HTML reports (after test runs).
- `test-results/`: raw artifacts from Playwright test runs.
- `.github/`: GitHub configuration (e.g., workflows) if present.

## Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node.js)

Check versions:
```bash
node -v
npm -v
```

## Installation
```bash
npm install
npx playwright install   # first time: downloads browsers
```

## Running Tests
Run all tests (uses Playwright defaults, no npm scripts defined):
```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test tests/example.spec.ts
```

Open the HTML report (after a run):
```bash
npx playwright show-report
```

## Adapting Tests to MLB.com
1) Replace target URLs in `tests/example.spec.ts` with `https://www.mlb.com/` and relevant subpages (scores, standings, schedule).
2) Update selectors/assertions to use accessible roles/names for MLB.com navigation, cards, tabs, and search.
3) Prioritize stable, deterministic flows for automation (navigation, presence of sections/tabs), and keep volatile data checks tolerant (validate structure/state, not exact scores).
4) Use the test plan (`test-plan/mlb-web-test-plan.md`) as the source of truth for manual cases and automation candidates.

## Suggested Next Steps
- Add npm scripts (e.g., `"test": "playwright test"`, `"test:ui": "playwright test --ui"`).
- Create additional spec files for MLB.com flows (scores, standings, schedule, game detail, search, video).
- Enable CI (GitHub Actions) to run Playwright headless and publish `playwright-report/`.
- Extend documentation with troubleshooting (auth, geo, flakiness) and environment notes.
