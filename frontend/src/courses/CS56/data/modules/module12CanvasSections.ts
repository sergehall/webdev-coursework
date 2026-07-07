import type { CS56ModuleBlueprint } from "../types";

export const cs56Module12CanvasSections = [
  {
    id: "event-driven-programming-with-java-fx",
    title: "Module: Event Driven Programming with Java FX",
    groups: [
      {
        items: [
          {
            title: "JavaFX Events: Overview",
            type: "page",
          },
        ],
      },
      {
        title: "Lecture",
        items: [
          {
            title: "Lecture: Event Handling in JavaFX",
            type: "page",
          },
          {
            title: "Quiz: JavaFX Events",
            type: "quiz",
            dueLabel: "Jul 26",
            pointsLabel: "3 pts",
          },
          {
            title: "Lecture: Adding Audio to a JavaFX application",
            type: "page",
          },
          {
            title: "Quiz: Adding Audio to a JavaFX application",
            type: "quiz",
            dueLabel: "Jul 26",
            pointsLabel: "3 pts",
          },
          {
            title: "Reading: JavaFX Event Handling",
            type: "page",
          },
          {
            title: "Lecture: JavaFX Canvas",
            type: "page",
          },
        ],
      },
      {
        title: "Code Example",
        items: [
          {
            title: "ClickApp.java",
            type: "attachment",
          },
          {
            title: "ClickController.java",
            type: "attachment",
          },
          {
            title: "click.fxml",
            type: "attachment",
          },
          {
            title: "Project.zip",
            type: "attachment",
          },
          {
            title: "CanvasApp.java",
            type: "attachment",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Assignment: JavaFX",
            type: "assignment",
            dueLabel: "Jul 26",
            pointsLabel: "16 pts",
            defaultCollapsed: true,
            description:
              "Assignment details will be filled in separately after the module shell matches Canvas.",
          },
          {
            title: "Project: JavaFX + Event Handling (Group)",
            type: "assignment",
            dueLabel: "Jul 26",
            pointsLabel: "20 pts",
            defaultCollapsed: true,
            description:
              "Project details will be filled in separately after the module shell matches Canvas.",
          },
        ],
      },
    ],
  },
] satisfies NonNullable<CS56ModuleBlueprint["canvasSections"]>;
