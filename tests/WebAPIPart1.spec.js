const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils.js'); //import class
const loginPayload = {userEmail: "ntphat134@gmail.com", userPassword: "1234aaAA"};
const orderPayload = {orders: [{country: "Vietnam", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let response;

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload)
    console.log("response.token: " + response.token);
    console.log("response.orderId: " + response.orderId);
});

test("Place the order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetail = await page.locator("div.col-text").textContent();
    expect(response.orderId).toContain(orderIdDetail);
    await page.pause();
});
