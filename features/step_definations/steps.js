const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require("../../pageobjects/POManager.js");
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('add {string} to Cart', { timeout: 100 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed to the Cart', { timeout: 100 * 1000 }, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();
});

When('Enter valid details and Place the Order', { timeout: 100 * 1000 }, async function () {
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("vie", "Vietnam");
    this.orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order in present in the Order History', { timeout: 100 * 1000 }, async function () {
    await this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);

    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}',async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css, xpath
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then ('Verify error message is displayed', async function () {
    //wait until this locator shown up page
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});