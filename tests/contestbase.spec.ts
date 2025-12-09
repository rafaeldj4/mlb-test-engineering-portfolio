import {test,expect} from '@pages/TestBase';

test.describe('Contest Base tests', () => {


    test("Navegar hacia google", async ({page, loginPage}) => {

        await page.goto(process.env.TEST_URL);
        await loginPage.usernameInput.fill(process.env.USER_NAME || '') ;
    })



}) // describe end