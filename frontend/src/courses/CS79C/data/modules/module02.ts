import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule02Blueprint = {
  id: 2,
  title: "AWS Storage Volumes",
  weekLabel: "Week 2",
  dateLabel: "February 23, 2026",
  overview:
    "Module 2 focuses on AWS storage solutions, including Amazon S3, Amazon EFS, and Amazon EBS. Students install and configure the AWS Command Line Interface to manage storage services, complete readings on RAID and AWS storage tools, participate in class discussion, listen to lecture demos, and complete hands-on labs plus a quiz.",
  topicLine: "Scheduled topic: AWS Storage Volumes",
  focusAreas: [
    "Amazon S3, Amazon EFS, and Amazon EBS storage workflows",
    "AWS CLI setup for cloud storage management",
    "Storage architecture and RAID-related reading",
  ],
  objectivesAligned: [
    "Describe the architectural approach used by AWS.",
    "Describe important design considerations for scalable cloud applications.",
  ],
  outcomeAlignment: [
    "Builds practical experience with AWS storage services that support later compute, deployment, and architecture decisions.",
  ],
  syllabusContext: [
    "This module introduces the core storage services that pair with AWS compute workflows throughout the course.",
    "Students are expected to connect lecture material, CLI setup, readings, lab work, and class discussion into one storage-focused module flow.",
  ],
  starterTasks: [
    "Install and configure the AWS Command Line Interface",
    "Read the assigned material on RAID, S3, EFS, and EBS",
    "Capture notes and screenshots from the storage labs and lecture demos",
  ],
  artifacts: [
    "AWS CLI setup confirmation",
    "Storage lab notes for S3 and EFS",
    "Quiz prep notes and discussion reflection",
  ],
  importantDates: ["Class census day: February 28, 2026"],
  assessmentContext: [
    "This module includes labs, Slack discussion participation, lecture demos, and a quiz to check storage-service understanding.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Install and configure the AWS Command Line Tool.",
    },
    {
      step: "2",
      description: "Complete required reading on RAID, S3, EFS, and EBS.",
    },
    {
      step: "3",
      description: "Engage in-class discussion: Slack Job Post Assignment.",
    },
    {
      step: "4",
      description: "Listen to course lectures with lab demos.",
    },
    {
      step: "5",
      description: "Complete Lab 1 S3, Lab 2 EFS, and the quiz.",
    },
  ],
  textTasks: [
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
  ],
  quiz: {
    title: "AWS Storage Volumes",
    questions: [
      {
        id: 1,
        question:
          "In what ways does Amazon Simple Storage Service (Amazon S3) object storage differ from block and file storage? (Choose 2 answers)",
        options: [
          "Objects are stored in buckets.",
          "Amazon S3 stores data in fixed size blocks.",
          "Objects contain both data and metadata.",
          "Objects can be any size.",
        ],
        multiple: true,
      },
      {
        id: 2,
        question:
          "Which of the following are not appropriate use cases for Amazon Simple Storage Service (Amazon S3)? (Choose 2 answers)",
        options: [
          "Storing an Elastic Block Storage volume",
          "Storing web content",
          "Storing a relational database",
          "Storing logs for analytics",
        ],
        multiple: true,
      },
      {
        id: 3,
        question:
          "What are some of the key characteristics of Amazon Simple Storage Service (Amazon S3)? (Choose 2 answers)",
        options: [
          "You must pre-allocate the storage in a bucket.",
          "All objects have a URL.",
          "Objects are world-readable by default.",
          "Amazon S3 can store unlimited amounts of data.",
        ],
        multiple: true,
      },
      {
        id: 4,
        question:
          "Based on the following Amazon Simple Storage Service (Amazon S3) URL, which one of the following statements is correct? https://bucket1.abc.com.s3.amazonaws.com/folderx/myfile.doc",
        options: [
          'The object "myfile.doc" is stored in the folder "folderx" in the bucket "bucket1.abc.com."',
          'The object "myfile.doc" is stored in the bucket "bucket1.abc.com."',
          'The object "myfile.doc" is stored in the bucket "bucket1."',
          'The object "folderx/myfile.doc" is stored in the bucket "bucket1.abc.com."',
        ],
      },
      {
        id: 5,
        question:
          "Your company has 100TB of financial records that need to be stored for seven years by law. Experience has shown that any record more than one-year old is unlikely to be accessed. Which of the following storage plans meets these needs in the most cost efficient manner?",
        options: [
          "Store the data on Amazon Simple Storage Service (Amazon S3) with lifecycle policies that change the storage class to Amazon Glacier after one year and delete the object after seven years.",
          "Store the data in Amazon DynamoDB and run daily scripts to delete data older than seven years.",
          "Store the data in Amazon Elastic MapReduce (Amazon EMR).",
          "Store the data on Amazon Elastic Block Store (Amazon EBS) volumes attached to t2.micro instances.",
        ],
      },
      {
        id: 6,
        question:
          "Amazon Glacier is well-suited to data that is which of the following? (Choose 2 answers)",
        options: [
          "Frequently erased within 30 days.",
          "Immediately available when needed.",
          "Infrequently or rarely accessed.",
          "Available after a three- to five-hour restore period.",
        ],
        multiple: true,
      },
      {
        id: 7,
        question: "Which of the following are true of instance stores?",
        options: [
          "Well suited for databases.",
          "Automatic backups.",
          "Data is not lost when the instance stops.",
          "Data is lost when the instance stops.",
        ],
      },
      {
        id: 8,
        question:
          "Which of the following are features of Amazon Elastic Block Store (Amazon EBS)? (Choose 2 answers)",
        options: [
          "Amazon EBS volumes can be encrypted.",
          "Amazon EBS data is automatically backed up to tape.",
          "Data on an Amazon EBS volume is lost when the attached instance is stopped.",
          "Data stored on Amazon EBS is automatically replicated within an Availability Zone.",
        ],
        multiple: true,
      },
      {
        id: 9,
        question:
          "You need a common file system for your application that is shared between more than one Amazon EC2 instance.",
        options: ["S3 IA", "EBS", "EFS", "S3"],
      },
      {
        id: 10,
        question:
          "You require cloud storage for data archiving and long-term backup. Waiting for 3 - 5 hours to access data is acceptable.",
        options: ["Glacier", "EBS", "S3", "EFS"],
      },
      {
        id: 11,
        question:
          "Which of the following is the correct S3 URL format? (Select 2)",
        options: [
          "https://my-bucket.s3.us.amazonaws.com/puppy.png",
          "https://my-bucket.s3.us-west-2.amazonaws.com/puppy.png",
          "https://amazonaws.com/mybucket/puppy.jpg",
          "https://s3.us-west-2.amazonaws.com/mybucket/puppy.jpg",
        ],
        multiple: true,
      },
      {
        id: 12,
        question:
          "EFS requires which TCP protocol to mount to a server instance?",
        options: ["TCP/IP", "NFS", "mount", "SMB"],
      },
      {
        id: 13,
        question: "EFS can cross Availability Zones within a single Region.",
        options: ["True", "False"],
      },
      {
        id: 14,
        question:
          "Amazon EBS provides block-level storage volumes that you can attach to a single running EC2 server instance.",
        options: ["True", "False"],
      },
      {
        id: 15,
        question: "S3 is highly durable with 99.999999999 durability.",
        options: ["True", "False"],
      },
      {
        id: 16,
        question: "S3 is highly available with 99.999999999% availability.",
        options: ["True", "False"],
      },
      {
        id: 17,
        question:
          "EBS ST1 volumes can be a boot volume. Meaning the OS (Windows or Linux) can be installed on a Throughput Optimized HDD (ST1) volume.",
        options: ["True", "False"],
      },
      {
        id: 18,
        question:
          "Instance Storage volumes are not persistent through EC2 server instance reboot, stops, terminations, or hardware failure.",
        options: ["True", "False"],
      },
      {
        id: 19,
        question:
          "Magnetic (Standard) volumes are backed by magnetic drives and are suited for workloads where data is accessed infrequently.",
        options: ["True", "False"],
      },
      {
        id: 20,
        question: "S3 bucket names must be globally unique.",
        options: ["True", "False"],
      },
      {
        id: 21,
        question: "What is the unique characteristic of RAID 6? (Choose one)",
        options: ["One parity", "Striping", "Mirroring", "Two parity"],
      },
      {
        id: 22,
        question:
          "Which of the following RAID levels provides maximum usable disk space?",
        options: ["RAID 4", "RAID 5", "RAID 1", "RAID 0"],
      },
      {
        id: 23,
        question:
          "An array of disks is more likely to fail compared to a single disk. How is it that RAID arrays still manage to provide more data protection compared to a single disk?",
        options: [
          "Using dedicated hardware",
          "Using either mirroring or striping",
          "Using either mirroring or parity",
          "Using better quality disks",
        ],
      },
      {
        id: 24,
        question:
          "What is the main purpose of data governance in cloud computing?",
        options: [
          "To design web-based applications",
          "To manage cloud infrastructure costs",
          "To ensure secure, compliant, and organized handling of data",
          "To create user-friendly interfaces",
        ],
      },
      {
        id: 25,
        question:
          "Which of the following AWS storage options is best for shared file access?",
        options: ["Amazon EBS", "Amazon EFS", "Amazon Glacier", "Amazon S3"],
      },
    ],
    answers: [
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 1,
        correctAnswer: [0, 2],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 2,
        correctAnswer: [0, 2],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 3,
        correctAnswer: [1, 3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 4,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 5,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 6,
        correctAnswer: [2, 3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 7,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 8,
        correctAnswer: [0, 3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 9,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 10,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 11,
        correctAnswer: [1, 3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 12,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 13,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 14,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 15,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 16,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 17,
        correctAnswer: [1],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 18,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 19,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 20,
        correctAnswer: [0],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 21,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 22,
        correctAnswer: [3],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 23,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 24,
        correctAnswer: [2],
      },
      {
        quizId: "CS79CModule2AwsStorageVolumesQuiz",
        questionId: 25,
        correctAnswer: [1],
      },
    ],
  },
  milestone:
    "Complete Module 2 with AWS storage foundations, CLI setup, and hands-on lab evidence ready for the next module.",
} satisfies CS79CModuleBlueprint;
