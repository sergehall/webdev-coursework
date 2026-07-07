import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule05TextTasks } from "./module05TextTasks";
import { cs79dModule05Quiz } from "./module05Quiz";

export const cs79dModule05Blueprint = {
  id: 5,
  title: "Secure the OS, PiHole VPN, Inspector, and Trusted Advisor",
  weekLabel: "Week 5",
  dateLabel: "May 18-24, 2026",
  overview:
    "Week 5 is prepared around the Canvas deliverable list: a discussion, four hands-on Lab 4 sections, and the Inspector & Trusted Advisor quiz. The detailed writeups can be dropped into each block after the final notes, screenshots, and quiz data are ready.",
  topicLine:
    "Scheduled topic: Secure the OS, PiHole VPN, Amazon Inspector, and AWS Trusted Advisor",
  focusAreas: [
    "Operating system security hardening",
    "PiHole VPN deployment and network filtering",
    "Amazon Inspector vulnerability assessment",
    "AWS Trusted Advisor security recommendations",
    "Evidence collection for Canvas lab submissions",
  ],
  objectivesAligned: [
    "Document OS-level hardening steps and validation evidence",
    "Prepare VPN and DNS filtering notes for the PiHole lab",
    "Capture Inspector scan setup, findings, and remediation notes",
    "Summarize Trusted Advisor security checks and recommended actions",
  ],
  outcomeAlignment: [
    "Show practical host security configuration evidence",
    "Explain how network filtering and VPN access improve security posture",
    "Use AWS-native assessment tools to identify account and workload risks",
  ],
  syllabusContext: [
    "Module 5 of 8 — hands-on security validation and advisory checks",
    "All visible Canvas deliverables are due May 24, 2026",
    "This module is staged so final screenshots, prompts, and answers can be added incrementally",
  ],
  starterTasks: [
    "Add the Week 5 discussion prompt and final response",
    "Attach Secure the OS lab notes and screenshots",
    "Attach PiHole VPN lab notes and screenshots",
    "Attach Inspector lab findings and screenshots",
    "Attach Trusted Advisor findings and screenshots",
    "Add quiz questions and answers when available",
  ],
  artifacts: [
    "Discussion: Week 5 response",
    "Lab 4: Secure the OS evidence",
    "Lab 4b: PiHole VPN evidence",
    "Lab 4c: Inspector findings evidence",
    "Lab 4d: Trusted Advisor findings evidence",
    "Quiz: Inspector & Trusted Advisor question set",
  ],
  importantDates: [
    "May 24 — Discussion: Week 5 (5 pts)",
    "May 24 — Lab 4: Secure the OS (20 pts)",
    "May 24 — Lab 4b: PiHole VPN (20 pts)",
    "May 24 — Lab 4c: Inspector (20 pts)",
    "May 24 — Lab 4d: Trusted Advisor (20 pts)",
    "May 24 — Quiz: Inspector & Trusted Advisor (10 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 5 — 5 pts",
    "Lab 4: Secure the OS — 20 pts",
    "Lab 4b: PiHole VPN — 20 pts",
    "Lab 4c: Inspector — 20 pts",
    "Lab 4d: Trusted Advisor — 20 pts",
    "Quiz: Inspector & Trusted Advisor — 10 pts",
    "Total Week 5 — 95 pts",
  ],
  milestone:
    "All Week 5 blocks are staged for final Canvas content, screenshots, and quiz data",
  serviceHighlights: [
    {
      service: "Secure the OS",
      pages: "Host security",
      notes:
        "Prepared for OS hardening steps, configuration evidence, and final validation screenshots.",
    },
    {
      service: "PiHole VPN",
      pages: "Network filtering and remote access",
      notes:
        "Prepared for PiHole, VPN setup notes, DNS filtering evidence, and connectivity checks.",
    },
    {
      service: "Amazon Inspector",
      pages: "Vulnerability management",
      notes:
        "Prepared for scan configuration, findings screenshots, and remediation summary.",
    },
    {
      service: "AWS Trusted Advisor",
      pages: "Security recommendations",
      notes:
        "Prepared for security check results, advisory findings, and follow-up actions.",
    },
  ],
  textTasks: cs79dModule05TextTasks,
  quiz: cs79dModule05Quiz,
} satisfies CS79DModuleBlueprint;
