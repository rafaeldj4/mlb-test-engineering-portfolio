import {test, expect} from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Sandbox tests', () => {


    test('Navegar hacia Claro', async ({page}) => {

        await page.goto(process.env.TEST_URL);
        const loginPage = new LoginPage(page);
        await loginPage.usernameInput.fill(process.env.USER_NAME || '');
        //await page.locator('#username').fill(process.env.USER_NAME || '');
        await page.locator('#password').fill(process.env.USER_PASSWORD || '');
        await page.locator('button[type="submit"]').click();

    });             


}); // describe end