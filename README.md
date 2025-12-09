# mlb-test-engineering-portfolio

Practical quality engineering portfolio for the MLB Technology Internship. This repo uses Playwright for end-to-end tests and includes a curated MLB.com test plan to showcase QA skills.

## Repository Contents
- `tests/`
  - `example.spec.ts`: sample Playwright E2E suite (playwright.dev target; retargetable to mlb.com).
  - `sandbox.spec.ts`: login flow using env credentials and `LoginPage` page object.
  - `contestbase.spec.ts`: uses `@pages/TestBase` fixture to inject `loginPage`.
  - `pages/`: page objects and fixtures (`LoginPage.ts`, `TestBase.ts`).
  - `e2e/`, `fixtures/`, `utils/`: scaffolding for future suites/helpers.
- `test-plan/mlb-web-test-plan.md`: English test plan for MLB.com (home/nav, scores, standings, schedule, teams, game detail, news, video, search; manual vs automation priorities).
- `playwright.config.ts`: configuration (parallelism, retries, tracing on first retry, Chromium desktop project, dotenv support).
- `env.d.ts`: typed env vars (`TEST_URL`, `USER_NAME`, `USER_PASSWORD`, `GLOBAL_TIMEOUT`).
- `package.json` / `package-lock.json`: dependencies (Playwright, TypeScript, dotenv). No npm scripts yet—use `npx`.
- `playwright-report/`, `test-results/`: artifacts from Playwright runs.
- `.github/`: GitHub configuration if present.

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

## Environment Variables
Create a `.env` file (or export variables) to drive the example/sandbox specs:
```bash
TEST_URL=https://example.com
USER_NAME=your-user
USER_PASSWORD=your-password
GLOBAL_TIMEOUT=30000
```
`dotenv` is loaded in `playwright.config.ts`; types are declared in `env.d.ts`.

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

## Path Aliases and Fixtures
- Path aliases (`tsconfig.json`): `@pages/*` → `tests/pages/*`, `@utils/*` → `tests/utils/*`.
- `TestBase.ts` extends `@playwright/test` with a `loginPage` fixture for reuse across specs.

## Adapting Tests to MLB.com
1) Replace target URLs in specs with `https://www.mlb.com/` (scores, standings, schedule, game detail).
2) Update selectors to use accessible roles/names for MLB.com navigation, cards, tabs, and search.
3) Prefer assertions on structure/state over volatile data (e.g., verify presence of game cards, tabs, scoreline elements; avoid exact scores).
4) Use `test-plan/mlb-web-test-plan.md` as the source of truth for manual cases and automation candidates.

## Suggested Next Steps
1) Add npm scripts (e.g., `"test": "playwright test"`, `"test:ui": "playwright test --ui"`).
2) Add dedicated MLB.com spec files (scores, standings, schedule, game detail, search, video) following the test plan.
3) Enable CI (GitHub Actions) to run Playwright headless and publish `playwright-report/`.
4) Document troubleshooting (auth, geo restrictions, flakiness) and any test data assumptions.
