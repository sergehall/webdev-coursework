export type CS56ModuleBlueprint = {
  id: number;
  title: string;
  weekLabel: string;
  dateLabel: string;
  overview: string;
  topicLine: string;
  focusAreas: string[];
  objectivesAligned: string[];
  outcomeAlignment: string[];
  syllabusContext: string[];
  starterTasks: string[];
  artifacts: string[];
  importantDates: string[];
  assessmentContext: string[];
  milestone: string;
  moduleSummary: Array<{
    step: string;
    description: string;
  }>;
  readingHighlights: string[];
  canvasSections?: Array<{
    id: string;
    title: string;
    groups: Array<{
      title?: string;
      defaultCollapsed?: boolean;
      items: Array<{
        title: string;
        type: "page" | "quiz" | "discussion" | "assignment";
        dueLabel?: string;
        pointsLabel?: string;
        description?: string;
        previewFiles?: Array<{
          fileUrl: string;
          filename: string;
          buttonLabel?: string;
        }>;
      }>;
    }>;
  }>;
  textTasks: Array<{
    id: string;
    title: string;
    objective: string;
    tasks: string[];
    submissionInstructions: string[];
    resourceSections?: Array<{
      title: string;
      items: string[];
    }>;
  }>;
};

export const cs56CourseReference = {
  courseTitle: "CS 56 - Advanced Java Programming",
  sessionLabel: "Syllabus import pending",
  instructor: "Instructor from syllabus",
  instructorEmail: "Email from syllabus",
  officeHours: "Office hours from syllabus",
  canvasUrl: "online.smc.edu",
  requiredReadings: [
    "Course syllabus: add the official CS 56 syllabus file when available",
    "Oracle Java Tutorials: https://docs.oracle.com/javase/tutorial/",
    "Java API documentation: https://docs.oracle.com/en/java/",
  ],
  gradingBreakdown: [
    "Assignments - add exact syllabus weighting",
    "Quizzes or exams - add exact syllabus weighting",
    "Projects and participation - add exact syllabus weighting",
  ],
  importantSessionDates: [
    "Start date - import from syllabus",
    "Midterm checkpoint - import from syllabus",
    "Final project or exam - import from syllabus",
  ],
} as const;

const commonSubmissionInstructions = [
  "Submit through SMC Canvas unless the syllabus says otherwise",
  "Attach source files, project notes, and screenshots where applicable",
  "Replace this placeholder with the exact due date and point value from the syllabus",
];

