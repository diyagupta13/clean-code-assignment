# Take-Home Assignment: Order Processing System (Clean Code Focus)

## 🧠 Objective

Design and implement a clean, maintainable order processing module.

This assignment simulates a simplified version of a real production system where code quality matters more than complexity.

## 📦 Problem Statement

You are building a backend module for an e-commerce system.

Given a list of orders, your system should:

- Validate orders
- Calculate totals (including discounts & tax)
- Generate a summary

### 📥 Input

An order looks like this:

```javascript
{
  id: "ORD1",
  customerType: "PREMIUM", // REGULAR | PREMIUM
  items: [
    {
      name: "Shoes",
      price: 2000,
      quantity: 1,
      category: "FOOTWEAR"
    },
    {
      name: "T-shirt",
      price: 500,
      quantity: 2,
      category: "CLOTHING"
    }
  ],
  coupon: "NEW10", // optional
  location: "IN" // IN | US
}
```

## ⚙️ Requirements

### 1. Validation
- Order must have at least 1 item
- Price and quantity must be valid
- Ignore invalid items (don’t crash system)

### 2. Pricing Rules

**🧮 Base Calculation**
- `total = sum(price × quantity)`

**🎯 Discounts**
- *Customer Type*
  - `PREMIUM` → 10% discount
  - `REGULAR` → no discount
- *Coupon*
  - `NEW10` → 10% off
  - `FLAT200` → ₹200 off
  - Only one coupon applies

**🌍 Tax**
- `IN` → 18% GST
- `US` → 10% tax

### 3. Output Format

Return:

```javascript
{
  orderId: "ORD1",
  totalItems: 3,
  subtotal: 3000,
  discount: 500,
  tax: 450,
  finalAmount: 2950
}
```

## 🚀 Your Tasks

Build a module that:

**Core Functions**
- `validateOrder(order)`
- `calculateSubtotal(order)`
- `applyDiscount(order, subtotal)`
- `calculateTax(order, amount)`
- `generateSummary(order)`

### ⚠️ Intentionally Missing (You Decide)
- How to structure files
- Whether to use classes or functions
- How to organize constants
- Error handling strategy

👉 *This is where we evaluate your engineering judgment*

## 🧠 Clean Code Expectations

You should demonstrate:
- Meaningful naming
- Small functions
- No magic numbers
- Minimal nesting
- Separation of concerns
- Extensibility (e.g., new coupon should be easy to add)

### ❌ What NOT to Do
- One giant function
- Hardcoded logic everywhere
- Deep nested if-else
- Overengineering (no need for full frameworks)

## 📝 Deliverables

### 1. Code
- Well-structured
- Easy to read

### 2. README (Mandatory)
Explain:
- Your design decisions
- How you structured the code
- What you would improve with more time

## 🧪 Evaluation Criteria

| Area | What We Look For |
|---|---|
| Readability | Can we understand quickly? |
| Structure | Is logic well organized? |
| Simplicity | Is it clean, not clever? |
| Extensibility | Easy to add new rules? |
| Edge Handling | Doesn’t break easily |

## 🌟 Bonus (Optional)

- Add logging
- Add unit tests
- Support multiple coupons (cleanly!)
- Handle currency formatting
