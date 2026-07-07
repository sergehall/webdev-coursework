import type { CS79CModuleBlueprint } from "../types";

export const cs79cModule01TextTasks = [
  {
    id: "slack-workspace",
    title: "Module 1 Lab 2: Join the CS 79C Slack Workspace",
    objective:
      "To ensure all students are connected to the course communication platform, Slack, and can effectively communicate with the instructor and classmates.",
    tasks: [
      "Sign up for Slack and create an account using your preferred email address, preferably your SMC email.",
      "Verify your email and complete your Slack profile setup.",
      "Join the CS 79C Slack workspace using the course invite link.",
      "Sign in with your newly created Slack account or use an existing one if you already have Slack.",
      "Set your display name to your full name as it appears in Canvas for easy identification.",
      "Post a quick hello introducing yourself with your name, your major and goals for this course, and any fun fact or cloud tech experience.",
    ],
    submissionInstructions: [
      "Submit a screenshot showing your name visible in the CS 79C Slack workspace.",
      'Make sure the workspace name "smccs79cspring2026" is visible in the Slack interface.',
      "Include your Slack post introducing yourself.",
    ],
    whyItMattersHeading: "Why Slack?",
    whyItMatters:
      "Slack will be our primary communication tool for questions, discussions, and announcements throughout the semester in addition to Canvas announcements. Ensuring you are connected early will set you up for success in this course.",
  },
] satisfies NonNullable<CS79CModuleBlueprint["textTasks"]>;
