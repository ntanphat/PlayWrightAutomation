import { test, expect } from '@playwright/test';
import { customTest } from '../utils_ts/test-base.js';
import { POManager } from "../pageobjects_ts/POManager.js";
//JSON -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

//test("Web Client App login", async function(){
for (const data of dataset) {
    test(`@Web Client App login for product ${data.productName}`, async ({ page }) => {
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
        let orderId:any;
        orderId = await orderReviewPage.submitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);

        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
    });
}
customTest(`Client App login`, async ({ page, testDataForOrder }) => {
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
    let orderId: any;
    orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);

    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});