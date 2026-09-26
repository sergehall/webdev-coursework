// Appends HTML content to a div with id="output"
function outputHTML(html) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML += html;
}

// Clears all content from the output div
function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

// Prompts the user until they enter a strictly valid whole integer
function getValidatedInteger(message) {
  let value;
  let isValid = false;

  do {
    const input = prompt(message);
    if (/^-?\d+$/.test(input)) {
      value = Number(input);
      isValid = true;
    } else {
      alert(
        "Invalid input. Please enter a valid whole number (no letters or symbols)."
      );
    }
  } while (!isValid);

  return value;
}

// === 6.17 ===
// Prompt the user to enter two integers.
// Display the larger value in an alert: "X is larger".
// If equal, display HTML text: "These numbers are equal."
function compareTwoIntegers() {
  const num1 = getValidatedInteger("Enter the first integer:");
  const num2 = getValidatedInteger("Enter the second integer:");

  if (num1 > num2) {
    alert(`${num1} is larger`);
  } else if (num2 > num1) {
    alert(`${num2} is larger`);
  } else {
    outputHTML(
      `<p style="color: blue; font-weight: bold;">These numbers are equal.</p>`
    );
  }
}

// === 6.18 ===
// Prompt the user to enter 3 integers.
// Show sum, average, product, smallest, and largest in an alert.
function calculateStats() {
  const nums = [];

  for (let i = 1; i <= 3; i++) {
    const num = getValidatedInteger(`Enter integer #${i}:`);
    nums.push(num);
  }

  const sum = nums[0] + nums[1] + nums[2];
  const average = sum / 3;
  const product = nums[0] * nums[1] * nums[2];
  const smallest = Math.min(...nums);
  const largest = Math.max(...nums);

  alert(
    `You entered: ${nums.join(", ")}\n\n` +
      `Sum: ${sum}\n` +
      `Average: ${average.toFixed(2)}\n` +
      `Product: ${product}\n` +
      `Smallest: ${smallest}\n` +
      `Largest: ${largest}`
  );
}

// === 7.12 ===
// Prompt the user to enter customer credit account details:
// beginning balance, charges, credits, and credit limit.
// Calculate new balance and check if credit limit is exceeded.
function checkCreditLimit() {
  const accountNumber = prompt("Enter account number (e.g., 12345):")?.trim();
  if (!accountNumber) {
    alert("Account number is required.");
    return;
  }

  const beginningBalance = getValidatedInteger(
    "Enter beginning balance (amount already owed):"
  );
  const charges = getValidatedInteger(
    "Enter total charges (new purchases this month):"
  );
  const credits = getValidatedInteger(
    "Enter total credits (payments made this month):"
  );
  const creditLimit = getValidatedInteger("Enter your allowed credit limit:");

  const newBalance = beginningBalance + charges - credits;

  outputHTML(`
    <div style="margin-bottom: 1.5rem;">
      <p><strong>Account Number:</strong> ${accountNumber}</p>
      <p><strong>Beginning Balance:</strong> $${beginningBalance.toFixed(2)}</p>
      <p><strong>Charges:</strong> $${charges.toFixed(2)}</p>
      <p><strong>Credits:</strong> $${credits.toFixed(2)}</p>
      <p><strong>Credit Limit:</strong> $${creditLimit.toFixed(2)}</p>
      <p><strong>New Balance:</strong> <strong>$${newBalance.toFixed(2)}</strong></p>
    </div>
  `);

  if (newBalance > creditLimit) {
    const over = (newBalance - creditLimit).toFixed(2);
    outputHTML(
      `<p style="color: red; font-weight: bold;">Credit limit exceeded by $${over}.</p>`
    );
  } else {
    outputHTML(
      `<p style="color: green; font-weight: bold;">Credit is within the limit.</p>`
    );
  }
}

// === 8.7 ===
// Ask the user if they want to calculate the product of even or odd numbers.
// Prompt for a maximum number (between 2 and 100).
// Display the result and numbers used in HTML.
function calculateEvenOddProduct() {
  const type = prompt(
    "Do you want to calculate the product of 'even' or 'odd' numbers?"
  )?.toLowerCase();
  if (type !== "even" && type !== "odd") {
    alert("Invalid choice. Please enter either 'even' or 'odd'.");
    return;
  }

  const max = getValidatedInteger(
    "Enter the maximum number (between 2 and 100):"
  );
  if (max < 2 || max > 100) {
    alert("Number out of range. Enter a number between 2 and 100.");
    return;
  }

  const start = type === "even" ? 2 : 1;
  let product = 1;
  let numbersUsed = [];

  for (let i = start; i <= max; i += 2) {
    product *= i;
    numbersUsed.push(i);
  }

  outputHTML(`
    <p><strong>Product of ${type} numbers from ${start} to ${max}:</strong> ${product}</p>
    <p><strong>Numbers used:</strong> ${numbersUsed.join(", ")}</p>
  `);
}
