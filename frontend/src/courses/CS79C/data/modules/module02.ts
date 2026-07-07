import type { CS79CModuleBlueprint } from "../types";
import { cs79cModule02TextTasks } from "./module02TextTasks";
import { cs79cModule02Quiz } from "./module02Quiz";

export const cs79cModule02Blueprint = {
  id: 2,
  title: "AWS Storage Volumes",
  weekLabel: "Week 2",
  dateLabel: "February 23, 2026",
  overview:
    "Module 2 focuses on AWS storage solutions, including Amazon S3, Amazon EFS, and Amazon EBS. Students install and configure the AWS Command Line Interface to manage storage services, complete readings on RAID and AWS storage tools, participate in class discussion, listen to lecture demos, and complete hands-on labs plus a quiz.",
  topicLine: "Scheduled topic: AWS Storage Volumes",
  focusAreas: [
    "Amazon S3, Amazon EFS, and Amazon EBS storage workflows",
    "AWS CLI setup for cloud storage management",
    "Storage architecture and RAID-related reading",
  ],
  objectivesAligned: [
    "Describe the architectural approach used by AWS.",
    "Describe important design considerations for scalable cloud applications.",
  ],
  outcomeAlignment: [
    "Builds practical experience with AWS storage services that support later compute, deployment, and architecture decisions.",
  ],
  syllabusContext: [
    "This module introduces the core storage services that pair with AWS compute workflows throughout the course.",
    "Students are expected to connect lecture material, CLI setup, readings, lab work, and class discussion into one storage-focused module flow.",
  ],
  starterTasks: [
    "Install and configure the AWS Command Line Interface",
    "Read the assigned material on RAID, S3, EFS, and EBS",
    "Capture notes and screenshots from the storage labs and lecture demos",
  ],
  artifacts: [
    "AWS CLI setup confirmation",
    "Storage lab notes for S3 and EFS",
    "Quiz prep notes and discussion reflection",
  ],
  importantDates: ["Class census day: February 28, 2026"],
  assessmentContext: [
    "This module includes labs, Slack discussion participation, lecture demos, and a quiz to check storage-service understanding.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Install and configure the AWS Command Line Tool.",
    },
    {
      step: "2",
      description: "Complete required reading on RAID, S3, EFS, and EBS.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Job Post Assignment.",
    },
    {
      step: "4",
      description: "Listen to course lectures with lab demos.",
    },
    {
      step: "5",
      description: "Complete Lab 1 S3, Lab 2 EFS, and the quiz.",
    },
  ],
  textTasks: cs79cModule02TextTasks,
  quiz: cs79cModule02Quiz,
  milestone:
    "Complete Module 2 with AWS storage foundations, CLI setup, and hands-on lab evidence ready for the next module.",
} satisfies CS79CModuleBlueprint;
