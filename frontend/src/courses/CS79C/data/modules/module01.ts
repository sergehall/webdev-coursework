import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule01Blueprint = {
  id: 1,
  title: "Introduction to Computing Services",
  weekLabel: "Week 1",
  dateLabel: "February 17, 2026",
  overview:
    "This opening module sets up the course rhythm, introduces AWS compute concepts, and frames how distributed systems and cloud-native design show up across the rest of the class.",
  topicLine: "Scheduled topic: Introduction to Computing Services",
  focusAreas: [
    "Course orientation and AWS console readiness",
    "Core compute service categories in AWS",
    "Scalable cloud application design considerations",
  ],
  objectivesAligned: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
    "Navigate the AWS Management Console.",
  ],
  outcomeAlignment: [
    "Prepares the foundation for launching, managing, and documenting AWS-based application deployments.",
  ],
  syllabusContext: [
    "The course is fully online in Canvas with weekly modules, readings, assignments, projects, discussions, and tests.",
    "Students were required to complete Module 1 by February 22, 2026 to avoid being dropped from the class.",
    "The syllabus frames the course around distributed systems and scalable cloud application design.",
  ],
  starterTasks: [
    "Add module lecture notes and Canvas reading checklist",
    "Attach AWS account setup or learner-lab access guidance",
    "Capture first-week screenshots or setup milestones",
  ],
  artifacts: [
    "Orientation notes",
    "AWS access checklist",
    "Intro assignment reflection",
  ],
  importantDates: [
    "Module 1 assignment required by February 22, 2026",
    "Refund deadline: February 21, 2026",
  ],
  assessmentContext: [
    "This module likely contributes to the Labs & Discussions and Quizzes portions of the course grade.",
    "Use this space to capture setup evidence that supports the rest of the term.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Create AWS account and AWS Academy account.",
    },
    {
      step: "2",
      description:
        "Read the assigned white papers and beginner AWS fundamentals material.",
    },
    {
      step: "3",
      description: "Listen to the Module 1 lecture.",
    },
    {
      step: "4",
      description:
        "Complete the IAM lab by creating root, student, and professor-style AWS accounts.",
    },
    {
      step: "5",
      description: "Complete the Module 1 quiz.",
    },
  ],
  readingHighlights: [
    "Overview of Amazon Web Services: Abstract and Introduction (Page 1).",
    "What is Cloud Computing? (Page 2).",
    "Six Advantages of Cloud Computing (Page 3).",
    "Types of Cloud Computing (Page 4).",
    "Global Infrastructure (Page 5).",
    "Security and Compliance with the shared responsibility model (Pages 6–7).",
    "Well-Architected Framework (Pages 1–7).",
    "AWS Fundamentals Beginners Guide.",
  ],
  overviewScreenshots: [
    {
      src: "/code-playground/CS79C/mod-1/overview/module-1-overview-reference.png",
      alt: "Module 1 reference view showing assignments, additional material, and certification focus sections.",
    },
  ],
  textTasks: [
    {
      id: "slack-workspace",
      title: "Module 1 Lab 2: Join the CS 79C Slack Workspace",
      objective:
        "To ensure all students are connected to the course communication platform, Slack, and can effectively communicate with the instructor and classmates.",
      tasks: [
        "Sign up for Slack and create an account using your preferred email address, preferably your SMC email.",
        "Verify your email and complete your Slack profile setup.",
        "Join the CS 79C Slack workspace using the course invite link.",
        "Sign in with your newly created Slack account or use an existing one if you already have Slack.",
        "Set your display name to your full name as it appears in Canvas for easy identification.",
        "Post a quick hello introducing yourself with your name, your major and goals for this course, and any fun fact or cloud tech experience.",
      ],
      submissionInstructions: [
        "Submit a screenshot showing your name visible in the CS 79C Slack workspace.",
        'Make sure the workspace name "smccs79cspring2026" is visible in the Slack interface.',
        "Include your Slack post introducing yourself.",
      ],
      whyItMattersHeading: "Why Slack?",
      whyItMatters:
        "Slack will be our primary communication tool for questions, discussions, and announcements throughout the semester in addition to Canvas announcements. Ensuring you are connected early will set you up for success in this course.",
    },
  ],
  serviceHighlights: [
    {
      service: "Amazon EC2",
      pages: "32–33",
      notes:
        "Introduced as secure, resizable compute capacity and virtual servers in the cloud.",
    },
    {
      service: "Amazon EC2 Auto Scaling",
      pages: "33–34, 37",
      notes:
        "Covers launch templates, scaling policies, and automated EC2 scaling behavior.",
    },
    {
      service: "Elastic Load Balancing (ELB)",
      pages: "118–119",
      notes:
        "Introduces ALB, NLB, and CLB for distributing traffic across application environments.",
    },
    {
      service: "AWS Elastic Beanstalk",
      pages: "32, 39",
      notes:
        "Presented as an easy-to-use service for deploying and managing web applications.",
    },
    {
      service: "AWS Lambda",
      pages: "34, 40",
      notes:
        "Introduces serverless compute for running code without provisioning or managing servers.",
    },
    {
      service: "AWS Fargate",
      pages: "34, 40",
      notes:
        "Described as serverless compute for containers in ECS and EKS-based workflows.",
    },
    {
      service: "Amazon Lightsail",
      pages: "33, 38",
      notes:
        "Explains simplified virtual server hosting with pre-configured plans.",
    },
    {
      service: "AWS Batch",
      pages: "33, 39",
      notes:
        "Positions AWS Batch as a fully managed batch processing platform.",
    },
    {
      service: "Amazon ECS",
      pages: "33",
      notes:
        "Introduces ECS as a scalable container orchestration service in AWS.",
    },
    {
      service: "Amazon EKS",
      pages: "33",
      notes:
        "Covers EKS as AWS-managed Kubernetes for containerized workloads.",
    },
    {
      service: "AWS Outposts",
      pages: "34",
      notes:
        "Explains hybrid-cloud AWS infrastructure and services for on-premises use cases.",
    },
  ],
  assignmentsAndLabs: [
    "Module 1 IAM Lab 1: Create AWS Accounts (Root, Student, Professor).",
    "Module 1 Slack Lab 2: Join the CS 79C Slack Workspace.",
    "Module 1 Quiz: AWS Computing Introduction.",
  ],
  additionalMaterials: [
    "AWS Official Documentation: https://docs.aws.amazon.com/",
    "AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/",
    '"AWS in Action" by Michael Wittig and Andreas Wittig.',
    "AWS Free Tier: https://aws.amazon.com/free/",
    "AWS Educate: https://aws.amazon.com/education/awseducate/",
    "Cloud Resume Challenge: https://cloudresumechallenge.dev/",
  ],
  certificationFocus: [
    {
      service: "Amazon EC2",
      category: "Compute",
      description: "Virtual servers in the cloud.",
      level: "Advanced",
    },
    {
      service: "Amazon EC2 Auto Scaling",
      category: "Compute",
      description: "Automatically scale EC2 instances.",
      level: "Intermediate",
    },
    {
      service: "Elastic Load Balancing (ELB)",
      category: "Compute",
      description: "Distribute traffic across EC2 instances.",
      level: "Intermediate",
    },
    {
      service: "AWS Lambda",
      category: "Compute",
      description: "Run code without managing servers.",
      level: "Advanced",
    },
    {
      service: "Amazon S3",
      category: "Storage",
      description: "Object storage for any data type.",
      level: "Advanced",
    },
    {
      service: "Amazon EBS",
      category: "Storage",
      description: "Block storage for EC2 instances.",
      level: "Intermediate",
    },
    {
      service: "Amazon Glacier",
      category: "Storage",
      description: "Low-cost, long-term archive storage.",
      level: "Basic",
    },
    {
      service: "Amazon VPC",
      category: "Networking",
      description: "Virtual private cloud networking.",
      level: "Advanced",
    },
    {
      service: "Amazon CloudFront",
      category: "Networking/CDN",
      description: "Content delivery network.",
      level: "Intermediate",
    },
    {
      service: "Amazon RDS",
      category: "Database",
      description: "Managed relational database.",
      level: "Advanced",
    },
    {
      service: "Amazon DynamoDB",
      category: "Database",
      description: "Managed NoSQL database.",
      level: "Intermediate",
    },
    {
      service: "AWS IAM",
      category: "Security",
      description: "Identity and access management.",
      level: "Advanced",
    },
    {
      service: "Amazon CloudWatch",
      category: "Monitoring",
      description: "Monitor AWS resources.",
      level: "Intermediate",
    },
  ],
  quiz: {
    title: "Module 1 Compute Introduction Quiz",
    questions: [
      {
        id: 1,
        question:
          "Cloud computing is the on-demand delivery of computing, database storage, applications and other IT resources through a cloud service platform via the Internet as a Pay as you go service.",
        options: ["True", "False"],
      },
      {
        id: 2,
        question:
          "What are the main benefits of Cloud Computing? (Select All That Apply)",
        options: [
          "Increase Speed and Agility",
          "Reduced Infrastructure Cost",
          "No Need to Guess Capacity",
          "No Upfront Cost",
          "Increase Physical Access to Servers",
        ],
        multiple: true,
      },
      {
        id: 3,
        question:
          "A ______ is a physical location in the world where we have multiple AZs.",
        options: ["City", "Area", "Country", "Region"],
      },
      {
        id: 4,
        question:
          "_________ consist of one or more discrete data centers, each with redundant power, networking, and connectivity, housed in separate facilities.",
        options: ["Data Center", "Availability Zone", "Warehouse", "DMZ"],
      },
      {
        id: 5,
        question: "Amazon Web Services is only located in the United States.",
        options: ["True", "False"],
      },
      {
        id: 6,
        question:
          "What is the best practice for Availability Zones within a region?",
        options: [
          "Use Multi AZ architecture to distribute resources",
          "Rotate AZs monthly to save cost",
          "Deploy everything in a single AZ to simplify operations",
          "Use one AZ for production and ignore failover",
        ],
      },
      {
        id: 7,
        question:
          "What is the primary reason to place workloads in a region close to end users?",
        options: [
          "Increase storage durability",
          "Lower EBS prices in all cases",
          "Reduce latency",
          "Avoid shared responsibility",
        ],
      },
      {
        id: 8,
        question: "What does the region code us-east-1 correspond to?",
        options: [
          "US East Ohio",
          "US West N California",
          "US West Oregon",
          "US East N Virginia",
        ],
      },
      {
        id: 9,
        question:
          "Your business requires near zero downtime during regional failures. Which disaster recovery strategy best fits this need?",
        options: [
          "Warm standby",
          "Backup and restore only",
          "Hot standby multi region",
          "Pilot light",
        ],
      },
      {
        id: 10,
        question:
          "Which tagging practice enables answering, How much did project X cost last month?",
        options: [
          "Avoid tags to reduce overhead",
          "Tag only EC2 and ignore other services",
          "Tag resources by project environment and department",
          "Use default names without tags",
        ],
      },
    ],
    answers: [
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 1,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 2,
        correctAnswer: [0, 1, 2, 3],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 3,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 4,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 5,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 6,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 7,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 8,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 9,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule1ComputeIntroductionQuiz",
        questionId: 10,
        correctAnswer: [2],
      },
    ],
  },
  milestone:
    "Complete Module 1 so the course stays active and ready for the rest of the session.",
} satisfies CS79CModuleBlueprint;
