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
    milestone: "AWS Learner Lab access confirmed, all Week 1 deliverables submitted",
    textTasks: [
      {
        id: "tell-us-about-you",
        title: "Discussion: Tell Us About You!",
        objective:
          "Introduce yourself to the class. Share your background, what brought you to CS 79D, and what you hope to learn about AWS security.",
        tasks: [
          "Post your introduction to the Canvas discussion board",
          "Include your background and experience with AWS or cloud technologies",
          "Mention one AWS security topic you are most curious about",
          "Reply to at least one classmate's post",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion board",
          "Due: April 24, 2026",
          "5 points",
        ],
        whyItMatters:
          "Peer learning is a core part of this course. Knowing your classmates' backgrounds helps build a collaborative environment and often surfaces real-world experience that enriches discussions throughout the term.",
      },
      {
        id: "assignment-1-learner-lab",
        title: "Assignment 1: Acquire an AWS Learner Lab Account",
        objective:
          "Successfully accept the AWS Academy invitation and gain access to the Learner Lab environment that will be used for hands-on labs throughout the course.",
        tasks: [
          "Check email for AWS Academy invitation from instructure.com",
          "Click 'Get Started' in the invitation email",
          "Create a Canvas account (separate from SMC Canvas)",
          "Set your email, password, and timezone",
          "Accept the Canvas Acceptable Use Policy and AWS Learner Terms",
          "Confirm access to the AWS Learner Lab dashboard",
        ],
        submissionInstructions: [
          "Submit screenshot of Learner Lab dashboard through SMC Canvas",
          "Due: April 24, 2026",
          "10 points",
        ],
        whyItMatters:
          "The AWS Learner Lab is the sandbox environment for every hands-on assignment in this course. Without it, you cannot complete any labs. Setting it up in Week 1 ensures you are ready for every subsequent module.",
      },
      {
        id: "assignment-1b-console",
        title: "Assignment 1b: AWS Management Console",
        objective:
          "Navigate the AWS Management Console and familiarise yourself with the layout, service finder, and region selector.",
        tasks: [
          "Log in to the AWS Management Console via your Learner Lab",
          "Locate at least 5 security-related services (IAM, GuardDuty, CloudTrail, Security Hub, KMS)",
          "Explore the region selector and understand global vs. regional services",
          "Review the supported browsers list for the AWS Console",
        ],
        submissionInstructions: [
          "Submit screenshot of console with security services visible through SMC Canvas",
          "Due: April 24, 2026",
          "10 points",
        ],
        whyItMatters:
          "All hands-on work in this course runs through the AWS Management Console. Familiarity with the layout and navigation saves time in every subsequent lab and reduces friction when following step-by-step instructions.",
      },
      {
        id: "assignment-1c-shared-responsibility",
        title: "Assignment 1c: Shared Responsibility Model",
        objective:
          "Demonstrate understanding of the AWS Shared Responsibility Model by correctly categorising security responsibilities between AWS and the customer.",
        tasks: [
          "Read the AWS Shared Responsibility Model documentation",
          "Create a table or diagram separating AWS responsibilities from customer responsibilities",
          "Provide two real-world examples for each side of the model",
          "Explain why this model matters for organisations moving to the cloud",
        ],
        submissionInstructions: [
          "Submit written response or diagram through SMC Canvas",
          "Due: April 24, 2026",
          "10 points",
        ],
        whyItMatters:
          "The Shared Responsibility Model is the conceptual foundation of every AWS security decision. Misunderstanding which party is responsible for what has caused major cloud breaches. Getting this right in Week 1 shapes every security judgment you make throughout the course.",
      },
    ],
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
      "Week 2 deliverables due: May 1, 2026",
    ],
    assessmentContext: [
      "Discussion — participation points",
      "Lab assignment — IAM configuration",
      "Quiz: Identity and Access Management",
    ],
    milestone: "IAM users, groups, roles, and MFA configured in Learner Lab",
  },
  {
    id: 3,
    title: "Infrastructure Security",
    weekLabel: "Week 3",
    dateLabel: "May 4–8, 2026",
    overview:
      "This module covers network-level security in AWS — VPCs, subnets, security groups, network ACLs, and VPN connections. You will build and test a secure network architecture in the Learner Lab.",
    topicLine: "Scheduled topic: Infrastructure Security — VPC and Network Controls",
    focusAreas: [
      "Amazon VPC architecture",
      "Security groups vs. network ACLs",
      "Public and private subnets",
      "AWS VPN and Direct Connect",
      "VPC Flow Logs for traffic analysis",
    ],
    objectivesAligned: [
      "Design a secure VPC with public and private subnets",
      "Configure security groups and NACLs for least-privilege network access",
      "Enable VPC Flow Logs and analyse network traffic",
      "Understand the difference between stateful and stateless firewalls in AWS",
    ],
    outcomeAlignment: [
      "Implement network isolation and segmentation in AWS",
      "Troubleshoot connectivity issues using VPC Flow Logs",
      "Apply defense-in-depth at the network layer",
    ],
    syllabusContext: [
      "Module 3 of 8 — network security underpins all AWS deployments",
      "Builds on IAM access concepts from Module 2",
    ],
    starterTasks: [
      "Create a VPC with public and private subnets",
      "Configure security group rules for a web server",
      "Enable VPC Flow Logs and review in CloudWatch",
      "Test inbound/outbound traffic rules",
    ],
    artifacts: [
      "VPC architecture diagram",
      "Screenshot of security group configuration",
      "VPC Flow Logs sample output",
    ],
    importantDates: [
      "Week 3 deliverables due: May 8, 2026",
    ],
    assessmentContext: [
      "Discussion — network security scenario",
      "Lab assignment — VPC and security group configuration",
      "Quiz: Infrastructure Security",
    ],
    milestone: "Secure VPC architecture deployed with working security group rules",
  },
  {
    id: 4,
    title: "Data Protection and Encryption",
    weekLabel: "Week 4",
    dateLabel: "May 11–15, 2026",
    overview:
      "Encryption at rest and in transit is mandatory in any production AWS environment. This module covers AWS KMS, S3 encryption options, SSL/TLS configuration, and secrets management with AWS Secrets Manager.",
    topicLine: "Scheduled topic: Data Protection — KMS, S3, and Secrets Manager",
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
    importantDates: [
      "Week 4 deliverables due: May 15, 2026",
    ],
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
    topicLine: "Scheduled topic: Monitoring and Auditing — CloudTrail, CloudWatch, Config",
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
    importantDates: [
      "Week 5 deliverables due: May 22, 2026",
    ],
    assessmentContext: [
      "Discussion — monitoring strategy for a real scenario",
      "Lab assignment — CloudTrail and CloudWatch setup",
      "Quiz: Monitoring and Auditing",
    ],
    milestone: "CloudTrail, CloudWatch alarms, Config rules, and Security Hub active",
  },
  {
    id: 6,
    title: "Threat Detection and Incident Response",
    weekLabel: "Week 6",
    dateLabel: "May 25–29, 2026",
    overview:
      "With logging in place, this module focuses on active threat detection and structured incident response. Amazon GuardDuty, AWS Detective, and the AWS Incident Response framework are the core tools explored.",
    topicLine: "Scheduled topic: Threat Detection — GuardDuty, Detective, and IR",
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
    importantDates: [
      "Week 6 deliverables due: May 29, 2026",
    ],
    assessmentContext: [
      "Discussion — real-world cloud incident case study",
      "Lab assignment — GuardDuty and automated response",
      "Quiz: Threat Detection and Incident Response",
    ],
    milestone: "GuardDuty enabled, incident response runbook drafted, automated alert wired",
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
    importantDates: [
      "Week 7 deliverables due: June 5, 2026",
    ],
    assessmentContext: [
      "Discussion — choosing the right compliance framework",
      "Lab assignment — SCP and AWS Artifact",
      "Quiz: Compliance and Governance",
    ],
    milestone: "SCP configured, compliance report reviewed, control mapping completed",
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
