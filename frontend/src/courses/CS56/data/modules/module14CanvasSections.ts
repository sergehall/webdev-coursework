import type { CS56ModuleBlueprint } from "../types";

export const cs56Module14CanvasSections = [
  {
    id: "database-with-jdbc",
    title: "Database with JDBC",
    groups: [
      {
        items: [
          {
            title: "Database: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        items: [
          {
            title: "Lecture: Intro to relational Databases",
            type: "page",
          },
          {
            title: "Lecture: How to install MySQL",
            type: "page",
          },
          {
            title: "Lecture: Structured Query Language (SQL)",
            type: "page",
          },
          {
            title: "Quiz: Databases",
            type: "quiz",
            dueLabel: "Jul 31",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: How to connect to MySQL",
            type: "page",
          },
          {
            title: "Project Setup with MySQL - NetBeans",
            type: "page",
          },
        ],
      },
      {
        title: "Code Example",
        items: [
          {
            title: "Database.java",
            type: "attachment",
          },
          {
            title: "Employee.java",
            type: "attachment",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Discussion: Database",
            type: "discussion",
            dueLabel: "Jul 31",
            pointsLabel: "3 pts",
            defaultCollapsed: true,
            description:
              "Discussion details will be filled in separately after the module shell matches Canvas.",
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
