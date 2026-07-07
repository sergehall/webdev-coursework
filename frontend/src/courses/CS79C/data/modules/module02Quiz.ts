import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule02Quiz = {
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
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
