import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule06TextTasks } from "./module06TextTasks";
import { cs79dModule06Quiz } from "./module06Quiz";

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
  textTasks: cs79dModule06TextTasks,
  quiz: cs79dModule06Quiz,
} satisfies CS79DModuleBlueprint;
