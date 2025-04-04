const { test, expect, request } = require('@playwright/test');

test("Security test request intercept", async ({ page }) => {
    //login and reach to order page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("ntphat134@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("1234aaAA");
    await page.getByRole('button', { name: "Login" }).click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67e2a154c019fb1ad6383568",
        }))
    await page.locator("button:has-text('View')").first().click();
    await page.pause(); //unauthorized error
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})