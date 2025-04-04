const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils.js'); //import class
const loginPayload = {userEmail: "ntphat134@gmail.com", userPassword: "1234aaAA"};
const orderPayload = {orders: [{country: "Vietnam", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let response;
const fakePayLoadyOrders = {data:[],message:"No Orders"};

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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67e2a154c019fb1ad6383568",
        async route =>{
            const response = await page.request.fetch(route.request());
            const body = JSON.stringify(fakePayLoadyOrders);
            route.fulfill({
                response,
                body,
            })
            //intercepting response - API response -> {playwright fakeresponse} -> browser -> render data
        }
    )

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67e2a154c019fb1ad6383568")
    console.log(await page.locator(".mt-4").textContent());
    
});
