import { Locator, Page } from '@playwright/test';

export class MlbStandingsPage {
  constructor(readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /standings/i });
  }

  get viewTabs(): Locator {
    return this.page.getByRole('navigation', { name: /standings/i });
  }

  tab(name: 'Regular Season' | 'Wild Card' | 'Spring Training'): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') });
  }

  get seasonDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /season/i });
  }

  get groupingDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /grouping/i });
  }

  get table(): Locator {
    return this.page.getByRole('table');
  }

  divisionTable(name: string): Locator {
    return this.page.getByRole('rowheader', { name: new RegExp(name, 'i') });
  }

  teamLink(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') });
  }

  get clinchLegend(): Locator {
    return this.page.getByText(/Clinch Indicators/i);
  }

  async goto() {
    await this.page.goto('/standings');
  }
}
