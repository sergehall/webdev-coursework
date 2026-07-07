import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule02TextTasks = [
  {
    id: "discussion-week2",
    title: "Discussion: Week 2",
    objective:
      "Reflect on cloud monitoring and the AWS Shared Responsibility Model in the context of real deployments.",
    tasks: [
      "1. Why is continuous monitoring important in cloud environments? Provide a scenario where proactive monitoring could prevent an outage. (Note: you have no control over AWS-side outages.)",
      "2. How does AWS Config support the customer's responsibilities within the Shared Responsibility Model?",
      "3. What types of risks can AWS Config help identify that might otherwise go unnoticed?",
      "4. When deploying an EC2-based web server, which security implementations are you responsible for?",
    ],
    submissionInstructions: [
      "Submit through SMC Canvas discussion board",
      "Due: May 3, 2026 at 11:59 pm",
      "8 points",
    ],
  },
  {
    id: "lab1-iam-accounts",
    title: "Lab 1: IAM Accounts",
    objective:
      "Configure IAM groups and users with administrative access, generate programmatic credentials, and validate IAM sign-in — using your main AWS live account.",
    tasks: [
      "1. Using root or an existing admin IAM user, open the IAM Console",
      "2. Create a User Group named AdminGroup with the AdministratorAccess policy attached",
      "3. Create IAM user kkol — enable 'User must create a new password at next sign-in', no permissions yet",
      "4. Add kkol to AdminGroup",
      "5. On kkol's Security credentials tab, create an Access Key (CLI use case) and download the .csv file",
      "6. Repeat steps 3–5 for yourself",
      "7. Locate the IAM sign-in URL from the .csv file and test your IAM login",
      "8. After logging in as the IAM user, verify administrative permissions are working",
    ],
    submissionInstructions: [
      "Screenshot: IAM User Groups page showing AdminGroup",
      "Screenshot: IAM Users list showing both created users",
      "File upload: .csv file containing access keys for kkol",
      "Due: May 3, 2026 at 11:59 pm — unlimited attempts, available Apr 27 – May 8",
      "15 points",
    ],
    whyItMatters:
      "This lab uses traditional IAM users for educational purposes. In real-world scenarios most organisations now use AWS IAM Identity Center (SSO) for better security and centralised access management.",
  },
  {
    id: "lab1b-mfa",
    title: "Lab 1b: MFA",
    objective:
      "Enable Multi-Factor Authentication on the AWS root account using a virtual MFA device on your mobile phone.",
    tasks: [
      "1. Sign in as the root user (IAM credentials will not work for this lab)",
      "2. In the top-right corner select your account name → Security credentials",
      "3. Locate the Multi-factor authentication (MFA) section",
      "4. Select 'Assign MFA device' → Virtual MFA device → Next",
      "5. Open your MFA app, scan the QR code (or enter the secret key manually)",
      "6. Enter two consecutive six-digit codes to complete registration",
      "7. Confirm MFA status shows as Enabled on the Security credentials page",
      "8. Sign out and sign back in as root — confirm MFA is required",
      "Reflection 1: Why is MFA especially important for the AWS root account?",
      "Reflection 2: Why should IAM users be used instead of the root user?",
    ],
    submissionInstructions: [
      "Screenshot: MFA app showing 'Amazon Web Services' with the six-digit pin visible",
      "Due: May 3, 2026 at 11:59 pm — unlimited attempts, available Apr 28 – May 8",
      "10 points",
    ],
    whyItMatters:
      "The root account has unrestricted access to every AWS resource and cannot be limited by IAM policies. Compromising it is effectively game over for the account. MFA is the single highest-impact control you can add in under five minutes.",
  },
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
