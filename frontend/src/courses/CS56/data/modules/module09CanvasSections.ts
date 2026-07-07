import type { CS56ModuleBlueprint } from "../types";

export const cs56Module09CanvasSections = [
  {
    id: "collections-data-structures",
    title: "Module: Collections (Data Structures)",
    groups: [
      {
        items: [
          {
            title: "Collections: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        items: [
          {
            title: "Lecture: The ArrayList Class",
            type: "page",
          },
          {
            title: "Quiz: ArrayList",
            type: "quiz",
            dueLabel: "Jul 19",
            pointsLabel: "4 pts",
          },
          {
            title: "Lecture: The LinkedList Class",
            type: "page",
          },
          {
            title: "Quiz: LinkedList",
            type: "quiz",
            dueLabel: "Jul 19",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: ArrayList & LinkedList Example",
            type: "page",
          },
          {
            title: "Lecture: Hashing",
            type: "page",
          },
          {
            title: "Lecture: The equals Methods",
            type: "page",
          },
          {
            title: "Quiz: Equals",
            type: "quiz",
            dueLabel: "Jul 19",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: The hashCode Method",
            type: "page",
          },
          {
            title: "Quiz: HashCode",
            type: "quiz",
            dueLabel: "Jul 19",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Set and HashSet",
            type: "page",
          },
          {
            title: "Lecture: Map and HashMap",
            type: "page",
          },
          {
            title: "Quiz: Set & Map",
            type: "quiz",
            dueLabel: "Jul 19",
            pointsLabel: "4 pts",
          },
          {
            title: "Lecture: HashCode & Equals Example",
            type: "page",
          },
          {
            title: "Reading: Collections",
            type: "page",
          },
        ],
      },
      {
        title: "Examples",
        items: [
          {
            title: "Employee.java",
            type: "attachment",
          },
          {
            title: "ListExample.java",
            type: "attachment",
          },
          {
            title: "SetExample.java",
            type: "attachment",
          },
          {
            title: "MapExample.java",
            type: "attachment",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Assignment: Collections",
            type: "assignment",
            dueLabel: "Jul 19",
            pointsLabel: "10 pts",
            defaultCollapsed: true,
            description:
              "Assignment details will be filled in separately after the module shell matches Canvas.",
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
