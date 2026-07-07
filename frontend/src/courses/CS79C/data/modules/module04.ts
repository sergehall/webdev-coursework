import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule04Quiz } from "./module04Quiz";
import { cs79cModule04TextTasks } from "./module04TextTasks";

export const cs79cModule04Blueprint = {
  id: 4,
  title: "Auto Scaling & Elastic Load Balancer",
  weekLabel: "Week 4",
  dateLabel: "March 9, 2026",
  overview:
    "In this module, students work with Auto Scaling and Elastic Load Balancing, two core AWS services used to build highly available and scalable applications. These tools help applications respond to changing traffic by automatically adjusting instance count and distributing requests efficiently.",
  topicLine: "Scheduled topic: Auto Scaling & Elastic Load Balancer",
  focusAreas: [
    "Auto Scaling Groups and dynamic capacity changes",
    "Classic Load Balancer, Application Load Balancer, and Network Load Balancer",
    "Provisioning and testing scalable AWS infrastructure",
  ],
  objectivesAligned: [
    "Scale and load-balance cloud applications using AWS tools.",
    "Describe important design considerations for scalable cloud applications.",
  ],
  outcomeAlignment: [
    "Builds the scaling and availability skills needed to provision, configure, and test resilient AWS application infrastructure.",
  ],
  syllabusContext: [
    "This module focuses on AWS services that help applications remain available under varying traffic loads.",
    "Students move from single-instance deployment into elastic, traffic-distributed infrastructure design.",
  ],
  starterTasks: [
    "Complete the reading on Auto Scaling and Elastic Load Balancer",
    "Take notes from the lecture and lab demos",
    "Prepare configuration notes and screenshots for the console and CLI labs",
  ],
  artifacts: [
    "Auto Scaling and ELB setup notes",
    "Scalable infrastructure screenshots",
    "Quiz prep and lab validation notes",
  ],
  importantDates: ["Class 60% day: March 20, 2026"],
  assessmentContext: [
    "This module includes reading, lecture demos, class discussion, two labs, and a quiz focused on scalable AWS infrastructure.",
  ],
  moduleSummary: [
    {
      step: "1",
      description:
        "Complete required reading on AutoScale and Elastic Load Balancer.",
    },
    {
      step: "2",
      description: "Listen to the course lecture with lab demos.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description: "Complete Lab 1 and Lab 2.",
    },
    {
      step: "5",
      description: "Complete the quiz.",
    },
  ],
  readingHighlights: [
    "Developer Guide: AutoScale-DeveloperGuide.pdf",
    "Read pages 1–38.",
    "Classic Load Balancer",
    "Application Load Balancer",
    "Network Load Balancer",
  ],
  textTasks: cs79cModule04TextTasks,
  quiz: cs79cModule04Quiz,
  milestone:
    "Complete Module 4 with Auto Scaling and Elastic Load Balancer concepts, labs, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
