import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule07TextTasks } from "./module07TextTasks";
import { cs79dModule07Quiz } from "./module07Quiz";

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
  textTasks: cs79dModule07TextTasks,
  quiz: cs79dModule07Quiz,
} satisfies CS79DModuleBlueprint;
