import type { CS79DModuleBlueprint } from "../../types";

type Quiz = NonNullable<CS79DModuleBlueprint["quiz"]>;

export const questions01To36 = [
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
    options: ["Applications", "Data in Transit", "Operating System", "BIOS"],
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
    question: "AWS Config can be used to monitor your global AWS resources.",
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
    question: "You can create a CloudWatch alarm that watches a single metric",
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
] satisfies Quiz["questions"];
