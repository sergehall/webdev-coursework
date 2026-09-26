// Assignment 2C: Conditions & Loops
// Name: Siarhei Hancharou
// Date: 2025-06-26

// --- Step 1: My Personal Commute Data ---
const myCommuteDistance = 12;
const myTransportMode = "bus";
const myLandmark = "Central Park";
const myLandmarkMile = 6;

// --- Step 2: Determine Speed ---
let speedMph = 0;

if (myTransportMode === "car") {
  speedMph = 40;
} else if (myTransportMode === "bus") {
  speedMph = 20;
} else if (myTransportMode === "bike") {
  speedMph = 15;
} else if (myTransportMode === "walk") {
  speedMph = 3;
} else {
  speedMph = 0;
}

// --- Step 3: Prediction ---
/*
Prediction:
I think my commute will take 12 miles / 20 mph = 0.6 hours (36 minutes).
The landmark message should appear at mile 6.
If the commute distance is 0, the loop won't run.
If the transport mode is unknown, speed will stay 0 and commute time will become Infinity.
*/

// --- Step 4: Commute Simulation ---
console.log("--- Siarhei's Commute Simulation ---");
console.log(
  `Starting commute of ${myCommuteDistance} miles by ${myTransportMode}.`
);

for (let mile = 1; mile <= myCommuteDistance; mile++) {
  if (mile === myLandmarkMile) {
    console.log(`Mile ${mile}: Hey, there's ${myLandmark}!`);
  } else {
    console.log(`Mile ${mile}: Cruising along...`);
  }
}

const commuteTime = myCommuteDistance / speedMph;
console.log("Arrived!");
console.log(`Total commute time: ${commuteTime} hours.`);

// --- Step 5: Edge Case Testing ---
let testCommuteDistance = 0;
let testTransportMode = "teleport";
let testSpeed = 0;

if (testTransportMode === "car") {
  testSpeed = 40;
} else if (testTransportMode === "bus") {
  testSpeed = 20;
} else if (testTransportMode === "bike") {
  testSpeed = 15;
} else if (testTransportMode === "walk") {
  testSpeed = 3;
} else {
  testSpeed = 0;
}

console.log("\n--- Edge Case Test: Distance = 0, Mode = teleport ---");
console.log(
  `Starting commute of ${testCommuteDistance} miles by ${testTransportMode}.`
);

for (let mile = 1; mile <= testCommuteDistance; mile++) {
  console.log(`Mile ${mile}: Cruising along...`);
}

const testTime = testCommuteDistance / testSpeed;
console.log("Arrived!");
console.log(`Total commute time: ${testTime} hours.`);

// --- Step 6: Reflection ---
/*
Prediction vs. Result:
I predicted 0.6 hours commute time, and that’s what the program printed.
Landmark message appeared correctly at mile 6.

Analysis:
The loop correctly iterates from 1 to 12 and shows the special message at the right mile.
The commute time is calculated as distance divided by speed.

Exploration Insights:
- Distance = 0 → the loop didn’t run, because the loop condition (mile <= distance) was false immediately.
- Mode = "teleport" → speed was 0 → 0 / 0 = NaN.
- Output: Total commute time: NaN hours. — this is exactly what should happen when there is no `else` case to handle unexpected input or prevent division by zero.

This teaches the importance of writing defensive code by including a default case in conditionals to handle unknown or invalid values.
*/
console.log("Good afternoon, Vicky Tanya Seno.");
