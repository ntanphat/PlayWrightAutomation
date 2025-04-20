const { test, expect } = require('@playwright/test');
const { customTest } = require('../utils/test-base.js');
const { POManager } = require("../pageobjects/POManager.js");
const { log } = require('console');
//JSON -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

//test("Web Client App login", async function(){
for (const data of dataset) {
    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
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
}
customTest.only(`Client App login`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
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