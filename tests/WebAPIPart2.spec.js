//Login -> collect .json
//test browser -> get from .json, cart order, order detail, order history

const { test, expect} = require('@playwright/test');

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("1234aaAA");
    await page.getByRole('button',{name: "Login"}).click();
    await page.waitForLoadState("networkidle");
})

test("Context Playwright test", async ({ page }) => {
    const productName = "ADIDAS ORIGINAL";
    const email = "ntphat134@gmail.com";
    const products = page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"})
    .getByRole("button",{name: "Add To Cart"}).click();

    await page.getByRole('listitem').getByRole("button",{name: "Cart"}).click();
    await page.locator("div li").first().waitFor(); // wait for item in cart is shown
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button",{name: "Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("vie", { delay: 100 });
    await page.getByRole("button",{name: "Vietnam"}).click();
    
    await expect(page.getByText(email)).toBeVisible();
    await page.getByText("Place Order ").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});
