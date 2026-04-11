const Order = require("./Order");
const OrderItem = require("./OrderItem");

const { applyCustomerDiscount } = require("./Discount");
const { applyCoupon } = require("./CouponCode");
const { calculateTax } = require("./Tax");

function processOrder(orderData) {
    const order = new Order(orderData);

    // Validation
    if (!order.items || order.items.length === 0) {
        throw new Error("Invalid Order");
    }

    // Convert to class instances
    const items = order.items.map(
        i => new OrderItem(i.name, i.price, i.quantity, i.category)
    );

    const validItems = items.filter(i => i.isValid());

    if (validItems.length === 0) {
        throw new Error("No valid items in order");
    }

    // Subtotal
    const subtotal = validItems.reduce((sum, i) => sum + i.total(), 0);

    // Discounts
    const discount =
        applyCustomerDiscount(order, subtotal) +
        applyCoupon(order, subtotal);

    const afterDiscount = subtotal - discount;

    // Tax
    const tax = calculateTax(order, afterDiscount);

    const finalAmount = afterDiscount + tax;

    // ✅ Return SAME STRUCTURE as input + calculated fields
    return {
        id: order.id,
        customerType: order.customerType,
        items: order.items, // original format preserved
        coupon: order.coupon,
        location: order.location,

        subtotal,
        discount,
        tax,
        finalAmount
    };
}

module.exports = { processOrder };