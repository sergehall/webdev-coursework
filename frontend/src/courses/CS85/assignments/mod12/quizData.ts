import type { AssessmentQuestion } from "@/features/assessment";

export const moduleTwelveQuizQuestions = [
  {
    id: 1,
    kind: "single",
    points: 1,
    prompt:
      "What is a.common sense principle underlying effective prompt engineering?",
    options: [
      "Garbage In Garbage Out",
      "Always use the longest possible prompts",
      "Temperature settings determine output quality",
      "AI systems work best with vague instructions",
    ],
    answer: [0],
  },
  {
    id: 2,
    kind: "single",
    points: 1,
    prompt: "What is role prompting in AI communication?",
    options: [
      "Setting the temperature parameter for AI responses",
      "Configuring the AI model version to use",
      "Establishing a specific persona or expertise domain for the AI to adopt",
      "Defining the maximum token limit for responses",
    ],
    answer: [2],
  },
  {
    id: 3,
    kind: "multiple",
    points: 1,
    prompt:
      "Which techniques are mentioned as advanced prompt engineering practices? (Select all that apply)",
    options: [
      "Chain-of-thought prompting",
      "Temperature adjustment",
      "Token limiting",
      "Few-shot prompting",
    ],
    answer: [0, 3],
  },
  {
    id: 4,
    kind: "single",
    points: 1,
    prompt:
      "According to the module how many distinct layers should the AI integration system architecture have?",
    options: ["Five layers", "Two layers", "Three layers", "Four layers"],
    answer: [3],
  },
  {
    id: 5,
    kind: "multiple",
    points: 1,
    prompt:
      "What are the four layers in the AI integration architecture? (Select all that apply)",
    options: [
      "User interface layer",
      "Service layer",
      "Controller layer",
      "External API layer",
    ],
    answer: [0, 1, 2, 3],
  },
  {
    id: 6,
    kind: "single",
    points: 1,
    prompt:
      "Why is progressive enhancement important in AI feature implementation?",
    options: [
      "It improves SEO rankings",
      "It makes the code more secure",
      "The feature should work as a natural extension of existing workflow",
      "It reduces server load",
    ],
    answer: [2],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt: "Which HTTP method should be used for AI generation requests?",
    options: ["DELETE", "PUT", "POST", "GET"],
    answer: [2],
  },
  {
    id: 8,
    kind: "single",
    points: 1,
    prompt:
      "What is the primary purpose of implementing a service layer for AI integration?",
    options: [
      "To encapsulate AI communication logic and maintain clean architecture",
      "To handle user authentication",
      "To manage file uploads",
      "To improve database performance",
    ],
    answer: [0],
  },
  {
    id: 9,
    kind: "single",
    points: 1,
    prompt:
      "Which design principle does the service layer architecture follow?",
    options: [
      "Don't Repeat Yourself",
      "You Aren't Gonna Need It",
      "Keep It Simple Stupid",
      "Single Responsibility Principle",
    ],
    answer: [3],
  },
  {
    id: 10,
    kind: "single",
    points: 1,
    prompt:
      "Where should API keys be stored according to security best practices?",
    options: [
      "Directly in the code",
      "In the database",
      "In environment variables (.env file)",
      "In JavaScript files",
    ],
    answer: [2],
  },
  {
    id: 11,
    kind: "single",
    points: 1,
    prompt:
      "What temperature setting is recommended for balanced creativity and consistency?",
    options: ["0.9", "0.5", "0.3", "0.7"],
    answer: [3],
  },
  {
    id: 12,
    kind: "single",
    points: 1,
    prompt: "Why is caching important for AI API calls?",
    options: [
      "To reduce costs and improve performance",
      "To improve security",
      "To comply with regulations",
      "To reduce database load",
    ],
    answer: [0],
  },
  {
    id: 13,
    kind: "single",
    points: 1,
    prompt:
      "What should be the cache duration for AI-generated content according to the example?",
    options: ["12 hours", "24 hours", "6 hours", "1 hour"],
    answer: [3],
  },
  {
    id: 14,
    kind: "single",
    points: 1,
    prompt: "What is a circuit breaker pattern used for in AI integrations?",
    options: [
      "To encrypt API communications",
      "To optimize database queries",
      "To manage user sessions",
      "To handle service failures and prevent cascading issues",
    ],
    answer: [3],
  },
  {
    id: 15,
    kind: "single",
    points: 1,
    prompt:
      "How many failures should trigger the circuit breaker according to the example?",
    options: ["10 failures", "5 failures", "3 failures", "15 failures"],
    answer: [1],
  },
  {
    id: 16,
    kind: "multiple",
    points: 1,
    prompt:
      "Which security measures should be implemented when sanitizing AI input? (Select all that apply)",
    options: [
      "Remove potentially sensitive information like credit cards",
      "Increase API timeout",
      "Strip HTML tags",
      "Limit input length to prevent abuse",
    ],
    answer: [0, 2, 3],
  },
  {
    id: 17,
    kind: "single",
    points: 1,
    prompt: "What is prompt injection in the context of AI security?",
    options: [
      "Malicious attempts to override AI instructions through user input",
      "Using invalid API credentials",
      "Sending too many requests to the API",
      "Exceeding rate limits",
    ],
    answer: [0],
  },
  {
    id: 18,
    kind: "single",
    points: 1,
    prompt:
      "Which testing approach is recommended for AI integrations due to variable responses?",
    options: [
      "Integration testing with live APIs",
      "Mock HTTP responses for consistent testing",
      "No testing needed",
      "Only manual testing",
    ],
    answer: [1],
  },
  {
    id: 19,
    kind: "single",
    points: 1,
    prompt:
      "What is the recommended approach for handling AI service failures?",
    options: [
      "Retry indefinitely",
      "Implement graceful degradation with fallback content",
      "Show error message and stop",
      "Ignore the failure",
    ],
    answer: [1],
  },
  {
    id: 20,
    kind: "single",
    points: 1,
    prompt:
      "According to the module what makes developers particularly valuable in the current market?",
    options: [
      "Focusing exclusively on frontend development",
      "Understanding both traditional web development and AI integration",
      "Specializing in database optimization",
      "Knowing only the latest AI technologies",
    ],
    answer: [1],
  },
] satisfies readonly AssessmentQuestion[];

export const moduleTwelveQuizTotalPoints = moduleTwelveQuizQuestions.reduce(
  (total, question) => total + question.points,
  0
);
