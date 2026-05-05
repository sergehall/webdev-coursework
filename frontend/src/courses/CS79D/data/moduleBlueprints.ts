import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export type CS79DModuleBlueprint = {
  id: number;
  title: string;
  weekLabel: string;
  dateLabel: string;
  overview: string;
  topicLine: string;
  focusAreas: string[];
  objectivesAligned: string[];
  outcomeAlignment: string[];
  syllabusContext: string[];
  starterTasks: string[];
  artifacts: string[];
  importantDates: string[];
  assessmentContext: string[];
  milestone: string;
  isFinalProject?: boolean;
  moduleSummary?: Array<{
    step: string;
    description: string;
  }>;
  readingHighlights?: string[];
  serviceHighlights?: Array<{
    service: string;
    pages: string;
    notes: string;
  }>;
  overviewScreenshots?: Array<{
    src: string;
    alt: string;
  }>;
  textTasks?: Array<{
    id: string;
    title: string;
    objective?: string;
    tasks?: string[];
    submissionInstructions?: string[];
    whyItMattersHeading?: string;
    whyItMatters?: string;
    resourceSections?: Array<{
      title: string;
      items: string[];
    }>;
    previewFiles?: Array<{
      fileUrl: string;
      filename: string;
      buttonLabel?: string;
    }>;
  }>;
  quiz?: {
    title: string;
    dueLabel?: string;
    questions: UIQuestion[];
    answers: CorrectAnswerDto[];
  };
};

export const cs79dCourseReference = {
  courseTitle: "CS 79D – Security in Amazon Web Services",
  sessionLabel: "Spring 2026 • 8-Week Session",
  instructor: "Koda Kol",
  instructorEmail: "kol_koda@smc.edu",
  officeHours: "Listed in syllabus or by appointment",
  phone: "310-434-8417",
  canvasUrl: "online.smc.edu",
  requiredReadings: [
    "AWS Documentation: https://docs.aws.amazon.com/",
    "AWS Whitepapers: https://aws.amazon.com/whitepapers/",
    "AWS Cloud Security: https://aws.amazon.com/security/",
    "Security Learning: https://aws.amazon.com/security/security-learning/",
  ],
  gradingBreakdown: [
    "Discussions — participation-based",
    "Assignments — weekly deliverables",
    "Quizzes — weekly assessments",
    "Final — stay tuned for announcement",
  ],
  importantSessionDates: [
    "Course starts: April 20, 2026",
    "Week 1 deadline: April 24, 2026",
    "Missing Week 1 = dropped from class",
  ],
} as const;

