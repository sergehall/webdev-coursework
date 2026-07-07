import type { CS79DModuleBlueprint } from "../types";
import { cs79dModule08Quiz } from "./module08Quiz";

export const cs79dModule08Blueprint = {
  id: 8,
  title: "Final Project: AWS Architecture",
  weekLabel: "Week 8",
  dateLabel: "June 1-12, 2026",
  overview:
    "The final project is to design and implement a production-level cloud architecture using AWS that reflects real-world application stacks. The solution must show how selected AWS services integrate as one cohesive, scalable, secure, and cost-efficient system.",
  topicLine: "Final Project — Production-Level AWS Architecture",
  isFinalProject: true,
  focusAreas: [
    "Production-level AWS architecture design",
    "Frontend, backend, compute, and persistent storage integration",
    "At least five AWS services working as a cohesive application stack",
    "Security hardening and locked-down cloud resources",
    "Auto Scaling and Load Balancing",
    "Monitoring, alerts, and cost-aware operations",
    "AI integration",
    "Clear architecture diagram and presentation-ready documentation",
  ],
  objectivesAligned: [
    "Design and implement a real-world AWS application stack",
    "Integrate at least five AWS services into a cohesive architecture",
    "Use compute, two persistent storage types, load balancing, and auto scaling",
    "Demonstrate security controls for authentication, authorization, encryption, certificates, and common cloud risks",
    "Document the architecture clearly enough for technical and security review",
  ],
  outcomeAlignment: [
    "Show mastery of CS 79 cloud fundamentals with emphasis on AWS security",
    "Explain how services interact across frontend, backend, compute, storage, security, monitoring, and AI layers",
    "Produce an accessible final presentation, live demo, or review-ready AWS console/documentation package",
  ],
  syllabusContext: [
    "Module 8 of 8 — final project and course capstone",
    "Pass/fail evaluation: full credit when the project is functional, accessible, and clearly documented during review",
    "Project should reflect CS 79 series concepts and independent cloud learning where useful",
    "Security is the focus because CS 79D is AWS security-centered",
    "All active services must remain available until grading is completed",
  ],
  starterTasks: [
    "Choose the application purpose, target users, and problem it solves",
    "Select at least five AWS services that work together as one stack",
    "Design frontend, backend, compute, storage, security, monitoring, and AI layers",
    "Create an architecture diagram in Lucidchart or Miro",
    "Run the Mozilla Observatory scan and target at minimum a C+ or better",
    "Prepare one submission option: video, live Zoom presentation, or AWS console access with documentation",
  ],
  artifacts: [
    "Functional AWS application stack",
    "Architecture diagram showing how components interact",
    "Security implementation evidence and Mozilla Observatory scan target of C+ or better",
    "4-6 minute video presentation, live Zoom presentation, or secure AWS console access",
    "Documentation explaining architecture, features, setup, configurations, and security measures",
  ],
  importantDates: [
    "June 1 — Final Project opens at 12:00 am",
    "June 11 — Final Project: AWS Architecture due at 11:59 pm",
    "June 12 — Final Project availability closes at 11:59 pm",
  ],
  assessmentContext: [
    "Final Project: AWS Architecture — ungraded, 100 possible points",
    "Status: In Progress",
    "Next up: Submit Assignment",
    "Unlimited attempts allowed",
    "Available: June 1, 2026 at 12:00 am until June 12, 2026 at 11:59 pm",
    "Pass/fail basis: full credit when the project is functional, accessible, and clearly documented",
  ],
  milestone:
    "Production-level AWS architecture implemented, secured, documented, and submitted for final review",
  moduleSummary: [
    {
      step: "1",
      description:
        "Define the project purpose, target users, problem solved, and the application features that will demonstrate the architecture.",
    },
    {
      step: "2",
      description:
        "Build a cohesive AWS stack with frontend, backend, compute, at least two persistent storage options, Auto Scaling, Load Balancing, monitoring, alerts, security, and AI integration.",
    },
    {
      step: "3",
      description:
        "Create a clear architecture diagram using Lucidchart or Miro to show how all services interact.",
    },
    {
      step: "4",
      description:
        "Validate security posture with locked-down resources, certificates, authentication/authorization, encryption, and a Mozilla Observatory result of at least C+ where applicable.",
    },
    {
      step: "5",
      description:
        "Submit using one of the three options: recorded video, live Zoom presentation, or secure AWS console access with documentation.",
    },
  ],
  readingHighlights: [
    "AWS Well-Architected Framework — use the security, reliability, performance efficiency, cost optimization, and operational excellence pillars as review lenses.",
    "Mozilla Observatory — target at minimum a C+ or better: https://developer.mozilla.org/en-US/observatory",
    "Lucidchart or Miro — use one of these tools to create the required architecture diagram.",
    "Review prior CS 79 labs for IAM, networking, monitoring, CloudFront, WAF, storage, and deployment patterns.",
  ],
  serviceHighlights: [
    {
      service: "Compute",
      pages: "Processing layer",
      notes:
        "Use EC2, Lambda, EKS, or another compute service to perform backend processing or serverless execution.",
    },
    {
      service: "Persistent Storage",
      pages: "Data layer",
      notes:
        "Use at least two different storage types such as EBS, EFS, RDS, S3, DynamoDB, or other persistent services.",
    },
    {
      service: "Load Balancing and Auto Scaling",
      pages: "Scalability layer",
      notes:
        "Use load balancing and scaling controls to demonstrate production-minded availability and capacity handling.",
    },
    {
      service: "Security",
      pages: "Protection layer",
      notes:
        "Use security groups, certificates, encryption, IAM controls, and mitigation of common misconfiguration risks.",
    },
    {
      service: "Monitoring and Alerts",
      pages: "Operations layer",
      notes:
        "Use monitoring and alerting to detect issues, support review, and help save cost.",
    },
    {
      service: "AI Integration",
      pages: "Application capability",
      notes:
        "Include an AI-powered feature or AWS AI service integration as part of the final architecture.",
    },
  ],
  textTasks: [
    {
      id: "final-project-aws-architecture",
      title: "Project requirements:",
      objective:
        "Design and implement a production-level AWS cloud architecture that reflects a real-world application stack and emphasizes scalability, security, and cost efficiency.",
      tasks: [
        "Build a cohesive application stack with at least five AWS services.",
        "Include a frontend.",
        "Include a backend.",
        "Include a server, serverless service, or compute layer such as EC2, Lambda, or EKS.",
        "Include persistent storage solutions.",
        "Use at least two different types of persistent storage such as EBS, EFS, RDS, S3, DynamoDB, or similar services.",
        "Include Auto Scaling and Load Balancing.",
        "Include security controls such as security groups, certificates, encryption, and protection from common security issues.",
        "Lock down the application stack and target at minimum a C+ or better from the Mozilla Observatory scan.",
        "Include Monitoring and Alerts to support operations and cost awareness.",
        "Include AI integration.",
        "Create a clear, well-structured architecture diagram that visually represents the stack design and how all components interact.",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Thursday, June 11, 2026 at 11:59 pm",
        "Ungraded — 100 possible points",
        "Status: In Progress",
        "Unlimited attempts allowed",
        "Available: June 1, 2026 at 12:00 am until June 12, 2026 at 11:59 pm",
      ],
      whyItMattersHeading: "Project Context",
      whyItMatters:
        "This final project showcases the core concepts and skills learned throughout the CS 79 series, especially the security focus from CS 79D. The project does not require completing every course in the series, but it should demonstrate solid cloud fundamentals and a practical understanding of how AWS services work together in a secure production-style stack.",
      previewFiles: [
        {
          fileUrl:
            "/code-playground/CS79D/mod-8/CS79D_Final_Project_AWS_Review.pdf",
          filename: "CS79D_Final_Project_AWS_Review.pdf",
          buttonLabel: "Open Final Project AWS Review PDF",
        },
      ],
      resourceSections: [
        {
          title: "Architecture Diagram Tools",
          items: ["https://www.lucidchart.com", "https://miro.com"],
        },
        {
          title: "Security Scan",
          items: [
            "Mozilla Observatory: https://developer.mozilla.org/en-US/observatory",
            "Target at minimum a C+ or better where applicable.",
          ],
        },
      ],
    },
    {
      id: "final-project-submission-options",
      title: "Deliverable:",
      objective:
        "Choose one of the three approved submission paths for final project review.",
      tasks: [
        "Option 1: Create a 4-6 minute video presentation.",
        "In the video, introduce the project purpose, target users, and the problem it solves.",
        "Walk through what you built, including features, functionality, frontend, backend, integrations, and overall architecture.",
        "Explain the technologies and AWS services used, including compute, databases, security, tools, and why you chose them.",
        "Show that the stack is secured with authentication, authorization, encryption/certificates, secure cloud resource configuration, and protection from exposed endpoints or other common vulnerabilities.",
        "Include monitoring, logging, backups, and security tools if implemented.",
        "Conclude with what you learned, challenges faced, and how the design balances usability and security.",
        "Option 2: Schedule a live Zoom presentation during office hours and use the same presentation expectations as Option 1.",
        "Option 3: Provide secure AWS Management Console access for review, such as a temporary IAM user account, and ensure resources are clearly visible and organized with tags.",
        "For Option 3, provide clear documentation describing architecture, connected services, key features, application behavior, setup steps, configurations, and security measures.",
      ],
      submissionInstructions: [
        "Option 1: Upload the completed video to Canvas.",
        "Option 2: Email the instructor in advance to schedule the office-hours Zoom meeting.",
        "Option 3: Keep all services active and accessible until grading is completed, then terminate services after grading.",
      ],
      whyItMattersHeading: "Review Expectations",
      whyItMatters:
        "The final review is meant to verify that the architecture is real, functional, understandable, and secure. The instructor should be able to see what was built, why each service was chosen, how the services interact, and what security measures protect the stack.",
    },
  ],
  quiz: cs79dModule08Quiz,
} satisfies CS79DModuleBlueprint;
