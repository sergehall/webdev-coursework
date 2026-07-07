import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule10Blueprint = {
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
      description: "Choose a real-world problem and define the project scope.",
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
  quiz: {
    title: "Final Exam",
    questions: [
      {
        id: 1,
        question:
          "What are the main benefits of Cloud Computing? (Select All That Apply)",
        options: [
          "Increase Speed and Agility",
          "No Need to Guess Capacity",
          "Increase Physical Access to Servers",
          "No Upfront Cost",
          "Reduced Infrastructure Cost",
        ],
        multiple: true,
      },
      {
        id: 2,
        question:
          "A ______ is a physical location in the world where we have multiple AZs.",
        options: ["Region", "Country", "Area", "City"],
      },
      {
        id: 3,
        question:
          "_________ consist of one or more discrete data centers, each with redundant power, networking, and connectivity, housed in separate facilities.",
        options: ["Availability Zone", "DMZ", "Data Center", "Warehouse"],
      },
      {
        id: 4,
        question:
          "_____________ service that provides secure, resizable compute capacity in the cloud.",
        options: ["S3", "EC2", "IAM", "SAF"],
      },
      {
        id: 5,
        question:
          "AWS __________ lets you run code without provisioning or managing servers.",
        options: ["Auto Scaling", "VPC", "Lambda", "Edge Networks"],
      },
      {
        id: 6,
        question:
          "Amazon __________ lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define",
        options: [
          "WAN - Wide Area Network",
          "LAN - Local Area Network",
          "VPC - Virtual Private Network",
          "NAT - Network Address Translation",
        ],
      },
      {
        id: 7,
        question:
          "What are some of the key characteristics of Amazon Simple Storage Service (Amazon S3)? (Choose 2 answers)",
        options: [
          "Amazon S3 can store unlimited amounts of data.",
          "You must pre-allocate the storage in a bucket.",
          "All objects have a URL.",
          "Objects are world-readable by default.",
        ],
        multiple: true,
      },
      {
        id: 8,
        question:
          "Your company has 100TB of financial records that need to be stored for seven years by law. Experience has shown that any record more than one-year old is unlikely to be accessed. Which of the following storage plans meets these needs in the most cost efficient manner?",
        options: [
          "Store the data on Amazon Elastic Block Store (Amazon EBS) volumes attached to t2.micro instances.",
          "Store the data on Amazon Simple Storage Service (Amazon S3) with lifecycle policies that change the storage class to Amazon Glacier after one year and delete the object after seven years.",
          "Store the data in Amazon Elastic MapReduce (Amazon EMR).",
          "Store the data in Amazon DynamoDB and run daily script to delete data older than seven years",
        ],
      },
      {
        id: 9,
        question:
          "Which of the following are features of Amazon Elastic Block Store (Amazon EBS)? (Choose 2 answers)",
        options: [
          "Amazon EBS data is automatically backed up to tape.",
          "Data on an Amazon EBS volume is lost when the attached instance is stopped.",
          "Amazon EBS volumes can be encrypted.",
          "Data stored on Amazon EBS automatically replicated within an Availability Zone.",
        ],
        multiple: true,
      },
      {
        id: 10,
        question:
          "You need a common file system for your application that is shared between more than one Amazon EC2 instance.",
        options: ["S3 IA", "EFS", "S3", "EBS"],
      },
      {
        id: 11,
        question:
          "Amazon EBS provides block-level storage volumes that you can attach to a running EC2 server instance.",
        options: ["True", "False"],
      },
      {
        id: 12,
        question: "S3 is highly durable with 99.999999999 durability.",
        options: ["True", "False"],
      },
      {
        id: 13,
        question: "An Amazon Machine Image (AMI) is a ...",
        options: [
          "firewall template",
          "Virtual Machine in the cloud",
          "operating system updates.",
          "template that contains a software configuration.",
        ],
      },
      {
        id: 14,
        question:
          "You can run the same Amazon Machine Image on different Instance Types (ie T2 C4).",
        options: ["True", "False"],
      },
      {
        id: 15,
        question: "Security groups are",
        options: [
          "Stateless - if you send a request from your instance, the response traffic for that request is not allowed to flow in regardless of inbound security group rules.",
          "Stateful — if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.",
        ],
      },
      {
        id: 16,
        question:
          "Public–key cryptography authentication is less secure than password authentication.",
        options: ["True", "False"],
      },
      {
        id: 17,
        question: "When an instance is terminated it ... (Select 2)",
        options: [
          "the attached Amazon EBS volumes are deleted unless the volume's deleteOnTermination attribute is set to false.",
          "it can be restarted after termination",
          "the instance performs a normal shutdown",
          "can be restored from AWS backups ... yeah right",
        ],
        multiple: true,
      },
      {
        id: 18,
        question: "Elastic IP addresses is a ...",
        options: [
          "Static IPv4 addresses for dynamic cloud computing",
          "Dynamic IPv4 addresses for dynamic cloud computing",
          "Rotating Load Balancing IPv4 address",
          "Stretchable IP Address",
        ],
      },
      {
        id: 19,
        question:
          "Reserved Instances Make a low, one-time, up-front payment for an instance, reserve it for a one- or three-year term, and pay a significantly lower hourly rate for these instances.",
        options: ["True", "False"],
      },
      {
        id: 20,
        question:
          "A container requires additional system resources than Virtual Machines.",
        options: ["True", "False"],
      },
      {
        id: 21,
        question: "Amazon ECR is a managed AWS Docker registry service.",
        options: ["True", "False"],
      },
      {
        id: 22,
        question: "A ECS task definition ....",
        options: [
          "network access list controls",
          "describes one or more cluster",
          "how EC2 instances should be configured",
          "describes one or more containers",
        ],
      },
      {
        id: 23,
        question:
          "Serverless computing allows you to build and run applications and services without having to manage infrastructure.",
        options: ["True", "False"],
      },
      {
        id: 24,
        question: "API Gateway ... (Select 2)",
        options: [
          "is a firewall",
          "EC2 Task Service",
          "use the GET method",
          "receives an HTTPS requests",
        ],
        multiple: true,
      },
      {
        id: 25,
        question: "Select the Lambda event triggers (Select 3)",
        options: ["S3", "ECS", "API Gateway", "SNS"],
        multiple: true,
      },
      {
        id: 26,
        question:
          "Memory/RAM is the only server resource you have access to modify.",
        options: ["True", "False"],
      },
      {
        id: 27,
        question:
          "CPU type can be directly changed for a given Lambda function.",
        options: ["True", "False"],
      },
      {
        id: 28,
        question:
          "Configured IAM roles are required to access any Amazon resource such S3 or DynamoDB.",
        options: ["True", "False"],
      },
      {
        id: 29,
        question: "What is AWS Elastic Beanstalk?",
        options: [
          "makes it even easier for system administrator auto provision databases",
          "makes it even easier for developers to quickly deploy and manage applications in the AWS",
          "makes it even easier for cloud users to storage .jpg files",
          "makes it even easier for developers to configure Lambda services",
        ],
      },
      {
        id: 30,
        question:
          "Which of the following are required elements of an Auto Scaling group? (Choose 2 answers)",
        options: [
          "Minimum size",
          "All of the above",
          "Desired capacity",
          "Launch configuration",
        ],
        multiple: true,
      },
      {
        id: 31,
        question: "An Auto Scaling group may use: (Choose 2 answers)",
        options: [
          "Already running instances if they use the same Amazon Machine Image (AMI) as the Auto Scaling group’s launch configuration and are not already part of another Auto Scaling group",
          "On-Demand Instances",
          "Terminated instances",
          "Spot Instances",
        ],
        multiple: true,
      },
      {
        id: 32,
        question: "Elastic load balancers only exist in one AZ.",
        options: ["True", "False"],
      },
      {
        id: 33,
        question: "A single Elastic Load Balancer can have multiple listeners?",
        options: ["True", "False"],
      },
      {
        id: 34,
        question:
          "CloudFormation provides a common language for you to describe and provision all the infrastructure resources in your cloud environment.",
        options: ["True", "False"],
      },
      {
        id: 35,
        question:
          "CloudFormation support which of the following formatted text? (Select 2)",
        options: ["YAML", "XML", "JSON", "HTML"],
        multiple: true,
      },
      {
        id: 36,
        question: "A CloudFormation Stack is _____________",
        options: [
          "A single unit of AWS resources",
          "A multiple region AZ",
          "A single unit of VPCs",
          "Two EC2 instances",
        ],
      },
      {
        id: 37,
        question:
          "CloudFormation will make modification to the stack based on changes to the template.",
        options: ["True", "False"],
      },
      {
        id: 38,
        question: "What is the current version of AWSTemplateFormatVersion?",
        options: ["2010-09-01", "2018-09-09", "2010-09-09", "2010-11-09"],
      },
      {
        id: 39,
        question: "CloudFormation Parameter section allows _____________.",
        options: [
          "declares the AWS resources.",
          "input custom values to template",
          "a short description regarding the template",
          "data about the data",
        ],
      },
      {
        id: 40,
        question: "CloudFormation resource section __________________",
        options: [
          "declare the anti-virus software to use",
          "detail external security tools",
          "import existing AWS resources",
          "declares AWS resources in the stack.",
        ],
      },
      {
        id: 41,
        question: "Which CloudFormation section is required?",
        options: ["resources", "parameter", "output", "guardduty"],
      },
      {
        id: 42,
        question:
          "You've been tasked with architecting a highly available application. After building the initial environment, you've discovered that your current security group configuration does not include a port you need for certain traffic. After adding the port to the appropriate security group, how long will it take for your changes to take effect, allowing your application to function correctly?",
        options: [
          "Changes to a security group take effect as soon as they are saved.",
          "5 minutes",
          "It usually takes a couple of minutes for these changes to take effect.",
          "Changes will take effect immediately upon reboot of the EC2 instance in question.",
        ],
      },
      {
        id: 43,
        question:
          "Your company needs to run several monthly workloads that will each take several hours to complete. Although critical, these workloads can be stopped and restarted without adversely affecting the outcome of the job. Which pricing model would you use to deliver the most economical solution?",
        options: [
          "Spot Instances",
          "On-demand Instances",
          "Reserved Instances",
          "Free-Tier Instances",
        ],
      },
      {
        id: 44,
        question:
          "Your company requires that all the data on your EBS-backed EC2 volumes be encrypted. How would you go about doing this?",
        options: [
          "AWS allows you to encrypt an EBS volume at the time of creation.",
          "Encryption is done at the OS layer.",
          "You cannot enable EBS encryption on a specific volume.",
          "None of these",
        ],
      },
      {
        id: 45,
        question:
          "Which of the following operating systems is NOT supported by EC2?",
        options: ["Ubuntu", "Windows Server", "Amazon Linux", "OSX"],
      },
      {
        id: 46,
        question:
          "You are a solutions architect working for a company that conducts surveys on specific industries. Each industry that you survey has its own EC2 fleet, separate from those of other industries. Company policy dictates that you should keep costs to a minimum, using only 1 load balancer, if possible. What type of load balancer should you use to suit this requirement?",
        options: [
          "Network Load Balancer",
          "Classic Load Balancer",
          "Elastic Load Balancer",
          "Application Load Balancer",
        ],
      },
      {
        id: 47,
        question:
          "True or False: Amazon will always have root level SSH access in to your EC2 instances.",
        options: ["True", "False"],
      },
      {
        id: 48,
        question:
          "When selecting an EC2 instance type for your application, it's important to know which of the following? (Choose 2)",
        options: [
          "The required number of network connections",
          "The location from which most traffic comes",
          "The peak expected usage",
          "The memory requirements",
        ],
        multiple: true,
      },
      {
        id: 49,
        question: "Which of the following are AWS compute services? (Choose 3)",
        options: ["EFS", "EC2", "ECS", "Lambda"],
        multiple: true,
      },
      {
        id: 50,
        question:
          "When a snapshot is being taken against an EBS volume, the volume becomes unavailable and the instance no longer has the ability to communicate with the EBS volume until the snapshot is complete.",
        options: ["True", "False"],
      },
      {
        id: 51,
        question:
          "You need to develop an infrastructure that can be replicated and deployed in another AWS Region in a matter of minutes. Which AWS service might you use to build a reproducible, version-controlled infrastructure?",
        options: [
          "Elastic Beanstalk",
          "CloudWatch Template",
          "EC2 AMIs with EBS snapshots",
          "CloudFormation",
        ],
      },
      {
        id: 52,
        question:
          "You have a static HTML website that requires inexpensive, highly available hosting solution that scales automatically to meet traffic demands. Which AWS service would best suit this requirement?",
        options: [
          "S3 - Static Website Hosting",
          "EC2 with CloudFront",
          "EC2 with EBS behind and Autoscaling Group with a minimum configuration of 1 instance",
          "EC2 with EBS behind and Autoscaling Group with a minimum configuration of 2 instances",
        ],
      },
      {
        id: 53,
        question: "A Region is another name for an Edge Location.",
        options: ["True", "False"],
      },
      {
        id: 54,
        question:
          "Your AWS environment contains several on-demand, EBS-backed EC2 instances dedicated to a project that has just been canceled. Your supervisor does not want to incur charges for these on-demand instances, but also does not want to lose the data just yet because there is a chance the project may be revived in the next few days. What should you do to minimize charges for these instances in the meantime?",
        options: [
          "Explain your situation to AWS Support and ask them to hold your instances for you.",
          "Terminate the instances.",
          "Stop the instances as soon as possible.",
          "Take snapshots of the EBS volumes and sell the instances on the In-Demand Instance Marketplace.",
        ],
      },
      {
        id: 55,
        question:
          "Which of the following protocols is not supported with an Classic Load Balancer? (Choose 2)",
        options: ["FTP", "HTTP", "SSH", "HTTPS"],
        multiple: true,
      },
    ],
    answers: [
      {
        quizId: "CS79CFinalExamQuiz",
        questionId: 1,
        correctAnswer: [0, 1, 3, 4],
      },
      { quizId: "CS79CFinalExamQuiz", questionId: 2, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 3, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 4, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 5, correctAnswer: [2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 6, correctAnswer: [2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 7, correctAnswer: [0, 2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 8, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 9, correctAnswer: [2, 3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 10, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 11, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 12, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 13, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 14, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 15, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 16, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 17, correctAnswer: [0, 2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 18, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 19, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 20, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 21, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 22, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 23, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 24, correctAnswer: [2, 3] },
      {
        quizId: "CS79CFinalExamQuiz",
        questionId: 25,
        correctAnswer: [0, 2, 3],
      },
      { quizId: "CS79CFinalExamQuiz", questionId: 26, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 27, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 28, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 29, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 30, correctAnswer: [0, 3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 31, correctAnswer: [1, 3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 32, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 33, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 34, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 35, correctAnswer: [0, 2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 36, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 37, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 38, correctAnswer: [2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 39, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 40, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 41, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 42, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 43, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 44, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 45, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 46, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 47, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 48, correctAnswer: [2, 3] },
      {
        quizId: "CS79CFinalExamQuiz",
        questionId: 49,
        correctAnswer: [1, 2, 3],
      },
      { quizId: "CS79CFinalExamQuiz", questionId: 50, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 51, correctAnswer: [3] },
      { quizId: "CS79CFinalExamQuiz", questionId: 52, correctAnswer: [0] },
      { quizId: "CS79CFinalExamQuiz", questionId: 53, correctAnswer: [1] },
      { quizId: "CS79CFinalExamQuiz", questionId: 54, correctAnswer: [2] },
      { quizId: "CS79CFinalExamQuiz", questionId: 55, correctAnswer: [0, 2] },
    ],
  },
  milestone:
    "Deliver a clean, portfolio-ready AWS project that shows practical cloud architecture skill and strong documentation.",
  isFinalProject: true,
} satisfies CS79CModuleBlueprint;
