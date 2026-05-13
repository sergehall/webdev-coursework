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
  midtermQuiz?: {
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
    textTasks: [
      {
        id: "discussion-week4",
        title: "Discussion: Week 4",
        objective:
          "Reflect on cloud monitoring best practices and the value of audit trails in AWS environments.",
        tasks: [
          "1. How does Amazon CloudWatch help organizations improve system reliability and response time compared to traditional on-premises monitoring tools?",
          "2. How can improper CloudWatch monitoring configurations impact system performance, costs, or security? Give an example of how you can utilize CloudWatch to save cost.",
          '3. Why is tracking "who did what and when" especially important in cloud-based systems?',
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion board",
          "Due: May 17, 2026 at 11:59 pm",
          "5 points",
        ],
      },
      {
        id: "lab3-cloudwatch-billing-alarm",
        title: "Lab 3: CloudWatch Billing Alarm",
        objective:
          "Set up a billing alarm using Amazon CloudWatch to monitor AWS charges. The alarm notifies you via email or text when estimated charges exceed a specified threshold — helping you track costs and avoid unexpected bills.",
        tasks: [
          "Note: Billing alerts require account-level billing permissions. IAM users may need billing access explicitly enabled by the root user. Keep the region set to US East (N. Virginia) throughout this lab.",
          "Task 1 — Enable Billing Alerts: Sign in to the AWS Management Console → navigate to Billing and Cost Management → Billing preferences → check 'Receive Billing Alerts' → Save preferences",
          "Task 2 — Create an SNS Topic: Navigate to Amazon SNS → Topics → Create topic → select Standard → enter a name (e.g. BillingAlarmTopic) → Create topic",
          "Task 3 — Subscribe to the SNS Topic: From the topic details page → Create subscription → Protocol: Email or SMS → enter your email or phone number → Create subscription → confirm the subscription link in your email (check spam if not received)",
          "Task 4 — Create a CloudWatch Billing Alarm: Navigate to CloudWatch → ensure region is US East (N. Virginia) → Alarms → Create alarm → Select metric → search for Billing → select Total Estimated Charge (USD) → Conditions: Greater than → threshold: 10 (USD) → Next → select BillingAlarmTopic for notifications → Next → name the alarm (e.g. BillingAlarm10USD) → review → Create alarm",
          "Task 5 — Verify the Alarm: Confirm the alarm appears in CloudWatch Alarms. The status may show INSUFFICIENT_DATA initially — this is expected, as billing metrics can take several hours to update. Verify the correct SNS topic is attached.",
        ],
        submissionInstructions: [
          "Screenshot: Billing preferences page with 'Receive Billing Alerts' checkbox enabled",
          "Due: May 17, 2026 at 11:59 pm",
          "10 points — unlimited attempts, available May 11–22, 2026",
        ],
        whyItMatters:
          "You are not required to exceed the billing threshold to complete this lab. The goal is to verify correct configuration, not to incur charges.",
      },
      {
        id: "lab3b-cloudtrail",
        title: "Lab 3b: CloudTrail",
        objective:
          "Create an AWS CloudTrail trail to record management activity across your AWS account. Configure it to log events from all regions, store logs in an S3 bucket, and verify that CloudTrail is actively recording events.",
        tasks: [
          "Task 1 — Open the CloudTrail Console: Sign in to the AWS Management Console and navigate to the CloudTrail console.",
          "Task 2 — Create a New Trail: In the left navigation pane select Trails → Create trail → enter a unique trail name (e.g. MyManagementTrail) → select 'Apply trail to all regions'",
          "Task 3 — Specify Storage Location: Under Storage location select 'Create new S3 bucket' → enter a globally unique bucket name (S3 bucket names must be globally unique)",
          "Task 4 — Configure Trail Settings: Leave encryption at default → ensure 'Enable log file validation' is checked → under Management events enable both Read events and Write events → leave exclusions unchecked → do not enable Data events, Insights, or Network activity events for this lab → optionally add tags",
          "Task 5 — Create the Trail: Review the configuration → click Create trail → confirm the trail status shows 'Logging'",
          "Task 6 — View Event History: In the CloudTrail console select Event history → review recently logged management events → if no events appear, perform an AWS action (e.g. create an S3 bucket) and refresh the page",
          "Note: Event history is region-specific and displays recent activity for the selected region. IAM users must have permissions for both CloudTrail and Amazon S3.",
        ],
        submissionInstructions: [
          "Screenshot 1: Trail configuration settings showing the trail is created",
          "Screenshot 2: Management events confirming Read and Write are being recorded",
          "Screenshot 3: CloudTrail Event history with events visible",
          "Due: May 17, 2026 at 11:59 pm",
          "10 points — unlimited attempts, available May 11–22, 2026",
        ],
        resourceSections: [
          {
            title: "Resources",
            items: [
              "Creating a trail with the CloudTrail console: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-console.html",
              "Logging management events with CloudTrail: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html",
              "AWS CloudTrail User Guide: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/",
            ],
          },
        ],
      },
    ],
    midtermQuiz: {
      title: "Cloud Practitioner Practice Exam",
      dueLabel: "Due May 17, 2026 at 11:59 pm — 65 min limit — Access code: cppe2026",
      questions: [
        {
          id: 1,
          question: "Which statement best defines an AWS region:",
          options: [
            "A region is a subset of AWS technologies. For example, the Compute region consists of EC2, ECS, Lambda, etc.",
            "A region is a collection of Edge Locations available in specific countries.",
            "A region is a geographical area divided into Availability Zones. Each region contains at least two Availability Zones.",
          ],
        },
        {
          id: 2,
          question:
            "Which of the following are a part of AWS' Network and Content Delivery services? (Choose 2)",
          options: ["VPC", "EC2", "RDS", "CloudFront"],
          multiple: true,
        },
        {
          id: 3,
          question: "An Availability Zone can be described as:",
          options: [
            "Restricted areas designed specifically for the creation of Virtual Private Clouds.",
            "Two zones containing compute resources that are designed to automatically maintain synchronized copies of each other's data.",
            "Distinct locations from within an AWS region that are engineered to be isolated from failures.",
            "A Content Distribution Network used to distribute content to users.",
          ],
        },
        {
          id: 4,
          question:
            "AWS will secure the guest operating system on all EC2 instances.",
          options: ["True", "False"],
        },
        {
          id: 5,
          question: "Select the compute services in AWS:",
          options: ["VPC", "EC2", "S3", "Lambda"],
          multiple: true,
        },
        {
          id: 6,
          question: "In which of the following is CloudFront content cached?",
          options: ["Region", "Data Center", "Availability Zone", "Edge Location"],
        },
        {
          id: 7,
          question: "Select the correct statement:",
          options: [
            "# of Regions > # of Availability Zones > # of Edge Locations",
            "# of Edge Locations > # of Availability Zones > # of Regions",
            "# of Availability Zones > # of Edge Locations > # of Regions",
            "# of Availability Zones > # of Regions > # of Edge Locations",
          ],
        },
        {
          id: 8,
          question:
            "AWS data center facilities use which of the following security measures. (Select all that apply)",
          options: [
            "professional security staff",
            "video surveillance",
            "gaseous sprinkler systems",
            "uninterruptible Power Supply (UPS)",
          ],
          multiple: true,
        },
        {
          id: 9,
          question:
            "AWS provides you with the flexibility to place instances and store data within multiple geographic regions as well as across multiple availability zones within each region.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question: "An AWS VPC is a component of which group of AWS core services?",
          options: [
            "Database Services",
            "Global Infrastructure",
            "Networking Services",
            "Compute Services",
          ],
        },
        {
          id: 11,
          question:
            "Which of the below are factors that have helped make public cloud so robust? (Choose 2)",
          options: [
            "Traditional methods that are used for on-premise infrastructure work just as well in cloud",
            "Not having to deal with the collateral damage of failed experiments",
            "The ability to try out new ideas and experiment without an upfront commitment",
            "No special skills required",
          ],
          multiple: true,
        },
        {
          id: 12,
          question:
            "To help ensure that only authorized users and processes access your AWS Account and resources, AWS uses several types of credentials for authentication. Select all that applies:",
          options: [
            "Access Key",
            "Biometric Authentication",
            "Password",
            "Key Pair",
          ],
          multiple: true,
        },
        {
          id: 13,
          question:
            "Infrastructure as a service will allow the provisioning of which of the following resources? (Pick 3)",
          options: [
            "compute resources",
            "human resources",
            "storage resources",
            "network resources",
          ],
          multiple: true,
        },
        {
          id: 14,
          question:
            "A new system admin started, and it is your job to give her administrator access to the AWS console. You provided the user name, an access key ID, a secret access key, and you have generated a password. The new admin is able to log in to the AWS console, but is unable to interact with any AWS services. What should you do next?",
          options: [
            "Require multi-factor authentication for her user account.",
            "Must login using the intranet",
            "Re-create the account",
            "Grant access to the Administrators' group.",
          ],
        },
        {
          id: 15,
          question: "Platform as a Service is an ideal model for:",
          options: [
            "configuring operating systems for web hosting",
            "business intelligence",
            "managing an organization's logical network",
            "running fully developed software for end-users",
          ],
        },
        {
          id: 16,
          question:
            "An advantage of Cloud Computing is increased speed and agility. This means:",
          options: [
            "the resources available to customers are available more quickly and with less effort to provision those resources.",
            "the cloud provider uses computers that are more aerodynamic, improving airflow and reducing power consumption.",
            "the cloud provider uses the fastest computers available all the time.",
            "the cloud provider uses the fastest available networking connectivity.",
          ],
        },
        {
          id: 17,
          question: "How many S3 buckets can I have per account by default?",
          options: ["50", "1000", "100", "10"],
        },
        {
          id: 18,
          question: "In what language are policy documents written?",
          options: ["Node.js", "JSON", "Java", "Python"],
        },
        {
          id: 19,
          question:
            "The increase in performance associated by adding system units to address demand is known as:",
          options: [
            "pay for what you use",
            "horizontal scaling",
            "cloudwatch notification",
            "vertical scaling",
          ],
        },
        {
          id: 20,
          question:
            'You are a solutions architect who works with a large digital media company. The company has decided that they want to operate within the Japanese region and they need a bucket called "testbucket" set up immediately to test their web application on. You log in to the AWS console and try to create this bucket in the Japanese region however you are told that the bucket name is already taken. What should you do to resolve this?',
          options: [
            'Bucket names are global, not regional. This is a popular bucket name and is already taken. You should choose another bucket name.',
            'Raise a ticket with AWS and ask them to release the name "testbucket" to you.',
            "Change your region to Korea and then create the bucket \"testbucket\".",
            "Run a WHOIS request on the bucket name and get the registered owners email address. Contact the owner and ask if you can purchase the rights to the bucket.",
          ],
        },
        {
          id: 21,
          question:
            "You have created a new AWS account for your company, and you have also configured multi-factor authentication on the root account. You are about to create your new users. What strategy should you consider in order to ensure that there is good security on this account.",
          options: [
            "Require users only to be able to log in using biometric authentication.",
            "Enact a strong password policy: user passwords must be changed every 45 days, with each password containing a combination of capital letters, lower case letters, numbers, and special symbols.",
            "Restrict login to the corporate network only.",
            "Give all users the same password so that if they forget their password they can just ask their co-workers.",
          ],
        },
        {
          id: 22,
          question:
            "What is an additional way to secure the AWS accounts of both the root account and new users alike?",
          options: [
            "Configure the AWS Console so that you can only log in to it from a specific IP Address range",
            "Configure the AWS Console so that you can only log in to it from your internal network IP address range.",
            "Store the access key id and secret access key of all users in a publicly accessible plain text document on S3 of which only you and members of your organization know the address.",
            "Implement Multi-Factor Authentication for all accounts.",
          ],
        },
        {
          id: 23,
          question:
            "You are a developer at a fast-growing startup. Until now, you have used the root account to log in to the AWS console. However, as you have taken on more staff, you will need to stop sharing the root account to prevent accidental damage to your AWS infrastructure. What should you do so that everyone can access the AWS resources they need to do their jobs? (Choose 2)",
          options: [
            'Create a customized sign-in link such as "yourcompany.signin.aws.amazon.com/console" for your new users to use to sign in with.',
            "Create an additional AWS root account for each new user.",
            "Give your users the root account credentials so that they can also sign in.",
            "Create individual user accounts with minimum necessary rights and tell the staff to log in to the console using the credentials provided.",
          ],
          multiple: true,
        },
        {
          id: 24,
          question:
            "You have a client who is considering a move to AWS. In establishing a new account, what is the first thing the company should do?",
          options: [
            "Set up an account via SQS (Simple Queue Service).",
            "Set up an account using Cloud Search.",
            "Set up an account via SNS (Simple Notification Service)",
            "Set up an account using their company email address.",
          ],
        },
        {
          id: 25,
          question:
            "A cloud service provider offering managed runtime, middleware, and operating systems for you to create your own apps is typically categorized as _______.",
          options: [
            "Computing-as-a-Service",
            "Platform-as-a-Service",
            "Software-as-a-Service",
            "Infrastructure-as-a-Service",
          ],
        },
        {
          id: 26,
          question:
            "Is it possible to perform actions on an existing Amazon EBS Snapshot?",
          options: [
            "EBS does not have snapshot functionality",
            "No",
            "It depends on the region.",
            "Yes, through the AWS APIs, CLI, and AWS Console.",
          ],
        },
        {
          id: 27,
          question:
            "If an Amazon EBS volume is an additional partition (not the root volume), can I detach it without stopping the instance?",
          options: [
            "No answer text provided.",
            "Yes, although it may take some time",
            "No answer text provided.",
            "No, you will need to stop the instance.",
          ],
        },
        {
          id: 28,
          question:
            "In an on-premise (non-cloud) solution, the difference between traditional hardware capacity and the actual demand is known as the _____.",
          options: [
            "capital expenditure",
            "predicted demand",
            "infrastructure cost",
            "opportunity cost",
          ],
        },
        {
          id: 29,
          question:
            "Amazon S3 standard is characterized by a durability level of 11 9's. What does this mean?",
          options: [
            "The service durability is 11.9% over a given year.",
            "The service durability is 99.999999999% over a given year.",
            "The service durability is 99.11% over a given year.",
            "The service durability is 99.99999999999% over a given year",
          ],
        },
        {
          id: 30,
          question:
            "In addition to choosing the correct EBS volume type for your specific task, what else can be done to increase the performance of your volume? (Choose 3)",
          options: [
            "Schedule snapshots of HDD based volumes for periods of low use",
            "Ensure that your EC2 instances are types that can be optimized for use with EBS",
            "Never use HDD volumes, always ensure that SSDs are used",
            "Stripe volumes together in a RAID 0 configuration.",
          ],
          multiple: true,
        },
        {
          id: 31,
          question:
            "Can I delete a snapshot of an EBS Volume that is used as the root device of a registered AMI?",
          options: [
            "Yes",
            "Only via the Command-Line",
            "No",
            "Only using the AWS API",
          ],
        },
        {
          id: 32,
          question:
            "I can use the AWS Console to add a role to an EC2 instance after that instance has been created and powered-up.",
          options: ["True", "False"],
        },
        {
          id: 33,
          question:
            "Which of the following provide the lowest cost EBS options? (Choose 2)",
          options: [
            "Cold (sc1)",
            "General Purpose (gp2)",
            "Provisioned IOPS (io1)",
            "Throughput Optimized (st1)",
          ],
          multiple: true,
        },
        {
          id: 34,
          question:
            "In order to enable encryption at rest using EC2 and Elastic Block Store, you must ________.",
          options: [
            "Configure encryption using X.509 certificates",
            "Configure encryption using the appropriate Operating Systems file system",
            "Mount the EBS volume in to S3 and then encrypt the bucket using a bucket policy.",
            "Configure encryption when creating the EBS volume",
          ],
        },
        {
          id: 35,
          question: "How does AWS isolate one customer's data from another?",
          options: [
            "AWS reserves servers, storage, and a dedicated network port for each customer and encrypts everything",
            "AWS allocates a physical server for each customer and isolates it securely",
            "AWS stores each customer's data on separate hard drives",
            "AWS runs different customer's data in a virtual private cloud.",
          ],
        },
        {
          id: 36,
          question:
            "To help you manage your Amazon EC2 instances, you can assign your own metadata in the form of ________.",
          options: ["Certificates", "Notes", "Tags", "IAM"],
        },
        {
          id: 37,
          question:
            "When creating a new security group, all inbound traffic is allowed by default.",
          options: ["True", "False"],
        },
        {
          id: 38,
          question:
            "What does the common term 'Serverless' mean according to AWS (Choose 2)",
          options: [
            "A marketing term for HaaS (Hosting as a Service).",
            "A native Cloud Architecture that allows customers to shift more operational responsibility to AWS.",
            "The ability to run applications and services without thinking about servers or capacity provisioning.",
            "A pricing model based on high level commodity measures such as on compute duration and storage capacity.",
          ],
          multiple: true,
        },
        {
          id: 39,
          question:
            "Distributing workloads across multiple Availability Zones supports which cloud architecture design principle?",
          options: [
            "Design for failure.",
            "Implement elasticity.",
            "Implement automation.",
            "Design for agility.",
          ],
        },
        {
          id: 40,
          question:
            "Which of the following Amazon EC2 pricing models allow customers to use existing server-bound software licenses?",
          options: [
            "Spot Instances",
            "Dedicated Hosts",
            "On-Demand Instances",
            "Reserved Instances",
          ],
        },
        {
          id: 41,
          question:
            "Which AWS characteristics make AWS cost effective for a workload with dynamic user demand? (Select TWO.)",
          options: [
            "Shared security model",
            "Pay-as-you-go pricing",
            "Reliability",
            "High availability",
            "Elasticity",
          ],
          multiple: true,
        },
        {
          id: 42,
          question:
            "Which service enables risk auditing by continuously monitoring and logging account activity, including user actions in the AWS Management Console and AWS SDKs?",
          options: ["AWS Config", "AWS Health", "Amazon CloudWatch", "AWS CloudTrail"],
        },
        {
          id: 43,
          question:
            "Which of the following AWS service allows you to run code without needing to set up a virtual server?",
          options: ["S3", "EC2", "Lambda", "DynamoDB"],
        },
        {
          id: 44,
          question:
            "Compared with costs in traditional and virtualized data centers, AWS has:",
          options: [
            "lower variable costs and lower upfront costs.",
            "greater variable costs and greater upfront costs.",
            "lower variable costs and greater upfront costs.",
            "fixed usage costs and lower upfront costs.",
          ],
        },
        {
          id: 45,
          question:
            "Which of the following security-related actions are available at no cost?",
          options: [
            "Accessing forums, blogs, and whitepapers",
            "Calling AWS Support",
            "Attending AWS classes at a local university",
            "Contacting AWS Professional Services to request a workshop",
          ],
        },
        {
          id: 46,
          question:
            "Which AWS feature will reduce the customer's total cost of ownership (TCO)?",
          options: [
            "Elastic computing",
            "Shared responsibility security model",
            "Single tenancy",
            "Encryption",
          ],
        },
        {
          id: 47,
          question:
            "Which of the following services will automatically scale with an expected increase in web traffic?",
          options: [
            "AWS CodePipeline",
            "AWS Direct Connect",
            "Elastic Load Balancing",
            "Amazon EBS",
          ],
        },
        {
          id: 48,
          question:
            "Under the AWS shared responsibility model, which of the following activities are the customer's responsibility? (Select TWO.)",
          options: [
            "Encrypting data on the client-side",
            "Configuring Network Access Control Lists (ACL)",
            "Maintaining environmental controls within a data center",
            "Patching operating system components for Amazon Relational Database Server (Amazon RDS)",
            "Training the data center staff",
          ],
          multiple: true,
        },
        {
          id: 49,
          question:
            "AWS supports which of the following methods to add security to Identity and Access Management (IAM) users? (Select TWO.)",
          options: [
            "Blocking access with Security Groups",
            "Enforcing password strength and expiration",
            "Using AWS Shield-protected resources",
            "Implementing Amazon Rekognition",
            "Using Multi-Factor Authentication (MFA)",
          ],
          multiple: true,
        },
        {
          id: 50,
          question:
            "Which AWS services should be used for read/write of constantly changing data? (Select TWO.)",
          options: [
            "Amazon Glacier",
            "Amazon RDS",
            "AWS Snowball",
            "Amazon Redshift",
            "Amazon EFS",
          ],
          multiple: true,
        },
        {
          id: 51,
          question:
            "A customer needs to run a MySQL database that easily scales. Which AWS service should they use?",
          options: [
            "Amazon Aurora",
            "Amazon DynamoDB",
            "Amazon Redshift",
            "Amazon ElastiCache",
          ],
        },
        {
          id: 52,
          question:
            "One of the advantages to moving infrastructure from an on-premises data center to the AWS Cloud is:",
          options: [
            "it allows the business to focus on business activities.",
            "it allows the business to leave servers unpatched.",
            "it allows the business to eliminate IT bills.",
            "it allows the business to put a server in each customer's data center.",
          ],
        },
        {
          id: 53,
          question:
            "Which AWS IAM feature allows developers to access AWS services through the AWS CLI?",
          options: ["SSH keys", "API keys", "User names/Passwords", "Access keys"],
        },
        {
          id: 54,
          question:
            "Which of the following is NOT the responsibility of AWS in terms of Security and Compliance?",
          options: [
            "Configuration of the Operating System running on EC2 instances",
            "Physical security of the data center",
            "Configuration of hypervisors",
            "Configuration of managed Services like S3 and DynamoDB",
          ],
        },
        {
          id: 55,
          question:
            "Which of the following services would you use to check CPU utilization of your EC2 instances?",
          options: ["CloudFormation", "CloudWatch", "Config"],
        },
        {
          id: 56,
          question:
            "Amazon CloudWatch will help monitor your AWS resources in real time by collecting and tracking _____________.",
          options: ["notifications", "metrics", "alarms", "events"],
        },
        {
          id: 57,
          question:
            "Which of the following tools can be used to give you visibility of the assets you have in AWS?",
          options: ["Trusted Advisor", "CloudTrail", "AWS Config", "CloudFormation"],
        },
        {
          id: 58,
          question:
            "Which of the following is a multi-tenant managed service which allows you to securely store and manage your encryption keys?",
          options: ["CloudHSM", "CloudTrail", "KMS", "Config"],
        },
        {
          id: 59,
          question:
            "When using AWS, which of the following are a customer responsibility in terms of Security and Compliance? (Choose 2)",
          options: [
            "Applying security updates and patching the Operating System running on EC2 instances",
            "Applying security updates and patching the hypervisor",
            "Configuring IAM",
            "Applying security updates and patching DynamoDB",
          ],
          multiple: true,
        },
        {
          id: 60,
          question:
            "You have a number of instances in a private subnet in your VPC, which need to access the internet. You have added a NAT Gateway to the VPC and added a Security Group rule allowing outbound internet traffic, however internet access is still not working. What could the problem be?",
          options: [
            "You forgot to add an elastic IP address to the instances which need to access the internet",
            "You forgot to disable source/destination checks on the NAT Gateway",
            "You forgot to update the private subnet's route table to route internet-bound traffic via the NAT gateway",
            "You forgot to add a Security Group inbound rule to allow the response from the external website to reach your instances",
          ],
        },
        {
          id: 61,
          question:
            "How can you securely enable an EC2 instance in a private subnet to access the internet to download security patches for software running on your instance?",
          options: [
            "Use Direct Connect",
            "Use a NAT Gateway or NAT Instance",
            "Use an Internet Gateway",
            "Use a VPN Gateway",
          ],
        },
        {
          id: 62,
          question:
            "Your S3 bucket policy allows your IAM user account full access to all S3 resources, however when you try to delete an object from the bucket, you are unable to do so. What could the problem be?",
          options: [
            "You are not the owner of the bucket",
            "Key policy associated with the object includes a deny statement which is preventing you from deleting it",
            "The object is encrypted",
            "The IAM policy associated with your user account includes a deny statement which is preventing you from deleting the object",
          ],
        },
        {
          id: 63,
          question:
            "You are logged into the AWS console and you are attempting to access the CloudWatch dashboard, however you are not able to do so. What could the problem be?",
          options: [
            "You do not have the required IAM permissions to access the CloudWatch console",
            "You have selected the wrong Region",
            "CloudWatch has not been enabled",
            "The CloudWatch agent has not been installed on your EC2 instances",
          ],
        },
        {
          id: 64,
          question:
            "You are attempting to decrypt a file which you have already successfully encrypted using your CMK, however when you try to decrypt you are not authorized to do so. Which policy should you check?",
          options: [
            "The IAM policy attached to your user",
            "The S3 Access Control List",
            "The CMK Key policy",
            "The S3 bucket policy",
          ],
        },
        {
          id: 65,
          question:
            "You have configured a new VPC with a private subnet and added a NAT Gateway and configured the subnet route table to route all internet traffic via the NAT Gateway. However when you try to run a yum update, none of your instances are able to reach the internet. What could be the problem?",
          options: [
            "Create Network ACLs allowing incoming traffic on ports 80 and 443 from 0.0.0.0/0",
            "You have forgotten to configure an outbound Security Group rule allowing outbound HTTPS traffic to 0.0.0.0/0 and an inbound Security Group rule allowing incoming HTTPS traffic from 0.0.0.0/0",
            "You have forgotten to configure an inbound Security Group rule allowing incoming HTTPS traffic from 0.0.0.0/0",
            "You have forgotten to configure an outbound Security Group rule allowing outbound HTTPS traffic to 0.0.0.0/0",
          ],
        },
        {
          id: 66,
          question:
            "Which of the following approaches can you use to best protect your system from being affected by a DDoS attack? (Choose 3)",
          options: [
            "Minimize the attack surface area",
            "Apply regular software updates",
            "Implement strong password policies",
            "Be ready to scale to absorb an attack",
            "Back up your critical data on a regular basis",
            "Understand what normal behaviour looks like",
          ],
          multiple: true,
        },
        {
          id: 67,
          question:
            "Your EC2 instance has been hacked, which of the following should you do immediately as part of your incident response plan? (Choose 3)",
          options: [
            "Redeploy the instance to an isolated environment for forensic analysis",
            "Log in to the instance from your workstation and figure out how this happened",
            "Stop the instance",
            "Delete the Key Pair associated with the instance",
            "Terminate the instance immediately",
            "Create a snapshot of the EBS volume",
          ],
          multiple: true,
        },
      ],
      answers: [
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 1, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 2, correctAnswer: [0, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 3, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 4, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 5, correctAnswer: [1, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 6, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 7, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 8, correctAnswer: [0, 1, 2, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 9, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 10, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 11, correctAnswer: [1, 2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 12, correctAnswer: [0, 2, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 13, correctAnswer: [0, 2, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 14, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 15, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 16, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 17, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 18, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 19, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 20, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 21, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 22, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 23, correctAnswer: [0, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 24, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 25, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 26, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 27, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 28, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 29, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 30, correctAnswer: [0, 1, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 31, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 32, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 33, correctAnswer: [0, 3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 34, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 35, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 36, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 37, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 38, correctAnswer: [1, 2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 39, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 40, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 41, correctAnswer: [1, 4] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 42, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 43, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 44, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 45, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 46, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 47, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 48, correctAnswer: [0, 1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 49, correctAnswer: [1, 4] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 50, correctAnswer: [1, 4] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 51, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 52, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 53, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 54, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 55, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 56, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 57, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 58, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 59, correctAnswer: [0, 2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 60, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 61, correctAnswer: [1] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 62, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 63, correctAnswer: [0] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 64, correctAnswer: [2] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 65, correctAnswer: [3] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 66, correctAnswer: [0, 3, 5] },
        { quizId: "CS79DMidtermCloudPractitionerExam", questionId: 67, correctAnswer: [0, 2, 5] },
      ],
    },
    quiz: {
      title: "Module 4 CloudTrail & CloudWatch",
      dueLabel: "Due May 17, 2026 at 11:59 pm — 20 min limit",
      questions: [
        {
          id: 1,
          question:
            "How long does Amazon CloudWatch keep metric data for data points with a period of 60 seconds (1 minute)?",
          options: ["15 days", "3 hours", "63 days", "15 months"],
        },
        {
          id: 2,
          question:
            "You are responsible for the application logging solution for your company's existing applications running on multiple Amazon EC2 instances. Which of the following is the best approach for aggregating the application logs within AWS?",
          options: [
            "An Elastic Load Balancing listener",
            "An internal Elastic Load Balancing load balancer",
            "Amazon CloudWatch metrics",
            "Amazon CloudWatch Logs Agent",
          ],
        },
        {
          id: 3,
          question:
            "Amazon CloudWatch supports which types of monitoring plans? (Choose 2 answers)",
          options: [
            "Detailed monitoring, which has an additional cost",
            "Detailed monitoring, which is free",
            "Basic monitoring, which is free",
            "Basic monitoring, which has an additional cost",
          ],
          multiple: true,
        },
        {
          id: 4,
          question: "All CloudTrail Trails applies to all regions.",
          options: ["True", "False"],
        },
        {
          id: 5,
          question:
            "Visibility into your AWS account activity is a key aspect of security and operational best practices, which is what CloudTrail provides.",
          options: ["True", "False"],
        },
        {
          id: 6,
          question:
            "A trail is a configuration that enables delivery of events to an Amazon _____________.",
          options: ["SAN", "Lambda Function", "EBS", "S3 Bucket"],
        },
        {
          id: 7,
          question:
            "CloudTrail captures actions made by _______ and ________. (Select 2)",
          options: [
            "inside the OS",
            "AWS service for the user",
            "the user",
            "Web App",
          ],
          multiple: true,
        },
        {
          id: 8,
          question: "CloudTrail event log files contain sensitive data.",
          options: ["True", "False"],
        },
        {
          id: 9,
          question: "AWS CloudWatch collects and tracks metrics in real time.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "You can create a CloudWatch alarm that watches a single metric.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 1,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 2,
          correctAnswer: [3],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 3,
          correctAnswer: [0, 2],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 4,
          correctAnswer: [1],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 6,
          correctAnswer: [3],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 7,
          correctAnswer: [1, 2],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 8,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 9,
          correctAnswer: [0],
        },
        {
          quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
      ],
    },
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
