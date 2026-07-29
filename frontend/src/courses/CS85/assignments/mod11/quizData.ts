import type { AssessmentQuestion } from "@/features/assessment";

export const moduleElevenQuizQuestions = [
  {
    id: 1,
    kind: "single",
    points: 1,
    prompt: "What does API stand for?",
    options: [
      "Advanced Program Interface",
      "Automated Programming Interface",
      "Application Process Interface",
      "Application Programming Interface",
    ],
    answer: [3],
  },
  {
    id: 2,
    kind: "single",
    points: 1,
    prompt:
      "Which HTTP method is used to retrieve data without changing anything on the server?",
    options: ["GET", "DELETE", "POST", "PUT"],
    answer: [0],
  },
  {
    id: 3,
    kind: "single",
    points: 1,
    prompt:
      "What is the primary purpose of the service pattern in Laravel applications?",
    options: [
      "Create user interfaces",
      "Separate business logic from controllers",
      "Manage database connections",
      "Handle HTTP requests",
    ],
    answer: [1],
  },
  {
    id: 4,
    kind: "single",
    points: 1,
    prompt: "Which HTTP status code indicates a successful API request?",
    options: ["404", "500", "401", "200"],
    answer: [3],
  },
  {
    id: 5,
    kind: "single",
    points: 1,
    prompt: "What file format is most commonly used for API data exchange?",
    options: ["CSV", "XML", "JSON", "HTML"],
    answer: [2],
  },
  {
    id: 6,
    kind: "single",
    points: 1,
    prompt:
      "True or False: REST APIs are stateless meaning each request must contain all necessary information.",
    options: ["False", "True"],
    answer: [1],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt:
      "Which Laravel file should contain your API keys and sensitive configuration?",
    options: ["routes/web.php", ".env", "composer.json", "config/app.php"],
    answer: [1],
  },
  {
    id: 8,
    kind: "single",
    points: 1,
    prompt: "What does SDK stand for?",
    options: [
      "Secure Development Kit",
      "Standard Development Kit",
      "System Development Kit",
      "Software Development Kit",
    ],
    answer: [3],
  },
  {
    id: 9,
    kind: "single",
    points: 1,
    prompt: "Which HTTP method is typically used to create new resources?",
    options: ["DELETE", "GET", "PUT", "POST"],
    answer: [3],
  },
  {
    id: 10,
    kind: "single",
    points: 1,
    prompt:
      "True or False: Controller bloat refers to controllers that handle too many responsibilities.",
    options: ["True", "False"],
    answer: [0],
  },
  {
    id: 11,
    kind: "single",
    points: 1,
    prompt:
      "What is the main advantage of using an SDK over making raw API calls?",
    options: [
      "Better security",
      "Faster execution",
      "Smaller file size",
      "Simplified integration and error handling",
    ],
    answer: [3],
  },
  {
    id: 12,
    kind: "single",
    points: 1,
    prompt:
      "Which directory should contain service classes in a Laravel application?",
    options: ["app/Http", "app/Models", "app/Services", "app/Controllers"],
    answer: [2],
  },
  {
    id: 13,
    kind: "single",
    points: 1,
    prompt: "What does the Single Responsibility Principle state?",
    options: [
      "Each method should have only one parameter",
      "Each application should have only one database",
      "Each class should have only one reason to change",
      "Each file should contain only one class",
    ],
    answer: [2],
  },
  {
    id: 14,
    kind: "single",
    points: 1,
    prompt:
      "True or False: Environment variables help keep sensitive data out of version control.",
    options: ["True", "False"],
    answer: [0],
  },
  {
    id: 15,
    kind: "single",
    points: 1,
    prompt: "Which HTTP status code indicates that a resource was not found?",
    options: ["200", "500", "404", "401"],
    answer: [2],
  },
  {
    id: 16,
    kind: "single",
    points: 1,
    prompt:
      "What is the purpose of dependency injection in Laravel controllers?",
    options: [
      "Reduce file size",
      "Handle errors",
      "Make code more testable and flexible",
      "Improve performance",
    ],
    answer: [2],
  },
  {
    id: 17,
    kind: "single",
    points: 1,
    prompt:
      "True or False: Microservices architecture typically involves many small services communicating through APIs.",
    options: ["True", "False"],
    answer: [0],
  },
  {
    id: 18,
    kind: "single",
    points: 1,
    prompt:
      "Which command is used to test your Laravel application interactively?",
    options: [
      "php artisan migrate",
      "php artisan serve",
      "php artisan tinker",
      "php artisan make:controller",
    ],
    answer: [2],
  },
  {
    id: 19,
    kind: "single",
    points: 1,
    prompt:
      "What is the recommended approach for handling API errors in professional applications?",
    options: [
      "Restart the application",
      "Log detailed errors and show user friendly messages",
      "Ignore errors completely",
      "Display raw error messages to users",
    ],
    answer: [1],
  },
] satisfies readonly AssessmentQuestion[];

export const moduleElevenQuizTotalPoints = moduleElevenQuizQuestions.reduce(
  (total, question) => total + question.points,
  0
);
