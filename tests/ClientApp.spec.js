const { test, expect, selectors } = require('@playwright/test');

//test("Web Client App login", async function(){
test("Context Playwright test", async ({ page }) => {
    const productName = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ntphat134@gmail.com");
    await page.locator("#userPassword").fill("1234aaAA");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const cardTitles = await page.locator(".card-body b").allTextContents();
    console.log(cardTitles);
    const count = await products.count();
    for (let i=0; i<count; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            //add to cart
            await products.nth(i).locator("text=Add To Cart").click() ///wtf locator ???
            break;
        }
    }
});
