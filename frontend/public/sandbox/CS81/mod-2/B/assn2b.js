// Siarhei Hancharou - June 26, 2025
// Assignment 2B: FizzBuzz

for (let i = 1; i <= 120; i++) {
  if (i % 4 === 0 && i % 10 === 0) {
    console.log("FizzBuzz");
  } else if (i % 4 === 0) {
    console.log("Fizz");
  } else if (i % 10 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
