import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule06Quiz = {
  title: "SNS SQS and API Gateway",
  questions: [
    {
      id: 1,
      question:
        "Which architecture style allows independent scaling of services such as catalog, payments, or inventory without redeploying the whole app?",
      options: [
        "Single-tenant VM",
        "Distributed microservices",
        "Tightly coupled layered",
        "Monolithic",
      ],
    },
    {
      id: 2,
      question:
        "Which communication pattern is best when the caller must wait for an immediate result (e.g., get order total)?",
      options: [
        "Synchronous request/response",
        "Batch file transfer",
        "Asynchronous event",
        "Pub/Sub broadcast",
      ],
    },
    {
      id: 3,
      question:
        "Which SQS feature prevents other consumers from receiving a message while it is being processed?",
      options: [
        "Deduplication ID",
        "Redrive policy",
        "Visibility timeout",
        "Delivery delay",
      ],
    },
    {
      id: 4,
      question:
        "You have duplicate tolerant, high volume tasks (image resizing). Which SQS queue type is the most cost-effective and scalable fit?",
      options: [
        "FIFO queue",
        "Priority queue",
        "Standard queue",
        "Dead-letter queue",
      ],
    },
    {
      id: 5,
      question:
        "You need one message to notify many targets (HTTP webhook, email, Lambda, and SQS). Which service/pattern fits best?",
      options: [
        "SNS topic with multiple subscription protocols",
        "SQS with multiple consumers on same message",
        "EventBridge only",
        "Direct calls to each microservice",
      ],
    },
    {
      id: 6,
      question:
        "An e-commerce app publishes 'OrderPlaced' to SNS, which fans out to multiple SQS queues for independent services. What resilience benefit does this provide?",
      options: [
        "Failures in one consumer don't block others",
        "Eliminates the need for monitoring",
        "Strong consistency across services",
        "All services share a single retry counter",
      ],
    },
    {
      id: 7,
      question:
        "Which API Gateway type is positioned for enterprise features like request validation and advanced auth?",
      options: ["WebSocket API", "Edge-optimized API", "REST API", "HTTP API"],
    },
    {
      id: 8,
      question:
        "Which API Gateway type enables real-time, bidirectional communication for chat or live dashboards?",
      options: ["WebSocket API", "gRPC API", "REST API", "HTTP API"],
    },
    {
      id: 9,
      question:
        "True or False: API Gateway can transform requests and responses (e.g., XML/JSON) and manipulate headers without changing backend code.",
      options: ["False", "True"],
    },
    {
      id: 10,
      question:
        "Your startup offers free and premium API tiers. Which API Gateway capability lets you enforce different request limits per client?",
      options: [
        "Mock integrations",
        "Usage plans only for REST APIs",
        "Edge-optimized endpoints",
        "Rate limiting throttling with per-key quotas and bursts",
      ],
    },
    {
      id: 11,
      question:
        "Enabling API Gateway caching primarily benefits which outcomes?",
      options: [
        "Guaranteed ordering",
        "Automatic DB failover",
        "Stronger encryption and auth",
        "Lower latency and reduced backend load/costs",
      ],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 1,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 2,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 3,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 4,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 6,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 7,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 8,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 9,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 10,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
      questionId: 11,
      correctAnswer: [3],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
