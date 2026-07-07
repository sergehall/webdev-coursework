import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule05Quiz = {
  title: "Kubernetes & Amazon EKS",
  questions: [
    {
      id: 1,
      question: "At its core, Kubernetes is a platform for:",
      options: [
        "Deploying EC2 Instances",
        "Packaging software in containers",
        "Running and scheduling container applications on a cluster",
        "Provisioning machines (similar to Puppet, Ansible)",
      ],
    },
    {
      id: 2,
      question: "In Kubernetes, a node is:",
      options: [
        "A worker machine",
        "Controls all the communication between nodes",
        "A tool for starting a kubernetes cluster on a local machine",
        "A machine that coordinates the scheduling and management of application containers on the cluster",
      ],
    },
    {
      id: 3,
      question: "What can you deploy on Kubernetes?",
      options: [
        "Containers",
        "Virtual Machines",
        "AWS EC2 Instances",
        "System Processes",
      ],
    },
    {
      id: 4,
      question: "Kubectl is:",
      options: [
        "A tool used to start a Kubernetes cluster on a local machine",
        "the Kubernetes cli tool",
        "A type of Kubernetes host",
        "A system process",
      ],
    },
    {
      id: 5,
      question: "What is a Deployment?",
      options: [
        "A Deployment is responsible for managing the desired state of your applications",
        "A type of container",
        "A type of Kubernetes host",
        "An application running on Linux",
      ],
    },
    {
      id: 6,
      question: "What command would you use to create a Deployment?",
      options: [
        "kubectl run",
        "kubectl get nodes",
        "kubectl get deployments",
        "kubectl describe deplaoyments",
      ],
    },
    {
      id: 7,
      question: "What is a Pod?",
      options: [
        "A group of one or more application containers that include shared volume and IP address",
        "A host machine where containers are deployed",
        "A Kubernetes primitive responsible for deploying and scheduling application containers",
        "No answer text provided.",
      ],
    },
    {
      id: 8,
      question: "What is a Service?",
      options: [
        "A Service is responsible for creating and updating instances of your containerized applications",
        "A co-located and co-scheduled group of one or more containers that share volume and an IP address",
        "A Kubernetes Service is an abstraction layer which defines a logical set of Pods",
        "No answer text provided.",
      ],
    },
    {
      id: 9,
      question: "How can you create a Service?",
      options: [
        'With "kubectl describe"',
        'With "kubectl proxy"',
        'With "kubectl expose"',
        "No answer text provided.",
      ],
    },
    {
      id: 10,
      question: "What is the scope of a rolling update?",
      options: [
        "To update a Service",
        "To scale an app",
        "To update a Deployment",
        "No answer text provided.",
      ],
    },
    {
      id: 11,
      question:
        "A container requires more system resources than Virtual Machines or Instances.",
      options: ["True", "False"],
    },
    {
      id: 12,
      question:
        "A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings.",
      options: ["True", "False"],
    },
    {
      id: 13,
      question:
        "The benefits of using a Container are ... (Select All That Apply)",
      options: ["Flexible", "Cost Effective", "Portable", "Lightweight"],
      multiple: true,
    },
    {
      id: 14,
      question:
        "What does this docker command do: docker run -p 80:80 hello-world",
      options: [
        "run a ECS Cluster",
        "exposed port 80 on the container to port 80 on the host system",
        "expose a security group port",
        "Run docker image hello-world",
      ],
    },
  ],
  answers: [
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 1,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 2,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 3,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 4,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 5,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 6,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 7,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 8,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 9,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 10,
      correctAnswer: [2],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 11,
      correctAnswer: [1],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 12,
      correctAnswer: [0],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 13,
      correctAnswer: [0, 1, 2, 3],
    },
    {
      quizId: "CS79CModule5KubernetesAmazonEKSQuiz",
      questionId: 14,
      correctAnswer: [1],
    },
  ],
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
