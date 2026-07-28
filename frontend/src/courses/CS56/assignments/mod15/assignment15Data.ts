export const assignment15Links = {
  demoPage: "https://sergehall.github.io/javafx-event-handling-group-project/",
  demoVideo:
    "https://sergehall.github.io/javafx-event-handling-group-project/assets/javafx-web-desktop-demo.mp4",
  demoPoster:
    "https://sergehall.github.io/javafx-event-handling-group-project/assets/javafx-web-desktop-demo-poster.jpg",
  javafxRepository:
    "https://github.com/sergehall/javafx-event-handling-group-project",
  javaStartRepository: "https://github.com/sergehall/java-start",
} as const;

export type ProjectShowcase = {
  readonly label: string;
  readonly title: string;
  readonly repositoryLabel: string;
  readonly repositoryUrl: string;
  readonly summary: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly highlights: readonly string[];
  readonly note: string;
};

export const projectShowcases = [
  {
    label: "Primary assignment deliverable",
    title: "JavaFX Event Handling Group Project",
    repositoryLabel: "sergehall/javafx-event-handling-group-project",
    repositoryUrl: assignment15Links.javafxRepository,
    summary: "A native JavaFX task list with a full-stack companion.",
    description:
      "The required desktop application uses JavaFX, FXML, and event-driven controls to add, complete, and remove tasks. The same repository extends the exercise with a synchronized web client, a Spring Boot API, and PostgreSQL persistence.",
    stack: [
      "Java 21",
      "JavaFX",
      "FXML",
      "Spring Boot",
      "PostgreSQL",
      "Next.js",
    ],
    highlights: [
      "Application entry point extends JavaFX Application",
      "FXML BorderPane and VBox layout with accessible controls",
      "Add Task button and Enter-key event handling",
      "ListView rows with CheckBox and Remove actions",
      "Immediate UI refresh after every task mutation",
      "Foundation and Advanced paths share one task model",
    ],
    note: "This repository directly satisfies the JavaFX assignment and its screen-recording requirement.",
  },
  {
    label: "Second Java project",
    title: "Java Start",
    repositoryLabel: "sergehall/java-start",
    repositoryUrl: assignment15Links.javaStartRepository,
    summary: "A secure full-stack Java learning platform.",
    description:
      "Java Start continues the learning path from a small IntelliJ starter into a layered Spring Boot application with authentication, account security, course progress, automated tests, and a Next.js frontend.",
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "JPA",
      "Flyway",
      "PostgreSQL",
    ],
    highlights: [
      "Email verification and password recovery flows",
      "JWT authentication with revocable server-side sessions",
      "Optional TOTP multi-factor authentication",
      "Layered domain, application, and infrastructure packages",
      "PostgreSQL migrations plus H2 and Testcontainers tests",
      "CI gates for formatting, linting, tests, and builds",
    ],
    note: "This companion project demonstrates broader Java and backend engineering beyond the required desktop task list.",
  },
] as const satisfies readonly ProjectShowcase[];

export type RubricEvidence = {
  readonly criterion: string;
  readonly points: number;
  readonly evidence: string;
  readonly source: string;
};

export const rubricEvidence = [
  {
    criterion: "JavaFX Frame",
    points: 1,
    evidence:
      "EventHandlingApp extends Application, creates the Scene, and displays the Stage.",
    source: "EventHandlingApp.java",
  },
  {
    criterion: "Add Task Button",
    points: 1,
    evidence:
      "The FXML composer includes a labeled text field and default Add Task button.",
    source: "event-handling-view.fxml",
  },
  {
    criterion: "List Control",
    points: 1,
    evidence:
      "A typed ListView<TaskItem> is backed by an observable list and custom cells.",
    source: "EventHandlingController.java",
  },
  {
    criterion: "Check Task Control",
    points: 1,
    evidence:
      "Each Foundation task row exposes an accessible completion CheckBox.",
    source: "EventHandlingController.java",
  },
  {
    criterion: "Remove Button",
    points: 1,
    evidence:
      "Every task cell includes a Remove button with a task-specific accessible name.",
    source: "EventHandlingController.java",
  },
  {
    criterion: "Layout",
    points: 1,
    evidence:
      "FXML uses BorderPane, VBox, and HBox containers for a responsive desktop layout.",
    source: "event-handling-view.fxml",
  },
  {
    criterion: "Add Task Functionality",
    points: 3,
    evidence:
      "Button clicks and Enter validate input, create the task, clear the field, and refresh the view.",
    source: "handleAddTask",
  },
  {
    criterion: "Remove Task Functionality",
    points: 1,
    evidence:
      "Remove events update the in-memory model or persisted API record, then refresh the list.",
    source: "TaskCell.handleRemove",
  },
  {
    criterion: "Listing Tasks",
    points: 2,
    evidence:
      "Model snapshots populate an observable list, with filtering available in the Advanced path.",
    source: "refreshView",
  },
  {
    criterion: "Check Task Complete",
    points: 2,
    evidence:
      "Checkbox events update completion status and immediately recalculate task totals.",
    source: "handleCompletionChange",
  },
  {
    criterion: "Formatting",
    points: 2,
    evidence:
      "FXML, CSS, focused Java classes, documentation, Checkstyle, and Spotless keep the project readable.",
    source: "desktop-app + config",
  },
  {
    criterion: "Screen Recording",
    points: 4,
    evidence:
      "The 6:09 recording shows the web labs, the JavaFX desktop UI, and task interactions.",
    source: "Hosted MP4 demo",
  },
] as const satisfies readonly RubricEvidence[];

export const demoChapters = [
  { time: "00:00", title: "Local stack", detail: "Start shared services" },
  {
    time: "01:00",
    title: "Foundation web lab",
    detail: "Core event handling",
  },
  {
    time: "02:40",
    title: "Advanced web lab",
    detail: "Priority and workflow",
  },
  {
    time: "04:12",
    title: "JavaFX desktop",
    detail: "Native task controls",
  },
  {
    time: "05:42",
    title: "Project closeout",
    detail: "Repository and workflow",
  },
] as const;

export const assignmentRequirements = [
  "Create a main class that extends JavaFX Application.",
  "Arrange the text field, buttons, and task list with VBox, BorderPane, or another layout manager.",
  "Add new tasks through the Add Task button.",
  "Mark tasks completed through a checkbox.",
  "Remove tasks through a per-item Remove button.",
  "Keep the UI synchronized after add, complete, and remove actions.",
  "Document the Java code clearly and keep the required solution near the requested 200–300 line scope.",
] as const;

export const submissionChecklist = [
  "Show the IDE with the JavaFX source file visible.",
  "Run the project and show the native JavaFX interface.",
  "Demonstrate adding, completing, and removing tasks.",
  "Add the screen recording to the project.",
  "Create a clean ZIP of the required project without generated files or secrets.",
] as const;
