import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule01Quiz = {
  title: "Security Introduction",
  dueLabel: "Due April 24, 2026 at 11:59 pm — 15 min limit",
  questions: [
    {
      id: 1,
      question:
        "Which of the following is the name of the security model employed by AWS with its customers?",
      options: [
        "The shared responsibility model",
        "The shared secret model",
        "The shared secret key model",
        "The secret key responsibility model",
      ],
    },
    {
      id: 2,
      question:
        "Which is an operational process performed by AWS for data security? (Select All That Apply)",
      options: [
        "Background virus scans of Amazon EBS volumes and snapshots",
        "EC2 Operating Systems patching and updating",
        "Decommissioning of storage devices using industry-standard practices",
        "Replication of data across multiple AWS AZs",
      ],
      multiple: true,
    },
    {
      id: 3,
      question:
        "As a Solutions Architect, how should you architect systems on AWS?",
      options: [
        "You should architect for least cost.",
        "You should architect your AWS usage to take advantage of Amazon S3's durability.",
        "You should architect your AWS usage to take advantage of multiple regions and Availability Zones.",
        "You should architect with Amazon EC2 Auto Scaling to ensure capacity is available when needed.",
      ],
    },
    {
      id: 4,
      question:
        "For which type of services will AWS handle basic security tasks like guest OS patching, firewall configuration, and disaster recovery?",
      options: [
        "managed services",
        "super services",
        "serverfull services",
        "unmanaged services",
      ],
    },
    {
      id: 5,
      question:
        "AWS will secure the guest operating system on all EC2 instances.",
      options: ["True", "False"],
    },
    {
      id: 6,
      question:
        "Which of the programs below are part of the AWS Compliance Program to help meet industry-specific standards? (Select 3)",
      options: ["PCI DSS Level 1", "TPC 9112", "HIPPA", "ISO 9001"],
      multiple: true,
    },
    {
      id: 7,
      question: "AWS data centers exact locations are well known.",
      options: ["True", "False"],
    },
    {
      id: 8,
      question:
        "AWS data center facilities use which of the following security measures. (Select all that apply)",
      options: [
        "gaseous sprinkler systems",
        "Uninterruptible Power Supply (UPS)",
        "professional security staff",
        "video surveillance",
      ],
      multiple: true,
    },
    {
      id: 9,
      question:
        "Which technique does AWS use to decommission their storage devices?",
      options: ["NIST 800-88", "DEFCON 811-09", "NIST 811-99", "SANS 800-88"],
    },
    {
      id: 10,
      question:
        "AWS Core applications are deployed in an __________ configuration.",
      options: ["N+2", "N+1", "M", "N"],
    },
    {
      id: 11,
      question:
        "AWS provides you with the flexibility to place instances and store data within multiple geographic regions as well as across multiple availability zones within each region.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question:
        "The AWS Service Health Dashboard is available and maintained to alert customers of AWS infrastructure issues.",
      options: ["True", "False"],
    },
    {
      id: 13,
      question: "AWS GovCloud (US) region is available to the general public.",
      options: ["True", "False"],
    },
    {
      id: 14,
      question:
        "Distributing your applications and services across multiple availability zones provides the ability to remain resilient in the face of most failure scenarios.",
      options: ["True", "False"],
    },
    {
      id: 15,
      question:
        "AWS monitoring tools are designed to detect unusual or unauthorized activities and conditions at _______ and _________ communication points.",
      options: ["tcp, udp", "client, server", "ingress, egress", "22, 80"],
    },
    {
      id: 16,
      question: "AWS data center infrastructure is built on Linux technology.",
      options: ["True", "False"],
    },
    {
      id: 17,
      question:
        "To help ensure that only authorized users and processes access your AWS Account and resources, AWS uses several types of credentials for authentication. (Select all that Apply)",
      options: ["Access Key", "Finger Prints", "Key Pair", "Password"],
      multiple: true,
    },
    {
      id: 18,
      question: "AWS is able to retrieve customers lost passwords.",
      options: ["True", "False"],
    },
    {
      id: 19,
      question:
        "It's is good security practice to allow AWS IAM users ___________",
      options: [
        "no permissions",
        "maximum permissions",
        "minimum permissions",
        "root permissions",
      ],
    },
    {
      id: 20,
      question: "What is crucial to a security investigation?",
      options: ["firewall", "logs", "versions", "ports"],
    },
    {
      id: 21,
      question: "The CIA Model stands for Confidentiality, Integrity, Access?",
      options: ["True", "False"],
    },
    {
      id: 22,
      question:
        "Fingerprints are a form of Authorization in the AAA security model.",
      options: ["True", "False"],
    },
    {
      id: 23,
      question: "Which AWS Service is used for recording account activity?",
      options: ["AWS Config", "EC2", "CloudTrail", "S3"],
    },
    {
      id: 24,
      question:
        "AWS is responsible for the security of user application in their infrastructure.",
      options: ["True", "False"],
    },
    {
      id: 25,
      question:
        "If your AWS EC2 instance is hacked, it is Amazon Web Services fault.",
      options: ["True", "False"],
    },
    {
      id: 26,
      question:
        "If your AWS Web App is hacked, AWS will recover all compromised data and restore services configuration.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 1,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 2,
      correctAnswer: [2, 3],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 3,
      correctAnswer: [2],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 4,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 5,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 6,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 7,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 8,
      correctAnswer: [0, 1, 2, 3],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 9,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 10,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 11,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 12,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 13,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 14,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 15,
      correctAnswer: [2],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 16,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 17,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 18,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 19,
      correctAnswer: [2],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 20,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 21,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 22,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 23,
      correctAnswer: [2],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 24,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 25,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule1SecurityIntroductionQuiz",
      questionId: 26,
      correctAnswer: [1],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
