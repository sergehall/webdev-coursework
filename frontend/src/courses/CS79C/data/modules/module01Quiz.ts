import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule01Quiz = {
  title: "Module 1 Compute Introduction Quiz",
  questions: [
    {
      id: 1,
      question:
        "Cloud computing is the on-demand delivery of computing, database storage, applications and other IT resources through a cloud service platform via the Internet as a Pay as you go service.",
      options: ["True", "False"],
    },
    {
      id: 2,
      question:
        "What are the main benefits of Cloud Computing? (Select All That Apply)",
      options: [
        "Increase Speed and Agility",
        "Reduced Infrastructure Cost",
        "No Need to Guess Capacity",
        "No Upfront Cost",
        "Increase Physical Access to Servers",
      ],
      multiple: true,
    },
    {
      id: 3,
      question:
        "A ______ is a physical location in the world where we have multiple AZs.",
      options: ["City", "Area", "Country", "Region"],
    },
    {
      id: 4,
      question:
        "_________ consist of one or more discrete data centers, each with redundant power, networking, and connectivity, housed in separate facilities.",
      options: ["Data Center", "Availability Zone", "Warehouse", "DMZ"],
    },
    {
      id: 5,
      question: "Amazon Web Services is only located in the United States.",
      options: ["True", "False"],
    },
    {
      id: 6,
      question:
        "What is the best practice for Availability Zones within a region?",
      options: [
        "Use Multi AZ architecture to distribute resources",
        "Rotate AZs monthly to save cost",
        "Deploy everything in a single AZ to simplify operations",
        "Use one AZ for production and ignore failover",
      ],
    },
    {
      id: 7,
      question:
        "What is the primary reason to place workloads in a region close to end users?",
      options: [
        "Increase storage durability",
        "Lower EBS prices in all cases",
        "Reduce latency",
        "Avoid shared responsibility",
      ],
    },
    {
      id: 8,
      question: "What does the region code us-east-1 correspond to?",
      options: [
        "US East Ohio",
        "US West N California",
        "US West Oregon",
        "US East N Virginia",
      ],
    },
    {
      id: 9,
      question:
        "Your business requires near zero downtime during regional failures. Which disaster recovery strategy best fits this need?",
      options: [
        "Warm standby",
        "Backup and restore only",
        "Hot standby multi region",
        "Pilot light",
      ],
    },
    {
      id: 10,
      question:
        "Which tagging practice enables answering, How much did project X cost last month?",
      options: [
        "Avoid tags to reduce overhead",
        "Tag only EC2 and ignore other services",
        "Tag resources by project environment and department",
        "Use default names without tags",
      ],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 1,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 2,
      correctAnswer: [0, 1, 2, 3],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 3,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 4,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 5,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 6,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 7,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 8,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 9,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule1ComputeIntroductionQuiz",
      questionId: 10,
      correctAnswer: [2],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