export const cs56ModuleBlueprints: CS56ModuleBlueprint[] = [
  {
    id: 1,
    title: "Getting Started and Java Review",
    weekLabel: "Module 1",
    dateLabel: "June 23-28",
    overview:
      "This opening module combines the course orientation materials with a focused Java review. It starts with policies, guidelines, and welcome tasks, then moves into setup, lectures, quizzes, reading, and the Java Review assignment.",
    topicLine:
      "Getting Started, setup, Java basics review, and first assignment",
    focusAreas: [
      "Course policies and guidelines",
      "JDK and Maven setup",
      "Java project creation",
      "Basic programs, arithmetic, conditions, loops, methods, arrays, and OOP",
      "Project structure and source organization",
      "Canvas submission expectations",
    ],
    objectivesAligned: [
      "Prepare a working Java development environment",
      "Review classes, objects, inheritance, interfaces, and packages",
      "Document code and submissions consistently",
    ],
    outcomeAlignment: [
      "Build a reliable starting point for advanced Java assignments",
      "Connect prior CS 55 skills to larger Java API work",
    ],
    syllabusContext: [
      "Getting Started includes welcome, course policy, grading, integrity, resources, and well-being materials",
      "Module: Java Review includes Setup, Lecture, and Tasks blocks",
      "Visible Canvas deadlines: Self-Check Quiz due Jun 23; Java Review quizzes, welcome discussion, and assignment due Jun 28",
    ],
    starterTasks: [
      "Review Home Page - Welcome",
      "Read course policies and guidelines",
      "Install JDK and Maven",
      "Create a Java project",
      "Complete Java Review lectures, quizzes, reading, and assignment",
    ],
    artifacts: [
      "Self-Check Quiz",
      "Discussion: Welcome",
      "Java Review quizzes",
      "Assignment: Java Review",
    ],
    importantDates: [
      "Jun 23 - Self-Check Quiz",
      "Jun 28 - Discussion: Welcome",
      "Jun 28 - Java Review quizzes",
      "Jun 28 - Assignment: Java Review",
    ],
    assessmentContext: [
      "Self-Check Quiz - 4 pts",
      "Discussion: Welcome - 4 pts",
      "Quiz - Basic Program - 4 pts",
      "Quiz - Arithmetic - 3 pts",
      "Quiz - Conditions - 3 pts",
      "Quiz - Nested Conditions - 3 pts",
      "Quiz - Switch - 3 pts",
      "Quiz - Loops - 5 pts",
      "Quiz - Methods - 3 pts",
      "Quiz - Arrays - 3 pts",
      "Quiz - OOP - 4 pts",
      "Assignment: Java Review - 20 pts",
    ],
    milestone: "Getting Started completed and Java Review assignment submitted",
    moduleSummary: [
      {
        step: "Getting Started",
        description:
          "Review the welcome page, policies, grading, integrity, resources, and well-being materials.",
      },
      {
        step: "Setup",
        description:
          "Install the Java Development Kit, install Maven, and create a Java project.",
      },
      {
        step: "Lecture",
        description:
          "Work through Java Basics, Arithmetic, Conditions, nested conditions, switch, loops, methods, arrays, classes, and objects.",
      },
      {
        step: "Tasks",
        description:
          "Complete the welcome discussion, quizzes, reading, and Java Review assignment.",
      },
    ],
    readingHighlights: [
      "Home Page - Welcome",
      "Course Policies & Guidelines",
      "Reading: Java Review",
    ],
    canvasSections: [
      {
        id: "getting-started",
        title: "Getting Started",
        groups: [
          {
            items: [
              {
                title: "Home Page - Welcome",
                type: "page",
              },
            ],
          },
          {
            title: "Course Policies & Guidelines",
            items: [
              {
                title: "Discussion Guidelines",
                type: "page",
              },
              {
                title: "Grading & Late Work",
                type: "page",
              },
              {
                title: "Academic Integrity",
                type: "page",
              },
              {
                title: "Student Resources",
                type: "page",
              },
              {
                title: "Well-being @ SMC",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Self-Check Quiz",
                type: "quiz",
                dueLabel: "Jun 23",
                pointsLabel: "4 pts",
              },
              {
                title: "Discussion: Welcome",
                type: "discussion",
                dueLabel: "Jun 28",
                pointsLabel: "4 pts",
              },
            ],
          },
        ],
      },
      {
        id: "java-review",
        title: "Module: Java Review",
        groups: [
          {
            items: [
              {
                title: "Java Review: Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Setup",
            defaultCollapsed: true,
            items: [
              {
                title: "Install Java Development Kit (JDK)",
                type: "page",
              },
              {
                title: "Install Maven",
                type: "page",
              },
              {
                title: "How to create a Java Project",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture",
            defaultCollapsed: true,
            items: [
              {
                title: "Lecture: Java Basics",
                type: "page",
              },
              {
                title: "Quiz - Basic Program",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "4 pts",
              },
              {
                title: "Lecture: Arithmetic",
                type: "page",
              },
              {
                title: "Quiz - Arithmetic",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Conditions",
                type: "page",
              },
              {
                title: "Quiz - Conditions",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Logical Operators & Nested Conditions",
                type: "page",
              },
              {
                title: "Quiz - Nested Conditions",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Switch Statement",
                type: "page",
              },
              {
                title: "Quiz - Switch",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Loops",
                type: "page",
              },
              {
                title: "Quiz - Loops",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "5 pts",
              },
              {
                title: "Lecture: Methods",
                type: "page",
              },
              {
                title: "Quiz - Methods",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Arrays",
                type: "page",
              },
              {
                title: "Quiz - Arrays",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Classes & Objects",
                type: "page",
              },
              {
                title: "Quiz - OOP",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "4 pts",
              },
              {
                title: "Reading: Java Review",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Assignment: Java Review",
                type: "assignment",
                dueLabel: "Jun 28",
                pointsLabel: "20 pts",
                previewFiles: [
                  {
                    fileUrl:
                      "/code-playground/CS56/mod-1/java-review/ExpenseTrackerApp.java",
                    filename: "ExpenseTrackerApp.java",
                    buttonLabel: "ExpenseTrackerApp.java",
                  },
                  {
                    fileUrl:
                      "/code-playground/CS56/mod-1/java-review/ExpenseManager.java",
                    filename: "ExpenseManager.java",
                    buttonLabel: "ExpenseManager.java",
                  },
                  {
                    fileUrl:
                      "/code-playground/CS56/mod-1/java-review/Expense.java",
                    filename: "Expense.java",
                    buttonLabel: "Expense.java",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    textTasks: [
      {
        id: "module-1-starter",
        title: "Assignment: Java Review",
        objective:
          "Complete the first Java Review assignment after finishing setup, lectures, quizzes, and the Java Review reading.",
        tasks: [
          "Verify the JDK and Maven are installed",
          "Create the Java project described in the module setup",
          "Review Java basics through classes and objects",
          "Submit the Java Review assignment by Jun 28",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jun 28",
          "20 points",
        ],
        resourceSections: [
          {
            title: "Source Files",
            items: [
              "ExpenseTrackerApp.java",
              "ExpenseManager.java",
              "Expense.java",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Exceptions and Robust Program Design",
    weekLabel: "Module 2",
    dateLabel: "Syllabus date pending",
    overview:
      "This module focuses on building Java programs that fail clearly, recover when appropriate, and communicate error states through checked and unchecked exceptions.",
    topicLine: "Exceptions, validation, and defensive Java programming",
    focusAreas: [
      "Checked and unchecked exceptions",
      "Custom exception classes",
      "try/catch/finally and try-with-resources",
      "Input validation and failure handling",
    ],
    objectivesAligned: [
      "Apply Java exception handling patterns",
      "Design custom exceptions for domain-specific failures",
      "Keep program flow readable while handling errors",
    ],
    outcomeAlignment: [
      "Create more robust command-line and file-processing programs",
      "Explain when an exception should be caught, propagated, or avoided",
    ],
    syllabusContext: [
      "Matches the course catalog emphasis on robust Java programs",
      "Exact assignment text pending syllabus import",
    ],
    starterTasks: [
      "Refactor a fragile program to handle invalid input",
      "Create a custom exception class",
      "Document expected failure cases",
    ],
    artifacts: [
      "Exception-handling Java source files",
      "Test run notes for valid and invalid inputs",
    ],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Exception strategy documented and implemented",
    moduleSummary: [
      {
        step: "Analyze",
        description:
          "Identify where the program can fail or receive invalid data.",
      },
      {
        step: "Implement",
        description: "Use Java exception patterns to make failures explicit.",
      },
      {
        step: "Verify",
        description: "Run both happy-path and failure-path examples.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Exceptions",
      "Course notes on robust and secure Java programs",
    ],
    textTasks: [
      {
        id: "module-2-exceptions",
        title: "Exception Handling Assignment",
        objective:
          "Turn a fragile Java workflow into a program with clear validation and recoverable error handling.",
        tasks: [
          "Add exception handling around risky input or file operations",
          "Create custom exceptions where they improve clarity",
          "Write a short reflection on the error-handling choices",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 3,
    title: "Generics, Collections, and API Design",
    weekLabel: "Module 3",
    dateLabel: "Syllabus date pending",
    overview:
      "This module organizes data with Java collections and strengthens reusable APIs through generics, interfaces, and type-safe design.",
    topicLine: "Collections framework, generics, and reusable APIs",
    focusAreas: [
      "Lists, sets, maps, queues, and iterators",
      "Generic classes and methods",
      "Comparable, Comparator, and ordering",
      "API design for reusable components",
    ],
    objectivesAligned: [
      "Choose appropriate collection types",
      "Use generics to avoid unsafe casts",
      "Expose clean interfaces for reusable logic",
    ],
    outcomeAlignment: [
      "Build type-safe Java utilities",
      "Reason about data structure tradeoffs in assignments",
    ],
    syllabusContext: [
      "Supports later I/O, JDBC, and networking modules",
      "Exact syllabus mapping pending import",
    ],
    starterTasks: [
      "Model a dataset with multiple collection types",
      "Add sorting and filtering behavior",
      "Document why each collection was selected",
    ],
    artifacts: [
      "Collection-based Java utility",
      "README with API usage examples",
    ],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Type-safe Java collection workflow complete",
    moduleSummary: [
      {
        step: "Model",
        description: "Represent course data with typed collections.",
      },
      {
        step: "Operate",
        description: "Add search, sort, filter, or grouping behavior.",
      },
      {
        step: "Explain",
        description: "Justify collection and generic type choices.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Collections",
      "Oracle Java Tutorials: Generics",
    ],
    textTasks: [
      {
        id: "module-3-collections",
        title: "Collections and Generics Assignment",
        objective:
          "Create a small typed Java API that uses collections and generics intentionally.",
        tasks: [
          "Implement a generic class or method",
          "Use at least two collection types",
          "Include examples that demonstrate type safety",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 4,
    title: "Input, Output, and File Processing",
    weekLabel: "Module 4",
    dateLabel: "Syllabus date pending",
    overview:
      "This module introduces Java I/O workflows for reading, writing, transforming, and closing file resources safely.",
    topicLine: "Streams, readers, writers, files, and resource management",
    focusAreas: [
      "Byte and character streams",
      "Buffered I/O",
      "File and path handling",
      "try-with-resources",
    ],
    objectivesAligned: [
      "Read and write structured data from files",
      "Use resource-safe Java I/O patterns",
      "Handle I/O exceptions cleanly",
    ],
    outcomeAlignment: [
      "Build file-backed assignments and utilities",
      "Prepare data import/export patterns for later modules",
    ],
    syllabusContext: [
      "Matches the course catalog topic: Input/Output",
      "Exact syllabus readings and due dates pending import",
    ],
    starterTasks: [
      "Read data from a text file",
      "Transform the data in memory",
      "Write a formatted output file",
    ],
    artifacts: ["Java I/O program", "Sample input and output files"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "File-processing workflow complete",
    moduleSummary: [
      {
        step: "Read",
        description: "Load data through Java I/O APIs.",
      },
      {
        step: "Transform",
        description: "Process data using clear object-oriented logic.",
      },
      {
        step: "Write",
        description: "Persist the result and document output format.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Basic I/O",
      "Course notes on file submission expectations",
    ],
    textTasks: [
      {
        id: "module-4-io",
        title: "File Processing Assignment",
        objective:
          "Build a Java program that safely reads input data and writes processed output.",
        tasks: [
          "Use try-with-resources for file handles",
          "Handle missing or malformed file data",
          "Include sample files for repeatable grading",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 5,
    title: "Serialization and Persistent Objects",
    weekLabel: "Module 5",
    dateLabel: "Syllabus date pending",
    overview:
      "This module extends I/O into object persistence, data exchange, and versioning considerations for saved Java objects.",
    topicLine: "Object streams, serialization, and persistence tradeoffs",
    focusAreas: [
      "Serializable objects",
      "ObjectInputStream and ObjectOutputStream",
      "Persistence boundaries",
      "Data compatibility and version notes",
    ],
    objectivesAligned: [
      "Persist object state to disk",
      "Restore object state safely",
      "Discuss serialization tradeoffs",
    ],
    outcomeAlignment: [
      "Build file-backed Java applications with object state",
      "Prepare for database-backed persistence in JDBC",
    ],
    syllabusContext: [
      "Extends the course catalog Input/Output topic",
      "Exact syllabus mapping pending import",
    ],
    starterTasks: [
      "Define a serializable model",
      "Save and load a collection of objects",
      "Document compatibility assumptions",
    ],
    artifacts: ["Serializable Java model", "Persistence demo program"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Object persistence demo complete",
    moduleSummary: [
      {
        step: "Model",
        description: "Choose which object state should persist.",
      },
      {
        step: "Persist",
        description: "Write object state to disk.",
      },
      {
        step: "Restore",
        description: "Reload and verify persisted objects.",
      },
    ],
    readingHighlights: [
      "Oracle Java API docs for object streams",
      "Course notes on persistence and file formats",
    ],
    textTasks: [
      {
        id: "module-5-serialization",
        title: "Object Persistence Assignment",
        objective:
          "Persist and restore Java objects while documenting the shape and limits of the stored data.",
        tasks: [
          "Create a serializable domain model",
          "Write and read model instances from disk",
          "Add notes about versioning or schema assumptions",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 6,
    title: "Multimedia and Event-Driven Java",
    weekLabel: "Module 6",
    dateLabel: "Syllabus date pending",
    overview:
      "This module creates room for the multimedia portion of CS 56, with a focus on event-driven user interaction and media-oriented Java APIs.",
    topicLine: "Multimedia, UI events, and interactive Java programs",
    focusAreas: [
      "Event listeners and callbacks",
      "Image or media asset handling",
      "Interactive program structure",
      "User-facing feedback",
    ],
    objectivesAligned: [
      "Create an event-driven Java interface",
      "Load and display or process multimedia assets",
      "Separate UI behavior from core program logic",
    ],
    outcomeAlignment: [
      "Build interactive Java assignments",
      "Apply object-oriented design to user-facing programs",
    ],
    syllabusContext: [
      "Matches the course catalog topic: multimedia",
      "Exact multimedia API requirements pending syllabus import",
    ],
    starterTasks: [
      "Create a small interactive Java program",
      "Load a media asset or visual resource",
      "Respond to user-triggered events",
    ],
    artifacts: ["Multimedia Java demo", "Screenshot or run notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Interactive multimedia demo complete",
    moduleSummary: [
      {
        step: "Design",
        description: "Choose a simple interaction and media workflow.",
      },
      {
        step: "Build",
        description: "Implement event-driven behavior in Java.",
      },
      {
        step: "Capture",
        description: "Provide screenshots or notes for grading.",
      },
    ],
    readingHighlights: [
      "Course syllabus multimedia notes",
      "Java UI or media API references selected by instructor",
    ],
    textTasks: [
      {
        id: "module-6-multimedia",
        title: "Multimedia Java Assignment",
        objective:
          "Create an interactive Java program that uses event handling and a media-oriented artifact.",
        tasks: [
          "Implement at least one user-triggered event",
          "Use a visual, audio, or media-related input",
          "Document how to run and verify the program",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 7,
    title: "Multithreading Fundamentals",
    weekLabel: "Module 7",
    dateLabel: "Syllabus date pending",
    overview:
      "This module introduces threads, runnable tasks, and the core lifecycle concepts behind concurrent Java programs.",
    topicLine: "Threads, Runnable, task lifecycle, and scheduling basics",
    focusAreas: [
      "Thread creation",
      "Runnable tasks",
      "Thread lifecycle",
      "Concurrency risks",
    ],
    objectivesAligned: [
      "Create and run concurrent Java tasks",
      "Explain thread lifecycle states",
      "Identify shared-state hazards",
    ],
    outcomeAlignment: [
      "Prepare for synchronized and coordinated concurrent programs",
      "Build small programs that perform work in parallel",
    ],
    syllabusContext: [
      "Matches the course catalog topic: multithreading",
      "Exact assignment details pending syllabus import",
    ],
    starterTasks: [
      "Create multiple threads",
      "Log thread activity clearly",
      "Observe nondeterministic ordering",
    ],
    artifacts: ["Threading demo program", "Run output notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Basic concurrent Java workflow complete",
    moduleSummary: [
      {
        step: "Create",
        description: "Define tasks with Runnable or Thread.",
      },
      {
        step: "Run",
        description: "Start and observe multiple threads.",
      },
      {
        step: "Reflect",
        description: "Explain ordering and shared-state behavior.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Concurrency",
      "Instructor notes on threading assignments",
    ],
    textTasks: [
      {
        id: "module-7-threading",
        title: "Multithreading Assignment",
        objective:
          "Build a Java program that runs multiple tasks concurrently and explains the observed behavior.",
        tasks: [
          "Implement at least two concurrent tasks",
          "Log task progress and completion",
          "Explain any nondeterministic output ordering",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 8,
    title: "Synchronization and Concurrency Control",
    weekLabel: "Module 8",
    dateLabel: "Syllabus date pending",
    overview:
      "This module strengthens multithreaded programs with synchronized access, coordination, and safer shared-state patterns.",
    topicLine: "Synchronization, locks, coordination, and thread safety",
    focusAreas: [
      "Synchronized methods or blocks",
      "Locks and coordination",
      "Race conditions",
      "Thread-safe design",
    ],
    objectivesAligned: [
      "Protect shared state in a concurrent program",
      "Explain race conditions and thread safety",
      "Use coordination patterns intentionally",
    ],
    outcomeAlignment: [
      "Build safer multithreaded Java assignments",
      "Reason about correctness under concurrent access",
    ],
    syllabusContext: [
      "Extends the course catalog multithreading topic",
      "Exact syllabus checkpoint pending import",
    ],
    starterTasks: [
      "Create a shared-state concurrency example",
      "Demonstrate the bug or risk",
      "Fix the issue with synchronization",
    ],
    artifacts: ["Thread-safe Java program", "Before-and-after run notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Thread-safe shared-state workflow complete",
    moduleSummary: [
      {
        step: "Expose",
        description: "Create or inspect a race condition.",
      },
      {
        step: "Protect",
        description: "Apply synchronization or locking.",
      },
      {
        step: "Validate",
        description: "Show that output is stable or explain remaining risks.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Synchronization",
      "Course notes on shared-state concurrency",
    ],
    textTasks: [
      {
        id: "module-8-synchronization",
        title: "Thread Safety Assignment",
        objective:
          "Improve a concurrent Java program so shared state is accessed safely.",
        tasks: [
          "Identify shared mutable state",
          "Apply an appropriate synchronization strategy",
          "Explain why the corrected program is safer",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 9,
    title: "Networking with Java Sockets",
    weekLabel: "Module 9",
    dateLabel: "Syllabus date pending",
    overview:
      "This module introduces Java networking APIs for client/server communication and socket-based programs.",
    topicLine: "Networking APIs, sockets, clients, and servers",
    focusAreas: [
      "Socket and ServerSocket",
      "Client/server protocols",
      "Network I/O",
      "Error handling in distributed programs",
    ],
    objectivesAligned: [
      "Build a simple Java client and server",
      "Exchange data over a network connection",
      "Handle connection failures clearly",
    ],
    outcomeAlignment: [
      "Apply Java networking APIs to distributed programs",
      "Prepare for RMI and server-side Java modules",
    ],
    syllabusContext: [
      "Matches the course catalog topic: networking",
      "Exact syllabus assignment pending import",
    ],
    starterTasks: [
      "Create a simple socket server",
      "Create a matching client",
      "Log request and response flow",
    ],
    artifacts: ["Socket client/server source files", "Run instructions"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Socket-based Java communication working locally",
    moduleSummary: [
      {
        step: "Server",
        description: "Listen for client requests.",
      },
      {
        step: "Client",
        description: "Connect and send data.",
      },
      {
        step: "Protocol",
        description: "Document the message format and expected behavior.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: Custom Networking",
      "Course notes on network programming",
    ],
    textTasks: [
      {
        id: "module-9-networking",
        title: "Socket Networking Assignment",
        objective:
          "Build a small Java client/server program that exchanges data over sockets.",
        tasks: [
          "Implement both client and server entry points",
          "Handle connection errors gracefully",
          "Document the protocol and run sequence",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 10,
    title: "Java Database Connectivity",
    weekLabel: "Module 10",
    dateLabel: "Syllabus date pending",
    overview:
      "This module connects Java applications to relational databases using JDBC, SQL statements, and result-set processing.",
    topicLine: "JDBC connections, statements, queries, and result sets",
    focusAreas: [
      "JDBC driver setup",
      "Database connections",
      "Prepared statements",
      "ResultSet processing",
    ],
    objectivesAligned: [
      "Connect Java code to a database",
      "Run parameterized SQL queries safely",
      "Map database rows to Java objects",
    ],
    outcomeAlignment: [
      "Build data-backed Java applications",
      "Use JDBC as the bridge between Java logic and persistent storage",
    ],
    syllabusContext: [
      "Matches the course catalog topic: Java Database Connectivity (JDBC)",
      "Exact database platform and assignment details pending syllabus import",
    ],
    starterTasks: [
      "Create or connect to a sample database",
      "Run a select query from Java",
      "Print or render mapped results",
    ],
    artifacts: ["JDBC Java source files", "SQL setup notes or schema"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Java application can query database data",
    moduleSummary: [
      {
        step: "Connect",
        description: "Configure the JDBC driver and database URL.",
      },
      {
        step: "Query",
        description: "Use prepared statements for SQL operations.",
      },
      {
        step: "Map",
        description: "Convert query results into Java objects or output.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: JDBC Basics",
      "Instructor database setup notes",
    ],
    textTasks: [
      {
        id: "module-10-jdbc",
        title: "JDBC Assignment",
        objective:
          "Create a Java program that connects to a relational database and performs safe query operations.",
        tasks: [
          "Configure the JDBC dependency or driver",
          "Use prepared statements for database access",
          "Include setup and run instructions",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 11,
    title: "JDBC Updates and Transaction Patterns",
    weekLabel: "Module 11",
    dateLabel: "Syllabus date pending",
    overview:
      "This module extends JDBC work into inserts, updates, deletes, transaction boundaries, and database-backed application behavior.",
    topicLine: "Data updates, transactions, and DAO-style organization",
    focusAreas: [
      "Insert, update, and delete statements",
      "Transaction commit and rollback",
      "DAO or repository organization",
      "Database error handling",
    ],
    objectivesAligned: [
      "Modify database data from Java",
      "Use transaction control where operations must succeed together",
      "Organize database code for maintainability",
    ],
    outcomeAlignment: [
      "Build more complete data-backed Java applications",
      "Prepare for server-side Java workflows",
    ],
    syllabusContext: [
      "Extends the course catalog JDBC topic",
      "Exact syllabus assignment pending import",
    ],
    starterTasks: [
      "Add create/update/delete database operations",
      "Wrap related changes in a transaction",
      "Document database state before and after",
    ],
    artifacts: ["JDBC CRUD program", "Database setup and verification notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Transaction-aware JDBC workflow complete",
    moduleSummary: [
      {
        step: "Modify",
        description: "Add write operations to the database layer.",
      },
      {
        step: "Control",
        description: "Use transaction boundaries for related operations.",
      },
      {
        step: "Verify",
        description: "Show before-and-after database behavior.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: JDBC Transactions",
      "Course notes on database-backed Java apps",
    ],
    textTasks: [
      {
        id: "module-11-jdbc-transactions",
        title: "JDBC CRUD and Transactions Assignment",
        objective:
          "Extend a JDBC program with safe write operations and transaction handling.",
        tasks: [
          "Implement insert, update, or delete operations",
          "Use rollback when a multi-step operation fails",
          "Keep database access code organized",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 12,
    title: "Servlets and HTTP Request Handling",
    weekLabel: "Module 12",
    dateLabel: "Syllabus date pending",
    overview:
      "This module introduces server-side Java with servlets, request/response handling, and web application deployment concepts.",
    topicLine: "Servlet lifecycle, HTTP requests, responses, and deployment",
    focusAreas: [
      "Servlet lifecycle",
      "HTTP methods",
      "Request parameters",
      "Response generation",
    ],
    objectivesAligned: [
      "Create a basic Java servlet",
      "Handle HTTP request data",
      "Generate a response from server-side Java code",
    ],
    outcomeAlignment: [
      "Connect Java programming to web application workflows",
      "Prepare for integrating server logic with persistent data",
    ],
    syllabusContext: [
      "Matches the course catalog topic: Servlets",
      "Exact servlet container and setup instructions pending syllabus import",
    ],
    starterTasks: [
      "Create a servlet entry point",
      "Handle a GET or POST request",
      "Return a simple HTML or text response",
    ],
    artifacts: ["Servlet project source", "Deployment/run notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Basic servlet request/response flow working",
    moduleSummary: [
      {
        step: "Configure",
        description: "Set up the servlet project and container.",
      },
      {
        step: "Handle",
        description: "Read request data in Java.",
      },
      {
        step: "Respond",
        description: "Send a generated response to the browser or client.",
      },
    ],
    readingHighlights: [
      "Jakarta Servlet specification or instructor-selected servlet docs",
      "Course notes on server-side Java",
    ],
    textTasks: [
      {
        id: "module-12-servlets",
        title: "Servlet Request Handling Assignment",
        objective:
          "Build a simple servlet-based Java web workflow that handles request data and returns a response.",
        tasks: [
          "Implement at least one servlet route",
          "Handle request parameters safely",
          "Document how to run the servlet project",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 13,
    title: "Servlets with Persistence",
    weekLabel: "Module 13",
    dateLabel: "Syllabus date pending",
    overview:
      "This module combines server-side Java with persistence, preparing a servlet workflow that reads from or writes to a data layer.",
    topicLine: "Servlets, forms, validation, and database-backed behavior",
    focusAreas: [
      "Form handling",
      "Server-side validation",
      "Servlet-to-database integration",
      "User-facing error messages",
    ],
    objectivesAligned: [
      "Process submitted form data",
      "Validate user input before persistence",
      "Integrate servlet logic with a Java data layer",
    ],
    outcomeAlignment: [
      "Build a more complete server-side Java application",
      "Practice full request-to-persistence workflow design",
    ],
    syllabusContext: [
      "Extends the course catalog topics: Servlets and JDBC",
      "Exact syllabus assignment pending import",
    ],
    starterTasks: [
      "Create a form-backed servlet workflow",
      "Validate input before database writes",
      "Show success and failure responses",
    ],
    artifacts: ["Servlet persistence project", "Screenshots or run notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "Server-side Java workflow connected to persistence",
    moduleSummary: [
      {
        step: "Input",
        description: "Receive and validate form or request data.",
      },
      {
        step: "Persist",
        description: "Use a Java data layer to query or update storage.",
      },
      {
        step: "Render",
        description: "Return useful success or error feedback.",
      },
    ],
    readingHighlights: [
      "Servlet docs selected by instructor",
      "JDBC reference material from earlier modules",
    ],
    textTasks: [
      {
        id: "module-13-servlet-persistence",
        title: "Servlet Persistence Assignment",
        objective:
          "Connect a servlet workflow to persistent data with validation and user-facing feedback.",
        tasks: [
          "Process request or form input",
          "Use JDBC or the instructor-approved persistence approach",
          "Document setup, database state, and expected behavior",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 14,
    title: "Remote Method Invocation",
    weekLabel: "Module 14",
    dateLabel: "Syllabus date pending",
    overview:
      "This module introduces Java RMI as a distributed-programming model where clients invoke methods on remote Java objects.",
    topicLine: "RMI interfaces, remote objects, registry, clients, and servers",
    focusAreas: [
      "Remote interfaces",
      "RMI registry",
      "Server object binding",
      "Client lookup and invocation",
    ],
    objectivesAligned: [
      "Define a remote Java interface",
      "Expose an implementation through RMI",
      "Create a client that calls remote methods",
    ],
    outcomeAlignment: [
      "Apply Java distributed programming concepts",
      "Compare RMI with socket-level networking",
    ],
    syllabusContext: [
      "Matches the course catalog topic: Remote Method Invocation (RMI)",
      "Exact assignment details pending syllabus import",
    ],
    starterTasks: [
      "Create a remote interface",
      "Bind a server implementation",
      "Call the remote method from a client",
    ],
    artifacts: ["RMI client/server source files", "Run sequence notes"],
    importantDates: ["Date pending syllabus import"],
    assessmentContext: ["Points and grading category pending syllabus import"],
    milestone: "RMI client/server workflow complete",
    moduleSummary: [
      {
        step: "Define",
        description: "Create the remote interface contract.",
      },
      {
        step: "Serve",
        description: "Bind an implementation to the registry.",
      },
      {
        step: "Invoke",
        description: "Call remote behavior from the client.",
      },
    ],
    readingHighlights: [
      "Oracle Java Tutorials: RMI",
      "Instructor notes on distributed Java programs",
    ],
    textTasks: [
      {
        id: "module-14-rmi",
        title: "RMI Assignment",
        objective:
          "Build a minimal Java RMI application with a remote interface, server implementation, and client invocation.",
        tasks: [
          "Define the remote interface and implementation",
          "Start and document the registry/server flow",
          "Run a client that invokes remote behavior",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
  {
    id: 15,
    title: "Integration Project and Course Wrap-Up",
    weekLabel: "Module 15",
    dateLabel: "Syllabus date pending",
    overview:
      "The final module is reserved for integrating advanced Java skills into a complete artifact, review package, or final assessment as specified by the CS 56 syllabus.",
    topicLine: "Advanced Java integration, review, and final deliverable",
    focusAreas: [
      "Final project packaging",
      "Code review and cleanup",
      "Documentation",
      "Course reflection",
    ],
    objectivesAligned: [
      "Integrate multiple advanced Java topics",
      "Package a project for review",
      "Document design choices and lessons learned",
    ],
    outcomeAlignment: [
      "Demonstrate readiness to use advanced Java APIs in larger applications",
      "Create a portfolio-ready final artifact",
    ],
    syllabusContext: [
      "Module 15 of 15 in the CS 56 assignment skeleton",
      "Final project or exam requirements pending syllabus import",
    ],
    starterTasks: [
      "Choose or confirm the final deliverable scope",
      "Clean up source organization",
      "Prepare final documentation and screenshots",
    ],
    artifacts: [
      "Final Java project or review package",
      "README and run instructions",
      "Reflection or final notes",
    ],
    importantDates: ["Final date pending syllabus import"],
    assessmentContext: ["Final assessment details pending syllabus import"],
    milestone: "CS 56 final artifact ready for submission",
    moduleSummary: [
      {
        step: "Integrate",
        description: "Combine selected advanced Java course topics.",
      },
      {
        step: "Polish",
        description: "Clean up code, docs, and repeatable run steps.",
      },
      {
        step: "Submit",
        description: "Package final materials according to syllabus rules.",
      },
    ],
    readingHighlights: [
      "Final project instructions from syllabus",
      "Course review notes and instructor-provided resources",
    ],
    textTasks: [
      {
        id: "module-15-final",
        title: "Final Integration Assignment",
        objective:
          "Prepare the final CS 56 artifact once the syllabus provides the exact project or exam requirements.",
        tasks: [
          "Integrate at least two advanced Java concepts",
          "Document how to build, run, and verify the artifact",
          "Add final reflection or submission notes required by the syllabus",
        ],
        submissionInstructions: commonSubmissionInstructions,
      },
    ],
  },
];
