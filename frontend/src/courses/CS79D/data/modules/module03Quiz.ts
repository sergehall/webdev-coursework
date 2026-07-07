import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule03Quiz = {
  title: "Identity Access Management",
  dueLabel:
    "May 10, 2026 at 11:59 pm — 10 min limit — unlimited attempts — available May 4–15, 2026",
  questions: [
    {
      id: 1,
      question:
        "Which of the following actions can be authorized by IAM? (Choose 2 answers)",
      options: [
        "Querying an Oracle database",
        "Adding a message to an Amazon Simple Queue Service (Amazon SQS) queue",
        "Installing ASP.NET on a Windows Server",
        "Launching an Amazon Linux EC2 instance",
      ],
      multiple: true,
    },
    {
      id: 2,
      question: "IAM stands for ___________________",
      options: [
        "Identity Access Management",
        "Internal Access Management",
        "ID Access Manager",
        "Identity Authorization Management",
      ],
    },
    {
      id: 3,
      question:
        "Your AWS account administrator left your company today. The administrator had access to the root user and a personal IAM administrator account. With these accounts, he generated other IAM accounts and keys. Which of the following should you do today to protect your AWS infrastructure? (Choose 4 answers)",
      options: [
        "Relaunch all Amazon EC2 instances with new roles.",
        "Rotate keys and change passwords for IAM accounts.",
        "Delete the administrator's personal IAM account.",
        "Change the password and add MFA to the root user.",
        "Delete all IAM accounts.",
        "Put an IP restriction on the root user.",
      ],
      multiple: true,
    },
    {
      id: 4,
      question:
        "Which of the following are based on temporary security tokens? (Choose 3 answers)",
      options: ["Root User", "Federation", "Amazon EC2 Roles", "MFA"],
      multiple: true,
    },
    {
      id: 5,
      question:
        "Your security team is very concerned about the vulnerability of the IAM administrator user accounts (the accounts used to configure all IAM features and accounts). What steps can be taken to lock down these accounts? (Choose 2 answers)",
      options: [
        "Add a CAPTCHA test to the accounts.",
        "Delete account",
        "Implement a password policy on the AWS account.",
        "Add multi-factor authentication (MFA) to the accounts.",
      ],
      multiple: true,
    },
    {
      id: 6,
      question: "What is the format of an IAM policy?",
      options: ["XML", "JSON", "CSV", "SQL"],
    },
    {
      id: 7,
      question:
        "You should use your AWS root account for everyday administrative tasks.",
      options: ["True", "False"],
    },
    {
      id: 8,
      question: "Roles can be used by AWS __________ .",
      options: ["Resources", "Rules", "Pointers", "Passwords"],
    },
    {
      id: 9,
      question: "Grant the most privileges to principles.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question:
        "Which of the following are part of IAM best practices? (Select 3)",
      options: [
        "Remove Unnecessary Credentials",
        "Configure a Strong Password Policy for Your Users",
        "Create Individual IAM Users",
        "Do not regularly rotate Credentials",
      ],
      multiple: true,
    },
  ],
  answers: [
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 1,
      correctAnswer: [1, 3],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 2,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 3,
      correctAnswer: [1, 2, 3, 4],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 4,
      correctAnswer: [1, 2, 3],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 5,
      correctAnswer: [2, 3],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 6,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 7,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 8,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 9,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule3IdentityAccessManagementQuiz",
      questionId: 10,
      correctAnswer: [0, 1, 2],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
