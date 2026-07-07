import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule02TextTasks = [
  {
    id: "classroom-engagement-job-slack-post",
    title: "Classroom Engagement - Job Slack Post",
    objective:
      "Discussion with your classmates is a vital part of learning and provides a richer class experience. In this course, you will participate in one class discussion in each module, due by Saturday night. These discussions are a required part of the course.",
    tasks: [
      "Find and share a cloud computing job description from a reputable company.",
      "Include the job title, company name, job description, job requirements, salary information if available, and a link to the job post.",
      "Write a 2–5 sentence reflection explaining what interests you about the position, which skills or tools you hope to learn in this course, and any terms or qualifications you want to explore further.",
      "Do not worry if you do not meet every listed requirement because many job postings describe ideal qualifications rather than entry-level readiness.",
    ],
    submissionInstructions: [
      "Your discussion post must be at least 2–5 sentences.",
      "Comment on one other student's post.",
      "Use professional grammar and punctuation appropriate for a college-level course.",
      'Avoid text-speak or abbreviations such as "u" for "you".',
      "Post a screenshot of your Slack discussion entry to Canvas.",
      "Post early and often during the discussion period.",
    ],
    whyItMattersHeading: "Note",
    whyItMatters:
      "Introductory courses, personal projects, and curiosity are strong first steps toward cloud roles. This assignment helps connect course concepts to real career paths and the skills employers actually request.",
    resourceSections: [
      {
        title: "Useful Keywords for Job Search",
        items: [
          "Cloud Computing Intern",
          "Cloud Support Associate",
          "AWS Internship",
          "Cloud Engineer (Entry-Level)",
          "Junior DevOps Engineer",
          "Technical Support - Cloud Services",
          "IT Support with AWS",
          "Cloud Operations Assistant",
          "Cloud Administrator (Trainee)",
          "Associate Cloud Developer",
        ],
      },
      {
        title: "Recommended Job Sites",
        items: [
          "LinkedIn Jobs",
          "Indeed",
          "Monster",
          "SimplyHired",
          "Glassdoor",
          "AWS Careers",
          "Google Careers",
          "Microsoft Careers",
        ],
      },
    ],
  },
  {
    id: "s3-cli-lab-1",
    title: "S3 CLI Lab 1: Create and Manage AWS S3 Bucket via CLI",
    objective:
      "In this lab, you will use the AWS CLI to create and manage an S3 bucket. You will complete a series of tasks and capture screenshots as proof of completion.",
    tasks: [
      "Create an S3 bucket using the AWS CLI.",
      "Use the bucket naming format yourFirstNameYourLastName.com, for example johnsmith.com.",
      "Upload two files from your local system to the newly created S3 bucket.",
      "List all S3 buckets in your AWS account.",
      "List the contents of your bucket to show the files stored in yourFirstNameYourLastName.com.",
      "Delete both uploaded files from the S3 bucket.",
      "Delete the S3 bucket after confirming that it is empty.",
    ],
    submissionInstructions: [
      "Submit a Word document containing labeled screenshots for each step.",
      "Make sure each screenshot clearly shows the command executed and its output.",
      "Take a screenshot for each step and label it appropriately.",
    ],
    whyItMattersHeading: "Reminder",
    whyItMatters:
      "Refer to the video lecture for a lab demonstration if needed.",
  },
  {
    id: "efs-console-lab-2",
    title: "EFS Console Lab 2: Create EFS via AWS Console",
    objective:
      "In this lab, you will create and configure an Amazon Elastic File System (EFS). You will follow the updated AWS guidelines to set up EFS in a single Availability Zone and capture screenshots as proof of completion.",
    tasks: [
      "Create a new security group that allows inbound NFS traffic on port 2049.",
      "Set the inbound rule to allow traffic from all IPs (0.0.0.0/0) or restrict it to specific trusted sources, then take a screenshot of the configured security group.",
      "Navigate to the EFS console and create a new file system.",
      "Select a single Availability Zone for deployment, configure storage settings using current best practices, and take a screenshot of the EFS creation summary.",
      "Attach a mount target to the EFS within the same Availability Zone, ensure the correct security group is associated, and take a screenshot showing the mount target details.",
      "Create an access point for controlled access to the EFS if desired, and take a screenshot of the access point configuration.",
      "Obtain the NFS mount point information from the EFS console and take a screenshot showing the mount point details.",
      "Optionally launch an EC2 instance running Amazon Linux or Ubuntu in the same VPC with access to the EFS security group, install the NFS client, mount the EFS volume, verify it with df -h, and take a screenshot of the mounted EFS volume.",
    ],
    submissionInstructions: [
      "Submit a Word document containing labeled screenshots for each step.",
      "Make sure each screenshot clearly shows the configuration and execution process.",
      "Ensure all screenshots are clear and properly labeled in your submission.",
    ],
    whyItMattersHeading: "Reference",
    whyItMatters:
      "Refer to the AWS User Guide, pages 11 through 13, for detailed instructions while completing the lab.",
    resourceSections: [
      {
        title: "Mount Command",
        items: [
          "sudo mount -t nfs4 :/ /mnt/efs",
          "Verify the mount with df -h",
        ],
      },
      {
        title: "Optional Linux Client Setup",
        items: [
          "sudo yum install -y nfs-utils",
          "sudo apt-get install -y nfs-common",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
