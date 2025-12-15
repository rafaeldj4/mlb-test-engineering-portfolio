import { Locator, Page } from '@playwright/test';

export class MlbScoresPage {
  constructor(readonly page: Page) {}

  get tabBar(): Locator {
    return this.page.getByRole('navigation').filter({ has: this.page.getByRole('link', { name: /^Scores$/i }) });
  }

  get scoresTab(): Locator {
    return this.page.getByRole('link', { name: /^Scores$/i });
  }

  get scheduleTab(): Locator {
    return this.page.getByRole('link', { name: /^Schedule$/i });
  }

  get dateInput(): Locator {
    return this.page.getByRole('textbox', { name: /\d{2}\/\d{2}\/\d{4}/ });
  }

  get dateButtons(): Locator {
    return this.page.getByRole('button', { name: /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/i });
  }

  get scoreboardTable(): Locator {
    return this.page.getByRole('table');
  }

  get gameCards(): Locator {
    return this.page.getByRole('link', { name: /wrap|box|watch|story/i });
  }

  async goto() {
    await this.page.goto('/scores');
  }
}
