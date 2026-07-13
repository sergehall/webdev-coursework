import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule04Quiz } from "./module04Quiz";
import { cs79dModule04TextTasks } from "./module04TextTasks";

export const cs79dModule04Blueprint = {
  id: 4,
  title: "CloudWatch and CloudTrail Monitoring",
  weekLabel: "Week 4",
  dateLabel: "May 11–17, 2026",
  overview:
    "This module focuses on AWS monitoring and audit tools. You will set up a CloudWatch billing alarm to control costs, enable CloudTrail to track API activity across your account, and sit the Cloud Practitioner practice midterm exam.",
  topicLine:
    "Scheduled topic: CloudWatch, CloudTrail, and Cloud Practitioner Midterm",
  focusAreas: [
    "Amazon CloudWatch — metrics, alarms, and billing alerts",
    "AWS CloudTrail — API activity logging and audit trails",
    "Cost visibility and budget alerting",
    "Cloud Practitioner exam preparation",
  ],
  objectivesAligned: [
    "Create a CloudWatch billing alarm to prevent unexpected charges",
    "Enable CloudTrail and review API event history",
    "Understand the importance of audit trails in cloud environments",
    "Demonstrate Cloud Practitioner-level AWS knowledge",
  ],
  outcomeAlignment: [
    "Proactively monitor AWS spend with automated alerts",
    "Audit who did what and when across an AWS account",
    "Apply foundational cloud concepts in a timed exam setting",
  ],
  syllabusContext: [
    "Module 4 of 8 — monitoring and auditing underpin all security operations",
    "Midterm covers Cloud Practitioner material from Weeks 1–4",
    "All deliverables due May 17, 2026",
  ],
  starterTasks: [
    "Enable billing alerts in AWS account settings",
    "Create a CloudWatch billing alarm with SNS email notification",
    "Enable CloudTrail for all regions in your AWS account",
    "Review Cloud Practitioner practice questions",
  ],
  artifacts: [
    "Screenshot of CloudWatch billing alarm configuration",
    "Screenshot of CloudTrail trail and event history",
    "Midterm exam completion confirmation",
  ],
  importantDates: [
    "May 17 — Discussion: Week 4 (5 pts)",
    "May 17 — Lab 3: CloudWatch Billing Alarm (10 pts)",
    "May 17 — Lab 3b: CloudTrail (10 pts)",
    "May 17 — Quiz: Module 4 CloudTrail & CloudWatch (10 pts)",
    "May 17 — Midterm: Cloud Practitioner Practice Exam (67 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 4 — 5 pts",
    "Lab 3: CloudWatch Billing Alarm — 10 pts",
    "Lab 3b: CloudTrail — 10 pts",
    "Quiz: Module 4 CloudTrail & CloudWatch — 10 pts",
    "Midterm: Cloud Practitioner Practice Exam — 67 pts",
    "Total Week 4 — 102 pts",
  ],
  milestone:
    "CloudWatch billing alarm active, CloudTrail enabled, midterm submitted",
  textTasks: cs79dModule04TextTasks,
  quiz: cs79dModule04Quiz,
} satisfies CS79DModuleBlueprint;
