import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule07Quiz = {
  title: "CloudFront, WAF & Shield",
  dueLabel: "Week 7 review — 12 pts",
  questions: [
    {
      id: 1,
      question: "AWS CDN is _____________ ?",
      options: ["CloudCache", "CloudCDN", "CloudFormation", "CloudFront"],
    },
    {
      id: 2,
      question: "There are more AWS regions than AWS edge locations?",
      options: ["True", "False"],
    },
    {
      id: 3,
      question: "A CloudFront origin can be _________ . (Select 3)",
      options: ["EC2 Instance", "S3 Bucket", "ELB/ALB", "Lambda Function"],
      multiple: true,
    },
    {
      id: 4,
      question: "CloudFront edge location will cache content for how long?",
      options: ["TTL", "RFC", "TLL", "SNMP"],
    },
    {
      id: 5,
      question: "WAF is a ___________?",
      options: [
        "VPC gateway",
        "instance firewall",
        "S3 firewall",
        "web application firewall",
      ],
    },
    {
      id: 6,
      question:
        "WAF can protect against which of the following threats? (Select 3)",
      options: ["DDOS", "Heart Bleed", "SYN Flood", "SQL injects"],
      multiple: true,
    },
    {
      id: 7,
      question:
        "WAF can be configured to be dynamically updated by a Lambda function.",
      options: ["True", "False"],
    },
    {
      id: 8,
      question:
        "Shield Standard must be enabled in WAF before providing DDOS protection.",
      options: ["True", "False"],
    },
    {
      id: 9,
      question:
        "WAF can be configured to block all traffic from specified countries.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question: "Shield Advance is free to use for all AWS users.",
      options: ["True", "False"],
    },
    {
      id: 11,
      question:
        "AWS Shield Advance offers 24/7 access to an AWS DDOS response team.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question:
        "If your business or industry is a likely target of DDoS attacks, or if you prefer to let AWS handle the majority of DDoS protection and mitigation responsibilities for layer 3, layer 4, and layer 7 attacks, AWS Shield Advanced might be the best choice.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 1,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 2,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 3,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 4,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 5,
      correctAnswer: [3],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 6,
      correctAnswer: [0, 1, 3],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 7,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 8,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 9,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 10,
      correctAnswer: [1],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 11,
      correctAnswer: [0],
    },
    {
      quizId: "CS79DModule7CloudFrontWafShieldQuiz",
      questionId: 12,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
