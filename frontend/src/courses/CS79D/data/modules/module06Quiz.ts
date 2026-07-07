import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule06Quiz = {
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
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
