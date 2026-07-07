import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule03TextTasks = [
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
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
