/**
 * ✅ CLEAN CODE - E-COMMERCE CART CALCULATION
 * 
 * Key improvements:
 * ✓ Meaningful variable names
 * ✓ Named constants (no magic numbers)
 * ✓ Small, focused functions
 * ✓ Pure functions where possible
 * ✓ Guard clauses for validation
 * ✓ Clear return structure
 */

// Constants
const TAX_RATE = 0.18;
const PREMIUM_DISCOUNT_RATE = 0.1;      // 10%
const COUPON_DISCOUNT_RATE = 0.1;       // 10%
const VALID_COUPON_CODE = 'SAVE10';

// ==========================================
// PURE FUNCTIONS - Easy to test & understand
// ==========================================

/**
 * Check if an item is valid for purchase
 * @param {Object} item - Item with price and quantity
 * @returns {boolean}
 */
function isValidItem(item) {
  return item && item.price > 0 && item.quantity > 0;
}

/**
 * Calculate base price for an item
 * @param {number} price - Unit price
 * @param {number} quantity - Quantity
 * @returns {number} Total price before discounts
 */
function calculateItemBasePrice(price, quantity) {
  return price * quantity;
}

/**
 * Apply premium user discount
 * @param {number} price - Price before discount
 * @param {string} userType - 'regular' or 'premium'
 * @returns {number} Price after discount
 */
function applyUserDiscount(price, userType) {
  if (userType === 'premium') {
    return price * (1 - PREMIUM_DISCOUNT_RATE);
  }
  return price;
}

/**
 * Apply coupon code discount
 * @param {number} price - Price before discount
 * @param {Object} coupon - Coupon object with code
 * @returns {number} Price after discount
 */
function applyCouponDiscount(price, coupon) {
  if (coupon && coupon.code === VALID_COUPON_CODE) {
    return price * (1 - COUPON_DISCOUNT_RATE);
  }
  return price;
}

/**
 * Calculate tax amount
 * @param {number} subtotal - Price before tax
 * @returns {number} Tax amount
 */
function calculateTax(subtotal) {
  return subtotal * TAX_RATE;
}

/**
 * Validate user type
 * @param {string} userType - User type to validate
 * @throws {Error} If invalid
 */
function validateUserType(userType) {
  const validTypes = ['regular', 'premium'];
  if (!validTypes.includes(userType)) {
    throw new Error(`Invalid user type: ${userType}. Must be 'regular' or 'premium'.`);
  }
}

// ==========================================
// MAIN FUNCTION - Orchestrates smaller functions
// ==========================================

/**
 * Calculate total cart price with discounts and tax
 * 
 * @param {Array} items - Array of items with price and quantity
 * @param {string} userType - 'regular' or 'premium'
 * @param {Object} coupon - Optional coupon with code
 * @returns {Object} Cart total with breakdown
 */
function calculateCartTotal(items, userType, coupon) {
  // Guard clause: validate inputs
  if (!items || items.length === 0) {
    return {
      finalPrice: 0,
      subtotal: 0,
      tax: 0,
      itemCount: 0,
      isPremium: false,
      message: 'Cart is empty'
    };
  }
  
  // Guard clause: validate user type
  try {
    validateUserType(userType);
  } catch (error) {
    throw new Error('Calculation failed: ' + error.message);
  }
  
  // Filter valid items
  const validItems = items.filter(isValidItem);
  
  // Guard clause: no valid items
  if (validItems.length === 0) {
    return {
      finalPrice: 0,
      subtotal: 0,
      tax: 0,
      itemCount: 0,
      isPremium: userType === 'premium',
      message: 'No valid items in cart'
    };
  }
  
  // Calculate subtotal with all discounts
  const subtotal = validItems.reduce((total, item) => {
    let itemPrice = calculateItemBasePrice(item.price, item.quantity);
    itemPrice = applyUserDiscount(itemPrice, userType);
    itemPrice = applyCouponDiscount(itemPrice, coupon);
    return total + itemPrice;
  }, 0);
  
  // Calculate tax and final price
  const tax = calculateTax(subtotal);
  const finalPrice = subtotal + tax;
  
  return {
    finalPrice: Math.round(finalPrice * 100) / 100,  // Round to 2 decimals
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    itemCount: validItems.length,
    isPremium: userType === 'premium',
    discounts: {
      userDiscount: userType === 'premium' ? PREMIUM_DISCOUNT_RATE * 100 + '%' : 'None',
      couponDiscount: (coupon && coupon.code === VALID_COUPON_CODE) ? COUPON_DISCOUNT_RATE * 100 + '%' : 'None'
    }
  };
}

// ==========================================
// USAGE EXAMPLES & TESTS
// ==========================================

console.log('=== CLEAN CODE CART CALCULATION ===\n');

// Test 1: Regular user, no coupon
const testItems1 = [
  { price: 1000, quantity: 2 },
  { price: 500, quantity: 1 }
];

const result1 = calculateCartTotal(testItems1, 'regular', null);
console.log('Test 1: Regular user, no coupon');
console.log('Items:', testItems1);
console.log('Result:', result1);
console.log();

// Test 2: Premium user with coupon
const testItems2 = [
  { price: 1000, quantity: 2 },
  { price: 500, quantity: 1 },
  { price: 250, quantity: 3 }
];

const coupon = { code: 'SAVE10' };
const result2 = calculateCartTotal(testItems2, 'premium', coupon);
console.log('Test 2: Premium user with SAVE10 coupon');
console.log('Items:', testItems2);
console.log('Coupon:', coupon);
console.log('Result:', result2);
console.log();

// Test 3: Invalid item (negative price)
const testItems3 = [
  { price: -100, quantity: 2 },  // Invalid
  { price: 500, quantity: 1 }
];

const result3 = calculateCartTotal(testItems3, 'premium', null);
console.log('Test 3: Mixed valid/invalid items');
console.log('Items:', testItems3);
console.log('Result:', result3);
console.log('(Notice: Only valid item counted)');
console.log();

// Test 4: Empty cart
const result4 = calculateCartTotal([], 'regular', null);
console.log('Test 4: Empty cart');
console.log('Result:', result4);
console.log();

// Test 5: Invalid user type
try {
  const result5 = calculateCartTotal(testItems1, 'vip', null);
} catch (error) {
  console.log('Test 5: Invalid user type');
  console.log('Error:', error.message);
}

// ==========================================
// EXPORT FOR TESTING
// ==========================================

module.exports = {
  // Helper functions (for unit testing)
  calculateItemBasePrice,
  applyUserDiscount,
  applyCouponDiscount,
  calculateTax,
  isValidItem,
  
  // Main function
  calculateCartTotal
};
