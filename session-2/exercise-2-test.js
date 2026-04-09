/**
 * Unit Tests for Authentication Module
 * Run with: node exercise-2-test.js
 */

const assert = require('assert');
const {
  isValidEmail,
  isValidPassword,
  isAdult,
  validateNewUser,
  authenticateUser,
  registerUser,
  getUserProfile,
  Database
} = require('./exercise-2-solution');

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

console.log('\n📝 VALIDATION TESTS\n');

// Email validation
test('isValidEmail: john@example.com is valid', () => {
  assert.strictEqual(isValidEmail('john@example.com'), true);
});

test('isValidEmail: invalid.email is invalid', () => {
  assert.strictEqual(isValidEmail('invalidemail'), false);
});

test('isValidEmail: empty string is invalid', () => {
  assert.strictEqual(isValidEmail(''), false);
});

// Password validation
test('isValidPassword: password123! is valid (8 chars)', () => {
  assert.strictEqual(isValidPassword('password123!'), true);
});

test('isValidPassword: short is invalid (5 chars)', () => {
  assert.strictEqual(isValidPassword('short'), false);
});

test('isValidPassword: empty string is invalid', () => {
  assert.strictEqual(isValidPassword(''), false);
});

// Age validation
test('isAdult: 25 is adult', () => {
  assert.strictEqual(isAdult(25), true);
});

test('isAdult: 18 is adult', () => {
  assert.strictEqual(isAdult(18), true);
});

test('isAdult: 17 is not adult', () => {
  assert.strictEqual(isAdult(17), false);
});

console.log('\n🔐 AUTHENTICATION TESTS\n');

test('authenticateUser: correct credentials login', () => {
  const result = authenticateUser('john', 'password123!');
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.user.name, 'john');
});

test('authenticateUser: wrong password fails', () => {
  const result = authenticateUser('john', 'wrongpassword');
  assert.strictEqual(result.success, false);
  assert(result.error.includes('password'));
});

test('authenticateUser: nonexistent user fails', () => {
  const result = authenticateUser('nonexistent', 'password123!');
  assert.strictEqual(result.success, false);
});

test('authenticateUser: missing credentials fails', () => {
  const result = authenticateUser('', '');
  assert.strictEqual(result.success, false);
});

test('authenticateUser: disabled account fails', () => {
  const result = authenticateUser('bob', 'notactive!');
  assert.strictEqual(result.success, false);
  assert(result.error.includes('disabled'));
});

console.log('\n📝 REGISTRATION TESTS\n');

test('registerUser: valid new user succeeds', () => {
  // Reset database for clean test
  Database.users = Database.users.filter(u => u.name !== 'testuser');
  
  const result = registerUser('testuser', {
    email: 'testuser@example.com',
    password: 'validpass123!',
    age: 25
  });
  
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.user.name, 'testuser');
});

test('registerUser: duplicate user fails', () => {
  const result = registerUser('john', {
    email: 'john2@example.com',
    password: 'password123!',
    age: 25
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error.includes('exists'));
});

test('registerUser: invalid email fails', () => {
  const result = registerUser('newuser', {
    email: 'invalidemail',
    password: 'validpass123!',
    age: 25
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error.includes('email'));
});

test('registerUser: short password fails', () => {
  const result = registerUser('newuser', {
    email: 'newuser@example.com',
    password: 'short',
    age: 25
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error.includes('password'));
});

test('registerUser: underage user fails', () => {
  const result = registerUser('younguser', {
    email: 'young@example.com',
    password: 'validpass123!',
    age: 16
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error.includes('18'));
});

console.log('\n👤 USER PROFILE TESTS\n');

test('getUserProfile: existing user found', () => {
  const result = getUserProfile('john');
  assert.strictEqual(result.found, true);
  assert.strictEqual(result.user.name, 'john');
});

test('getUserProfile: nonexistent user not found', () => {
  const result = getUserProfile('nonexistent');
  assert.strictEqual(result.found, false);
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
