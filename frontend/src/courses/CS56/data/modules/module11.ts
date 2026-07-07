import type { CS56ModuleBlueprint } from "../types";

export const cs56Module11Blueprint = {
  id: 11,
  title: "JavaFX",
  weekLabel: "Module 11",
  dateLabel: "July 26",
  overview:
    "This module introduces JavaFX for building Java desktop applications. It covers creating JavaFX projects, JavaFX basics, layout and UI controls in Java code, layout using FXML, reading, quizzes, and a discussion task.",
  topicLine: "JavaFX projects, UI controls, layouts, and FXML",
  focusAreas: [
    "Creating JavaFX projects",
    "Intro to JavaFX",
    "Layout and UI controls using Java code",
    "Layout using FXML",
    "JavaFX reading and discussion",
  ],
  objectivesAligned: [
    "Create or understand the structure of a JavaFX project",
    "Explain basic JavaFX application concepts",
    "Use Java code to arrange layout and UI controls",
    "Recognize how FXML separates layout from Java logic",
    "Participate in the JavaFX discussion",
  ],
  outcomeAlignment: [
    "Build toward Java desktop GUI applications",
    "Connect Java programming concepts to user interface development",
  ],
  syllabusContext: [
    "Module: JavaFX includes overview, lecture pages, quizzes, reading, and a discussion task",
    "Visible Canvas deadlines: JavaFX quizzes due Jul 26 and Discussion: JavaFX due Jul 23",
  ],
  starterTasks: [
    "Review JavaFX: Overview",
    "Complete the JavaFX lecture sequence",
    "Complete the JavaFX, JavaFX Layout and UI Controls, and Layout using FXML quizzes",
    "Read Reading: Intro to JavaFX",
    "Post on Discussion: JavaFX",
  ],
  artifacts: [
    "Quiz: JavaFX",
    "Quiz: JavaFX Layout and UI Controls",
    "Quiz: Layout using FXML",
    "Reading: Intro to JavaFX",
    "Discussion: JavaFX",
  ],
  importantDates: [
    "Jul 23 - Discussion: JavaFX",
    "Jul 26 - Quiz: JavaFX",
    "Jul 26 - Quiz: JavaFX Layout and UI Controls",
    "Jul 26 - Quiz: Layout using FXML",
  ],
  assessmentContext: [
    "Quiz: JavaFX - 4 pts",
    "Quiz: JavaFX Layout and UI Controls - 3 pts",
    "Quiz: Layout using FXML - 3 pts",
    "Discussion: JavaFX - 5 pts",
  ],
  milestone: "JavaFX lectures, quizzes, reading, and discussion completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the JavaFX overview and connect the module to desktop GUI development.",
    },
    {
      step: "Lecture",
      description:
        "Study JavaFX project setup, JavaFX basics, UI controls, layouts, and FXML.",
    },
    {
      step: "Reading",
      description: "Review Reading: Intro to JavaFX.",
    },
    {
      step: "Tasks",
      description:
        "Complete the quizzes and Discussion: JavaFX by the Canvas due dates.",
    },
  ],
  readingHighlights: [
    "JavaFX: Overview",
    "Lecture: How to Create a JavaFX Project",
    "Lecture: Intro to JavaFX",
    "Lecture: Layout and UI Controls using Java Code",
    "Lecture: Layout using FXML",
    "Reading: Intro to JavaFX",
  ],
  canvasSections: [
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
  ],
  textTasks: [
    {
      id: "module-11-javafx",
      title: "Discussion: JavaFX",
      objective:
        "Complete the JavaFX module after reviewing project setup, JavaFX basics, layout, UI controls, FXML, and the intro reading.",
      tasks: [
        "Review JavaFX: Overview",
        "Complete the JavaFX lecture and quiz sequence",
        "Read Reading: Intro to JavaFX",
        "Post on Discussion: JavaFX by Jul 23",
      ],
      submissionInstructions: [
        "Submit through SMC Canvas",
        "Due: Jul 23",
        "5 points",
        "Discussion content will be added separately",
      ],
    },
  ],
} satisfies CS56ModuleBlueprint;
