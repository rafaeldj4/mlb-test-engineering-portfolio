import type { Page } from '@playwright/test';
import { test, expect } from '../test-base';

const acceptCookiesIfNeeded = async (page: Page) => {
  const okButton = page.getByRole('button', { name: /^OK$/i });
  if (await okButton.isVisible()) {
    await okButton.click();
  }
};

test.describe('Standings', () => {
  test.beforeEach(async ({ mlbStandingsPage, page }) => {
    await mlbStandingsPage.goto();
    await acceptCookiesIfNeeded(page);
  });

  test('Standings structure', async ({ mlbStandingsPage, page }) => {
    await test.step('Verify divisions and table columns', async () => {
      const winHeader = mlbStandingsPage.table.getByRole('columnheader', { name: /^W$/i });
      const lossHeader = mlbStandingsPage.table.getByRole('columnheader', { name: /^L$/i });
      await expect(mlbStandingsPage.table).toBeVisible();
      await expect(winHeader).toBeVisible({ timeout: 20000 });
      await expect(lossHeader).toBeVisible({ timeout: 20000 });
      expect(await mlbStandingsPage.table.getByRole('row').count()).toBeGreaterThan(1);
      await expect(mlbStandingsPage.clinchLegend).toBeVisible();
    });
  });

  test('Standings to team page', async ({ mlbStandingsPage, page }) => {
    await test.step('Validate at least one team entry is present', async () => {
      const teamRows = mlbStandingsPage.table.getByRole('row').filter({
        has: page.getByRole('cell'),
      });
      expect(await teamRows.count()).toBeGreaterThan(1);
    });
  });
});
