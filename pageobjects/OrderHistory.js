class OrderHistory {
    constructor() {
        this.countryTextbox = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
    }

    async selectCountry(inputText, countryName) {
        this.countryTextbox.pressSequentially(inputText, { delay: 100 });
        await this.countryDropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                //click option
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
}
module.exports = new OrderHistory();