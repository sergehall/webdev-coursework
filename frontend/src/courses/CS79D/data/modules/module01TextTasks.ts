import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule01TextTasks = [
  {
    id: "tell-us-about-you",
    title: "Discussion: Tell Us About You!",
    objective:
      "Introduce yourself to the class. The instructor recognises most of the roster and wants to hear where everyone is headed — academically, professionally, and personally.",
    tasks: [
      "Your current major / graduated major, job, or career status",
      "Your education or career goals for the next 1–3 years",
      "How do you feel about AI?",
      "What's the smallest change you've made that caused the biggest outcome?",
      "Optional: post your LinkedIn profile to connect with classmates",
    ],
    submissionInstructions: [
      "Submit through SMC Canvas discussion board",
      "Due: April 24, 2026",
      "5 points",
    ],
    whyItMatters:
      "This is often the last course before many students move on to their next journey. SMC recently received approval for a Cloud Computing Bachelor's degree starting Fall 2027 — this introduction helps the instructor connect faces to futures and builds a cohort that learns from each other throughout the term.",
  },
  {
    id: "assignment-1-learner-lab",
    title: "Assignment 1: Acquire an AWS Learner Lab Account",
    objective:
      "Accept the AWS Academy invitation and create your Learner Lab account — the sandbox used for every hands-on lab in this course.",
    tasks: [
      "Check your email for an invitation from AWS Academy (instructure.com)",
      "Click 'Get Started' in the invitation email",
      "If prompted, your username may show as 'none' — that is expected",
      "Click 'Create My Account'; use your email as login and create a new password (different from SMC Canvas)",
      "Select your timezone",
      "Enable at minimum the 2nd checkbox to agree to the Canvas Acceptable Use Policy and the AWS Learner Terms and Conditions",
      "Press Register to complete account creation",
      "If the steps are confusing, wait for the first virtual meeting before proceeding",
    ],
    submissionInstructions: [
      "Take a screenshot confirming your AWS Academy invitation is accepted and your account is active",
      "Submit through SMC Canvas",
      "Due: April 24, 2026 at 11:59 pm",
      "10 points — unlimited attempts, available Apr 20–26",
    ],
    whyItMatters:
      "Without an active AWS Academy Learner Lab account you cannot complete any hands-on work in this course. Getting it done in Week 1 means you are unblocked for every subsequent lab from Week 2 onward.",
    resourceSections: [
      {
        title: "AWS Academy Login",
        items: ["https://awsacademy.instructure.com/login/canvas"],
      },
    ],
  },
  {
    id: "assignment-1b-console",
    title: "Assignment 1b: AWS Management Console",
    objective:
      "Create an AWS Management Console account at aws.amazon.com. This account is separate from your AWS Academy Learner Lab account and is your direct AWS access point.",
    tasks: [
      "Go to https://aws.amazon.com/ and create an AWS account",
      "Skip this step if you already have an account from a previous AWS engagement",
      "Take a screenshot showing you have successfully accessed the AWS Management Console",
    ],
    submissionInstructions: [
      "Submit screenshot of your AWS Management Console through SMC Canvas",
      "Due: April 24, 2026 at 11:59 pm",
      "10 points — unlimited attempts, available Apr 20–26",
    ],
    whyItMatters:
      "The AWS Management Console is the primary interface for all AWS services. Having your own account (separate from the Learner Lab) gives you hands-on familiarity with the real AWS environment and is a practical credential for any cloud role.",
    resourceSections: [
      {
        title: "AWS Console",
        items: ["https://aws.amazon.com/"],
      },
    ],
  },
  {
    id: "assignment-1c-shared-responsibility",
    title: "Assignment 1c: Shared Responsibility Model",
    objective:
      "Apply the AWS Shared Responsibility Model to three real-world scenarios. For each scenario identify what AWS is responsible for, what you are responsible for, and one risk if responsibilities are misunderstood.",
    tasks: [
      "Scenario 1 — Amazon S3: an organisation stores sensitive PII, grades, and addresses with compliance requirements",
      "Scenario 2 — Amazon RDS: a production database supporting customer portals with sensitive records and transaction histories",
      "Scenario 3 — Multi-AZ Architecture: an application spread across multiple Availability Zones for fault tolerance",
      "For each scenario answer: (1) AWS responsibilities, (2) your responsibilities, (3) one risk if misunderstood",
    ],
    submissionInstructions: [
      "Submit written responses through SMC Canvas",
      "Due: April 24, 2026 at 11:59 pm",
      "10 points possible — unlimited attempts, available Apr 20–26",
    ],
    whyItMattersHeading: "Submitted Answers",
    whyItMatters:
      "Scenario 1 (S3): AWS secures the storage infrastructure and ensures durability. You control access permissions, encryption, and public exposure settings. Risk: sensitive data accidentally made public, causing a breach. — Scenario 2 (RDS): AWS manages hardware, system updates, and backups. You manage security groups, access controls, and credentials. Risk: unauthorised users gain access to critical business data. — Scenario 3 (Multi-AZ): AWS maintains the Availability Zones and underlying infrastructure reliability. You design for cross-AZ deployment, configure load balancing and failover. Risk: single-zone failure brings down the entire application. — Summary: AWS is responsible for security of the cloud; the customer is responsible for security in the cloud.",
    resourceSections: [
      {
        title: "Required Reading",
        items: [
          "AWS Shared Responsibility Model — https://aws.amazon.com/compliance/shared-responsibility-model/",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
