import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export type CS79CModuleBlueprint = {
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
  assignmentsAndLabs?: string[];
  additionalMaterials?: string[];
  certificationFocus?: Array<{
    service: string;
    category: string;
    description: string;
    level: string;
  }>;
  quiz?: {
    title: string;
    dueLabel?: string;
    questions: UIQuestion[];
    answers: CorrectAnswerDto[];
  };
};

export const cs79cCourseReference = {
  courseTitle: "CS 79C – Compute Engines in Amazon Web Services",
  sessionLabel: "Spring 2026 • First 8-Week Session",
  instructor: "Vicky Tanya Seno",
  instructorEmail: "seno_vicky@smc.edu",
  officeHours: "Tuesdays 10:00 AM – 11:00 AM (Zoom) or by appointment",
  slackWorkspace: "smccs79cspring2026.slack.com",
  canvasUrl: "online.smc.edu",
  requiredReadings: [
    "AWS Documentation: https://aws.amazon.com/documentation/",
    "AWS Whitepapers: https://aws.amazon.com/whitepapers/",
  ],
  gradingBreakdown: [
    "Labs & Discussions — 35%",
    "Quizzes — 35%",
    "Final Project — 15%",
    "Final Exam — 15%",
  ],
  courseObjectives: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
    "Navigate the AWS Management Console.",
    "Describe the architectural approach used by AWS Elastic Beanstalk.",
    "Deploy and manage Elastic Beanstalk applications.",
    "Scale and load-balance cloud applications using AWS tools.",
    "Deploy EC2 servers and work with various Amazon Machine Images.",
  ],
  studentLearningOutcomes: [
    "Design, create and deploy applications using the AWS Console and Elastic Beanstalk.",
    "Launch and monitor EC2 instances with the AWS Console.",
  ],
  importantSessionDates: [
    "Session begins: February 17, 2026",
    "Refund deadline: February 21, 2026",
    "Class census day: February 28, 2026",
    'Last day to withdraw without a "W": March 4, 2026',
    'Guaranteed "W" withdrawal deadline: March 28, 2026',
    "Finals week: April 6–12, 2026",
    "Session ends: April 12, 2026",
  ],
} as const;

