import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule06TextTasks = [
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
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
