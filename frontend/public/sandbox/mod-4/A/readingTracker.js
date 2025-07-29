// readingTracker.js

const addReadBook = require("./tracker-functions/addReadBook");
const totalReadingMinutes = require("./tracker-functions/totalReadingMinutes");
const mostReadBook = require("./tracker-functions/mostReadBook");
const printDailySummary = require("./tracker-functions/printDailySummary");

// Optional sample log
const sampleLog = [
  { day: "Monday", book: "Eloquent JavaScript", minutes: 30 },
  { day: "Tuesday", book: "You Don’t Know JS", minutes: 20 },
  { day: "Wednesday", book: "The TypeScript Handbook", minutes: 45 },
  { day: "Thursday", book: "JavaScript: The Good Parts", minutes: 40 },
  { day: "Friday", book: "Eloquent JavaScript", minutes: 55 },
];

module.exports = {
  addReadBook,
  totalReadingMinutes,
  mostReadBook,
  printDailySummary,
  sampleLog,
};
