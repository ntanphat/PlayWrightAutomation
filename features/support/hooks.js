const { Before, After, Status, BeforeStep, AfterStep } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager.js");
const playwright = require('@playwright/test');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot-1.png' });
    }
});

After(function () {
    console.log("this is the final step.")
});