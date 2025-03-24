const { test, expect, selectors } = require('@playwright/test');

//test("First Playwright test", async function(){
test.only("Context Playwright test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css, xpath
    await userName.fill("rahulshettyacademy1111");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //type - fill: clear existing content
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});

test("Page Playwright test", async ({ page }) => {
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

    
});
