import { Locator, Page } from "@playwright/test";
export class LoginPage {
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username:string, password:string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
//module.exports = { LoginPage };