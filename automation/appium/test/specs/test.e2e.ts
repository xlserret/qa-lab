import { browser, expect } from '@wdio/globals';
import Store from '../screens/store.screen';

describe('Android shopping flow', () => {
    beforeEach(async () => {
        // A new session with noReset:false clears app state between tests.
        await browser.reloadSession();
        await browser.activateApp('com.saucelabs.mydemoapp.rn');
        await Store.waitForProducts();
    });

    it('shows the product catalog', async () => {
        await expect(Store.backpack).toBeDisplayed();
    });

    it('adds a backpack to the cart', async () => {
        await Store.addBackpackToCart();
        await expect(Store.backpack).toBeDisplayed();
        await expect(Store.removeItem).toBeDisplayed();
    });

    it('removes the backpack and shows an empty cart', async () => {
        await Store.addBackpackToCart();
        await Store.removeItem.click();
        await expect(Store.emptyCartMessage).toBeDisplayed();
        await expect(Store.backpack).not.toBeDisplayed();
    });
});
