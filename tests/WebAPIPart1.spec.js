const { test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "ntphat134@gmail.com", userPassword: "1234aaAA"};
const orderPayload = {orders: [{country: "Vietnam", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let token;
let orderId;

test.beforeAll(async() => {
    //login api
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    }) //200, 201
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log("token: " + token);

    //
    const oderResonse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data:orderPayload,
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
    const orderReponseJson = await oderResonse.json();
    orderId = orderReponseJson.orders[0];
    console.log("OrderID: " + orderId);
});

test("Place the order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetail = await page.locator("div.col-text").textContent();
    expect(orderId).toContain(orderIdDetail);
});
