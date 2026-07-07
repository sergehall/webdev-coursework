import type { CS56ModuleBlueprint } from "../types";

export const cs56Module11CanvasSections = [
  {
    id: "javafx",
    title: "Module: JavaFX",
    groups: [
      {
        items: [
          {
            title: "JavaFX: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        items: [
          {
            title: "Lecture: How to Create a JavaFX Project",
            type: "page",
          },
          {
            title: "Lecture: Intro to JavaFX",
            type: "page",
          },
          {
            title: "Quiz: JavaFX",
            type: "quiz",
            dueLabel: "Jul 26",
            pointsLabel: "4 pts",
          },
          {
            title: "Lecture: Layout and UI Controls using Java Code",
            type: "page",
          },
          {
            title: "Quiz: JavaFX Layout and UI Controls",
            type: "quiz",
            dueLabel: "Jul 26",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Layout using FXML",
            type: "page",
          },
          {
            title: "Quiz: Layout using FXML",
            type: "quiz",
            dueLabel: "Jul 26",
            pointsLabel: "3 pts",
          },
          {
            title: "Reading: Intro to JavaFX",
            type: "page",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Discussion: JavaFX",
            type: "discussion",
            dueLabel: "Jul 23",
            pointsLabel: "5 pts",
            defaultCollapsed: true,
            description:
              "Discussion details will be filled in separately after the module shell matches Canvas.",
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
