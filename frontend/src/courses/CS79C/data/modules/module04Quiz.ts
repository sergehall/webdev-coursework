import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule04Quiz = {
  title: "Auto Scaling & Elastic Load Balancers",
  questions: [
    {
      id: 1,
      question:
        "Which of the following are required elements of an Auto Scaling group? (Choose 2 answers)",
      options: [
        "Minimum size",
        "Health checks",
        "Desired capacity",
        "Launch configuration",
      ],
      multiple: true,
    },
    {
      id: 2,
      question:
        "Which of the following are the minimum required elements to create an Auto Scaling launch configuration?",
      options: [
        "Launch configuration name, AMI, instance type, and key pair",
        "Launch configuration name, AMI, instance type, key pair, security group, and block device mapping",
        "Launch configuration name, Amazon Machine Image (AMI), and instance type",
        "Launch configuration name, AMI, instance type, key pair, and security group",
      ],
    },
    {
      id: 3,
      question:
        "Which of the following must be configured on an Elastic Load Balancing load balancer to accept incoming traffic?",
      options: ["A listener", "A network interface", "A port", "An instance"],
    },
    {
      id: 4,
      question:
        "Your web application front end consists of multiple Amazon Compute Cloud (Amazon EC2) instances behind an Elastic Load Balancing load balancer. You have configured the load balancer to perform health checks on these Amazon EC2 instances. If an instance fails to pass health checks, which statement will be true?",
      options: [
        "The instance is terminated automatically by the load balancer.",
        "The instance is quarantined by the load balancer for root cause analysis.",
        "The load balancer stops sending traffic to the instance that failed its health check.",
        "The instance is replaced automatically by the load balancer.",
      ],
    },
    {
      id: 5,
      question:
        "For an application running in the ap-northeast-1 region with three Availability Zones (ap-northeast-1a, ap-northeast-1b, and ap-northeast-1c), which instance deployment provides high availability for the application that normally requires nine running Amazon Elastic Compute Cloud (Amazon EC2) instances but can run on a minimum of 65 percent capacity while Auto Scaling launches replacement instances in the remaining Availability Zones?",
      options: [
        "Deploy the application on four servers in ap-northeast-1a and five servers in ap-northeast-1b, and keep five stopped instances in ap-northeast-1a as reserve.",
        "Deploy the application on nine servers in ap-northeast-1b, and keep nine stopped instances in ap-northeast-1a as reserve.",
        "Deploy the application on six servers in ap-northeast-1b and three servers in ap-northeast-1c.",
        "Deploy the application on three servers in ap-northeast-1a, three servers in ap-northeast-1b, and three servers in ap-northeast-1c.",
      ],
    },
    {
      id: 6,
      question:
        "Which of the following are characteristics of the Auto Scaling service on AWS? (Select 3)",
      options: [
        "Enforces a minimum number of running Amazon EC2 instances",
        "Sends traffic to only healthy instances",
        "Responds to changing conditions by adding or terminating Amazon Elastic Compute Cloud (Amazon EC2) instances",
        "Launches instances from a specified Amazon Machine Image (AMI)",
      ],
      multiple: true,
    },
    {
      id: 7,
      question: "An Auto Scaling group may use: (Choose 2 answers)",
      options: [
        "Terminated instances",
        "On-Demand Instances",
        "Spot Instances",
        "Already running instances if they use the same Amazon Machine Image (AMI) as the Auto Scaling group's launch configuration and are not already part of another Auto Scaling group",
      ],
      multiple: true,
    },
    {
      id: 8,
      question:
        "Elastic Load Balancing supports which of the following types of load balancers? (Choose 2 answers)",
      options: ["WWW", "Extranet", "Internet Facing", "Internal"],
      multiple: true,
    },
    {
      id: 9,
      question: "Auto Scaling groups always remain the same size.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question: "Elastic Load Balancers are only good for balancing the load.",
      options: ["True", "False"],
    },
    {
      id: 11,
      question: "Elastic load balancers only exist in one AZ.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question:
        "Which of the below is true about the Application Load Balancer? (Select 3)",
      options: [
        "Supports HTTP and HTTPS",
        "Prevents all SSL traffic",
        "Runs on Layer 7",
        "Supports WebSockets",
      ],
      multiple: true,
    },
    {
      id: 13,
      question:
        "Which of the below is true about the Network Load Balancer? (Select 3)",
      options: [
        "No network packet header modification",
        "Functions at Layer 6",
        "Supports static IP address",
        "Best support for high-traffic sites",
      ],
      multiple: true,
    },
    {
      id: 14,
      question: "A single Elastic Load Balancer can have multiple listeners?",
      options: ["True", "False"],
    },
    {
      id: 15,
      question: "Load Balancers are free.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 1,
      correctAnswer: [0, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 2,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 3,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 4,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 5,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 6,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 7,
      correctAnswer: [1, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 8,
      correctAnswer: [2, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 9,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 10,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 11,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 12,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 13,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 14,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule4AutoScalingElasticLoadBalancersQuiz",
      questionId: 15,
      correctAnswer: [1],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
