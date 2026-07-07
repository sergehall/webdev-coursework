import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule08TextTasks = [
  {
    id: "elastic-beanstalk-lab",
    title: "Elastic Beanstalk",
    objective:
      "In this lab, you will learn how to deploy, update, and terminate a Node.js web application using AWS Elastic Beanstalk through the AWS Management Console.",
    tasks: [
      "Deploy the sample Node.js application using the Node.js platform in Elastic Beanstalk.",
      "Download the update package from the AWS Example site, edit index.html, and add your full name after the word Congratulations.",
      "Upload the updated ZIP package to Elastic Beanstalk using Upload and Deploy.",
      "Open the application URL in a browser and verify your name appears in the app.",
      "Terminate the environment to clean up AWS resources after testing.",
    ],
    submissionInstructions: [
      "Screenshot 1: Web app running before the update.",
      "Screenshot 2: Web app showing your name after the update.",
      "Screenshot 3: Elastic Beanstalk dashboard with your environment before termination.",
    ],
    whyItMattersHeading: "Tip",
    whyItMatters:
      "Refer to the Video Demo on Canvas and the AWS documentation for step-by-step help if you need a visual walkthrough while deploying and updating the application.",
    resourceSections: [
      {
        title: "Step 1: Deploy the Sample Node.js App",
        items: [
          "Log in to the AWS Management Console.",
          "Open Elastic Beanstalk.",
          "Create a new application environment using the Node.js platform.",
          "Select the sample Node.js application provided by AWS.",
          "Launch the application and verify that it runs successfully.",
        ],
      },
      {
        title: "Step 2: Update the Application",
        items: [
          "Download the update package from https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html.",
          "Extract the package contents and open index.html.",
          'Add your full name after the word "Congratulations".',
          "Recompress the folder into a ZIP file if needed.",
          'Upload the new version to Elastic Beanstalk using "Upload and Deploy".',
        ],
      },
      {
        title: "Step 3: Verify the Update",
        items: [
          "Open the web application in your browser using the provided environment URL.",
          "Confirm that your full name is visible in the application.",
        ],
      },
      {
        title: "Step 4: Terminate the Environment",
        items: [
          "Return to the Elastic Beanstalk console.",
          "Terminate the environment to clean up AWS resources and avoid unnecessary charges.",
        ],
      },
      {
        title: "AWS Reference",
        items: [
          "AWS Example documentation: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html",
        ],
      },
    ],
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
