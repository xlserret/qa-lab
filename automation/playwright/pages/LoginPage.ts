import { type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameField() {
    return this.page.getByLabel('Username');
  }

  get passwordField() {
    return this.page.getByLabel('Password');
  } 

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get loginPageTitle() {
    return this.page.getByRole('heading', { name: 'QA Lab Store' });
  }

  get loginMessage() {
    return this.page.getByText('Please log in.');
  }

  get loginFailedMessage() {
    return this.page.getByText('Login failed.');
  }
 
  async loadLoginPage() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}