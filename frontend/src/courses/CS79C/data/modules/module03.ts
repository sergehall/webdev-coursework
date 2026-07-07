import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule03TextTasks } from "./module03TextTasks";
import { cs79cModule03Quiz } from "./module03Quiz";

export const cs79cModule03Blueprint = {
  id: 3,
  title: "EC2 Instructions",
  weekLabel: "Week 3",
  dateLabel: "March 2, 2026",
  overview:
    "This module focuses on Amazon Elastic Compute Cloud (EC2), giving students hands-on experience in launching, managing, and securing virtual machines on AWS. The main topics include Security Groups, Key Pairs, EC2 instance deployment, and AWS Command Line Interface operations.",
  topicLine: "Scheduled topic: EC2 Instructions",
  focusAreas: [
    "EC2 instance deployment and management",
    "Security Groups and Key Pairs",
    "AWS CLI operations for EC2 workflows",
  ],
  objectivesAligned: [
    "Deploy EC2 servers and work with various Amazon Machine Images.",
    "Navigate the AWS Management Console.",
  ],
  outcomeAlignment: [
    "Builds direct hands-on experience with launching, securing, and managing Amazon EC2 instances in AWS.",
  ],
  syllabusContext: [
    "This module turns AWS compute concepts into direct EC2 practice with deployment, access, and security controls.",
    "Students connect lecture demonstrations, reading, discussion, and labs into a full EC2 workflow.",
  ],
  starterTasks: [
    "Complete the EC2 reading on instances, Security Groups, and Key Pairs",
    "Take notes from the course lectures and lab demos",
    "Prepare screenshots and notes for EC2 Console and EC2 CLI labs",
  ],
  artifacts: [
    "EC2 launch and access notes",
    "Security Group and Key Pair setup evidence",
    "Lab screenshots and quiz prep notes",
  ],
  importantDates: ['Last day to withdraw without a "W": March 4, 2026'],
  assessmentContext: [
    "This module includes lecture demos, class discussion, two EC2 labs, and an AWS EC2 quiz.",
  ],
  moduleSummary: [
    {
      step: "1",
      description:
        "Complete required reading on EC2, Security Groups, and Key Pairs.",
    },
    {
      step: "2",
      description: "Listen to course lectures with lab demos.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description:
        "Complete Lab 1: EC2 Console (LAMP Stack) and Lab 2: EC2 CLI.",
    },
    {
      step: "5",
      description: "Complete the AWS EC2 quiz.",
    },
  ],
  readingHighlights: ["EC2 Developer Guide: EC2 Linux Instance."],
  textTasks: cs79cModule03TextTasks,
  quiz: cs79cModule03Quiz,
  milestone:
    "Complete Module 3 with EC2 deployment, security, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
