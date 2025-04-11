const { test, expect, selectors } = require('@playwright/test');
const {POManager} = require("../pageobjects/POManager");
const { log } = require('console');

//test("Web Client App login", async function(){
test("Client App login", async ({ page }) => {
    const poManager = new POManager(page);
    const productName = "ADIDAS ORIGINAL";
    const username = "ntphat134@gmail.com";
    const password = "1234aaAA";
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.cartItems.first().waitFor(); // wait for item in cart is shown
    const bool = await cartPage.getCartItemLocator(productName).isVisible();
    expect(bool).toBeTruthy();
    await cartPage.checkoutButton.click();
    await cartPage.selectCountry("vie", "Vietnam");
    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        console.log(i);
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetail = await page.locator("div.col-text").textContent();
    expect(orderId).toContain(orderIdDetail);
});
