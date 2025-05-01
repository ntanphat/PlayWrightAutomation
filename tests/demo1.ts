let message1: string = "hello";
message1 = "bye";
console.log(message1);
let age1: number = 20;
console.log(age1);
let isActive: boolean = true;

let numberArr: number[] = [1, 2, 3];

let data: any = "today is a good day";
data = 42;

function add(a: number, b: number): number {
    return a + b;
}

add(4, 5);

let user: {name:string,age:number, location: string} = {name:"Felix", age:21, location:"VT"};
user.location = "HCM";

import { expect, type Locator, type Page } from '@playwright/test';

class CartPage {
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkoutButton = page.locator("text=Checkout");
    }
}