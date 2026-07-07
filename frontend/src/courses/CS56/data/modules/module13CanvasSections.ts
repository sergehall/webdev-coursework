import type { CS56ModuleBlueprint } from "../types";

export const cs56Module13CanvasSections = [
  {
    id: "multithreading",
    title: "Module: Multithreading",
    groups: [
      {
        items: [
          {
            title: "Multithreading: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        items: [
          {
            title: "Lecture: Multithreading",
            type: "page",
          },
          {
            title: "Quiz: Multithreading",
            type: "quiz",
            dueLabel: "Jul 31",
            pointsLabel: "4 pts",
          },
          {
            title: "Lecture: Synchronization",
            type: "page",
          },
          {
            title: "Quiz: Synchronization",
            type: "quiz",
            dueLabel: "Jul 31",
            pointsLabel: "3 pts",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Assignment: Multithreading",
            type: "assignment",
            dueLabel: "Jul 31",
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
