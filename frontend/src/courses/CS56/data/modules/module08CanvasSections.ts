import type { CS56ModuleBlueprint } from "../types";

export const cs56Module08CanvasSections = [
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
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
