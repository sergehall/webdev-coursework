import type { CS79DModuleBlueprint } from "../types";

export const cs79dModule03TextTasks = [
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
] satisfies NonNullable<CS79DModuleBlueprint["textTasks"]>;
