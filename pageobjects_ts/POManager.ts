//const { LoginPage } = require('./LoginPage');
import {LoginPage} from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POManager {
    page :Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    orderHistoryPage: OrderHistoryPage;
    orderReviewPage: OrdersReviewPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderReviewPage = new OrdersReviewPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
    
    getOrderReviewPage() {
        return this.orderReviewPage;
    }
}

module.exports = { POManager };