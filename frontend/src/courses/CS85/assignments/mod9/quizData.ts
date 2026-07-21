import type { AssessmentQuestion } from "@/features/assessment";

export const moduleNineQuizQuestions = [
  {
    id: 1,
    kind: "single",
    points: 1,
    prompt: "What does CRUD stand for in web development?",
    options: [
      "Create Request Update Display",
      "Create Read Update Delete",
      "Custom Resource User Data",
      "Create Route Update Database",
    ],
    answer: [1],
  },
  {
    id: 2,
    kind: "single",
    points: 1,
    prompt:
      "Which HTTP method is typically used for updating existing resources in RESTful applications?",
    options: ["POST", "PUT", "GET", "DELETE"],
    answer: [1],
  },
  {
    id: 3,
    kind: "single",
    points: 1,
    prompt:
      "The create() method in a Laravel controller should contain complex validation logic and database operations.",
    options: ["True", "False"],
    answer: [1],
  },
  {
    id: 4,
    kind: "single",
    points: 1,
    prompt:
      "What is the primary purpose of the @csrf directive in Laravel forms?",
    options: [
      "Validate user input",
      "Generate unique IDs",
      "Prevent Cross-Site Request Forgery attacks",
      "Handle file uploads",
    ],
    answer: [2],
  },
  {
    id: 5,
    kind: "single",
    points: 1,
    prompt:
      "Which controller method is responsible for displaying a list of all resources?",
    options: ["create()", "show()", "index()", "edit()"],
    answer: [2],
  },
  {
    id: 6,
    kind: "single",
    points: 1,
    prompt:
      "What is the primary purpose of the old() helper function in Laravel?",
    options: [
      "Retrieve old database records",
      "Display historical data",
      "Repopulate form fields with previous input",
      "Access previous user sessions",
    ],
    answer: [2],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt:
      "Which validation rule ensures that a field contains a value and is not empty?",
    options: ["required", "max", "nullable", "string"],
    answer: [0],
  },
  {
    id: 8,
    kind: "single",
    points: 1,
    prompt: "What does CSRF stand for in web security?",
    options: [
      "Custom Security Request Framework",
      "Cross-Site Request Forgery",
      "Cross-Site Request Filtering",
      "Client-Side Request Formation",
    ],
    answer: [1],
  },
  {
    id: 9,
    kind: "single",
    points: 1,
    prompt:
      "Which controller method processes the form data when creating a new resource?",
    options: ["create()", "index()", "edit()", "store()"],
    answer: [3],
  },
  {
    id: 10,
    kind: "single",
    points: 1,
    prompt: "When validation fails in Laravel what happens automatically?",
    options: [
      "Sends an email to administrators",
      "Clears the form completely",
      "Redirects back with errors and old input",
      "Displays a generic error page",
    ],
    answer: [2],
  },
  {
    id: 11,
    kind: "single",
    points: 1,
    prompt: "What is the primary purpose of the unique validation rule?",
    options: [
      "Validate email format",
      "Prevent duplicate values in database",
      "Check numeric ranges",
      "Ensure field length limits",
    ],
    answer: [1],
  },
  {
    id: 12,
    kind: "single",
    points: 1,
    prompt:
      "Which HTTP status code should be returned when a resource is successfully created via API?",
    options: ["500", "404", "200", "201"],
    answer: [3],
  },
  {
    id: 13,
    kind: "single",
    points: 1,
    prompt:
      "Which validation rule allows a field to be empty or contain a value?",
    options: ["nullable", "required", "confirmed", "string"],
    answer: [0],
  },
] satisfies readonly AssessmentQuestion[];

export const moduleNineQuizTotalPoints = moduleNineQuizQuestions.reduce(
  (total, question) => total + question.points,
  0
);
