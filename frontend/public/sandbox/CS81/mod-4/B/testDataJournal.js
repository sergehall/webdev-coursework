// testDataJournal.js
// Run this file with: node testDataJournal.js

// const {
//   findHighestScreenTime,
//   averageSleep,
//   mostFrequentMood,
//   correlateCaffeineToFocus,
//   bestSleepDay,
//   averageFocusPerMood,
//   totalCaffeine,
//   averageFocusLevel,
// } = require("./myDataJournal");

// Sample weekly data (same as in myDataJournal.js)
const weekData = [
  {
    day: "Monday",
    sleepHours: 6.5,
    screenTime: 5,
    mood: "tired",
    caffeineIntake: 2,
    focusLevel: 5,
  },
  {
    day: "Tuesday",
    sleepHours: 7.2,
    screenTime: 4.5,
    mood: "productive",
    caffeineIntake: 2,
    focusLevel: 8,
  },
  {
    day: "Wednesday",
    sleepHours: 6.8,
    screenTime: 7,
    mood: "stressed",
    caffeineIntake: 3,
    focusLevel: 6,
  },
  {
    day: "Thursday",
    sleepHours: 8.1,
    screenTime: 4,
    mood: "calm",
    caffeineIntake: 2,
    focusLevel: 7,
  },
  {
    day: "Friday",
    sleepHours: 5.9,
    screenTime: 6.5,
    mood: "energetic",
    caffeineIntake: 4,
    focusLevel: 6,
  },
  {
    day: "Saturday",
    sleepHours: 9.0,
    screenTime: 8,
    mood: "relaxed",
    caffeineIntake: 1,
    focusLevel: 9,
  },
  {
    day: "Sunday",
    sleepHours: 7.5,
    screenTime: 3,
    mood: "reflective",
    caffeineIntake: 3,
    focusLevel: 8,
  },
];

console.log("Weekly Data Analysis Results");
console.log("──────────────────────────────────────");

console.log("Highest Screen Time Day:", findHighestScreenTime(weekData));
console.log("Average Sleep Duration:", averageSleep(weekData));
console.log("Most Frequent Mood:", mostFrequentMood(weekData));

const caffeineResult = correlateCaffeineToFocus(weekData);
console.log("Caffeine and Focus Correlation:");
console.log("   Average Focus Level:", caffeineResult.avgFocus.toFixed(2));
console.log(
  "   Average Caffeine Intake:",
  caffeineResult.avgCaffeine.toFixed(2)
);
console.log(
  "   Focus (High Caffeine Days):",
  caffeineResult.highAvgFocus.toFixed(2)
);
console.log(
  "   Focus (Low Caffeine Days):",
  caffeineResult.lowAvgFocus.toFixed(2)
);
console.log("   Summary:", caffeineResult.correlationMessage);

console.log("Best Sleep Day:", bestSleepDay(weekData));
console.log("Average Focus by Mood:", averageFocusPerMood(weekData));
console.log("Total Weekly Caffeine Intake:", totalCaffeine(weekData));
console.log("Overall Average Focus Level:", averageFocusLevel(weekData));
