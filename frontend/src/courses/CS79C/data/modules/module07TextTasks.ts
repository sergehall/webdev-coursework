import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule07TextTasks = [
  {
    id: "classroom-engagement-slack-post",
    title: "Classroom Engagement - Slack Post",
    objective:
      "Discussion with your classmates is a vital part of learning and provides a richer class experience. You are encouraged to work together and help each other on lab assignments. In this course, you will participate in one class discussion in each module due by Saturday night. These discussions are a required part of the course.",
    tasks: [
      "Choose a discussion topic related to class assignment issues, comments, tips, recommendations, or questions.",
      "You may also post comments on the module topic, including any reading, lecture, or additional resources.",
      "You may share an AWS, cloud, or technology news article.",
      "You may share an AWS-related blog example such as https://aws.amazon.com/blogs/aws/.",
      "Post a screenshot of your Slack discussion entry to Canvas.",
    ],
    submissionInstructions: [
      "Your entry should be at least 2 to 5 sentences in length.",
      "Your entry can be a new entry or a reply to another student.",
      "Use professional grammar and punctuation in this college-level course in all correspondence.",
      'Avoid "text" or "Twitter speak" when corresponding.',
      "Post early and often during the week the discussion board is open.",
    ],
    whyItMattersHeading: "Tip",
    whyItMatters:
      "Read other students' entries because they often contain valuable suggestions for labs, projects, quizzes, and general course success.",
    resourceSections: [
      {
        title: "Discussion Guidelines",
        items: [
          "Your entry should be at least 2 to 5 sentences in length.",
          "Your entry can be a new entry or a reply to another student.",
          "Use professional grammar and punctuation in this college-level course in all correspondence.",
          'Please avoid "text" or "Twitter speak" when corresponding.',
          "The Slack workspace is supposed to represent an ongoing discussion related to the subject matter under consideration.",
          "Students should be posting early and often during the week the discussion board is open.",
        ],
      },
    ],
  },
  {
    id: "hello-lambda",
    title: "Lab 1: Hello Lambda",
    objective:
      "Create your first AWS Lambda function and understand the basic concepts of serverless computing, function invocation, and CloudWatch logging. This assignment introduces the Lambda fundamentals that every cloud developer should know.",
    tasks: [
      "Create a new Lambda function from scratch using Python 3.13 or the latest Python 3.x runtime.",
      "Replace the default code with a function that accepts an event, returns a personalized greeting, and logs invocation details.",
      "Deploy the function and configure memory and timeout settings.",
      "Run three different test cases and verify the function output.",
      "Open CloudWatch Logs and review the invocation logs.",
      "Create professional documentation with screenshots, test results, and a short reflection.",
    ],
    submissionInstructions: [
      "Submit a documentation file in PDF, Word, or Google Docs link format.",
      "Include all required sections and screenshots.",
      "Include a clear explanation of your chosen Lambda configuration settings.",
      "Make sure the document is well-formatted and professional before submitting to Canvas.",
    ],
    whyItMattersHeading: "Your First Serverless Function",
    whyItMatters:
      "This lab builds the foundation for serverless application development by teaching you how Lambda functions are created, configured, tested, logged, and documented.",
    resourceSections: [
      {
        title: "Part 1: Create Your Lambda Function",
        items: [
          "Open AWS Lambda from the AWS Console search bar.",
          'Click "Create function" and keep "Author from scratch" selected.',
          "Use the naming format student-[yourname]-hello-world.",
          "Select Python 3.13 or the latest Python 3.x runtime and keep x86_64 as the architecture.",
          "Create the function and capture a screenshot of the function page with the code editor visible.",
        ],
      },
      {
        title: "Part 2: Write and Deploy the Code",
        items: [
          "Open lambda_function.py and replace the default code with the provided Hello Lambda function.",
          "The function should accept a name parameter, return a greeting message, log the invocation time, and use World as the default name.",
          'Click "Deploy" and wait for the success banner.',
          "Capture a screenshot showing the deployed code.",
        ],
      },
      {
        title: "Understanding the Code",
        items: [
          "The code imports json and datetime.",
          "The lambda_handler function serves as the Lambda entry point.",
          "It records the current timestamp, logs the invocation, reads the name from the event, builds the response, and returns a JSON payload.",
        ],
      },
      {
        title: "Part 3: Configure Function Settings",
        items: [
          "Open the Configuration tab and go to General configuration.",
          "Set Memory to 512 MB.",
          "Set Timeout to 10 seconds.",
          "Explain in your documentation why these settings are a good balance of performance, cost, and function complexity.",
          "Capture a screenshot of the configuration page showing the memory and timeout values.",
        ],
      },
      {
        title: "Part 4: Test Your Function",
        items: [
          'Create TestWithName using the event { "name": "Sarah" } and verify the function returns a personalized greeting.',
          "Create TestWithoutName using the event {} and verify the function defaults to Hello, World.",
          'Create TestWithCompanyName using the event { "name": "Amazon Web Services" } and verify the greeting uses that full name.',
          "Capture a screenshot for each successful test execution.",
        ],
      },
      {
        title: "Part 5: View CloudWatch Logs",
        items: [
          "Open CloudWatch and navigate to Log groups.",
          "Find the log group /aws/lambda/student-[yourname]-hello-world.",
          "Open the most recent log stream.",
          "Review the START, print statements, END, and REPORT entries.",
          "Capture a screenshot of the CloudWatch Logs output from one of your test runs.",
        ],
      },
      {
        title: "Part 6: Create Your Documentation",
        items: [
          "Section 1: Lambda Function Details including function name, runtime, memory, timeout, and a 3 to 4 sentence explanation of those settings.",
          "Section 2: Testing Results including test name, input, expected output, actual output, and screenshot for each test case.",
          "Section 3: Screenshots including the function created page, deployed code, configuration settings, test executions, and CloudWatch Logs.",
          "Section 4: Lessons Learned with a 100 to 200 word reflection about serverless computing and real application use cases.",
        ],
      },
      {
        title: "Required Screenshots",
        items: [
          "Lambda function created page.",
          "Code deployed successfully.",
          "Configuration settings page.",
          "Three successful test executions.",
          "CloudWatch Logs for one invocation.",
        ],
      },
      {
        title: "Troubleshooting Common Issues",
        items: [
          'If you see "Permission denied" or "Access denied," verify you are logged into AWS and have Lambda permissions.',
          "If the function fails to execute, check CloudWatch Logs, confirm the code was copied correctly, verify Python indentation, and make sure you clicked Deploy.",
          "If you cannot find CloudWatch Logs, confirm the AWS Region, run the function at least once, and refresh the log group after a short wait.",
          "If the test times out, look for loops or missing return statements and increase the timeout only if necessary.",
        ],
      },
    ],
  },
  {
    id: "serverless-rest-api",
    title: "Lab 2: DynamoDB Add, Get and Delete Tasks",
    objective:
      "In this lab, you will create an AWS Lambda function that retrieves student records from a DynamoDB table when triggered by an API Gateway GET request. The full workflow connects Lambda, DynamoDB, and API Gateway so you can build a serverless REST API.",
    tasks: [
      "Create a DynamoDB table for tasks with taskId as the partition key.",
      "Create an IAM policy and Lambda execution role with DynamoDB and CloudWatch permissions.",
      "Create four Lambda functions for listing, retrieving, creating, and deleting tasks.",
      "Create a REST API in API Gateway with /tasks and /tasks/{id} resources.",
      "Connect each API method to the correct Lambda function and deploy the API.",
      "Test the API with curl or PowerShell.",
      "Review Lambda logs in CloudWatch.",
    ],
    submissionInstructions: [
      "Submit screenshots to Canvas for the DynamoDB table, API Gateway resources, curl or PowerShell tests, and CloudWatch logs.",
      "Make sure the screenshots clearly show successful API behavior for create, get all, get one, and delete operations.",
      "Capture at least one CloudWatch log group showing a successful Lambda invocation.",
    ],
    whyItMattersHeading: "Serverless REST API",
    whyItMatters:
      "This lab shows how Lambda, API Gateway, and DynamoDB work together to create a complete serverless application that can store, retrieve, and delete data without managing servers.",
    resourceSections: [
      {
        title: "AWS Reference",
        items: [
          "If you get stuck, use the official AWS tutorial: Tutorial: Using Lambda with API Gateway.",
        ],
      },
      {
        title: "Part 1: DynamoDB Setup",
        items: [
          "Create a DynamoDB table named student-[yourname]-tasks.",
          "Use taskId as the partition key with String type.",
          "Leave the Sort key completely empty.",
          "Use Default settings so the table uses on-demand capacity.",
          "Wait until the table status becomes Active and capture a screenshot of the table details.",
        ],
      },
      {
        title: "Part 2: IAM Roles Setup",
        items: [
          "Create a custom IAM policy that allows DynamoDB PutItem, GetItem, UpdateItem, DeleteItem, Scan, Query, and CloudWatch logging actions.",
          "Name the policy student-[yourname]-lambda-dynamodb-policy.",
          "Create a Lambda execution role named student-[yourname]-lambda-execution-role.",
          "Attach your custom DynamoDB policy to the role.",
          "Copy and save the role ARN because you will use it for all Lambda functions.",
        ],
      },
      {
        title: "Part 3: Lambda Functions",
        items: [
          "Create student-[yourname]-get-tasks using Python 3.13 and your execution role. Replace the default code with the provided GET /tasks handler and replace YOURNAME in the DynamoDB table name.",
          "Create student-[yourname]-get-task using Python 3.13 and your execution role. Use the provided GET /tasks/{id} handler and replace YOURNAME in the table name.",
          "Create student-[yourname]-create-task using Python 3.13 and your execution role. Use the provided POST /tasks handler and replace YOURNAME in the table name.",
          "Create student-[yourname]-delete-task using Python 3.13 and your execution role. Use the provided DELETE /tasks/{id} handler and replace YOURNAME in the table name.",
          "Deploy each function after pasting the code and run the provided test event.",
          "For the create-task function, save the returned taskId because you will need it for the get-task and delete-task tests.",
        ],
      },
      {
        title: "Function Testing Notes",
        items: [
          'Test get-tasks with { "httpMethod": "GET", "path": "/tasks" }.',
          'Test get-task with { "httpMethod": "GET", "path": "/tasks/123", "pathParameters": { "id": "test-task-1" } }. A 404 response is expected before tasks exist.',
          'Test create-task with { "httpMethod": "POST", "body": "{\\"title\\": \\"Complete Lambda assignment\\", \\"description\\": \\"Build REST API\\", \\"status\\": \\"in-progress\\"}" }.',
          'Test delete-task with { "httpMethod": "DELETE", "pathParameters": { "id": "PASTE-YOUR-ACTUAL-TASK-ID-HERE" } }.',
        ],
      },
      {
        title: "Part 4: API Gateway Setup",
        items: [
          "Create a Regional REST API named student-[yourname]-task-api.",
          "Create the /tasks resource and enable CORS.",
          "Add GET on /tasks pointing to student-[yourname]-get-tasks.",
          "Add POST on /tasks pointing to student-[yourname]-create-task.",
          "Create the /tasks/{id} resource and enable CORS.",
          "Add GET on /tasks/{id} pointing to student-[yourname]-get-task.",
          "Add DELETE on /tasks/{id} pointing to student-[yourname]-delete-task.",
          "Verify every method points to the correct Lambda before deployment.",
          "Deploy the API to a new stage named dev and copy the Invoke URL.",
        ],
      },
      {
        title: "Required Method Mapping",
        items: [
          "/tasks GET -> student-[yourname]-get-tasks",
          "/tasks POST -> student-[yourname]-create-task",
          "/tasks/{id} GET -> student-[yourname]-get-task",
          "/tasks/{id} DELETE -> student-[yourname]-delete-task",
        ],
      },
      {
        title: "Part 5: Testing Your API",
        items: [
          "Use curl on macOS or Linux, or curl.exe in PowerShell on Windows.",
          "Test four operations: create a task, get all tasks, get one task, and delete a task.",
          "Use the saved taskId from the create response when testing get one and delete.",
          "Make sure the API URL includes the deployed stage such as /dev.",
          "Capture screenshots of all successful API tests.",
        ],
      },
      {
        title: "Part 6: Viewing CloudWatch Logs",
        items: [
          "Open CloudWatch and navigate to Logs -> Log Management -> Log Groups.",
          "Find log groups such as /aws/lambda/student-[yourname]-get-tasks and /aws/lambda/student-[yourname]-create-task.",
          "Open a log stream to review the print statements from your Lambda code.",
          "Capture at least one screenshot showing successful CloudWatch log entries.",
        ],
      },
      {
        title: "Screenshots to Submit",
        items: [
          "DynamoDB table page showing the table with Active status.",
          "API Gateway Resources page showing /tasks and /tasks/{id} with all methods.",
          "Terminal or PowerShell output for Create, Get All, Get One, and Delete.",
          "At least one CloudWatch log group with invocation log entries.",
        ],
      },
      {
        title: "Troubleshooting Guide",
        items: [
          'If you get "Missing Authentication Token," verify the API URL includes /dev, confirm the path is correct, and redeploy the API.',
          "If you see a 500 error or a NoneType object has no attribute get, verify that every API method is mapped to the correct Lambda function.",
          "If Lambda times out, verify the DynamoDB table name matches exactly, the IAM role has DynamoDB permissions, and both services are in the same AWS region.",
          "If you see browser CORS errors, verify CORS was enabled on the resources and that the Lambda response includes Access-Control-Allow-Origin.",
          "If you cannot find CloudWatch log groups, open Logs -> Log Management -> Log Groups and make sure the Lambda function has been invoked at least once.",
          "If the DynamoDB table was created with an unintended sort key, delete it and recreate it because the key schema cannot be edited later.",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
