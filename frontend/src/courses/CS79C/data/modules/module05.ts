import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule05Quiz } from "./module05Quiz";
import { cs79cModule05TextTasks } from "./module05TextTasks";

export const cs79cModule05Blueprint = {
  id: 5,
  title: "Containers, Kubernetes & Amazon EKS",
  weekLabel: "Week 5",
  dateLabel: "March 16, 2026",
  overview:
    "This module dives into Containers, Kubernetes, and Amazon Elastic Kubernetes Service (EKS), giving students a solid understanding of how to manage containerized applications at scale. It introduces Kubernetes as an open-source system for deploying, scaling, and managing containers and builds hands-on experience with Amazon EKS clusters and workloads.",
  topicLine: "Scheduled topic: Containers, Kubernetes & Amazon EKS",
  focusAreas: [
    "Containers and Kubernetes fundamentals",
    "Amazon EKS cluster and workload deployment",
    "Cloud automation for containerized applications",
  ],
  objectivesAligned: [
    "Describe the architectural approach used by AWS.",
    "Describe important design considerations for scalable cloud applications.",
  ],
  outcomeAlignment: [
    "Builds hands-on skill with container orchestration, scalable workloads, and Amazon EKS automation practices.",
  ],
  syllabusContext: [
    "This module introduces the concepts and tools needed to run containerized applications reliably across environments.",
    "It moves the course from basic compute and scaling into managed orchestration with Kubernetes and Amazon EKS.",
  ],
  starterTasks: [
    "Complete the required reading on Kubernetes and Amazon EKS",
    "Take notes from the lecture and lab demos",
    "Prepare screenshots and notes for cluster setup and workload deployment",
  ],
  artifacts: [
    "Kubernetes and EKS setup notes",
    "Cluster deployment screenshots",
    "Quiz prep and workload validation notes",
  ],
  importantDates: ["Guaranteed W withdrawal deadline: March 28, 2026"],
  assessmentContext: [
    "This module includes reading, lecture demos, class discussion, a Kubernetes and EKS lab, and a quiz.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on Kubernetes and Amazon EKS.",
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
      description: "Complete the lab: Learn Kubernetes Basics and Amazon EKS.",
    },
    {
      step: "5",
      description: "Complete the Kubernetes and Amazon EKS quiz.",
    },
  ],
  textTasks: cs79cModule05TextTasks,
  quiz: cs79cModule05Quiz,
  milestone:
    "Complete Module 5 with Kubernetes and Amazon EKS foundations, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
