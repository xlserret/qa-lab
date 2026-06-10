import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { VALID_USER, INVALID_USER } from '../test-data/users';

test('Verify that the user is able to login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.loadLoginPage();

  await expect(loginPage.loginPageTitle).toBeVisible();
  await expect(loginPage.loginMessage).toBeVisible();

  await loginPage.login(VALID_USER.username, VALID_USER.password);
  
  await expect(productsPage.loggedInMessage).toBeVisible();
  await expect(productsPage.productsHeader).toBeVisible();
  
  await expect(productsPage.mechanicalKeyboard).toBeVisible();
  await expect(productsPage.wirelessMouse).toBeVisible();
  await expect(productsPage.usbCHub).toBeVisible();
});

test('Verify that the user is not able to login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loadLoginPage();
  await loginPage.login(INVALID_USER.username, INVALID_USER.password);

  await expect(loginPage.loginFailedMessage).toBeVisible();
});
