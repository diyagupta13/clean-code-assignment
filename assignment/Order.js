class Order {
    constructor(data) {
        this.id = data.id;
        this.customerType = data.customerType;
        this.items = data.items || [];
        this.coupon = data.coupon;
        this.location = data.location;
    }
}

module.exports = Order;