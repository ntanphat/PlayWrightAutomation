class CartPage{
    constructor(page){
        this.page = page;
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
    }

    getCartItemLocator(productName){
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}

module.exports = {CartPage};