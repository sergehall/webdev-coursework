import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule01TextTasks } from "./module01TextTasks";
import { cs79dModule01Quiz } from "./module01Quiz";

export const cs79dModule01Blueprint = {
  id: 1,
  title: "Introduction to AWS Security",
  weekLabel: "Week 1",
  dateLabel: "April 20–24, 2026",
  overview:
    "This opening module frames the AWS security landscape, introduces the Shared Responsibility Model, and gets every student set up in the AWS Learner Lab environment. Missing any Week 1 deadline means automatic drop from CS 79D.",
  topicLine: "Scheduled topic: Introduction to AWS Security",
  focusAreas: [
    "AWS Shared Responsibility Model",
    "AWS Management Console navigation",
    "AWS Learner Lab account setup",
    "Core security concepts in cloud environments",
    "AWS Academy platform orientation",
  ],
  objectivesAligned: [
    "Understand what AWS Security is and why it matters",
    "Distinguish customer vs. AWS responsibilities in the cloud",
    "Navigate the AWS Management Console confidently",
    "Set up and access an AWS Learner Lab account",
  ],
  outcomeAlignment: [
    "Apply the Shared Responsibility Model to real-world scenarios",
    "Demonstrate access to AWS Academy Learner Lab",
    "Identify core security services available in AWS",
  ],
  syllabusContext: [
    "Module 1 of 8 — sets the foundation for all security topics",
    "All deliverables due April 24, 2026",
    "Missing any deadline results in class drop",
    "Work submitted through SMC Canvas only — no email submissions",
  ],
  starterTasks: [
    "Post introduction in the Tell Us About You! discussion",
    "Accept AWS Academy invitation email",
    "Set up AWS Learner Lab account",
    "Log into AWS Management Console",
    "Review the course syllabus",
  ],
  artifacts: [
    "Discussion post: Tell Us About You!",
    "Screenshot of AWS Learner Lab access",
    "Screenshot of AWS Management Console login",
    "Written response on Shared Responsibility Model",
  ],
  importantDates: [
    "April 20 — Course begins",
    "April 24 — Tell Us About You! discussion (5 pts)",
    "April 24 — Assignment 1: AWS Learner Lab account (10 pts)",
    "April 24 — Assignment 1b: AWS Management Console (10 pts)",
    "April 24 — Assignment 1c: Shared Responsibility Model (10 pts)",
    "April 24 — Quiz: Security Introduction (26 pts)",
  ],
  assessmentContext: [
    "Tell Us About You! — 5 pts (discussion)",
    "Assignment 1 — 10 pts (Learner Lab setup)",
    "Assignment 1b — 10 pts (Management Console)",
    "Assignment 1c — 10 pts (Shared Responsibility Model)",
    "Quiz: Security Introduction — 26 pts",
    "Total Week 1 — 61 pts",
  ],
  milestone:
    "AWS Learner Lab access confirmed, all Week 1 deliverables submitted",
  textTasks: cs79dModule01TextTasks,
  quiz: cs79dModule01Quiz,
} satisfies CS79DModuleBlueprint;
