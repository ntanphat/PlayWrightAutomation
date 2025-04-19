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
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();

    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("vie", "Vietnam");
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);

    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
