import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule06TextTasks = [
  {
    id: "classroom-engagement-aws-blog-post",
    title: "Classroom Engagement - Slack Post AWS Blog Post",
    objective:
      "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
    tasks: [
      "Visit https://aws.amazon.com/blogs/ to explore AWS educational resources and current blog posts.",
      "Find one AWS blog post you are personally interested in.",
      "Write a summary of the blog post with a minimum of 100 words.",
      "Include why you selected that specific AWS blog post.",
      "Include a direct link to the blog post.",
      "Post a screenshot of your Slack discussion entry to Canvas.",
    ],
    submissionInstructions: [
      "Part 1: Submit a 100-word AWS blog summary and the link to the post.",
      "Part 2: Comment on another student's post.",
      "Your entry should be at least 2 to 5 sentences in length.",
      "Your entry can be a new post or a reply to another student.",
      "Use professional grammar and punctuation in this college-level course.",
      'Avoid "text" or "Twitter speak" when corresponding.',
      "Post early and often during the week the discussion board is open.",
    ],
    whyItMattersHeading: "Weekly Topic: AWS Blogs Summary",
    whyItMatters:
      "AWS blog posts are a strong way to stay current on changes and additions to AWS cloud services. This discussion helps you practice learning from official AWS resources and sharing useful updates with classmates.",
    resourceSections: [
      {
        title: "Discussion Guidelines",
        items: [
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation in this college-level course in all correspondence.",
          'Please avoid "text" or "Twitter speak" when corresponding.',
          "The Slack workspace is supposed to represent an ongoing discussion related to the subject matter under consideration.",
          "Students should be posting early and often during the week the discussion board is open.",
        ],
      },
      {
        title: "Tip",
        items: [
          "Read other students' entries because they often contain valuable lab, project, quiz, and course suggestions.",
        ],
      },
    ],
  },
  {
    id: "notification-system-sns-sqs",
    title: "Lab 1: Notification System with SNS and SQS",
    objective:
      "In this hands-on lab, you will explore the fundamentals of cloud messaging by building a real-world notification system using Amazon SNS and Amazon SQS. You will learn how push-based and pull-based messaging patterns work together and see the fan-out architecture pattern in action.",
    tasks: [
      "Build a Campus Alert System that distributes alerts to Student Services, Faculty, Facilities, and Emergency queues.",
      "Create four SQS queues and one SNS topic.",
      "Subscribe each SQS queue to the SNS topic and enable raw message delivery.",
      "Publish test messages and verify fan-out delivery across queues.",
      "Add message filtering so the Emergency queue only receives high-severity alerts.",
      "Review SNS and SQS metrics in CloudWatch.",
      "Delete subscriptions, topic, and queues at the end of the lab to avoid charges.",
    ],
    submissionInstructions: [
      "Submit a single PDF containing all required screenshots and the lab report.",
      "Include all 11 required screenshots, plus any bonus screenshots you want to add.",
      "Include a one-page lab report answering the SNS versus SQS, fan-out, real-world use case, message persistence, and filtering questions.",
      "Submit the PDF to Canvas.",
    ],
    whyItMattersHeading: "Scenario Overview",
    whyItMatters:
      "You are building a Campus Alert System for a college. When administration sends an alert such as a class cancellation, emergency notification, or event announcement, the alert must reach Student Services, Faculty, Facilities, and Emergency channels at the same time.",
    resourceSections: [
      {
        title: "Architecture Pattern",
        items: [
          "Campus Admin publishes one alert to the CampusAlerts SNS topic.",
          "The SNS topic fans the message out to four SQS queues: CampusAlerts-Students, CampusAlerts-Faculty, CampusAlerts-Facilities, and CampusAlerts-Emergency.",
          "This demonstrates one-to-many message distribution with durable queue-based consumption.",
        ],
      },
      {
        title: "Part 1: Create SQS Queues",
        items: [
          "Open Simple Queue Service in the AWS Console and click Create queue.",
          "Create CampusAlerts-Students as a Standard queue and keep the default configuration values.",
          "Repeat the process for CampusAlerts-Faculty, CampusAlerts-Facilities, and CampusAlerts-Emergency.",
          "Verify all four queues appear in the queue list.",
          "Required screenshots: first queue created successfully and the list showing all four queues.",
        ],
      },
      {
        title: "Part 2: Create SNS Topic",
        items: [
          "Open Simple Notification Service and create a Standard topic named CampusAlerts.",
          "Set the display name to Campus Alert System.",
          "Keep the remaining settings at their defaults and create the topic.",
          "Copy the Topic ARN from the topic details page because you will need it later.",
          "Required screenshot: topic details page showing the ARN.",
        ],
      },
      {
        title: "Part 3: Create Subscriptions",
        items: [
          "Create a subscription from the CampusAlerts SNS topic to the CampusAlerts-Students SQS queue.",
          "Use the Amazon SQS protocol, select the queue ARN as the endpoint, and enable raw message delivery.",
          "Repeat the process for the Faculty, Facilities, and Emergency queues.",
          "Verify all four subscriptions appear with Confirmed status.",
          "Required screenshots: first confirmed subscription and the list showing all four confirmed subscriptions.",
        ],
      },
      {
        title: "Part 4: Test the Message Flow",
        items: [
          "Publish a Weather Alert message to the CampusAlerts topic with a JSON body that includes alert_type, severity, title, message, timestamp, and affected_groups.",
          "Go to each SQS queue, poll for messages, and verify that all four queues received the same message.",
          "Open the message body to confirm the JSON content.",
          "Delete the test messages from each queue after verification.",
          "Required screenshots: publish success message and a queue message body.",
        ],
      },
      {
        title: "Part 5: Add Message Filtering",
        items: [
          "Edit the CampusAlerts-Emergency subscription in SNS.",
          'Add the subscription filter policy: { "severity": ["high", "critical"] }.',
          "Publish a low-severity message and include a severity message attribute with value low.",
          "Publish a high-severity message and include a severity message attribute with value high.",
          "Verify the Students, Faculty, and Facilities queues receive both messages while the Emergency queue only receives the high-severity message.",
          "Required screenshot: Emergency queue showing only the filtered high-severity message.",
        ],
      },
      {
        title: "Part 6: Monitor with CloudWatch",
        items: [
          "Open CloudWatch Metrics and review SNS Topic Metrics for CampusAlerts.",
          "View the NumberOfMessagesPublished metric graph.",
          "Review SQS Queue Metrics for CampusAlerts-Students.",
          "Check NumberOfMessagesSent, NumberOfMessagesReceived, and NumberOfMessagesDeleted.",
          "Required screenshots: SNS metrics graph and SQS metrics graph.",
        ],
      },
      {
        title: "Part 7: Clean Up Resources",
        items: [
          "Delete all SNS subscriptions first.",
          'Delete the CampusAlerts SNS topic and confirm with "delete me".',
          "Delete each of the four SQS queues and confirm each deletion by typing the queue name.",
          "Verify the queue list is empty after cleanup.",
          "Required screenshot: empty SQS queue list after cleanup.",
        ],
      },
      {
        title: "Submission Requirements",
        items: [
          "Screenshot #1: First queue created successfully.",
          "Screenshot #2: All 4 queues in the list.",
          "Screenshot #3: SNS topic with ARN.",
          "Screenshot #4: First subscription confirmed.",
          "Screenshot #5: All 4 subscriptions confirmed.",
          "Screenshot #6: Message published successfully.",
          "Screenshot #7: Message body in queue.",
          "Screenshot #8: Filtered message in Emergency queue.",
          "Screenshot #9: CloudWatch SNS metrics.",
          "Screenshot #10: CloudWatch SQS metrics.",
          "Screenshot #11: Cleanup confirmation.",
        ],
      },
      {
        title: "Lab Report Questions",
        items: [
          "What is the difference between SNS and SQS?",
          'Explain the "fan-out" pattern in your own words.',
          "What real-world applications could use this architecture?",
          "What happens to messages if no one reads them from SQS?",
          "Why would you use message filtering?",
        ],
      },
      {
        title: "Troubleshooting Guide",
        items: [
          'If you get "Access Denied," make sure you are in a supported region such as us-east-1 or us-west-2.',
          'If messages do not appear in queues, confirm the subscriptions show "Confirmed" and that raw message delivery is enabled.',
          "If CloudWatch metrics do not appear, wait one to two minutes and verify at least one message was published.",
          "If a subscription does not confirm, delete and recreate it and make sure the queue and topic are in the same region.",
        ],
      },
      {
        title: "Key Concepts to Remember",
        items: [
          "SNS uses a pub/sub push model and is designed for one-to-many notification delivery.",
          "SQS uses a queue-based pull model and stores messages until they are deleted or expire.",
          "Use SNS when you need to notify multiple systems immediately.",
          "Use SQS when you need decoupling and guaranteed message processing.",
          "Use SNS and SQS together when you need fan-out with durable delivery.",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
