import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule08Blueprint = {
  id: 8,
  title: "Final Project: AWS Architecture",
  weekLabel: "Week 8",
  dateLabel: "June 1-12, 2026",
  overview:
    "The final project is to design and implement a production-level cloud architecture using AWS that reflects real-world application stacks. The solution must show how selected AWS services integrate as one cohesive, scalable, secure, and cost-efficient system.",
  topicLine: "Final Project — Production-Level AWS Architecture",
  isFinalProject: true,
  focusAreas: [
    "Production-level AWS architecture design",
    "Frontend, backend, compute, and persistent storage integration",
    "At least five AWS services working as a cohesive application stack",
    "Security hardening and locked-down cloud resources",
    "Auto Scaling and Load Balancing",
    "Monitoring, alerts, and cost-aware operations",
    "AI integration",
    "Clear architecture diagram and presentation-ready documentation",
  ],
  objectivesAligned: [
    "Design and implement a real-world AWS application stack",
    "Integrate at least five AWS services into a cohesive architecture",
    "Use compute, two persistent storage types, load balancing, and auto scaling",
    "Demonstrate security controls for authentication, authorization, encryption, certificates, and common cloud risks",
    "Document the architecture clearly enough for technical and security review",
  ],
  outcomeAlignment: [
    "Show mastery of CS 79 cloud fundamentals with emphasis on AWS security",
    "Explain how services interact across frontend, backend, compute, storage, security, monitoring, and AI layers",
    "Produce an accessible final presentation, live demo, or review-ready AWS console/documentation package",
  ],
  syllabusContext: [
    "Module 8 of 8 — final project and course capstone",
    "Pass/fail evaluation: full credit when the project is functional, accessible, and clearly documented during review",
    "Project should reflect CS 79 series concepts and independent cloud learning where useful",
    "Security is the focus because CS 79D is AWS security-centered",
    "All active services must remain available until grading is completed",
  ],
  starterTasks: [
    "Choose the application purpose, target users, and problem it solves",
    "Select at least five AWS services that work together as one stack",
    "Design frontend, backend, compute, storage, security, monitoring, and AI layers",
    "Create an architecture diagram in Lucidchart or Miro",
    "Run the Mozilla Observatory scan and target at minimum a C+ or better",
    "Prepare one submission option: video, live Zoom presentation, or AWS console access with documentation",
  ],
  artifacts: [
    "Functional AWS application stack",
    "Architecture diagram showing how components interact",
    "Security implementation evidence and Mozilla Observatory scan target of C+ or better",
    "4-6 minute video presentation, live Zoom presentation, or secure AWS console access",
    "Documentation explaining architecture, features, setup, configurations, and security measures",
  ],
  importantDates: [
    "June 1 — Final Project opens at 12:00 am",
    "June 11 — Final Project: AWS Architecture due at 11:59 pm",
    "June 12 — Final Project availability closes at 11:59 pm",
  ],
  assessmentContext: [
    "Final Project: AWS Architecture — ungraded, 100 possible points",
    "Status: In Progress",
    "Next up: Submit Assignment",
    "Unlimited attempts allowed",
    "Available: June 1, 2026 at 12:00 am until June 12, 2026 at 11:59 pm",
    "Pass/fail basis: full credit when the project is functional, accessible, and clearly documented",
  ],
  milestone:
    "Production-level AWS architecture implemented, secured, documented, and submitted for final review",
  moduleSummary: [
    {
      step: "1",
      description:
        "Define the project purpose, target users, problem solved, and the application features that will demonstrate the architecture.",
    },
    {
      step: "2",
      description:
        "Build a cohesive AWS stack with frontend, backend, compute, at least two persistent storage options, Auto Scaling, Load Balancing, monitoring, alerts, security, and AI integration.",
    },
    {
      step: "3",
      description:
        "Create a clear architecture diagram using Lucidchart or Miro to show how all services interact.",
    },
    {
      step: "4",
      description:
        "Validate security posture with locked-down resources, certificates, authentication/authorization, encryption, and a Mozilla Observatory result of at least C+ where applicable.",
    },
    {
      step: "5",
      description:
        "Submit using one of the three options: recorded video, live Zoom presentation, or secure AWS console access with documentation.",
    },
  ],
  readingHighlights: [
    "AWS Well-Architected Framework — use the security, reliability, performance efficiency, cost optimization, and operational excellence pillars as review lenses.",
    "Mozilla Observatory — target at minimum a C+ or better: https://developer.mozilla.org/en-US/observatory",
    "Lucidchart or Miro — use one of these tools to create the required architecture diagram.",
    "Review prior CS 79 labs for IAM, networking, monitoring, CloudFront, WAF, storage, and deployment patterns.",
  ],
  serviceHighlights: [
    {
      service: "Compute",
      pages: "Processing layer",
      notes:
        "Use EC2, Lambda, EKS, or another compute service to perform backend processing or serverless execution.",
    },
    {
      service: "Persistent Storage",
      pages: "Data layer",
      notes:
        "Use at least two different storage types such as EBS, EFS, RDS, S3, DynamoDB, or other persistent services.",
    },
    {
      service: "Load Balancing and Auto Scaling",
      pages: "Scalability layer",
      notes:
        "Use load balancing and scaling controls to demonstrate production-minded availability and capacity handling.",
    },
    {
      service: "Security",
      pages: "Protection layer",
      notes:
        "Use security groups, certificates, encryption, IAM controls, and mitigation of common misconfiguration risks.",
    },
    {
      service: "Monitoring and Alerts",
      pages: "Operations layer",
      notes:
        "Use monitoring and alerting to detect issues, support review, and help save cost.",
    },
    {
      service: "AI Integration",
      pages: "Application capability",
      notes:
        "Include an AI-powered feature or AWS AI service integration as part of the final architecture.",
    },
  ],
  textTasks: [
    {
      id: "final-project-aws-architecture",
      title: "Project requirements:",
      objective:
        "Design and implement a production-level AWS cloud architecture that reflects a real-world application stack and emphasizes scalability, security, and cost efficiency.",
      tasks: [
        "Build a cohesive application stack with at least five AWS services.",
        "Include a frontend.",
        "Include a backend.",
        "Include a server, serverless service, or compute layer such as EC2, Lambda, or EKS.",
        "Include persistent storage solutions.",
        "Use at least two different types of persistent storage such as EBS, EFS, RDS, S3, DynamoDB, or similar services.",
        "Include Auto Scaling and Load Balancing.",
        "Include security controls such as security groups, certificates, encryption, and protection from common security issues.",
        "Lock down the application stack and target at minimum a C+ or better from the Mozilla Observatory scan.",
        "Include Monitoring and Alerts to support operations and cost awareness.",
        "Include AI integration.",
        "Create a clear, well-structured architecture diagram that visually represents the stack design and how all components interact.",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Thursday, June 11, 2026 at 11:59 pm",
        "Ungraded — 100 possible points",
        "Status: In Progress",
        "Unlimited attempts allowed",
        "Available: June 1, 2026 at 12:00 am until June 12, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Project Context",
      whyItMatters:
        "This final project showcases the core concepts and skills learned throughout the CS 79 series, especially the security focus from CS 79D. The project does not require completing every course in the series, but it should demonstrate solid cloud fundamentals and a practical understanding of how AWS services work together in a secure production-style stack.",
      previewFiles: [
        {
          fileUrl:
            "/code-playground/CS79D/mod-8/CS79D_Final_Project_AWS_Review.pdf",
          filename: "CS79D_Final_Project_AWS_Review.pdf",
          buttonLabel: "Open Final Project AWS Review PDF",
        },
      ],
      resourceSections: [
        {
          title: "Architecture Diagram Tools",
          items: ["https://www.lucidchart.com", "https://miro.com"],
        },
        {
          title: "Security Scan",
          items: [
            "Mozilla Observatory: https://developer.mozilla.org/en-US/observatory",
            "Target at minimum a C+ or better where applicable.",
          ],
        },
      ],
    },
    {
      id: "final-project-submission-options",
      title: "Deliverable:",
      objective:
        "Choose one of the three approved submission paths for final project review.",
      tasks: [
        "Option 1: Create a 4-6 minute video presentation.",
        "In the video, introduce the project purpose, target users, and the problem it solves.",
        "Walk through what you built, including features, functionality, frontend, backend, integrations, and overall architecture.",
        "Explain the technologies and AWS services used, including compute, databases, security, tools, and why you chose them.",
        "Show that the stack is secured with authentication, authorization, encryption/certificates, secure cloud resource configuration, and protection from exposed endpoints or other common vulnerabilities.",
        "Include monitoring, logging, backups, and security tools if implemented.",
        "Conclude with what you learned, challenges faced, and how the design balances usability and security.",
        "Option 2: Schedule a live Zoom presentation during office hours and use the same presentation expectations as Option 1.",
        "Option 3: Provide secure AWS Management Console access for review, such as a temporary IAM user account, and ensure resources are clearly visible and organized with tags.",
        "For Option 3, provide clear documentation describing architecture, connected services, key features, application behavior, setup steps, configurations, and security measures.",
      ],
      submissionInstructions: [
        "Option 1: Upload the completed video to Canvas.",
        "Option 2: Email the instructor in advance to schedule the office-hours Zoom meeting.",
        "Option 3: Keep all services active and accessible until grading is completed, then terminate services after grading.",
      ],
      whyItMattersHeading: "Review Expectations",
      whyItMatters:
        "The final review is meant to verify that the architecture is real, functional, understandable, and secure. The instructor should be able to see what was built, why each service was chosen, how the services interact, and what security measures protect the stack.",
    },
  ],
  quiz: {
    title: "Final Exam: Cloud Practitioner Practice Exam #2",
    dueLabel: "Module 8 final exam review - 66 questions",
    questions: [
      {
        id: 1,
        question:
          "Which of the following is the name of the security model employed by AWS with its customers?",
        options: [
          "The shared secret model",
          "The shared responsibility model",
          "The shared secret key model",
          "The secret key responsibility model",
        ],
      },
      {
        id: 2,
        question:
          "AWS will security the guest operating system on all EC2 instances.",
        options: ["True", "False"],
      },
      {
        id: 3,
        question: "AWS data centers exact locations are well known.",
        options: ["True", "False"],
      },
      {
        id: 4,
        question:
          "AWS data center facilities use which of the following security measures. (Select all that apply)",
        options: [
          "gaseous sprinkler systems",
          "uninterruptible Power Supply (UPS)",
          "video surveillance",
          "professional security staff",
        ],
        multiple: true,
      },
      {
        id: 5,
        question:
          "AWS provides you with the flexibility to place instances and store data within multiple geographic regions as well as across multiple availability zones within each region.",
        options: ["True", "False"],
      },
      {
        id: 6,
        question:
          "Distributing your applications and services across multiple availability zones provides the ability to remain resilient in the face of most failure scenarios.",
        options: ["True", "False"],
      },
      {
        id: 7,
        question:
          "To help ensure that only authorized users and processes access your AWS Account and resources, AWS uses several types of credentials for authentication:",
        options: ["Password", "Key Pair", "Access Key", "Finger Prints"],
        multiple: true,
      },
      {
        id: 8,
        question: "AWS is able to retrieve customers lost passwords.",
        options: ["True", "False"],
      },
      {
        id: 9,
        question:
          "It's is good security practice to allow AWS IAM users ___________",
        options: [
          "root permissions",
          "minimum permissions",
          "maximum permissions",
          "no permissions",
        ],
      },
      {
        id: 10,
        question: "Which AWS Service is used for recording account activity?",
        options: ["AWS Config", "CloudTrail", "S3", "EC2"],
      },
      {
        id: 11,
        question:
          "AWS is responsible for the security of user application in their infrastrature.",
        options: ["True", "False"],
      },
      {
        id: 12,
        question:
          "If your AWS EC2 instance is hacked, it is Amazon Web Services fault.",
        options: ["True", "False"],
      },
      {
        id: 13,
        question:
          "AWS is responsible for the security of the EC2 instance operating system.",
        options: ["True", "False"],
      },
      {
        id: 14,
        question:
          "Which of the below EC2 resources is it the customer responsibility to secure? (Select All That Apply)",
        options: [
          "Applications",
          "Data in Transit",
          "Operating System",
          "BIOS",
        ],
        multiple: true,
      },
      {
        id: 15,
        question:
          "AWS secure more resources for manage services (Elastic Beanstalk) vs unmanaged services (EC2).",
        options: ["True", "False"],
      },
      {
        id: 16,
        question:
          "AWS Config rule represents your desired configuration settings for specific AWS resources or for an entire AWS account",
        options: ["False", "True"],
      },
      {
        id: 17,
        question:
          "AWS Config also generates configuration items when the configuration of a resource",
        options: ["Periodically", "Changes", "Never", "Every 10 min"],
      },
      {
        id: 18,
        question:
          "AWS Config randomly evaluates your AWS resource configurations for desired settings based on the rules",
        options: ["True", "False"],
      },
      {
        id: 19,
        question:
          "AWS Config can be used to monitor your global AWS resources.",
        options: ["True", "False"],
      },
      {
        id: 20,
        question:
          "Your security team is very concerned about the vulnerability of the IAM administrator user accounts (the accounts used to configure all IAM features and accounts). What steps can be taken to lock down these accounts? (Choose 2 answers)",
        options: [
          "Add multi-factor authentication (MFA) to the accounts.",
          "Implement a password policy on the AWS account.",
          "Add a CAPTCHA test to the accounts.",
          "Delete account",
        ],
        multiple: true,
      },
      {
        id: 21,
        question:
          "You should use your AWS root account for everyday administrative tasks.",
        options: ["True", "False"],
      },
      {
        id: 22,
        question:
          "Amazon CloudWatch supports which types of monitoring plans? (Choose 2 answers)",
        options: [
          "Detailed monitoring, which is free",
          "Detailed monitoring, which has an additional cost",
          "Basic monitoring, which is free",
          "Basic monitoring, which has an additional cost",
        ],
        multiple: true,
      },
      {
        id: 23,
        question:
          "You can create a CloudWatch alarm that watches a single metric",
        options: ["True", "False"],
      },
      {
        id: 24,
        question:
          "Which AWS service automated security assessment to help improve the security and compliance of applications deployed on AWS.",
        options: ["CloudWatch", "Inspector", "Trusted Advisor", "AWS Config"],
      },
      {
        id: 25,
        question: "Amazon Inspector requires a agent to be installed.",
        options: ["True", "False"],
      },
      {
        id: 26,
        question:
          "Amazon Inspector checks your system against the CVE security database?",
        options: ["True", "False"],
      },
      {
        id: 27,
        question:
          "Inspector agents can be installed on which operating systems? (Select 3)",
        options: ["Windows 2003", "Redhat", "Amazon Linux", "Windows 2008 R2"],
        multiple: true,
      },
      {
        id: 28,
        question: "CVE can be search at which website?",
        options: [
          "https://cve.com",
          "https://inspector.com",
          "https://cve.mitre.org/",
          "https://nvd.nist.org",
        ],
      },
      {
        id: 29,
        question:
          "What is the minimum size subnet that you can have in an Amazon VPC?",
        options: ["/28", "/24", "/30", "/26"],
      },
      {
        id: 30,
        question:
          "You are a solutions architect working for a large travel company that is migrating its existing server estate to AWS. You have recommended that they use a custom Amazon VPC, and they have agreed to proceed. They will need a public subnet for their web servers and a private subnet in which to place their databases. They also require that the web servers and database servers be highly available and that there be a minimum of two web servers and two database servers each. How many subnets should you have to maintain high availability?",
        options: ["1", "2", "3", "4"],
      },
      {
        id: 31,
        question:
          "What is the maximum size IP address range that you can have in an Amazon VPC?",
        options: ["/30", "/24", "/16", "/28"],
      },
      {
        id: 32,
        question:
          "You create a new subnet and then add a route to your route table that routes traffic out from that subnet to the Internet using an IGW. What type of subnet have you created?",
        options: [
          "An internal subnet",
          "A private subnet",
          "A public subnet",
          "An external subnet",
        ],
      },
      {
        id: 33,
        question: "What happens when you create a new Amazon VPC?",
        options: [
          "Three subnets are created by default in one Availability Zone.",
          "Three subnets are created by default-one for each Availability Zone.",
          "An IGW is created by default.",
          "A main route table for the new VPC is created by default.",
        ],
      },
      {
        id: 34,
        question:
          "You create a new VPC in US-East-1 and provision three subnets inside this Amazon VPC. Which of the following statements is true?",
        options: [
          "All subnets are public by default.",
          "All subnets will be able to communicate with each other by default.",
          "By default, these subnets will not be able to communicate with each other; you will need to create routes.",
          "Each subnet will have identical CIDR blocks.",
        ],
      },
      {
        id: 35,
        question: "What aspect of an Amazon VPC is stateful?",
        options: [
          "Amazon DynamoDB",
          "Network ACLs",
          "Amazon S3",
          "Security groups",
        ],
      },
      {
        id: 36,
        question:
          "How many VPC Peering connections are required for four VPCs located within the same AWS region to be able to send traffic to each of the others?",
        options: ["6", "2", "5", "4"],
      },
      {
        id: 37,
        question:
          "You are responsible for your company's AWS resources, and you notice a significant amount of traffic from an IP address in a foreign country in which your company does not have customers. Further investigation of the traffic indicates the source of the traffic is scanning for open ports on your EC2-VPC instances. Which one of the following resources can deny the traffic from reaching the instances?",
        options: [
          "NAT instance",
          "Security group",
          "Network ACL",
          "An Amazon VPC endpoint",
        ],
      },
      {
        id: 38,
        question:
          "You have an application that for legal reasons must be hosted in the United States when U.S. citizens access it. The application must be hosted in the European Union when citizens of the EU access it. For all other citizens of the world, the application must be hosted in Sydney. Which routing policy should you choose in order to achieve this?",
        options: [
          "Latency-based routing",
          "Failover routing",
          "Geolocation routing",
          "Simple routing",
        ],
      },
      {
        id: 39,
        question:
          "You host a web application across multiple AWS regions in the world, and you need to configure your DNS so that your end users will get the fastest network performance possible. Which routing policy should you apply?",
        options: [
          "Weighted routing",
          "Geolocation routing",
          "Latency-based routing",
          "Simple routing",
        ],
      },
      {
        id: 40,
        question:
          "You are rolling out A and B test versions of a web application to see which version results in the most sales. You need 10 percent of your traffic to go to version A, 10 percent to go to version B, and the rest to go to your current production version. Which routing policy should you choose to achieve this?",
        options: [
          "Failover routing",
          "Simple routing",
          "Geolocation routing",
          "Weighted routing",
        ],
      },
      {
        id: 41,
        question:
          "Your company has its primary production site in Western Europe and its DR (Disaster Recovery) site in the Asia Pacific. You need to configure DNS so that if your primary site becomes unavailable, you can fail DNS over to the secondary site. Which DNS routing policy would best achieve this?",
        options: [
          "Simple routing",
          "Weighted routing",
          "Failover routing",
          "Geolocation routing",
        ],
      },
      {
        id: 42,
        question: "Which is a function that Amazon Route 53 does not perform?",
        options: [
          "Health checks",
          "Domain registration",
          "Load balancing",
          "DNS service",
        ],
      },
      {
        id: 43,
        question: "AWS CDN is _____________ ?",
        options: ["CloudCDN", "CloudCache", "CloudFormation", "CloudFront"],
      },
      {
        id: 44,
        question: "A CloudFront origin can be _________ . (Select 3)",
        options: ["ELB/ALB", "EC2 Instance", "S3 Bucket", "Lambda Function"],
        multiple: true,
      },
      {
        id: 45,
        question: "CloudFront will cache web for how long?",
        options: ["TLL", "SNMP", "TTL", "RFC"],
      },
      {
        id: 46,
        question: "WAF can protect against which of the following threats?",
        options: ["Back Doors", "Heart Bleed", "Shell Shock", "SYN Floods"],
      },
      {
        id: 47,
        question:
          "WAF can be configured to be dynamically updated by a Lambda function.",
        options: ["True", "False"],
      },
      {
        id: 48,
        question:
          "Shield Standard must be enabled before providing DDOS protection.",
        options: ["True", "False"],
      },
      {
        id: 49,
        question:
          "WAF can be configured to block all traffic from specified countries.",
        options: ["True", "False"],
      },
      {
        id: 50,
        question:
          "If your business or industry is a likely target of DDoS attacks, or if you prefer to let AWS handle the majority of DDoS protection and mitigation responsibilities for layer 3, layer 4, and layer 7 attacks, AWS Shield Advanced might be the best choice.",
        options: ["True", "False"],
      },
      {
        id: 51,
        question:
          "Which AWS services can be used to store files? Choose 2 answers from the options given below",
        options: ["CloudWatch", "AWS Config", "EBS", "S3"],
        multiple: true,
      },
      {
        id: 52,
        question: "Which of the following services uses AWS edge locations?",
        options: ["CloudFront", "EC2", "VPC", "Storage Gateway"],
      },
      {
        id: 53,
        question:
          "Which AWS service provides infrastructure security optimization recommendations?",
        options: ["Spot Instance", "Trust Advisor", "API", "Reserve Instances"],
      },
      {
        id: 54,
        question:
          "Which service allows for the collection and tracking of metrics for AWS services?",
        options: ["CloudFront", "CloudTrail", "ML", "CloudWatch"],
      },
      {
        id: 55,
        question:
          "A company needs to know which user was responsible for terminating several critical Amazon Elastic Compute Cloud (Amazon EC2) Instances. Where can the customer find this information?",
        options: ["Trust Advisor", "CloudTrail", "EC2", "CloudWatch"],
      },
      {
        id: 56,
        question:
          "Which of the following is the responsibility of the AWS customer according to the Shared Security Model?",
        options: [
          "Managing AWS Identity and Access Management (IAM)",
          "Implementing Service Organization Control (SOC) standards",
          "Securing edge locations",
          "Monitoring physical device security",
        ],
      },
      {
        id: 57,
        question: "Who has control of the data in an AWS account?",
        options: [
          "AWS Support Team",
          "AWS Account Owner (root)",
          "AWS Technical Account Manager",
          "AWS Security Team",
        ],
      },
      {
        id: 58,
        question:
          "Which of the following is a benefit of running an application across two Availability Zones?",
        options: [
          "Performance is improved over running in a single Availability Zone.",
          "It is more secure than running in a single Availability Zone.",
          "It increases the availability of an application compared to running in a single Availability Zon",
          "It significantly reduces the total cost of ownership versus running in a single Availability Zone.",
        ],
      },
      {
        id: 59,
        question:
          "Which of the following security requirements are managed by AWS customers? Select 2 answers from the options given below.",
        options: [
          "Physical security",
          "Hardware patching",
          "Password Policies",
          "User permissions",
          "Disk disposal",
        ],
        multiple: true,
      },
      {
        id: 60,
        question:
          "How can the AWS Management Console be secured against unauthorized access?",
        options: [
          "Apply Multi-Factor Authentication (MFA)",
          "Request root access privileges",
          "Set up a secondary password",
          "Disable AWS console acces",
        ],
      },
      {
        id: 61,
        question:
          "The Trusted Advisor service provides insight regarding which four categories of an AWS account?",
        options: [
          "Performance, cost optimization, security, and fault tolerance",
          "Performance, cost optimization, access control, and connectivity",
          "Security, access control, high availability, and performance",
          "Security, fault tolerance, high availability, and connectivity",
        ],
      },
      {
        id: 62,
        question:
          "Which of the following can be used to protect EC2 Instances hosted in AWS. Choose 2 answers from the options given below",
        options: [
          "Usage of Network Access Control Lists",
          "Usage of Security Groups",
          "Usage of the Internet gateway",
          "Usage of AMI's",
        ],
        multiple: true,
      },
      {
        id: 63,
        question:
          "You want to add an extra layer of protection to the current authentication mechanism of user names and passwords for AWS. Which of the following can help in this regard",
        options: [
          "Using MFA",
          "Using Password Policies",
          "Using AWS WAF",
          "Using a mix of user names",
        ],
      },
      {
        id: 64,
        question:
          "Which of the following is the responsibility of AWS according to the Shared Security Model? Choose 3 answers from the options given below",
        options: [
          "Securing edge locations",
          "Implementing service organization Control (SOC) standards",
          "Managing AWS Identity and Access Management (IAM)",
          "Monitoring physical device security",
        ],
        multiple: true,
      },
      {
        id: 65,
        question:
          "Which of the following are the advantages of using the S3 Multipart Upload feature? (Select all that apply)",
        options: [
          "Multipart uploading also encrypts the data automatically using the KMS encryption.",
          "Multipart uploading allows you to pause and resume uploading at any time.",
          "All of the above",
          "Multipart Uploading process supports unlimited object size.",
          "Multipart Uploading process supports up to maximum 5TB object size.",
        ],
        multiple: true,
      },
      {
        id: 66,
        question: "KMS is integrated with which of the following services?",
        options: ["EBS", "S3", "SNS", "RDS"],
        multiple: true,
      },
    ],
    answers: [
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 1,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 2,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 3,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 4,
        correctAnswer: [0, 1, 2, 3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 5,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 6,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 7,
        correctAnswer: [0, 1, 2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 8,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 9,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 10,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 11,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 12,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 13,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 14,
        correctAnswer: [0, 1, 2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 15,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 16,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 17,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 18,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 19,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 20,
        correctAnswer: [0, 1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 21,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 22,
        correctAnswer: [1, 2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 23,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 24,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 25,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 26,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 27,
        correctAnswer: [1, 2, 3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 28,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 29,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 30,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 31,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 32,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 33,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 34,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 35,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 36,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 37,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 38,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 39,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 40,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 41,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 42,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 43,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 44,
        correctAnswer: [0, 1, 2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 45,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 46,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 47,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 48,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 49,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 50,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 51,
        correctAnswer: [2, 3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 52,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 53,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 54,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 55,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 56,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 57,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 58,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 59,
        correctAnswer: [2, 3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 60,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 61,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 62,
        correctAnswer: [0, 1],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 63,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 64,
        correctAnswer: [0, 1, 3],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 65,
        correctAnswer: [1, 4],
      },
      {
        quizId: "CS79DFinalExamCloudPractitionerPracticeExam2",
        questionId: 66,
        correctAnswer: [0, 1, 2, 3],
      },
    ],
  },
} satisfies CS79DModuleBlueprint;
