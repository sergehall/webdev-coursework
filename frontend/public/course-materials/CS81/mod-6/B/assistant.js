// assistant.js

// Constructor function to create a personal assistant object
function PersonalAssistant(name) {
  this.name = name; // Assistant's name
  this.tasks = []; // Array to hold tasks
  this.mood = "neutral"; // Default mood
}

// Adds a new task to the assistant's task list
PersonalAssistant.prototype.addTask = function (task) {
  this.tasks.push(task);
  console.log(`${this.name} added task: "${task}"`);
};

// Completes the first task and updates mood
PersonalAssistant.prototype.completeTask = function () {
  if (this.tasks.length > 0) {
    const completed = this.tasks.shift();
    console.log(`${this.name} completed task: "${completed}"`);
    this.mood = "productive";
  } else {
    console.log(`${this.name} has no tasks left to complete.`);
    this.mood = "relaxed";
  }
};

// Reports current mood
PersonalAssistant.prototype.reportMood = function () {
  console.log(`${this.name}'s current mood is: ${this.mood}`);
};

// --- Simulate a day with the assistant ---

// Create an instance of the assistant
const myAssistant = new PersonalAssistant("SergeBot");

// Greet the user
console.log(`Good morning! I'm ${myAssistant.name}, your personal assistant.`);

// Morning setup
myAssistant.mood = "motivated";
myAssistant.reportMood();

// Add real tasks for the day
myAssistant.addTask("Finish CS81 Assignment 6B");
myAssistant.addTask("Reply to professor's email");
myAssistant.addTask("Take a walk before lunch");
myAssistant.addTask("Cook dinner");
myAssistant.addTask("Review JavaScript constructors");

// Midday check-in
console.log("\nIt's noon! Let's check your progress...");

myAssistant.completeTask(); // Finishing assignment
myAssistant.completeTask(); // Replying to email

myAssistant.mood = "productive";
myAssistant.reportMood();

// Add a new task in the afternoon
myAssistant.addTask("Water the plants");

// Evening wrap-up
console.log("\nEvening check-in...");

myAssistant.completeTask(); // Take a walk
myAssistant.completeTask(); // Cook dinner

// Final mood and task check
myAssistant.mood = "accomplished";
myAssistant.reportMood();

console.log(
  `You have ${myAssistant.tasks.length} task(s) left: ${myAssistant.tasks.join(", ")}`
);
