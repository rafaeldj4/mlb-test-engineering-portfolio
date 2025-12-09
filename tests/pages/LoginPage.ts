import { Page, Locator } from '@playwright/test';

export class LoginPage {   

    constructor(readonly page: Page) {}

    get usernameInput(): Locator {
        return this.page.locator('#username');
    }

     } // class end