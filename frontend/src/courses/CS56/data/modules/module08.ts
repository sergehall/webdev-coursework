import type { CS56ModuleBlueprint } from "../types";

export const cs56Module08Blueprint = {
  id: 8,
  title: "Midterm",
  weekLabel: "Module 8",
  dateLabel: "July 13",
  overview:
    "This module is the midterm checkpoint for CS 56. It includes a module overview and the Midterm assessment.",
  topicLine: "Midterm overview and assessment",
  focusAreas: ["Midterm preparation", "Midterm assessment"],
  objectivesAligned: [
    "Review the course topics covered before the midterm",
    "Complete the Midterm assessment in Canvas",
  ],
  outcomeAlignment: [
    "Demonstrate understanding of the first half of CS 56",
    "Use the midterm as a checkpoint before continuing to later modules",
  ],
  syllabusContext: [
    "Module: Midterm includes a module overview and the Midterm assessment",
    "Visible Canvas deadline: Midterm due Jul 13",
  ],
  starterTasks: ["Review Module Overview", "Complete the Midterm"],
  artifacts: ["Midterm"],
  importantDates: ["Jul 13 - Midterm"],
  assessmentContext: ["Midterm - 100 pts"],
  milestone: "Midterm completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Review the midterm module overview and prepare for the assessment.",
    },
    {
      step: "Assessment",
      description: "Complete the Midterm assessment by Jul 13.",
    },
  ],
  readingHighlights: ["Module Overview"],
  canvasSections: [
    {
      id: "midterm",
      title: "Module: Midterm",
      groups: [
        {
          items: [
            {
              title: "Module Overview",
              type: "page",
              defaultCollapsed: true,
              prompt: {
                title: "Welcome to the Module: Midterm",
                sections: [
                  {
                    title: "Welcome",
                    paragraphs: [
                      "Welcome to the Module: Midterm.",
                      "Module link: https://online.smc.edu/courses/83001/modules/619513",
                      "This week will be the midterm. Here's more info:",
                      "Midterm link: https://online.smc.edu/courses/83001/quizzes/512238",
                    ],
                  },
                  {
                    title: "What?",
                    paragraphs: [
                      "The midterm will consist of 33 questions. It will cover all modules so far. The multiple choice part will be similar to the quizzes you have completed in the modules. The programming questions will be similar to the assignments you have completed in the modules.",
                      "You should also know what design patterns are and the three categories. In particular you should know the design patterns discussed: Singleton, Template Method, Iterator.",
                    ],
                  },
                  {
                    title: "How?",
                    paragraphs: [
                      "You need to answer all questions on Canvas without any other program open. Please be sure to close all notifications on your desktop. Leave the Canvas exam tab open at all times.",
                      "You may use notes or the book while taking the exam but be sure to not close the exam tab on your computer. Also, be mindful of the time available. Answer easier questions first and those that may result in a higher score.",
                    ],
                  },
                  {
                    title: "When?",
                    paragraphs: [
                      "Please reserve an uninterrupted block of 60 minutes to complete the midterm. You may take it at any time during the dates specified.",
                    ],
                  },
                  {
                    title: "Anything else?",
                    paragraphs: [
                      "No, the main focus for you will be to review topics and study for the midterm. There won't be any new material covered and no other tasks to be completed in this module.",
                      "Happy programming!",
                    ],
                  },
                ],
              },
            },
            {
              title: "Midterm",
              type: "assignment",
              dueLabel: "Jul 13",
              pointsLabel: "100 pts",
            },
          ],
        },
      ],
    },
  ],
  textTasks: [
    {
      id: "module-8-midterm",
      title: "Midterm",
      objective:
        "Complete the midterm checkpoint after reviewing the module overview.",
      tasks: ["Review Module Overview", "Complete the Midterm by Jul 13"],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 13",
        "100 points",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
