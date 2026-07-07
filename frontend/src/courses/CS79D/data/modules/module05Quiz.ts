import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule05Quiz = {
  title: "Inspector & Trusted Advisor",
  dueLabel: "May 24, 2026 at 11:59 pm — 15 min limit — 10 pts",
  questions: [
    {
      id: 1,
      question:
        "How many AWS Trusted Advisor checks are available to all AWS customers?",
      options: ["25", "7", "12", "36"],
    },
    {
      id: 2,
      question:
        "Full Trusted Advisor Benefits is only available to which type of AWS accounts? (Choose 2)",
      options: ["Business", "Developer", "Enterprise", "Personal"],
      multiple: true,
    },
    {
      id: 3,
      question:
        "Which AWS service is an online resource to help you reduce cost, increase performance, and improve security by optimizing your AWS environment?",
      options: ["AWS Config", "Trusted Advisor", "Inspector", "CloudTrail"],
    },
    {
      id: 4,
      question:
        "Which AWS service provides automated security assessment to help improve the security and compliance of applications deployed on AWS?",
      options: ["Inspector", "AWS Config", "Trusted Advisor", "CloudWatch"],
    },
    {
      id: 5,
      question: "Amazon Inspector requires an agent to be installed.",
      options: ["True", "False"],
    },
    {
      id: 6,
      question:
        "Amazon Inspector checks your system against the CVE security database.",
      options: ["True", "False"],
    },
    {
      id: 7,
      question:
        "A potential security issue discovered during the Amazon Inspector assessment run of the specified target is called __________.",
      options: ["Exploits", "Zero Day", "Pwned", "Finding"],
    },
    {
      id: 8,
      question:
        "Inspector agents can be installed on which operating systems? (Select 3)",
      options: ["Windows 2008 R2", "Windows 2003", "Redhat", "Amazon Linux"],
      multiple: true,
    },
    {
      id: 9,
      question: "CVE can be searched at which website(s)?",
      options: [
        "https://nvd.nist.org",
        "https://cve.org",
        "https://cve.mitre.org/",
        "https://inspector.com",
      ],
      multiple: true,
    },
    {
      id: 10,
      question: "Inspector checks for common security best practices.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 1,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 2,
      correctAnswer: [0, 2],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 3,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 4,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 6,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 7,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 8,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 9,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79DModule5InspectorTrustedAdvisorQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
