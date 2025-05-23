class APIUtils {
    //let apiContext;
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        }) //200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        //console.log("token: " + token);
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const oderResonse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                "Authorization": response.token,
                "Content-Type": "application/json"
            }
        })
        const orderReponseJson = await oderResonse.json();
        const orderId = orderReponseJson.orders[0];
        //console.log("OrderID: " + orderId);
        response.orderId = orderId;
        return response;
    }
}
module.exports = { APIUtils }; //export class

//test from github.com
