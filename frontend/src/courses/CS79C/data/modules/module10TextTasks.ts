import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule10TextTasks = [
  {
    id: "aws-portfolio-project-brief",
    title: "Final Project: AWS Portfolio Project",
    objective:
      "This final project demonstrates your mastery of AWS computing services and serves as a portfolio piece for your job search. You will design, deploy, and document a cloud architecture that solves a real-world problem using AWS computing services covered in this course.",
    tasks: [
      "Apply cloud architecture best practices to solve a real-world problem.",
      "Demonstrate hands-on proficiency with AWS computing services.",
      "Document technical decisions and tradeoffs like a cloud engineer.",
      "Create a portfolio-ready project for job applications and interviews.",
      "Practice explaining technical concepts to both technical and non-technical audiences.",
    ],
    submissionInstructions: [
      "Weight: 15% of final grade.",
      "Due: December 21, 2025.",
      "Submit on Canvas as a single PDF with the GitHub URL on the first page and an optional video link if you created one.",
    ],
    previewFiles: [
      {
        fileUrl:
          "/code-playground/CS79C/final-project/CS79C_AWS_Cloud_Stack_Report_Siarhei_Hancharou.pdf",
        filename: "CS79C_AWS_Cloud_Stack_Report_Siarhei_Hancharou.pdf",
        buttonLabel: "AWS Cloud Stack",
      },
      {
        fileUrl: "/code-playground/CS79C/final-project/final-report.html",
        filename: "final-report.html",
        buttonLabel: "Final report",
      },
    ],
    whyItMattersHeading: "Project Requirements",
    whyItMatters:
      "This project is not just for a grade. It is meant to become a career asset that demonstrates practical AWS experience, clear documentation skills, strong cloud architecture understanding, and real problem-solving ability.",
    resourceSections: [
      {
        title: "Technical Requirements",
        items: [
          "Use one primary compute service: EC2, Lambda, ASG, EKS, or Elastic Beanstalk.",
          "Use one supporting AWS service that is different from the primary choice, such as S3, ASG, ELB, Lambda, IAM, or another appropriate service.",
          "Include at least two supporting infrastructure services such as Auto Scaling Groups, Elastic Load Balancer, S3, RDS or DynamoDB, CloudFormation or Terraform, VPC networking, or CloudWatch.",
          "Implement security with IAM roles, security groups, and least-privilege access.",
          "Demonstrate scalability through auto scaling or load distribution.",
          "Demonstrate high availability across multiple Availability Zones where applicable.",
          "Use free-tier eligible services when possible and document cost projections.",
          "Provide a working deployment with a URL or screenshots, include basic monitoring and error handling, and document cleanup after the project is complete.",
        ],
      },
      {
        title: "Possible Project Categories",
        items: [
          "Category A: Full-Stack Web Application such as a task manager, dynamic portfolio, blog platform, or e-commerce storefront.",
          "Category B: Serverless Application such as an image pipeline, ETL flow, chatbot, webhook processor, or scheduled report generator.",
          "Category C: Container-Based Microservices such as a multi-service API, containerized web app, or background job processing system.",
          "Category D: DevOps Pipeline and Infrastructure such as CI/CD automation, multi-environment infrastructure, blue-green deployment, or disaster recovery setup.",
          "AWS Workshops for inspiration: https://workshops.aws/",
        ],
      },
      {
        title: "Deliverables",
        items: [
          "Public GitHub repository with README, architecture diagram, source code, configuration files, Infrastructure as Code if used, and a screenshots folder.",
          "Technical documentation PDF of 2 to 3 pages, excluding screenshots and diagrams.",
          "Optional but strongly recommended video demo showing introduction, architecture walkthrough, live demo, AWS Console tour, key feature highlight, and conclusion.",
        ],
      },
      {
        title: "Technical Documentation Requirements",
        items: [
          "Executive Summary with project name, tagline, problem statement, target use case, and high-level tech stack overview.",
          "Architecture Design with a diagram, explanation of each component, service choice justification, and how the components interact.",
          "Implementation Details including setup steps, key configurations, challenges, solutions, and testing approach.",
          "Cloud Engineering Best Practices covering security, scalability, high availability, cost analysis, and monitoring.",
          "Lessons Learned and Future Improvements.",
          "Appendix with screenshots of deployed resources, application views, monitoring or logs, and cost estimates.",
        ],
      },
      {
        title: "Resources to Help You",
        items: [
          "AWS Getting Started Guides: https://aws.amazon.com/getting-started/hands-on/",
          "AWS Workshops: https://workshops.aws/",
          "AWS Free Tier: https://aws.amazon.com/free/",
          "AWS Documentation: https://docs.aws.amazon.com/",
          "AWS Architecture Center: https://aws.amazon.com/architecture/",
          "AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/",
          "AWS Reference Architectures: https://github.com/aws-samples",
          "Helpful tools include draw.io, Lucidchart, CloudCraft, Loom, OBS Studio, Zoom, GitHub Desktop, GitHub CLI, and AWS CLI.",
        ],
      },
      {
        title: "Deductions and Academic Integrity",
        items: [
          "Late submission results in a 10 percent deduction per day.",
          "Uncleaned AWS resources should be noted and explained in the report.",
          "Plagiarism or copied projects result in zero points and an academic integrity violation.",
          "You may use AWS documentation, tutorials, official workshops, AI tools for debugging or explanation, and open-source code with proper attribution.",
          "You may not copy another student's project, submit a tutorial unchanged as your own, or have someone else build the project for you.",
        ],
      },
      {
        title: "Cost Management and Free Tier",
        items: [
          "EC2 free tier: 750 hours per month for t2.micro or t3.micro.",
          "Lambda free tier: 1 million requests per month plus 400,000 GB-seconds of compute.",
          "S3 free tier: 5 GB of storage.",
          "RDS free tier: 750 hours per month for db.t2.micro or db.t3.micro.",
          "Set a billing alert in AWS, for example at a $5 threshold.",
          "Stop or terminate resources when not actively testing and delete everything after documentation is complete.",
          "Many careful student projects cost roughly $0 to $5 total.",
        ],
      },
      {
        title: "Sample Project Ideas",
        items: [
          "Personal portfolio with CMS using S3, CloudFront, and Lambda.",
          "URL shortener using API Gateway, Lambda, and DynamoDB.",
          "Automated resume screener using S3, Lambda, Textract, and SES.",
          "Scalable blog platform using EC2, Auto Scaling, RDS, S3, and CloudFront.",
          "Microservices API using ECS Fargate, ALB, and RDS or DynamoDB.",
          "CI/CD pipeline demo using GitHub, CodePipeline, CodeBuild, and Elastic Beanstalk.",
          "Serverless data pipeline using S3, Lambda, DynamoDB, and QuickSight.",
        ],
      },
      {
        title: "FAQs",
        items: [
          "This is an individual project, not a partner assignment.",
          "You must use at least one primary compute service. A second compute service is optional but recommended.",
          "The video demo is optional but strongly recommended.",
          "You do not need to keep the project running after submission if it is documented well and cleanup is explained.",
          "If you extend a project from another class, it must be significantly enhanced with AWS services.",
          "For GitHub inspiration, review examples at https://github.com/topics/aws-project.",
        ],
      },
      {
        title: "Submission Checklist",
        items: [
          "Public GitHub repository with complete code and README.",
          "Architecture diagram included in the README and report.",
          "PDF report with all required sections.",
          "Screenshots in the appendix showing deployed AWS resources.",
          "Optional video demo link if created.",
          "All AWS resources documented in the report.",
          "Resource cleanup plan documented.",
          "Proper citations for external resources used.",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
