import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule08Quiz = {
  title: "Elastic Beanstalk",
  questions: [
    {
      id: 1,
      question: "What is AWS Elastic Beanstalk?",
      options: [
        "makes it even easier for developers to quickly deploy and manage applications in the AWS",
        "makes it even easier for system administrator auto provision databases",
        "makes it even easier for cloud users to storage .jpg files",
        "makes it even easier for developers to configure Lambda services",
      ],
    },
    {
      id: 2,
      question:
        "Which Programming Languages are supported by Elastic Beanstalk? (Select 3)",
      options: ["PHP", "Java", "Python", "C++"],
      multiple: true,
    },
    {
      id: 3,
      question: "Elastic Beanstalk is considered a Platform as a Service?",
      options: ["True", "False"],
    },
    {
      id: 4,
      question:
        "Elastic Beanstalk auto provision EC2 instances when deploying an Application.",
      options: ["True", "False"],
    },
    {
      id: 5,
      question: "Elastic Beanstalk is free.",
      options: ["True", "False"],
    },
    {
      id: 6,
      question: "Elastic Beanstalk is exactly the same as Lambda Services.",
      options: ["True", "False"],
    },
    {
      id: 7,
      question:
        "Elastic Beanstalk configure which of the below AWS services. (Select 3)",
      options: ["EC2", "S3", "IAM", "Azure"],
      multiple: true,
    },
    {
      id: 8,
      question: "Elastic Beanstalk is only meant for Web Developers.",
      options: ["True", "False"],
    },
    {
      id: 9,
      question: "Elastic Beanstalk supports Docker.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question:
        "Elastic Beanstalk environment type can either be load balancing/auto-scaling or single instance.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 1,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 2,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 3,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 4,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 6,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 7,
      correctAnswer: [0, 1, 2],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 8,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 9,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule8ElasticBeanstalkQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
