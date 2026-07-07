import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule04TextTasks = [
  {
    id: "classroom-engagement-slack-post-landing-a-job",
    title: "Classroom Engagement - Slack Post Landing a Job",
    objective:
      "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
    tasks: [
      "Research how to land a dream tech job in the real world.",
      "Post two job-hunting tips to the class Slack workspace.",
      "Possible topics include job searching, resume building, writing a cover letter, interviewing tips for tech jobs, and writing a thank-you letter.",
      "Reply to a comment posted by another student.",
    ],
    submissionInstructions: [
      "Post 1: Share two job-hunting tips.",
      "Post 2: Reply to another student's post.",
    ],
    whyItMattersHeading: "Weekly Topic",
    whyItMatters:
      "Landing a Job. Companies are not handing out strong jobs automatically, so developing practical job-hunting skills is part of building a successful tech career.",
  },
  {
    id: "lab-1-application-load-balancer-auto-scaling-web-interface",
    title:
      "Lab 1 Application Load Balancer & Auto Scaling Web Servers via Web Interface",
    objective:
      "In this lab, you will use the AWS Web Console to create a highly available and scalable web application. You will set up an Application Load Balancer with an Auto Scaling Group and a Launch Template to provision Amazon Linux 2023 instances running Apache web services.",
    tasks: [
      "Create a Launch Template named WebServerTemplate using Amazon Linux 2023, a t3.micro or t2.micro instance type, a key pair, a security group that allows HTTP and SSH, and the provided user data script.",
      "Create an internet-facing Application Load Balancer named WebApp-ALB in at least two Availability Zones and configure a target group that uses HTTP on port 80 with /index.html as the health check path.",
      "Create an Auto Scaling Group named WebApp-ASG using the launch template, attach it to the existing load balancer target group, enable ELB health checks, and set desired capacity to 2 with a maximum of 4.",
      "Test the deployment by waiting for healthy targets, copying the ALB DNS name, opening the site in a browser, refreshing to observe load balancing behavior, and opening /phpinfo.php.",
      "Optionally test auto scaling with CPU load and observe scale-out activity in CloudWatch and the ASG activity tab.",
    ],
    submissionInstructions: [
      "Capture screenshots of the launch template summary showing the AMI, instance type, and user data.",
      "Capture screenshots of the Application Load Balancer details page, target group health, Auto Scaling Group dashboard, the web application in the browser, and the phpinfo.php page.",
      "If you created resources only for this lab, clean them up afterward to avoid ongoing AWS charges.",
    ],
    whyItMattersHeading: "Key Learning Outcomes",
    whyItMatters:
      "This lab demonstrates how to configure launch templates, Application Load Balancers, and Auto Scaling Groups to build a highly available, scalable, and production-style AWS web application architecture.",
    resourceSections: [
      {
        title: "Prerequisites",
        items: [
          "This lab can be completed in AWS Academy Learner Lab or a personal AWS account.",
          "Basic familiarity with EC2, VPC, and IAM is recommended.",
          "Basic web server concepts and Linux administration knowledge are helpful.",
          "Access to the AWS Management Console with the required permissions is needed.",
        ],
      },
      {
        title: "Step 1: Create a Launch Template",
        items: [
          "Go to the EC2 Dashboard, open Launch Templates, and click Create Launch Template.",
          "Launch Template Name: WebServerTemplate",
          "Template Version Description: Amazon Linux 2023 LAMP Stack",
          "AMI: Amazon Linux 2023 (latest version)",
          "Instance Type: t3.micro or t2.micro",
          "Select or create a key pair.",
          "Select or create a security group allowing HTTP (80) and SSH (22).",
        ],
      },
      {
        title: "User Data Script",
        items: [
          "#!/bin/bash",
          "# Amazon Linux 2023 LAMP Stack Installation Script",
          "sudo dnf update -y",
          "sudo dnf install -y httpd",
          "sudo systemctl enable httpd",
          "sudo systemctl start httpd",
          "sudo dnf install -y mariadb-server",
          "sudo systemctl enable mariadb",
          "sudo systemctl start mariadb",
          "sudo dnf install -y php php-mysqlnd php-fpm php-gd php-xml php-mbstring php-json php-opcache",
          "sudo systemctl enable php-fpm",
          "sudo systemctl start php-fpm",
          "sudo usermod -a -G apache ec2-user",
          "sudo chown -R ec2-user:apache /var/www",
          "sudo chmod 2775 /var/www",
          "sudo find /var/www -type d -exec chmod 2775 {} \\;",
          "sudo find /var/www -type f -exec chmod 0664 {} \\;",
          'echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php',
          'echo "Welcome to My First Auto Scaling Group" > /var/www/html/index.html',
          "sudo systemctl restart httpd",
        ],
      },
      {
        title: "Step 2: Create an Application Load Balancer",
        items: [
          "In the EC2 Dashboard, open Load Balancers and click Create Load Balancer.",
          "Select Application Load Balancer.",
          "Name: WebApp-ALB",
          "Scheme: Internet-facing",
          "IP address type: IPv4",
          "Choose your default or custom VPC.",
          "Select at least two Availability Zones and their public subnets.",
          "Allow HTTP (80) from 0.0.0.0/0 and optionally HTTPS (443) from 0.0.0.0/0.",
          "Target Type: Instances",
          "Protocol: HTTP",
          "Port: 80",
          "Health Check Path: /index.html",
          "Health Check Interval: 30 seconds",
          "Healthy Threshold: 2",
          "Unhealthy Threshold: 5",
        ],
      },
      {
        title: "Step 3: Create an Auto Scaling Group",
        items: [
          "Open Auto Scaling Groups and click Create Auto Scaling Group.",
          "Auto Scaling Group Name: WebApp-ASG",
          "Launch Template: WebServerTemplate",
          "Version: Latest",
          "Choose the same VPC and subnets used for the ALB.",
          "Attach the existing target group created with the ALB.",
          "Enable ELB health checks.",
          "Health Check Grace Period: 300 seconds",
          "Desired Capacity: 2",
          "Minimum Capacity: 2",
          "Maximum Capacity: 4",
          "Optional scaling policy: Target tracking based on Average CPU Utilization at 70%.",
        ],
      },
      {
        title: "Step 4: Test Your Deployment",
        items: [
          "Allow 5 to 10 minutes for instances to launch and pass health checks.",
          'Verify that 2 instances are running and show as "InService".',
          'Confirm all targets show as "Healthy" in the ALB target group.',
          "Copy the ALB DNS name from the load balancer details page.",
          "Open the DNS name in a browser.",
          "Refresh multiple times to observe different instance IDs.",
          "Append /phpinfo.php to the URL and verify the PHP page loads.",
        ],
      },
      {
        title: "Expected Results",
        items: [
          'The web page displays "Auto Scaling Web Server" with instance information.',
          "Different instance IDs appear when refreshing the page.",
          "The PHP info page loads successfully with PHP 8.x configuration.",
          'All health checks show as "Healthy" in the AWS Console.',
        ],
      },
      {
        title: "Step 5: Test Auto Scaling (Optional)",
        items: [
          "Connect to one of your instances through SSH.",
          "Install the stress tool: sudo dnf install -y stress",
          "Run a CPU stress test: stress --cpu 2 --timeout 600s",
          "Monitor CloudWatch metrics for CPU utilization.",
          "Observe Auto Scaling events in the ASG Activity tab.",
          "Watch for new instances to launch when CPU exceeds 70%.",
        ],
      },
      {
        title: "Architecture Benefits Demonstrated",
        items: [
          "High availability through Multi-AZ deployment.",
          "Scalability through automatic scaling based on demand.",
          "Traffic distribution across healthy instances.",
          "Health monitoring with automatic replacement of failed instances.",
          "Cost optimization by using only the resources needed.",
          "Improved security by placing access behind a load balancer.",
        ],
      },
      {
        title: "Cleanup Instructions",
        items: [
          "Set the Auto Scaling Group desired capacity to 0, then delete the ASG.",
          "Delete the Application Load Balancer and its target groups.",
          "Delete the launch template.",
          "Delete any custom security groups created for the lab.",
          "Delete any key pairs created specifically for the lab.",
        ],
      },
      {
        title: "Troubleshooting Tips",
        items: [
          "If instances are not healthy, confirm the security groups allow HTTP traffic on port 80.",
          "If the web page is not loading, verify the user data script completed successfully by checking the instance logs.",
          "If the load balancer times out, confirm the health check path is /index.html.",
          "If Auto Scaling does not react, verify the CloudWatch alarms and scaling configuration.",
          "If SSH access is denied, make sure the key pair is correct and the security group allows SSH.",
        ],
      },
    ],
  },
  {
    id: "lab-2-application-load-balancer-auto-scaling-group-cli",
    title: "Lab 2 Application Load Balancer with Auto Scaling Group via CLI",
    objective:
      "In this lab, you will use the AWS Command Line Interface to deploy an Application Load Balancer with a Target Group and an Auto Scaling Group. You will configure a Launch Template to provision Amazon Linux 2023 instances running Apache Web Server and reinforce cloud automation skills with industry-standard infrastructure-as-code practices.",
    tasks: [
      "Configure the AWS CLI and set the default region to us-east-1 using the learner profile.",
      "Retrieve the latest Amazon Linux 2023 AMI ID and gather your VPC, subnet, and security group information.",
      "Create a Launch Template that provisions Amazon Linux 2023 instances with Apache, PHP, and MariaDB.",
      "Create a Target Group, an Application Load Balancer, and a Listener that forwards traffic to the target group.",
      "Create an Auto Scaling Group that uses the Launch Template and attaches instances to the Target Group.",
      "Verify the ALB DNS name, Auto Scaling Group instance health, and Target Group health before testing the web application in the browser.",
      "Clean up all AWS resources in the required order to avoid dependency errors.",
    ],
    submissionInstructions: [
      "Capture terminal screenshots showing successful CLI command execution.",
      "Capture AWS Console screenshots showing the Auto Scaling Group, Target Group health, and ALB configuration.",
      "Capture a browser screenshot showing the web application with the server hostname and timestamp.",
    ],
    whyItMattersHeading: "Why ALB Instead of Classic ELB?",
    whyItMatters:
      "AWS has deprecated Classic Load Balancers. The Application Load Balancer is the current standard for HTTP and HTTPS workloads, operates at Layer 7, supports content-based routing, and integrates with Target Groups for flexible health checks and traffic management. These are the patterns used in production environments and covered on the AWS Solutions Architect Associate exam.",
    resourceSections: [
      {
        title: "Prerequisites",
        items: [
          "This lab can be completed in either the AWS Learner Lab or a personal AWS account.",
          "It is recommended to complete this lab in the Learner Lab environment.",
          "Ensure the AWS CLI is installed and configured on your system.",
          "Basic understanding of AWS CLI commands and JSON formatting is recommended.",
        ],
      },
      {
        title: "Important Notes",
        items: [
          "Classic Load Balancers are deprecated, so this lab uses an Application Load Balancer.",
          "Launch Configurations are deprecated, so use Launch Templates instead.",
          "Use --profile=learner for AWS CLI commands in AWS Academy.",
          "Update AWS CLI credentials before starting because Learner Lab credentials expire every 4 hours.",
          "Amazon Linux 2023 uses dnf instead of yum.",
          "Replace placeholder values such as sg-xxxxxxxx, subnet-xxxxxxxx, and vpc-xxxxxxxx with your real resource IDs.",
        ],
      },
      {
        title: "Architecture Overview",
        items: [
          "Internet",
          "Application Load Balancer (ALB)",
          "Target Group (HTTP:80)",
          "EC2 instances across multiple Availability Zones managed by an Auto Scaling Group",
          "The ALB distributes HTTP traffic to instances registered in the Target Group, and the ASG automatically registers new instances and replaces unhealthy ones.",
        ],
      },
      {
        title: "Step 1: Configure AWS CLI and Set Your Default Region",
        items: ["aws configure set region us-east-1 --profile=learner"],
      },
      {
        title: "Step 2: Get the Latest Amazon Linux 2023 AMI ID",
        items: [
          'aws ec2 describe-images --owners amazon --filters "Name=name,Values=al2023-ami-*" "Name=architecture,Values=x86_64" "Name=virtualization-type,Values=hvm" --query \'Images | sort_by(@, &CreationDate) | [-1].ImageId\' --output text --profile=learner',
          "Save the returned AMI ID for the launch template step.",
        ],
      },
      {
        title: "Step 3: Gather VPC, Subnet, and Security Group Information",
        items: [
          'Get the default VPC ID: aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text --profile=learner',
          'Get subnet IDs in at least two Availability Zones: aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-xxxxxxxx" --query "Subnets[*].[SubnetId,AvailabilityZone]" --output table --profile=learner',
          'Get the security group ID: aws ec2 describe-security-groups --filters "Name=vpc-id,Values=vpc-xxxxxxxx" --query "SecurityGroups[*].[GroupId,GroupName]" --output table --profile=learner',
          "If needed, allow inbound HTTP traffic on port 80: aws ec2 authorize-security-group-ingress --group-id sg-xxxxxxxx --protocol tcp --port 80 --cidr 0.0.0.0/0 --profile=learner",
        ],
      },
      {
        title: "Step 4: Create a Launch Template",
        items: [
          "Windows users can store the UserData script in a PowerShell variable, Base64-encode it, retrieve the latest AL2023 AMI ID, build a JSON launch template payload, and run aws ec2 create-launch-template.",
          "macOS/Linux users can retrieve the latest AL2023 AMI ID, Base64-encode the UserData script with a heredoc, and run aws ec2 create-launch-template with the resulting JSON payload.",
          "Launch Template Name: MyWebServerTemplate",
          "Version Description: Amazon Linux 2023 Version",
          "Instance Type: t3.micro",
          "KeyName: MyKeyPair",
          "SecurityGroupIds: sg-xxxxxxxx",
        ],
      },
      {
        title: "Launch Template UserData",
        items: [
          "#!/bin/bash",
          "dnf update -y",
          "dnf install -y httpd php php-mysqlnd mariadb105",
          "systemctl start httpd",
          "systemctl enable httpd",
          "usermod -a -G apache ec2-user",
          "chown -R ec2-user:apache /var/www",
          "chmod 2775 /var/www",
          "find /var/www -type d -exec chmod 2775 {} \\;",
          "find /var/www -type f -exec chmod 0664 {} \\;",
          'echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php',
          'echo "<h1>Welcome to My First Auto Scaling Group</h1>" > /var/www/html/index.html',
          'echo "<p>Server: $(hostname)</p>" >> /var/www/html/index.html',
          'echo "<p>Timestamp: $(date)</p>" >> /var/www/html/index.html',
          "systemctl start php-fpm",
          "systemctl enable php-fpm",
        ],
      },
      {
        title: "Step 5: Create a Target Group",
        items: [
          "aws elbv2 create-target-group --name MyWebServer-TG --protocol HTTP --port 80 --vpc-id vpc-xxxxxxxx --target-type instance --health-check-protocol HTTP --health-check-path /index.html --health-check-interval-seconds 30 --health-check-timeout-seconds 5 --healthy-threshold-count 2 --unhealthy-threshold-count 3 --profile=learner",
          "Save the TargetGroupArn value for the next steps.",
        ],
      },
      {
        title: "Step 6: Create an Application Load Balancer",
        items: [
          "aws elbv2 create-load-balancer --name MyWebServer-ALB --subnets subnet-xxxxxxxx subnet-yyyyyyyy --security-groups sg-xxxxxxxx --scheme internet-facing --type application --ip-address-type ipv4 --profile=learner",
          "Save the LoadBalancerArn value.",
          "Create the listener: aws elbv2 create-listener --load-balancer-arn <LoadBalancerArn> --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=<TargetGroupArn> --profile=learner",
          "An ALB consists of the load balancer, the listener, and the target group.",
        ],
      },
      {
        title: "Step 7: Create an Auto Scaling Group",
        items: [
          'aws autoscaling create-auto-scaling-group --auto-scaling-group-name MyAutoScalingGroup --launch-template "LaunchTemplateName=MyWebServerTemplate,Version=$Latest" --min-size 2 --max-size 4 --desired-capacity 2 --vpc-zone-identifier "subnet-xxxxxxxx,subnet-yyyyyyyy" --target-group-arns "<TargetGroupArn>" --health-check-type ELB --health-check-grace-period 300 --profile=learner',
          "With ALB, the ASG attaches to the Target Group ARN rather than directly to the load balancer.",
        ],
      },
      {
        title: "Step 8: Verify and Test Your Setup",
        items: [
          'Get the ALB DNS name: aws elbv2 describe-load-balancers --names MyWebServer-ALB --query "LoadBalancers[0].DNSName" --output text --profile=learner',
          'Check ASG status: aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names MyAutoScalingGroup --query "AutoScalingGroups[0].Instances[*].[InstanceId,AvailabilityZone,LifecycleState,HealthStatus]" --output table --profile=learner',
          "Check target health: aws elbv2 describe-target-health --target-group-arn <TargetGroupArn> --profile=learner",
          "Wait until all targets show healthy before testing in the browser.",
        ],
      },
      {
        title: "Step 9: Test the Web Application",
        items: [
          "Open the ALB DNS name in a browser.",
          "Verify the page displays the Auto Scaling message, server hostname, and timestamp.",
          "Refresh multiple times to see different server hostnames.",
          "Test the PHP page by appending /phpinfo.php to the URL.",
        ],
      },
      {
        title: "Cleanup",
        items: [
          "Delete the Auto Scaling Group with --force-delete.",
          "Describe and delete the ALB listener before deleting the ALB.",
          "Delete the Application Load Balancer.",
          "Delete the Target Group after the ALB is removed.",
          "Delete the Launch Template.",
        ],
      },
      {
        title: "Common Mistakes & Troubleshooting",
        items: [
          "If targets show unhealthy, confirm the security group allows HTTP port 80 and Apache is running.",
          "If you get a two-subnet/AZ error, select subnets from different Availability Zones.",
          "If the launch template or target group name already exists, delete the old resource or use a new name.",
          "If credentials are expired, refresh the Learner Lab credentials and update the learner profile.",
          "If the browser shows a 504 timeout, wait a few minutes for instances to boot and pass health checks.",
          "If there is no default VPC, list all VPCs and use the correct VPC ID.",
          "If the UserData script did not run, check cloud-init logs and verify the script encoding.",
          "If the Target Group cannot be deleted, remove the ALB listener first.",
          "If the same hostname appears on every refresh, verify both targets are healthy and bypass browser cache.",
        ],
      },
      {
        title: "Required Screenshots for Submission",
        items: [
          "CLI commands executing successfully in the terminal.",
          "AWS Console view of the Auto Scaling Group with active instances.",
          "Target Group targets showing healthy status.",
          "ALB details page with listener and target group configuration.",
          "Browser screenshot of the web application with server hostname and timestamp.",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
