import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export const questions01To34 = [
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
    options: ["Access Key", "Biometric Authentication", "Password", "Key Pair"],
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
] satisfies readonly UIQuestion[];
