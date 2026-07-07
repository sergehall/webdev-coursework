import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule04TextTasks = [
  {
    id: "discussion-week4",
    title: "Discussion: Week 4",
    objective:
      "Reflect on cloud monitoring best practices and the value of audit trails in AWS environments.",
    tasks: [
      "1. How does Amazon CloudWatch help organizations improve system reliability and response time compared to traditional on-premises monitoring tools?",
      "2. How can improper CloudWatch monitoring configurations impact system performance, costs, or security? Give an example of how you can utilize CloudWatch to save cost.",
      '3. Why is tracking "who did what and when" especially important in cloud-based systems?',
    ],
    submissionInstructions: [
      "Submit through SMC Canvas discussion board",
      "Due: May 17, 2026 at 11:59 pm",
      "5 points",
    ],
  },
  {
    id: "lab3-cloudwatch-billing-alarm",
    title: "Lab 3: CloudWatch Billing Alarm",
    objective:
      "Set up a billing alarm using Amazon CloudWatch to monitor AWS charges. The alarm notifies you via email or text when estimated charges exceed a specified threshold — helping you track costs and avoid unexpected bills.",
    tasks: [
      "Note: Billing alerts require account-level billing permissions. IAM users may need billing access explicitly enabled by the root user. Keep the region set to US East (N. Virginia) throughout this lab.",
      "Task 1 — Enable Billing Alerts: Sign in to the AWS Management Console → navigate to Billing and Cost Management → Billing preferences → check 'Receive Billing Alerts' → Save preferences",
      "Task 2 — Create an SNS Topic: Navigate to Amazon SNS → Topics → Create topic → select Standard → enter a name (e.g. BillingAlarmTopic) → Create topic",
      "Task 3 — Subscribe to the SNS Topic: From the topic details page → Create subscription → Protocol: Email or SMS → enter your email or phone number → Create subscription → confirm the subscription link in your email (check spam if not received)",
      "Task 4 — Create a CloudWatch Billing Alarm: Navigate to CloudWatch → ensure region is US East (N. Virginia) → Alarms → Create alarm → Select metric → search for Billing → select Total Estimated Charge (USD) → Conditions: Greater than → threshold: 10 (USD) → Next → select BillingAlarmTopic for notifications → Next → name the alarm (e.g. BillingAlarm10USD) → review → Create alarm",
      "Task 5 — Verify the Alarm: Confirm the alarm appears in CloudWatch Alarms. The status may show INSUFFICIENT_DATA initially — this is expected, as billing metrics can take several hours to update. Verify the correct SNS topic is attached.",
    ],
    submissionInstructions: [
      "Screenshot: Billing preferences page with 'Receive Billing Alerts' checkbox enabled",
      "Due: May 17, 2026 at 11:59 pm",
      "10 points — unlimited attempts, available May 11–22, 2026",
    ],
    whyItMatters:
      "You are not required to exceed the billing threshold to complete this lab. The goal is to verify correct configuration, not to incur charges.",
  },
  {
    id: "lab3b-cloudtrail",
    title: "Lab 3b: CloudTrail",
    objective:
      "Create an AWS CloudTrail trail to record management activity across your AWS account. Configure it to log events from all regions, store logs in an S3 bucket, and verify that CloudTrail is actively recording events.",
    tasks: [
      "Task 1 — Open the CloudTrail Console: Sign in to the AWS Management Console and navigate to the CloudTrail console.",
      "Task 2 — Create a New Trail: In the left navigation pane select Trails → Create trail → enter a unique trail name (e.g. MyManagementTrail) → select 'Apply trail to all regions'",
      "Task 3 — Specify Storage Location: Under Storage location select 'Create new S3 bucket' → enter a globally unique bucket name (S3 bucket names must be globally unique)",
      "Task 4 — Configure Trail Settings: Leave encryption at default → ensure 'Enable log file validation' is checked → under Management events enable both Read events and Write events → leave exclusions unchecked → do not enable Data events, Insights, or Network activity events for this lab → optionally add tags",
      "Task 5 — Create the Trail: Review the configuration → click Create trail → confirm the trail status shows 'Logging'",
      "Task 6 — View Event History: In the CloudTrail console select Event history → review recently logged management events → if no events appear, perform an AWS action (e.g. create an S3 bucket) and refresh the page",
      "Note: Event history is region-specific and displays recent activity for the selected region. IAM users must have permissions for both CloudTrail and Amazon S3.",
    ],
    submissionInstructions: [
      "Screenshot 1: Trail configuration settings showing the trail is created",
      "Screenshot 2: Management events confirming Read and Write are being recorded",
      "Screenshot 3: CloudTrail Event history with events visible",
      "Due: May 17, 2026 at 11:59 pm",
      "10 points — unlimited attempts, available May 11–22, 2026",
    ],
    resourceSections: [
      {
        title: "Resources",
        items: [
          "Creating a trail with the CloudTrail console: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-console.html",
          "Logging management events with CloudTrail: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html",
          "AWS CloudTrail User Guide: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
