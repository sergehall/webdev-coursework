import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule06Blueprint = {
  id: 6,
  title: "SNS, SQS, API Gateway",
  weekLabel: "Week 6",
  dateLabel: "March 23, 2026",
  overview:
    "This module covers foundational AWS architecture patterns and services for building scalable cloud applications. It contrasts monolithic and distributed architectures, explores tight versus loose coupling, and introduces synchronous, asynchronous, and event-driven communication models through Amazon SQS, Amazon SNS, and Amazon API Gateway.",
  topicLine: "Scheduled topic: SNS, SQS, API Gateway",
  focusAreas: [
    "Monolithic versus distributed architecture patterns",
    "Tight coupling, loose coupling, and communication models",
    "Amazon SQS, Amazon SNS, and Amazon API Gateway workflows",
  ],
  objectivesAligned: [
    "Describe important design considerations for scalable cloud applications.",
    "Describe the architectural approach used by AWS.",
  ],
  outcomeAlignment: [
    "Builds architectural thinking around scalable messaging, decoupled services, and managed API entry points in AWS.",
  ],
  syllabusContext: [
    "This module shifts the course from compute orchestration into messaging, API design, and distributed application structure.",
    "It introduces the AWS services commonly used to decouple systems and move from tightly coupled applications toward more scalable event-driven workflows.",
  ],
  starterTasks: [
    "Complete the required reading on SQS, SNS, and API Gateway",
    "Capture lecture notes about architecture patterns and communication models",
    "Prepare screenshots and notes for the module lab and messaging workflows",
  ],
  artifacts: [
    "Architecture pattern notes",
    "Messaging workflow screenshots",
    "Quiz prep and service comparison notes",
  ],
  importantDates: ['Guaranteed "W" withdrawal deadline: March 28, 2026'],
  assessmentContext: [
    "This module includes required reading, lectures, a Slack discussion, a lab, and a quiz focused on scalable communication patterns and AWS messaging services.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on SQS, SNS, and API Gateway.",
    },
    {
      step: "2",
      description: "Listen to the course lectures.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description: "Complete the lab.",
    },
    {
      step: "5",
      description: "Complete the quiz.",
    },
  ],
  readingHighlights: [
    "SNS: Simple Notification Service (Pages 1–18).",
    "SQS: Simple Queue Service (Pages 1–21).",
    "API Gateway (Pages 1–13).",
  ],
  textTasks: [
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
  ],
  quiz: {
    title: "SNS SQS and API Gateway",
    questions: [
      {
        id: 1,
        question:
          "Which architecture style allows independent scaling of services such as catalog, payments, or inventory without redeploying the whole app?",
        options: [
          "Single-tenant VM",
          "Distributed microservices",
          "Tightly coupled layered",
          "Monolithic",
        ],
      },
      {
        id: 2,
        question:
          "Which communication pattern is best when the caller must wait for an immediate result (e.g., get order total)?",
        options: [
          "Synchronous request/response",
          "Batch file transfer",
          "Asynchronous event",
          "Pub/Sub broadcast",
        ],
      },
      {
        id: 3,
        question:
          "Which SQS feature prevents other consumers from receiving a message while it is being processed?",
        options: [
          "Deduplication ID",
          "Redrive policy",
          "Visibility timeout",
          "Delivery delay",
        ],
      },
      {
        id: 4,
        question:
          "You have duplicate tolerant, high volume tasks (image resizing). Which SQS queue type is the most cost-effective and scalable fit?",
        options: [
          "FIFO queue",
          "Priority queue",
          "Standard queue",
          "Dead-letter queue",
        ],
      },
      {
        id: 5,
        question:
          "You need one message to notify many targets (HTTP webhook, email, Lambda, and SQS). Which service/pattern fits best?",
        options: [
          "SNS topic with multiple subscription protocols",
          "SQS with multiple consumers on same message",
          "EventBridge only",
          "Direct calls to each microservice",
        ],
      },
      {
        id: 6,
        question:
          "An e-commerce app publishes 'OrderPlaced' to SNS, which fans out to multiple SQS queues for independent services. What resilience benefit does this provide?",
        options: [
          "Failures in one consumer don't block others",
          "Eliminates the need for monitoring",
          "Strong consistency across services",
          "All services share a single retry counter",
        ],
      },
      {
        id: 7,
        question:
          "Which API Gateway type is positioned for enterprise features like request validation and advanced auth?",
        options: [
          "WebSocket API",
          "Edge-optimized API",
          "REST API",
          "HTTP API",
        ],
      },
      {
        id: 8,
        question:
          "Which API Gateway type enables real-time, bidirectional communication for chat or live dashboards?",
        options: ["WebSocket API", "gRPC API", "REST API", "HTTP API"],
      },
      {
        id: 9,
        question:
          "True or False: API Gateway can transform requests and responses (e.g., XML/JSON) and manipulate headers without changing backend code.",
        options: ["False", "True"],
      },
      {
        id: 10,
        question:
          "Your startup offers free and premium API tiers. Which API Gateway capability lets you enforce different request limits per client?",
        options: [
          "Mock integrations",
          "Usage plans only for REST APIs",
          "Edge-optimized endpoints",
          "Rate limiting throttling with per-key quotas and bursts",
        ],
      },
      {
        id: 11,
        question:
          "Enabling API Gateway caching primarily benefits which outcomes?",
        options: [
          "Guaranteed ordering",
          "Automatic DB failover",
          "Stronger encryption and auth",
          "Lower latency and reduced backend load/costs",
        ],
      },
    ],
    answers: [
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 1,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 2,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 3,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 4,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 5,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 6,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 7,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 8,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 9,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 10,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule6SnsSqsAndApiGatewayQuiz",
        questionId: 11,
        correctAnswer: [3],
      },
    ],
  },
  milestone:
    "Complete Module 6 with scalable messaging, API architecture, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
