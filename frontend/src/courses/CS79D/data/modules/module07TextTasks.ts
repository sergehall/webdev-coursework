import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule07TextTasks = [
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
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
