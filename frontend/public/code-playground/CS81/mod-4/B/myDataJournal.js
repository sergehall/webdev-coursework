// myDataJournal.js
// CS81 Module 4B: My Personal Data Objects
// GitHub Repository: https://github.com/sergehall/cs81-module4b-mydataexplorer

// Predictions:
// I predict that Saturday will have the most screen time.
// I think Tuesday will be the day with the highest focus level.
// I expect that higher caffeine intake will correlate with higher focus.
// We'll test these assumptions with analysis functions below.
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
    caffeineIntake: 1,
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
    caffeineIntake: 1,
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
    caffeineIntake: 0,
    focusLevel: 9,
  },
  {
    day: "Sunday",
    sleepHours: 7.5,
    screenTime: 3,
    mood: "reflective",
    caffeineIntake: 1,
    focusLevel: 8,
  },
];

// 1. Find the day with the highest screen time
function findHighestScreenTime(data) {
  let max = -Infinity;
  let day = "";
  for (let entry of data) {
    if (entry.screenTime > max) {
      max = entry.screenTime;
      day = entry.day;
    }
  }
  return `Most screen time: ${day} (${max} hrs)`;
}

// 2. Calculate average sleep hours
function averageSleep(data) {
  const total = data.reduce((sum, entry) => sum + entry.sleepHours, 0);
  return `Average sleep: ${(total / data.length).toFixed(1)} hrs`;
}

// 3. Find most frequent mood
function mostFrequentMood(data) {
  const moodCount = {};
  for (let { mood } of data) {
    moodCount[mood] = (moodCount[mood] || 0) + 1;
  }

  let most = "";
  let max = 0;
  for (let mood in moodCount) {
    if (moodCount[mood] > max) {
      most = mood;
      max = moodCount[mood];
    }
  }

  return `Most frequent mood: "${most}"`;
}

// 4. Determine if caffeine helps focus (extended analysis)
function correlateCaffeineToFocus(data) {
  const totalCaffeine = data.reduce((sum, e) => sum + e.caffeineIntake, 0);
  const totalFocus = data.reduce((sum, e) => sum + e.focusLevel, 0);
  const avgCaffeine = totalCaffeine / data.length;
  const avgFocus = totalFocus / data.length;

  const aboveAvg = data.filter((e) => e.focusLevel > avgFocus).length;

  const highCaff = data.filter((e) => e.caffeineIntake >= avgCaffeine);
  const lowCaff = data.filter((e) => e.caffeineIntake < avgCaffeine);

  const highAvgFocus =
    highCaff.reduce((s, e) => s + e.focusLevel, 0) / highCaff.length;
  const lowAvgFocus =
    lowCaff.reduce((s, e) => s + e.focusLevel, 0) / lowCaff.length;

  const correlationMessage =
    highAvgFocus > lowAvgFocus
      ? "↑ More caffeine seems to increase focus."
      : "↓ More caffeine doesn't improve focus.";

  return {
    aboveAvgFocusDays: aboveAvg,
    avgFocus,
    avgCaffeine,
    highAvgFocus,
    lowAvgFocus,
    correlationMessage,
  };
}

// 5. Day with best sleep (most hours)
function bestSleepDay(data) {
  return data.reduce((best, cur) =>
    cur.sleepHours > best.sleepHours ? cur : best
  ).day;
}

// 6. Average focus per mood
function averageFocusPerMood(data) {
  const moodStats = {};

  for (let { mood, focusLevel } of data) {
    if (!moodStats[mood]) {
      moodStats[mood] = { total: 0, count: 0 };
    }
    moodStats[mood].total += focusLevel;
    moodStats[mood].count++;
  }

  const results = [];
  for (let mood in moodStats) {
    const avg = (moodStats[mood].total / moodStats[mood].count).toFixed(1);
    results.push(`${mood}: ${avg}`);
  }

  return `Average focus by mood → ${results.join(", ")}`;
}

// 7. Total weekly caffeine intake
function totalCaffeine(data) {
  const total = data.reduce((sum, e) => sum + e.caffeineIntake, 0);
  return `Total caffeine this week: ${total} cups`;
}

// Calculates the average focus level over the entire week.
// Input: an array of daily data objects, each containing a focusLevel.
// Output: a string representing the average focus level, rounded to 1 decimal.
function averageFocusLevel(data) {
  const total = data.reduce((sum, e) => sum + e.focusLevel, 0);
  return (total / data.length).toFixed(1);
}

module.exports = {
  findHighestScreenTime,
  averageSleep,
  mostFrequentMood,
  correlateCaffeineToFocus,
  bestSleepDay,
  averageFocusPerMood,
  totalCaffeine,
  averageFocusLevel,
};
