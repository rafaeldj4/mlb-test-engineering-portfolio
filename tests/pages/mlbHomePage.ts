import { Locator, Page } from '@playwright/test';

type NavSection = 'Scores' | 'Schedule' | 'Stats' | 'Standings' | 'News' | 'Shop';

export class MlbHomePage {
  constructor(readonly page: Page) {}

  get header(): Locator {
    return this.page.getByRole('banner');
  }

  get navigation(): Locator {
    // Desktop secondary navigation list
    return this.page.getByRole('list', { name: /secondary navigation/i });
  }

  get main(): Locator {
    return this.page.locator('main');
  }

  get footer(): Locator {
    return this.page.getByRole('contentinfo');
  }

  get languageSelector(): Locator {
    return this.page.getByRole('combobox', { name: /language/i });
  }

  get menuButton(): Locator {
    return this.page.getByRole('button', { name: /open menu/i });
  }

  get logo(): Locator {
    return this.page.getByRole('link', { name: /major league baseball/i });
  }

  navLink(name: NavSection): Locator {
    // Prefer the link inside the header navigation to avoid duplicate matches in page content
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: new RegExp(`^${name}$`, 'i') })
      .first();
  }

  async goto() {
    await this.page.goto('https://www.mlb.com/en', {waitUntil: 'domcontentloaded'});
  }

  async acceptCookiesIfPresent() {
    const dialog = this.page.getByRole('dialog', { name: /privacy/i });
    if (await dialog.isVisible().catch(() => false)) {
      const ok = dialog.getByRole('button', { name: /^ok$/i });
      if (await ok.isVisible().catch(() => false)) {
        await ok.click();
      }
    }
  }

  async openNav(name: NavSection) {
    const link = this.navLink(name);
    if (!(await link.isVisible().catch(() => false))) {
      if (await this.menuButton.isVisible().catch(() => false)) {
        await this.menuButton.click();
      }
    }
    await link.click({ timeout: 15000, force: true });
  }
}
