import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule07Quiz = {
  title: "Lambda",
  questions: [
    {
      id: 1,
      question:
        "Serverless applications are ones that don't require you to provision or manage any servers. You can focus on your core product and business logic instead of responsibilities like operating system (OS) access control, OS patching, provisioning, right-sizing, scaling, and availability.",
      options: ["True", "False"],
    },
    {
      id: 2,
      question: "Function as a Service is ... (Select 2)",
      options: [
        "a unmanaged environment",
        "container image",
        "Lambda",
        "event driven computing",
      ],
      multiple: true,
    },
    {
      id: 3,
      question:
        "Lambda supports the below programming languages ... (Select 3)",
      options: ["Go", "Node.js", "Python", "Fortran"],
      multiple: true,
    },
    {
      id: 4,
      question:
        "When a Lambda function is invoked, code execution begins at what is called the handler. The handler is a specific function (segment of code) that you’ve created and included in your code.",
      options: ["True", "False"],
    },
    {
      id: 5,
      question: "Select the Lambda event triggers (Select 3)",
      options: ["SNS", "S3", "API Gateway", "ECS"],
      multiple: true,
    },
    {
      id: 6,
      question:
        "Memory/RAM is the only server resource you have access to modify.",
      options: ["True", "False"],
    },
    {
      id: 7,
      question:
        "Modifying the memory/RAM directly affect the Lambda function run time.",
      options: ["True", "False"],
    },
    {
      id: 8,
      question: "CPU type can be directly changed for a given Lambda function.",
      options: ["True", "False"],
    },
    {
      id: 9,
      question: "Lambda function logs are collected by CloudLogs.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question: "There is a coding IDE directly in AWS Lambda web interface.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 1,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 2,
      correctAnswer: [2, 3],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 3,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 4,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 5,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 6,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 7,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 8,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 9,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule7LambdaQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
