import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule08TextTasks = [
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
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
