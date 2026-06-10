import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}
  
  get productsHeader() {
    return this.page.getByRole('heading', { name: 'Products' });
  }

  get loggedInMessage() {
    return this.page.getByText('Logged in as pedro01');
  }
  
  get mechanicalKeyboard() {
      return this.page.getByText('Mechanical Keyboard');
  }
    
  get wirelessMouse() {
      return this.page.getByText('Wireless Mouse');
  }

  get usbCHub() {
      return this.page.getByText('USB-C Hub');
  }  
}