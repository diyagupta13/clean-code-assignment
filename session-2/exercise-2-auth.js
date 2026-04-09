/**
 * ❌ MESSY CODE - User Authentication Module
 * 
 * This code handles:
 * - User login
 * - User registration
 * - User validation
 * 
 * Issues to fix:
 * - Terrible variable names
 * - Deep nesting
 * - Repeated validation logic
 * - Magic strings
 * - Unclear error handling
 * - No separation of concerns
 */

// Simulated database
const db = {
  users: [
    { name: 'john', email: 'john@example.com', pwd: 'password123!', age: 25, active: true, last_login: null },
    { name: 'jane', email: 'jane@example.com', pwd: 'secure456!', age: 22, active: true, last_login: null },
    { name: 'bob', email: 'bob@example.com', pwd: 'notactive!', age: 30, active: false, last_login: null }
  ],
  
  find: (predicate) => {
    return db.users.find(predicate);
  },
  
  findAll: () => {
    return db.users;
  },
  
  update: (user) => {
    const index = db.users.findIndex(u => u.name === user.name);
    if (index !== -1) {
      db.users[index] = user;
    }
  },
  
  add: (user) => {
    db.users.push(user);
  }
};

// ==========================================
// MESSY FUNCTIONS TO REFACTOR
// ==========================================

function a(n, p, db) {
  if (n && p) {
    let u = db.find(x => x.name === n);
    if (u) {
      if (p === u.pwd) {
        if (u.active) {
          u.last_login = new Date();
          db.update(u);
          return { ok: true, user: u };
        } else {
          return { ok: false, msg: 'Account disabled' };
        }
      } else {
        return { ok: false, msg: 'Wrong password' };
      }
    } else {
      return { ok: false, msg: 'User not found' };
    }
  } else {
    return { ok: false, msg: 'Missing username or password' };
  }
}

function b(u) {
  if (u.email && u.email.includes('@')) {
    if (u.pwd && u.pwd.length >= 8) {
      if (u.age && u.age >= 18) {
        return true;
      }
    }
  }
  return false;
}

function c(db, u) {
  let x = db.find(x => x.name === u.name);
  if (x) {
    return { ok: false, msg: 'User exists' };
  } else {
    db.add(u);
    return { ok: true, msg: 'Registered' };
  }
}

// Usage
console.log('❌ MESSY CODE OUTPUT:\n');
console.log('Login:', a('john', 'password123!', db));
console.log('Validate:', b({ email: 'test@example.com', pwd: 'secure123!', age: 20 }));
console.log('Register:', c(db, { name: 'alice', email: 'alice@example.com', pwd: 'secret123!', age: 28, active: true }));

// ==========================================
// YOUR TASK
// ==========================================

/**
 * TODO: REFACTOR THIS CODE
 * 
 * Goals:
 * 1. Rename all functions (a, b, c -> meaningful names)
 * 2. Rename all variables (n, p, u, x -> meaningful names)
 * 3. Extract validation logic into reusable functions
 * 4. Apply guard clauses (no deep nesting)
 * 5. Handle errors better
 * 6. Remove code duplication
 * 7. Add comments explaining what each function does
 * 8. Make functions testable (pure where possible)
 * 
 * File your refactored solution here:
 * Write your clean code below this line
 */

// ==========================================
// ↓ WRITE YOUR REFACTORED CODE HERE ↓
// ==========================================
