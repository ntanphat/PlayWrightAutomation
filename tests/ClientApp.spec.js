const { test, expect, selectors } = require('@playwright/test');

//test("Web Client App login", async function(){
test.only("Context Playwright test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ntphat134@gmail.com");
    await page.locator("#userPassword").fill("1234aaAA");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const cardTitles = await page.locator(".card-body b").allTextContents();
    console.log(cardTitles);
});
