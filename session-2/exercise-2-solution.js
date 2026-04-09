/**
 * ✅ CLEAN CODE - User Authentication Module
 * 
 * Key improvements:
 * ✓ Meaningful function names
 * ✓ Meaningful variable names
 * ✓ Extracted validation functions
 * ✓ Guard clauses (early returns)
 * ✓ No code duplication
 * ✓ Clear error handling
 * ✓ Separation of concerns
 * ✓ Pure functions for testing
 */

// ==========================================
// CONSTANTS
// ==========================================

const MIN_PASSWORD_LENGTH = 8;
const MIN_USER_AGE = 18;
const EMAIL_PATTERN = /@/;

const ERROR_MESSAGES = {
  MISSING_CREDENTIALS: 'Username and password are required',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',
  ACCOUNT_DISABLED: 'Account is disabled',
  INVALID_EMAIL: 'Email must contain @',
  PASSWORD_TOO_SHORT: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  UNDERAGE: `User must be at least ${MIN_USER_AGE} years old`,
  USER_EXISTS: 'User already exists',
  INVALID_USER_TYPE: 'Invalid user type'
};

// ==========================================
// DATABASE (Mock)
// ==========================================

const Database = {
  users: [
    { 
      name: 'john', 
      email: 'john@example.com', 
      password: 'password123!', 
      age: 25, 
      active: true, 
      lastLogin: null 
    },
    { 
      name: 'jane', 
      email: 'jane@example.com', 
      password: 'secure456!', 
      age: 22, 
      active: true, 
      lastLogin: null 
    },
    { 
      name: 'bob', 
      email: 'bob@example.com', 
      password: 'notactive!', 
      age: 30, 
      active: false, 
      lastLogin: null 
    }
  ],
  
  findByUsername: (username) => {
    return Database.users.find(user => user.name === username);
  },
  
  findByEmail: (email) => {
    return Database.users.find(user => user.email === email);
  },
  
  userExists: (username) => {
    return Database.findByUsername(username) !== undefined;
  },
  
  addUser: (user) => {
    Database.users.push(user);
  },
  
  updateUser: (username, updates) => {
    const user = Database.findByUsername(username);
    if (user) {
      Object.assign(user, updates);
    }
  }
};

// ==========================================
// VALIDATION FUNCTIONS (Pure)
// ==========================================

/**
 * Check if email is valid format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return email && email.includes('@');
}

/**
 * Check if password meets requirements
 * @param {string} password
 * @returns {boolean}
 */
function isValidPassword(password) {
  return password && password.length >= MIN_PASSWORD_LENGTH;
}

/**
 * Check if user is old enough
 * @param {number} age
 * @returns {boolean}
 */
function isAdult(age) {
  return age && age >= MIN_USER_AGE;
}

/**
 * Validate a new user before registration
 * @param {Object} newUser - User object with email, password, age
 * @returns {Object} { isValid: boolean, error: string }
 */
function validateNewUser(newUser) {
  // Guard clause: check email
  if (!isValidEmail(newUser.email)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.INVALID_EMAIL
    };
  }
  
  // Guard clause: check password
  if (!isValidPassword(newUser.password)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.PASSWORD_TOO_SHORT
    };
  }
  
  // Guard clause: check age
  if (!isAdult(newUser.age)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.UNDERAGE
    };
  }
  
  return { isValid: true, error: null };
}

// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

/**
 * Authenticate user with username and password
 * 
 * @param {string} username
 * @param {string} password
 * @returns {Object} { success: boolean, user?: Object, error?: string }
 */
function authenticateUser(username, password) {
  // Guard clause: check credentials provided
  if (!username || !password) {
    return {
      success: false,
      error: ERROR_MESSAGES.MISSING_CREDENTIALS
    };
  }
  
  // Guard clause: user exists
  const user = Database.findByUsername(username);
  if (!user) {
    return {
      success: false,
      error: ERROR_MESSAGES.USER_NOT_FOUND
    };
  }
  
  // Guard clause: password matches
  if (password !== user.password) {
    return {
      success: false,
      error: ERROR_MESSAGES.INVALID_PASSWORD
    };
  }
  
  // Guard clause: account is active
  if (!user.active) {
    return {
      success: false,
      error: ERROR_MESSAGES.ACCOUNT_DISABLED
    };
  }
  
  // Success: update last login and return user
  Database.updateUser(username, { lastLogin: new Date() });
  
  return {
    success: true,
    user: {
      name: user.name,
      email: user.email,
      age: user.age,
      lastLogin: user.lastLogin
    }
  };
}

