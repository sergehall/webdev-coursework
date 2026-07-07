import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule03Blueprint = {
  id: 3,
  title: "Application Security and AWS CLI",
  weekLabel: "Week 3",
  dateLabel: "May 4–10, 2026",
  overview:
    "This module moves from the console to the command line. You will configure the AWS CLI, manage IAM resources programmatically, deploy an Nginx web server on EC2, and harden it with HTTPS and security headers. By the end of the week you will have a publicly accessible website scored by Mozilla Observatory.",
  topicLine:
    "Scheduled topic: Application Stack, Website Security, and AWS CLI",
  focusAreas: [
    "AWS CLI installation and configuration",
    "IAM management via command line",
    "Nginx web server deployment on EC2",
    "SSL/TLS with Let's Encrypt (Certbot)",
    "HTTP security headers — CSP, HSTS, X-Frame-Options",
    "Application stack selection and research",
  ],
  objectivesAligned: [
    "Install and configure the AWS CLI with IAM credentials",
    "Create IAM users and groups using CLI commands only",
    "Deploy and configure Nginx on Ubuntu 22.04 EC2",
    "Obtain and apply an SSL/TLS certificate via Certbot",
    "Add HTTP security headers to improve Mozilla Observatory score",
    "Research and select an appropriate application stack",
  ],
  outcomeAlignment: [
    "Manage AWS resources without the Management Console",
    "Secure a web server from an F grade to a passing score",
    "Apply least-privilege IAM controls via CLI",
  ],
  syllabusContext: [
    "Module 3 of 8 — builds on IAM fundamentals from Module 2",
    "CLI labs must be performed in a live AWS account, not the Learner Lab",
    "All deliverables due May 10, 2026",
  ],
  starterTasks: [
    "Verify Python, pip, and AWS CLI are installed",
    "Configure AWS CLI with IAM access keys",
    "Launch an Ubuntu 22.04 EC2 instance with ports 80 and 443 open",
    "Research and select your application stack",
  ],
  artifacts: [
    "Screenshot of aws s3 ls output via CLI",
    "Screenshots of each IAM CLI command and its output",
    "Mozilla Observatory score before and after hardening",
    "Written application stack proposal",
  ],
  importantDates: [
    "May 10 — Discussion: Week 3 (8 pts)",
    "May 10 — Assignment 3: Application Stack (10 pts)",
    "May 10 — Lab 2: Website Security Solution (20 pts)",
    "May 10 — Lab 2b: Part 1 - AWS CLI (20 pts)",
    "May 10 — Lab 2b: Part 2 - IAM via CLI (20 pts)",
    "May 10 — Quiz: Identity Access Management (10 pts)",
  ],
  assessmentContext: [
    "Discussion: Week 3 — 8 pts",
    "Assignment 3: Application Stack — 10 pts",
    "Lab 2: Website Security Solution — 20 pts",
    "Lab 2b: Part 1 - AWS CLI — 20 pts",
    "Lab 2b: Part 2 - IAM via CLI — 20 pts",
    "Quiz: Identity Access Management — 10 pts",
    "Total Week 3 — 88 pts",
  ],
  milestone:
    "AWS CLI configured, IAM managed via CLI, Nginx website live with HTTPS and passing Observatory score",
  quiz: {
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
  },
  textTasks: [
    {
      id: "discussion-week3",
      title: "Discussion: Week 3",
      objective:
        "Reflect on the AWS CLI, IAM best practices, and access key management in real-world cloud operations.",
      tasks: [
        "1. What are the benefits of using the AWS CLI over the AWS Management Console for managing resources?",
        "2. Why is it considered a best practice to avoid using the AWS root account for daily tasks?",
        "3. What are access keys, and when are they used?",
        "4. How can you address a user that does not have permission to run an AWS CLI command?",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas discussion board",
        "Due: May 10, 2026 at 11:59 pm",
        "8 points",
      ],
    },
    {
      id: "assignment3-application-stack",
      title: "Assignment 3: Application Stack",
      objective:
        "Research, evaluate, and select an application stack suitable for deployment on an AWS EC2 instance. An application stack typically consists of an operating system, web server, application runtime, and database — such as a LAMP or LEMP stack.",
      tasks: [
        "Research application stacks suitable for EC2 deployment (e.g., LAMP, LEMP, or an AWS Marketplace solution)",
        "Decide whether to build and configure manually or launch from the AWS Marketplace",
        "Document the name and function of your chosen stack",
        "Describe the intended use case or purpose",
        "Collect links to all documentation or references used",
      ],
      submissionInstructions: [
        "Include: name of the application stack selected",
        "Include: a brief description of its function",
        "Include: the intended use case or purpose",
        "Include: whether the stack will be built manually or launched from AWS Marketplace",
        "Include: links to any documentation or references used",
        "Due: May 10, 2026 at 11:59 pm",
        "10 points — unlimited attempts, available May 4–15, 2026",
      ],
      resourceSections: [
        {
          title: "Reference Examples",
          items: [
            "osTicket on Nginx (Ubuntu 24.04): https://try.direct/blog/how-to-install-osticket-with-nginx-on-ubuntu-24-04",
            "LAMP Stack on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu",
            "LEMP Stack on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu",
          ],
        },
      ],
    },
    {
      id: "lab2-website-security",
      title: "Lab 2: Website Security Solution",
      objective:
        "Deploy an Nginx web server on an Ubuntu 22.04 EC2 instance, obtain a free SSL/TLS certificate via Certbot, and harden the server with HTTP security headers. Measure improvement using Mozilla Observatory.",
      tasks: [
        "Launch an EC2 instance (Ubuntu 22.04 recommended). Open Security Group ports 80 (HTTP) and 443 (HTTPS)",
        "Update packages and install Nginx: sudo apt update -y && sudo apt install nginx -y",
        "Allow Nginx and SSH through the firewall: sudo ufw allow 'Nginx Full' && sudo ufw allow 'OpenSSH' && sudo ufw enable — verify with sudo ufw status",
        "Create web directory: sudo mkdir -p /var/www/your_domain/html — set ownership: sudo chown -R $USER:$USER /var/www/your_domain/html — set permissions: sudo chmod -R 755 /var/www/your_domain",
        "Create /var/www/your_domain/html/index.html with a basic HTML page to confirm the site is working",
        "Create an Nginx server block at /etc/nginx/sites-available/your_domain listening on port 80 with root pointing to your html directory",
        "Enable the site: sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/ — remove the default: sudo rm /etc/nginx/sites-enabled/default",
        "Test and restart Nginx: sudo nginx -t && sudo systemctl restart nginx — verify the site loads on port 80",
        "Scan the site with Mozilla Observatory and take a screenshot of the initial score (likely F)",
        "Install Certbot: sudo apt install -y certbot python3-certbot-nginx",
        "Obtain SSL certificate and enable HTTPS redirect: sudo certbot --nginx --redirect -d your_domain — verify the site auto-redirects to HTTPS",
        "Add security headers inside the server { } block in /etc/nginx/sites-available/your_domain:",
        "  add_header Content-Security-Policy \"default-src 'self';\";",
        '  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
        "  ssl_protocols TLSv1.2 TLSv1.3;",
        '  add_header X-Content-Type-Options "nosniff";',
        "  add_header X-Frame-Options SAMEORIGIN always;",
        "Restart Nginx: sudo systemctl restart nginx — re-scan with Observatory and screenshot the improved score",
      ],
      submissionInstructions: [
        "Screenshot 1: Mozilla Observatory score BEFORE adding security headers",
        "Screenshot 2: Mozilla Observatory score AFTER adding security headers",
        "Due: May 10, 2026 at 11:59 pm",
        "20 points — unlimited attempts, available May 4–15, 2026",
      ],
      whyItMatters:
        "Use Ubuntu 22.04 to avoid command compatibility issues — the guides assume Ubuntu 22. If you choose Ubuntu 24 you may need to find workarounds for various issues that arise.",
      resourceSections: [
        {
          title: "Guides",
          items: [
            "Nginx install on Ubuntu 22.04: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04",
            "Nginx + Let's Encrypt on Ubuntu 22.04: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04",
          ],
        },
        {
          title: "Scanner",
          items: [
            "Mozilla Observatory: https://developer.mozilla.org/en-US/observatory",
          ],
        },
      ],
    },
    {
      id: "lab2b-part1-aws-cli",
      title: "Lab 2b: Part 1 - AWS CLI",
      objective:
        "Install and configure the AWS CLI on a Linux machine using IAM programmatic credentials. Verify connectivity by listing S3 buckets.",
      tasks: [
        "Verify installed components: python3 --version | pip --version | aws --version",
        "If pip is missing: sudo yum install python3-pip -y",
        "Install AWS CLI: pip3 install awscli — then verify: aws --version",
        "In IAM Console: create a new IAM user, enable Programmatic access, attach AdministratorAccess policy, save the Access Key ID and Secret Access Key",
        "Run: aws configure — enter Access Key ID, Secret Access Key, default region (e.g. us-east-1), and output format (json)",
        "Verify connectivity: aws s3 ls — confirm your S3 buckets appear in the output",
      ],
      submissionInstructions: [
        "Screenshot showing the aws s3 ls command and the resulting S3 bucket list in the terminal",
        "Due: May 10, 2026 at 11:59 pm",
        "20 points — unlimited attempts, available May 4–15, 2026",
      ],
      whyItMatters:
        "Using an Amazon Linux AMI is recommended — it includes Python and many CLI dependencies by default. The AWS CLI can also be installed on any Linux distribution or your local machine.",
    },
    {
      id: "lab2b-part2-iam-cli",
      title: "Lab 2b: Part 2 - IAM via CLI",
      objective:
        "Manage AWS IAM resources entirely through the CLI — create a group, attach a policy, create a user, set a password, and add the user to the group. No AWS Console allowed.",
      tasks: [
        "1. Create an IAM group named Admins",
        "2. Attach the AdministratorAccess managed policy to the Admins group",
        "3. Create an IAM user named Bob",
        "4. Set a console password for Bob with a required reset on first login",
        "5. Add Bob to the Admins group",
        "Use ChatGPT, Claude, or the AWS CLI documentation to look up the correct syntax for each command and understand what it does",
        "Reflection: How did AI tools or AWS documentation help you find the correct CLI syntax and understand what each command does?",
      ],
      submissionInstructions: [
        "One screenshot per step (5 total) — each must clearly show the command executed and its terminal output",
        "Brief written reflection on how AI tools or documentation assisted you",
        "Due: May 10, 2026 at 11:59 pm",
        "20 points — unlimited attempts, available May 4–15, 2026",
      ],
      whyItMatters:
        "This lab must be completed in a live AWS account — it is not supported in the AWS Academy Learner Lab. Complete Part 1 (AWS CLI configuration) before starting this lab.",
      resourceSections: [
        {
          title: "Resources",
          items: [
            "AWS CLI IAM reference: https://docs.aws.amazon.com/cli/latest/reference/iam/",
          ],
        },
      ],
    },
  ],
} satisfies CS79DModuleBlueprint;
