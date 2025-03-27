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
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); // wait for item in cart is shown
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("vi",{delay: 100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount;i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "Vietnam"){
            //click option
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.pause();
});
