import type { Tech } from "./types";

export const cs60Technologies = [
  {
    icon: "Database",
    color: "text-blue-600",
    label: "Database Systems & Architectures",
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/21/cncpt/introduction-to-oracle-database.html",
  },
  {
    icon: "Table",
    color: "text-indigo-600",
    label: "Data Models & the Relational Model",
    url: "https://en.wikipedia.org/wiki/Relational_model",
  },
  {
    icon: "Boxes",
    color: "text-purple-600",
    label: "ER Modeling, Cardinality & Lucidchart",
    url: "https://www.lucidchart.com/pages/er-diagrams",
  },
  {
    icon: "LayoutTemplate",
    color: "text-violet-600",
    label: "Advanced Data Modeling & Specialization Hierarchies",
    url: "https://en.wikipedia.org/wiki/Enhanced_entity%E2%80%93relationship_model",
  },
  {
    icon: "Key",
    color: "text-yellow-600",
    label: "Keys, Integrity Constraints & Referential Integrity",
    url: "https://en.wikipedia.org/wiki/Referential_integrity",
  },
  {
    icon: "GaugeCircle",
    color: "text-green-600",
    label: "Normalization, Functional Dependencies & BCNF",
    url: "https://en.wikipedia.org/wiki/Database_normalization",
  },
  {
    icon: "Server",
    color: "text-red-600",
    label: "Oracle Database, SQL Developer & Azure VCL",
    url: "https://www.oracle.com/database/sqldeveloper/",
  },
  {
    icon: "FileCode2",
    color: "text-cyan-600",
    label: "SQL DDL: Data Types, CREATE & ALTER Tables",
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SQL-Statements.html",
  },
  {
    icon: "Code2",
    color: "text-rose-600",
    label: "SQL DML: INSERT, UPDATE & DELETE",
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/UPDATE.html",
  },
  {
    icon: "Braces",
    color: "text-blue-600",
    label: "SQL Queries: SELECT, Joins, Groups & Set Operations",
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html",
  },
  {
    icon: "Table",
    color: "text-amber-700",
    label: "Views, Sequences & Relational Schema Design",
    url: "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/sql-language-reference.pdf",
  },
  {
    icon: "Route",
    color: "text-teal-600",
    label: "Database Design Lifecycle: Conceptual, Logical & Physical",
    url: "https://en.wikipedia.org/wiki/Database_design",
  },
  {
    icon: "Lock",
    color: "text-red-600",
    label: "Transaction Management & Concurrency Control",
    url: "https://en.wikipedia.org/wiki/Database_transaction",
  },
] as const satisfies readonly Tech[];

