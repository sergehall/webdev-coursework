import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule03TextTasks } from "./module03TextTasks";
import { cs79dModule03Quiz } from "./module03Quiz";

export const cs79dModule03Blueprint = {
  id: 3,
  title: "Application Security and AWS CLI",
  weekLabel: "Week 3",
  dateLabel: "May 4–10, 2026",
  overview:
    "This module moves from the console to the command line. You will configure the AWS CLI, manage IAM resources programmatically, deploy an Nginx web server on EC2, and harden it with HTTPS and security headers. By the end of the week you will have a publicly accessible website scored by Mozilla Observatory.",
  topicLine:
    "Scheduled topic: Application Stack, Website Security, and AWS CLI",
  focusAreas: [
    "AWS CLI installation and configuration",
    "IAM management via command line",
    "Nginx web server deployment on EC2",
    "SSL/TLS with Let's Encrypt (Certbot)",
    "HTTP security headers — CSP, HSTS, X-Frame-Options",
    "Application stack selection and research",
  ],
  objectivesAligned: [
    "Install and configure the AWS CLI with IAM credentials",
    "Create IAM users and groups using CLI commands only",
    "Deploy and configure Nginx on Ubuntu 22.04 EC2",
    "Obtain and apply an SSL/TLS certificate via Certbot",
    "Add HTTP security headers to improve Mozilla Observatory score",
    "Research and select an appropriate application stack",
  ],
  outcomeAlignment: [
    "Manage AWS resources without the Management Console",
    "Secure a web server from an F grade to a passing score",
    "Apply least-privilege IAM controls via CLI",
  ],
  syllabusContext: [
    "Module 3 of 8 — builds on IAM fundamentals from Module 2",
    "CLI labs must be performed in a live AWS account, not the Learner Lab",
    "All deliverables due May 10, 2026",
  ],
  starterTasks: [
    "Verify Python, pip, and AWS CLI are installed",
    "Configure AWS CLI with IAM access keys",
    "Launch an Ubuntu 22.04 EC2 instance with ports 80 and 443 open",
    "Research and select your application stack",
  ],
  artifacts: [
    "Screenshot of aws s3 ls output via CLI",
    "Screenshots of each IAM CLI command and its output",
    "Mozilla Observatory score before and after hardening",
    "Written application stack proposal",
  ],
  importantDates: [
    "May 10 — Discussion: Week 3 (8 pts)",
    "May 10 — Assignment 3: Application Stack (10 pts)",
    "May 10 — Lab 2: Website Security Solution (20 pts)",
    "May 10 — Lab 2b: Part 1 - AWS CLI (20 pts)",
    "May 10 — Lab 2b: Part 2 - IAM via CLI (20 pts)",
    "May 10 — Quiz: Identity Access Management (10 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 3 — 8 pts",
    "Assignment 3: Application Stack — 10 pts",
    "Lab 2: Website Security Solution — 20 pts",
    "Lab 2b: Part 1 - AWS CLI — 20 pts",
    "Lab 2b: Part 2 - IAM via CLI — 20 pts",
    "Quiz: Identity Access Management — 10 pts",
    "Total Week 3 — 88 pts",
  ],
  milestone:
    "AWS CLI configured, IAM managed via CLI, Nginx website live with HTTPS and passing Observatory score",
  quiz: cs79dModule03Quiz,
  textTasks: cs79dModule03TextTasks,
} satisfies CS79DModuleBlueprint;
