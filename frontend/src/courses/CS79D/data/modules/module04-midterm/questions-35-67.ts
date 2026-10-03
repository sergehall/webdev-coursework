import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export const questions35To67 = [
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
    options: ["SSH keys", "API keys", "User names/Passwords", "Access keys"],
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
    options: ["Trusted Advisor", "CloudTrail", "AWS Config", "CloudFormation"],
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
] satisfies readonly UIQuestion[];
