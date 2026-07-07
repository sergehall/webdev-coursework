import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule03Blueprint = {
  id: 3,
  title: "EC2 Instructions",
  weekLabel: "Week 3",
  dateLabel: "March 2, 2026",
  overview:
    "This module focuses on Amazon Elastic Compute Cloud (EC2), giving students hands-on experience in launching, managing, and securing virtual machines on AWS. The main topics include Security Groups, Key Pairs, EC2 instance deployment, and AWS Command Line Interface operations.",
  topicLine: "Scheduled topic: EC2 Instructions",
  focusAreas: [
    "EC2 instance deployment and management",
    "Security Groups and Key Pairs",
    "AWS CLI operations for EC2 workflows",
  ],
  objectivesAligned: [
    "Deploy EC2 servers and work with various Amazon Machine Images.",
    "Navigate the AWS Management Console.",
  ],
  outcomeAlignment: [
    "Builds direct hands-on experience with launching, securing, and managing Amazon EC2 instances in AWS.",
  ],
  syllabusContext: [
    "This module turns AWS compute concepts into direct EC2 practice with deployment, access, and security controls.",
    "Students connect lecture demonstrations, reading, discussion, and labs into a full EC2 workflow.",
  ],
  starterTasks: [
    "Complete the EC2 reading on instances, Security Groups, and Key Pairs",
    "Take notes from the course lectures and lab demos",
    "Prepare screenshots and notes for EC2 Console and EC2 CLI labs",
  ],
  artifacts: [
    "EC2 launch and access notes",
    "Security Group and Key Pair setup evidence",
    "Lab screenshots and quiz prep notes",
  ],
  importantDates: ['Last day to withdraw without a "W": March 4, 2026'],
  assessmentContext: [
    "This module includes lecture demos, class discussion, two EC2 labs, and an AWS EC2 quiz.",
  ],
  moduleSummary: [
    {
      step: "1",
      description:
        "Complete required reading on EC2, Security Groups, and Key Pairs.",
    },
    {
      step: "2",
      description: "Listen to course lectures with lab demos.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Post Assignment.",
    },
    {
      step: "4",
      description:
        "Complete Lab 1: EC2 Console (LAMP Stack) and Lab 2: EC2 CLI.",
    },
    {
      step: "5",
      description: "Complete the AWS EC2 quiz.",
    },
  ],
  readingHighlights: ["EC2 Developer Guide: EC2 Linux Instance."],
  textTasks: [
    {
      id: "classroom-engagement-slack-post-aws-job-post",
      title: "Classroom Engagement - Slack Post AWS Job Post",
      objective:
        "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
      tasks: [
        "Research possible AWS-related employment opportunities in the Los Angeles area.",
        "Post two entry-level AWS-related jobs in your discussion entry.",
        "Include the job title, company name, job description, job requirements, salary information, and a link to each job post.",
        "Comment on one other student's discussion post.",
        "Do not be afraid to apply to jobs that list two years of work experience, because personal projects can often help fill that requirement.",
      ],
      submissionInstructions: [
        "Post to Canvas a screenshot of your Slack discussion entry.",
        "Your entry should be at least 2 to 5 sentences in length.",
        "Your entry can be a new entry or a reply to another student.",
        "Use professional grammar and punctuation throughout the discussion.",
        'Avoid "text" or "Twitter speak" when corresponding.',
        "Post early and often during the week the discussion board is open.",
      ],
      whyItMattersHeading: "Tip",
      whyItMatters:
        "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
      resourceSections: [
        {
          title: "Possible Keywords",
          items: [
            "Cloud Sales Executive",
            "Cloud Engineer",
            "Cloud Developer",
            "Cloud Systems Administrator",
            "Cloud Consultant",
            "Cloud Systems Engineer",
            "Cloud Network Engineer",
            "Cloud Product Manager",
            "System Architect",
            "System Designer",
            "Systems Administrator",
            "Systems Analyst",
            "IT Analyst",
            "Network Administrator",
            "Network Architect",
            "Network and Computer Systems Administrator",
            "Network Systems Administrator",
          ],
        },
        {
          title: "Useful Job Sites",
          items: [
            "https://aws.amazon.com/education/awseducate/",
            "http://hired.com/",
            "http://angel.co/jobs",
            "https://www.theladders.com",
            "http://www.crunchboard.com/jobs",
            "http://stackoverflow.com/jobs",
            "https://jobs.mashable.com/",
            "http://www.indeed.com",
            "http://www.ziprecruiter.com",
            "https://whitetruffle.com",
            "http://www.dice.com",
            "https://underdog.io",
            "http://jobs.github.com",
            "https://uncubed.com/jobs",
            "http://www.techcareers.com",
            "https://itjobpro.com",
            "http://news.ycombinator.com/jobs",
          ],
        },
        {
          title: "Discussion Guidelines",
          items: [
            "Your entry should be at least 2 to 5 sentences in length.",
            "Your entry can be a new entry or a reply to another student.",
            "Use professional grammar and punctuation in this college-level course.",
            'Avoid "text" or "Twitter speak" when corresponding.',
            "The Slack workspace should reflect an ongoing discussion related to the subject matter under consideration.",
            "Students should be posting early and often during the week the discussion board is open.",
          ],
        },
      ],
    },
    {
      id: "ec2-console-lab-1-setup-linux-lamp-ec2-server",
      title: "EC2 Console Lab 1: Setup Linux LAMP EC2 Server",
      objective:
        "By completing this lab, students will learn how to deploy a LAMP stack (Linux, Apache, MySQL, PHP) on an Amazon EC2 instance using the AWS Management Console.",
      tasks: [
        "Create a Key Pair in the AWS EC2 Key Pairs section.",
        "Create a Security Group that allows TCP port 22 (SSH) from your public IP, TCP port 80 (HTTP) from all sources, and TCP port 443 (HTTPS) from all sources.",
        "Launch an EC2 instance using Amazon Linux 2023 (Free Tier) as the AMI.",
        "Choose instance type t2.micro or t3.micro, attach the previously created Key Pair and Security Group, and leave the remaining options at their default settings.",
        "Connect to the EC2 instance over SSH using your key pair and instance IP address.",
        "Install and configure Apache, MySQL, and PHP to build a working LAMP server.",
        "Verify the Apache server by opening the instance IP address in a browser.",
      ],
      submissionInstructions: [
        "Submit a Word document containing screenshots of each step and a working web server.",
        "Make sure each screenshot is clearly labeled.",
      ],
      whyItMattersHeading: "AWS Academy Learning Lab Users",
      whyItMatters:
        "If you are using AWS Academy Learning Lab, remember that AWS CLI access keys change every 4 hours, so you must retrieve and update them as needed. Also, no new IAM roles can be created, so you must use the provided credentials.",
      resourceSections: [
        {
          title: "SSH Connection",
          items: ["ssh -i MyEC2Key.pem ec2-user@YOUR_INSTANCE_IP"],
        },
        {
          title: "LAMP Setup Commands",
          items: [
            "sudo dnf upgrade -y",
            "sudo dnf install -y httpd wget php-fpm php-mysqli php-json php php-devel",
            "sudo dnf install mariadb105-server",
            "sudo systemctl enable httpd",
            "sudo systemctl start httpd",
            "sudo systemctl is-enabled httpd",
          ],
        },
        {
          title: "AWS Documentation",
          items: [
            "https://docs.aws.amazon.com/linux/al2/ug/ec2-lamp-amazon-linux-2.html",
          ],
        },
      ],
    },
    {
      id: "ec2-cli-lab-2-setup-linux-server-ec2-instance",
      title: "EC2 CLI Lab 2: Setup Linux Server EC2 Instance",
      objective:
        "By completing this lab, students will gain hands-on experience in deploying and managing an Amazon EC2 instance using the AWS CLI.",
      tasks: [
        "Configure AWS CLI and authentication credentials.",
        "Create and manage Key Pairs and Security Groups.",
        "Launch an EC2 instance through the AWS CLI using predefined settings.",
        "Establish a secure SSH connection to the instance.",
        "Apply AWS networking and security best practices throughout the workflow.",
      ],
      submissionInstructions: [
        "If you are using AWS Academy Learning Lab, add the option --profile learner or --profile=learner with each command.",
        "AWS CLI access keys change every 4 hours, so retrieve and update them as needed.",
        "No new IAM roles can be created in AWS Academy Learning Lab, so use the provided credentials.",
      ],
      whyItMattersHeading: "AWS Academy Learning Lab Users",
      whyItMatters:
        "Use the provided credentials, refresh temporary access keys as needed, and include the learner profile in each command when working in AWS Academy Learning Lab.",
      resourceSections: [
        {
          title: "Step 1: Configure AWS CLI",
          items: ["aws --version", "aws configure"],
        },
        {
          title: "Step 2: Create a Key Pair",
          items: [
            "Windows users: aws ec2 create-key-pair --key-name MyEC2Key --query 'KeyMaterial' --output text | Out-File -Encoding ascii MyEC2Key.pem",
            "macOS users: aws ec2 create-key-pair --key-name MyEC2Key --query 'KeyMaterial' --output text > MyEC2Key.pem",
            "chmod 400 MyEC2Key.pem",
          ],
        },
        {
          title: "Step 3: Create a Security Group",
          items: [
            'aws ec2 create-security-group --group-name MyEC2SecurityGroup --description "Security group for EC2 Lab"',
          ],
        },
        {
          title: "Step 4: Configure Security Group Rules",
          items: [
            "Find your public IP at https://whatismyipaddress.com/ or replace YOUR_PUBLIC_IP/32 with 0.0.0.0/0.",
            "Depending on your network, only CIDR 0.0.0.0/0 might allow you to SSH into the server.",
            "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 22 --cidr YOUR_PUBLIC_IP/32",
            "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 22 --cidr 0.0.0.0/0",
            "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 80 --cidr 0.0.0.0/0",
            "aws ec2 authorize-security-group-ingress --group-name MyEC2SecurityGroup --protocol tcp --port 443 --cidr 0.0.0.0/0",
          ],
        },
        {
          title: "Step 5: Launch the EC2 Instance",
          items: [
            "Find an updated AMI in the AWS Web Console for the AWS Region where the instance will be deployed.",
            "aws ec2 run-instances --image-id ami-005c06c6de69aee84 --instance-type t2.micro --key-name MyEC2Key --security-groups MyEC2SecurityGroup",
          ],
        },
        {
          title: "Step 6: Connect to the EC2 Instance via SSH",
          items: [
            "aws ec2 describe-instances --query 'Reservations[*].Instances[*].PublicIpAddress' --output text",
            "ssh -i MyEC2Key.pem ec2-user@YOUR_INSTANCE_IP",
          ],
        },
      ],
    },
  ],
  quiz: {
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
  },
  milestone:
    "Complete Module 3 with EC2 deployment, security, lab work, and quiz readiness in place for the next module.",
} satisfies CS79CModuleBlueprint;
