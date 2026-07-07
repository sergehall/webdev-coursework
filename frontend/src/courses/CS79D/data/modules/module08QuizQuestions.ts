import type { CS79DModuleBlueprint } from "../types";

type Quiz = NonNullable<CS79DModuleBlueprint["quiz"]>;

export const cs79dModule08QuizQuestions = [
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
] satisfies Quiz["questions"];
