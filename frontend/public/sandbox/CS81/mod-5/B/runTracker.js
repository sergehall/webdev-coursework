// Weekly activity tracker - my personal log for 7 days

const myWeek = [
  {
    day: "Monday",
    activity: "Jogging",
    category: "physical",
    hoursSpent: 1,
    enjoyment: 7,
    timeOfDay: "morning",
  },
  {
    day: "Tuesday",
    activity: "Painting",
    category: "creative",
    hoursSpent: 2,
    enjoyment: 9,
    timeOfDay: "afternoon",
  },
  {
    day: "Wednesday",
    activity: "Video Call with Friends",
    category: "social",
    hoursSpent: 1.5,
    enjoyment: 8,
    timeOfDay: "evening",
  },
  {
    day: "Thursday",
    activity: "Reading",
    category: "creative",
    hoursSpent: 1.2,
    enjoyment: 6,
    timeOfDay: "evening",
  },
  {
    day: "Friday",
    activity: "Cycling",
    category: "physical",
    hoursSpent: 2,
    enjoyment: 8,
    timeOfDay: "morning",
  },
  {
    day: "Saturday",
    activity: "Watching Movie",
    category: "social",
    hoursSpent: 2.5,
    enjoyment: 7,
    timeOfDay: "evening",
  },
  {
    day: "Sunday",
    activity: "Cooking",
    category: "creative",
    hoursSpent: 1.5,
    enjoyment: 9,
    timeOfDay: "afternoon",
  },
];

// --- Predictions before analysis ---

// 1. I think "Painting" or "Cooking" will have the highest enjoyment rating.
// 2. The "creative" category seems to dominate my week with 3 activities.
// 3. I suspect that I enjoy activities more in the evening, especially social ones.

// A custom higher-order function that filters the week based on a test function
function filterByCondition(week, testFn) {
  return week.filter(testFn);
  // testFn is a callback like: entry => entry.hoursSpent < 1 && entry.enjoyment > 8
}

// Returns the total hours spent on a given activity category (e.g. physical, creative, social)
function getTotalHoursByCategory(week, categoryName) {
  return week
    .filter((entry) => entry.category === categoryName) // keep only matching category
    .reduce((sum, entry) => sum + entry.hoursSpent, 0); // sum the hours
}

// Calculates average enjoyment for activities done in the evening
function getAverageEveningEnjoyment(week) {
  const eveningActivities = week.filter(
    (entry) => entry.timeOfDay === "evening"
  );
  const totalEnjoyment = eveningActivities.reduce(
    (sum, entry) => sum + entry.enjoyment,
    0
  );
  return eveningActivities.length > 0
    ? (totalEnjoyment / eveningActivities.length).toFixed(1)
    : 0;
}

// Returns names of activities with low effort (< 1.5 hrs) and high enjoyment (> 7)
function getHighEnjoymentLowEffortActivities(week) {
  return week
    .filter((entry) => entry.hoursSpent < 1.5 && entry.enjoyment > 7)
    .map((entry) => entry.activity); // return just the activity names
}

console.log("Analyzing My Weekly Activities...\n");

console.log(
  "Total hours spent on physical activities:",
  getTotalHoursByCategory(myWeek, "physical")
);

console.log(
  "Average enjoyment in the evening:",
  getAverageEveningEnjoyment(myWeek)
);

const lowEffort = getHighEnjoymentLowEffortActivities(myWeek);
console.log(
  "Low-effort, high-enjoyment activities:",
  lowEffort.length > 0 ? lowEffort.join(", ") : "(none found)"
);

const customFiltered = filterByCondition(
  myWeek,
  (entry) => entry.hoursSpent < 1.5 && entry.enjoyment > 8
);

console.log(
  "Filtered custom (short + fun) activities:",
  customFiltered.length > 0
    ? customFiltered.map((e) => e.activity).join(", ")
    : "(no matches)"
);
