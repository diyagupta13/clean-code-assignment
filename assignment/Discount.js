const CUSTOMER_DISCOUNT = {
    PREMIUM: 0.10,
    REGULAR: 0
};

function applyCustomerDiscount(order, subtotal) {
    return subtotal * (CUSTOMER_DISCOUNT[order.customerType] || 0);
}

module.exports = { applyCustomerDiscount };