import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule03Quiz = {
  title: "EC2: Elastic Compute Cloud",
  questions: [
    {
      id: 1,
      question:
        "Your web application needs four instances to support steady traffic nearly all of the time. On the last day of each month, the traffic triples. What is a cost-effective way to handle this traffic pattern?",
      options: [
        "Run four On-Demand Instances constantly, then add eight more On-Demand Instances on the last day of each month.",
        "Run 12 Reserved Instances all of the time.",
        "Run four On-Demand Instances constantly, then add eight Reserved Instances on the last day of each month.",
        "Run four Reserved Instances constantly, then add eight On-Demand Instances on the last day of each month.",
      ],
    },
    {
      id: 2,
      question:
        "Which of the following must be specified when launching a new Amazon Elastic Compute Cloud (Amazon EC2) instance? (Choose 2 answers)",
      options: [
        "Amazon EC2 instance type",
        "Amazon Machine Image (AMI)",
        "The Amazon EC2 instance ID",
        "Password for the administrator account",
      ],
      multiple: true,
    },
    {
      id: 3,
      question: "How can you connect to a new Linux instance using SSH?",
      options: [
        "Using Multi-Factor Authentication (MFA)",
        "Decrypt the root password.",
        "Using the private half of the instance's key pair",
        "Using a certificate",
      ],
    },
    {
      id: 4,
      question:
        "Which of the following can be used to address an Amazon Elastic Compute Cloud (Amazon EC2) instance over the web? (Choose 2 answers)",
      options: [
        "Public DNS name",
        "Elastic IP address",
        "Instance Hostname",
        "Amazon EC2 instance ID",
      ],
      multiple: true,
    },
    {
      id: 5,
      question:
        "Your instance is associated with two security groups. The first allows Remote Desktop Protocol (RDP) access over port 3389 from Classless Inter-Domain Routing (CIDR) block 72.14.0.0/16. The second allows HTTP access over port 80 from CIDR block 0.0.0.0/0. What traffic can reach your instance?",
      options: [
        "RDP traffic over port 3389 from 72.14.0.0/16 and HTTP traffic over port 80 from 0.0.0.0/0",
        "No traffic is allowed.",
        "RDP and HTTP access from CIDR block 0.0.0.0/0",
        "RDP and HTTP traffic from 72.14.0.0/16",
      ],
    },
    {
      id: 6,
      question:
        "Which instance type is best suited for HPC: High-Performance Computing which is CPU intensive processing?",
      options: ["T3", "C5", "P5", "X1e"],
    },
    {
      id: 7,
      question: "An Amazon Machine Image (AMI) is a ...",
      options: [
        "Virtual machine in the cloud",
        "template that contains a software configuration.",
        "operating system updates.",
        "firewall template",
      ],
    },
    {
      id: 8,
      question:
        "You can run the same Amazon Machine Image on different instance types (for example T3 and C5).",
      options: ["True", "False"],
    },
    {
      id: 9,
      question: "Instance stores can be used for a T3 instance root device.",
      options: ["True", "False"],
    },
    {
      id: 10,
      question: "Security groups are ...",
      options: [
        "Stateful — if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.",
        "Stateless - if you send a request from your instance, the response traffic for that request is not allowed to flow in regardless of inbound security group rules.",
      ],
    },
    {
      id: 11,
      question: "Security groups can be changed at any time.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question: "Security groups allow ... (Select 3)",
      options: [
        "All outgoing traffic",
        "Hackers in.",
        "ICMP traffic rules",
        "CIDR notation",
      ],
      multiple: true,
    },
    {
      id: 13,
      question:
        "Public-key cryptography authentication is less secure than password authentication.",
      options: ["True", "False"],
    },
    {
      id: 14,
      question:
        "Which instance type is best suited for accessing huge amounts of data?",
      options: ["P5", "I7i", "R2D2", "X1"],
    },
    {
      id: 15,
      question: "When an instance is terminated it ... (Select 2)",
      options: [
        "the attached Amazon EBS volumes are deleted unless the volume's deleteOnTermination attribute is set to false.",
        "can be restored from AWS free backups",
        "it can be restarted after termination",
        "the instance performs a normal shutdown",
      ],
      multiple: true,
    },
    {
      id: 16,
      question:
        "Amazon EC2 eliminates your need to invest in hardware up front.",
      options: ["True", "False"],
    },
    {
      id: 17,
      question:
        "Amazon Elastic Compute Cloud (Amazon EC2) provides computing capacity in the Amazon Web Services (AWS) cloud.",
      options: ["True", "False"],
    },
    {
      id: 18,
      question:
        "Security groups must be in the same Region as the EC2 instance.",
      options: ["True", "False"],
    },
    {
      id: 19,
      question: "Elastic IP addresses are a ...",
      options: [
        "Stretchable IP Address",
        "Static IPv4 addresses for dynamic cloud computing",
        "Dynamic IPv4 addresses for dynamic cloud computing",
        "Rotating Load Balancing IPv4 address",
      ],
    },
    {
      id: 20,
      question:
        "Reserved Instances make a low, one-time, up-front payment for an instance, reserve it for a one- or three-year term, and pay a significantly lower hourly rate for these instances.",
      options: ["True", "False"],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 1,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 2,
      correctAnswer: [0, 1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 3,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 4,
      correctAnswer: [0, 1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 6,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 7,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 8,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 9,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 10,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 11,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 12,
      correctAnswer: [0, 2, 3],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 13,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 14,
      correctAnswer: [3],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 15,
      correctAnswer: [0, 3],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 16,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 17,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 18,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 19,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule3Ec2ElasticComputeCloudQuiz",
      questionId: 20,
      correctAnswer: [0],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
