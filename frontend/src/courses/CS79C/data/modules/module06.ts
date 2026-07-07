import type { CS79CModuleBlueprint } from "../types";
import { cs79cModule06TextTasks } from "./module06TextTasks";
import { cs79cModule06Quiz } from "./module06Quiz";

export const cs79cModule06Blueprint = {
  id: 6,
  title: "SNS, SQS, API Gateway",
  weekLabel: "Week 6",
  dateLabel: "March 23, 2026",
  overview:
    "This module covers foundational AWS architecture patterns and services for building scalable cloud applications. It contrasts monolithic and distributed architectures, explores tight versus loose coupling, and introduces synchronous, asynchronous, and event-driven communication models through Amazon SQS, Amazon SNS, and Amazon API Gateway.",
  topicLine: "Scheduled topic: SNS, SQS, API Gateway",
  focusAreas: [
    "Monolithic versus distributed architecture patterns",
    "Tight coupling, loose coupling, and communication models",
    "Amazon SQS, Amazon SNS, and Amazon API Gateway workflows",
  ],
  objectivesAligned: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
  ],
  outcomeAlignment: [
    "Builds architectural thinking around scalable messaging, decoupled services, and managed API entry points in AWS.",
  ],
  syllabusContext: [
    "This module shifts the course from compute orchestration into messaging, API design, and distributed application structure.",
    "It introduces the AWS services commonly used to decouple systems and move from tightly coupled applications toward more scalable event-driven workflows.",
  ],
  starterTasks: [
    "Complete the required reading on SQS, SNS, and API Gateway",
    "Capture lecture notes about architecture patterns and communication models",
    "Prepare screenshots and notes for the module lab and messaging workflows",
  ],
  artifacts: [
    "Architecture pattern notes",
    "Messaging workflow screenshots",
    "Quiz prep and service comparison notes",
  ],
  importantDates: ['Guaranteed "W" withdrawal deadline: March 28, 2026'],
  assessmentContext: [
    "This module includes required reading, lectures, a Slack discussion, a lab, and a quiz focused on scalable communication patterns and AWS messaging services.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on SQS, SNS, and API Gateway.",
    },
    {
      step: "2",
      description: "Listen to the course lectures.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description: "Complete the lab.",
    },
    {
      step: "5",
      description: "Complete the quiz.",
    },
  ],
  readingHighlights: [
    "SNS: Simple Notification Service (Pages 1–18).",
    "SQS: Simple Queue Service (Pages 1–21).",
    "API Gateway (Pages 1–13).",
  ],
  textTasks: cs79cModule06TextTasks,
  quiz: cs79cModule06Quiz,
  milestone:
    "Complete Module 6 with scalable messaging, API architecture, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
