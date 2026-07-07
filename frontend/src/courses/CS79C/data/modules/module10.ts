import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule10Quiz } from "./module10Quiz";
import { cs79cModule10TextTasks } from "./module10TextTasks";

export const cs79cModule10Blueprint = {
  id: 10,
  title: "Final Project: AWS Portfolio Project",
  weekLabel: "Final Deliverable",
  dateLabel: "April 6–12, 2026",
  overview:
    "This final project demonstrates your mastery of AWS computing services and serves as a portfolio piece for your job search. You will design, deploy, and document a cloud architecture that solves a real-world problem using AWS computing services covered in this course.",
  topicLine: "Capstone focus: AWS Portfolio Project",
  focusAreas: [
    "Cloud architecture design for a real-world problem",
    "Hands-on use of AWS computing services from the course",
    "Portfolio-ready documentation and project presentation",
  ],
  objectivesAligned: [
    "Apply cloud architecture best practices to solve real-world problems.",
    "Demonstrate hands-on proficiency with AWS computing services.",
    "Document technical decisions and tradeoffs like a cloud engineer.",
    "Create a portfolio-ready project for job applications and interviews.",
    "Practice explaining technical concepts to both technical and non-technical audiences.",
  ],
  outcomeAlignment: [
    "Brings together the course's AWS compute, deployment, and architecture concepts into one final deliverable that can support both grading and portfolio use.",
  ],
  syllabusContext: [
    "The final project is designed as both a course capstone and a portfolio piece for the job search process.",
    "It should demonstrate mastery of AWS computing services covered throughout the course in one coherent solution.",
    "The final exam remains a separate component, so the project should be documented clearly as its own deliverable.",
  ],
  starterTasks: [
    "Define the real-world problem your cloud architecture will solve.",
    "Select the AWS computing services that best fit the project requirements.",
    "Plan the deployment, documentation, screenshots, and architecture explanation.",
  ],
  artifacts: [
    "Portfolio-ready project brief",
    "Architecture summary and technical decision notes",
    "Deployment evidence, screenshots, and final reflection",
  ],
  importantDates: [
    "Project due date: December 21, 2025",
    "Finals week: April 6–12, 2026",
    "Session ends: April 12, 2026",
    "Faculty grades due: April 19, 2026",
  ],
  assessmentContext: [
    "Final Project — 15% of total course grade",
    "Final Exam — 15% of total course grade and separate from this capstone module",
    "This project should demonstrate both technical implementation and clear communication of design choices.",
  ],
  moduleSummary: [
    {
      step: "1",
      description: "Choose a real-world problem and define the project scope.",
    },
    {
      step: "2",
      description:
        "Design and deploy a cloud architecture using AWS computing services from the course.",
    },
    {
      step: "3",
      description:
        "Document the architecture, technical decisions, tradeoffs, and final deployment evidence.",
    },
    {
      step: "4",
      description:
        "Prepare the project as a portfolio-ready deliverable for job applications and interviews.",
    },
  ],
  textTasks: cs79cModule10TextTasks,
  quiz: cs79cModule10Quiz,
  milestone:
    "Deliver a clean, portfolio-ready AWS project that shows practical cloud architecture skill and strong documentation.",
  isFinalProject: true,
} satisfies CS79CModuleBlueprint;
