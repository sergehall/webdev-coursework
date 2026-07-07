import type { CS79DModuleBlueprint } from "../types";

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
  textTasks: [
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
  ],
  quiz: {
    title: "Security Introduction",
    dueLabel: "Due April 24, 2026 at 11:59 pm — 15 min limit",
    questions: [
      {
        id: 1,
        question:
          "Which of the following is the name of the security model employed by AWS with its customers?",
        options: [
          "The shared responsibility model",
          "The shared secret model",
          "The shared secret key model",
          "The secret key responsibility model",
        ],
      },
      {
        id: 2,
        question:
          "Which is an operational process performed by AWS for data security? (Select All That Apply)",
        options: [
          "Background virus scans of Amazon EBS volumes and snapshots",
          "EC2 Operating Systems patching and updating",
          "Decommissioning of storage devices using industry-standard practices",
          "Replication of data across multiple AWS AZs",
        ],
        multiple: true,
      },
      {
        id: 3,
        question:
          "As a Solutions Architect, how should you architect systems on AWS?",
        options: [
          "You should architect for least cost.",
          "You should architect your AWS usage to take advantage of Amazon S3's durability.",
          "You should architect your AWS usage to take advantage of multiple regions and Availability Zones.",
          "You should architect with Amazon EC2 Auto Scaling to ensure capacity is available when needed.",
        ],
      },
      {
        id: 4,
        question:
          "For which type of services will AWS handle basic security tasks like guest OS patching, firewall configuration, and disaster recovery?",
        options: [
          "managed services",
          "super services",
          "serverfull services",
          "unmanaged services",
        ],
      },
      {
        id: 5,
        question:
          "AWS will secure the guest operating system on all EC2 instances.",
        options: ["True", "False"],
      },
      {
        id: 6,
        question:
          "Which of the programs below are part of the AWS Compliance Program to help meet industry-specific standards? (Select 3)",
        options: ["PCI DSS Level 1", "TPC 9112", "HIPPA", "ISO 9001"],
        multiple: true,
      },
      {
        id: 7,
        question: "AWS data centers exact locations are well known.",
        options: ["True", "False"],
      },
      {
        id: 8,
        question:
          "AWS data center facilities use which of the following security measures. (Select all that apply)",
        options: [
          "gaseous sprinkler systems",
          "Uninterruptible Power Supply (UPS)",
          "professional security staff",
          "video surveillance",
        ],
        multiple: true,
      },
      {
        id: 9,
        question:
          "Which technique does AWS use to decommission their storage devices?",
        options: ["NIST 800-88", "DEFCON 811-09", "NIST 811-99", "SANS 800-88"],
      },
      {
        id: 10,
        question:
          "AWS Core applications are deployed in an __________ configuration.",
        options: ["N+2", "N+1", "M", "N"],
      },
      {
        id: 11,
        question:
          "AWS provides you with the flexibility to place instances and store data within multiple geographic regions as well as across multiple availability zones within each region.",
        options: ["True", "False"],
      },
      {
        id: 12,
        question:
          "The AWS Service Health Dashboard is available and maintained to alert customers of AWS infrastructure issues.",
        options: ["True", "False"],
      },
      {
        id: 13,
        question:
          "AWS GovCloud (US) region is available to the general public.",
        options: ["True", "False"],
      },
      {
        id: 14,
        question:
          "Distributing your applications and services across multiple availability zones provides the ability to remain resilient in the face of most failure scenarios.",
        options: ["True", "False"],
      },
      {
        id: 15,
        question:
          "AWS monitoring tools are designed to detect unusual or unauthorized activities and conditions at _______ and _________ communication points.",
        options: ["tcp, udp", "client, server", "ingress, egress", "22, 80"],
      },
      {
        id: 16,
        question:
          "AWS data center infrastructure is built on Linux technology.",
        options: ["True", "False"],
      },
      {
        id: 17,
        question:
          "To help ensure that only authorized users and processes access your AWS Account and resources, AWS uses several types of credentials for authentication. (Select all that Apply)",
        options: ["Access Key", "Finger Prints", "Key Pair", "Password"],
        multiple: true,
      },
      {
        id: 18,
        question: "AWS is able to retrieve customers lost passwords.",
        options: ["True", "False"],
      },
      {
        id: 19,
        question:
          "It's is good security practice to allow AWS IAM users ___________",
        options: [
          "no permissions",
          "maximum permissions",
          "minimum permissions",
          "root permissions",
        ],
      },
      {
        id: 20,
        question: "What is crucial to a security investigation?",
        options: ["firewall", "logs", "versions", "ports"],
      },
      {
        id: 21,
        question:
          "The CIA Model stands for Confidentiality, Integrity, Access?",
        options: ["True", "False"],
      },
      {
        id: 22,
        question:
          "Fingerprints are a form of Authorization in the AAA security model.",
        options: ["True", "False"],
      },
      {
        id: 23,
        question: "Which AWS Service is used for recording account activity?",
        options: ["AWS Config", "EC2", "CloudTrail", "S3"],
      },
      {
        id: 24,
        question:
          "AWS is responsible for the security of user application in their infrastructure.",
        options: ["True", "False"],
      },
      {
        id: 25,
        question:
          "If your AWS EC2 instance is hacked, it is Amazon Web Services fault.",
        options: ["True", "False"],
      },
      {
        id: 26,
        question:
          "If your AWS Web App is hacked, AWS will recover all compromised data and restore services configuration.",
        options: ["True", "False"],
      },
    ],
    answers: [
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 1,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 2,
        correctAnswer: [2, 3],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 3,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 4,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 5,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 6,
        correctAnswer: [0, 2, 3],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 7,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 8,
        correctAnswer: [0, 1, 2, 3],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 9,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 10,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 11,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 12,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 13,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 14,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 15,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 16,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 17,
        correctAnswer: [0, 2, 3],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 18,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 19,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 20,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 21,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 22,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 23,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 24,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 25,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule1SecurityIntroductionQuiz",
        questionId: 26,
        correctAnswer: [1],
      },
    ],
  },
} satisfies CS79DModuleBlueprint;
