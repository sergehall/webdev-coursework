import type { CS56ModuleBlueprint } from "../types";

export const cs56Module02CanvasSections = [
  {
    id: "inheritance",
    title: "Module: Inheritance",
    groups: [
      {
        items: [
          {
            title: "Inheritance: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        defaultCollapsed: true,
        items: [
          {
            title: "Lecture: Inheritance",
            type: "page",
          },
          {
            title: "Quiz - Inheritance",
            type: "quiz",
            dueLabel: "Jun 28",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Packages",
            type: "page",
          },
          {
            title: "Quiz - Packages",
            type: "quiz",
            dueLabel: "Jun 28",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Access Levels",
            type: "page",
          },
          {
            title: "Quiz - Access Levels",
            type: "quiz",
            dueLabel: "Jun 28",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Constructors & super Keyword",
            type: "page",
          },
          {
            title: "Quiz - Inheritance: Constructors & super",
            type: "quiz",
            dueLabel: "Jun 28",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Abstract Classes",
            type: "page",
          },
          {
            title: "Quiz - Abstract Classes",
            type: "quiz",
            dueLabel: "Jun 28",
            pointsLabel: "3 pts",
          },
          {
            title: "Reading: Inheritance",
            type: "page",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Discussion: Inheritance",
            type: "discussion",
            dueLabel: "Jun 25",
            pointsLabel: "5 pts",
            details: {
              intro:
                "Let's ensure that everyone of us understands this module's subject well and is confident applying inheritance when needed. Complete the following tasks:",
              steps: [
                {
                  label: "By Thursday",
                  text: "Submit a question on this module's subject.",
                  pointsLabel: "2 points",
                },
                {
                  label: "By Sunday",
                  text: "Select a question from one of your classmates and provide a thorough response. Ensure your answer is at least two sentences long and includes an example where relevant.",
                  pointsLabel: "3 points",
                },
              ],
            },
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
