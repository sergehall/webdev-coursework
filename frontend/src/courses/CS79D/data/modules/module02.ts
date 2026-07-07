import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule02TextTasks } from "./module02TextTasks";
import { cs79dModule02Quiz } from "./module02Quiz";

export const cs79dModule02Blueprint = {
  id: 2,
  title: "Identity and Access Management",
  weekLabel: "Week 2",
  dateLabel: "April 27 – May 1, 2026",
  overview:
    "Deep dive into AWS IAM — the cornerstone of cloud security. This module covers users, groups, roles, policies, and the principle of least privilege. You will create and test IAM configurations directly in the Learner Lab.",
  topicLine: "Scheduled topic: Identity and Access Management (IAM)",
  focusAreas: [
    "IAM users, groups, and roles",
    "IAM policies — managed vs. inline",
    "Principle of least privilege",
    "Multi-Factor Authentication (MFA)",
    "IAM Access Analyzer",
  ],
  objectivesAligned: [
    "Create and manage IAM users, groups, and roles",
    "Write and evaluate IAM policies using the policy simulator",
    "Enable and enforce MFA for AWS accounts",
    "Analyse permissions with IAM Access Analyzer",
  ],
  outcomeAlignment: [
    "Implement least-privilege access controls in AWS",
    "Identify overly permissive policies and remediate them",
    "Configure role-based access for AWS services",
  ],
  syllabusContext: [
    "Module 2 of 8 — builds directly on Module 1 console familiarity",
    "IAM is foundational to every subsequent security topic",
    "Labs performed in AWS Learner Lab",
  ],
  starterTasks: [
    "Review AWS IAM documentation",
    "Create an IAM user with limited permissions",
    "Attach a managed policy and test access",
    "Enable MFA on the root account",
  ],
  artifacts: [
    "Screenshot of IAM user creation",
    "Screenshot of policy simulator results",
    "Screenshot of MFA device registration",
    "Written analysis of least-privilege applied",
  ],
  importantDates: [
    "May 3 — Discussion: Week 2 (8 pts)",
    "May 3 — Assignment 2: Website Security Assessment and Vulnerability Analysis (20 pts)",
    "May 3 — Lab 1: IAM Accounts (15 pts)",
    "May 3 — Lab 1b: MFA (10 pts)",
    "May 3 — Quiz: Module 2 Shared Responsibility & AWS Config Quiz (15 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 2 — 8 pts",
    "Assignment 2: Website Security Assessment and Vulnerability Analysis — 20 pts",
    "Lab 1: IAM Accounts — 15 pts",
    "Lab 1b: MFA — 10 pts",
    "Quiz: Module 2 Shared Responsibility & AWS Config Quiz — 15 pts",
    "Total Week 2 — 68 pts",
  ],
  milestone:
    "IAM accounts configured, MFA enabled, website security assessment submitted",
  quiz: cs79dModule02Quiz,
  textTasks: cs79dModule02TextTasks,
} satisfies CS79DModuleBlueprint;
