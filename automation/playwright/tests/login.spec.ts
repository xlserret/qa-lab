import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';

test('Verify that the user is able to login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.verifyLoginPageIsDisplayed();
  await loginPage.login();

  await productsPage.verifyUserIsLoggedIn();
  await productsPage.verifyProductsPageIsDisplayed();
  await productsPage.verifyProductsAreDisplayed();
});