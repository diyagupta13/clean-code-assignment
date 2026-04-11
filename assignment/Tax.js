const TAX_RATES = {
    IN: 0.18,
    US: 0.10
};

function calculateTax(order, amount) {
    return amount * (TAX_RATES[order.location] || 0);
}

module.exports = { calculateTax };