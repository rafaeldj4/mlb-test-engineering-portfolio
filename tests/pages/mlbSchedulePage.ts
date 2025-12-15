import { Locator, Page } from '@playwright/test';

export class MlbSchedulePage {
  constructor(readonly page: Page) {}

  get tabBar(): Locator {
    return this.page.getByRole('navigation').filter({ has: this.page.getByRole('link', { name: /^Schedule$/i }) });
  }

  get scheduleTab(): Locator {
    return this.page.getByRole('link', { name: /^Schedule$/i });
  }

  get scoresTab(): Locator {
    return this.page.getByRole('link', { name: /^Scores$/i });
  }

  get dateRangeButtons(): Locator {
    return this.page.getByRole('button', { name: /\b\w+ \d{1,2} - \d{1,2}, \d{4}/ });
  }

  get dateInput(): Locator {
    return this.page.getByRole('textbox', { name: /\d{2}\/\d{2}\/\d{4}/ });
  }

  get dayHeaders(): Locator {
    return this.page.getByText(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/).filter({
      has: this.page.getByText(/\b\w{3}\b/),
    });
  }

  get gameTiles(): Locator {
    return this.page.getByRole('link', { name: /at|vs\.|tickets|preview/i });
  }

  async goto() {
    await this.page.goto('/schedule');
  }
}
