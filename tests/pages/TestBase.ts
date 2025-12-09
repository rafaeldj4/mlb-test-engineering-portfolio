import { test as driver } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
//import { AcademystudyLoginPage } from './AcademystudyLoginPage';

const test = driver.extend<{
  loginPage: LoginPage;
  //academystudyLoginPage: AcademystudyLoginPage;
}>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  //academystudyLoginPage: async ({ page }, use) => await use(new AcademystudyLoginPage(page)),
});

const expect = test.expect;

export { test, expect };