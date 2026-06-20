describe('My Demo App', () => {
    it('should show the product list', async () => {
        
        // Temporarily handle the "OK" button if it appears
            const okButton = await $('android=new UiSelector().text("OK")');

        if (await okButton.isDisplayed().catch(() => false)) {
            await okButton.click();
        }

        const backpack = await $('android=new UiSelector().text("Sauce Labs Backpack")');

        await expect(backpack).toBeDisplayed();
    });
});