import type { Page } from '@playwright/test';
import { test, expect } from '../test-base';

const acceptCookiesIfNeeded = async (page: Page) => {
  const okButton = page.getByRole('button', { name: /^OK$/i });
  if (await okButton.isVisible()) {
    await okButton.click();
  }
};

test.describe('Stats & Players', () => {
  test.beforeEach(async ({ mlbStatsPage, page }) => {
    await mlbStatsPage.goto();
    await acceptCookiesIfNeeded(page);
  });

  test('Stats basic table with simple filter', async ({ mlbStatsPage, page }) => {
    await test.step('Switch tab and verify table has data', async () => {
      await mlbStatsPage.pitchingTab.click();
      await expect(mlbStatsPage.table).toBeVisible();
      expect(await mlbStatsPage.tableRows.count()).toBeGreaterThan(0);
    });
  });

  test('Player profile smoke', async ({ mlbStatsPage, page }) => {
    await test.step('Open first player profile from table', async () => {
      const firstPlayerLink = mlbStatsPage.table.getByRole('link').first();
      await firstPlayerLink.click();
      await acceptCookiesIfNeeded(page);
      await expect(page).toHaveURL(/\/player\//i);
      await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15000 });
    });
  });
});
