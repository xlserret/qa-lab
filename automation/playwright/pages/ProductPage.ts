import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyUserIsLoggedIn() {
    await expect(this.page.getByText('Logged in as pedro01')).toBeVisible();
  }

  async verifyProductsPageIsDisplayed() {
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeVisible();
  }

  async verifyProductsAreDisplayed() {
    await expect(this.page.getByText('Mechanical Keyboard')).toBeVisible();
    await expect(this.page.getByText('Wireless Mouse')).toBeVisible();
    await expect(this.page.getByText('USB-C Hub')).toBeVisible();
  }
}