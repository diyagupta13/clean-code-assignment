const TAX_RATE = 0.18;
const COUPONS = {
    SUPER20 : {type: "PERCENTAGE", value: 20},
    NEWUSER10 : {type : "PERCENTAGE", value : 10}
};
const PREMIUM_DISCOUNT_RATE = 0.2;

// validate

// function isValidate(item){
//     if(item.length === 0){
//         throw new Error("Cart is empty")
//     }
//     const checkValidItem = item.some(
//         item => item.price <= 0 || item.quantity <= 0
//     )
//     if(checkValidItem){
//         throw new Error("Invalid price or quantity for item")
//     }
// };
function isValidate(items) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty");
    }

    const hasInvalidItem = items.some(
        item => item.price <= 0 || item.quantity <= 0
    );

    if (hasInvalidItem) {
        throw new Error("Invalid price or quantity for item");
    }
}

// base price calculate

function calculateItemTotal(price, quantity){
    return price * quantity;
}
function calculateSubTotal(items) {
    return items.reduce(
        (total, item) => total + calculateItemTotal(item.price, item.quantity),
        0
    );
}

// validate user type

function validateUserType(userType) {
    const validTypes = ['regular', 'premium'];
    if (!validTypes.includes(userType)) {
        throw new Error(`Invalid user type: ${userType}. Must be 'regular' or 'premium'.`);
    }
}

// apply discount on usertype

function applyUserDiscount(price, userType) {
    if (userType === 'premium') {
        return price * (1 - PREMIUM_DISCOUNT_RATE);
    }
    return price;
}

// apply discount on coupon

function applyCouponDiscount(price, coupon) {
    const discount = COUPONS[coupon];

    if (!discount) return price;

    return price * (1 - discount.value/100);
}
function applyCoupons(price, coupon = []) {
    return coupon.reduce((total, code) => {
        return applyCouponDiscount(total, code);
    }, price);
}

// tax

function calculateTax(price) {
    return price * TAX_RATE;
}

// main function

function processOrder(items, userType, coupons = []) {
    try {
        isValidate(items);
        validateUserType(userType);

        let subtotal = calculateSubTotal(items);
        let totalAfterUserDiscount = applyUserDiscount(subtotal, userType);
        let totalAfterCoupons = applyCoupons(totalAfterUserDiscount, coupons);

        if (totalAfterCoupons < 0) totalAfterCoupons = 0;

        const tax = calculateTax(totalAfterCoupons);
        const finalAmount = totalAfterCoupons + tax;

        return {
            subtotal,
            totalAfterUserDiscount,
            totalAfterCoupons,
            tax,
            finalAmount,
        };
    } catch (error) {
        return { error: error.message };
    }
}


const items1 = [
    { name: "Phone", price: 20000, quantity: 1 },
    { name: "Earphones", price: 2000, quantity: 2 }
];

console.log("Test 1:", processOrder(items1, "premium", ["SUPER20","NEWUSER10"]));





