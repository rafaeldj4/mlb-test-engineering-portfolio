import { test as base, expect } from '@playwright/test';
import { MlbHomePage } from '@pages/mlbHomePage';
import { MlbScoresPage } from '@pages/mlbScoresPage';
import { MlbSchedulePage } from '@pages/mlbSchedulePage';
import { MlbStandingsPage } from '@pages/mlbStandingsPage';
import { MlbStatsPage } from '@pages/mlbStatsPage';
import { MlbTeamsPage } from '@pages/mlbTeamsPage';

export type MlbFixtures = {
  mlbHomePage: MlbHomePage;
  mlbScoresPage: MlbScoresPage;
  mlbSchedulePage: MlbSchedulePage;
  mlbStandingsPage: MlbStandingsPage;
  mlbStatsPage: MlbStatsPage;
  mlbTeamsPage: MlbTeamsPage;
};

const test = base.extend<MlbFixtures>({
  mlbHomePage: async ({ page }, use) => {
    await use(new MlbHomePage(page));
  },
  mlbScoresPage: async ({ page }, use) => {
    await use(new MlbScoresPage(page));
  },
  mlbSchedulePage: async ({ page }, use) => {
    await use(new MlbSchedulePage(page));
  },
  mlbStandingsPage: async ({ page }, use) => {
    await use(new MlbStandingsPage(page));
  },
  mlbStatsPage: async ({ page }, use) => {
    await use(new MlbStatsPage(page));
  },
  mlbTeamsPage: async ({ page }, use) => {
    await use(new MlbTeamsPage(page));
  },
});

test.use({
  baseURL: 'https://www.mlb.com/en',
  screenshot: 'only-on-failure',
  trace: 'on-first-retry',
});

export { test, expect };
