class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']")
    }

    async searchProductAddCart(productName) {
        const cardTitles = await this.productsText.allTextContents();
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text=Add To Cart").click() ///wtf locator ???
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}
module.exports = { DashboardPage };