export const cs79dModuleBlueprints: CS79DModuleBlueprint[] = [
  {
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
          options: [
            "NIST 800-88",
            "DEFCON 811-09",
            "NIST 811-99",
            "SANS 800-88",
          ],
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
  },
  {
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
    quiz: {
      title: "Module 2 Shared Responsibility & AWS Config Quiz",
      dueLabel: "Due May 3, 2026 at 11:59 pm — 20 min limit",
      questions: [
        {
          id: 1,
          question:
            "AWS is responsible for the security of the EC2 instance operating system.",
          options: ["True", "False"],
        },
        {
          id: 2,
          question: "AWS is responsible for the security in the cloud.",
          options: ["True", "False"],
        },
        {
          id: 3,
          question:
            "AWS customers are responsible for protecting the CIA of their data.",
          options: ["True", "False"],
        },
        {
          id: 4,
          question:
            "Which of the below EC2 resources is it the customer responsibility to secure? (Select All That Apply)",
          options: [
            "BIOS",
            "Applications",
            "Operating System",
            "Data in Transit",
          ],
          multiple: true,
        },
        {
          id: 5,
          question:
            "AWS secure more resources for manage services (Elastic Beanstalk) vs unmanaged services (EC2).",
          options: ["True", "False"],
        },
        {
          id: 6,
          question:
            "AWS Config performs which of the following tasks ... (Select 2)",
          options: [
            "AWS EC2 Operating System Updates",
            "AWS Resource Inventory",
            "AWS Resource change history",
            "User Data access logs",
          ],
          multiple: true,
        },
        {
          id: 7,
          question:
            "AWS Config rule represents your desired configuration settings for specific AWS resources or for an entire AWS account.",
          options: ["True", "False"],
        },
        {
          id: 8,
          question: "AWS Configuration Items are stored in a .............",
          options: ["S3", "SANS", "NFS", "IAM"],
        },
        {
          id: 9,
          question:
            "A configuration snapshot is a collection of the configuration items for the supported resources that exist in your account.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "AWS Config also generates configuration items when the configuration of a resource",
          options: ["Periodically", "RDS", "Every 10 min", "Never"],
        },
        {
          id: 11,
          question:
            "AWS Config randomly evaluates your AWS resource configurations for desired settings based on the rules.",
          options: ["True", "False"],
        },
        {
          id: 12,
          question: "Each AWS Config rule runs a ______________ function.",
          options: [
            "elastic beanstalk",
            "function as a service",
            "lambda",
            "ec2 instance",
          ],
        },
        {
          id: 13,
          question: "SNS stands for",
          options: [
            "Simple Messaging Service",
            "Services Not Software",
            "Simple Notice Service",
            "Simple Notification Service",
          ],
        },
        {
          id: 14,
          question: "AWS Config is free?",
          options: ["True", "False"],
        },
        {
          id: 15,
          question:
            "AWS Config can be used to monitor your global AWS resources.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 1,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 2,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 3,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 4,
          correctAnswer: [1, 2, 3],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 6,
          correctAnswer: [1, 2],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 7,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 8,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 9,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 11,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 12,
          correctAnswer: [2],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 13,
          correctAnswer: [3],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 14,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
          questionId: 15,
          correctAnswer: [0],
        },
      ],
    },
    textTasks: [
      {
        id: "discussion-week2",
        title: "Discussion: Week 2",
        objective:
          "Reflect on cloud monitoring and the AWS Shared Responsibility Model in the context of real deployments.",
        tasks: [
          "1. Why is continuous monitoring important in cloud environments? Provide a scenario where proactive monitoring could prevent an outage. (Note: you have no control over AWS-side outages.)",
          "2. How does AWS Config support the customer's responsibilities within the Shared Responsibility Model?",
          "3. What types of risks can AWS Config help identify that might otherwise go unnoticed?",
          "4. When deploying an EC2-based web server, which security implementations are you responsible for?",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion board",
          "Due: May 3, 2026 at 11:59 pm",
          "8 points",
        ],
      },
      {
        id: "lab1-iam-accounts",
        title: "Lab 1: IAM Accounts",
        objective:
          "Configure IAM groups and users with administrative access, generate programmatic credentials, and validate IAM sign-in — using your main AWS live account.",
        tasks: [
          "1. Using root or an existing admin IAM user, open the IAM Console",
          "2. Create a User Group named AdminGroup with the AdministratorAccess policy attached",
          "3. Create IAM user kkol — enable 'User must create a new password at next sign-in', no permissions yet",
          "4. Add kkol to AdminGroup",
          "5. On kkol's Security credentials tab, create an Access Key (CLI use case) and download the .csv file",
          "6. Repeat steps 3–5 for yourself",
          "7. Locate the IAM sign-in URL from the .csv file and test your IAM login",
          "8. After logging in as the IAM user, verify administrative permissions are working",
        ],
        submissionInstructions: [
          "Screenshot: IAM User Groups page showing AdminGroup",
          "Screenshot: IAM Users list showing both created users",
          "File upload: .csv file containing access keys for kkol",
          "Due: May 3, 2026 at 11:59 pm — unlimited attempts, available Apr 27 – May 8",
          "15 points",
        ],
        whyItMatters:
          "This lab uses traditional IAM users for educational purposes. In real-world scenarios most organisations now use AWS IAM Identity Center (SSO) for better security and centralised access management.",
      },
      {
        id: "lab1b-mfa",
        title: "Lab 1b: MFA",
        objective:
          "Enable Multi-Factor Authentication on the AWS root account using a virtual MFA device on your mobile phone.",
        tasks: [
          "1. Sign in as the root user (IAM credentials will not work for this lab)",
          "2. In the top-right corner select your account name → Security credentials",
          "3. Locate the Multi-factor authentication (MFA) section",
          "4. Select 'Assign MFA device' → Virtual MFA device → Next",
          "5. Open your MFA app, scan the QR code (or enter the secret key manually)",
          "6. Enter two consecutive six-digit codes to complete registration",
          "7. Confirm MFA status shows as Enabled on the Security credentials page",
          "8. Sign out and sign back in as root — confirm MFA is required",
          "Reflection 1: Why is MFA especially important for the AWS root account?",
          "Reflection 2: Why should IAM users be used instead of the root user?",
        ],
        submissionInstructions: [
          "Screenshot: MFA app showing 'Amazon Web Services' with the six-digit pin visible",
          "Due: May 3, 2026 at 11:59 pm — unlimited attempts, available Apr 28 – May 8",
          "10 points",
        ],
        whyItMatters:
          "The root account has unrestricted access to every AWS resource and cannot be limited by IAM policies. Compromising it is effectively game over for the account. MFA is the single highest-impact control you can add in under five minutes.",
      },
    ],
  },
  {
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
    quiz: {
      title: "Identity Access Management",
      dueLabel:
        "May 10, 2026 at 11:59 pm — 10 min limit — unlimited attempts — available May 4–15, 2026",
      questions: [
        {
          id: 1,
          question:
            "Which of the following actions can be authorized by IAM? (Choose 2 answers)",
          options: [
            "Querying an Oracle database",
            "Adding a message to an Amazon Simple Queue Service (Amazon SQS) queue",
            "Installing ASP.NET on a Windows Server",
            "Launching an Amazon Linux EC2 instance",
          ],
          multiple: true,
        },
        {
          id: 2,
          question: "IAM stands for ___________________",
          options: [
            "Identity Access Management",
            "Internal Access Management",
            "ID Access Manager",
            "Identity Authorization Management",
          ],
        },
        {
          id: 3,
          question:
            "Your AWS account administrator left your company today. The administrator had access to the root user and a personal IAM administrator account. With these accounts, he generated other IAM accounts and keys. Which of the following should you do today to protect your AWS infrastructure? (Choose 4 answers)",
          options: [
            "Relaunch all Amazon EC2 instances with new roles.",
            "Rotate keys and change passwords for IAM accounts.",
            "Delete the administrator's personal IAM account.",
            "Change the password and add MFA to the root user.",
            "Delete all IAM accounts.",
            "Put an IP restriction on the root user.",
          ],
          multiple: true,
        },
        {
          id: 4,
          question:
            "Which of the following are based on temporary security tokens? (Choose 3 answers)",
          options: ["Root User", "Federation", "Amazon EC2 Roles", "MFA"],
          multiple: true,
        },
        {
          id: 5,
          question:
            "Your security team is very concerned about the vulnerability of the IAM administrator user accounts (the accounts used to configure all IAM features and accounts). What steps can be taken to lock down these accounts? (Choose 2 answers)",
          options: [
            "Add a CAPTCHA test to the accounts.",
            "Delete account",
            "Implement a password policy on the AWS account.",
            "Add multi-factor authentication (MFA) to the accounts.",
          ],
          multiple: true,
        },
        {
          id: 6,
          question: "What is the format of an IAM policy?",
          options: ["XML", "JSON", "CSV", "SQL"],
        },
        {
          id: 7,
          question:
            "You should use your AWS root account for everyday administrative tasks.",
          options: ["True", "False"],
        },
        {
          id: 8,
          question: "Roles can be used by AWS __________ .",
          options: ["Resources", "Rules", "Pointers", "Passwords"],
        },
        {
          id: 9,
          question: "Grant the most privileges to principles.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "Which of the following are part of IAM best practices? (Select 3)",
          options: [
            "Remove Unnecessary Credentials",
            "Configure a Strong Password Policy for Your Users",
            "Create Individual IAM Users",
            "Do not regularly rotate Credentials",
          ],
          multiple: true,
        },
      ],
      answers: [
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 1,
          correctAnswer: [1, 3],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 2,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 3,
          correctAnswer: [1, 2, 3, 4],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 4,
          correctAnswer: [1, 2, 3],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 5,
          correctAnswer: [2, 3],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 6,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 7,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 8,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 9,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule3IdentityAccessManagementQuiz",
          questionId: 10,
          correctAnswer: [0, 1, 2],
        },
      ],
    },
    textTasks: [
      {
        id: "discussion-week3",
        title: "Discussion: Week 3",
        objective:
          "Reflect on the AWS CLI, IAM best practices, and access key management in real-world cloud operations.",
        tasks: [
          "1. What are the benefits of using the AWS CLI over the AWS Management Console for managing resources?",
          "2. Why is it considered a best practice to avoid using the AWS root account for daily tasks?",
          "3. What are access keys, and when are they used?",
          "4. How can you address a user that does not have permission to run an AWS CLI command?",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion board",
          "Due: May 10, 2026 at 11:59 pm",
          "8 points",
        ],
      },
      {
        id: "assignment3-application-stack",
        title: "Assignment 3: Application Stack",
        objective:
          "Research, evaluate, and select an application stack suitable for deployment on an AWS EC2 instance. An application stack typically consists of an operating system, web server, application runtime, and database — such as a LAMP or LEMP stack.",
        tasks: [
          "Research application stacks suitable for EC2 deployment (e.g., LAMP, LEMP, or an AWS Marketplace solution)",
          "Decide whether to build and configure manually or launch from the AWS Marketplace",
          "Document the name and function of your chosen stack",
          "Describe the intended use case or purpose",
          "Collect links to all documentation or references used",
        ],
        submissionInstructions: [
          "Include: name of the application stack selected",
          "Include: a brief description of its function",
          "Include: the intended use case or purpose",
          "Include: whether the stack will be built manually or launched from AWS Marketplace",
          "Include: links to any documentation or references used",
          "Due: May 10, 2026 at 11:59 pm",
          "10 points — unlimited attempts, available May 4–15, 2026",
        ],
        resourceSections: [
          {
            title: "Reference Examples",
            items: [
              "osTicket on Nginx (Ubuntu 24.04): https://try.direct/blog/how-to-install-osticket-with-nginx-on-ubuntu-24-04",
              "LAMP Stack on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu",
              "LEMP Stack on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu",
            ],
          },
        ],
      },
      {
        id: "lab2-website-security",
        title: "Lab 2: Website Security Solution",
        objective:
          "Deploy an Nginx web server on an Ubuntu 22.04 EC2 instance, obtain a free SSL/TLS certificate via Certbot, and harden the server with HTTP security headers. Measure improvement using Mozilla Observatory.",
        tasks: [
          "Launch an EC2 instance (Ubuntu 22.04 recommended). Open Security Group ports 80 (HTTP) and 443 (HTTPS)",
          "Update packages and install Nginx: sudo apt update -y && sudo apt install nginx -y",
          "Allow Nginx and SSH through the firewall: sudo ufw allow 'Nginx Full' && sudo ufw allow 'OpenSSH' && sudo ufw enable — verify with sudo ufw status",
          "Create web directory: sudo mkdir -p /var/www/your_domain/html — set ownership: sudo chown -R $USER:$USER /var/www/your_domain/html — set permissions: sudo chmod -R 755 /var/www/your_domain",
          "Create /var/www/your_domain/html/index.html with a basic HTML page to confirm the site is working",
          "Create an Nginx server block at /etc/nginx/sites-available/your_domain listening on port 80 with root pointing to your html directory",
          "Enable the site: sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/ — remove the default: sudo rm /etc/nginx/sites-enabled/default",
          "Test and restart Nginx: sudo nginx -t && sudo systemctl restart nginx — verify the site loads on port 80",
          "Scan the site with Mozilla Observatory and take a screenshot of the initial score (likely F)",
          "Install Certbot: sudo apt install -y certbot python3-certbot-nginx",
          "Obtain SSL certificate and enable HTTPS redirect: sudo certbot --nginx --redirect -d your_domain — verify the site auto-redirects to HTTPS",
          "Add security headers inside the server { } block in /etc/nginx/sites-available/your_domain:",
          "  add_header Content-Security-Policy \"default-src 'self';\";",
          '  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
          "  ssl_protocols TLSv1.2 TLSv1.3;",
          '  add_header X-Content-Type-Options "nosniff";',
          "  add_header X-Frame-Options SAMEORIGIN always;",
          "Restart Nginx: sudo systemctl restart nginx — re-scan with Observatory and screenshot the improved score",
        ],
        submissionInstructions: [
          "Screenshot 1: Mozilla Observatory score BEFORE adding security headers",
          "Screenshot 2: Mozilla Observatory score AFTER adding security headers",
          "Due: May 10, 2026 at 11:59 pm",
          "20 points — unlimited attempts, available May 4–15, 2026",
        ],
        whyItMatters:
          "Use Ubuntu 22.04 to avoid command compatibility issues — the guides assume Ubuntu 22. If you choose Ubuntu 24 you may need to find workarounds for various issues that arise.",
        resourceSections: [
          {
            title: "Guides",
            items: [
              "Nginx install on Ubuntu 22.04: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04",
              "Nginx + Let's Encrypt on Ubuntu 22.04: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04",
            ],
          },
          {
            title: "Scanner",
            items: [
              "Mozilla Observatory: https://developer.mozilla.org/en-US/observatory",
            ],
          },
        ],
      },
      {
        id: "lab2b-part1-aws-cli",
        title: "Lab 2b: Part 1 - AWS CLI",
        objective:
          "Install and configure the AWS CLI on a Linux machine using IAM programmatic credentials. Verify connectivity by listing S3 buckets.",
        tasks: [
          "Verify installed components: python3 --version | pip --version | aws --version",
          "If pip is missing: sudo yum install python3-pip -y",
          "Install AWS CLI: pip3 install awscli — then verify: aws --version",
          "In IAM Console: create a new IAM user, enable Programmatic access, attach AdministratorAccess policy, save the Access Key ID and Secret Access Key",
          "Run: aws configure — enter Access Key ID, Secret Access Key, default region (e.g. us-east-1), and output format (json)",
          "Verify connectivity: aws s3 ls — confirm your S3 buckets appear in the output",
        ],
        submissionInstructions: [
          "Screenshot showing the aws s3 ls command and the resulting S3 bucket list in the terminal",
          "Due: May 10, 2026 at 11:59 pm",
          "20 points — unlimited attempts, available May 4–15, 2026",
        ],
        whyItMatters:
          "Using an Amazon Linux AMI is recommended — it includes Python and many CLI dependencies by default. The AWS CLI can also be installed on any Linux distribution or your local machine.",
      },
      {
        id: "lab2b-part2-iam-cli",
        title: "Lab 2b: Part 2 - IAM via CLI",
        objective:
          "Manage AWS IAM resources entirely through the CLI — create a group, attach a policy, create a user, set a password, and add the user to the group. No AWS Console allowed.",
        tasks: [
          "1. Create an IAM group named Admins",
          "2. Attach the AdministratorAccess managed policy to the Admins group",
          "3. Create an IAM user named Bob",
          "4. Set a console password for Bob with a required reset on first login",
          "5. Add Bob to the Admins group",
          "Use ChatGPT, Claude, or the AWS CLI documentation to look up the correct syntax for each command and understand what it does",
          "Reflection: How did AI tools or AWS documentation help you find the correct CLI syntax and understand what each command does?",
        ],
        submissionInstructions: [
          "One screenshot per step (5 total) — each must clearly show the command executed and its terminal output",
          "Brief written reflection on how AI tools or documentation assisted you",
          "Due: May 10, 2026 at 11:59 pm",
          "20 points — unlimited attempts, available May 4–15, 2026",
        ],
        whyItMatters:
          "This lab must be completed in a live AWS account — it is not supported in the AWS Academy Learner Lab. Complete Part 1 (AWS CLI configuration) before starting this lab.",
        resourceSections: [
          {
            title: "Resources",
            items: [
              "AWS CLI IAM reference: https://docs.aws.amazon.com/cli/latest/reference/iam/",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Data Protection and Encryption",
    weekLabel: "Week 4",
    dateLabel: "May 11–15, 2026",
    overview:
      "Encryption at rest and in transit is mandatory in any production AWS environment. This module covers AWS KMS, S3 encryption options, SSL/TLS configuration, and secrets management with AWS Secrets Manager.",
    topicLine:
      "Scheduled topic: Data Protection — KMS, S3, and Secrets Manager",
    focusAreas: [
      "AWS Key Management Service (KMS)",
      "S3 encryption — SSE-S3, SSE-KMS, SSE-C",
      "TLS/SSL for data in transit",
      "AWS Secrets Manager vs. Parameter Store",
      "Amazon Macie for sensitive data discovery",
    ],
    objectivesAligned: [
      "Create and manage encryption keys in AWS KMS",
      "Enable server-side encryption on S3 buckets",
      "Store and retrieve secrets securely using Secrets Manager",
      "Use Amazon Macie to detect sensitive data in S3",
    ],
    outcomeAlignment: [
      "Implement encryption-at-rest for S3 and other AWS services",
      "Protect secrets from exposure in code and config files",
      "Classify and protect sensitive data using AWS tooling",
    ],
    syllabusContext: [
      "Module 4 of 8 — data protection is a compliance and security requirement",
      "Directly tied to real-world regulatory frameworks (GDPR, HIPAA, PCI-DSS)",
    ],
    starterTasks: [
      "Create a customer-managed KMS key",
      "Enable SSE-KMS on an S3 bucket",
      "Store a database password in Secrets Manager",
      "Run a Macie scan on a sample S3 bucket",
    ],
    artifacts: [
      "Screenshot of KMS key creation",
      "Screenshot of S3 bucket encryption settings",
      "Secrets Manager secret confirmation",
    ],
    importantDates: ["Week 4 deliverables due: May 15, 2026"],
    assessmentContext: [
      "Discussion — encryption scenario analysis",
      "Lab assignment — KMS and S3 encryption",
      "Quiz: Data Protection",
    ],
    milestone: "Encryption at rest enabled across KMS, S3, and Secrets Manager",
  },
  {
    id: 5,
    title: "Monitoring, Logging, and Auditing",
    weekLabel: "Week 5",
    dateLabel: "May 18–22, 2026",
    overview:
      "You cannot secure what you cannot see. This module covers the AWS observability and audit stack — CloudTrail for API activity, CloudWatch for metrics and alarms, Config for configuration drift, and AWS Security Hub for centralised findings.",
    topicLine:
      "Scheduled topic: Monitoring and Auditing — CloudTrail, CloudWatch, Config",
    focusAreas: [
      "AWS CloudTrail — API activity logging",
      "Amazon CloudWatch — metrics, logs, and alarms",
      "AWS Config — configuration drift detection",
      "AWS Security Hub — centralised findings",
      "CloudTrail Insights for anomaly detection",
    ],
    objectivesAligned: [
      "Enable CloudTrail and analyse API activity logs",
      "Create CloudWatch alarms for security-relevant metrics",
      "Set up AWS Config rules for compliance checking",
      "Aggregate findings in AWS Security Hub",
    ],
    outcomeAlignment: [
      "Detect unauthorised API calls using CloudTrail",
      "Alert on security events in real time with CloudWatch",
      "Identify configuration drift and non-compliant resources",
    ],
    syllabusContext: [
      "Module 5 of 8 — monitoring ties all previous security controls together",
      "Logging is required for compliance and incident response",
    ],
    starterTasks: [
      "Enable CloudTrail for all regions",
      "Create a CloudWatch alarm for root account login",
      "Enable AWS Config with managed rules",
      "Enable Security Hub and review initial findings",
    ],
    artifacts: [
      "CloudTrail trail configuration screenshot",
      "CloudWatch alarm screenshot",
      "AWS Config compliance dashboard screenshot",
      "Security Hub findings summary",
    ],
    importantDates: ["Week 5 deliverables due: May 22, 2026"],
    assessmentContext: [
      "Discussion — monitoring strategy for a real scenario",
      "Lab assignment — CloudTrail and CloudWatch setup",
      "Quiz: Monitoring and Auditing",
    ],
    milestone:
      "CloudTrail, CloudWatch alarms, Config rules, and Security Hub active",
  },
  {
    id: 6,
    title: "Threat Detection and Incident Response",
    weekLabel: "Week 6",
    dateLabel: "May 25–29, 2026",
    overview:
      "With logging in place, this module focuses on active threat detection and structured incident response. Amazon GuardDuty, AWS Detective, and the AWS Incident Response framework are the core tools explored.",
    topicLine:
      "Scheduled topic: Threat Detection — GuardDuty, Detective, and IR",
    focusAreas: [
      "Amazon GuardDuty — intelligent threat detection",
      "AWS Detective — security investigations",
      "AWS Systems Manager — automated response",
      "AWS Incident Response framework",
      "Forensics and evidence collection in AWS",
    ],
    objectivesAligned: [
      "Enable GuardDuty and interpret threat findings",
      "Use AWS Detective to investigate a suspicious finding",
      "Build an automated response workflow with EventBridge and Lambda",
      "Apply the AWS Incident Response lifecycle",
    ],
    outcomeAlignment: [
      "Detect threats in real time using ML-powered GuardDuty",
      "Investigate and contain a simulated security incident",
      "Automate response actions to reduce manual effort",
    ],
    syllabusContext: [
      "Module 6 of 8 — detection and response bring the security loop to completion",
      "Builds on monitoring foundations from Module 5",
    ],
    starterTasks: [
      "Enable GuardDuty and review sample findings",
      "Use AWS Detective to trace a simulated finding",
      "Create an EventBridge rule to trigger on GuardDuty finding",
      "Document a basic incident response runbook",
    ],
    artifacts: [
      "GuardDuty findings screenshot",
      "Incident response runbook draft",
      "EventBridge rule configuration",
    ],
    importantDates: ["Week 6 deliverables due: May 29, 2026"],
    assessmentContext: [
      "Discussion — real-world cloud incident case study",
      "Lab assignment — GuardDuty and automated response",
      "Quiz: Threat Detection and Incident Response",
    ],
    milestone:
      "GuardDuty enabled, incident response runbook drafted, automated alert wired",
  },
  {
    id: 7,
    title: "Compliance and Governance",
    weekLabel: "Week 7",
    dateLabel: "June 1–5, 2026",
    overview:
      "Cloud security is inseparable from compliance. This module covers AWS Organizations, Service Control Policies (SCPs), AWS Artifact for compliance reports, and how to map AWS controls to frameworks like GDPR, HIPAA, and PCI-DSS.",
    topicLine: "Scheduled topic: Compliance, Governance, and AWS Organizations",
    focusAreas: [
      "AWS Organizations and SCPs",
      "AWS Artifact — compliance reports",
      "AWS Control Tower — landing zone governance",
      "Compliance mapping (GDPR, HIPAA, PCI-DSS, SOC 2)",
      "AWS Trusted Advisor security checks",
    ],
    objectivesAligned: [
      "Configure AWS Organizations with an SCP to restrict risky actions",
      "Access and interpret compliance reports in AWS Artifact",
      "Map AWS security controls to a regulatory framework",
      "Use Trusted Advisor to identify security gaps",
    ],
    outcomeAlignment: [
      "Implement governance guardrails across multi-account AWS environments",
      "Demonstrate how AWS supports industry compliance frameworks",
      "Produce a compliance control mapping for a given regulation",
    ],
    syllabusContext: [
      "Module 7 of 8 — governance ties together all previous security controls",
      "Real-world AWS roles often require compliance knowledge",
    ],
    starterTasks: [
      "Review AWS Artifact and download a SOC 2 report",
      "Explore AWS Trusted Advisor security recommendations",
      "Create a sample SCP in AWS Organizations",
      "Map three AWS services to a GDPR control",
    ],
    artifacts: [
      "SCP configuration screenshot",
      "Compliance mapping table (regulation → AWS control)",
      "Trusted Advisor security findings summary",
    ],
    importantDates: ["Week 7 deliverables due: June 5, 2026"],
    assessmentContext: [
      "Discussion — choosing the right compliance framework",
      "Lab assignment — SCP and AWS Artifact",
      "Quiz: Compliance and Governance",
    ],
    milestone:
      "SCP configured, compliance report reviewed, control mapping completed",
  },
  {
    id: 8,
    title: "Final Assessment and Course Review",
    weekLabel: "Week 8",
    dateLabel: "June 8–12, 2026",
    overview:
      "The final module consolidates everything covered in CS 79D. You will complete the course final exam and submit a capstone security summary that demonstrates understanding across all eight modules.",
    topicLine: "Final Assessment — AWS Security Course Capstone",
    isFinalProject: true,
    focusAreas: [
      "Shared Responsibility Model recap",
      "IAM, VPC, encryption, and monitoring integration",
      "Threat detection and incident response summary",
      "Compliance and governance principles",
      "End-to-end AWS security architecture review",
    ],
    objectivesAligned: [
      "Demonstrate mastery of AWS security concepts across all modules",
      "Produce a coherent AWS security architecture recommendation",
      "Complete the course final exam",
    ],
    outcomeAlignment: [
      "Apply all eight modules' learnings to a unified security scenario",
      "Articulate AWS security best practices to a non-technical audience",
    ],
    syllabusContext: [
      "Module 8 of 8 — final week",
      "Final exam details announced via Canvas",
      "Review all previous module artifacts before the final",
    ],
    starterTasks: [
      "Review all module notes and lab screenshots",
      "Prepare a one-page AWS security architecture summary",
      "Complete the final exam on SMC Canvas",
      "Submit all outstanding assignments",
    ],
    artifacts: [
      "Completed final exam",
      "AWS security architecture summary (one page)",
      "All module deliverables submitted",
    ],
    importantDates: [
      "Final week begins: June 8, 2026",
      "All outstanding work due by June 12, 2026",
    ],
    assessmentContext: [
      "Final exam — announced by instructor",
      "All prior assignments must be submitted",
      "Late submissions automatically deducted points per syllabus",
    ],
    milestone: "Final exam submitted, all eight modules completed",
  },
];
