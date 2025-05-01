import {test as baseTest} from '@playwright/test';
interface TestDataForOrder{
    productName: string;
    username: string;
    password: string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder: {
        productName: "ADIDAS ORIGINAL",
        username: "ntphat134@gmail.com",
        password: "1234aaAA"
    }
})