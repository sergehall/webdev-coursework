import type { CS79DModuleBlueprint } from "../types";

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
} satisfies CS79DModuleBlueprint;
