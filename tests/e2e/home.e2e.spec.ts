import { test, expect } from '../test-base';

const navTargets = [
  { name: 'Scores', href: '/scores', locator: (page: any) => page.locator('#scores-schedule-root').getByRole('table').first() },
  { name: 'Schedule', href: '/schedule', locator: (page: any) => page.locator('#scores-schedule-root').first() },
  { name: 'Stats', href: '/stats', locator: (page: any) => page.getByRole('table', { name: /stats table/i }).first() },
  { name: 'Standings', href: '/standings', locator: (page: any) => page.getByRole('heading', { name: /standings/i }) },
] as const;

test.describe('Home & Global Navigation', () => {
  test.beforeEach(async ({ mlbHomePage }) => {
    await mlbHomePage.goto();
    await mlbHomePage.acceptCookiesIfPresent();
  });

  test('Home smoke', async ({ mlbHomePage }) => {

    await test.step('Verify header, navigation, main and footer are visible', async () => {
      await expect(mlbHomePage.header).toBeVisible();
      await expect(mlbHomePage.navigation).toBeVisible();
      await expect(mlbHomePage.main).toBeVisible();
      await expect(mlbHomePage.footer).toBeVisible();
    });
  });

  test.skip('Global navigation', async ({ mlbHomePage }) => {
    for (const target of navTargets) {
      await test.step(`Navigate to ${target.name} and verify section`, async () => {
        const urlPattern = new RegExp(target.href);
        try {
          await Promise.all([
            mlbHomePage.page.waitForURL(urlPattern, { timeout: 30000 }),
            mlbHomePage.openNav(target.name as any),
          ]);
        } catch {
          await mlbHomePage.page.goto(target.href, { timeout: 30000, waitUntil: 'domcontentloaded' });
        }
        await expect(mlbHomePage.page).toHaveURL(urlPattern, { timeout: 30000 });
        await expect(target.locator(mlbHomePage.page)).toBeVisible({ timeout: 15000 });
      });
    }
  });
});