export const cs70Technologies = [
  {
    icon: "Route",
    color: "text-indigo-600",
    label: "Network Topologies & Architectures",
    url: "https://en.wikipedia.org/wiki/Network_topology",
  },
  {
    icon: "Boxes",
    color: "text-slate-600",
    label: "Cabling, Media & Physical Installations",
    url: "https://en.wikipedia.org/wiki/Physical_layer",
  },
  {
    icon: "Server",
    color: "text-blue-600",
    label: "Ethernet Interfaces, Switching & Cisco IOS",
    url: "https://www.cisco.com/c/en/us/tech/lan-switching/ethernet/index.html",
  },
  {
    icon: "Regex",
    color: "text-emerald-600",
    label: "IPv4/IPv6 Addressing, Subnetting & ARP",
    url: "https://en.wikipedia.org/wiki/IP_address",
  },
  {
    icon: "Route",
    color: "text-purple-600",
    label: "Routing, NAT, VLANs & Advanced Switching",
    url: "https://en.wikipedia.org/wiki/Virtual_LAN",
  },
  {
    icon: "CloudSun",
    color: "text-cyan-600",
    label: "TCP/UDP, DHCP, DNS, APIPA & SLAAC",
    url: "https://en.wikipedia.org/wiki/Internet_protocol_suite",
  },
  {
    icon: "Cloud",
    color: "text-sky-600",
    label: "Web, File, Email, VoIP & Database Services",
    url: "https://en.wikipedia.org/wiki/Network_service",
  },
  {
    icon: "GaugeCircle",
    color: "text-orange-600",
    label: "High Availability, NIC Teaming & Disaster Recovery",
    url: "https://en.wikipedia.org/wiki/High_availability",
  },
  {
    icon: "Wrench",
    color: "text-gray-600",
    label: "SNMP, Logging, QoS, pfSense & Wireshark",
    url: "https://www.wireshark.org/docs/",
  },
  {
    icon: "Lock",
    color: "text-red-600",
    label: "DoS, Spoofing, Rogue Systems & Social Engineering",
    url: "https://en.wikipedia.org/wiki/Network_security",
  },
  {
    icon: "Key",
    color: "text-amber-700",
    label: "Authentication, Hardening, Firewalls & Secure Protocols",
    url: "https://en.wikipedia.org/wiki/Network_security_policy",
  },
  {
    icon: "Lock",
    color: "text-fuchsia-600",
    label: "DMZ, IDS/IPS, IoT & Physical Security Design",
    url: "https://en.wikipedia.org/wiki/DMZ_(computing)",
  },
  {
    icon: "Atom",
    color: "text-green-600",
    label: "Wireless Standards, Security & Troubleshooting",
    url: "https://en.wikipedia.org/wiki/Wireless_security",
  },
  {
    icon: "Key",
    color: "text-violet-600",
    label: "VPN, RADIUS, Remote Desktop & PowerShell Remoting",
    url: "https://en.wikipedia.org/wiki/Virtual_private_network",
  },
  {
    icon: "Cloud",
    color: "text-teal-600",
    label: "Data Centers, iSCSI, Cloud Networking & Virtualization",
    url: "https://en.wikipedia.org/wiki/Cloud_computing",
  },
  {
    icon: "BadgeHelp",
    color: "text-green-600",
    label: "Cisco Packet Tracer & CompTIA Network+ CertMaster Labs",
    url: "https://www.netacad.com/courses/packet-tracer",
  },
] as const satisfies readonly Tech[];

export const cs79aTechnologies = [
  {
    icon: "Cloud",
    color: "text-violet-600",
    label: "Cloud Computing Models & AWS Global Infrastructure",
    url: "https://aws.amazon.com/what-is-cloud-computing/",
  },
  {
    icon: "BadgeHelp",
    color: "text-indigo-600",
    label: "AWS Academy, AWS Educate & Learner Lab",
    url: "https://aws.amazon.com/training/awsacademy/",
  },
  {
    icon: "LayoutTemplate",
    color: "text-blue-600",
    label: "AWS Management Console & Hands-On Labs",
    url: "https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/getting-started.html",
  },
  {
    icon: "Server",
    color: "text-sky-600",
    label: "EC2 Instances, AMIs, Pricing & Key Pairs",
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
  },
  {
    icon: "Terminal",
    color: "text-blue-700",
    label: "Windows Server on EC2 & Remote Desktop",
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connecting_to_windows_instance.html",
  },
  {
    icon: "Terminal",
    color: "text-orange-600",
    label: "Ubuntu Linux on EC2, SSH & PuTTY",
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html",
  },
  {
    icon: "Database",
    color: "text-teal-600",
    label: "S3 Buckets, Static Websites & Access Logging",
    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html",
  },
  {
    icon: "FileCode2",
    color: "text-cyan-600",
    label: "FTP Servers & Bootstrap Site Deployment",
    url: "https://ubuntu.com/server/docs/service-ftp",
  },
  {
    icon: "Key",
    color: "text-amber-700",
    label: "IAM Users, Roles, Policies & Least Privilege",
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
  },
  {
    icon: "Route",
    color: "text-purple-600",
    label: "VPC Networking & Security Configuration",
    url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
  },
  {
    icon: "Rocket",
    color: "text-emerald-600",
    label: "WordPress Deployment on EC2",
    url: "https://docs.aws.amazon.com/whitepapers/latest/best-practices-wordpress/welcome.html",
  },
  {
    icon: "Lock",
    color: "text-red-600",
    label: "OpenVPN Secure Remote Access",
    url: "https://openvpn.net/as-docs/",
  },
] as const satisfies readonly Tech[];

