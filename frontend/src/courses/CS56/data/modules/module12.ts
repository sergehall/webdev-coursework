import type { CS56ModuleBlueprint } from "../types";

export const cs56Module12Blueprint = {
  id: 12,
  title: "Event Driven Programming with Java FX",
  weekLabel: "Module 12",
  dateLabel: "July 26",
  overview:
    "This module continues JavaFX with event-driven programming. It covers JavaFX event handling, adding audio to a JavaFX application, JavaFX Canvas, code examples, an assignment, and a group project.",
  topicLine:
    "JavaFX events, event handling, audio, Canvas, and JavaFX project work",
  focusAreas: [
    "JavaFX event handling",
    "Adding audio to JavaFX applications",
    "JavaFX Canvas",
    "FXML controller examples",
    "JavaFX assignment and group project",
  ],
  objectivesAligned: [
    "Explain event-driven programming in JavaFX",
    "Handle JavaFX events in application code",
    "Review adding audio to a JavaFX application",
    "Use or understand JavaFX Canvas examples",
    "Complete the JavaFX assignment and group project tasks",
  ],
  outcomeAlignment: [
    "Build interactive JavaFX applications",
    "Connect UI events to Java application behavior",
  ],
  syllabusContext: [
    "Module: Event Driven Programming with Java FX includes overview, lecture pages, quizzes, reading, code examples, an assignment, and a group project",
    "Visible Canvas deadlines: JavaFX events quizzes, Assignment: JavaFX, and Project: JavaFX + Event Handling (Group) due Jul 26",
  ],
  starterTasks: [
    "Review JavaFX Events: Overview",
    "Complete the event handling and audio lecture sequence",
    "Complete the JavaFX Events and Adding Audio quizzes",
    "Read Reading: JavaFX Event Handling",
    "Review JavaFX Canvas and the code examples",
    "Submit Assignment: JavaFX and Project: JavaFX + Event Handling (Group)",
  ],
  artifacts: [
    "Quiz: JavaFX Events",
    "Quiz: Adding Audio to a JavaFX application",
    "Reading: JavaFX Event Handling",
    "ClickApp.java",
    "ClickController.java",
    "click.fxml",
    "Project.zip",
    "CanvasApp.java",
    "Assignment: JavaFX",
    "Project: JavaFX + Event Handling (Group)",
  ],
  importantDates: [
    "Jul 26 - Quiz: JavaFX Events",
    "Jul 26 - Quiz: Adding Audio to a JavaFX application",
    "Jul 26 - Assignment: JavaFX",
    "Jul 26 - Project: JavaFX + Event Handling (Group)",
  ],
  assessmentContext: [
    "Quiz: JavaFX Events - 3 pts",
    "Quiz: Adding Audio to a JavaFX application - 3 pts",
    "Assignment: JavaFX - 16 pts",
    "Project: JavaFX + Event Handling (Group) - 20 pts",
  ],
  milestone:
    "JavaFX event handling quizzes, code examples, assignment, and group project completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the JavaFX Events overview and connect the module to event-driven UI behavior.",
    },
    {
      step: "Lecture",
      description:
        "Study JavaFX event handling, adding audio, event handling reading, and JavaFX Canvas.",
    },
    {
      step: "Examples",
      description:
        "Review ClickApp.java, ClickController.java, click.fxml, Project.zip, and CanvasApp.java.",
    },
    {
      step: "Tasks",
      description:
        "Complete Assignment: JavaFX and Project: JavaFX + Event Handling (Group) by Jul 26.",
    },
  ],
  readingHighlights: [
    "JavaFX Events: Overview",
    "Lecture: Event Handling in JavaFX",
    "Lecture: Adding Audio to a JavaFX application",
    "Reading: JavaFX Event Handling",
    "Lecture: JavaFX Canvas",
  ],
  canvasSections: [
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
  ],
  textTasks: [
    {
      id: "module-12-javafx-assignment",
      title: "Assignment: JavaFX",
      objective:
        "Complete the JavaFX event-driven programming assignment after reviewing events, audio, event handling, Canvas, and code examples.",
      tasks: [
        "Review JavaFX Events: Overview",
        "Complete the JavaFX events lecture and quiz sequence",
        "Review the JavaFX code examples",
        "Submit Assignment: JavaFX by Jul 26",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 26",
        "16 points",
        "Assignment content will be added separately",
      ],
    },
    {
      id: "module-12-javafx-event-handling-group-project",
      title: "Project: JavaFX + Event Handling (Group)",
      objective:
        "Complete the group project task for JavaFX and event handling.",
      tasks: [
        "Review the JavaFX event handling material",
        "Use the provided code examples as reference",
        "Submit Project: JavaFX + Event Handling (Group) by Jul 26",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 26",
        "20 points",
        "Project content will be added separately",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
