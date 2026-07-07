import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule09Blueprint = {
  id: 9,
  title: "CloudFormation",
  weekLabel: "Week 8",
  dateLabel: "April 6, 2026",
  overview:
    "This module wraps the AWS compute sequence with infrastructure as code using CloudFormation templates and repeatable stack-based provisioning.",
  topicLine: "Scheduled topic: CloudFormation",
  focusAreas: [
    "Infrastructure as code fundamentals",
    "CloudFormation stacks and templates",
    "Repeatable provisioning and environment consistency",
  ],
  objectivesAligned: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
  ],
  outcomeAlignment: [
    "Reinforces operational maturity by turning AWS setup into repeatable, documented infrastructure.",
  ],
  syllabusContext: [
    "CloudFormation is the final scheduled technical topic before the session ends.",
    "This module is a natural place to unify service knowledge from earlier weeks into repeatable AWS architecture.",
  ],
  starterTasks: [
    "Add starter template notes or YAML/JSON snippets",
    "Record stack creation or update observations",
    "Describe how CloudFormation supports reliable cloud operations",
  ],
  artifacts: ["Template notes", "Stack deployment log", "IaC reflection"],
  importantDates: ["Session ends: April 12, 2026"],
  assessmentContext: [
    "This module can directly strengthen a capstone or final exam review because it ties AWS services together as infrastructure.",
  ],
  milestone:
    "Translate manual AWS setup into repeatable infrastructure definitions.",
} satisfies CS79CModuleBlueprint;