/**
 * Register a new user
 * 
 * @param {string} username
 * @param {Object} userData - { email, password, age }
 * @returns {Object} { success: boolean, user?: Object, error?: string }
 */
function registerUser(username, userData) {
  // Guard clause: inputs provided
  if (!username || !userData) {
    return {
      success: false,
      error: 'Username and user data required'
    };
  }
  
  // Guard clause: user doesn't exist
  if (Database.userExists(username)) {
    return {
      success: false,
      error: ERROR_MESSAGES.USER_EXISTS
    };
  }
  
  // Guard clause: validate user data
  const validation = validateNewUser(userData);
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error
    };
  }
  
  // Success: create and add user
  const newUser = {
    name: username,
    email: userData.email,
    password: userData.password,
    age: userData.age,
    active: true,
    lastLogin: null
  };
  
  Database.addUser(newUser);
  
  return {
    success: true,
    user: {
      name: newUser.name,
      email: newUser.email,
      age: newUser.age
    }
  };
}

/**
 * Get user by username (public profile)
 * 
 * @param {string} username
 * @returns {Object} { found: boolean, user?: Object, error?: string }
 */
function getUserProfile(username) {
  const user = Database.findByUsername(username);
  
  if (!user) {
    return {
      found: false,
      error: ERROR_MESSAGES.USER_NOT_FOUND
    };
  }
  
  return {
    found: true,
    user: {
      name: user.name,
      email: user.email,
      age: user.age,
      active: user.active
    }
  };
}

// ==========================================
// USAGE & TESTING
// ==========================================

console.log('=== CLEAN CODE AUTH MODULE ===\n');

// Test 1: Successful login
console.log('Test 1: Successful login');
const login1 = authenticateUser('john', 'password123!');
console.log('Result:', login1);
console.log();

// Test 2: Wrong password
console.log('Test 2: Wrong password');
const login2 = authenticateUser('john', 'wrongpassword');
console.log('Result:', login2);
console.log();

// Test 3: Account disabled
console.log('Test 3: Account disabled');
const login3 = authenticateUser('bob', 'notactive!');
console.log('Result:', login3);
console.log();

// Test 4: Successful registration
console.log('Test 4: Successful registration');
const register1 = registerUser('alice', {
  email: 'alice@example.com',
  password: 'secure789!',
  age: 28
});
console.log('Result:', register1);
console.log();

// Test 5: Registration - user exists
console.log('Test 5: Registration - user exists');
const register2 = registerUser('john', {
  email: 'john2@example.com',
  password: 'newpass123!',
  age: 25
});
console.log('Result:', register2);
console.log();

// Test 6: Registration - invalid email
console.log('Test 6: Registration - invalid email');
const register3 = registerUser('charlie', {
  email: 'charlieexample.com',  // Missing @
  password: 'secure789!',
  age: 24
});
console.log('Result:', register3);
console.log();

// Test 7: Registration - password too short
console.log('Test 7: Registration - password too short');
const register4 = registerUser('dave', {
  email: 'dave@example.com',
  password: 'short',  // Less than 8 chars
  age: 22
});
console.log('Result:', register4);
console.log();

// Test 8: Registration - user underage
console.log('Test 8: Registration - user underage');
const register5 = registerUser('eve', {
  email: 'eve@example.com',
  password: 'secure789!',
  age: 16  // Less than 18
});
console.log('Result:', register5);
console.log();

// Test 9: Get user profile
console.log('Test 9: Get user profile');
const profile = getUserProfile('john');
console.log('Result:', profile);
console.log();

// ==========================================
// EXPORT FOR TESTING
// ==========================================

module.exports = {
  // Validation functions (for unit testing)
  isValidEmail,
  isValidPassword,
  isAdult,
  validateNewUser,
  
  // Main functions
  authenticateUser,
  registerUser,
  getUserProfile,
  
  // Database (for testing)
  Database
};
