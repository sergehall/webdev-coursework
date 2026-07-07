import type { CS56ModuleBlueprint } from "../types";

export const cs56Module15CanvasSections = [
  {
    id: "final-exam",
    title: "Module: Final Exam",
    groups: [
      {
        items: [
          {
            title: "Module: Overview",
            type: "page",
          },
          {
            title: "Final Exam",
            type: "assignment",
            dueLabel: "Jul 31",
            pointsLabel: "98 pts",
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
