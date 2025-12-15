import { Page, Locator } from '@playwright/test';

export class MlbTeamsPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('/team');
  }

  get heading(): Locator {
    return this.page.getByRole('heading', {
      name: /all 30 mlb team locations/i,
      level: 1,
    });
  }

  get teamHeadings(): Locator {
    return this.page.locator('main').getByRole('heading', { level: 2 });
  }

  get teamLogoLinks(): Locator {
    return this.page.getByRole('link', { name: /logo$/i });
  }

  teamCardByName(teamName: string): Locator {
    return this.page
      .locator('main')
      .getByRole('heading', { name: new RegExp(`^${teamName}$`, 'i'), level: 2 });
  }

  teamLogoLink(teamName: string): Locator {
    return this.page.getByRole('link', {
      name: new RegExp(`${teamName} logo`, 'i'),
    });
  }

  teamSiteLink(teamName: string): Locator {
    return this.page
      .locator('main')
      .getByRole('link', { name: new RegExp(`${teamName.replace(/ /g, '.*')}`, 'i') })
      .first();
  }
}
