import type { CS56ModuleBlueprint } from "../types";

import { cs56Module12CanvasSections } from "./module12CanvasSections";
import { cs56Module12TextTasks } from "./module12TextTasks";

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
  canvasSections: cs56Module12CanvasSections,
  textTasks: cs56Module12TextTasks,
} satisfies CS56ModuleBlueprint;