export const cs79cModuleBlueprints: CS79CModuleBlueprint[] = [
  {
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
  },
  {
    id: 2,
    title: "AWS Storage Volumes",
    weekLabel: "Week 2",
    dateLabel: "February 23, 2026",
    overview:
      "Module 2 focuses on AWS storage solutions, including Amazon S3, Amazon EFS, and Amazon EBS. Students install and configure the AWS Command Line Interface to manage storage services, complete readings on RAID and AWS storage tools, participate in class discussion, listen to lecture demos, and complete hands-on labs plus a quiz.",
    topicLine: "Scheduled topic: AWS Storage Volumes",
    focusAreas: [
      "Amazon S3, Amazon EFS, and Amazon EBS storage workflows",
      "AWS CLI setup for cloud storage management",
      "Storage architecture and RAID-related reading",
    ],
    objectivesAligned: [
      "Describe the architectural approach used by AWS.",
      "Describe important design considerations for scalable cloud applications.",
    ],
    outcomeAlignment: [
      "Builds practical experience with AWS storage services that support later compute, deployment, and architecture decisions.",
    ],
    syllabusContext: [
      "This module introduces the core storage services that pair with AWS compute workflows throughout the course.",
      "Students are expected to connect lecture material, CLI setup, readings, lab work, and class discussion into one storage-focused module flow.",
    ],
    starterTasks: [
      "Install and configure the AWS Command Line Interface",
      "Read the assigned material on RAID, S3, EFS, and EBS",
      "Capture notes and screenshots from the storage labs and lecture demos",
    ],
    artifacts: [
      "AWS CLI setup confirmation",
      "Storage lab notes for S3 and EFS",
      "Quiz prep notes and discussion reflection",
    ],
    importantDates: ["Class census day: February 28, 2026"],
    assessmentContext: [
      "This module includes labs, Slack discussion participation, lecture demos, and a quiz to check storage-service understanding.",
    ],
    moduleSummary: [
      {
        step: "1",
        description: "Install and configure the AWS Command Line Tool.",
      },
      {
        step: "2",
        description: "Complete required reading on RAID, S3, EFS, and EBS.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Job Post Assignment.",
      },
      {
        step: "4",
        description: "Listen to course lectures with lab demos.",
      },
      {
        step: "5",
        description: "Complete Lab 1 S3, Lab 2 EFS, and the quiz.",
      },
    ],
    textTasks: [
      {
        id: "classroom-engagement-job-slack-post",
        title: "Classroom Engagement - Job Slack Post",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. In this course, you will participate in one class discussion in each module, due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Find and share a cloud computing job description from a reputable company.",
          "Include the job title, company name, job description, job requirements, salary information if available, and a link to the job post.",
          "Write a 2–5 sentence reflection explaining what interests you about the position, which skills or tools you hope to learn in this course, and any terms or qualifications you want to explore further.",
          "Do not worry if you do not meet every listed requirement because many job postings describe ideal qualifications rather than entry-level readiness.",
        ],
        submissionInstructions: [
          "Your discussion post must be at least 2–5 sentences.",
          "Comment on one other student's post.",
          "Use professional grammar and punctuation appropriate for a college-level course.",
          'Avoid text-speak or abbreviations such as "u" for "you".',
          "Post a screenshot of your Slack discussion entry to Canvas.",
          "Post early and often during the discussion period.",
        ],
        whyItMattersHeading: "Note",
        whyItMatters:
          "Introductory courses, personal projects, and curiosity are strong first steps toward cloud roles. This assignment helps connect course concepts to real career paths and the skills employers actually request.",
        resourceSections: [
          {
            title: "Useful Keywords for Job Search",
            items: [
              "Cloud Computing Intern",
              "Cloud Support Associate",
              "AWS Internship",
              "Cloud Engineer (Entry-Level)",
              "Junior DevOps Engineer",
              "Technical Support - Cloud Services",
              "IT Support with AWS",
              "Cloud Operations Assistant",
              "Cloud Administrator (Trainee)",
              "Associate Cloud Developer",
            ],
          },
          {
            title: "Recommended Job Sites",
            items: [
              "LinkedIn Jobs",
              "Indeed",
              "Monster",
              "SimplyHired",
              "Glassdoor",
              "AWS Careers",
              "Google Careers",
              "Microsoft Careers",
            ],
          },
        ],
      },
      {
        id: "s3-cli-lab-1",
        title: "S3 CLI Lab 1: Create and Manage AWS S3 Bucket via CLI",
        objective:
          "In this lab, you will use the AWS CLI to create and manage an S3 bucket. You will complete a series of tasks and capture screenshots as proof of completion.",
        tasks: [
          "Create an S3 bucket using the AWS CLI.",
          "Use the bucket naming format yourFirstNameYourLastName.com, for example johnsmith.com.",
          "Upload two files from your local system to the newly created S3 bucket.",
          "List all S3 buckets in your AWS account.",
          "List the contents of your bucket to show the files stored in yourFirstNameYourLastName.com.",
          "Delete both uploaded files from the S3 bucket.",
          "Delete the S3 bucket after confirming that it is empty.",
        ],
        submissionInstructions: [
          "Submit a Word document containing labeled screenshots for each step.",
          "Make sure each screenshot clearly shows the command executed and its output.",
          "Take a screenshot for each step and label it appropriately.",
        ],
        whyItMattersHeading: "Reminder",
        whyItMatters:
          "Refer to the video lecture for a lab demonstration if needed.",
      },
      {
        id: "efs-console-lab-2",
        title: "EFS Console Lab 2: Create EFS via AWS Console",
        objective:
          "In this lab, you will create and configure an Amazon Elastic File System (EFS). You will follow the updated AWS guidelines to set up EFS in a single Availability Zone and capture screenshots as proof of completion.",
        tasks: [
          "Create a new security group that allows inbound NFS traffic on port 2049.",
          "Set the inbound rule to allow traffic from all IPs (0.0.0.0/0) or restrict it to specific trusted sources, then take a screenshot of the configured security group.",
          "Navigate to the EFS console and create a new file system.",
          "Select a single Availability Zone for deployment, configure storage settings using current best practices, and take a screenshot of the EFS creation summary.",
          "Attach a mount target to the EFS within the same Availability Zone, ensure the correct security group is associated, and take a screenshot showing the mount target details.",
          "Create an access point for controlled access to the EFS if desired, and take a screenshot of the access point configuration.",
          "Obtain the NFS mount point information from the EFS console and take a screenshot showing the mount point details.",
          "Optionally launch an EC2 instance running Amazon Linux or Ubuntu in the same VPC with access to the EFS security group, install the NFS client, mount the EFS volume, verify it with df -h, and take a screenshot of the mounted EFS volume.",
        ],
        submissionInstructions: [
          "Submit a Word document containing labeled screenshots for each step.",
          "Make sure each screenshot clearly shows the configuration and execution process.",
          "Ensure all screenshots are clear and properly labeled in your submission.",
        ],
        whyItMattersHeading: "Reference",
        whyItMatters:
          "Refer to the AWS User Guide, pages 11 through 13, for detailed instructions while completing the lab.",
        resourceSections: [
          {
            title: "Mount Command",
            items: [
              "sudo mount -t nfs4 :/ /mnt/efs",
              "Verify the mount with df -h",
            ],
          },
          {
            title: "Optional Linux Client Setup",
            items: [
              "sudo yum install -y nfs-utils",
              "sudo apt-get install -y nfs-common",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "AWS Storage Volumes",
      questions: [
        {
          id: 1,
          question:
            "In what ways does Amazon Simple Storage Service (Amazon S3) object storage differ from block and file storage? (Choose 2 answers)",
          options: [
            "Objects are stored in buckets.",
            "Amazon S3 stores data in fixed size blocks.",
            "Objects contain both data and metadata.",
            "Objects can be any size.",
          ],
          multiple: true,
        },
        {
          id: 2,
          question:
            "Which of the following are not appropriate use cases for Amazon Simple Storage Service (Amazon S3)? (Choose 2 answers)",
          options: [
            "Storing an Elastic Block Storage volume",
            "Storing web content",
            "Storing a relational database",
            "Storing logs for analytics",
          ],
          multiple: true,
        },
        {
          id: 3,
          question:
            "What are some of the key characteristics of Amazon Simple Storage Service (Amazon S3)? (Choose 2 answers)",
          options: [
            "You must pre-allocate the storage in a bucket.",
            "All objects have a URL.",
            "Objects are world-readable by default.",
            "Amazon S3 can store unlimited amounts of data.",
          ],
          multiple: true,
        },
        {
          id: 4,
          question:
            "Based on the following Amazon Simple Storage Service (Amazon S3) URL, which one of the following statements is correct? https://bucket1.abc.com.s3.amazonaws.com/folderx/myfile.doc",
          options: [
            'The object "myfile.doc" is stored in the folder "folderx" in the bucket "bucket1.abc.com."',
            'The object "myfile.doc" is stored in the bucket "bucket1.abc.com."',
            'The object "myfile.doc" is stored in the bucket "bucket1."',
            'The object "folderx/myfile.doc" is stored in the bucket "bucket1.abc.com."',
          ],
        },
        {
          id: 5,
          question:
            "Your company has 100TB of financial records that need to be stored for seven years by law. Experience has shown that any record more than one-year old is unlikely to be accessed. Which of the following storage plans meets these needs in the most cost efficient manner?",
          options: [
            "Store the data on Amazon Simple Storage Service (Amazon S3) with lifecycle policies that change the storage class to Amazon Glacier after one year and delete the object after seven years.",
            "Store the data in Amazon DynamoDB and run daily scripts to delete data older than seven years.",
            "Store the data in Amazon Elastic MapReduce (Amazon EMR).",
            "Store the data on Amazon Elastic Block Store (Amazon EBS) volumes attached to t2.micro instances.",
          ],
        },
        {
          id: 6,
          question:
            "Amazon Glacier is well-suited to data that is which of the following? (Choose 2 answers)",
          options: [
            "Frequently erased within 30 days.",
            "Immediately available when needed.",
            "Infrequently or rarely accessed.",
            "Available after a three- to five-hour restore period.",
          ],
          multiple: true,
        },
        {
          id: 7,
          question: "Which of the following are true of instance stores?",
          options: [
            "Well suited for databases.",
            "Automatic backups.",
            "Data is not lost when the instance stops.",
            "Data is lost when the instance stops.",
          ],
        },
        {
          id: 8,
          question:
            "Which of the following are features of Amazon Elastic Block Store (Amazon EBS)? (Choose 2 answers)",
          options: [
            "Amazon EBS volumes can be encrypted.",
            "Amazon EBS data is automatically backed up to tape.",
            "Data on an Amazon EBS volume is lost when the attached instance is stopped.",
            "Data stored on Amazon EBS is automatically replicated within an Availability Zone.",
          ],
          multiple: true,
        },
        {
          id: 9,
          question:
            "You need a common file system for your application that is shared between more than one Amazon EC2 instance.",
          options: ["S3 IA", "EBS", "EFS", "S3"],
        },
        {
          id: 10,
          question:
            "You require cloud storage for data archiving and long-term backup. Waiting for 3 - 5 hours to access data is acceptable.",
          options: ["Glacier", "EBS", "S3", "EFS"],
        },
        {
          id: 11,
          question:
            "Which of the following is the correct S3 URL format? (Select 2)",
          options: [
            "https://my-bucket.s3.us.amazonaws.com/puppy.png",
            "https://my-bucket.s3.us-west-2.amazonaws.com/puppy.png",
            "https://amazonaws.com/mybucket/puppy.jpg",
            "https://s3.us-west-2.amazonaws.com/mybucket/puppy.jpg",
          ],
          multiple: true,
        },
        {
          id: 12,
          question:
            "EFS requires which TCP protocol to mount to a server instance?",
          options: ["TCP/IP", "NFS", "mount", "SMB"],
        },
        {
          id: 13,
          question: "EFS can cross Availability Zones within a single Region.",
          options: ["True", "False"],
        },
        {
          id: 14,
          question:
            "Amazon EBS provides block-level storage volumes that you can attach to a single running EC2 server instance.",
          options: ["True", "False"],
        },
        {
          id: 15,
          question: "S3 is highly durable with 99.999999999 durability.",
          options: ["True", "False"],
        },
        {
          id: 16,
          question: "S3 is highly available with 99.999999999% availability.",
          options: ["True", "False"],
        },
        {
          id: 17,
          question:
            "EBS ST1 volumes can be a boot volume. Meaning the OS (Windows or Linux) can be installed on a Throughput Optimized HDD (ST1) volume.",
          options: ["True", "False"],
        },
        {
          id: 18,
          question:
            "Instance Storage volumes are not persistent through EC2 server instance reboot, stops, terminations, or hardware failure.",
          options: ["True", "False"],
        },
        {
          id: 19,
          question:
            "Magnetic (Standard) volumes are backed by magnetic drives and are suited for workloads where data is accessed infrequently.",
          options: ["True", "False"],
        },
        {
          id: 20,
          question: "S3 bucket names must be globally unique.",
          options: ["True", "False"],
        },
        {
          id: 21,
          question: "What is the unique characteristic of RAID 6? (Choose one)",
          options: ["One parity", "Striping", "Mirroring", "Two parity"],
        },
        {
          id: 22,
          question:
            "Which of the following RAID levels provides maximum usable disk space?",
          options: ["RAID 4", "RAID 5", "RAID 1", "RAID 0"],
        },
        {
          id: 23,
          question:
            "An array of disks is more likely to fail compared to a single disk. How is it that RAID arrays still manage to provide more data protection compared to a single disk?",
          options: [
            "Using dedicated hardware",
            "Using either mirroring or striping",
            "Using either mirroring or parity",
            "Using better quality disks",
          ],
        },
        {
          id: 24,
          question:
            "What is the main purpose of data governance in cloud computing?",
          options: [
            "To design web-based applications",
            "To manage cloud infrastructure costs",
            "To ensure secure, compliant, and organized handling of data",
            "To create user-friendly interfaces",
          ],
        },
        {
          id: 25,
          question:
            "Which of the following AWS storage options is best for shared file access?",
          options: ["Amazon EBS", "Amazon EFS", "Amazon Glacier", "Amazon S3"],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 1,
          correctAnswer: [0, 2],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 2,
          correctAnswer: [0, 2],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 3,
          correctAnswer: [1, 3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 4,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 6,
          correctAnswer: [2, 3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 7,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 8,
          correctAnswer: [0, 3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 9,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 11,
          correctAnswer: [1, 3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 12,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 13,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 14,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 15,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 16,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 17,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 18,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 19,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 20,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 21,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 22,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 23,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 24,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule2AwsStorageVolumesQuiz",
          questionId: 25,
          correctAnswer: [1],
        },
      ],
    },
    milestone:
      "Complete Module 2 with AWS storage foundations, CLI setup, and hands-on lab evidence ready for the next module.",
  },
  {
    id: 3,
    title: "EC2 Instructions",
    weekLabel: "Week 3",
    dateLabel: "March 2, 2026",
    overview:
      "This module focuses on Amazon Elastic Compute Cloud (EC2), giving students hands-on experience in launching, managing, and securing virtual machines on AWS. The main topics include Security Groups, Key Pairs, EC2 instance deployment, and AWS Command Line Interface operations.",
    topicLine: "Scheduled topic: EC2 Instructions",
    focusAreas: [
      "EC2 instance deployment and management",
      "Security Groups and Key Pairs",
      "AWS CLI operations for EC2 workflows",
    ],
    objectivesAligned: [
      "Deploy EC2 servers and work with various Amazon Machine Images.",
      "Navigate the AWS Management Console.",
    ],
    outcomeAlignment: [
      "Builds direct hands-on experience with launching, securing, and managing Amazon EC2 instances in AWS.",
    ],
    syllabusContext: [
      "This module turns AWS compute concepts into direct EC2 practice with deployment, access, and security controls.",
      "Students connect lecture demonstrations, reading, discussion, and labs into a full EC2 workflow.",
    ],
    starterTasks: [
      "Complete the EC2 reading on instances, Security Groups, and Key Pairs",
      "Take notes from the course lectures and lab demos",
      "Prepare screenshots and notes for EC2 Console and EC2 CLI labs",
    ],
    artifacts: [
      "EC2 launch and access notes",
      "Security Group and Key Pair setup evidence",
      "Lab screenshots and quiz prep notes",
    ],
    importantDates: ['Last day to withdraw without a "W": March 4, 2026'],
    assessmentContext: [
      "This module includes lecture demos, class discussion, two EC2 labs, and an AWS EC2 quiz.",
    ],
    moduleSummary: [
      {
        step: "1",
        description:
          "Complete required reading on EC2, Security Groups, and Key Pairs.",
      },
      {
        step: "2",
        description: "Listen to course lectures with lab demos.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Post Assignment.",
      },
      {
        step: "4",
        description:
          "Complete Lab 1: EC2 Console (LAMP Stack) and Lab 2: EC2 CLI.",
      },
      {
        step: "5",
        description: "Complete the AWS EC2 quiz.",
      },
    ],
    readingHighlights: ["EC2 Developer Guide: EC2 Linux Instance."],
    textTasks: [
      {
        id: "classroom-engagement-slack-post-aws-job-post",
        title: "Classroom Engagement - Slack Post AWS Job Post",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Research possible AWS-related employment opportunities in the Los Angeles area.",
          "Post two entry-level AWS-related jobs in your discussion entry.",
          "Include the job title, company name, job description, job requirements, salary information, and a link to each job post.",
          "Comment on one other student's discussion post.",
          "Do not be afraid to apply to jobs that list two years of work experience, because personal projects can often help fill that requirement.",
        ],
        submissionInstructions: [
          "Post to Canvas a screenshot of your Slack discussion entry.",
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation throughout the discussion.",
          'Avoid "text" or "Twitter speak" when corresponding.',
          "Post early and often during the week the discussion board is open.",
        ],
        whyItMattersHeading: "Tip",
        whyItMatters:
          "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
        resourceSections: [
          {
            title: "Possible Keywords",
            items: [
              "Cloud Sales Executive",
              "Cloud Engineer",
              "Cloud Developer",
              "Cloud Systems Administrator",
              "Cloud Consultant",
              "Cloud Systems Engineer",
              "Cloud Network Engineer",
              "Cloud Product Manager",
              "System Architect",
              "System Designer",
              "Systems Administrator",
              "Systems Analyst",
              "IT Analyst",
              "Network Administrator",
              "Network Architect",
              "Network and Computer Systems Administrator",
              "Network Systems Administrator",
            ],
          },
          {
            title: "Useful Job Sites",
            items: [
              "https://aws.amazon.com/education/awseducate/",
              "http://hired.com/",
              "http://angel.co/jobs",
              "https://www.theladders.com",
              "http://www.crunchboard.com/jobs",
              "http://stackoverflow.com/jobs",
              "https://jobs.mashable.com/",
              "http://www.indeed.com",
              "http://www.ziprecruiter.com",
              "https://whitetruffle.com",
              "http://www.dice.com",
              "https://underdog.io",
              "http://jobs.github.com",
              "https://uncubed.com/jobs",
              "http://www.techcareers.com",
              "https://itjobpro.com",
              "http://news.ycombinator.com/jobs",
            ],
          },
          {
            title: "Discussion Guidelines",
            items: [
              "Your entry should be at least 2 to 5 sentences in length.",
              "Your entry can be a new entry or a reply to another student.",
              "Use professional grammar and punctuation in this college-level course.",
              'Avoid "text" or "Twitter speak" when corresponding.',
              "The Slack workspace should reflect an ongoing discussion related to the subject matter under consideration.",
              "Students should be posting early and often during the week the discussion board is open.",
            ],
          },
        ],
      },
      {
        id: "ec2-console-lab-1-setup-linux-lamp-ec2-server",
        title: "EC2 Console Lab 1: Setup Linux LAMP EC2 Server",
        objective:
          "By completing this lab, students will learn how to deploy a LAMP stack (Linux, Apache, MySQL, PHP) on an Amazon EC2 instance using the AWS Management Console.",
        tasks: [
          "Create a Key Pair in the AWS EC2 Key Pairs section.",
          "Create a Security Group that allows TCP port 22 (SSH) from your public IP, TCP port 80 (HTTP) from all sources, and TCP port 443 (HTTPS) from all sources.",
          "Launch an EC2 instance using Amazon Linux 2023 (Free Tier) as the AMI.",
          "Choose instance type t2.micro or t3.micro, attach the previously created Key Pair and Security Group, and leave the remaining options at their default settings.",
          "Connect to the EC2 instance over SSH using your key pair and instance IP address.",
          "Install and configure Apache, MySQL, and PHP to build a working LAMP server.",
          "Verify the Apache server by opening the instance IP address in a browser.",
        ],
        submissionInstructions: [
          "Submit a Word document containing screenshots of each step and a working web server.",
          "Make sure each screenshot is clearly labeled.",
        ],
        whyItMattersHeading: "AWS Academy Learning Lab Users",
        whyItMatters:
          "If you are using AWS Academy Learning Lab, remember that AWS CLI access keys change every 4 hours, so you must retrieve and update them as needed. Also, no new IAM roles can be created, so you must use the provided credentials.",
        resourceSections: [
          {
            title: "SSH Connection",
            items: ["ssh -i MyEC2Key.pem ec2-user@YOUR_INSTANCE_IP"],
          },
          {
            title: "LAMP Setup Commands",
            items: [
              "sudo dnf upgrade -y",
              "sudo dnf install -y httpd wget php-fpm php-mysqli php-json php php-devel",
              "sudo dnf install mariadb105-server",
              "sudo systemctl enable httpd",
              "sudo systemctl start httpd",
              "sudo systemctl is-enabled httpd",
            ],
          },
          {
            title: "AWS Documentation",
            items: [
              "https://docs.aws.amazon.com/linux/al2/ug/ec2-lamp-amazon-linux-2.html",
            ],
          },
        ],
      },
      {
        id: "ec2-cli-lab-2-setup-linux-server-ec2-instance",
        title: "EC2 CLI Lab 2: Setup Linux Server EC2 Instance",
        objective:
          "By completing this lab, students will gain hands-on experience in deploying and managing an Amazon EC2 instance using the AWS CLI.",
        tasks: [
          "Configure AWS CLI and authentication credentials.",
          "Create and manage Key Pairs and Security Groups.",
          "Launch an EC2 instance through the AWS CLI using predefined settings.",
          "Establish a secure SSH connection to the instance.",
          "Apply AWS networking and security best practices throughout the workflow.",
        ],
        submissionInstructions: [
          "If you are using AWS Academy Learning Lab, add the option --profile learner or --profile=learner with each command.",
          "AWS CLI access keys change every 4 hours, so retrieve and update them as needed.",
          "No new IAM roles can be created in AWS Academy Learning Lab, so use the provided credentials.",
        ],
        whyItMattersHeading: "AWS Academy Learning Lab Users",
        whyItMatters:
          "Use the provided credentials, refresh temporary access keys as needed, and include the learner profile in each command when working in AWS Academy Learning Lab.",
        resourceSections: [
          {
            title: "Step 1: Configure AWS CLI",
            items: ["aws --version", "aws configure"],
          },
          {
            title: "Step 2: Create a Key Pair",
            items: [
              "Windows users: aws ec2 create-key-pair --key-name MyEC2Key --query 'KeyMaterial' --output text | Out-File -Encoding ascii MyEC2Key.pem",
              "macOS users: aws ec2 create-key-pair --key-name MyEC2Key --query 'KeyMaterial' --output text > MyEC2Key.pem",
              "chmod 400 MyEC2Key.pem",
            ],
          },
          {
            title: "Step 3: Create a Security Group",
            items: [
              'aws ec2 create-security-group --group-name MyEC2SecurityGroup --description "Security group for EC2 Lab"',
            ],
          },
          {
            title: "Step 4: Configure Security Group Rules",
            items: [
              "Find your public IP at https://whatismyipaddress.com/ or replace YOUR_PUBLIC_IP/32 with 0.0.0.0/0.",
              "Depending on your network, only CIDR 0.0.0.0/0 might allow you to SSH into the server.",
              "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 22 --cidr YOUR_PUBLIC_IP/32",
              "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 22 --cidr 0.0.0.0/0",
              "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 80 --cidr 0.0.0.0/0",
              "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 443 --cidr 0.0.0.0/0",
            ],
          },
          {
            title: "Step 5: Launch the EC2 Instance",
            items: [
              "Find an updated AMI in the AWS Web Console for the AWS Region where the instance will be deployed.",
              "aws ec2 run-instances --image-id ami-005c06c6de69aee84 --instance-type t2.micro --key-name MyEC2Key --security-groups MyEC2SecurityGroup",
            ],
          },
          {
            title: "Step 6: Connect to the EC2 Instance via SSH",
            items: [
              "aws ec2 describe-instances --query 'Reservations[*].Instances[*].PublicIpAddress' --output text",
              "ssh -i MyEC2Key.pem ec2-user@YOUR_INSTANCE_IP",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "EC2: Elastic Compute Cloud",
      questions: [
        {
          id: 1,
          question:
            "Your web application needs four instances to support steady traffic nearly all of the time. On the last day of each month, the traffic triples. What is a cost-effective way to handle this traffic pattern?",
          options: [
            "Run four On-Demand Instances constantly, then add eight more On-Demand Instances on the last day of each month.",
            "Run 12 Reserved Instances all of the time.",
            "Run four On-Demand Instances constantly, then add eight Reserved Instances on the last day of each month.",
            "Run four Reserved Instances constantly, then add eight On-Demand Instances on the last day of each month.",
          ],
        },
        {
          id: 2,
          question:
            "Which of the following must be specified when launching a new Amazon Elastic Compute Cloud (Amazon EC2) instance? (Choose 2 answers)",
          options: [
            "Amazon EC2 instance type",
            "Amazon Machine Image (AMI)",
            "The Amazon EC2 instance ID",
            "Password for the administrator account",
          ],
          multiple: true,
        },
        {
          id: 3,
          question: "How can you connect to a new Linux instance using SSH?",
          options: [
            "Using Multi-Factor Authentication (MFA)",
            "Decrypt the root password.",
            "Using the private half of the instance's key pair",
            "Using a certificate",
          ],
        },
        {
          id: 4,
          question:
            "Which of the following can be used to address an Amazon Elastic Compute Cloud (Amazon EC2) instance over the web? (Choose 2 answers)",
          options: [
            "Public DNS name",
            "Elastic IP address",
            "Instance Hostname",
            "Amazon EC2 instance ID",
          ],
          multiple: true,
        },
        {
          id: 5,
          question:
            "Your instance is associated with two security groups. The first allows Remote Desktop Protocol (RDP) access over port 3389 from Classless Inter-Domain Routing (CIDR) block 72.14.0.0/16. The second allows HTTP access over port 80 from CIDR block 0.0.0.0/0. What traffic can reach your instance?",
          options: [
            "RDP traffic over port 3389 from 72.14.0.0/16 and HTTP traffic over port 80 from 0.0.0.0/0",
            "No traffic is allowed.",
            "RDP and HTTP access from CIDR block 0.0.0.0/0",
            "RDP and HTTP traffic from 72.14.0.0/16",
          ],
        },
        {
          id: 6,
          question:
            "Which instance type is best suited for HPC: High-Performance Computing which is CPU intensive processing?",
          options: ["T3", "C5", "P5", "X1e"],
        },
        {
          id: 7,
          question: "An Amazon Machine Image (AMI) is a ...",
          options: [
            "Virtual machine in the cloud",
            "template that contains a software configuration.",
            "operating system updates.",
            "firewall template",
          ],
        },
        {
          id: 8,
          question:
            "You can run the same Amazon Machine Image on different instance types (for example T3 and C5).",
          options: ["True", "False"],
        },
        {
          id: 9,
          question:
            "Instance stores can be used for a T3 instance root device.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question: "Security groups are ...",
          options: [
            "Stateful — if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.",
            "Stateless - if you send a request from your instance, the response traffic for that request is not allowed to flow in regardless of inbound security group rules.",
          ],
        },
        {
          id: 11,
          question: "Security groups can be changed at any time.",
          options: ["True", "False"],
        },
        {
          id: 12,
          question: "Security groups allow ... (Select 3)",
          options: [
            "All outgoing traffic",
            "Hackers in.",
            "ICMP traffic rules",
            "CIDR notation",
          ],
          multiple: true,
        },
        {
          id: 13,
          question:
            "Public-key cryptography authentication is less secure than password authentication.",
          options: ["True", "False"],
        },
        {
          id: 14,
          question:
            "Which instance type is best suited for accessing huge amounts of data?",
          options: ["P5", "I7i", "R2D2", "X1"],
        },
        {
          id: 15,
          question: "When an instance is terminated it ... (Select 2)",
          options: [
            "the attached Amazon EBS volumes are deleted unless the volume's deleteOnTermination attribute is set to false.",
            "can be restored from AWS free backups",
            "it can be restarted after termination",
            "the instance performs a normal shutdown",
          ],
          multiple: true,
        },
        {
          id: 16,
          question:
            "Amazon EC2 eliminates your need to invest in hardware up front.",
          options: ["True", "False"],
        },
        {
          id: 17,
          question:
            "Amazon Elastic Compute Cloud (Amazon EC2) provides computing capacity in the Amazon Web Services (AWS) cloud.",
          options: ["True", "False"],
        },
        {
          id: 18,
          question:
            "Security groups must be in the same Region as the EC2 instance.",
          options: ["True", "False"],
        },
        {
          id: 19,
          question: "Elastic IP addresses are a ...",
          options: [
            "Stretchable IP Address",
            "Static IPv4 addresses for dynamic cloud computing",
            "Dynamic IPv4 addresses for dynamic cloud computing",
            "Rotating Load Balancing IPv4 address",
          ],
        },
        {
          id: 20,
          question:
            "Reserved Instances make a low, one-time, up-front payment for an instance, reserve it for a one- or three-year term, and pay a significantly lower hourly rate for these instances.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 1,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 2,
          correctAnswer: [0, 1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 3,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 4,
          correctAnswer: [0, 1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 6,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 7,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 8,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 9,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 11,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 12,
          correctAnswer: [0, 2, 3],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 13,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 14,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 15,
          correctAnswer: [0, 3],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 16,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 17,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 18,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 19,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
          questionId: 20,
          correctAnswer: [0],
        },
      ],
    },
    milestone:
      "Complete Module 3 with EC2 deployment, security, lab work, and quiz readiness in place for the next module.",
  },
  {
    id: 4,
    title: "Auto Scaling & Elastic Load Balancer",
    weekLabel: "Week 4",
    dateLabel: "March 9, 2026",
    overview:
      "In this module, students work with Auto Scaling and Elastic Load Balancing, two core AWS services used to build highly available and scalable applications. These tools help applications respond to changing traffic by automatically adjusting instance count and distributing requests efficiently.",
    topicLine: "Scheduled topic: Auto Scaling & Elastic Load Balancer",
    focusAreas: [
      "Auto Scaling Groups and dynamic capacity changes",
      "Classic Load Balancer, Application Load Balancer, and Network Load Balancer",
      "Provisioning and testing scalable AWS infrastructure",
    ],
    objectivesAligned: [
      "Scale and load-balance cloud applications using AWS tools.",
      "Describe important design considerations for scalable cloud applications.",
    ],
    outcomeAlignment: [
      "Builds the scaling and availability skills needed to provision, configure, and test resilient AWS application infrastructure.",
    ],
    syllabusContext: [
      "This module focuses on AWS services that help applications remain available under varying traffic loads.",
      "Students move from single-instance deployment into elastic, traffic-distributed infrastructure design.",
    ],
    starterTasks: [
      "Complete the reading on Auto Scaling and Elastic Load Balancer",
      "Take notes from the lecture and lab demos",
      "Prepare configuration notes and screenshots for the console and CLI labs",
    ],
    artifacts: [
      "Auto Scaling and ELB setup notes",
      "Scalable infrastructure screenshots",
      "Quiz prep and lab validation notes",
    ],
    importantDates: ["Class 60% day: March 20, 2026"],
    assessmentContext: [
      "This module includes reading, lecture demos, class discussion, two labs, and a quiz focused on scalable AWS infrastructure.",
    ],
    moduleSummary: [
      {
        step: "1",
        description:
          "Complete required reading on AutoScale and Elastic Load Balancer.",
      },
      {
        step: "2",
        description: "Listen to the course lecture with lab demos.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Post Assignment.",
      },
      {
        step: "4",
        description: "Complete Lab 1 and Lab 2.",
      },
      {
        step: "5",
        description: "Complete the quiz.",
      },
    ],
    readingHighlights: [
      "Developer Guide: AutoScale-DeveloperGuide.pdf",
      "Read pages 1–38.",
      "Classic Load Balancer",
      "Application Load Balancer",
      "Network Load Balancer",
    ],
    textTasks: [
      {
        id: "classroom-engagement-slack-post-landing-a-job",
        title: "Classroom Engagement - Slack Post Landing a Job",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Research how to land a dream tech job in the real world.",
          "Post two job-hunting tips to the class Slack workspace.",
          "Possible topics include job searching, resume building, writing a cover letter, interviewing tips for tech jobs, and writing a thank-you letter.",
          "Reply to a comment posted by another student.",
        ],
        submissionInstructions: [
          "Post 1: Share two job-hunting tips.",
          "Post 2: Reply to another student's post.",
        ],
        whyItMattersHeading: "Weekly Topic",
        whyItMatters:
          "Landing a Job. Companies are not handing out strong jobs automatically, so developing practical job-hunting skills is part of building a successful tech career.",
      },
      {
        id: "lab-1-application-load-balancer-auto-scaling-web-interface",
        title:
          "Lab 1 Application Load Balancer & Auto Scaling Web Servers via Web Interface",
        objective:
          "In this lab, you will use the AWS Web Console to create a highly available and scalable web application. You will set up an Application Load Balancer with an Auto Scaling Group and a Launch Template to provision Amazon Linux 2023 instances running Apache web services.",
        tasks: [
          "Create a Launch Template named WebServerTemplate using Amazon Linux 2023, a t3.micro or t2.micro instance type, a key pair, a security group that allows HTTP and SSH, and the provided user data script.",
          "Create an internet-facing Application Load Balancer named WebApp-ALB in at least two Availability Zones and configure a target group that uses HTTP on port 80 with /index.html as the health check path.",
          "Create an Auto Scaling Group named WebApp-ASG using the launch template, attach it to the existing load balancer target group, enable ELB health checks, and set desired capacity to 2 with a maximum of 4.",
          "Test the deployment by waiting for healthy targets, copying the ALB DNS name, opening the site in a browser, refreshing to observe load balancing behavior, and opening /phpinfo.php.",
          "Optionally test auto scaling with CPU load and observe scale-out activity in CloudWatch and the ASG activity tab.",
        ],
        submissionInstructions: [
          "Capture screenshots of the launch template summary showing the AMI, instance type, and user data.",
          "Capture screenshots of the Application Load Balancer details page, target group health, Auto Scaling Group dashboard, the web application in the browser, and the phpinfo.php page.",
          "If you created resources only for this lab, clean them up afterward to avoid ongoing AWS charges.",
        ],
        whyItMattersHeading: "Key Learning Outcomes",
        whyItMatters:
          "This lab demonstrates how to configure launch templates, Application Load Balancers, and Auto Scaling Groups to build a highly available, scalable, and production-style AWS web application architecture.",
        resourceSections: [
          {
            title: "Prerequisites",
            items: [
              "This lab can be completed in AWS Academy Learner Lab or a personal AWS account.",
              "Basic familiarity with EC2, VPC, and IAM is recommended.",
              "Basic web server concepts and Linux administration knowledge are helpful.",
              "Access to the AWS Management Console with the required permissions is needed.",
            ],
          },
          {
            title: "Step 1: Create a Launch Template",
            items: [
              "Go to the EC2 Dashboard, open Launch Templates, and click Create Launch Template.",
              "Launch Template Name: WebServerTemplate",
              "Template Version Description: Amazon Linux 2023 LAMP Stack",
              "AMI: Amazon Linux 2023 (latest version)",
              "Instance Type: t3.micro or t2.micro",
              "Select or create a key pair.",
              "Select or create a security group allowing HTTP (80) and SSH (22).",
            ],
          },
          {
            title: "User Data Script",
            items: [
              "#!/bin/bash",
              "# Amazon Linux 2023 LAMP Stack Installation Script",
              "sudo dnf update -y",
              "sudo dnf install -y httpd",
              "sudo systemctl enable httpd",
              "sudo systemctl start httpd",
              "sudo dnf install -y mariadb-server",
              "sudo systemctl enable mariadb",
              "sudo systemctl start mariadb",
              "sudo dnf install -y php php-mysqlnd php-fpm php-gd php-xml php-mbstring php-json php-opcache",
              "sudo systemctl enable php-fpm",
              "sudo systemctl start php-fpm",
              "sudo usermod -a -G apache ec2-user",
              "sudo chown -R ec2-user:apache /var/www",
              "sudo chmod 2775 /var/www",
              "sudo find /var/www -type d -exec chmod 2775 {} \\;",
              "sudo find /var/www -type f -exec chmod 0664 {} \\;",
              'echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php',
              'echo "Welcome to My First Auto Scaling Group" > /var/www/html/index.html',
              "sudo systemctl restart httpd",
            ],
          },
          {
            title: "Step 2: Create an Application Load Balancer",
            items: [
              "In the EC2 Dashboard, open Load Balancers and click Create Load Balancer.",
              "Select Application Load Balancer.",
              "Name: WebApp-ALB",
              "Scheme: Internet-facing",
              "IP address type: IPv4",
              "Choose your default or custom VPC.",
              "Select at least two Availability Zones and their public subnets.",
              "Allow HTTP (80) from 0.0.0.0/0 and optionally HTTPS (443) from 0.0.0.0/0.",
              "Target Type: Instances",
              "Protocol: HTTP",
              "Port: 80",
              "Health Check Path: /index.html",
              "Health Check Interval: 30 seconds",
              "Healthy Threshold: 2",
              "Unhealthy Threshold: 5",
            ],
          },
          {
            title: "Step 3: Create an Auto Scaling Group",
            items: [
              "Open Auto Scaling Groups and click Create Auto Scaling Group.",
              "Auto Scaling Group Name: WebApp-ASG",
              "Launch Template: WebServerTemplate",
              "Version: Latest",
              "Choose the same VPC and subnets used for the ALB.",
              "Attach the existing target group created with the ALB.",
              "Enable ELB health checks.",
              "Health Check Grace Period: 300 seconds",
              "Desired Capacity: 2",
              "Minimum Capacity: 2",
              "Maximum Capacity: 4",
              "Optional scaling policy: Target tracking based on Average CPU Utilization at 70%.",
            ],
          },
          {
            title: "Step 4: Test Your Deployment",
            items: [
              "Allow 5 to 10 minutes for instances to launch and pass health checks.",
              'Verify that 2 instances are running and show as "InService".',
              'Confirm all targets show as "Healthy" in the ALB target group.',
              "Copy the ALB DNS name from the load balancer details page.",
              "Open the DNS name in a browser.",
              "Refresh multiple times to observe different instance IDs.",
              "Append /phpinfo.php to the URL and verify the PHP page loads.",
            ],
          },
          {
            title: "Expected Results",
            items: [
              'The web page displays "Auto Scaling Web Server" with instance information.',
              "Different instance IDs appear when refreshing the page.",
              "The PHP info page loads successfully with PHP 8.x configuration.",
              'All health checks show as "Healthy" in the AWS Console.',
            ],
          },
          {
            title: "Step 5: Test Auto Scaling (Optional)",
            items: [
              "Connect to one of your instances through SSH.",
              "Install the stress tool: sudo dnf install -y stress",
              "Run a CPU stress test: stress --cpu 2 --timeout 600s",
              "Monitor CloudWatch metrics for CPU utilization.",
              "Observe Auto Scaling events in the ASG Activity tab.",
              "Watch for new instances to launch when CPU exceeds 70%.",
            ],
          },
          {
            title: "Architecture Benefits Demonstrated",
            items: [
              "High availability through Multi-AZ deployment.",
              "Scalability through automatic scaling based on demand.",
              "Traffic distribution across healthy instances.",
              "Health monitoring with automatic replacement of failed instances.",
              "Cost optimization by using only the resources needed.",
              "Improved security by placing access behind a load balancer.",
            ],
          },
          {
            title: "Cleanup Instructions",
            items: [
              "Set the Auto Scaling Group desired capacity to 0, then delete the ASG.",
              "Delete the Application Load Balancer and its target groups.",
              "Delete the launch template.",
              "Delete any custom security groups created for the lab.",
              "Delete any key pairs created specifically for the lab.",
            ],
          },
          {
            title: "Troubleshooting Tips",
            items: [
              "If instances are not healthy, confirm the security groups allow HTTP traffic on port 80.",
              "If the web page is not loading, verify the user data script completed successfully by checking the instance logs.",
              "If the load balancer times out, confirm the health check path is /index.html.",
              "If Auto Scaling does not react, verify the CloudWatch alarms and scaling configuration.",
              "If SSH access is denied, make sure the key pair is correct and the security group allows SSH.",
            ],
          },
        ],
      },
      {
        id: "lab-2-application-load-balancer-auto-scaling-group-cli",
        title:
          "Lab 2 Application Load Balancer with Auto Scaling Group via CLI",
        objective:
          "In this lab, you will use the AWS Command Line Interface to deploy an Application Load Balancer with a Target Group and an Auto Scaling Group. You will configure a Launch Template to provision Amazon Linux 2023 instances running Apache Web Server and reinforce cloud automation skills with industry-standard infrastructure-as-code practices.",
        tasks: [
          "Configure the AWS CLI and set the default region to us-east-1 using the learner profile.",
          "Retrieve the latest Amazon Linux 2023 AMI ID and gather your VPC, subnet, and security group information.",
          "Create a Launch Template that provisions Amazon Linux 2023 instances with Apache, PHP, and MariaDB.",
          "Create a Target Group, an Application Load Balancer, and a Listener that forwards traffic to the target group.",
          "Create an Auto Scaling Group that uses the Launch Template and attaches instances to the Target Group.",
          "Verify the ALB DNS name, Auto Scaling Group instance health, and Target Group health before testing the web application in the browser.",
          "Clean up all AWS resources in the required order to avoid dependency errors.",
        ],
        submissionInstructions: [
          "Capture terminal screenshots showing successful CLI command execution.",
          "Capture AWS Console screenshots showing the Auto Scaling Group, Target Group health, and ALB configuration.",
          "Capture a browser screenshot showing the web application with the server hostname and timestamp.",
        ],
        whyItMattersHeading: "Why ALB Instead of Classic ELB?",
        whyItMatters:
          "AWS has deprecated Classic Load Balancers. The Application Load Balancer is the current standard for HTTP and HTTPS workloads, operates at Layer 7, supports content-based routing, and integrates with Target Groups for flexible health checks and traffic management. These are the patterns used in production environments and covered on the AWS Solutions Architect Associate exam.",
        resourceSections: [
          {
            title: "Prerequisites",
            items: [
              "This lab can be completed in either the AWS Learner Lab or a personal AWS account.",
              "It is recommended to complete this lab in the Learner Lab environment.",
              "Ensure the AWS CLI is installed and configured on your system.",
              "Basic understanding of AWS CLI commands and JSON formatting is recommended.",
            ],
          },
          {
            title: "Important Notes",
            items: [
              "Classic Load Balancers are deprecated, so this lab uses an Application Load Balancer.",
              "Launch Configurations are deprecated, so use Launch Templates instead.",
              "Use --profile=learner for AWS CLI commands in AWS Academy.",
              "Update AWS CLI credentials before starting because Learner Lab credentials expire every 4 hours.",
              "Amazon Linux 2023 uses dnf instead of yum.",
              "Replace placeholder values such as sg-xxxxxxxx, subnet-xxxxxxxx, and vpc-xxxxxxxx with your real resource IDs.",
            ],
          },
          {
            title: "Architecture Overview",
            items: [
              "Internet",
              "Application Load Balancer (ALB)",
              "Target Group (HTTP:80)",
              "EC2 instances across multiple Availability Zones managed by an Auto Scaling Group",
              "The ALB distributes HTTP traffic to instances registered in the Target Group, and the ASG automatically registers new instances and replaces unhealthy ones.",
            ],
          },
          {
            title: "Step 1: Configure AWS CLI and Set Your Default Region",
            items: ["aws configure set region us-east-1 --profile=learner"],
          },
          {
            title: "Step 2: Get the Latest Amazon Linux 2023 AMI ID",
            items: [
              'aws ec2 describe-images --owners amazon --filters "Name=name,Values=al2023-ami-*" "Name=architecture,Values=x86_64" "Name=virtualization-type,Values=hvm" --query \'Images | sort_by(@, &CreationDate) | [-1].ImageId\' --output text --profile=learner',
              "Save the returned AMI ID for the launch template step.",
            ],
          },
          {
            title: "Step 3: Gather VPC, Subnet, and Security Group Information",
            items: [
              'Get the default VPC ID: aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text --profile=learner',
              'Get subnet IDs in at least two Availability Zones: aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-xxxxxxxx" --query "Subnets[*].[SubnetId,AvailabilityZone]" --output table --profile=learner',
              'Get the security group ID: aws ec2 describe-security-groups --filters "Name=vpc-id,Values=vpc-xxxxxxxx" --query "SecurityGroups[*].[GroupId,GroupName]" --output table --profile=learner',
              "If needed, allow inbound HTTP traffic on port 80: aws ec2 authorize-security-group-ingress --group-id sg-xxxxxxxx --protocol tcp --port 80 --cidr 0.0.0.0/0 --profile=learner",
            ],
          },
          {
            title: "Step 4: Create a Launch Template",
            items: [
              "Windows users can store the UserData script in a PowerShell variable, Base64-encode it, retrieve the latest AL2023 AMI ID, build a JSON launch template payload, and run aws ec2 create-launch-template.",
              "macOS/Linux users can retrieve the latest AL2023 AMI ID, Base64-encode the UserData script with a heredoc, and run aws ec2 create-launch-template with the resulting JSON payload.",
              "Launch Template Name: MyWebServerTemplate",
              "Version Description: Amazon Linux 2023 Version",
              "Instance Type: t3.micro",
              "KeyName: MyKeyPair",
              "SecurityGroupIds: sg-xxxxxxxx",
            ],
          },
          {
            title: "Launch Template UserData",
            items: [
              "#!/bin/bash",
              "dnf update -y",
              "dnf install -y httpd php php-mysqlnd mariadb105",
              "systemctl start httpd",
              "systemctl enable httpd",
              "usermod -a -G apache ec2-user",
              "chown -R ec2-user:apache /var/www",
              "chmod 2775 /var/www",
              "find /var/www -type d -exec chmod 2775 {} \\;",
              "find /var/www -type f -exec chmod 0664 {} \\;",
              'echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php',
              'echo "<h1>Welcome to My First Auto Scaling Group</h1>" > /var/www/html/index.html',
              'echo "<p>Server: $(hostname)</p>" >> /var/www/html/index.html',
              'echo "<p>Timestamp: $(date)</p>" >> /var/www/html/index.html',
              "systemctl start php-fpm",
              "systemctl enable php-fpm",
            ],
          },
          {
            title: "Step 5: Create a Target Group",
            items: [
              "aws elbv2 create-target-group --name MyWebServer-TG --protocol HTTP --port 80 --vpc-id vpc-xxxxxxxx --target-type instance --health-check-protocol HTTP --health-check-path /index.html --health-check-interval-seconds 30 --health-check-timeout-seconds 5 --healthy-threshold-count 2 --unhealthy-threshold-count 3 --profile=learner",
              "Save the TargetGroupArn value for the next steps.",
            ],
          },
          {
            title: "Step 6: Create an Application Load Balancer",
            items: [
              "aws elbv2 create-load-balancer --name MyWebServer-ALB --subnets subnet-xxxxxxxx subnet-yyyyyyyy --security-groups sg-xxxxxxxx --scheme internet-facing --type application --ip-address-type ipv4 --profile=learner",
              "Save the LoadBalancerArn value.",
              "Create the listener: aws elbv2 create-listener --load-balancer-arn <LoadBalancerArn> --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=<TargetGroupArn> --profile=learner",
              "An ALB consists of the load balancer, the listener, and the target group.",
            ],
          },
          {
            title: "Step 7: Create an Auto Scaling Group",
            items: [
              'aws autoscaling create-auto-scaling-group --auto-scaling-group-name MyAutoScalingGroup --launch-template "LaunchTemplateName=MyWebServerTemplate,Version=$Latest" --min-size 2 --max-size 4 --desired-capacity 2 --vpc-zone-identifier "subnet-xxxxxxxx,subnet-yyyyyyyy" --target-group-arns "<TargetGroupArn>" --health-check-type ELB --health-check-grace-period 300 --profile=learner',
              "With ALB, the ASG attaches to the Target Group ARN rather than directly to the load balancer.",
            ],
          },
          {
            title: "Step 8: Verify and Test Your Setup",
            items: [
              'Get the ALB DNS name: aws elbv2 describe-load-balancers --names MyWebServer-ALB --query "LoadBalancers[0].DNSName" --output text --profile=learner',
              'Check ASG status: aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names MyAutoScalingGroup --query "AutoScalingGroups[0].Instances[*].[InstanceId,AvailabilityZone,LifecycleState,HealthStatus]" --output table --profile=learner',
              "Check target health: aws elbv2 describe-target-health --target-group-arn <TargetGroupArn> --profile=learner",
              "Wait until all targets show healthy before testing in the browser.",
            ],
          },
          {
            title: "Step 9: Test the Web Application",
            items: [
              "Open the ALB DNS name in a browser.",
              "Verify the page displays the Auto Scaling message, server hostname, and timestamp.",
              "Refresh multiple times to see different server hostnames.",
              "Test the PHP page by appending /phpinfo.php to the URL.",
            ],
          },
          {
            title: "Cleanup",
            items: [
              "Delete the Auto Scaling Group with --force-delete.",
              "Describe and delete the ALB listener before deleting the ALB.",
              "Delete the Application Load Balancer.",
              "Delete the Target Group after the ALB is removed.",
              "Delete the Launch Template.",
            ],
          },
          {
            title: "Common Mistakes & Troubleshooting",
            items: [
              "If targets show unhealthy, confirm the security group allows HTTP port 80 and Apache is running.",
              "If you get a two-subnet/AZ error, select subnets from different Availability Zones.",
              "If the launch template or target group name already exists, delete the old resource or use a new name.",
              "If credentials are expired, refresh the Learner Lab credentials and update the learner profile.",
              "If the browser shows a 504 timeout, wait a few minutes for instances to boot and pass health checks.",
              "If there is no default VPC, list all VPCs and use the correct VPC ID.",
              "If the UserData script did not run, check cloud-init logs and verify the script encoding.",
              "If the Target Group cannot be deleted, remove the ALB listener first.",
              "If the same hostname appears on every refresh, verify both targets are healthy and bypass browser cache.",
            ],
          },
          {
            title: "Required Screenshots for Submission",
            items: [
              "CLI commands executing successfully in the terminal.",
              "AWS Console view of the Auto Scaling Group with active instances.",
              "Target Group targets showing healthy status.",
              "ALB details page with listener and target group configuration.",
              "Browser screenshot of the web application with server hostname and timestamp.",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "Auto Scaling & Elastic Load Balancers",
      questions: [
        {
          id: 1,
          question:
            "Which of the following are required elements of an Auto Scaling group? (Choose 2 answers)",
          options: [
            "Minimum size",
            "Health checks",
            "Desired capacity",
            "Launch configuration",
          ],
          multiple: true,
        },
        {
          id: 2,
          question:
            "Which of the following are the minimum required elements to create an Auto Scaling launch configuration?",
          options: [
            "Launch configuration name, AMI, instance type, and key pair",
            "Launch configuration name, AMI, instance type, key pair, security group, and block device mapping",
            "Launch configuration name, Amazon Machine Image (AMI), and instance type",
            "Launch configuration name, AMI, instance type, key pair, and security group",
          ],
        },
        {
          id: 3,
          question:
            "Which of the following must be configured on an Elastic Load Balancing load balancer to accept incoming traffic?",
          options: [
            "A listener",
            "A network interface",
            "A port",
            "An instance",
          ],
        },
        {
          id: 4,
          question:
            "Your web application front end consists of multiple Amazon Compute Cloud (Amazon EC2) instances behind an Elastic Load Balancing load balancer. You have configured the load balancer to perform health checks on these Amazon EC2 instances. If an instance fails to pass health checks, which statement will be true?",
          options: [
            "The instance is terminated automatically by the load balancer.",
            "The instance is quarantined by the load balancer for root cause analysis.",
            "The load balancer stops sending traffic to the instance that failed its health check.",
            "The instance is replaced automatically by the load balancer.",
          ],
        },
        {
          id: 5,
          question:
            "For an application running in the ap-northeast-1 region with three Availability Zones (ap-northeast-1a, ap-northeast-1b, and ap-northeast-1c), which instance deployment provides high availability for the application that normally requires nine running Amazon Elastic Compute Cloud (Amazon EC2) instances but can run on a minimum of 65 percent capacity while Auto Scaling launches replacement instances in the remaining Availability Zones?",
          options: [
            "Deploy the application on four servers in ap-northeast-1a and five servers in ap-northeast-1b, and keep five stopped instances in ap-northeast-1a as reserve.",
            "Deploy the application on nine servers in ap-northeast-1b, and keep nine stopped instances in ap-northeast-1a as reserve.",
            "Deploy the application on six servers in ap-northeast-1b and three servers in ap-northeast-1c.",
            "Deploy the application on three servers in ap-northeast-1a, three servers in ap-northeast-1b, and three servers in ap-northeast-1c.",
          ],
        },
        {
          id: 6,
          question:
            "Which of the following are characteristics of the Auto Scaling service on AWS? (Select 3)",
          options: [
            "Enforces a minimum number of running Amazon EC2 instances",
            "Sends traffic to only healthy instances",
            "Responds to changing conditions by adding or terminating Amazon Elastic Compute Cloud (Amazon EC2) instances",
            "Launches instances from a specified Amazon Machine Image (AMI)",
          ],
          multiple: true,
        },
        {
          id: 7,
          question: "An Auto Scaling group may use: (Choose 2 answers)",
          options: [
            "Terminated instances",
            "On-Demand Instances",
            "Spot Instances",
            "Already running instances if they use the same Amazon Machine Image (AMI) as the Auto Scaling group's launch configuration and are not already part of another Auto Scaling group",
          ],
          multiple: true,
        },
        {
          id: 8,
          question:
            "Elastic Load Balancing supports which of the following types of load balancers? (Choose 2 answers)",
          options: ["WWW", "Extranet", "Internet Facing", "Internal"],
          multiple: true,
        },
        {
          id: 9,
          question: "Auto Scaling groups always remain the same size.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "Elastic Load Balancers are only good for balancing the load.",
          options: ["True", "False"],
        },
        {
          id: 11,
          question: "Elastic load balancers only exist in one AZ.",
          options: ["True", "False"],
        },
        {
          id: 12,
          question:
            "Which of the below is true about the Application Load Balancer? (Select 3)",
          options: [
            "Supports HTTP and HTTPS",
            "Prevents all SSL traffic",
            "Runs on Layer 7",
            "Supports WebSockets",
          ],
          multiple: true,
        },
        {
          id: 13,
          question:
            "Which of the below is true about the Network Load Balancer? (Select 3)",
          options: [
            "No network packet header modification",
            "Functions at Layer 6",
            "Supports static IP address",
            "Best support for high-traffic sites",
          ],
          multiple: true,
        },
        {
          id: 14,
          question:
            "A single Elastic Load Balancer can have multiple listeners?",
          options: ["True", "False"],
        },
        {
          id: 15,
          question: "Load Balancers are free.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 1,
          correctAnswer: [0, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 2,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 3,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 4,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 5,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 6,
          correctAnswer: [0, 2, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 7,
          correctAnswer: [1, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 8,
          correctAnswer: [2, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 9,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 10,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 11,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 12,
          correctAnswer: [0, 2, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 13,
          correctAnswer: [0, 2, 3],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 14,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
          questionId: 15,
          correctAnswer: [1],
        },
      ],
    },
    milestone:
      "Complete Module 4 with Auto Scaling and Elastic Load Balancer concepts, labs, and quiz readiness in place for the next module.",
  },
  {
    id: 5,
    title: "Containers, Kubernetes & Amazon EKS",
    weekLabel: "Week 5",
    dateLabel: "March 16, 2026",
    overview:
      "This module dives into Containers, Kubernetes, and Amazon Elastic Kubernetes Service (EKS), giving students a solid understanding of how to manage containerized applications at scale. It introduces Kubernetes as an open-source system for deploying, scaling, and managing containers and builds hands-on experience with Amazon EKS clusters and workloads.",
    topicLine: "Scheduled topic: Containers, Kubernetes & Amazon EKS",
    focusAreas: [
      "Containers and Kubernetes fundamentals",
      "Amazon EKS cluster and workload deployment",
      "Cloud automation for containerized applications",
    ],
    objectivesAligned: [
      "Describe the architectural approach used by AWS.",
      "Describe important design considerations for scalable cloud applications.",
    ],
    outcomeAlignment: [
      "Builds hands-on skill with container orchestration, scalable workloads, and Amazon EKS automation practices.",
    ],
    syllabusContext: [
      "This module introduces the concepts and tools needed to run containerized applications reliably across environments.",
      "It moves the course from basic compute and scaling into managed orchestration with Kubernetes and Amazon EKS.",
    ],
    starterTasks: [
      "Complete the required reading on Kubernetes and Amazon EKS",
      "Take notes from the lecture and lab demos",
      "Prepare screenshots and notes for cluster setup and workload deployment",
    ],
    artifacts: [
      "Kubernetes and EKS setup notes",
      "Cluster deployment screenshots",
      "Quiz prep and workload validation notes",
    ],
    importantDates: ["Guaranteed W withdrawal deadline: March 28, 2026"],
    assessmentContext: [
      "This module includes reading, lecture demos, class discussion, a Kubernetes and EKS lab, and a quiz.",
    ],
    moduleSummary: [
      {
        step: "1",
        description: "Complete required reading on Kubernetes and Amazon EKS.",
      },
      {
        step: "2",
        description: "Listen to the course lecture with lab demos.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Post Assignment.",
      },
      {
        step: "4",
        description:
          "Complete the lab: Learn Kubernetes Basics and Amazon EKS.",
      },
      {
        step: "5",
        description: "Complete the Kubernetes and Amazon EKS quiz.",
      },
    ],
    textTasks: [
      {
        id: "classroom-engagement-slack-post",
        title: "Classroom Engagement - Slack Post",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Choose a discussion topic related to class assignment issues, comments, tips, recommendations, or questions.",
          "You may also post comments on the module topic, including any reading, lecture, or additional resources.",
          "You may share an AWS, cloud, or technology news article.",
          "You may share an AWS-related blog example such as https://aws.amazon.com/blogs/aws/.",
          "Post a screenshot of your Slack discussion entry to Canvas.",
        ],
        submissionInstructions: [
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation in this college-level course in all correspondence.",
          'Avoid "text" or "Twitter speak" when corresponding.',
          "Post early and often during the week the discussion board is open.",
        ],
        whyItMattersHeading: "Tip",
        whyItMatters:
          "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
        resourceSections: [
          {
            title: "Discussion Guidelines",
            items: [
              "Your entry should be at least 2 to 5 sentences in length.",
              "Your entry can be a new entry or a reply to another student.",
              "Use professional grammar and punctuation in all correspondence.",
              'Avoid "text" or "Twitter speak" when corresponding.',
              "The Slack workspace should represent an ongoing discussion related to the subject matter under consideration.",
              "Students should post early and often during the week the discussion board is open.",
            ],
          },
        ],
      },
      {
        id: "kubernetes-optional-extra-credit-lab",
        title:
          "Lab 1: Kubernetes (Optional: Extra Credit) Kubernetes Interactive Tutorial with Minikube",
        objective:
          "In this lab, you will complete the Interactive Kubernetes Tutorial using Minikube on your local computer. This hands-on exercise provides practical experience with Kubernetes deployment, management, and troubleshooting in a safe local environment before working with cloud-based clusters.",
        tasks: [
          "Install a container runtime such as Docker Desktop or Podman.",
          "Install kubectl and Minikube for your operating system.",
          "Start a local Minikube cluster and verify it is running.",
          "Complete both required tutorials: Hello Minikube and Kubernetes Basics.",
          "Optionally deploy the Guestbook multi-tier application for extra practice.",
          "Capture screenshots that demonstrate each major setup, deployment, scaling, and troubleshooting milestone.",
        ],
        submissionInstructions: [
          "Create a Microsoft Word document with labeled screenshots demonstrating each major step.",
          "Include brief explanations for each screenshot.",
          "Show the full terminal window with the command and complete output whenever possible.",
          "Keep screenshots in chronological order matching the tutorial steps.",
          "Make sure the final document is clear, readable, organized, and professional.",
        ],
        whyItMattersHeading: "What is Minikube?",
        whyItMatters:
          "Minikube runs a single-node Kubernetes cluster on your local machine. It is ideal for learning Kubernetes, testing applications locally, and building confidence before working with managed Amazon EKS clusters in the cloud.",
        resourceSections: [
          {
            title: "Learning Outcomes",
            items: [
              "Install and configure a local Kubernetes development environment.",
              "Deploy containerized applications using kubectl.",
              "Understand Kubernetes core concepts such as Pods, Services, and Deployments.",
              "Manage and scale applications in Kubernetes.",
              "Troubleshoot common Kubernetes issues.",
              "Build confidence before working with production EKS clusters.",
            ],
          },
          {
            title: "Prerequisites",
            items: [
              "Computer requirements: minimum 2 CPU cores, 4 GB RAM, and 20 GB free disk space.",
              "Operating system: Windows 10 or 11, macOS 10.15 or later, or Linux.",
              "Administrator access to install software.",
              "Internet connection for downloading tools and container images.",
              "Estimated time commitment: approximately 2 to 3 hours.",
            ],
          },
          {
            title: "Step 1: Install Container Runtime",
            items: [
              "Docker Desktop is recommended for beginners and is free for personal and educational use.",
              "Windows verification commands: docker --version and docker run hello-world.",
              "macOS verification commands: docker --version and docker run hello-world.",
              "Podman is an open-source alternative available for Windows, Mac, and Linux.",
            ],
          },
          {
            title: "Step 2: Install kubectl",
            items: [
              "Windows with Chocolatey: choco install kubernetes-cli then kubectl version --client.",
              "macOS with Homebrew: brew install kubectl then kubectl version --client.",
              "Linux: download the latest kubectl binary, make it executable, move it into /usr/local/bin, then run kubectl version --client.",
              "kubectl is the command-line tool used to manage deployments, services, pods, and other Kubernetes resources.",
            ],
          },
          {
            title: "Step 3: Install Minikube",
            items: [
              "Windows with Chocolatey: choco install minikube then minikube version.",
              "macOS with Homebrew: brew install minikube then minikube version.",
              "Linux: install the Minikube binary into /usr/local/bin and verify with minikube version.",
              "Minikube creates a local Kubernetes cluster for learning and development.",
            ],
          },
          {
            title: "Step 4: Start Minikube Cluster",
            items: [
              "Start the cluster with minikube start --driver=docker.",
              "Optional resource-specific start: minikube start --driver=docker --cpus=2 --memory=4096.",
              "Verify with minikube status, kubectl cluster-info, kubectl get nodes, and kubectl get pods -A.",
              "Optional dashboard command: minikube dashboard.",
              "Common startup issues include Docker not running, port conflicts, insufficient system resources, or VPN-related image download failures.",
            ],
          },
          {
            title: "Step 5: Complete Interactive Tutorials",
            items: [
              "Tutorial 1 required: Hello Minikube.",
              "Key commands include kubectl create deployment hello-node --image=registry.k8s.io/echoserver:1.4, kubectl get deployments, kubectl get pods, kubectl expose deployment hello-node --type=LoadBalancer --port=8080, kubectl get services, and minikube service hello-node.",
              "Tutorial 2 required: Kubernetes Basics Interactive Tutorial.",
              "Complete all six modules: Create a Cluster, Deploy an App, Explore Your App, Expose Your App Publicly, Scale Your App, and Update Your App.",
              "Important tutorial commands include kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1, kubectl describe pods, kubectl logs, kubectl exec -ti <pod-name> -- bash, kubectl scale deployments/kubernetes-bootcamp --replicas=4, kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2, and kubectl rollout undo deployments/kubernetes-bootcamp.",
            ],
          },
          {
            title: "Step 6: Additional Practice",
            items: [
              "Deploy the Guestbook application with Redis for extra practice.",
              "Create Redis master and slave resources using kubectl apply -f with the Kubernetes example manifests.",
              "Create the Guestbook frontend and view all resources with kubectl get all.",
              "Access the app with minikube service frontend.",
              "Clean up with kubectl delete -f https://k8s.io/examples/application/guestbook/ when finished.",
            ],
          },
          {
            title: "Step 7: Useful kubectl Commands Reference",
            items: [
              "Cluster information: kubectl cluster-info, kubectl get nodes, kubectl get componentstatuses.",
              "Pods: kubectl get pods, kubectl get pods -o wide, kubectl describe pod <name>, kubectl logs <name>, kubectl logs -f <name>, kubectl exec -it <name> -- /bin/bash.",
              "Deployments: kubectl get deployments, kubectl describe deployment <name>, kubectl scale deployment <name> --replicas=5, kubectl rollout status deployment/<name>, kubectl rollout history deployment/<name>, kubectl rollout undo deployment/<name>.",
              "Services and namespaces: kubectl get services, kubectl describe service <name>, kubectl get endpoints, kubectl get namespaces, kubectl get pods --all-namespaces, kubectl get pods -n <namespace>.",
              "Creation and deletion: kubectl create deployment <name> --image=<image>, kubectl expose deployment <name> --port=<port> --type=<type>, kubectl apply -f <file>, kubectl delete pod <name>, kubectl delete deployment <name>, kubectl delete service <name>, kubectl delete -f <file>.",
            ],
          },
          {
            title: "Clean Up Resources",
            items: [
              "Delete all deployments with kubectl delete deployment --all.",
              "Delete all services with kubectl delete service --all.",
              "Stop the cluster with minikube stop.",
              "Delete the cluster with minikube delete if you want a fresh start later.",
              "Restart later with minikube start.",
            ],
          },
          {
            title: "Screenshot Requirements for Submission",
            items: [
              "Installation verification: Docker version, kubectl version, and Minikube version.",
              "Cluster startup: Minikube start output, Minikube status, and kubectl get nodes.",
              "Hello Minikube tutorial: deployment creation, deployments list, pods list, service exposure, and browser view of the app.",
              "Kubernetes Basics tutorial: app deployment, pod details, logs, service creation, scaling, scaled pods, image update, and rollout status.",
              "Optional practice: Guestbook deployment, kubectl get all, and browser view of the Guestbook app.",
            ],
          },
          {
            title: "Screenshot Best Practices",
            items: [
              "Include timestamps in terminal screenshots.",
              "Make command prompts and outputs clearly visible.",
              "Add descriptive captions in the Word document.",
              "Show the full browser URL in browser screenshots.",
              "Organize screenshots in chronological order and use highlighting or annotations when helpful.",
            ],
          },
          {
            title: "Troubleshooting Common Issues",
            items: [
              "If Minikube will not start, make sure Docker Desktop is running, then try minikube delete followed by minikube start.",
              "If kubectl commands are not working, verify the context with kubectl config current-context and switch with kubectl config use-context minikube.",
              "If you cannot access the service in a browser, use minikube service <service-name> instead of a direct URL.",
              "If images will not download, check your internet connection, disable VPN temporarily, or configure a proxy if needed.",
              'If Pods are stuck in "Pending" state, run kubectl describe pod <name> and inspect resource, image, or node issues.',
            ],
          },
          {
            title: "Additional Learning Resources",
            items: [
              "Official Kubernetes Documentation.",
              "Minikube Official Documentation.",
              "kubectl Cheat Sheet.",
              "Additional Kubernetes Tutorials.",
              "Katacoda Interactive Scenarios (browser-based).",
            ],
          },
          {
            title: "Submission Checklist",
            items: [
              "Cover page with your name, date, and assignment title.",
              "All required installation verification screenshots.",
              "Cluster startup screenshots.",
              "Complete Hello Minikube tutorial screenshots.",
              "Complete Kubernetes Basics tutorial screenshots.",
              "Clear labels and captions for each screenshot.",
              "Brief explanations of what each screenshot demonstrates.",
              "Timestamps visible in terminal screenshots.",
              "Screenshots that are clear, readable, and professionally organized.",
            ],
          },
        ],
      },
      {
        id: "amazon-eks-cluster-deployment",
        title: "Lab 2: Amazon EKS Cluster Deployment",
        objective:
          "In this lab, you will create an Amazon EKS cluster step by step using the AWS Management Console. You will manually create IAM roles, configure networking, deploy a managed node group with t3.micro instances, and deploy a sample containerized application so you can understand how EKS integrates with IAM, VPC, and EC2.",
        tasks: [
          "Create or reuse the required IAM roles for the EKS control plane and worker nodes.",
          "Create the EKS cluster with Custom configuration and turn EKS Auto Mode off.",
          "Configure kubectl to communicate with the cluster.",
          "Create a managed node group with Amazon Linux 2023 and t3.micro instances.",
          "Deploy and expose a sample NGINX application.",
          "Optionally deploy the Guestbook application for additional Kubernetes practice.",
          "Clean up the cluster, node group, services, and any related AWS resources immediately after the lab.",
        ],
        submissionInstructions: [
          "Create a Word document with labeled screenshots for each required milestone.",
          'Include the EKS cluster showing "Active" status.',
          'Include the node group showing "Active" status.',
          'Include terminal output from kubectl get nodes showing all nodes in "Ready" status.',
          "Include the NGINX deployment and service output, including the external load balancer address.",
          'Include a browser screenshot showing the "Welcome to nginx!" page.',
          "Include cleanup verification showing that the cluster has been deleted.",
        ],
        whyItMattersHeading: "Important: EKS Auto Mode",
        whyItMatters:
          "As of late 2024, the AWS Console defaults to EKS Auto Mode with a Quick Configuration wizard. In this lab you must choose Custom configuration and turn Auto Mode off so you can see the underlying IAM, networking, and node group components. Auto Mode is also not compatible with AWS Academy Learner Labs.",
        resourceSections: [
          {
            title: "Prerequisites",
            items: [
              "AWS account in AWS Academy Learner Lab or a personal AWS account.",
              "Basic understanding of Kubernetes concepts such as pods, deployments, and services.",
              "Familiarity with the AWS Management Console.",
              "AWS CLI v2 installed and configured locally, or use AWS CloudShell.",
              "kubectl installed on your local machine.",
            ],
          },
          {
            title: "What You Will Learn",
            items: [
              "Create IAM roles for the EKS control plane and worker nodes.",
              "Create and configure an Amazon EKS cluster with Auto Mode disabled.",
              "Set up a managed node group for worker nodes.",
              "Configure kubectl to communicate with your cluster.",
              "Deploy and expose a containerized application.",
              "Understand how EKS integrates with IAM, VPC, EC2, and Elastic Load Balancing.",
            ],
          },
          {
            title: "Career Connection",
            items: [
              "Kubernetes and EKS skills are among the most in-demand cloud competencies.",
              "Cloud Engineers and DevOps Engineers with EKS experience often command salaries in the $100K to $160K range.",
              "Employers expect you to understand IAM roles, VPC networking, node groups, and kubectl, not just one automated command.",
            ],
          },
          {
            title: "Step 1: Install kubectl and Configure AWS CLI",
            items: [
              "Windows: install kubectl with Chocolatey using choco install kubernetes-cli, or download it directly from the Kubernetes install guide, then verify with kubectl version --client.",
              "macOS: install with Homebrew using brew install kubectl, then verify with kubectl version --client.",
              "Linux or AWS CloudShell: download the latest release, install it into /usr/local/bin, then verify with kubectl version --client.",
              "For personal accounts, run aws configure and set region to us-east-1 with json output.",
              'For AWS Academy Learner Lab, copy the AWS CLI credentials from "AWS Details" into ~/.aws/credentials and confirm the region is us-east-1.',
              "Verify your identity with aws sts get-caller-identity.",
            ],
          },
          {
            title: "Step 2: Create IAM Roles for EKS",
            items: [
              "AWS Academy students should use the pre-created LabRole for both the cluster role and the node group role.",
              "Personal accounts: create the cluster role with the EKS Cluster use case and AmazonEKSClusterPolicy attached. Name it myAmazonEKSClusterRole.",
              "Personal accounts: create the node group role with the EC2 use case and attach AmazonEKSWorkerNodePolicy, AmazonEC2ContainerRegistryReadOnly, and AmazonEKS_CNI_Policy. Name it myAmazonEKSNodeRole.",
            ],
          },
          {
            title: "Step 3: Create the EKS Cluster",
            items: [
              "Open the Amazon EKS Console in us-east-1 and click Add cluster, then Create.",
              "Select Custom configuration and toggle Use EKS Auto Mode to OFF.",
              "Name the cluster my-eks-cluster.",
              "AWS Academy: use LabRole, the default VPC, and public subnets in at least two Availability Zones.",
              "Personal account: use the default VPC or optionally create a dedicated CloudFormation VPC.",
              "Keep the default add-ons selected: Amazon VPC CNI, CoreDNS, and kube-proxy.",
              'Wait 10 to 15 minutes until the cluster status becomes "Active" before continuing.',
            ],
          },
          {
            title: "Optional Personal Account VPC Command",
            items: [
              "aws cloudformation create-stack --region us-east-1 --stack-name my-eks-vpc-stack --template-url https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml",
              "Wait for the CloudFormation stack to complete before using its VPC and subnets for the cluster.",
            ],
          },
          {
            title: "Step 4: Configure kubectl",
            items: [
              "Update kubeconfig with aws eks update-kubeconfig --region us-east-1 --name my-eks-cluster.",
              "Test the connection with kubectl get svc.",
              'If you see "You must be logged in," verify credentials with aws sts get-caller-identity, confirm the cluster is Active, and make sure the region is us-east-1.',
            ],
          },
          {
            title: "Step 5: Create a Managed Node Group",
            items: [
              "Open the cluster, go to the Compute tab, and click Add node group.",
              "Use the name my-node-group.",
              "AWS Academy: select LabRole. Personal account: select myAmazonEKSNodeRole.",
              "Use Amazon Linux 2023 (AL2023_x86_64_STANDARD), capacity type On-Demand, instance type t3.micro, and disk size 20 GB.",
              "Set desired size to 2, minimum size to 1, and maximum size to 4.",
              "Use the same subnets chosen for the cluster and leave SSH access disabled.",
              'Wait until the node group becomes "Active", then verify with kubectl get nodes and kubectl get nodes -o wide.',
            ],
          },
          {
            title: "Step 6: Deploy a Sample Application",
            items: [
              "Create the deployment with kubectl create deployment nginx --image=nginx:latest.",
              "Check deployments and pods with kubectl get deployments and kubectl get pods.",
              "Scale to three replicas with kubectl scale deployment nginx --replicas=3.",
              "Expose the app with kubectl expose deployment nginx --port=80 --type=LoadBalancer.",
              "Watch for the external address with kubectl get service nginx --watch, then test the page in a browser.",
              'You should see the "Welcome to nginx!" page.',
            ],
          },
          {
            title: "Step 6C and 6D: Explore the Cluster",
            items: [
              "Use kubectl describe pod <pod-name>, kubectl logs <pod-name>, kubectl get all, kubectl rollout status deployment/nginx, kubectl get pods --show-labels, and kubectl get svc --all-namespaces.",
              "In the AWS Console, inspect the cluster Compute and Resources tabs.",
              "Open the EC2 Console and review the load balancer created by the Kubernetes service.",
            ],
          },
          {
            title: "Step 7: Optional Guestbook Challenge",
            items: [
              "Deploy the Redis leader, Redis follower, and Guestbook frontend components using the official Kubernetes example manifests.",
              "Verify pod health with kubectl get pods.",
              "Get the frontend service address with kubectl get service frontend and test it in the browser.",
            ],
          },
          {
            title: "Learning Outcomes Achieved",
            items: [
              "Understand why EKS needs separate IAM roles for the control plane and worker nodes.",
              "See how Kubernetes manages containerized applications at scale.",
              "Experience how EKS integrates with VPC, IAM, EC2, and Elastic Load Balancing.",
              "Understand the benefits of AWS-managed worker nodes.",
              "Know the difference between manual configuration and EKS Auto Mode.",
              "Deploy, scale, and expose containerized applications with kubectl.",
            ],
          },
          {
            title: "Cleanup Instructions",
            items: [
              "Delete the NGINX service with kubectl delete service nginx.",
              "Delete the NGINX deployment with kubectl delete deployment nginx.",
              "If you deployed Guestbook, delete its services and deployments too.",
              "Delete the node group from the EKS Console and wait until deletion finishes.",
              "Delete the EKS cluster from the EKS Console.",
              "Delete lingering load balancers from the EC2 Console if needed.",
              "Personal accounts only: delete the CloudFormation VPC stack and optional IAM roles.",
              "Verify cleanup with aws eks list-clusters --region us-east-1, aws elb describe-load-balancers --region us-east-1, and aws elbv2 describe-load-balancers --region us-east-1.",
            ],
          },
          {
            title: "Required Screenshots for Submission",
            items: [
              'EKS cluster details page showing "Active" status.',
              'Node group details showing "Active" status.',
              'Terminal output from kubectl get nodes showing all nodes in "Ready" status.',
              "NGINX deployment and pods running with kubectl get all.",
              "Service output from kubectl get svc showing the external load balancer address.",
              'Browser screenshot showing the "Welcome to nginx!" page.',
              "Cleanup verification showing an empty cluster list after deletion.",
            ],
          },
          {
            title: "Screenshot Tips",
            items: [
              "Make sure timestamps are visible in terminal screenshots.",
              "Include the full load balancer URL in the service screenshot.",
              "Ensure AWS Console screenshots show your account information in the top-right corner.",
              "Label each screenshot clearly in the Word document.",
            ],
          },
          {
            title: "Troubleshooting Common Issues",
            items: [
              "If you accidentally used Quick Configuration with Auto Mode enabled, delete the cluster and recreate it with Custom configuration and Auto Mode off.",
              "If nodes are not joining the cluster, verify the node IAM role policies or confirm LabRole was selected in AWS Academy.",
              'If the load balancer stays in "pending", wait a few minutes and verify that public subnets and Ready nodes are in place.',
              "If kubectl commands return errors, rerun aws eks update-kubeconfig --region us-east-1 --name my-eks-cluster and verify your AWS credentials.",
              'If the AWS Academy session expired, restart the Learner Lab, refresh credentials from "AWS Details", and rerun update-kubeconfig.',
              "To minimize costs, complete the lab and cleanup in a single session.",
            ],
          },
          {
            title: "Additional Resources",
            items: [
              "AWS EKS Getting Started — Console and CLI (Official Guide).",
              "EKS Auto Mode Documentation.",
              "Create an Amazon EKS Cluster (All Options).",
              "Kubernetes Official Tutorial.",
              "kubectl Cheat Sheet.",
              "EKS Optimized AMI Documentation (Amazon Linux 2023).",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "Kubernetes & Amazon EKS",
      questions: [
        {
          id: 1,
          question: "At its core, Kubernetes is a platform for:",
          options: [
            "Deploying EC2 Instances",
            "Packaging software in containers",
            "Running and scheduling container applications on a cluster",
            "Provisioning machines (similar to Puppet, Ansible)",
          ],
        },
        {
          id: 2,
          question: "In Kubernetes, a node is:",
          options: [
            "A worker machine",
            "Controls all the communication between nodes",
            "A tool for starting a kubernetes cluster on a local machine",
            "A machine that coordinates the scheduling and management of application containers on the cluster",
          ],
        },
        {
          id: 3,
          question: "What can you deploy on Kubernetes?",
          options: [
            "Containers",
            "Virtual Machines",
            "AWS EC2 Instances",
            "System Processes",
          ],
        },
        {
          id: 4,
          question: "Kubectl is:",
          options: [
            "A tool used to start a Kubernetes cluster on a local machine",
            "the Kubernetes cli tool",
            "A type of Kubernetes host",
            "A system process",
          ],
        },
        {
          id: 5,
          question: "What is a Deployment?",
          options: [
            "A Deployment is responsible for managing the desired state of your applications",
            "A type of container",
            "A type of Kubernetes host",
            "An application running on Linux",
          ],
        },
        {
          id: 6,
          question: "What command would you use to create a Deployment?",
          options: [
            "kubectl run",
            "kubectl get nodes",
            "kubectl get deployments",
            "kubectl describe deplaoyments",
          ],
        },
        {
          id: 7,
          question: "What is a Pod?",
          options: [
            "A group of one or more application containers that include shared volume and IP address",
            "A host machine where containers are deployed",
            "A Kubernetes primitive responsible for deploying and scheduling application containers",
            "No answer text provided.",
          ],
        },
        {
          id: 8,
          question: "What is a Service?",
          options: [
            "A Service is responsible for creating and updating instances of your containerized applications",
            "A co-located and co-scheduled group of one or more containers that share volume and an IP address",
            "A Kubernetes Service is an abstraction layer which defines a logical set of Pods",
            "No answer text provided.",
          ],
        },
        {
          id: 9,
          question: "How can you create a Service?",
          options: [
            'With "kubectl describe"',
            'With "kubectl proxy"',
            'With "kubectl expose"',
            "No answer text provided.",
          ],
        },
        {
          id: 10,
          question: "What is the scope of a rolling update?",
          options: [
            "To update a Service",
            "To scale an app",
            "To update a Deployment",
            "No answer text provided.",
          ],
        },
        {
          id: 11,
          question:
            "A container requires more system resources than Virtual Machines or Instances.",
          options: ["True", "False"],
        },
        {
          id: 12,
          question:
            "A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings.",
          options: ["True", "False"],
        },
        {
          id: 13,
          question:
            "The benefits of using a Container are ... (Select All That Apply)",
          options: ["Flexible", "Cost Effective", "Portable", "Lightweight"],
          multiple: true,
        },
        {
          id: 14,
          question:
            "What does this docker command do: docker run -p 80:80 hello-world",
          options: [
            "run a ECS Cluster",
            "exposed port 80 on the container to port 80 on the host system",
            "expose a security group port",
            "Run docker image hello-world",
          ],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 1,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 2,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 3,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 4,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 6,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 7,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 8,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 9,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 10,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 11,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 12,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 13,
          correctAnswer: [0, 1, 2, 3],
        },
        {
          quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
          questionId: 14,
          correctAnswer: [1],
        },
      ],
    },
    milestone:
      "Complete Module 5 with Kubernetes and Amazon EKS foundations, lab work, and quiz readiness in place for the next module.",
  },
  {
    id: 6,
    title: "SNS, SQS, API Gateway",
    weekLabel: "Week 6",
    dateLabel: "March 23, 2026",
    overview:
      "This module covers foundational AWS architecture patterns and services for building scalable cloud applications. It contrasts monolithic and distributed architectures, explores tight versus loose coupling, and introduces synchronous, asynchronous, and event-driven communication models through Amazon SQS, Amazon SNS, and Amazon API Gateway.",
    topicLine: "Scheduled topic: SNS, SQS, API Gateway",
    focusAreas: [
      "Monolithic versus distributed architecture patterns",
      "Tight coupling, loose coupling, and communication models",
      "Amazon SQS, Amazon SNS, and Amazon API Gateway workflows",
    ],
    objectivesAligned: [
      "Describe important design considerations for scalable cloud applications.",
      "Describe the architectural approach used by AWS.",
    ],
    outcomeAlignment: [
      "Builds architectural thinking around scalable messaging, decoupled services, and managed API entry points in AWS.",
    ],
    syllabusContext: [
      "This module shifts the course from compute orchestration into messaging, API design, and distributed application structure.",
      "It introduces the AWS services commonly used to decouple systems and move from tightly coupled applications toward more scalable event-driven workflows.",
    ],
    starterTasks: [
      "Complete the required reading on SQS, SNS, and API Gateway",
      "Capture lecture notes about architecture patterns and communication models",
      "Prepare screenshots and notes for the module lab and messaging workflows",
    ],
    artifacts: [
      "Architecture pattern notes",
      "Messaging workflow screenshots",
      "Quiz prep and service comparison notes",
    ],
    importantDates: ['Guaranteed "W" withdrawal deadline: March 28, 2026'],
    assessmentContext: [
      "This module includes required reading, lectures, a Slack discussion, a lab, and a quiz focused on scalable communication patterns and AWS messaging services.",
    ],
    moduleSummary: [
      {
        step: "1",
        description: "Complete required reading on SQS, SNS, and API Gateway.",
      },
      {
        step: "2",
        description: "Listen to the course lectures.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Post Assignment.",
      },
      {
        step: "4",
        description: "Complete the lab.",
      },
      {
        step: "5",
        description: "Complete the quiz.",
      },
    ],
    readingHighlights: [
      "SNS: Simple Notification Service (Pages 1–18).",
      "SQS: Simple Queue Service (Pages 1–21).",
      "API Gateway (Pages 1–13).",
    ],
    textTasks: [
      {
        id: "classroom-engagement-aws-blog-post",
        title: "Classroom Engagement - Slack Post AWS Blog Post",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Visit https://aws.amazon.com/blogs/ to explore AWS educational resources and current blog posts.",
          "Find one AWS blog post you are personally interested in.",
          "Write a summary of the blog post with a minimum of 100 words.",
          "Include why you selected that specific AWS blog post.",
          "Include a direct link to the blog post.",
          "Post a screenshot of your Slack discussion entry to Canvas.",
        ],
        submissionInstructions: [
          "Part 1: Submit a 100-word AWS blog summary and the link to the post.",
          "Part 2: Comment on another student's post.",
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new post or a reply to another student.",
          "Use professional grammar and punctuation in this college-level course.",
          'Avoid "text" or "Twitter speak" when corresponding.',
          "Post early and often during the week the discussion board is open.",
        ],
        whyItMattersHeading: "Weekly Topic: AWS Blogs Summary",
        whyItMatters:
          "AWS blog posts are a strong way to stay current on changes and additions to AWS cloud services. This discussion helps you practice learning from official AWS resources and sharing useful updates with classmates.",
        resourceSections: [
          {
            title: "Discussion Guidelines",
            items: [
              "Your entry should be at least 2 to 5 sentences in length.",
              "Your entry can be a new entry or a reply to another student.",
              "Use professional grammar and punctuation in this college-level course in all correspondence.",
              'Please avoid "text" or "Twitter speak" when corresponding.',
              "The Slack workspace is supposed to represent an ongoing discussion related to the subject matter under consideration.",
              "Students should be posting early and often during the week the discussion board is open.",
            ],
          },
          {
            title: "Tip",
            items: [
              "Read other students' entries because they often contain valuable lab, project, quiz, and course suggestions.",
            ],
          },
        ],
      },
      {
        id: "notification-system-sns-sqs",
        title: "Lab 1: Notification System with SNS and SQS",
        objective:
          "In this hands-on lab, you will explore the fundamentals of cloud messaging by building a real-world notification system using Amazon SNS and Amazon SQS. You will learn how push-based and pull-based messaging patterns work together and see the fan-out architecture pattern in action.",
        tasks: [
          "Build a Campus Alert System that distributes alerts to Student Services, Faculty, Facilities, and Emergency queues.",
          "Create four SQS queues and one SNS topic.",
          "Subscribe each SQS queue to the SNS topic and enable raw message delivery.",
          "Publish test messages and verify fan-out delivery across queues.",
          "Add message filtering so the Emergency queue only receives high-severity alerts.",
          "Review SNS and SQS metrics in CloudWatch.",
          "Delete subscriptions, topic, and queues at the end of the lab to avoid charges.",
        ],
        submissionInstructions: [
          "Submit a single PDF containing all required screenshots and the lab report.",
          "Include all 11 required screenshots, plus any bonus screenshots you want to add.",
          "Include a one-page lab report answering the SNS versus SQS, fan-out, real-world use case, message persistence, and filtering questions.",
          "Submit the PDF to Canvas.",
        ],
        whyItMattersHeading: "Scenario Overview",
        whyItMatters:
          "You are building a Campus Alert System for a college. When administration sends an alert such as a class cancellation, emergency notification, or event announcement, the alert must reach Student Services, Faculty, Facilities, and Emergency channels at the same time.",
        resourceSections: [
          {
            title: "Architecture Pattern",
            items: [
              "Campus Admin publishes one alert to the CampusAlerts SNS topic.",
              "The SNS topic fans the message out to four SQS queues: CampusAlerts-Students, CampusAlerts-Faculty, CampusAlerts-Facilities, and CampusAlerts-Emergency.",
              "This demonstrates one-to-many message distribution with durable queue-based consumption.",
            ],
          },
          {
            title: "Part 1: Create SQS Queues",
            items: [
              "Open Simple Queue Service in the AWS Console and click Create queue.",
              "Create CampusAlerts-Students as a Standard queue and keep the default configuration values.",
              "Repeat the process for CampusAlerts-Faculty, CampusAlerts-Facilities, and CampusAlerts-Emergency.",
              "Verify all four queues appear in the queue list.",
              "Required screenshots: first queue created successfully and the list showing all four queues.",
            ],
          },
          {
            title: "Part 2: Create SNS Topic",
            items: [
              "Open Simple Notification Service and create a Standard topic named CampusAlerts.",
              "Set the display name to Campus Alert System.",
              "Keep the remaining settings at their defaults and create the topic.",
              "Copy the Topic ARN from the topic details page because you will need it later.",
              "Required screenshot: topic details page showing the ARN.",
            ],
          },
          {
            title: "Part 3: Create Subscriptions",
            items: [
              "Create a subscription from the CampusAlerts SNS topic to the CampusAlerts-Students SQS queue.",
              "Use the Amazon SQS protocol, select the queue ARN as the endpoint, and enable raw message delivery.",
              "Repeat the process for the Faculty, Facilities, and Emergency queues.",
              "Verify all four subscriptions appear with Confirmed status.",
              "Required screenshots: first confirmed subscription and the list showing all four confirmed subscriptions.",
            ],
          },
          {
            title: "Part 4: Test the Message Flow",
            items: [
              "Publish a Weather Alert message to the CampusAlerts topic with a JSON body that includes alert_type, severity, title, message, timestamp, and affected_groups.",
              "Go to each SQS queue, poll for messages, and verify that all four queues received the same message.",
              "Open the message body to confirm the JSON content.",
              "Delete the test messages from each queue after verification.",
              "Required screenshots: publish success message and a queue message body.",
            ],
          },
          {
            title: "Part 5: Add Message Filtering",
            items: [
              "Edit the CampusAlerts-Emergency subscription in SNS.",
              'Add the subscription filter policy: { "severity": ["high", "critical"] }.',
              "Publish a low-severity message and include a severity message attribute with value low.",
              "Publish a high-severity message and include a severity message attribute with value high.",
              "Verify the Students, Faculty, and Facilities queues receive both messages while the Emergency queue only receives the high-severity message.",
              "Required screenshot: Emergency queue showing only the filtered high-severity message.",
            ],
          },
          {
            title: "Part 6: Monitor with CloudWatch",
            items: [
              "Open CloudWatch Metrics and review SNS Topic Metrics for CampusAlerts.",
              "View the NumberOfMessagesPublished metric graph.",
              "Review SQS Queue Metrics for CampusAlerts-Students.",
              "Check NumberOfMessagesSent, NumberOfMessagesReceived, and NumberOfMessagesDeleted.",
              "Required screenshots: SNS metrics graph and SQS metrics graph.",
            ],
          },
          {
            title: "Part 7: Clean Up Resources",
            items: [
              "Delete all SNS subscriptions first.",
              'Delete the CampusAlerts SNS topic and confirm with "delete me".',
              "Delete each of the four SQS queues and confirm each deletion by typing the queue name.",
              "Verify the queue list is empty after cleanup.",
              "Required screenshot: empty SQS queue list after cleanup.",
            ],
          },
          {
            title: "Submission Requirements",
            items: [
              "Screenshot #1: First queue created successfully.",
              "Screenshot #2: All 4 queues in the list.",
              "Screenshot #3: SNS topic with ARN.",
              "Screenshot #4: First subscription confirmed.",
              "Screenshot #5: All 4 subscriptions confirmed.",
              "Screenshot #6: Message published successfully.",
              "Screenshot #7: Message body in queue.",
              "Screenshot #8: Filtered message in Emergency queue.",
              "Screenshot #9: CloudWatch SNS metrics.",
              "Screenshot #10: CloudWatch SQS metrics.",
              "Screenshot #11: Cleanup confirmation.",
            ],
          },
          {
            title: "Lab Report Questions",
            items: [
              "What is the difference between SNS and SQS?",
              'Explain the "fan-out" pattern in your own words.',
              "What real-world applications could use this architecture?",
              "What happens to messages if no one reads them from SQS?",
              "Why would you use message filtering?",
            ],
          },
          {
            title: "Troubleshooting Guide",
            items: [
              'If you get "Access Denied," make sure you are in a supported region such as us-east-1 or us-west-2.',
              'If messages do not appear in queues, confirm the subscriptions show "Confirmed" and that raw message delivery is enabled.',
              "If CloudWatch metrics do not appear, wait one to two minutes and verify at least one message was published.",
              "If a subscription does not confirm, delete and recreate it and make sure the queue and topic are in the same region.",
            ],
          },
          {
            title: "Key Concepts to Remember",
            items: [
              "SNS uses a pub/sub push model and is designed for one-to-many notification delivery.",
              "SQS uses a queue-based pull model and stores messages until they are deleted or expire.",
              "Use SNS when you need to notify multiple systems immediately.",
              "Use SQS when you need decoupling and guaranteed message processing.",
              "Use SNS and SQS together when you need fan-out with durable delivery.",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "SNS SQS and API Gateway",
      questions: [
        {
          id: 1,
          question:
            "Which architecture style allows independent scaling of services such as catalog, payments, or inventory without redeploying the whole app?",
          options: [
            "Single-tenant VM",
            "Distributed microservices",
            "Tightly coupled layered",
            "Monolithic",
          ],
        },
        {
          id: 2,
          question:
            "Which communication pattern is best when the caller must wait for an immediate result (e.g., get order total)?",
          options: [
            "Synchronous request/response",
            "Batch file transfer",
            "Asynchronous event",
            "Pub/Sub broadcast",
          ],
        },
        {
          id: 3,
          question:
            "Which SQS feature prevents other consumers from receiving a message while it is being processed?",
          options: [
            "Deduplication ID",
            "Redrive policy",
            "Visibility timeout",
            "Delivery delay",
          ],
        },
        {
          id: 4,
          question:
            "You have duplicate tolerant, high volume tasks (image resizing). Which SQS queue type is the most cost-effective and scalable fit?",
          options: [
            "FIFO queue",
            "Priority queue",
            "Standard queue",
            "Dead-letter queue",
          ],
        },
        {
          id: 5,
          question:
            "You need one message to notify many targets (HTTP webhook, email, Lambda, and SQS). Which service/pattern fits best?",
          options: [
            "SNS topic with multiple subscription protocols",
            "SQS with multiple consumers on same message",
            "EventBridge only",
            "Direct calls to each microservice",
          ],
        },
        {
          id: 6,
          question:
            "An e-commerce app publishes 'OrderPlaced' to SNS, which fans out to multiple SQS queues for independent services. What resilience benefit does this provide?",
          options: [
            "Failures in one consumer don't block others",
            "Eliminates the need for monitoring",
            "Strong consistency across services",
            "All services share a single retry counter",
          ],
        },
        {
          id: 7,
          question:
            "Which API Gateway type is positioned for enterprise features like request validation and advanced auth?",
          options: [
            "WebSocket API",
            "Edge-optimized API",
            "REST API",
            "HTTP API",
          ],
        },
        {
          id: 8,
          question:
            "Which API Gateway type enables real-time, bidirectional communication for chat or live dashboards?",
          options: ["WebSocket API", "gRPC API", "REST API", "HTTP API"],
        },
        {
          id: 9,
          question:
            "True or False: API Gateway can transform requests and responses (e.g., XML/JSON) and manipulate headers without changing backend code.",
          options: ["False", "True"],
        },
        {
          id: 10,
          question:
            "Your startup offers free and premium API tiers. Which API Gateway capability lets you enforce different request limits per client?",
          options: [
            "Mock integrations",
            "Usage plans only for REST APIs",
            "Edge-optimized endpoints",
            "Rate limiting throttling with per-key quotas and bursts",
          ],
        },
        {
          id: 11,
          question:
            "Enabling API Gateway caching primarily benefits which outcomes?",
          options: [
            "Guaranteed ordering",
            "Automatic DB failover",
            "Stronger encryption and auth",
            "Lower latency and reduced backend load/costs",
          ],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 1,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 2,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 3,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 4,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 6,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 7,
          correctAnswer: [2],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 8,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 9,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 10,
          correctAnswer: [3],
        },
        {
          quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
          questionId: 11,
          correctAnswer: [3],
        },
      ],
    },
    milestone:
      "Complete Module 6 with scalable messaging, API architecture, lab work, and quiz readiness in place for the next module.",
  },
  {
    id: 7,
    title: "AWS Lambda",
    weekLabel: "Week 7A",
    dateLabel: "March 30, 2026",
    overview:
      "This module covers AWS Lambda, a powerful tool for running code without managing servers. Lambda automatically scales and runs your code in response to events like API requests, file uploads, or database updates. In this module, you will explore Lambda through readings, video lectures, hands-on labs, class discussions, and a quiz so you can build a strong foundation for scalable, serverless applications.",
    topicLine: "Scheduled topic: AWS Lambda",
    focusAreas: [
      "Serverless execution with AWS Lambda",
      "Event-driven triggers and Lambda workflows",
      "Creating, deploying, and testing serverless functions",
    ],
    objectivesAligned: [
      "Describe important design considerations for scalable cloud applications.",
      "Describe the architectural approach used by AWS.",
    ],
    outcomeAlignment: [
      "Builds a strong foundation for scalable serverless design and event-driven application architecture in AWS.",
    ],
    syllabusContext: [
      "This module introduces AWS Lambda as the core serverless execution model in the course.",
      "It moves the class from infrastructure-heavy deployments toward managed event-driven application patterns.",
    ],
    starterTasks: [
      "Complete the required reading on AWS Lambda",
      "Take lecture notes on Lambda triggers and serverless architecture",
      "Prepare screenshots and notes for the Lambda labs",
    ],
    artifacts: [
      "Lambda lab screenshots",
      "Function trigger notes",
      "Quiz prep and serverless workflow notes",
    ],
    importantDates: ["Pass/No Pass deadline: April 10, 2026"],
    assessmentContext: [
      "This module includes required reading, lecture, class discussion, Lambda labs, and a quiz focused on serverless application development.",
    ],
    moduleSummary: [
      {
        step: "1",
        description: "Complete required reading on AWS Lambda.",
      },
      {
        step: "2",
        description: "Listen to the course lecture.",
      },
      {
        step: "3",
        description: "Engage in-class discussion: Slack Post Assignment.",
      },
      {
        step: "4",
        description:
          "Complete Lab 1: Hello Lambda and Lab 2: Lambda Read DynamoDB.",
      },
      {
        step: "5",
        description: "Complete AWS Lambda labs and quiz.",
      },
    ],
    readingHighlights: [
      "Serverless Architectures with AWS Lambda (Pages 1–24).",
      "Lambda Services Developer Guide (Pages 1–48).",
    ],
    textTasks: [
      {
        id: "classroom-engagement-slack-post",
        title: "Classroom Engagement - Slack Post",
        objective:
          "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
        tasks: [
          "Choose a discussion topic related to class assignment issues, comments, tips, recommendations, or questions.",
          "You may also post comments on the module topic, including any reading, lecture, or additional resources.",
          "You may share an AWS, cloud, or technology news article.",
          "You may share an AWS-related blog example such as https://aws.amazon.com/blogs/aws/.",
          "Post a screenshot of your Slack discussion entry to Canvas.",
        ],
        submissionInstructions: [
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation in this college-level course in all correspondence.",
          'Avoid "text" or "Twitter speak" when corresponding.',
          "Post early and often during the week the discussion board is open.",
        ],
        whyItMattersHeading: "Tip",
        whyItMatters:
          "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
        resourceSections: [
          {
            title: "Discussion Guidelines",
            items: [
              "Your entry should be at least 2 to 5 sentences in length.",
              "Your entry can be a new entry or a reply to another student.",
              "Use professional grammar and punctuation in this college-level course in all correspondence.",
              'Please avoid "text" or "Twitter speak" when corresponding.',
              "The Slack workspace is supposed to represent an ongoing discussion related to the subject matter under consideration.",
              "Students should be posting early and often during the week the discussion board is open.",
            ],
          },
        ],
      },
      {
        id: "hello-lambda",
        title: "Lab 1: Hello Lambda",
        objective:
          "Create your first AWS Lambda function and understand the basic concepts of serverless computing, function invocation, and CloudWatch logging. This assignment introduces the Lambda fundamentals that every cloud developer should know.",
        tasks: [
          "Create a new Lambda function from scratch using Python 3.13 or the latest Python 3.x runtime.",
          "Replace the default code with a function that accepts an event, returns a personalized greeting, and logs invocation details.",
          "Deploy the function and configure memory and timeout settings.",
          "Run three different test cases and verify the function output.",
          "Open CloudWatch Logs and review the invocation logs.",
          "Create professional documentation with screenshots, test results, and a short reflection.",
        ],
        submissionInstructions: [
          "Submit a documentation file in PDF, Word, or Google Docs link format.",
          "Include all required sections and screenshots.",
          "Include a clear explanation of your chosen Lambda configuration settings.",
          "Make sure the document is well-formatted and professional before submitting to Canvas.",
        ],
        whyItMattersHeading: "Your First Serverless Function",
        whyItMatters:
          "This lab builds the foundation for serverless application development by teaching you how Lambda functions are created, configured, tested, logged, and documented.",
        resourceSections: [
          {
            title: "Part 1: Create Your Lambda Function",
            items: [
              "Open AWS Lambda from the AWS Console search bar.",
              'Click "Create function" and keep "Author from scratch" selected.',
              "Use the naming format student-[yourname]-hello-world.",
              "Select Python 3.13 or the latest Python 3.x runtime and keep x86_64 as the architecture.",
              "Create the function and capture a screenshot of the function page with the code editor visible.",
            ],
          },
          {
            title: "Part 2: Write and Deploy the Code",
            items: [
              "Open lambda_function.py and replace the default code with the provided Hello Lambda function.",
              "The function should accept a name parameter, return a greeting message, log the invocation time, and use World as the default name.",
              'Click "Deploy" and wait for the success banner.',
              "Capture a screenshot showing the deployed code.",
            ],
          },
          {
            title: "Understanding the Code",
            items: [
              "The code imports json and datetime.",
              "The lambda_handler function serves as the Lambda entry point.",
              "It records the current timestamp, logs the invocation, reads the name from the event, builds the response, and returns a JSON payload.",
            ],
          },
          {
            title: "Part 3: Configure Function Settings",
            items: [
              "Open the Configuration tab and go to General configuration.",
              "Set Memory to 512 MB.",
              "Set Timeout to 10 seconds.",
              "Explain in your documentation why these settings are a good balance of performance, cost, and function complexity.",
              "Capture a screenshot of the configuration page showing the memory and timeout values.",
            ],
          },
          {
            title: "Part 4: Test Your Function",
            items: [
              'Create TestWithName using the event { "name": "Sarah" } and verify the function returns a personalized greeting.',
              "Create TestWithoutName using the event {} and verify the function defaults to Hello, World.",
              'Create TestWithCompanyName using the event { "name": "Amazon Web Services" } and verify the greeting uses that full name.',
              "Capture a screenshot for each successful test execution.",
            ],
          },
          {
            title: "Part 5: View CloudWatch Logs",
            items: [
              "Open CloudWatch and navigate to Log groups.",
              "Find the log group /aws/lambda/student-[yourname]-hello-world.",
              "Open the most recent log stream.",
              "Review the START, print statements, END, and REPORT entries.",
              "Capture a screenshot of the CloudWatch Logs output from one of your test runs.",
            ],
          },
          {
            title: "Part 6: Create Your Documentation",
            items: [
              "Section 1: Lambda Function Details including function name, runtime, memory, timeout, and a 3 to 4 sentence explanation of those settings.",
              "Section 2: Testing Results including test name, input, expected output, actual output, and screenshot for each test case.",
              "Section 3: Screenshots including the function created page, deployed code, configuration settings, test executions, and CloudWatch Logs.",
              "Section 4: Lessons Learned with a 100 to 200 word reflection about serverless computing and real application use cases.",
            ],
          },
          {
            title: "Required Screenshots",
            items: [
              "Lambda function created page.",
              "Code deployed successfully.",
              "Configuration settings page.",
              "Three successful test executions.",
              "CloudWatch Logs for one invocation.",
            ],
          },
          {
            title: "Troubleshooting Common Issues",
            items: [
              'If you see "Permission denied" or "Access denied," verify you are logged into AWS and have Lambda permissions.',
              "If the function fails to execute, check CloudWatch Logs, confirm the code was copied correctly, verify Python indentation, and make sure you clicked Deploy.",
              "If you cannot find CloudWatch Logs, confirm the AWS Region, run the function at least once, and refresh the log group after a short wait.",
              "If the test times out, look for loops or missing return statements and increase the timeout only if necessary.",
            ],
          },
        ],
      },
      {
        id: "serverless-rest-api",
        title: "Lab 2: DynamoDB Add, Get and Delete Tasks",
        objective:
          "In this lab, you will create an AWS Lambda function that retrieves student records from a DynamoDB table when triggered by an API Gateway GET request. The full workflow connects Lambda, DynamoDB, and API Gateway so you can build a serverless REST API.",
        tasks: [
          "Create a DynamoDB table for tasks with taskId as the partition key.",
          "Create an IAM policy and Lambda execution role with DynamoDB and CloudWatch permissions.",
          "Create four Lambda functions for listing, retrieving, creating, and deleting tasks.",
          "Create a REST API in API Gateway with /tasks and /tasks/{id} resources.",
          "Connect each API method to the correct Lambda function and deploy the API.",
          "Test the API with curl or PowerShell.",
          "Review Lambda logs in CloudWatch.",
        ],
        submissionInstructions: [
          "Submit screenshots to Canvas for the DynamoDB table, API Gateway resources, curl or PowerShell tests, and CloudWatch logs.",
          "Make sure the screenshots clearly show successful API behavior for create, get all, get one, and delete operations.",
          "Capture at least one CloudWatch log group showing a successful Lambda invocation.",
        ],
        whyItMattersHeading: "Serverless REST API",
        whyItMatters:
          "This lab shows how Lambda, API Gateway, and DynamoDB work together to create a complete serverless application that can store, retrieve, and delete data without managing servers.",
        resourceSections: [
          {
            title: "AWS Reference",
            items: [
              "If you get stuck, use the official AWS tutorial: Tutorial: Using Lambda with API Gateway.",
            ],
          },
          {
            title: "Part 1: DynamoDB Setup",
            items: [
              "Create a DynamoDB table named student-[yourname]-tasks.",
              "Use taskId as the partition key with String type.",
              "Leave the Sort key completely empty.",
              "Use Default settings so the table uses on-demand capacity.",
              "Wait until the table status becomes Active and capture a screenshot of the table details.",
            ],
          },
          {
            title: "Part 2: IAM Roles Setup",
            items: [
              "Create a custom IAM policy that allows DynamoDB PutItem, GetItem, UpdateItem, DeleteItem, Scan, Query, and CloudWatch logging actions.",
              "Name the policy student-[yourname]-lambda-dynamodb-policy.",
              "Create a Lambda execution role named student-[yourname]-lambda-execution-role.",
              "Attach your custom DynamoDB policy to the role.",
              "Copy and save the role ARN because you will use it for all Lambda functions.",
            ],
          },
          {
            title: "Part 3: Lambda Functions",
            items: [
              "Create student-[yourname]-get-tasks using Python 3.13 and your execution role. Replace the default code with the provided GET /tasks handler and replace YOURNAME in the DynamoDB table name.",
              "Create student-[yourname]-get-task using Python 3.13 and your execution role. Use the provided GET /tasks/{id} handler and replace YOURNAME in the table name.",
              "Create student-[yourname]-create-task using Python 3.13 and your execution role. Use the provided POST /tasks handler and replace YOURNAME in the table name.",
              "Create student-[yourname]-delete-task using Python 3.13 and your execution role. Use the provided DELETE /tasks/{id} handler and replace YOURNAME in the table name.",
              "Deploy each function after pasting the code and run the provided test event.",
              "For the create-task function, save the returned taskId because you will need it for the get-task and delete-task tests.",
            ],
          },
          {
            title: "Function Testing Notes",
            items: [
              'Test get-tasks with { "httpMethod": "GET", "path": "/tasks" }.',
              'Test get-task with { "httpMethod": "GET", "path": "/tasks/123", "pathParameters": { "id": "test-task-1" } }. A 404 response is expected before tasks exist.',
              'Test create-task with { "httpMethod": "POST", "body": "{\\"title\\": \\"Complete Lambda assignment\\", \\"description\\": \\"Build REST API\\", \\"status\\": \\"in-progress\\"}" }.',
              'Test delete-task with { "httpMethod": "DELETE", "pathParameters": { "id": "PASTE-YOUR-ACTUAL-TASK-ID-HERE" } }.',
            ],
          },
          {
            title: "Part 4: API Gateway Setup",
            items: [
              "Create a Regional REST API named student-[yourname]-task-api.",
              "Create the /tasks resource and enable CORS.",
              "Add GET on /tasks pointing to student-[yourname]-get-tasks.",
              "Add POST on /tasks pointing to student-[yourname]-create-task.",
              "Create the /tasks/{id} resource and enable CORS.",
              "Add GET on /tasks/{id} pointing to student-[yourname]-get-task.",
              "Add DELETE on /tasks/{id} pointing to student-[yourname]-delete-task.",
              "Verify every method points to the correct Lambda before deployment.",
              "Deploy the API to a new stage named dev and copy the Invoke URL.",
            ],
          },
          {
            title: "Required Method Mapping",
            items: [
              "/tasks GET -> student-[yourname]-get-tasks",
              "/tasks POST -> student-[yourname]-create-task",
              "/tasks/{id} GET -> student-[yourname]-get-task",
              "/tasks/{id} DELETE -> student-[yourname]-delete-task",
            ],
          },
          {
            title: "Part 5: Testing Your API",
            items: [
              "Use curl on macOS or Linux, or curl.exe in PowerShell on Windows.",
              "Test four operations: create a task, get all tasks, get one task, and delete a task.",
              "Use the saved taskId from the create response when testing get one and delete.",
              "Make sure the API URL includes the deployed stage such as /dev.",
              "Capture screenshots of all successful API tests.",
            ],
          },
          {
            title: "Part 6: Viewing CloudWatch Logs",
            items: [
              "Open CloudWatch and navigate to Logs -> Log Management -> Log Groups.",
              "Find log groups such as /aws/lambda/student-[yourname]-get-tasks and /aws/lambda/student-[yourname]-create-task.",
              "Open a log stream to review the print statements from your Lambda code.",
              "Capture at least one screenshot showing successful CloudWatch log entries.",
            ],
          },
          {
            title: "Screenshots to Submit",
            items: [
              "DynamoDB table page showing the table with Active status.",
              "API Gateway Resources page showing /tasks and /tasks/{id} with all methods.",
              "Terminal or PowerShell output for Create, Get All, Get One, and Delete.",
              "At least one CloudWatch log group with invocation log entries.",
            ],
          },
          {
            title: "Troubleshooting Guide",
            items: [
              'If you get "Missing Authentication Token," verify the API URL includes /dev, confirm the path is correct, and redeploy the API.',
              "If you see a 500 error or a NoneType object has no attribute get, verify that every API method is mapped to the correct Lambda function.",
              "If Lambda times out, verify the DynamoDB table name matches exactly, the IAM role has DynamoDB permissions, and both services are in the same AWS region.",
              "If you see browser CORS errors, verify CORS was enabled on the resources and that the Lambda response includes Access-Control-Allow-Origin.",
              "If you cannot find CloudWatch log groups, open Logs -> Log Management -> Log Groups and make sure the Lambda function has been invoked at least once.",
              "If the DynamoDB table was created with an unintended sort key, delete it and recreate it because the key schema cannot be edited later.",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "Lambda",
      questions: [
        {
          id: 1,
          question:
            "Serverless applications are ones that don't require you to provision or manage any servers. You can focus on your core product and business logic instead of responsibilities like operating system (OS) access control, OS patching, provisioning, right-sizing, scaling, and availability.",
          options: ["True", "False"],
        },
        {
          id: 2,
          question: "Function as a Service is ... (Select 2)",
          options: [
            "a unmanaged environment",
            "container image",
            "Lambda",
            "event driven computing",
          ],
          multiple: true,
        },
        {
          id: 3,
          question:
            "Lambda supports the below programming languages ... (Select 3)",
          options: ["Go", "Node.js", "Python", "Fortran"],
          multiple: true,
        },
        {
          id: 4,
          question:
            "When a Lambda function is invoked, code execution begins at what is called the handler. The handler is a specific function (segment of code) that you’ve created and included in your code.",
          options: ["True", "False"],
        },
        {
          id: 5,
          question: "Select the Lambda event triggers (Select 3)",
          options: ["SNS", "S3", "API Gateway", "ECS"],
          multiple: true,
        },
        {
          id: 6,
          question:
            "Memory/RAM is the only server resource you have access to modify.",
          options: ["True", "False"],
        },
        {
          id: 7,
          question:
            "Modifying the memory/RAM directly affect the Lambda function run time.",
          options: ["True", "False"],
        },
        {
          id: 8,
          question:
            "CPU type can be directly changed for a given Lambda function.",
          options: ["True", "False"],
        },
        {
          id: 9,
          question: "Lambda function logs are collected by CloudLogs.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "There is a coding IDE directly in AWS Lambda web interface.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 1,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 2,
          correctAnswer: [2, 3],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 3,
          correctAnswer: [0, 1, 2],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 4,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 5,
          correctAnswer: [0, 1, 2],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 6,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 7,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 8,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 9,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule7LambdaQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
      ],
    },
    milestone:
      "Complete Module 7 with AWS Lambda foundations, lab work, and quiz readiness in place for the next module.",
  },
  {
    id: 8,
    title: "Elastic Beanstalk Service",
    weekLabel: "Week 7B",
    dateLabel: "March 30, 2026",
    overview:
      "In this module, we dive into AWS Elastic Beanstalk, a Platform as a Service tool that makes it much easier to deploy, manage, and scale web applications without getting buried in backend setup. Students get hands-on practice deploying a Node.js web application, updating the code, and managing the application environment through the AWS Management Console.",
    topicLine: "Scheduled topic: Elastic Beanstalk Service",
    focusAreas: [
      "Elastic Beanstalk architecture and core features",
      "Deploying and updating a Node.js web application",
      "Managing environments and cleanup operations",
    ],
    objectivesAligned: [
      "Describe the architectural approach used by AWS Elastic Beanstalk.",
      "Deploy and manage Elastic Beanstalk applications.",
    ],
    outcomeAlignment: [
      "Builds practical experience with managed deployment, environment operations, and AWS application delivery best practices.",
    ],
    syllabusContext: [
      "This module follows Lambda and gives a contrasting deployment model based on managed application environments rather than event-driven functions.",
      "It gives students a straightforward path for shipping a full web app while AWS manages most of the infrastructure details.",
    ],
    starterTasks: [
      "Complete the required reading on Elastic Beanstalk",
      "Take lecture notes on environment creation and deployment flow",
      "Prepare screenshots and notes for the Node.js deployment lab",
    ],
    artifacts: [
      "Elastic Beanstalk lab screenshots",
      "Environment management notes",
      "Quiz prep and deployment workflow notes",
    ],
    importantDates: ["Finals week begins: April 6, 2026"],
    assessmentContext: [
      "This module includes required reading, lecture with lab demos, a hands-on lab, and a quiz focused on Elastic Beanstalk deployment and environment management.",
    ],
    moduleSummary: [
      {
        step: "1",
        description: "Complete required reading on Elastic Beanstalk.",
      },
      {
        step: "2",
        description: "Listen to the course lecture with lab demos.",
      },
      {
        step: "3",
        description: "Complete the lab.",
      },
      {
        step: "4",
        description: "Complete the Elastic Beanstalk quiz.",
      },
    ],
    readingHighlights: [
      "Developer Guide: AWSElastiBeanstalk-DeveloperGuide.pdf.",
      "Read pages 1–15.",
    ],
    textTasks: [
      {
        id: "elastic-beanstalk-lab",
        title: "Elastic Beanstalk",
        objective:
          "In this lab, you will learn how to deploy, update, and terminate a Node.js web application using AWS Elastic Beanstalk through the AWS Management Console.",
        tasks: [
          "Deploy the sample Node.js application using the Node.js platform in Elastic Beanstalk.",
          "Download the update package from the AWS Example site, edit index.html, and add your full name after the word Congratulations.",
          "Upload the updated ZIP package to Elastic Beanstalk using Upload and Deploy.",
          "Open the application URL in a browser and verify your name appears in the app.",
          "Terminate the environment to clean up AWS resources after testing.",
        ],
        submissionInstructions: [
          "Screenshot 1: Web app running before the update.",
          "Screenshot 2: Web app showing your name after the update.",
          "Screenshot 3: Elastic Beanstalk dashboard with your environment before termination.",
        ],
        whyItMattersHeading: "Tip",
        whyItMatters:
          "Refer to the Video Demo on Canvas and the AWS documentation for step-by-step help if you need a visual walkthrough while deploying and updating the application.",
        resourceSections: [
          {
            title: "Step 1: Deploy the Sample Node.js App",
            items: [
              "Log in to the AWS Management Console.",
              "Open Elastic Beanstalk.",
              "Create a new application environment using the Node.js platform.",
              "Select the sample Node.js application provided by AWS.",
              "Launch the application and verify that it runs successfully.",
            ],
          },
          {
            title: "Step 2: Update the Application",
            items: [
              "Download the update package from https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html.",
              "Extract the package contents and open index.html.",
              'Add your full name after the word "Congratulations".',
              "Recompress the folder into a ZIP file if needed.",
              'Upload the new version to Elastic Beanstalk using "Upload and Deploy".',
            ],
          },
          {
            title: "Step 3: Verify the Update",
            items: [
              "Open the web application in your browser using the provided environment URL.",
              "Confirm that your full name is visible in the application.",
            ],
          },
          {
            title: "Step 4: Terminate the Environment",
            items: [
              "Return to the Elastic Beanstalk console.",
              "Terminate the environment to clean up AWS resources and avoid unnecessary charges.",
            ],
          },
          {
            title: "AWS Reference",
            items: [
              "AWS Example documentation: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html",
            ],
          },
        ],
      },
    ],
    quiz: {
      title: "Elastic Beanstalk",
      questions: [
        {
          id: 1,
          question: "What is AWS Elastic Beanstalk?",
          options: [
            "makes it even easier for developers to quickly deploy and manage applications in the AWS",
            "makes it even easier for system administrator auto provision databases",
            "makes it even easier for cloud users to storage .jpg files",
            "makes it even easier for developers to configure Lambda services",
          ],
        },
        {
          id: 2,
          question:
            "Which Programming Languages are supported by Elastic Beanstalk? (Select 3)",
          options: ["PHP", "Java", "Python", "C++"],
          multiple: true,
        },
        {
          id: 3,
          question: "Elastic Beanstalk is considered a Platform as a Service?",
          options: ["True", "False"],
        },
        {
          id: 4,
          question:
            "Elastic Beanstalk auto provision EC2 instances when deploying an Application.",
          options: ["True", "False"],
        },
        {
          id: 5,
          question: "Elastic Beanstalk is free.",
          options: ["True", "False"],
        },
        {
          id: 6,
          question: "Elastic Beanstalk is exactly the same as Lambda Services.",
          options: ["True", "False"],
        },
        {
          id: 7,
          question:
            "Elastic Beanstalk configure which of the below AWS services. (Select 3)",
          options: ["EC2", "S3", "IAM", "Azure"],
          multiple: true,
        },
        {
          id: 8,
          question: "Elastic Beanstalk is only meant for Web Developers.",
          options: ["True", "False"],
        },
        {
          id: 9,
          question: "Elastic Beanstalk supports Docker.",
          options: ["True", "False"],
        },
        {
          id: 10,
          question:
            "Elastic Beanstalk environment type can either be load balancing/auto-scaling or single instance.",
          options: ["True", "False"],
        },
      ],
      answers: [
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 1,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 2,
          correctAnswer: [0, 1, 2],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 3,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 4,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 5,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 6,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 7,
          correctAnswer: [0, 1, 2],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 8,
          correctAnswer: [1],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 9,
          correctAnswer: [0],
        },
        {
          quizId: "CS79CModule8ElasticBeanstalkQuiz",
          questionId: 10,
          correctAnswer: [0],
        },
      ],
    },
    milestone:
      "Complete Module 8 with Elastic Beanstalk deployment, environment management, and quiz readiness in place.",
  },
  {
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
  },
  {
    id: 10,
    title: "Final Project: AWS Portfolio Project",
    weekLabel: "Final Deliverable",
    dateLabel: "April 6–12, 2026",
    overview:
      "This final project demonstrates your mastery of AWS computing services and serves as a portfolio piece for your job search. You will design, deploy, and document a cloud architecture that solves a real-world problem using AWS computing services covered in this course.",
    topicLine: "Capstone focus: AWS Portfolio Project",
    focusAreas: [
      "Cloud architecture design for a real-world problem",
      "Hands-on use of AWS computing services from the course",
      "Portfolio-ready documentation and project presentation",
    ],
    objectivesAligned: [
      "Apply cloud architecture best practices to solve real-world problems.",
      "Demonstrate hands-on proficiency with AWS computing services.",
      "Document technical decisions and tradeoffs like a cloud engineer.",
      "Create a portfolio-ready project for job applications and interviews.",
      "Practice explaining technical concepts to both technical and non-technical audiences.",
    ],
    outcomeAlignment: [
      "Brings together the course's AWS compute, deployment, and architecture concepts into one final deliverable that can support both grading and portfolio use.",
    ],
    syllabusContext: [
      "The final project is designed as both a course capstone and a portfolio piece for the job search process.",
      "It should demonstrate mastery of AWS computing services covered throughout the course in one coherent solution.",
      "The final exam remains a separate component, so the project should be documented clearly as its own deliverable.",
    ],
    starterTasks: [
      "Define the real-world problem your cloud architecture will solve.",
      "Select the AWS computing services that best fit the project requirements.",
      "Plan the deployment, documentation, screenshots, and architecture explanation.",
    ],
    artifacts: [
      "Portfolio-ready project brief",
      "Architecture summary and technical decision notes",
      "Deployment evidence, screenshots, and final reflection",
    ],
    importantDates: [
      "Project due date: December 21, 2025",
      "Finals week: April 6–12, 2026",
      "Session ends: April 12, 2026",
      "Faculty grades due: April 19, 2026",
    ],
    assessmentContext: [
      "Final Project — 15% of total course grade",
      "Final Exam — 15% of total course grade and separate from this capstone module",
      "This project should demonstrate both technical implementation and clear communication of design choices.",
    ],
    moduleSummary: [
      {
        step: "1",
        description:
          "Choose a real-world problem and define the project scope.",
      },
      {
        step: "2",
        description:
          "Design and deploy a cloud architecture using AWS computing services from the course.",
      },
      {
        step: "3",
        description:
          "Document the architecture, technical decisions, tradeoffs, and final deployment evidence.",
      },
      {
        step: "4",
        description:
          "Prepare the project as a portfolio-ready deliverable for job applications and interviews.",
      },
    ],
    textTasks: [
      {
        id: "aws-portfolio-project-brief",
        title: "Final Project: AWS Portfolio Project",
        objective:
          "This final project demonstrates your mastery of AWS computing services and serves as a portfolio piece for your job search. You will design, deploy, and document a cloud architecture that solves a real-world problem using AWS computing services covered in this course.",
        tasks: [
          "Apply cloud architecture best practices to solve a real-world problem.",
          "Demonstrate hands-on proficiency with AWS computing services.",
          "Document technical decisions and tradeoffs like a cloud engineer.",
          "Create a portfolio-ready project for job applications and interviews.",
          "Practice explaining technical concepts to both technical and non-technical audiences.",
        ],
        submissionInstructions: [
          "Weight: 15% of final grade.",
          "Due: December 21, 2025.",
          "Submit on Canvas as a single PDF with the GitHub URL on the first page and an optional video link if you created one.",
        ],
        previewFiles: [
          {
            fileUrl:
              "/code-playground/CS79C/final-project/CS79C_AWS_Cloud_Stack_Report_Siarhei_Hancharou.pdf",
            filename: "CS79C_AWS_Cloud_Stack_Report_Siarhei_Hancharou.pdf",
            buttonLabel: "AWS Cloud Stack",
          },
          {
            fileUrl: "/code-playground/CS79C/final-project/final-report.html",
            filename: "final-report.html",
            buttonLabel: "Final report",
          },
        ],
        whyItMattersHeading: "Project Requirements",
        whyItMatters:
          "This project is not just for a grade. It is meant to become a career asset that demonstrates practical AWS experience, clear documentation skills, strong cloud architecture understanding, and real problem-solving ability.",
        resourceSections: [
          {
            title: "Technical Requirements",
            items: [
              "Use one primary compute service: EC2, Lambda, ASG, EKS, or Elastic Beanstalk.",
              "Use one supporting AWS service that is different from the primary choice, such as S3, ASG, ELB, Lambda, IAM, or another appropriate service.",
              "Include at least two supporting infrastructure services such as Auto Scaling Groups, Elastic Load Balancer, S3, RDS or DynamoDB, CloudFormation or Terraform, VPC networking, or CloudWatch.",
              "Implement security with IAM roles, security groups, and least-privilege access.",
              "Demonstrate scalability through auto scaling or load distribution.",
              "Demonstrate high availability across multiple Availability Zones where applicable.",
              "Use free-tier eligible services when possible and document cost projections.",
              "Provide a working deployment with a URL or screenshots, include basic monitoring and error handling, and document cleanup after the project is complete.",
            ],
          },
          {
            title: "Possible Project Categories",
            items: [
              "Category A: Full-Stack Web Application such as a task manager, dynamic portfolio, blog platform, or e-commerce storefront.",
              "Category B: Serverless Application such as an image pipeline, ETL flow, chatbot, webhook processor, or scheduled report generator.",
              "Category C: Container-Based Microservices such as a multi-service API, containerized web app, or background job processing system.",
              "Category D: DevOps Pipeline and Infrastructure such as CI/CD automation, multi-environment infrastructure, blue-green deployment, or disaster recovery setup.",
              "AWS Workshops for inspiration: https://workshops.aws/",
            ],
          },
          {
            title: "Deliverables",
            items: [
              "Public GitHub repository with README, architecture diagram, source code, configuration files, Infrastructure as Code if used, and a screenshots folder.",
              "Technical documentation PDF of 2 to 3 pages, excluding screenshots and diagrams.",
              "Optional but strongly recommended video demo showing introduction, architecture walkthrough, live demo, AWS Console tour, key feature highlight, and conclusion.",
            ],
          },
          {
            title: "Technical Documentation Requirements",
            items: [
              "Executive Summary with project name, tagline, problem statement, target use case, and high-level tech stack overview.",
              "Architecture Design with a diagram, explanation of each component, service choice justification, and how the components interact.",
              "Implementation Details including setup steps, key configurations, challenges, solutions, and testing approach.",
              "Cloud Engineering Best Practices covering security, scalability, high availability, cost analysis, and monitoring.",
              "Lessons Learned and Future Improvements.",
              "Appendix with screenshots of deployed resources, application views, monitoring or logs, and cost estimates.",
            ],
          },
          {
            title: "Resources to Help You",
            items: [
              "AWS Getting Started Guides: https://aws.amazon.com/getting-started/hands-on/",
              "AWS Workshops: https://workshops.aws/",
              "AWS Free Tier: https://aws.amazon.com/free/",
              "AWS Documentation: https://docs.aws.amazon.com/",
              "AWS Architecture Center: https://aws.amazon.com/architecture/",
              "AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/",
              "AWS Reference Architectures: https://github.com/aws-samples",
              "Helpful tools include draw.io, Lucidchart, CloudCraft, Loom, OBS Studio, Zoom, GitHub Desktop, GitHub CLI, and AWS CLI.",
            ],
          },
          {
            title: "Deductions and Academic Integrity",
            items: [
              "Late submission results in a 10 percent deduction per day.",
              "Uncleaned AWS resources should be noted and explained in the report.",
              "Plagiarism or copied projects result in zero points and an academic integrity violation.",
              "You may use AWS documentation, tutorials, official workshops, AI tools for debugging or explanation, and open-source code with proper attribution.",
              "You may not copy another student's project, submit a tutorial unchanged as your own, or have someone else build the project for you.",
            ],
          },
          {
            title: "Cost Management and Free Tier",
            items: [
              "EC2 free tier: 750 hours per month for t2.micro or t3.micro.",
              "Lambda free tier: 1 million requests per month plus 400,000 GB-seconds of compute.",
              "S3 free tier: 5 GB of storage.",
              "RDS free tier: 750 hours per month for db.t2.micro or db.t3.micro.",
              "Set a billing alert in AWS, for example at a $5 threshold.",
              "Stop or terminate resources when not actively testing and delete everything after documentation is complete.",
              "Many careful student projects cost roughly $0 to $5 total.",
            ],
          },
          {
            title: "Sample Project Ideas",
            items: [
              "Personal portfolio with CMS using S3, CloudFront, and Lambda.",
              "URL shortener using API Gateway, Lambda, and DynamoDB.",
              "Automated resume screener using S3, Lambda, Textract, and SES.",
              "Scalable blog platform using EC2, Auto Scaling, RDS, S3, and CloudFront.",
              "Microservices API using ECS Fargate, ALB, and RDS or DynamoDB.",
              "CI/CD pipeline demo using GitHub, CodePipeline, CodeBuild, and Elastic Beanstalk.",
              "Serverless data pipeline using S3, Lambda, DynamoDB, and QuickSight.",
            ],
          },
          {
            title: "FAQs",
            items: [
              "This is an individual project, not a partner assignment.",
              "You must use at least one primary compute service. A second compute service is optional but recommended.",
              "The video demo is optional but strongly recommended.",
              "You do not need to keep the project running after submission if it is documented well and cleanup is explained.",
              "If you extend a project from another class, it must be significantly enhanced with AWS services.",
              "For GitHub inspiration, review examples at https://github.com/topics/aws-project.",
            ],
          },
          {
            title: "Submission Checklist",
            items: [
              "Public GitHub repository with complete code and README.",
              "Architecture diagram included in the README and report.",
              "PDF report with all required sections.",
              "Screenshots in the appendix showing deployed AWS resources.",
              "Optional video demo link if created.",
              "All AWS resources documented in the report.",
              "Resource cleanup plan documented.",
              "Proper citations for external resources used.",
            ],
          },
        ],
      },
    ],
    milestone:
      "Deliver a clean, portfolio-ready AWS project that shows practical cloud architecture skill and strong documentation.",
    isFinalProject: true,
  },
];
