// Greet a user by name
function greet(name) {
  return "Hello, " + name + "!";
}

// Check if a number is even
function isEven(num) {
  return num % 2 === 0;
}

// Get the square of a number
function square(num) {
  return num * num;
}

// Reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Get factorial
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// Calculate total price with tax and optional discount
// Params: price (number), taxRate (number), discount (number, optional)
// Returns total price after applying tax and optional discount
function calculateTotal(price, taxRate, discount = 0) {
  const taxed = price + price * (taxRate / 100);
  const final = taxed - discount;
  return final >= 0 ? final : 0;
}

// Determine eligibility for a program based on age, GPA, and experience
// Returns different messages based on a combination of inputs
function checkEligibility(age, gpa, hasExperience) {
  if (age < 18) {
    return "Not eligible: must be 18 or older.";
  }
  if (gpa >= 3.5 && hasExperience) {
    return "Eligible for advanced program.";
  }
  if (gpa >= 2.5) {
    return "Eligible for standard program.";
  }
  return "Not eligible: GPA too low.";
}

// Format user profile summary
// Accepts: name (string), age (number), interests (array of strings), isStudent (bool)
// Returns: a formatted sentence about the user
function createUserSummary(name, age, interests, isStudent) {
  const interestList = interests.length
    ? interests.join(", ")
    : "no listed interests";
  const role = isStudent ? "a student" : "not a student";
  return `${name} is ${age} years old, ${role}, and enjoys ${interestList}.`;
}
