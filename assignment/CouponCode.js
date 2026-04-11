const COUPONS = {
    NEW10: { type: "PERCENT", value: 0.10 },
    FLAT200: { type: "FLAT", value: 200 }
};

function applyCoupon(order, subtotal) {
    const coupon = COUPONS[order.coupon];
    if (!coupon) return 0;

    if (coupon.type === "PERCENT") {
        return subtotal * coupon.value;
    }

    return coupon.value;
}

module.exports = { applyCoupon };