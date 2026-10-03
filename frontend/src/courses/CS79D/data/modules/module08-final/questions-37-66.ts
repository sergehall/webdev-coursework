import type { CS79DModuleBlueprint } from "../../types";

type Quiz = NonNullable<CS79DModuleBlueprint["quiz"]>;

export const questions37To66 = [
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
