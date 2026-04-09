/**
 * ❌ MESSY CODE - E-COMMERCE CART CALCULATION
 * 
 * This is intentionally poorly written.
 * Your job: Identify the issues and refactor it.
 * 
 */

function f(items, u, c) {
  let t = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].p > 0 && items[i].q > 0) {
      let x = items[i].p * items[i].q;
      if (u === 'premium') {
        x = x * 0.9;
      }
      if (c && c.code === 'SAVE10') {
        x = x * 0.9;
      }
      t = t + x;
    }
  }

  let tax = t * 0.18;
  let final = t + tax;

  return {
    s: final,
    t: t,
    x: tax,
    d: u === 'premium' ? true : false
  };
}

// Usage Example
const sampleItems = [
  { p: 1000, q: 2 },   // price: 1000, quantity: 2
  { p: 500, q: 1 },    // price: 500, quantity: 1
  { p: 250, q: 3 }     // price: 250, quantity: 3
];

const sampleCoupon = { code: 'SAVE10' };

const result = f(sampleItems, 'premium', sampleCoupon);
console.log('Result:', result);

