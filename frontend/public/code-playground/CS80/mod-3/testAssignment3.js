// testAssignment3.js

function testCompareTwoIntegers() {
  outputHTML("<h4>🧪 Test 6.17: Compare Two Integers</h4>");

  const cases = [
    [5, 9],
    [10, 2],
    [7, 7],
    ["23p", "3"],
    ["abc", 10],
  ];

  cases.forEach(([a, b], index) => {
    let result = `<p><strong>Test ${index + 1}:</strong> input1 = "${a}", input2 = "${b}" → `;

    const isValid = /^-?\d+$/.test(a) && /^-?\d+$/.test(b);

    if (!isValid) {
      result += `<span style="color: red;">❌ Invalid input</span></p>`;
    } else {
      const n1 = Number(a);
      const n2 = Number(b);

      if (n1 > n2) {
        result += `<span style="color: green;">${n1} is larger</span></p>`;
      } else if (n2 > n1) {
        result += `<span style="color: green;">${n2} is larger</span></p>`;
      } else {
        result += `<span style="color: blue;">These numbers are equal</span></p>`;
      }
    }

    outputHTML(result);
  });
}

function testCalculateStats() {
  outputHTML("<h4>🧪 Test 6.18: Calculate Stats</h4>");

  const testSet = [
    [12, 3, 67],
    [5, 5, 5],
    [-10, 0, 10],
  ];

  testSet.forEach((nums, index) => {
    const [a, b, c] = nums;
    const sum = a + b + c;
    const avg = (sum / 3).toFixed(2);
    const prod = a * b * c;
    const min = Math.min(a, b, c);
    const max = Math.max(a, b, c);

    outputHTML(`
      <p><strong>Test ${index + 1}:</strong> Inputs: ${a}, ${b}, ${c}<br>
      Sum: ${sum}, Avg: ${avg}, Product: ${prod}, Min: ${min}, Max: ${max}</p>
    `);
  });
}

function testCheckCreditLimit() {
  outputHTML("<h4>🧪 Test 7.12: Credit Limit Check</h4>");

  const testCases = [
    { account: "1001", start: 1000, charges: 200, credits: 100, limit: 1000 },
    { account: "1002", start: 800, charges: 100, credits: 50, limit: 850 },
    { account: "1003", start: 200, charges: 50, credits: 100, limit: 300 },
  ];

  testCases.forEach((c, i) => {
    const newBalance = c.start + c.charges - c.credits;
    const exceeded = newBalance > c.limit;
    const overAmount = (newBalance - c.limit).toFixed(2);

    outputHTML(`
      <p>
        <strong>Test ${i + 1} – Account:</strong> ${c.account}<br>
        Beginning Balance: $${c.start}, Charges: $${c.charges}, Credits: $${c.credits}, Credit Limit: $${c.limit}<br>
        <strong>New Balance:</strong> $${newBalance.toFixed(2)}<br>
        ${
          exceeded
            ? `<span style="color: red;">❌ Credit limit exceeded by $${overAmount}</span>`
            : `<span style="color: green;">✅ Credit is within the limit</span>`
        }
      </p>
    `);
  });
}

function testEvenOddProduct() {
  outputHTML("<h4>🧪 Test 8.7: Even/Odd Product</h4>");

  const types = ["even", "odd"];
  const max = 15;

  // Вывод значения max
  outputHTML(`<p><strong>Max value used:</strong> ${max}</p>`);

  types.forEach((type) => {
    let start = type === "even" ? 2 : 1;
    let product = 1;
    const numbers = [];

    for (let i = start; i <= max; i += 2) {
      product *= i;
      numbers.push(i);
    }

    outputHTML(`
      <p>
        <strong>Type:</strong> ${type}<br>
        Numbers: ${numbers.join(", ")}<br>
        <strong>Product:</strong> ${product}
      </p>
    `);
  });
}
