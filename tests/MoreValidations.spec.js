const { test, expect} = require('@playwright/test');

test("Popup Validations", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
})