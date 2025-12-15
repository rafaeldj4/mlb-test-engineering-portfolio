import { Locator, Page } from '@playwright/test';

export class MlbStatsPage {
  constructor(readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /stats/i });
  }

  get playerTab(): Locator {
    return this.page.getByRole('link', { name: /^Player$/i });
  }

  get teamTab(): Locator {
    return this.page.getByRole('link', { name: /^Team$/i });
  }

  get hittingTab(): Locator {
    return this.page.getByRole('tab', { name: /^Hitting$/i });
  }

  get pitchingTab(): Locator {
    return this.page.getByRole('tab', { name: /^Pitching$/i });
  }

  get resetFilters(): Locator {
    return this.page.getByRole('button', { name: /reset filters/i });
  }

  get seasonDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Season$/i });
  }

  get seasonTypeDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Season Type$/i });
  }

  get leagueDropdown(): Locator {
    return this.page.getByRole('textbox', { name: new RegExp('^League/Team$', 'i') });
  }

  get teamsDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Teams$/i });
  }

  get timeframeDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Timeframe$/i });
  }

  get positionDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Position$/i });
  }

  get playerPoolDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Player Pool$/i });
  }

  get splitsDropdown(): Locator {
    return this.page.getByRole('textbox', { name: /^Splits$/i });
  }

  get standardButton(): Locator {
    return this.page.getByRole('button', { name: /^Standard$/i });
  }

  get expandedButton(): Locator {
    return this.page.getByRole('button', { name: /^Expanded$/i });
  }

  get table(): Locator {
    return this.page.getByRole('table', { name: /stats table/i });
  }

  get tableRows(): Locator {
    return this.table.getByRole('row').filter({ has: this.page.getByRole('cell') });
  }

  async goto() {
    await this.page.goto('/stats');
  }
}
