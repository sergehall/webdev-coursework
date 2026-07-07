import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule08TextTasks } from "./module08TextTasks";
import { cs79cModule08Quiz } from "./module08Quiz";

export const cs79cModule08Blueprint = {
  id: 8,
  title: "Elastic Beanstalk Service",
  weekLabel: "Week 7B",
  dateLabel: "March 30, 2026",
  overview:
    "In this module, we dive into AWS Elastic Beanstalk, a Platform as a Service tool that makes it much easier to deploy, manage, and scale web applications without getting buried in backend setup. Students get hands-on practice deploying a Node.js web application, updating the code, and managing the application environment through the AWS Management Console.",
  topicLine: "Scheduled topic: Elastic Beanstalk Service",
  focusAreas: [
    "Elastic Beanstalk architecture and core features",
    "Deploying and updating a Node.js web application",
    "Managing environments and cleanup operations",
  ],
  objectivesAligned: [
    "Describe the architectural approach used by AWS Elastic Beanstalk.",
    "Deploy and manage Elastic Beanstalk applications.",
  ],
  outcomeAlignment: [
    "Builds practical experience with managed deployment, environment operations, and AWS application delivery best practices.",
  ],
  syllabusContext: [
    "This module follows Lambda and gives a contrasting deployment model based on managed application environments rather than event-driven functions.",
    "It gives students a straightforward path for shipping a full web app while AWS manages most of the infrastructure details.",
  ],
  starterTasks: [
    "Complete the required reading on Elastic Beanstalk",
    "Take lecture notes on environment creation and deployment flow",
    "Prepare screenshots and notes for the Node.js deployment lab",
  ],
  artifacts: [
    "Elastic Beanstalk lab screenshots",
    "Environment management notes",
    "Quiz prep and deployment workflow notes",
  ],
  importantDates: ["Finals week begins: April 6, 2026"],
  assessmentContext: [
    "This module includes required reading, lecture with lab demos, a hands-on lab, and a quiz focused on Elastic Beanstalk deployment and environment management.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on Elastic Beanstalk.",
    },
    {
      step: "2",
      description: "Listen to the course lecture with lab demos.",
    },
    {
      step: "3",
      description: "Complete the lab.",
    },
    {
      step: "4",
      description: "Complete the Elastic Beanstalk quiz.",
    },
  ],
  readingHighlights: [
    "Developer Guide: AWSElastiBeanstalk-DeveloperGuide.pdf.",
    "Read pages 1–15.",
  ],
  textTasks: cs79cModule08TextTasks,
  quiz: cs79cModule08Quiz,
  milestone:
    "Complete Module 8 with Elastic Beanstalk deployment, environment management, and quiz readiness in place.",
} satisfies CS79CModuleBlueprint;
