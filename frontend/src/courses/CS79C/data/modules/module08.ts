import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule08Blueprint = {
  id: 8,
  title: "Elastic Beanstalk Service",
  weekLabel: "Week 7B",
  dateLabel: "March 30, 2026",
  overview:
    "In this module, we dive into AWS Elastic Beanstalk, a Platform as a Service tool that makes it much easier to deploy, manage, and scale web applications without getting buried in backend setup. Students get hands-on practice deploying a Node.js web application, updating the code, and managing the application environment through the AWS Management Console.",
  topicLine: "Scheduled topic: Elastic Beanstalk Service",
  focusAreas: [
    "Elastic Beanstalk architecture and core features",
    "Deploying and updating a Node.js web application",
    "Managing environments and cleanup operations",
  ],
  objectivesAligned: [
    "Describe the architectural approach used by AWS Elastic Beanstalk.",
    "Deploy and manage Elastic Beanstalk applications.",
  ],
  outcomeAlignment: [
    "Builds practical experience with managed deployment, environment operations, and AWS application delivery best practices.",
  ],
  syllabusContext: [
    "This module follows Lambda and gives a contrasting deployment model based on managed application environments rather than event-driven functions.",
    "It gives students a straightforward path for shipping a full web app while AWS manages most of the infrastructure details.",
  ],
  starterTasks: [
    "Complete the required reading on Elastic Beanstalk",
    "Take lecture notes on environment creation and deployment flow",
    "Prepare screenshots and notes for the Node.js deployment lab",
  ],
  artifacts: [
    "Elastic Beanstalk lab screenshots",
    "Environment management notes",
    "Quiz prep and deployment workflow notes",
  ],
  importantDates: ["Finals week begins: April 6, 2026"],
  assessmentContext: [
    "This module includes required reading, lecture with lab demos, a hands-on lab, and a quiz focused on Elastic Beanstalk deployment and environment management.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Complete required reading on Elastic Beanstalk.",
    },
    {
      step: "2",
      description: "Listen to the course lecture with lab demos.",
    },
    {
      step: "3",
      description: "Complete the lab.",
    },
    {
      step: "4",
      description: "Complete the Elastic Beanstalk quiz.",
    },
  ],
  readingHighlights: [
    "Developer Guide: AWSElastiBeanstalk-DeveloperGuide.pdf.",
    "Read pages 1–15.",
  ],
  textTasks: [
    {
      id: "elastic-beanstalk-lab",
      title: "Elastic Beanstalk",
      objective:
        "In this lab, you will learn how to deploy, update, and terminate a Node.js web application using AWS Elastic Beanstalk through the AWS Management Console.",
      tasks: [
        "Deploy the sample Node.js application using the Node.js platform in Elastic Beanstalk.",
        "Download the update package from the AWS Example site, edit index.html, and add your full name after the word Congratulations.",
        "Upload the updated ZIP package to Elastic Beanstalk using Upload and Deploy.",
        "Open the application URL in a browser and verify your name appears in the app.",
        "Terminate the environment to clean up AWS resources after testing.",
      ],
      submissionInstructions: [
        "Screenshot 1: Web app running before the update.",
        "Screenshot 2: Web app showing your name after the update.",
        "Screenshot 3: Elastic Beanstalk dashboard with your environment before termination.",
      ],
      whyItMattersHeading: "Tip",
      whyItMatters:
        "Refer to the Video Demo on Canvas and the AWS documentation for step-by-step help if you need a visual walkthrough while deploying and updating the application.",
      resourceSections: [
        {
          title: "Step 1: Deploy the Sample Node.js App",
          items: [
            "Log in to the AWS Management Console.",
            "Open Elastic Beanstalk.",
            "Create a new application environment using the Node.js platform.",
            "Select the sample Node.js application provided by AWS.",
            "Launch the application and verify that it runs successfully.",
          ],
        },
        {
          title: "Step 2: Update the Application",
          items: [
            "Download the update package from https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html.",
            "Extract the package contents and open index.html.",
            'Add your full name after the word "Congratulations".',
            "Recompress the folder into a ZIP file if needed.",
            'Upload the new version to Elastic Beanstalk using "Upload and Deploy".',
          ],
        },
        {
          title: "Step 3: Verify the Update",
          items: [
            "Open the web application in your browser using the provided environment URL.",
            "Confirm that your full name is visible in the application.",
          ],
        },
        {
          title: "Step 4: Terminate the Environment",
          items: [
            "Return to the Elastic Beanstalk console.",
            "Terminate the environment to clean up AWS resources and avoid unnecessary charges.",
          ],
        },
        {
          title: "AWS Reference",
          items: [
            "AWS Example documentation: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html",
          ],
        },
      ],
    },
  ],
  quiz: {
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
  },
  milestone:
    "Complete Module 8 with Elastic Beanstalk deployment, environment management, and quiz readiness in place.",
} satisfies CS79CModuleBlueprint;
