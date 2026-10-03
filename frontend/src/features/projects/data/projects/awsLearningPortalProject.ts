import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const awsLearningPortalProject: ProjectShowcaseItem = {
  id: "aws-learning-portal",
  title: "AWS Learning Portal",
  category: "AWS cloud security, serverless, and operations portal",
  status: "paused",
  filters: ["Fullstack", "Cloud", "Security"],
  languages: ["JS", "TS"],
  frameworks: ["Next.js", "NestJS", "AWS"],
  summary:
    "A previously deployed CS79D full-stack learning portal that connects eight cloud security modules to AWS workflows, validated uploads, activity evidence, account security, and a Bedrock-backed assessment advisor. Its EC2 runtime is currently paused.",
  imageUrl: "/screenshots/projects/final-project-CS79D.png",
  thumbnailUrl: "/screenshots/projects/final-project-CS79D-card.webp",
  previewLabel: "AWS security learning portal",
  previewDescription:
    "Explore course modules, invoke the Lambda logging path, upload validated files to S3, inspect DynamoDB activity, and review cloud security evidence.",
  architectureTags: [
    "Single-host deployment path",
    "Role-based AWS access",
    "Serverless activity pipeline",
    "AWS-managed evidence stores",
    "Layered account security",
    "Observable demo workflows",
    "IaC scaling path",
    "AI fallback boundary",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the Next.js portal across eight course modules, live AWS dashboards, S3 uploads, activity logs, API demos, architecture evidence, final assessment, and an authenticated account cabinet.",
    },
    {
      area: "Backend",
      detail:
        "Implemented NestJS APIs for modules, S3, DynamoDB logs, Lambda invocation, profiles, JWT auth, TOTP MFA, GitHub OAuth, and a Bedrock advisor with deterministic fallback.",
    },
    {
      area: "Infrastructure",
      detail:
        "Deployed Next.js and NestJS with PM2, Nginx, HTTPS, and an Elastic IP on EC2; wired IAM, S3, API Gateway, Lambda, DynamoDB, and CloudWatch, then authored an ALB/Auto Scaling CloudFormation path.",
    },
    {
      area: "Security",
      detail:
        "Added nonce-based CSP and security headers, bcrypt, protected JWT routes, TOTP MFA, state-validated GitHub OAuth, Turnstile, throttling, IAM roles, and allowlisted 2 MB uploads.",
    },
  ],
  highlights: [
    "Uses a documented Nginx and PM2 deployment path on one EC2 host. The instance is currently stopped to control AWS costs; ALB/Auto Scaling and the CloudFront/WAF lab remain explicit infrastructure and review paths.",
    "Routes validated uploads to S3 and demo events through API Gateway or the AWS SDK to Lambda and DynamoDB, with shared and account-scoped activity views.",
    "Invokes Amazon Nova Micro through Bedrock when configured and returns a structured deterministic review when the model is unavailable.",
    "Maps eight CS79D modules into an evidence-driven portal while intentionally keeping demo user accounts in memory, so account data resets after a backend restart.",
  ],
  techStack: [
    "Next.js 16.2.7",
    "React 19.2.7",
    "TypeScript 5.7",
    "Tailwind CSS 4.2",
    "NestJS 11.1",
    "Node.js 24 / PM2",
    "AWS SDK v3",
    "EC2 / Nginx",
    "IAM",
    "S3",
    "Lambda / API Gateway",
    "DynamoDB",
    "CloudWatch",
    "Bedrock / Nova Micro",
    "CloudFormation",
  ],
  liveUrl: "https://awsawesome.com",
  videoUrl: "https://sergehall.github.io/final-project-CS79D/video.html",
  sourceUrl: "https://github.com/sergehall/final-project-CS79D",
  docsUrl: "https://sergehall.github.io/final-project-CS79D/",
  architectureUrl:
    "https://github.com/sergehall/final-project-CS79D/blob/main/docs/architecture.md",
};
