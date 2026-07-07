import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule07Blueprint = {
  id: 7,
  title: "CloudFront, WAF & Shield",
  weekLabel: "Week 7",
  dateLabel: "June 1-7, 2026",
  overview:
    "Week 7 focuses on protecting and accelerating static web content with Amazon CloudFront, AWS WAF, and AWS Shield concepts. The hands-on lab deploys content from S3 through CloudFront and then attaches WAF rules for IP blocking, geo-blocking, and malicious User-Agent filtering.",
  topicLine: "Scheduled topic: CloudFront, WAF, and Shield",
  focusAreas: [
    "Amazon S3 static website hosting",
    "Amazon CloudFront distributions and edge caching",
    "AWS WAF WebACL attachment to CloudFront",
    "IP set blocking for 130.166.0.0/16",
    "Geo-blocking traffic from India and Canada",
    "User-Agent regex filtering for suspicious tools",
    "AWS Shield Standard and Shield Advanced concepts",
  ],
  objectivesAligned: [
    "Deploy static content from S3 through a CloudFront distribution",
    "Attach a WAF WebACL to a CloudFront distribution",
    "Configure WAF rules for IP range, country, and User-Agent blocking",
    "Explain how CloudFront, WAF, and Shield work together to reduce exposure",
  ],
  outcomeAlignment: [
    "Demonstrate CDN-backed delivery of static content",
    "Apply layered edge security controls to HTTP requests",
    "Document AWS console evidence for CloudFront and WAF configuration",
  ],
  syllabusContext: [
    "Module 7 of 8 — final required hands-on security lab before course closeout",
    "Lab 6 is ungraded but worth 20 possible points in Canvas",
    "Discussion: Week 7 is optional and asks for course feedback",
    "Lab 6 was submitted June 3, 2026 at 6:18 pm",
    "Lab 6 remains available June 1-12, 2026",
  ],
  starterTasks: [
    "Create an S3 bucket for static content",
    "Upload a large image file or simple static website",
    "Configure the bucket for static website hosting",
    "Create a CloudFront distribution pointing to the S3 bucket",
    "Create and attach a WAF WebACL to the CloudFront distribution",
    "Capture screenshots for S3, CloudFront, and WAF deliverables",
  ],
  artifacts: [
    "Discussion: Week 7 optional feedback",
    "S3 bucket list screenshot with project bucket visible",
    "S3 static website settings screenshot",
    "CloudFront deployed distribution overview screenshot",
    "CloudFront domain name screenshot",
    "WAF WebACL screenshot with all three rules configured",
    "Each WAF rule's configuration details",
    "Quiz: CloudFront, WAF & Shield question set",
  ],
  importantDates: [
    "June 1 — Lab 6 opens at 12:00 am",
    "June 3 — Lab 6 submitted at 6:18 pm",
    "June 7 — Lab 6: CloudFront & WAF due at 11:59 pm",
    "June 12 — Lab 6 availability closes at 11:59 pm",
  ],
  assessmentContext: [
    "Discussion: Week 7 — optional",
    "Lab 6: CloudFront & WAF — ungraded, 20 possible points",
    "Attempt 1 Score: N/A",
    "Unlimited attempts allowed",
    "Quiz: CloudFront, WAF & Shield — review and practice",
  ],
  milestone:
    "Static content deployed through CloudFront, WAF WebACL attached, and required evidence captured for Canvas",
  moduleSummary: [
    {
      step: "1",
      description:
        "Use the optional Week 7 discussion to provide honest course feedback about content, delivery, pacing, and future improvements.",
    },
    {
      step: "2",
      description:
        "Prepare S3-hosted static web content and verify that the bucket settings support the lab requirement.",
    },
    {
      step: "3",
      description:
        "Deploy the S3 content through CloudFront and record the deployed distribution details and domain name.",
    },
    {
      step: "4",
      description:
        "Attach AWS WAF to CloudFront and configure IP blocking, geo-blocking, and User-Agent filtering rules.",
    },
    {
      step: "5",
      description:
        "Review CloudFront, WAF, and Shield quiz questions to reinforce CDN, edge security, and DDoS protection concepts.",
    },
  ],
  readingHighlights: [
    "CloudFront documentation — distributions, origins, edge locations, cache behavior, and TTL.",
    "S3 static website hosting documentation — bucket configuration, object hosting, and website endpoints.",
    "AWS WAF documentation — WebACLs, rule ordering, IP sets, geographic match rules, regex pattern matching, and actions.",
    "AWS Shield documentation — Shield Standard automatic DDoS protection and Shield Advanced response features.",
  ],
  serviceHighlights: [
    {
      service: "Amazon S3",
      pages: "Static content origin",
      notes:
        "Stores the image or static website files that CloudFront uses as the content origin.",
    },
    {
      service: "Amazon CloudFront",
      pages: "CDN and edge delivery",
      notes:
        "Caches and delivers content through AWS edge locations using a CloudFront domain name.",
    },
    {
      service: "AWS WAF",
      pages: "Web application firewall",
      notes:
        "Applies WebACL rules to block traffic by source IP range, geography, and suspicious User-Agent values.",
    },
    {
      service: "AWS Shield",
      pages: "DDoS protection",
      notes:
        "Provides automatic Shield Standard protection and optional Shield Advanced response capabilities for higher-risk workloads.",
    },
  ],
  textTasks: [
    {
      id: "discussion-week7",
      title: "Discussion: Week 7",
      objective:
        "Provide optional honest feedback about the course content, delivery, structure, challenge level, and overall experience.",
      tasks: [
        "1. How was the course content, delivery, and overall experience?",
        "Did the instructors do a good job presenting the material so it was relatable regardless of prior experience?",
        "Was the course structured in a way that made sense?",
        "Were you challenged appropriately, but not overwhelmed?",
        "2. Share any comments or recommendations to help shape future offerings of this course.",
      ],
      submissionInstructions: [
        "Submit through the SMC Canvas discussion board if you choose to participate",
        "This final discussion is optional",
        "Honest feedback is valuable and will not affect your grade",
      ],
      whyItMattersHeading: "Discussion Focus",
      whyItMatters:
        "This optional discussion is a course reflection rather than a technical deliverable. The goal is to help future versions of CS 79D improve while giving students a place to comment on pacing, clarity, difficulty, hands-on labs, and instructor support.",
    },
    {
      id: "lab6-cloudfront-waf",
      title: "Lab 6: CloudFront & WAF",
      objective:
        "Deploy static content using S3 and CloudFront, then secure the CloudFront distribution with AWS WAF rules.",
      tasks: [
        "Step 1: Prepare Web Content.",
        "Create an S3 bucket.",
        "Upload a large image file and/or a simple static website with HTML, CSS, and JavaScript content.",
        "Configure the bucket for static website hosting.",
        "Step 2: Deploy via CloudFront.",
        "Create a CloudFront distribution that points to your S3 bucket.",
        "Ensure the distribution is deployed and accessible through the provided CloudFront URL.",
        "Step 3: Configure WAF.",
        "Attach a WAF WebACL to your CloudFront distribution.",
        "Create an IP Block Rule to block IP range 130.166.0.0/16.",
        "Create a Geo-Blocking Rule to block traffic originating from India and Canada.",
        "Create a User-Agent Filtering Rule to block possible malicious requests matching regex: (?i)(sqlmap|nmap|curl|BadBot).",
      ],
      submissionInstructions: [
        "Submit lab evidence through SMC Canvas",
        "Due: Sunday, June 7, 2026 at 11:59 pm",
        "Ungraded — 20 possible points",
        "Submitted on June 3, 2026 at 6:18 pm",
        "Attempt 1 Score: N/A",
        "Unlimited attempts allowed",
        "Available: June 1, 2026 at 12:00 am until June 12, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Lab Context",
      whyItMatters:
        "This lab combines performance and security at the edge. S3 provides a simple static content origin, CloudFront distributes that content through edge locations, and WAF adds request-level controls before traffic reaches the origin.\n\nThe security lesson is layered defense: block known unwanted IP ranges, deny traffic from specific geographies when required, and filter suspicious User-Agent patterns that often appear in scanning or automated attack traffic.",
      resourceSections: [
        {
          title: "User-Agent Filtering Console Steps",
          items: [
            "Open the Web ACL, then Rules, then Add rules, then Add my own rules and rule groups, then Next.",
            "In Rule builder, set Name to Block Malicious UserAgent.",
            "Set If a request to matches the statement.",
            "Under Statement settings, set Inspect to Single header.",
            "Set Header name to User-Agent.",
            "Set Match type to Matches regular expression.",
            "Use regular expression: (?i)(sqlmap|nmap|curl|BadBot).",
            "(?i) makes the regex case-insensitive.",
            "Set Action to Block, add the rule, then save and move it above allow rules.",
          ],
        },
        {
          title: "Deliverables",
          items: [
            "S3 bucket list with the project bucket visible.",
            "S3 bucket static website settings.",
            "CloudFront deployed distribution overview.",
            "CloudFront domain name.",
            "WAF WebACL with the three rules configured.",
            "Configuration details for each rule.",
          ],
        },
      ],
    },
  ],
  quiz: {
    title: "CloudFront, WAF & Shield",
    dueLabel: "Week 7 review — 12 pts",
    questions: [
      {
        id: 1,
        question: "AWS CDN is _____________ ?",
        options: ["CloudCache", "CloudCDN", "CloudFormation", "CloudFront"],
      },
      {
        id: 2,
        question: "There are more AWS regions than AWS edge locations?",
        options: ["True", "False"],
      },
      {
        id: 3,
        question: "A CloudFront origin can be _________ . (Select 3)",
        options: ["EC2 Instance", "S3 Bucket", "ELB/ALB", "Lambda Function"],
        multiple: true,
      },
      {
        id: 4,
        question: "CloudFront edge location will cache content for how long?",
        options: ["TTL", "RFC", "TLL", "SNMP"],
      },
      {
        id: 5,
        question: "WAF is a ___________?",
        options: [
          "VPC gateway",
          "instance firewall",
          "S3 firewall",
          "web application firewall",
        ],
      },
      {
        id: 6,
        question:
          "WAF can protect against which of the following threats? (Select 3)",
        options: ["DDOS", "Heart Bleed", "SYN Flood", "SQL injects"],
        multiple: true,
      },
      {
        id: 7,
        question:
          "WAF can be configured to be dynamically updated by a Lambda function.",
        options: ["True", "False"],
      },
      {
        id: 8,
        question:
          "Shield Standard must be enabled in WAF before providing DDOS protection.",
        options: ["True", "False"],
      },
      {
        id: 9,
        question:
          "WAF can be configured to block all traffic from specified countries.",
        options: ["True", "False"],
      },
      {
        id: 10,
        question: "Shield Advance is free to use for all AWS users.",
        options: ["True", "False"],
      },
      {
        id: 11,
        question:
          "AWS Shield Advance offers 24/7 access to an AWS DDOS response team.",
        options: ["True", "False"],
      },
      {
        id: 12,
        question:
          "If your business or industry is a likely target of DDoS attacks, or if you prefer to let AWS handle the majority of DDoS protection and mitigation responsibilities for layer 3, layer 4, and layer 7 attacks, AWS Shield Advanced might be the best choice.",
        options: ["True", "False"],
      },
    ],
    answers: [
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 1,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 2,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 3,
        correctAnswer: [0, 1, 2],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 4,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 5,
        correctAnswer: [3],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 6,
        correctAnswer: [0, 1, 3],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 7,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 8,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 9,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 10,
        correctAnswer: [1],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 11,
        correctAnswer: [0],
      },
      {
        quizId: "CS79DModule7CloudFrontWafShieldQuiz",
        questionId: 12,
        correctAnswer: [0],
      },
    ],
  },
} satisfies CS79DModuleBlueprint;
