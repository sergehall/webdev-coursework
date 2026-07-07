import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule04Blueprint = {
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
    dueLabel:
      "Due May 17, 2026 at 11:59 pm — 65 min limit — Access code: cppe2026",
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
        options: [
          "Region",
          "Data Center",
          "Availability Zone",
          "Edge Location",
        ],
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
        question:
          "An AWS VPC is a component of which group of AWS core services?",
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
          "Bucket names are global, not regional. This is a popular bucket name and is already taken. You should choose another bucket name.",
          'Raise a ticket with AWS and ask them to release the name "testbucket" to you.',
          'Change your region to Korea and then create the bucket "testbucket".',
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
        options: [
          "AWS Config",
          "AWS Health",
          "Amazon CloudWatch",
          "AWS CloudTrail",
        ],
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
        options: [
          "SSH keys",
          "API keys",
          "User names/Passwords",
          "Access keys",
        ],
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
        options: [
          "Trusted Advisor",
          "CloudTrail",
          "AWS Config",
          "CloudFormation",
        ],
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
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 1,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 2,
        correctAnswer: [0, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 3,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 4,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 5,
        correctAnswer: [1, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 6,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 7,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 8,
        correctAnswer: [0, 1, 2, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 9,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 10,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 11,
        correctAnswer: [1, 2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 12,
        correctAnswer: [0, 2, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 13,
        correctAnswer: [0, 2, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 14,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 15,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 16,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 17,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 18,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 19,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 20,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 21,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 22,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 23,
        correctAnswer: [0, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 24,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 25,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 26,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 27,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 28,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 29,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 30,
        correctAnswer: [0, 1, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 31,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 32,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 33,
        correctAnswer: [0, 3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 34,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 35,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 36,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 37,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 38,
        correctAnswer: [1, 2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 39,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 40,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 41,
        correctAnswer: [1, 4],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 42,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 43,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 44,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 45,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 46,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 47,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 48,
        correctAnswer: [0, 1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 49,
        correctAnswer: [1, 4],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 50,
        correctAnswer: [1, 4],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 51,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 52,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 53,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 54,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 55,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 56,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 57,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 58,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 59,
        correctAnswer: [0, 2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 60,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 61,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 62,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 63,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 64,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 65,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 66,
        correctAnswer: [0, 3, 5],
      },
      {
        quizId: "CS79DMidtermCloudPractitionerExam",
        questionId: 67,
        correctAnswer: [0, 2, 5],
      },
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
} satisfies CS79DModuleBlueprint;
