/**
 * Unit Tests for Cart Calculation
 * Run with: node exercise-1-test.js
 */

const assert = require('assert');
const {
  calculateItemBasePrice,
  applyUserDiscount,
  applyCouponDiscount,
  calculateTax,
  calculateCartTotal
} = require('./exercise-1-solution');

// Test counter
let testsPassed = 0;
let testsFailed = 0;

function test(description, testFunction) {
  try {
    testFunction();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
    testsFailed++;
  }
}

// ==========================================
// UNIT TESTS FOR HELPER FUNCTIONS
// ==========================================

console.log('\n📝 UNIT TESTS\n');

test('calculateItemBasePrice: 100 * 2 = 200', () => {
  assert.strictEqual(calculateItemBasePrice(100, 2), 200);
});

test('calculateItemBasePrice: 50 * 3 = 150', () => {
  assert.strictEqual(calculateItemBasePrice(50, 3), 150);
});

test('applyUserDiscount: premium user gets 10% off', () => {
  const originalPrice = 100;
  const discountedPrice = applyUserDiscount(originalPrice, 'premium');
  assert.strictEqual(discountedPrice, 90);
});

test('applyUserDiscount: regular user gets no discount', () => {
  const originalPrice = 100;
  const discountedPrice = applyUserDiscount(originalPrice, 'regular');
  assert.strictEqual(discountedPrice, 100);
});

test('applyCouponDiscount: SAVE10 gives 10% off', () => {
  const coupon = { code: 'SAVE10' };
  const discountedPrice = applyCouponDiscount(100, coupon);
  assert.strictEqual(discountedPrice, 90);
});

test('applyCouponDiscount: invalid coupon gives no discount', () => {
  const coupon = { code: 'INVALID' };
  const discountedPrice = applyCouponDiscount(100, coupon);
  assert.strictEqual(discountedPrice, 100);
});

test('calculateTax: 100 at 18% = 18', () => {
  const tax = calculateTax(100);
  assert.strictEqual(tax, 18);
});

test('calculateTax: 500 at 18% = 90', () => {
  const tax = calculateTax(500);
  assert.strictEqual(tax, 90);
});

// ==========================================
// INTEGRATION TESTS
// ==========================================

console.log('\n🔗 INTEGRATION TESTS\n');

test('calculateCartTotal: empty cart returns 0', () => {
  const result = calculateCartTotal([], 'regular', null);
  assert.strictEqual(result.finalPrice, 0);
  assert.strictEqual(result.subtotal, 0);
});

test('calculateCartTotal: single item calculation', () => {
  const items = [{ price: 100, quantity: 2 }];
  const result = calculateCartTotal(items, 'regular', null);
  
  // Base: 100 * 2 = 200
  // Tax: 200 * 0.18 = 36
  // Total: 200 + 36 = 236
  assert.strictEqual(result.subtotal, 200);
  assert.strictEqual(result.tax, 36);
  assert.strictEqual(result.finalPrice, 236);
});

test('calculateCartTotal: multiple items', () => {
  const items = [
    { price: 100, quantity: 1 },
    { price: 100, quantity: 1 }
  ];
  const result = calculateCartTotal(items, 'regular', null);
  
  // Base: 100 + 100 = 200
  // Tax: 200 * 0.18 = 36
  // Total: 236
  assert.strictEqual(result.subtotal, 200);
  assert.strictEqual(result.finalPrice, 236);
});

test('calculateCartTotal: premium user gets discount', () => {
  const items = [{ price: 100, quantity: 1 }];
  const result = calculateCartTotal(items, 'premium', null);
  
  // Base: 100
  // Premium discount: 100 * 0.9 = 90
  // Tax: 90 * 0.18 = 16.2
  // Total: 90 + 16.2 = 106.2
  assert.strictEqual(result.subtotal, 90);
  assert.strictEqual(result.tax, 16.2);
  assert.strictEqual(result.finalPrice, 106.2);
});

test('calculateCartTotal: coupon discount applied', () => {
  const items = [{ price: 100, quantity: 1 }];
  const coupon = { code: 'SAVE10' };
  const result = calculateCartTotal(items, 'regular', coupon);
  
  // Base: 100
  // Coupon discount: 100 * 0.9 = 90
  // Tax: 90 * 0.18 = 16.2
  // Total: 106.2
  assert.strictEqual(result.subtotal, 90);
  assert.strictEqual(result.finalPrice, 106.2);
});

test('calculateCartTotal: premium + coupon (both discounts)', () => {
  const items = [{ price: 100, quantity: 1 }];
  const coupon = { code: 'SAVE10' };
  const result = calculateCartTotal(items, 'premium', coupon);
  
  // Base: 100
  // Premium discount: 100 * 0.9 = 90
  // Coupon discount: 90 * 0.9 = 81
  // Tax: 81 * 0.18 = 14.58
  // Total: 81 + 14.58 = 95.58
  assert.strictEqual(result.subtotal, 81);
  assert.strictEqual(result.tax, 14.58);
  assert.strictEqual(result.finalPrice, 95.58);
});

test('calculateCartTotal: filters out invalid items', () => {
  const items = [
    { price: -100, quantity: 1 },      // Invalid: negative price
    { price: 100, quantity: 0 },       // Invalid: zero quantity
    { price: 100, quantity: 1 }        // Valid
  ];
  const result = calculateCartTotal(items, 'regular', null);
  
  // Only last item: 100 + 18 = 118
  assert.strictEqual(result.subtotal, 100);
  assert.strictEqual(result.itemCount, 1);
});

// ==========================================
// SUMMARY
// ==========================================

console.log(`\n${'='.repeat(40)}`);
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`${'='.repeat(40)}`);

if (testsFailed > 0) {
  process.exit(1);
}
