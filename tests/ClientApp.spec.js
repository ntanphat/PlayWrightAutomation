const { test, expect, selectors } = require('@playwright/test');

//test("Web Client App login", async function(){
test("Context Playwright test", async ({ page }) => {
    const productName = "ADIDAS ORIGINAL";
    const email = "ntphat134@gmail.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); ++i){
        console.log(i);
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetail = await page.locator("div.col-text").textContent();
    expect(orderId).toContain(orderIdDetail);
});
