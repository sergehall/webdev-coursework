import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule06Blueprint = {
  id: 6,
  title: "VPC & Route 53",
  weekLabel: "Week 6",
  dateLabel: "May 25–31, 2026",
  overview:
    "Week 6 focuses on AWS network architecture with Amazon VPC and Route 53. The module covers connectivity testing, routing behavior, VPC peering, DNS concepts, and the relationship between network reachability and cloud security.",
  topicLine: "Scheduled topic: VPC & Route 53",
  focusAreas: [
    "Amazon VPC networking fundamentals",
    "Subnets, route tables, security groups, and network ACLs",
    "Connectivity testing with ping and ICMP",
    "VPC peering setup and route propagation",
    "Amazon Route 53 DNS routing and hosted zones",
    "Evidence collection for Canvas lab submissions",
  ],
  objectivesAligned: [
    "Explain how VPC components control traffic flow in AWS",
    "Test reachability between networked resources using ping and supporting checks",
    "Configure and validate VPC peering between two VPCs",
    "Describe how Route 53 maps domain names to AWS resources",
  ],
  outcomeAlignment: [
    "Diagnose basic AWS network connectivity issues",
    "Demonstrate secure routing between VPC environments",
    "Connect DNS, routing, and firewall rules into one cloud networking model",
  ],
  syllabusContext: [
    "Module 6 of 8 — AWS networking and DNS",
    "Builds on earlier EC2, security group, and monitoring labs",
    "All visible Canvas deliverables are due May 31, 2026",
    "This module is prepared around the Canvas assignment list shown for Week 6",
  ],
  starterTasks: [
    "Review VPC basics: subnets, route tables, gateways, and security groups",
    "Review ICMP rules required for ping tests",
    "Prepare two VPC environments for peering validation",
    "Review Route 53 DNS and routing concepts",
    "Capture screenshots for each Canvas deliverable",
  ],
  artifacts: [
    "Discussion: Week 6 response",
    "Lab 5: Pinging evidence",
    "Lab 5b: VPC Peering evidence",
    "Quiz: VPC & Route 53 question set",
  ],
  importantDates: [
    "May 31 — Discussion: Week 6 (5 pts)",
    "May 31 — Lab 5: Pinging (20 pts)",
    "May 31 — Lab 5b: VPC Peering (20 pts)",
    "May 31 — Quiz: VPC & Route 53 (20 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 6 — 5 pts",
    "Lab 5: Pinging — 20 pts",
    "Lab 5b: VPC Peering — 20 pts",
    "Quiz: VPC & Route 53 — 20 pts",
    "Total Week 6 — 65 pts",
  ],
  milestone:
    "VPC reachability tested, VPC peering validated, and Route 53 networking concepts reviewed",
  moduleSummary: [
    {
      step: "1",
      description:
        "Complete the Week 6 discussion on VPC design, reachability, DNS, and secure network architecture.",
    },
    {
      step: "2",
      description:
        "Complete Lab 5 by testing ping reachability and documenting which AWS network controls allow or block ICMP traffic.",
    },
    {
      step: "3",
      description:
        "Complete Lab 5b by configuring VPC peering, route tables, and security rules, then validating communication between VPCs.",
    },
    {
      step: "4",
      description:
        "Complete the VPC & Route 53 quiz and use it to review DNS routing, hosted zones, records, and traffic flow.",
    },
  ],
  readingHighlights: [
    "Amazon VPC documentation — VPCs, subnets, route tables, internet gateways, NAT gateways, security groups, and network ACLs.",
    "VPC Peering documentation — requester/accepter workflow, non-overlapping CIDR blocks, and route table updates.",
    "Route 53 documentation — hosted zones, DNS record types, alias records, and routing policies.",
    "ICMP and ping testing notes — security group inbound rules must explicitly allow ICMP for successful ping tests.",
  ],
  serviceHighlights: [
    {
      service: "Amazon VPC",
      pages: "Networking",
      notes:
        "Primary service for isolated network environments, subnet design, route tables, gateways, and security boundaries.",
    },
    {
      service: "VPC Peering",
      pages: "Private connectivity",
      notes:
        "Connects two VPCs using private IP routing when their CIDR ranges do not overlap and routes/security rules are configured.",
    },
    {
      service: "Amazon Route 53",
      pages: "DNS",
      notes:
        "Maps domain names to AWS resources and supports hosted zones, record sets, alias records, and routing policies.",
    },
    {
      service: "Security Groups and NACLs",
      pages: "Network access control",
      notes:
        "Control inbound and outbound traffic. ICMP must be allowed when a lab requires ping validation.",
    },
  ],
  textTasks: [
    {
      id: "discussion-week6",
      title: "Discussion: Week 6",
      objective:
        "Answer the Week 6 discussion questions about subnet placement, VPC peering, VPNs, Route 53, high availability, load balancing, and auto scaling.",
      tasks: [
        "1. What are the security advantages of using private subnets instead of public subnets? In what scenarios would you place resources in a private subnet instead of a public one? Provide an example and explanation.",
        "2. A VPC peering is somewhat similar to a VPN. In what situation is VPC peering preferred over a VPN? Why?",
        "3. How can Route 53 and VPC configurations work together to support high availability across regions? Reflect back on CS 79C with load balancing and auto scaling.",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas discussion board",
        "Due: Sunday, May 31, 2026 at 11:59 pm",
        "5 points",
      ],
      whyItMattersHeading: "Discussion Focus",
      whyItMatters:
        "This discussion connects security architecture with practical network placement decisions. Private subnets reduce direct internet exposure, VPC peering provides private AWS-to-AWS connectivity when the networks can be directly routed, and Route 53 can work with regional VPC designs, load balancing, health checks, and failover patterns to improve availability.",
    },
    {
      id: "lab5-pinging",
      title: "Lab 5: Pinging",
      objective:
        "Create one EC2 instance in a public subnet and one EC2 instance in a private subnet, configure ICMP access, and prove that the public instance can ping the private instance.",
      tasks: [
        "Create an EC2 instance in the public subnet.",
        "Launch an EC2 instance and choose Windows or Ubuntu.",
        "Select a free-tier instance type.",
        "Configure network settings: select your VPC and choose a public subnet that has a route to an Internet Gateway.",
        "Enable Auto-assign Public IP to allow internet access.",
        "Add storage; the default is fine for testing.",
        "Add tags if needed for identification.",
        "Configure the security group with ping protocol access.",
        "Review and launch the instance using an existing key pair or by creating a new one.",
        "Create an EC2 instance in the private subnet by repeating the same basic launch steps.",
        "Choose a private subnet with no direct route to an Internet Gateway.",
        "Enable Auto-assign Public IP as instructed; the instance still will not be directly accessible from the internet if the subnet has no internet route.",
        "Edit the security group for both instances.",
        "Add an inbound rule: Type = Custom ICMP - Echo Request, Protocol = ICMP.",
        "Connect to the public EC2 instance using SSH from your terminal.",
        "Ensure your key file has correct permissions by running: chmod 400 your-key.pem.",
        "Find the private IP address of the private EC2 instance from the AWS Console.",
        "From the public EC2 terminal, run: ping <Private-IP-of-Private-EC2>.",
        "Confirm successful ping replies, such as output beginning with '64 bytes from...'.",
        "Capture a screenshot of the successful ping output.",
      ],
      submissionInstructions: [
        "Submit lab evidence through SMC Canvas",
        "Due: Sunday, May 31, 2026 at 11:59 pm",
        "Ungraded — 20 possible points",
        "Submitted on May 27, 2026 at 8:38 pm",
        "Attempt 1 Score: N/A",
        "Unlimited attempts allowed",
        "Available: May 26, 2026 at 12:00 am until June 5, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "This lab demonstrates the difference between public and private subnet placement. The public EC2 instance can be reached from your terminal because it has public access through the subnet route and public IP configuration. The private EC2 instance is protected from direct internet access, but it can still communicate privately with resources in the VPC when route tables and security groups allow the traffic.\n\nThe key security lesson is that AWS reachability depends on several layers working together: subnet routing, Internet Gateway access, public IP assignment, security groups, key-pair access, and protocol-specific rules such as ICMP Echo Request for ping.",
      resourceSections: [
        {
          title: "Deliverables",
          items: [
            "Screenshot showing successful ping responses from the public EC2 instance to the private EC2 instance.",
            "The terminal output should clearly show successful replies, for example '64 bytes from...'.",
          ],
        },
        {
          title: "Screenshot Tools",
          items: [
            "Windows: Snipping Tool or Win + Shift + S.",
            "macOS: Cmd + Shift + 4.",
          ],
        },
        {
          title: "Commands",
          items: [
            "Set key permissions: chmod 400 your-key.pem",
            "Ping private instance: ping <Private-IP-of-Private-EC2>",
          ],
        },
      ],
    },
    {
      id: "lab5b-vpc-peering",
      title: "Lab 5b: VPC Peering",
      objective:
        "Create cloud network segmentation with AWS by building a secure multi-VPC architecture. Set up VPC peering, configure route tables, and verify cross-VPC communication.",
      tasks: [
        "Part A - VPC Architecture Setup.",
        "Create VPC-A with CIDR 10.10.0.0/16.",
        "In VPC-A, create a public subnet: 10.10.1.0/24.",
        "In VPC-A, create a private subnet: 10.10.2.0/24.",
        "Create VPC-B with CIDR 10.20.0.0/16.",
        "In VPC-B, create a private subnet: 10.20.1.0/24.",
        "Launch an EC2 instance with a public IP in the VPC-A public subnet.",
        "Launch an EC2 instance with no public IP in the VPC-B private subnet.",
        "Part B - VPC Peering Configuration.",
        "Create and accept a VPC peering connection between VPC-A and VPC-B.",
        "Update the VPC-A route table: add a route to 10.20.0.0/16 through the peering connection.",
        "Update the VPC-B route table: add a route to 10.10.0.0/16 through the peering connection.",
        "Modify security groups to allow SSH traffic on port 22 from the VPC-A public subnet to the VPC-B EC2 instance.",
        "Part C - Validation and Documentation.",
        "SSH from the VPC-A public EC2 instance into the VPC-B private EC2 instance using its private IP.",
        "Document screenshots of VPCs, route tables, and the peering connection.",
        "Capture terminal output showing successful SSH into the private EC2 instance.",
        'Write an observation answering: "Why is VPC peering important in cloud network security design?"',
      ],
      submissionInstructions: [
        "Submit a document, PDF or Word, through SMC Canvas",
        "Due: Sunday, May 31, 2026 at 11:59 pm",
        "Ungraded — 20 possible points",
        "Submitted on May 27, 2026 at 10:18 pm",
        "Attempt 1 Score: N/A",
        "Unlimited attempts allowed",
        "Available: May 26, 2026 at 12:00 am until June 5, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "VPC peering is important in cloud network security design because it allows separate VPCs to communicate privately without exposing the traffic to the public internet. This supports segmentation: different applications, environments, accounts, or teams can use separate VPCs while still allowing carefully controlled private communication.\n\nThe lab also reinforces that connectivity is not created by the peering connection alone. Both sides need route table entries, non-overlapping CIDR blocks, and security group rules that allow the intended traffic.",
      resourceSections: [
        {
          title: "Deliverables",
          items: [
            "Required screenshots.",
            "Screenshots of VPCs, route tables, and the peering connection.",
            "Terminal output showing successful SSH into the private EC2 instance.",
            "SSH session showing that you are able to ping the instances that are in different VPCs.",
            "Observation explaining why VPC peering is important in cloud network security design.",
          ],
        },
        {
          title: "Network Plan",
          items: [
            "VPC-A: 10.10.0.0/16",
            "VPC-A Public Subnet: 10.10.1.0/24",
            "VPC-A Private Subnet: 10.10.2.0/24",
            "VPC-B: 10.20.0.0/16",
            "VPC-B Private Subnet: 10.20.1.0/24",
            "VPC-A route to VPC-B: 10.20.0.0/16 via peering connection",
            "VPC-B route to VPC-A: 10.10.0.0/16 via peering connection",
          ],
        },
      ],
      previewFiles: [
        {
          fileUrl:
            "/code-playground/CS79D/mod-6/vpc-peering-reference-diagram.png",
          filename: "vpc-peering-reference-diagram.png",
          buttonLabel: "VPC Peering Diagram",
        },
      ],
    },
  ],
  quiz: {
    title: "VPC & Route 53",
    dueLabel: "May 31, 2026 at 11:59 pm — 20 min limit — 20 pts",
    questions: [
      {
        id: 1,
        question:
          "What is the minimum size subnet that you can have in an Amazon VPC?",
        options: ["/30", "/24", "/28", "/26"],
      },
      {
        id: 2,
        question:
          "You are a solutions architect working for a large travel company that is migrating its existing server estate to AWS. You recommended a custom Amazon VPC. They need a public subnet for web servers and a private subnet for databases. Web servers and database servers must be highly available, with a minimum of two web servers and two database servers each. How many subnets should you have to maintain high availability?",
        options: ["2", "3", "4", "1"],
      },
      {
        id: 3,
        question:
          "Which of the following is an optional security control that can be applied at the subnet layer of a VPC?",
        options: [
          "Network ACL",
          "Firewall",
          "Security Group",
          "Web application firewall",
        ],
      },
      {
        id: 4,
        question:
          "What is the maximum size IP address range that you can have in an Amazon VPC?",
        options: ["/16", "/30", "/28", "/24"],
      },
      {
        id: 5,
        question:
          "You create a new subnet and then add a route to your route table that routes traffic out from that subnet to the Internet using an IGW. What type of subnet have you created?",
        options: [
          "An internal subnet",
          "An external subnet",
          "A private subnet",
          "A public subnet",
        ],
      },
      {
        id: 6,
        question: "What happens when you create a new Amazon VPC?",
        options: [
          "Three subnets are created by default—one for each Availability Zone.",
          "An IGW is created by default.",
          "A main route table for the new VPC is created by default.",
          "Three subnets are created by default in one Availability Zone.",
        ],
      },
      {
        id: 7,
        question:
          "You create a new VPC in US-East-1 and provision three subnets inside this Amazon VPC. Which of the following statements is true?",
        options: [
          "All subnets are public by default.",
          "Each subnet will have identical CIDR blocks.",
          "By default, these subnets will not be able to communicate with each other; you will need to create routes.",
          "All subnets will be able to communicate with each other by default.",
        ],
      },
      {
        id: 8,
        question: "What aspect of an Amazon VPC is stateful?",
        options: [
          "Amazon DynamoDB",
          "Network ACLs",
          "Security groups",
          "Amazon S3",
        ],
      },
      {
        id: 9,
        question:
          "How many VPC Peering connections are required for four VPCs located within the same AWS region to be able to send traffic to each of the others?",
        options: ["4", "2", "5", "6"],
      },
      {
        id: 10,
        question:
          "Which of the following is the Amazon side of an Amazon VPN connection?",
        options: ["VPG", "CGW", "ICG", "EIP"],
      },
      {
        id: 11,
        question:
          "You are responsible for your company's AWS resources and notice a significant amount of traffic from an IP address in a foreign country where your company does not have customers. Further investigation indicates the source is scanning for open ports on your EC2-VPC instances. Which resource can deny the traffic from reaching the instances?",
        options: [
          "NAT instance",
          "An Amazon VPC endpoint",
          "Network ACL",
          "Security group",
        ],
      },
      {
        id: 12,
        question:
          "What properties of an Amazon VPC must be specified at the time of creation? (Choose 2 answers)",
        options: [
          "The CIDR block representing the IP address range",
          "The region for the Amazon VPC",
          "Amazon VPC Peering relationships",
          "One or more subnets for the Amazon VPC",
        ],
        multiple: true,
      },
      {
        id: 13,
        question:
          "Which type of record is commonly used to route traffic to an IPv6 address?",
        options: ["A CNAME", "An A record", "An AAAA record", "An MX record"],
      },
      {
        id: 14,
        question:
          "You have an application that for legal reasons must be hosted in the United States when U.S. citizens access it. The application must be hosted in the European Union when citizens of the EU access it. For all other citizens of the world, the application must be hosted in Sydney. Which routing policy should you choose?",
        options: [
          "Geolocation routing",
          "Failover routing",
          "Simple routing",
          "Latency-based routing",
        ],
      },
      {
        id: 15,
        question:
          "You host a web application across multiple AWS regions in the world, and you need to configure your DNS so that your end users will get the fastest network performance possible. Which routing policy should you apply?",
        options: [
          "Weighted routing",
          "Geolocation routing",
          "Simple routing",
          "Latency-based routing",
        ],
      },
      {
        id: 16,
        question:
          "You are rolling out A and B test versions of a web application to see which version results in the most sales. You need 10 percent of your traffic to go to version A, 10 percent to go to version B, and the rest to go to your current production version. Which routing policy should you choose?",
        options: [
          "Failover routing",
          "Simple routing",
          "Weighted routing",
          "Geolocation routing",
        ],
      },
      {
        id: 17,
        question:
          "Your company has its primary production site in Western Europe and its DR (Disaster Recovery) site in the Asia Pacific. You need to configure DNS so that if your primary site becomes unavailable, you can fail DNS over to the secondary site. Which DNS routing policy would best achieve this?",
        options: [
          "Simple routing",
          "Failover routing",
          "Weighted routing",
          "Geolocation routing",
        ],
      },
      {
        id: 18,
        question: "Which is a function that Amazon Route 53 does not perform?",
        options: [
          "Load balancing",
          "Health checks",
          "DNS service",
          "Domain registration",
        ],
      },
      {
        id: 19,
        question: "Which port number is used to serve requests by DNS?",
        options: ["53", "3306", "443", "22"],
      },
      {
        id: 20,
        question:
          "Which type of DNS record should you use to resolve an IP address to a domain name?",
        options: ["A C Name", "A PTR record", "An SPF record", "An A record"],
      },
    ],
    answers: [
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 1,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 2,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 3,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 4,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 5,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 6,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 7,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 8,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 9,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 10,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 11,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 12,
        correctAnswer: [0, 1],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 13,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 14,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 15,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 16,
        correctAnswer: [2],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 17,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 18,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 19,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule6VpcRoute53Quiz",
        questionId: 20,
        correctAnswer: [1],
      },
    ],
  },
} satisfies CS79DModuleBlueprint;
