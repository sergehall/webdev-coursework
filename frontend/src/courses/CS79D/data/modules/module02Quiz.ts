import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule02Quiz = {
  title: "Module 2 Shared Responsibility & AWS Config Quiz",
  dueLabel: "Due May 3, 2026 at 11:59 pm — 20 min limit",
  questions: [
    {
      id: 1,
      question:
        "AWS is responsible for the security of the EC2 instance operating system.",
      options: ["True", "False"],
    },
    {
      id: 2,
      question: "AWS is responsible for the security in the cloud.",
      options: ["True", "False"],
    },
    {
      id: 3,
      question:
        "AWS customers are responsible for protecting the CIA of their data.",
      options: ["True", "False"],
    },
    {
      id: 4,
      question:
        "Which of the below EC2 resources is it the customer responsibility to secure? (Select All That Apply)",
      options: ["BIOS", "Applications", "Operating System", "Data in Transit"],
      multiple: true,
    },
    {
      id: 5,
      question:
        "AWS secure more resources for manage services (Elastic Beanstalk) vs unmanaged services (EC2).",
      options: ["True", "False"],
    },
    {
      id: 6,
      question:
        "AWS Config performs which of the following tasks ... (Select 2)",
      options: [
        "AWS EC2 Operating System Updates",
        "AWS Resource Inventory",
        "AWS Resource change history",
        "User Data access logs",
      ],
      multiple: true,
    },
    {
      id: 7,
      question:
        "AWS Config rule represents your desired configuration settings for specific AWS resources or for an entire AWS account.",
      options: ["True", "False"],
    },
    {
      id: 8,
      question: "AWS Configuration Items are stored in a .............",
      options: ["S3", "SANS", "NFS", "IAM"],
    },
    {
      id: 9,
      question:
        "A configuration snapshot is a collection of the configuration items for the supported resources that exist in your account.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question:
        "AWS Config also generates configuration items when the configuration of a resource",
      options: ["Periodically", "RDS", "Every 10 min", "Never"],
    },
    {
      id: 11,
      question:
        "AWS Config randomly evaluates your AWS resource configurations for desired settings based on the rules.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question: "Each AWS Config rule runs a ______________ function.",
      options: [
        "elastic beanstalk",
        "function as a service",
        "lambda",
        "ec2 instance",
      ],
    },
    {
      id: 13,
      question: "SNS stands for",
      options: [
        "Simple Messaging Service",
        "Services Not Software",
        "Simple Notice Service",
        "Simple Notification Service",
      ],
    },
    {
      id: 14,
      question: "AWS Config is free?",
      options: ["True", "False"],
    },
    {
      id: 15,
      question: "AWS Config can be used to monitor your global AWS resources.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 1,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 2,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 3,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 4,
      correctAnswer: [1, 2, 3],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 6,
      correctAnswer: [1, 2],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 7,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 8,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 9,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 11,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 12,
      correctAnswer: [2],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 13,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 14,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule2SharedResponsibilityConfigQuiz",
      questionId: 15,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
