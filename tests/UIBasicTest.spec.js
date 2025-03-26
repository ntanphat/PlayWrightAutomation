const { test, expect, selectors } = require('@playwright/test');

//test("First Playwright test", async function(){
test("Context Playwright test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");
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
    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(1).textContent());
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //should be await expect
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //assertion
    //await page.pause();
});

test("Child Windows Handle", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    /*
    write by myself
    await documentLink.click(); //open new page
    const newPage = await context.waitForEvent("page");//listen for new page pending, rejected, fulfilled
    */

    const [newPage] = await Promise.all([ //iterate until all event be fulfilled successfully
        context.waitForEvent("page"),
        documentLink.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain)
    await page.locator('#username').fill(domain); //go back to the first page
    //await page.pause();
    console.log("2:" + await page.locator('#username').textContent());
})

test('test case from codegen', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Tìm kiếm' }).click();
  await page.getByRole('combobox', { name: 'Tìm kiếm' }).fill('rhulshetty');
  await page.getByRole('combobox', { name: 'Tìm kiếm' }).press('ArrowDown');
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.getByRole('link', { name: 'Courses' }).click();
  await page.locator('.logo > a').click();
  await page.getByRole('link', { name: 'View All Products' }).click();
});

test.only('test', async ({ page }) => {
  await page.goto('https://www.ultra88.com/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('super01sub12');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234aaAA');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#profile-content').getByText('SUPERTESTTE01')).toBeVisible();
  await page.getByTitle('Log out').click();
});