export const cs79dTechnologies = [
  {
    icon: "Lock",
    color: "text-red-600",
    label: "AWS Shared Responsibility Model in Real Deployments",
    url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/security-and-compliance.html",
  },
  {
    icon: "Key",
    color: "text-amber-700",
    label: "IAM Users, Groups, Roles, Policies & MFA",
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
  },
  {
    icon: "Terminal",
    color: "text-orange-600",
    label: "AWS CLI, EC2 & Nginx Application Security",
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html",
  },
  {
    icon: "Lock",
    color: "text-rose-600",
    label: "TLS, Let's Encrypt & HTTP Security Headers",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Security",
  },
  {
    icon: "CloudSun",
    color: "text-cyan-600",
    label: "CloudWatch Metrics, Alarms & CloudTrail Auditing",
    url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
  },
  {
    icon: "Server",
    color: "text-slate-600",
    label: "OS Hardening, Pi-hole VPN & Network Filtering",
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security.html",
  },
  {
    icon: "Wrench",
    color: "text-indigo-600",
    label: "Amazon Inspector Vulnerability Assessment & Trusted Advisor",
    url: "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html",
  },
  {
    icon: "Route",
    color: "text-fuchsia-600",
    label: "VPC, Subnets, Routes, Security Groups, NACLs & Peering",
    url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
  },
  {
    icon: "Cloud",
    color: "text-purple-600",
    label: "Route 53 DNS Routing & Hosted Zones",
    url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html",
  },
  {
    icon: "CloudSun",
    color: "text-sky-600",
    label: "S3 Static Hosting, CloudFront CDN & Edge Caching",
    url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
  },
  {
    icon: "Lock",
    color: "text-red-600",
    label: "AWS WAF, IP/Geo/Regex Filtering & Shield",
    url: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html",
  },
  {
    icon: "GaugeCircle",
    color: "text-lime-600",
    label: "Auto Scaling, Load Balancing & Secure Architecture",
    url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
  },
  {
    icon: "Database",
    color: "text-teal-600",
    label: "Encryption, Certificates, Monitoring & Cost Controls",
    url: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html",
  },
  {
    icon: "Sparkles",
    color: "text-pink-600",
    label: "AI Integration & AWS Architecture Diagrams",
    url: "https://aws.amazon.com/architecture/",
  },
] as const satisfies readonly Tech[];

export const cs79cTechnologies = [
  {
    icon: "Cloud",
    color: "text-sky-600",
    label: "AWS Compute Services & Scalable Architecture",
    url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/compute-services.html",
  },
  {
    icon: "Database",
    color: "text-teal-600",
    label: "S3, EBS & EFS Storage Workflows",
    url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/storage-services.html",
  },
  {
    icon: "Terminal",
    color: "text-rose-600",
    label: "AWS CLI Operations for Storage & EC2",
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html",
  },
  {
    icon: "Server",
    color: "text-blue-600",
    label: "EC2 Instances, AMIs, Key Pairs & Security Groups",
    url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
  },
  {
    icon: "GaugeCircle",
    color: "text-emerald-600",
    label: "Auto Scaling Groups & Elastic Load Balancing",
    url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
  },
  {
    icon: "Boxes",
    color: "text-fuchsia-600",
    label: "Containers, Kubernetes & Amazon EKS",
    url: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
  },
  {
    icon: "Route",
    color: "text-orange-600",
    label: "Distributed Systems, SQS, SNS & API Gateway",
    url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/application-integration-services.html",
  },
  {
    icon: "Rocket",
    color: "text-yellow-500",
    label: "AWS Lambda, Event Triggers & DynamoDB",
    url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
  },
  {
    icon: "Cloud",
    color: "text-cyan-600",
    label: "Elastic Beanstalk & Node.js Application Deployment",
    url: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html",
  },
  {
    icon: "FileText",
    color: "text-indigo-600",
    label: "CloudFormation Infrastructure as Code, Stacks & Templates",
    url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html",
  },
  {
    icon: "LayoutTemplate",
    color: "text-violet-600",
    label: "AWS Portfolio Architecture & Technical Documentation",
    url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  },
] as const satisfies readonly Tech[];
