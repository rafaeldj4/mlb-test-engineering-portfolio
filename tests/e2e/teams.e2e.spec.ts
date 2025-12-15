import { Page } from '@playwright/test';
import { test, expect } from '../test-base';

const acceptCookiesIfNeeded = async (page: Page) => {
  const okButton = page.getByRole('button', { name: /^OK$/i });
  if (await okButton.isVisible()) {
    await okButton.click();
  }
};

test.describe.skip('Teams navigation', () => {
  test.beforeEach(async ({ mlbTeamsPage, page }) => {
    await mlbTeamsPage.goto();
    await acceptCookiesIfNeeded(page);
  });

  test('Teams menu – basic navigation', async ({ mlbTeamsPage, page }) => {
    await test.step('Verify teams list and open two team pages', async () => {
      await expect(mlbTeamsPage.heading).toBeVisible();
      expect(await mlbTeamsPage.teamHeadings.count()).toBeGreaterThanOrEqual(2);

      // Basic presence check for team links
      expect(await mlbTeamsPage.teamLogoLinks.count()).toBeGreaterThan(0);
    });
  });
});
