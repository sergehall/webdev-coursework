import type { CS79CModuleBlueprint } from "../types";
import { cs79cModule07TextTasks } from "./module07TextTasks";
import { cs79cModule07Quiz } from "./module07Quiz";

export const cs79cModule07Blueprint = {
  id: 7,
  title: "AWS Lambda",
  weekLabel: "Week 7A",
  dateLabel: "March 30, 2026",
  overview:
    "This module covers AWS Lambda, a powerful tool for running code without managing servers. Lambda automatically scales and runs your code in response to events like API requests, file uploads, or database updates. In this module, you will explore Lambda through readings, video lectures, hands-on labs, class discussions, and a quiz so you can build a strong foundation for scalable, serverless applications.",
  topicLine: "Scheduled topic: AWS Lambda",
  focusAreas: [
    "Serverless execution with AWS Lambda",
    "Event-driven triggers and Lambda workflows",
    "Creating, deploying, and testing serverless functions",
  ],
  objectivesAligned: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
  ],
  outcomeAlignment: [
    "Builds a strong foundation for scalable serverless design and event-driven application architecture in AWS.",
  ],
  syllabusContext: [
    "This module introduces AWS Lambda as the core serverless execution model in the course.",
    "It moves the class from infrastructure-heavy deployments toward managed event-driven application patterns.",
  ],
  starterTasks: [
    "Complete the required reading on AWS Lambda",
    "Take lecture notes on Lambda triggers and serverless architecture",
    "Prepare screenshots and notes for the Lambda labs",
  ],
  artifacts: [
    "Lambda lab screenshots",
    "Function trigger notes",
    "Quiz prep and serverless workflow notes",
  ],
  importantDates: ["Pass/No Pass deadline: April 10, 2026"],
  assessmentContext: [
    "This module includes required reading, lecture, class discussion, Lambda labs, and a quiz focused on serverless application development.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on AWS Lambda.",
    },
    {
      step: "2",
      description: "Listen to the course lecture.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description:
        "Complete Lab 1: Hello Lambda and Lab 2: Lambda Read DynamoDB.",
    },
    {
      step: "5",
      description: "Complete AWS Lambda labs and quiz.",
    },
  ],
  readingHighlights: [
    "Serverless Architectures with AWS Lambda (Pages 1–24).",
    "Lambda Services Developer Guide (Pages 1–48).",
  ],
  textTasks: cs79cModule07TextTasks,
  quiz: cs79cModule07Quiz,
  milestone:
    "Complete Module 7 with AWS Lambda foundations, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
