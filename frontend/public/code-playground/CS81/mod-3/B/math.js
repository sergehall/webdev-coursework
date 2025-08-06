// Double a number
// Takes a number n and returns its double (n * 2)
function double(n) {
  return n * 2;
}

// Square a number
// Returns the square of the number (n * n)
function square(n) {
  return n * n;
}

// Check if a number is even
// Returns true if n is divisible by 2 with no remainder
function isEven(n) {
  return n % 2 === 0;
}

// Multiply two numbers
// Returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Check if a number is odd
// Returns true if n is not divisible evenly by 2
function isOdd(n) {
  return n % 2 !== 0;
}

// Export all functions for use in other files (e.g., index.js)
module.exports = {
  double,
  square,
  isEven,
  multiply,
  isOdd,
};
