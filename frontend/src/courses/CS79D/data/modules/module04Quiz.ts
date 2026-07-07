import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule04Quiz = {
  title: "Module 4 CloudTrail & CloudWatch",
  dueLabel: "Due May 17, 2026 at 11:59 pm — 20 min limit",
  questions: [
    {
      id: 1,
      question:
        "How long does Amazon CloudWatch keep metric data for data points with a period of 60 seconds (1 minute)?",
      options: ["15 days", "3 hours", "63 days", "15 months"],
    },
    {
      id: 2,
      question:
        "You are responsible for the application logging solution for your company's existing applications running on multiple Amazon EC2 instances. Which of the following is the best approach for aggregating the application logs within AWS?",
      options: [
        "An Elastic Load Balancing listener",
        "An internal Elastic Load Balancing load balancer",
        "Amazon CloudWatch metrics",
        "Amazon CloudWatch Logs Agent",
      ],
    },
    {
      id: 3,
      question:
        "Amazon CloudWatch supports which types of monitoring plans? (Choose 2 answers)",
      options: [
        "Detailed monitoring, which has an additional cost",
        "Detailed monitoring, which is free",
        "Basic monitoring, which is free",
        "Basic monitoring, which has an additional cost",
      ],
      multiple: true,
    },
    {
      id: 4,
      question: "All CloudTrail Trails applies to all regions.",
      options: ["True", "False"],
    },
    {
      id: 5,
      question:
        "Visibility into your AWS account activity is a key aspect of security and operational best practices, which is what CloudTrail provides.",
      options: ["True", "False"],
    },
    {
      id: 6,
      question:
        "A trail is a configuration that enables delivery of events to an Amazon _____________.",
      options: ["SAN", "Lambda Function", "EBS", "S3 Bucket"],
    },
    {
      id: 7,
      question:
        "CloudTrail captures actions made by _______ and ________. (Select 2)",
      options: [
        "inside the OS",
        "AWS service for the user",
        "the user",
        "Web App",
      ],
      multiple: true,
    },
    {
      id: 8,
      question: "CloudTrail event log files contain sensitive data.",
      options: ["True", "False"],
    },
    {
      id: 9,
      question: "AWS CloudWatch collects and tracks metrics in real time.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question:
        "You can create a CloudWatch alarm that watches a single metric.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 1,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 2,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 3,
      correctAnswer: [0, 2],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 4,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 6,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 7,
      correctAnswer: [1, 2],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 8,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 9,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule4CloudTrailCloudWatchQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
