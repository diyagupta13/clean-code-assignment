class OrderItem {
    constructor(name, price, quantity, category) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }

    isValid() {
        return this.price > 0 && this.quantity > 0;
    }

    total() {
        return this.price * this.quantity;
    }
}

module.exports = OrderItem;