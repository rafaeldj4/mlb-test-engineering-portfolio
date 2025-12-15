# mlb-test-engineering-portfolio

Practical quality engineering portfolio for the MLB Technology Internship. This repo uses Playwright for end-to-end tests and includes a curated MLB.com test plan to showcase QA skills.

## Repository Contents
- `tests/`
  - `e2e/`: MLB.com E2E specs (`home.e2e.spec.ts`, `scores-schedule.e2e.spec.ts`, `stats.e2e.spec.ts`, `standings.e2e.spec.ts`, `teams.e2e.spec.ts`).
  - `pages/`: page objects for MLB.com sections (`mlbHomePage.ts`, `mlbScoresPage.ts`, `mlbSchedulePage.ts`, `mlbStatsPage.ts`, `mlbStandingsPage.ts`, `mlbTeamsPage.ts`).
  - `fixtures/`, `utils/`: currently empty scaffolding for future helpers.
  - `test-base.ts`: shared Playwright fixtures for MLB page objects.
- `docs/`: test plans and automation context.
- `playwright.config.ts`: Playwright project config (timeout 120s, tracing on first retry, dotenv load).
- `.env`, `.env.example`: intentionally empty placeholders.
- `package.json` / `package-lock.json`: dependencies (Playwright, TypeScript, dotenv) and npm scripts (`test`, `test:e2e`, `test:ui`, `report`).
- `playwright-report/`, `test-results/`: artifacts from recent runs.
- `.github/`: GitHub configuration (if present).

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

```
`dotenv` is loaded in `playwright.config.ts`; types are declared in `env.d.ts`.

## Running Tests
Run all tests:
```bash
npm run test
```

Run a specific file:
```bash
npm run test tests/example.spec.ts
```

Notes on skipped specs:
- `tests/e2e/home.e2e.spec.ts`: `Global navigation` is skipped in the full suite due to slow cross-site navigation; un-skip and run individually if network conditions allow.
- `tests/e2e/teams.e2e.spec.ts`: suite is skipped in the full run to avoid fixture conflicts; un-skip and run file-scoped if you need to validate teams navigation.

Open the HTML report (after a run):
```bash
npx playwright show-report
```

## Path Aliases and Fixtures
- Path aliases (`tsconfig.json`): `@pages/*` ? `tests/pages/*`, `@utils/*` ? `tests/utils/*`.
- `test-base.ts` extends `@playwright/test` with a `loginPage` fixture for reuse across specs.




