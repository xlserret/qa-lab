import { expect, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
  }

  async verifyLoginPageIsDisplayed() {
    await expect(this.page.getByRole('heading', { name: 'QA Lab Store' })).toBeVisible();
    await expect(this.page.getByText('Please log in.')).toBeVisible();
  }

  async login() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}