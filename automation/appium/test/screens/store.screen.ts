import { $, browser } from '@wdio/globals';

class StoreScreen {
    get backpack() { return $('android=new UiSelector().text("Sauce Labs Backpack")'); }
    get addToCart() { return $('~Add To Cart button'); }
    get cart() { return $('~cart badge'); }
    get cartTitle() { return $('android=new UiSelector().text("My Cart")'); }
    get removeItem() { return $('android=new UiSelector().text("Remove Item")'); }
    get emptyCartMessage() { return $('android=new UiSelector().text("No Items" )'); }

    async waitForProducts() {
        // Wait for either the compatibility dialog or the catalog, then dismiss the dialog.
        await browser.waitUntil(async () => {
            const ok = $('android=new UiSelector().text("OK")');
            if (await ok.isDisplayed()) await ok.click();
            return this.backpack.isDisplayed();
        }, { timeout: 20000, timeoutMsg: 'Product catalog did not appear' });
    }

    async addBackpackToCart() {
        await this.backpack.click();
        await this.addToCart.waitForDisplayed();
        await this.addToCart.click();
        await this.cart.click();
        await this.cartTitle.waitForDisplayed();
    }
}

export default new StoreScreen();
