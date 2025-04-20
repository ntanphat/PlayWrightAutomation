const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testDataForOrder: {
        productName: "ADIDAS ORIGINAL",
        username: "ntphat134@gmail.com",
        password: "1234aaAA"
    }
})