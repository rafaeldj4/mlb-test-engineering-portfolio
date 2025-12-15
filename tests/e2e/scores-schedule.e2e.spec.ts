import { Page } from '@playwright/test';
import { test, expect } from '../test-base';

const acceptCookiesIfNeeded = async (page: Page) => {
  const okButton = page.getByRole('button', { name: /^OK$/i });
  if (await okButton.isVisible()) {
    await okButton.click();
  }
};

test.describe('Scores & Schedule', () => {
  test('Scores smoke', async ({ mlbScoresPage, page }) => {
    await test.step('Open Scores and accept cookies', async () => {
      await mlbScoresPage.goto();
      await acceptCookiesIfNeeded(page);
    });

    await test.step('Validate scoreboard content is present', async () => {
      const tableCount = await mlbScoresPage.scoreboardTable.count();
      const cardCount = await mlbScoresPage.gameCards.count();
      expect(tableCount + cardCount).toBeGreaterThan(0);
    });
  });

  test('Schedule navigation', async ({ mlbSchedulePage, page }) => {
    await test.step('Open Schedule and accept cookies', async () => {
      await mlbSchedulePage.goto();
      await acceptCookiesIfNeeded(page);
    });

    await test.step('Change date range and verify listings', async () => {
      const scheduleRoot = page.locator('#scores-schedule-root');
      await expect(scheduleRoot).toBeVisible({ timeout: 15000 });

      const rangeButtons = mlbSchedulePage.dateRangeButtons;
      const rangeCount = await rangeButtons.count();
      if (rangeCount > 1) {
        await rangeButtons.nth(1).click();
      } else if (rangeCount === 1) {
        await rangeButtons.first().click();
      }

      await expect(mlbSchedulePage.gameTiles.first()).toBeVisible({ timeout: 15000 });
      expect(await mlbSchedulePage.gameTiles.count()).toBeGreaterThan(0);
    });
  });
});
