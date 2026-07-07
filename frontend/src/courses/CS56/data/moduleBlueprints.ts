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
        type: "page" | "quiz" | "discussion" | "assignment" | "attachment";
        dueLabel?: string;
        pointsLabel?: string;
        scoreLabel?: string;
        defaultCollapsed?: boolean;
        description?: string;
        note?: string;
        prompt?: {
          title: string;
          sections: Array<{
            title: string;
            paragraphs?: string[];
            steps?: Array<{
              title: string;
              items: string[];
            }>;
            output?: string[];
          }>;
        };
        details?: {
          intro?: string;
          steps: Array<{
            label: string;
            text: string;
            pointsLabel?: string;
          }>;
        };
        codeBlocks?: Array<{
          title: string;
          language: string;
          code: string;
        }>;
        expectedOutput?: string[];
        rubric?: {
          title: string;
          rows: Array<{
            criterion: string;
            pointsLabel: string;
            ratings: Array<{
              label: string;
              description?: string;
              pointsLabel: string;
            }>;
          }>;
        };
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
                prompt: {
                  title: "Assignment: Java Review Expense Tracker",
                  sections: [
                    {
                      title: "Overview",
                      paragraphs: [
                        "In this assignment, you will develop a Java application that functions as a personal Expense Tracker. The goal is to help users manage their personal finances by tracking their daily expenses. Users should be able to add, remove, and view their expenses, as well as categorize them for better organization. This project will allow you to practice fundamental Object-Oriented Programming (OOP) concepts by creating and manipulating objects, as well as ensuring data encapsulation and handling exceptions.",
                        "The application should consist of an Expense class with attributes such as description, amount, date, and category. Additionally, an ExpenseManager class will be used to handle a collection of Expense objects, providing functionalities like adding new expenses, and displaying the total expenses within a certain period (e.g., a week, a month, or a custom date range). A simple text-based user interface should be designed to interact with the application, allowing users to input and manage their expenses efficiently.",
                      ],
                    },
                    {
                      title: "Submission",
                      paragraphs: [
                        "Submit only the .java file(s) of your project. You may submit as one or multiple .java files.",
                      ],
                    },
                  ],
                },
                rubric: {
                  title: "Rubric: Java Review",
                  rows: [
                    {
                      criterion: "Expense Class",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Description Field",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        {
                          label: "Incorrect Access Level",
                          pointsLabel: "0.5 pts",
                        },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Amount Field",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Date Field",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Category Field",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Getter/Setter Methods",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "ExpenseManager Class",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Collection of Expense",
                      pointsLabel: "1 pt",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "1 pt" },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "add Method",
                      pointsLabel: "2 pts",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "2 pts" },
                        {
                          label: "Incorrect Functionality",
                          description:
                            "Add method doesn't properly add method to expense list.",
                          pointsLabel: "1 pt",
                        },
                        {
                          label: "Incorrect Method",
                          description:
                            "The method has incorrect or missing parameters.",
                          pointsLabel: "1 pt",
                        },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Display Method",
                      pointsLabel: "2 pts",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "2 pts" },
                        {
                          label: "Missing functionality",
                          description:
                            "Incorrectly defined or missing functionality.",
                          pointsLabel: "1 pt",
                        },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Main Function",
                      pointsLabel: "5 pts",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "5 pts" },
                        {
                          label: "Missing add functionality",
                          description:
                            "Doesn't properly implement adding an expense using input information.",
                          pointsLabel: "3 pts",
                        },
                        {
                          label: "Missing output",
                          description:
                            "Lacks functionality to list the expenses using input information.",
                          pointsLabel: "2 pts",
                        },
                        {
                          label: "Lack User Input",
                          description: "Fails to implement user interaction.",
                          pointsLabel: "1 pt",
                        },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                    {
                      criterion: "Coding Standards",
                      pointsLabel: "3 pts",
                      ratings: [
                        { label: "Full Marks", pointsLabel: "3 pts" },
                        {
                          label: "Lacks Minor Formatting",
                          description:
                            "Lacks some proper formatting, like variable naming, indentation, etc.",
                          pointsLabel: "2 pts",
                        },
                        {
                          label: "Indentation",
                          description:
                            "Fails to follow proper indentation in multiple classes.",
                          pointsLabel: "1 pt",
                        },
                        {
                          label: "Lacks Formatting",
                          description:
                            "Lacks multiple formatting standards, indentation, naming conventions, etc.",
                          pointsLabel: "1 pt",
                        },
                        {
                          label: "Missing Single Responsibility",
                          description:
                            "Main code is mixed among classes in that each class does not have a single responsibility.",
                          pointsLabel: "1 pt",
                        },
                        { label: "No Marks", pointsLabel: "0 pts" },
                      ],
                    },
                  ],
                },
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
    title: "Inheritance",
    weekLabel: "Module 2",
    dateLabel: "June 25-28",
    overview:
      "This module moves from Java review into inheritance. It covers superclass/subclass relationships, packages, access levels, constructors with the super keyword, and abstract classes.",
    topicLine:
      "Inheritance, packages, access control, constructors, super, and abstract classes",
    focusAreas: [
      "Superclass and subclass design",
      "Package organization",
      "Public, private, protected, and package-private access",
      "Constructors and the super keyword",
      "Abstract classes",
    ],
    objectivesAligned: [
      "Explain how inheritance reuses and specializes behavior",
      "Organize Java classes with packages",
      "Choose appropriate access levels for fields and methods",
      "Use constructors and super to initialize inherited state",
      "Design abstract base classes for shared contracts",
    ],
    outcomeAlignment: [
      "Build object-oriented Java programs with inheritance hierarchies",
      "Reason about visibility and initialization across related classes",
      "Prepare for more advanced polymorphism and interface work",
    ],
    syllabusContext: [
      "Module: Inheritance includes overview, lecture, reading, quizzes, and a discussion task",
      "Visible Canvas deadlines: Discussion due Jun 25; inheritance quizzes due Jun 28",
    ],
    starterTasks: [
      "Review Inheritance: Overview",
      "Complete inheritance lecture pages and quizzes",
      "Read the Inheritance reading",
      "Participate in Discussion: Inheritance",
    ],
    artifacts: [
      "Inheritance quiz submissions",
      "Discussion: Inheritance post",
      "Reading notes for inheritance concepts",
    ],
    importantDates: [
      "Jun 25 - Discussion: Inheritance",
      "Jun 28 - Quiz - Inheritance",
      "Jun 28 - Quiz - Packages",
      "Jun 28 - Quiz - Access Levels",
      "Jun 28 - Quiz - Inheritance: Constructors & super",
      "Jun 28 - Quiz - Abstract Classes",
    ],
    assessmentContext: [
      "Discussion: Inheritance - 5 pts",
      "Quiz - Inheritance - 3 pts",
      "Quiz - Packages - 3 pts",
      "Quiz - Access Levels - 3 pts",
      "Quiz - Inheritance: Constructors & super - 3 pts",
      "Quiz - Abstract Classes - 3 pts",
    ],
    milestone: "Inheritance lecture sequence and discussion completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the inheritance overview and connect the module to Java OOP review.",
      },
      {
        step: "Lecture",
        description:
          "Work through inheritance, packages, access levels, constructors with super, and abstract classes.",
      },
      {
        step: "Tasks",
        description:
          "Complete quizzes, read the inheritance material, and submit the discussion.",
      },
    ],
    readingHighlights: [
      "Inheritance: Overview",
      "Reading: Inheritance",
      "Lecture pages on inheritance, packages, access levels, constructors, super, and abstract classes",
    ],
    canvasSections: [
      {
        id: "inheritance",
        title: "Module: Inheritance",
        groups: [
          {
            items: [
              {
                title: "Inheritance: Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture",
            defaultCollapsed: true,
            items: [
              {
                title: "Lecture: Inheritance",
                type: "page",
              },
              {
                title: "Quiz - Inheritance",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Packages",
                type: "page",
              },
              {
                title: "Quiz - Packages",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Access Levels",
                type: "page",
              },
              {
                title: "Quiz - Access Levels",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Constructors & super Keyword",
                type: "page",
              },
              {
                title: "Quiz - Inheritance: Constructors & super",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Abstract Classes",
                type: "page",
              },
              {
                title: "Quiz - Abstract Classes",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Reading: Inheritance",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Discussion: Inheritance",
                type: "discussion",
                dueLabel: "Jun 25",
                pointsLabel: "5 pts",
                details: {
                  intro:
                    "Let's ensure that everyone of us understands this module's subject well and is confident applying inheritance when needed. Complete the following tasks:",
                  steps: [
                    {
                      label: "By Thursday",
                      text: "Submit a question on this module's subject.",
                      pointsLabel: "2 points",
                    },
                    {
                      label: "By Sunday",
                      text: "Select a question from one of your classmates and provide a thorough response. Ensure your answer is at least two sentences long and includes an example where relevant.",
                      pointsLabel: "3 points",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
    textTasks: [
      {
        id: "module-2-inheritance-discussion",
        title: "Discussion: Inheritance",
        objective:
          "Participate in the inheritance discussion after completing the lecture and reading materials.",
        tasks: [
          "Review inheritance, packages, access levels, constructors, super, and abstract classes",
          "Complete the inheritance quizzes",
          "Post the inheritance discussion response by Jun 25",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion",
          "Due: Jun 25",
          "5 points",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Polymorphism, Dynamic Binding & Interfaces",
    weekLabel: "Module 3",
    dateLabel: "June 28",
    overview:
      "This module expands object-oriented Java design with polymorphism, dynamic binding, method overriding, and interfaces. It also introduces anonymous classes and functional interfaces.",
    topicLine:
      "Polymorphism, dynamic binding, method overriding, interfaces, anonymous classes, and functional interfaces",
    focusAreas: [
      "Polymorphic references",
      "Method overriding",
      "Dynamic binding",
      "Interface design and extension",
      "Anonymous classes",
      "Functional interfaces",
    ],
    objectivesAligned: [
      "Explain how polymorphism changes runtime behavior",
      "Override methods intentionally in inheritance hierarchies",
      "Use dynamic binding to call subclass behavior through superclass references",
      "Define and extend Java interfaces",
      "Recognize anonymous classes and functional interface patterns",
    ],
    outcomeAlignment: [
      "Build Java programs that use polymorphism and interfaces cleanly",
      "Prepare for event-driven, collection, and callback-oriented Java APIs",
    ],
    syllabusContext: [
      "Module: Polymorphism, Dynamic Binding & Interfaces includes overview, two lecture sections, reading, quizzes, and an assignment task",
      "Visible Canvas deadlines: all quizzes and Assignment: Polymorphism due Jun 28",
    ],
    starterTasks: [
      "Review Polymorphism: Overview",
      "Complete the polymorphism and dynamic binding lecture sequence",
      "Complete the interfaces lecture sequence",
      "Read Polymorphism & Interfaces",
      "Submit Assignment: Polymorphism",
    ],
    artifacts: [
      "Polymorphism quiz submissions",
      "Interfaces quiz submissions",
      "Assignment: Polymorphism",
    ],
    importantDates: [
      "Jun 28 - Quiz: Polymorphism",
      "Jun 28 - Quiz: Overriding Methods",
      "Jun 28 - Quiz: Dynamic Binding",
      "Jun 28 - Quiz: Interfaces",
      "Jun 28 - Quiz: More on Interfaces",
      "Jun 28 - Quiz: Anonymous Classes",
      "Jun 28 - Quiz: Functional Interfaces",
      "Jun 28 - Assignment: Polymorphism",
    ],
    assessmentContext: [
      "Quiz: Polymorphism - 3 pts",
      "Quiz: Overriding Methods - 3 pts",
      "Quiz: Dynamic Binding - 3 pts",
      "Quiz: Interfaces - 4 pts",
      "Quiz: More on Interfaces - 3 pts",
      "Quiz: Anonymous Classes - 3 pts",
      "Quiz: Functional Interfaces - 3 pts",
      "Assignment: Polymorphism - 1 pt",
    ],
    milestone: "Polymorphism, dynamic binding, and interface tasks completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the polymorphism overview and connect it to inheritance from the previous module.",
      },
      {
        step: "Polymorphism",
        description:
          "Study polymorphism, overriding methods, and dynamic binding.",
      },
      {
        step: "Interfaces",
        description:
          "Study interface basics, interface extension, anonymous classes, and functional interfaces.",
      },
      {
        step: "Tasks",
        description: "Complete quizzes, reading, and Assignment: Polymorphism.",
      },
    ],
    readingHighlights: [
      "Polymorphism: Overview",
      "Reading: Polymorphism & Interfaces",
      "Lecture pages on polymorphism, dynamic binding, and interfaces",
    ],
    canvasSections: [
      {
        id: "polymorphism-dynamic-binding-interfaces",
        title: "Module: Polymorphism, Dynamic Binding & Interfaces",
        groups: [
          {
            items: [
              {
                title: "Polymorphism: Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture - Polymorphism & Dynamic Binding",
            defaultCollapsed: true,
            items: [
              {
                title: "Lecture: Polymorphism",
                type: "page",
              },
              {
                title: "Quiz: Polymorphism",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Overriding Methods",
                type: "page",
              },
              {
                title: "Quiz: Overriding Methods",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Dynamic Binding",
                type: "page",
              },
              {
                title: "Quiz: Dynamic Binding",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
            ],
          },
          {
            title: "Lecture - Interfaces",
            defaultCollapsed: true,
            items: [
              {
                title: "Lecture: Intro to Interfaces",
                type: "page",
              },
              {
                title: "Lecture: Extending an Interface",
                type: "page",
              },
              {
                title: "Quiz: Interfaces",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "4 pts",
              },
              {
                title: "Lecture: More on Interfaces",
                type: "page",
              },
              {
                title: "Quiz: More on Interfaces",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Anonymous Classes",
                type: "page",
              },
              {
                title: "Quiz: Anonymous Classes",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Functional Interfaces",
                type: "page",
              },
              {
                title: "Quiz: Functional Interfaces",
                type: "quiz",
                dueLabel: "Jun 28",
                pointsLabel: "3 pts",
              },
              {
                title: "Reading: Polymorphism & Interfaces",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Assignment: Polymorphism",
                type: "assignment",
                dueLabel: "Jun 28",
                pointsLabel: "1 pts",
                prompt: {
                  title: "Implementing Polymorphism with Devices in Java",
                  sections: [
                    {
                      title: "Introduction",
                      paragraphs: [
                        "In modern computing, various electronic devices interact seamlessly through software systems. Understanding polymorphism allows you to write flexible and scalable code that treats different devices in a uniform way. In this assignment, you will implement polymorphism using an electronic device hierarchy, demonstrating how method overriding enables dynamic behavior across multiple device types.",
                      ],
                    },
                    {
                      title: "Instructions",
                      steps: [
                        {
                          title: "Create a Parent Class (Device)",
                          items: [
                            'Define a method turnOn() that prints "Turning on the device...".',
                          ],
                        },
                        {
                          title:
                            "Create Child Classes (Smartphone, Laptop, Tablet, Smartwatch)",
                          items: [
                            "Each class should inherit from Device.",
                            'Override the turnOn() method with unique behaviors: Smartphone: "Booting up the smartphone..."; Laptop: "Powering on the laptop..."; Tablet: "Starting the tablet..."; Smartwatch: "Waking up the smartwatch...".',
                          ],
                        },
                        {
                          title: "Implement the Main Method (DeviceTest)",
                          items: [
                            "Create an ArrayList of Device objects.",
                            "Populate the list with instances of Smartphone, Laptop, Tablet, and Smartwatch.",
                            "Use a loop to call turnOn() on each object and observe polymorphic behavior.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Expected Output Example",
                      output: [
                        "Booting up the smartphone...",
                        "Powering on the laptop...",
                        "Starting the tablet...",
                        "Waking up the smartwatch...",
                      ],
                    },
                  ],
                },
                scoreLabel: "Score: 0.81 / 1 pts",
                description: "Java Code Solution - Polymorphism with Devices",
                note: "Submission note: my answer lost points because I wrote turnOn without parentheses in the method call. The loop should call device.turnOn();.",
                codeBlocks: [
                  {
                    title: "Corrected DeviceTest.java",
                    language: "java",
                    code: `import java.util.ArrayList;

class Device {
    void turnOn() {
        System.out.println("Turning on the device...");
    }
}

class Smartphone extends Device {
    @Override
    void turnOn() {
        System.out.println("Booting up the smartphone...");
    }
}

class Laptop extends Device {
    @Override
    void turnOn() {
        System.out.println("Powering on the laptop...");
    }
}

class Tablet extends Device {
    @Override
    void turnOn() {
        System.out.println("Starting the tablet...");
    }
}

class Smartwatch extends Device {
    @Override
    void turnOn() {
        System.out.println("Waking up the smartwatch...");
    }
}

public class DeviceTest {
    public static void main(String[] args) {
        ArrayList<Device> devices = new ArrayList<>();

        devices.add(new Smartphone());
        devices.add(new Laptop());
        devices.add(new Tablet());
        devices.add(new Smartwatch());

        for (Device device : devices) {
            device.turnOn();
        }
    }
}`,
                  },
                ],
                expectedOutput: [
                  "Booting up the smartphone...",
                  "Powering on the laptop...",
                  "Starting the tablet...",
                  "Waking up the smartwatch...",
                ],
              },
            ],
          },
        ],
      },
    ],
    textTasks: [
      {
        id: "module-3-polymorphism",
        title: "Assignment: Polymorphism",
        objective:
          "Complete the polymorphism assignment after reviewing polymorphism, dynamic binding, and interfaces.",
        tasks: [
          "Review polymorphism, overriding methods, and dynamic binding",
          "Review interface basics, extension, anonymous classes, and functional interfaces",
          "Submit Assignment: Polymorphism by Jun 28",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jun 28",
          "1 point",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Unified Modeling Language",
    weekLabel: "Module 4",
    dateLabel: "July 2-5",
    overview:
      "This module introduces Unified Modeling Language as a design and visualization tool for Java programs. It focuses on understanding UML, reading and writing class diagrams, and using sequence diagrams to describe object interactions over time.",
    topicLine:
      "UML foundations, diagram types, class diagrams, sequence diagrams, and PlantUML setup",
    focusAreas: [
      "Purpose and value of UML",
      "UML diagram categories",
      "Class diagrams",
      "Sequence diagrams",
      "PlantUML workflow in IntelliJ",
    ],
    objectivesAligned: [
      "Explain what UML is and why developers use it",
      "Identify different UML diagram types",
      "Create class diagrams that show classes, attributes, methods, and relationships",
      "Create sequence diagrams that show interactions over time",
      "Use PlantUML as a practical diagramming tool in a Java workflow",
    ],
    outcomeAlignment: [
      "Plan Java systems before implementation",
      "Communicate object-oriented design decisions with visual models",
      "Connect design artifacts to later coding assignments",
    ],
    syllabusContext: [
      "Module: Unified Modeling Language includes overview, lecture pages, a discussion, and an assignment task",
      "Visible Canvas deadlines: Discussion: UML due Jul 2; Assignment: UML due Jul 5",
    ],
    starterTasks: [
      "Review UML: Overview",
      "Complete the UML lecture sequence",
      "Install or review the PlantUML plugin workflow in IntelliJ",
      "Post on Discussion: UML",
      "Submit Assignment: UML",
    ],
    artifacts: [
      "Discussion: UML",
      "Assignment: UML",
      "Class diagram or PlantUML artifact",
      "Sequence diagram or PlantUML artifact",
    ],
    importantDates: ["Jul 2 - Discussion: UML", "Jul 5 - Assignment: UML"],
    assessmentContext: ["Discussion: UML - 5 pts", "Assignment: UML - 10 pts"],
    milestone: "UML discussion and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Learn what UML is and why it helps developers design and communicate complex systems before coding.",
      },
      {
        step: "Lecture",
        description:
          "Study UML basics, PlantUML setup in IntelliJ, class diagrams, and sequence diagrams.",
      },
      {
        step: "Tasks",
        description:
          "Post on the UML discussion and complete the UML assignment in Canvas.",
      },
    ],
    readingHighlights: [
      "UML: Overview",
      "Lecture: Intro to UML",
      "Lecture: UML - Class Diagrams",
      "Lecture: UML - Sequence Diagrams",
    ],
    canvasSections: [
      {
        id: "unified-modeling-language",
        title: "Module: Unified Modeling Language",
        groups: [
          {
            items: [
              {
                title: "UML: Overview",
                type: "page",
                defaultCollapsed: true,
                prompt: {
                  title: "Welcome to Module: Unified Modeling Language",
                  sections: [
                    {
                      title: "Welcome",
                      paragraphs: [
                        "Dive headfirst into the captivating world of Java programming with the power of Unified Modeling Language (UML). This module is more than just an introduction to a tool. It is about mastering the art of designing and visualizing complex systems. UML serves as the blueprint for your coding masterpieces, providing a clear and structured way to map out your ideas before bringing them to life.",
                      ],
                    },
                    {
                      title: "Here's what you'll explore",
                      steps: [
                        {
                          title: "What the UML is",
                          items: [
                            "Discover this powerful language and learn why it is a game changer for developers around the world.",
                          ],
                        },
                        {
                          title: "Different diagram types",
                          items: [
                            "Explore the variety of UML diagrams that help you visualize every aspect of your system, from structure to behavior.",
                          ],
                        },
                        {
                          title: "Use and write class diagrams",
                          items: [
                            "Learn how to create detailed class diagrams that illustrate the relationships and interactions between the different classes in your program.",
                          ],
                        },
                        {
                          title: "Use and write sequence diagrams",
                          items: [
                            "Master sequence diagrams to visualize the flow of operations and interactions over time within your system.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Tasks",
                      paragraphs: [
                        "Post on the discussion and complete the assignment.",
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: Intro to UML",
                type: "page",
              },
              {
                title: "Lecture: How to install PlantUML Plugin in IntelliJ",
                type: "page",
              },
              {
                title: "Lecture: UML - Class Diagrams",
                type: "page",
              },
              {
                title: "Lecture: UML - Sequence Diagrams",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Discussion: UML",
                type: "discussion",
                dueLabel: "Jul 2",
                pointsLabel: "5 pts",
                defaultCollapsed: true,
                description:
                  "Post on the UML discussion after reviewing the overview and lecture materials.",
                prompt: {
                  title: "Task 1: Example of a UML Diagram",
                  sections: [
                    {
                      title: "Text Response",
                      paragraphs: [
                        "Here is an example of a UML class diagram for a simple Library Management System.",
                        "This UML class diagram shows a basic library management system. The main classes in the diagram are Library, Book, Member, and Librarian. Each class represents an important part of the system. For example, the Book class stores information about a book, such as its title, author, ISBN number, and whether it is available. The Member class represents a library user who can borrow and return books.",
                        "The diagram also shows the relationships between the classes. A Library can have many books, while a Member can borrow many books. The Librarian manages the library and can perform actions like managing books and registering members. I think this is a good example of a UML diagram because it shows both the data each class contains and the actions each class can perform. It also makes the structure of the system easier to understand before writing the actual code.",
                      ],
                    },
                  ],
                },
              },
              {
                title: "Assignment: UML",
                type: "assignment",
                dueLabel: "Jul 5",
                pointsLabel: "10 pts",
                defaultCollapsed: true,
                description:
                  "Complete the UML quiz-style assignment in Canvas. It includes UML concept checks and two PlantUML exercises.",
                prompt: {
                  title: "Assignment: UML - Quiz Instructions",
                  sections: [
                    {
                      title: "Question 1 - 1 pt",
                      paragraphs: [
                        "UML is a programming language that is used to develop a variety of diagrams.",
                        "Answer: False. UML is a modeling language, not a programming language.",
                      ],
                    },
                    {
                      title: "Question 2 - 1 pt",
                      paragraphs: [
                        "Which of the following diagrams are part of the UML? Check all that apply.",
                        "Answer: Class diagram, Sequence diagram, Activity diagram.",
                      ],
                    },
                    {
                      title: "Question 3 - 1 pt",
                      paragraphs: [
                        "Which of the following can be expressed in a UML class diagram? Check all that apply.",
                        "Answer: Interfaces, Methods, Inheritance relationships, Classes.",
                      ],
                    },
                    {
                      title: "Question 4 - 4 pts",
                      paragraphs: [
                        "PlantUML provides textual commands to define diagrams. Design a class diagram with a package named Math that includes a class Shape with two subclasses named Rectangle and Square.",
                      ],
                      steps: [
                        {
                          title: "Class diagram requirements",
                          items: [
                            "The Shape class has one public method named area() that returns a float.",
                            "The Square class has one private member variable of type float named side.",
                            "The Rectangle class has two private member variables of type float named width and height.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Question 5 - 3 pts",
                      paragraphs: [
                        "PlantUML provides textual commands to define diagrams. Design a sequence diagram for this scenario: an actor uses a vending machine to order an item and pays for it with a credit card.",
                      ],
                      steps: [
                        {
                          title: "Sequence diagram requirements",
                          items: [
                            "Create an actor named Customer.",
                            "The Customer calls order() on a VendingMachine object.",
                            "The Customer calls pay() on the VendingMachine object.",
                            "As part of pay(), the VendingMachine calls charge() on a CreditCard object.",
                            "As part of pay(), the VendingMachine calls output() on itself and returns from pay() to the Customer.",
                          ],
                        },
                      ],
                    },
                  ],
                },
                codeBlocks: [
                  {
                    title: "Question 4 PlantUML Class Diagram Solution",
                    language: "plantuml",
                    code: `@startuml
package Math {
    class Shape {
        + float area()
    }

    class Square {
        - float side
    }

    class Rectangle {
        - float width
        - float height
    }

    Shape <|-- Square
    Shape <|-- Rectangle
}
@enduml`,
                  },
                  {
                    title: "Question 5 PlantUML Sequence Diagram Solution",
                    language: "plantuml",
                    code: `@startuml
actor Customer
participant VendingMachine
participant CreditCard

Customer -> VendingMachine : order()
Customer -> VendingMachine : pay()
activate VendingMachine
VendingMachine -> CreditCard : charge()
VendingMachine -> VendingMachine : output()
VendingMachine --> Customer : pay()
deactivate VendingMachine
@enduml`,
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
        id: "module-4-uml-discussion",
        title: "Discussion: UML",
        objective:
          "Participate in the UML discussion after reviewing the overview and lecture materials.",
        tasks: [
          "Review what UML is and why developers use it",
          "Review the class diagram and sequence diagram lecture pages",
          "Use the text-only Library Management System response as the discussion answer",
          "Post on Discussion: UML by Jul 2",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas discussion",
          "Due: Jul 2",
          "5 points",
        ],
      },
      {
        id: "module-4-uml-assignment",
        title: "Assignment: UML",
        objective:
          "Complete the UML assignment after studying UML foundations, class diagrams, sequence diagrams, and PlantUML setup.",
        tasks: [
          "Complete the UML overview and lecture sequence",
          "Use UML notation to model program structure or behavior as required by Canvas",
          "Submit Assignment: UML by Jul 5",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 5",
          "10 points",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Exceptions",
    weekLabel: "Module 5",
    dateLabel: "July 5",
    overview:
      "This module introduces Java exception handling. It focuses on try-catch blocks, exception classes, finally blocks, AutoCloseable resources, and reading exception-focused code examples.",
    topicLine:
      "Exception handling, try-catch, exception classes, finally blocks, and AutoCloseable resources",
    focusAreas: [
      "try-catch control flow",
      "Exception classes",
      "finally block behavior",
      "AutoCloseable and resource cleanup",
      "Reading and interpreting exception examples",
    ],
    objectivesAligned: [
      "Explain how Java handles runtime errors with exceptions",
      "Use try-catch blocks to recover from expected failure cases",
      "Identify exception classes and when they apply",
      "Explain when a finally block executes",
      "Recognize AutoCloseable patterns for resource cleanup",
    ],
    outcomeAlignment: [
      "Write Java programs that fail more predictably and communicate errors clearly",
      "Prepare for file, database, networking, and resource-management code that must handle exceptions",
    ],
    syllabusContext: [
      "Module: Exceptions includes overview, lecture pages, quizzes, code examples, reading, and an assignment task",
      "Visible Canvas deadlines: quizzes and Assignment: Exceptions due Jul 5",
    ],
    starterTasks: [
      "Review Exception: Overview",
      "Complete lectures on try-catch, exception classes, finally, and AutoCloseable",
      "Complete the exception quizzes",
      "Review DivideByZeroException.java and Mathematics.java",
      "Submit Assignment: Exceptions",
    ],
    artifacts: [
      "Quiz: Try-Catch Block",
      "Quiz: Exception Classes",
      "Quiz: finally",
      "DivideByZeroException.java",
      "Mathematics.java",
      "Assignment: Exceptions",
    ],
    importantDates: [
      "Jul 5 - Quiz: Try-Catch Block",
      "Jul 5 - Quiz: Exception Classes",
      "Jul 5 - Quiz: finally",
      "Jul 5 - Assignment: Exceptions",
    ],
    assessmentContext: [
      "Quiz: Try-Catch Block - 3 pts",
      "Quiz: Exception Classes - 3 pts",
      "Quiz: finally - 2 pts",
      "Assignment: Exceptions - 10 pts",
    ],
    milestone: "Exceptions quizzes and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the exception overview and connect exception handling to reliable Java program behavior.",
      },
      {
        step: "Lecture",
        description:
          "Study try-catch blocks, exception classes, finally blocks, AutoCloseable resources, and exception reading materials.",
      },
      {
        step: "Code Example",
        description:
          "Review DivideByZeroException.java and Mathematics.java as concrete examples of exception-related Java code.",
      },
      {
        step: "Tasks",
        description:
          "Complete the quizzes and submit Assignment: Exceptions by Jul 5.",
      },
    ],
    readingHighlights: [
      "Exception: Overview",
      "Lecture: The try-catch Block",
      "Lecture: Exception Classes",
      "Lecture: The finally Block",
      "Lecture: Exceptions with AutoClosable",
      "Exceptions: Reading",
    ],
    canvasSections: [
      {
        id: "exceptions",
        title: "Module: Exceptions",
        groups: [
          {
            items: [
              {
                title: "Exception: Overview",
                type: "page",
                defaultCollapsed: true,
                prompt: {
                  title: "Welcome to Module: Exceptions",
                  sections: [
                    {
                      title: "Welcome",
                      paragraphs: [
                        "Get ready to tackle one of the most critical aspects of Java programming: handling exceptions. This module is all about empowering you to write robust and resilient code that can gracefully handle the unexpected. Imagine the confidence you will gain knowing your program can stay afloat even when things go awry.",
                      ],
                    },
                    {
                      title: "Here's what you'll dive into",
                      steps: [
                        {
                          title: "Exception classes",
                          items: [
                            "Explore the different types of exceptions in Java and understand how they help identify and manage errors.",
                          ],
                        },
                        {
                          title: "Declaring methods that may throw exceptions",
                          items: [
                            "Learn how to signal potential issues in your methods, making your code more predictable and easier to debug.",
                          ],
                        },
                        {
                          title: "Throwing exceptions",
                          items: [
                            "Master the art of generating exceptions to handle specific error conditions effectively.",
                          ],
                        },
                        {
                          title: "try-catch blocks",
                          items: [
                            "Discover how to encapsulate risky code and handle errors gracefully, ensuring your program continues to run smoothly.",
                          ],
                        },
                        {
                          title: "try-catch blocks with auto-closable",
                          items: [
                            "Automate resource management and prevent resource leaks with the power of auto-closable in your try-catch blocks.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Tasks",
                      paragraphs: [
                        "Watch the lectures, take the quizzes, and complete the assignment.",
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: The try-catch Block",
                type: "page",
              },
              {
                title: "Quiz: Try-Catch Block",
                type: "quiz",
                dueLabel: "Jul 5",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Exception Classes",
                type: "page",
              },
              {
                title: "Quiz: Exception Classes",
                type: "quiz",
                dueLabel: "Jul 5",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: The finally Block",
                type: "page",
              },
              {
                title: "Quiz: finally",
                type: "quiz",
                dueLabel: "Jul 5",
                pointsLabel: "2 pts",
              },
              {
                title: "Lecture: Exceptions with AutoClosable",
                type: "page",
              },
              {
                title: "Exceptions: Reading",
                type: "page",
              },
            ],
          },
          {
            title: "Code Example",
            items: [
              {
                title: "DivideByZeroException.java",
                type: "attachment",
              },
              {
                title: "Mathematics.java",
                type: "attachment",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Assignment: Exceptions",
                type: "assignment",
                dueLabel: "Jul 5",
                pointsLabel: "10 pts",
                scoreLabel: "Score: 10 / 10 pts",
                defaultCollapsed: true,
                description:
                  "Implement an application that represents a valet parking system which manages 10 parking spots.",
                prompt: {
                  title: "Assignment: Exceptions",
                  sections: [
                    {
                      title: "Question 1 - 10 pts",
                      paragraphs: [
                        "Implement an application that represents a valet parking system which manages 10 parking spots. Create the classes Car.java, NoSpaceAvailableException.java, NoCarException.java, and Valet.java.",
                      ],
                    },
                    {
                      title: "Class Requirements",
                      steps: [
                        {
                          title: "Car.java",
                          items: [
                            "Create a class named Car with two instance variables for make and model with appropriate accessibility levels.",
                            "Add getter and setter methods for each member variable.",
                            "Override the toString() method of java.lang.Object with an appropriate description of a vehicle.",
                          ],
                        },
                        {
                          title: "NoSpaceAvailableException.java",
                          items: [
                            "Create a new exception class used when no parking spot is available.",
                          ],
                        },
                        {
                          title: "NoCarException.java",
                          items: [
                            "Create a new exception class used when a requested spot is invalid or empty.",
                          ],
                        },
                        {
                          title: "Valet.java",
                          items: [
                            "Represent the 10 valet parking spots with an array. Initially, all 10 spots are available.",
                            "Implement void park(Car car) throws NoSpaceAvailableException. It parks the car in the next available spot. If no spot is available, throw NoSpaceAvailableException.",
                            "Implement Car get(int spot) throws NoCarException. It returns the car stored at the specified index. If the index is out of bounds or the spot is empty, throw NoCarException.",
                            "Implement Car leave(int spot) throws NoCarException. It removes and returns the car at the specified spot. If the index is out of bounds or the spot is empty, throw NoCarException.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Solution Note",
                      paragraphs: [
                        'The code below shows the completed solution. Inline comments marked "inserted answer" identify the parts that were filled into the gray Canvas answer boxes.',
                      ],
                    },
                  ],
                },
                codeBlocks: [
                  {
                    title: "Completed Valet Parking Exception Solution",
                    language: "java",
                    code: `public class Car { // inserted answer: Car
    private String make;
    private String model;

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public String toString() {
        return String.format("%s %s", make, model);
    }
}

class NoSpaceAvailableException extends Exception { // inserted answers: extends, Exception
}

class NoCarException extends Exception { // inserted answers: extends, Exception
}

class Valet {
    private Car[] spots = new Car[10]; // inserted answer: new Car[10]

    public void park(Car car) throws NoSpaceAvailableException { // inserted answers: throws, NoSpaceAvailableException
        for (int i = 0; i < spots.length; i++) {
            if (spots[i] == null) {
                spots[i] = car;
                return;
            }
        }
        throw new NoSpaceAvailableException(); // inserted answers: throw, NoSpaceAvailableException()
    }

    public Car get(int spot) throws NoCarException { // inserted answers: throws, NoCarException
        if (spot < 0 || spot >= spots.length || spots[spot] == null) { // inserted answer: spots[spot]
            throw new NoCarException(); // inserted answers: throw, NoCarException()
        }
        return spots[spot];
    }

    public Car leave(int spot) throws NoCarException { // inserted answers: throws, NoCarException
        Car car = get(spot);
        spots[spot] = null; // inserted answer: null
        return car;
    }
}`,
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
        id: "module-5-exceptions",
        title: "Assignment: Exceptions",
        objective:
          "Complete the exception-handling module after studying try-catch blocks, exception classes, finally blocks, AutoCloseable resources, and code examples.",
        tasks: [
          "Review Exception: Overview",
          "Complete the exception lecture and quiz sequence",
          "Review DivideByZeroException.java and Mathematics.java",
          "Submit Assignment: Exceptions by Jul 5",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 5",
          "10 points",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Generics",
    weekLabel: "Module 6",
    dateLabel: "July 9-12",
    overview:
      "This module introduces Java generics as a way to write reusable, type-safe code. It covers generic classes and collections, wildcards, generic methods, bounded type parameters, and the reading and task sequence for the Generics assignment.",
    topicLine:
      "Generic types, wildcards, generic methods, bounded type parameters, and type-safe reusable Java code",
    focusAreas: [
      "Generic classes and type parameters",
      "Type-safe collections",
      "Wildcards",
      "Generic methods",
      "Bounded type parameters",
      "Reading and interpreting generic Java APIs",
    ],
    objectivesAligned: [
      "Explain why Java generics improve type safety and reuse",
      "Use type parameters to create generic classes or containers",
      "Apply wildcards when working with flexible generic APIs",
      "Write generic methods that operate across related types",
      "Use bounded type parameters to constrain acceptable types",
    ],
    outcomeAlignment: [
      "Build reusable Java code that avoids unnecessary casts",
      "Prepare for collection, API, and framework code that depends on generics",
      "Strengthen object-oriented design with type-safe abstractions",
    ],
    syllabusContext: [
      "Module: Generics includes overview, lecture pages, quizzes, reading, discussion, and an assignment task",
      "Visible Canvas deadlines: Discussion: Generics due Jul 9; quizzes and Assignment: Generics due Jul 12",
    ],
    starterTasks: [
      "Review Generics: Overview",
      "Complete lectures on generics, wildcards, generic methods, and bounded type parameters",
      "Complete the generics quizzes",
      "Read Reading: Generics",
      "Post on Discussion: Generics",
      "Submit Assignment: Generics",
    ],
    artifacts: [
      "Quiz: Intro to Generics",
      "Quiz: Generics with Wildcard",
      "Quiz: Generics on Methods",
      "Quiz: Bounded Type Parameters",
      "Discussion: Generics",
      "Assignment: Generics",
    ],
    importantDates: [
      "Jul 9 - Discussion: Generics",
      "Jul 12 - Quiz: Intro to Generics",
      "Jul 12 - Quiz: Generics with Wildcard",
      "Jul 12 - Quiz: Generics on Methods",
      "Jul 12 - Quiz: Bounded Type Parameters",
      "Jul 12 - Assignment: Generics",
    ],
    assessmentContext: [
      "Discussion: Generics - 5 pts",
      "Quiz: Intro to Generics - 3 pts",
      "Quiz: Generics with Wildcard - 3 pts",
      "Quiz: Generics on Methods - 3 pts",
      "Quiz: Bounded Type Parameters - 2 pts",
      "Assignment: Generics - 10 pts",
    ],
    milestone:
      "Generics discussion, quizzes, reading, and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the Generics overview and connect generic types to reusable, type-safe Java code.",
      },
      {
        step: "Lecture",
        description:
          "Study generics, wildcards, generic methods, and bounded type parameters.",
      },
      {
        step: "Tasks",
        description:
          "Complete the discussion, quizzes, reading, and Assignment: Generics by the listed Canvas deadlines.",
      },
    ],
    readingHighlights: [
      "Generics: Overview",
      "Lecture: Generics",
      "Lecture: Generics with Wildcard",
      "Lecture: Generics on Methods",
      "Lecture: Bounded Type Parameters",
      "Reading: Generics",
    ],
    canvasSections: [
      {
        id: "generics",
        title: "Module: Generics",
        groups: [
          {
            items: [
              {
                title: "Generics: Overview",
                type: "page",
                defaultCollapsed: true,
                prompt: {
                  title: "Welcome to Module: Generics",
                  sections: [
                    {
                      title: "Welcome",
                      paragraphs: [
                        "Welcome to the Module: Generics. Get ready to unlock the full power of Java programming with generics! This module is not just about understanding a concept - it's about gaining the ability to write more flexible, efficient, and type-safe code. Generics are like magical placeholders that can adapt to various types, making your code more dynamic and reusable.",
                        "Module link: https://online.smc.edu/courses/83001/modules/619511",
                      ],
                    },
                    {
                      title: "Here's what you'll dive into",
                      steps: [
                        {
                          title: "Generics",
                          items: [
                            "Discover how generics work as powerful type placeholders, allowing you to write code that works with any data type, improving both flexibility and safety.",
                          ],
                        },
                        {
                          title:
                            "Upper- and lower-bound generic type parameters",
                          items: [
                            "Learn how to set boundaries on generics, enabling more precise type control and preventing type-related errors.",
                          ],
                        },
                        {
                          title: "Wildcards",
                          items: [
                            "Explore the versatility of wildcards in generics, giving you the tools to handle unknown types with ease.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Module Goal",
                      paragraphs: [
                        "This module will transform the way you think about and write Java code. Get ready to harness the full potential of generics and elevate your programming skills to new heights!",
                      ],
                    },
                    {
                      title: "Tasks",
                      steps: [
                        {
                          title: "Watch the lectures",
                          items: ["Complete the Generics lecture sequence."],
                        },
                        {
                          title: "Take the quizzes",
                          items: ["Complete the module quizzes."],
                        },
                        {
                          title: "Post on the discussion",
                          items: ["Submit the Generics discussion post."],
                        },
                        {
                          title: "Complete the assignment",
                          items: ["Submit Assignment: Generics."],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: Generics",
                type: "page",
              },
              {
                title: "Quiz: Intro to Generics",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Generics with Wildcard",
                type: "page",
              },
              {
                title: "Quiz: Generics with Wildcard",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Generics on Methods",
                type: "page",
              },
              {
                title: "Quiz: Generics on Methods",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Bounded Type Parameters",
                type: "page",
              },
              {
                title: "Quiz: Bounded Type Parameters",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "2 pts",
              },
              {
                title: "Reading: Generics",
                type: "page",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Discussion: Generics",
                type: "discussion",
                dueLabel: "Jul 9",
                pointsLabel: "5 pts",
              },
              {
                title: "Assignment: Generics",
                type: "assignment",
                dueLabel: "Jul 12",
                pointsLabel: "10 pts",
                scoreLabel: "Score: 10 / 10 pts",
                defaultCollapsed: true,
                description:
                  "Implement a generic Truck class that carries different Load implementations while keeping the truck behavior the same.",
                prompt: {
                  title: "Assignment: Generics Instructions",
                  sections: [
                    {
                      title: "Instructions",
                      paragraphs: [
                        "This is a programming assignment. The problem statement defines the instructions on what to implement. The solution is partially provided with blanks. Before looking at the partial solution, try to program it yourself in an IDE such as Eclipse, NetBeans, or IntelliJ. Once you have a solution, compare it to the provided solution and fill in the gaps. Be very careful to follow proper formatting and make sure the solution with your answers would compile.",
                        "This assignment helps to learn how to use generics in Java effectively. The focus of this assignment is on how to design and use classes with generic type parameters.",
                        "Implement an application that handles different kinds of trucks. All trucks share the same behavior of a regular truck but they provide different purposes in terms of the load they transport, such as a car carrier trailer carries cars, a logging truck carries logs, or refrigerator truck carries refrigerated items. Each truck only distinguishes itself from other trucks by its load.",
                        "Inheritance is not applicable because all functionality is the same and there is no specialized behavior. The property of every truck is also the same and only differs by its data type. That is, the load of a truck is defined by an instance variable in the truck class. This instance variable is defined by a generic parameter that must have the Load interface as an upper bound. The Load interface represents any load a truck can carry. It is implemented by three different classes.",
                      ],
                    },
                    {
                      title: "Create the following types",
                      steps: [
                        {
                          title: "Load",
                          items: [
                            "Create an interface called Load. The interface is empty.",
                          ],
                        },
                        {
                          title: "Car",
                          items: [
                            "Create a class named Car that implements the Load interface. This class is empty but you may add properties.",
                          ],
                        },
                        {
                          title: "TreeLog",
                          items: [
                            "Create a class named TreeLog that implements the Load interface. This class is empty but you may add properties.",
                          ],
                        },
                        {
                          title: "RefrigeratedStorage",
                          items: [
                            "Create a class named RefrigeratedStorage that implements the Load interface. This class is empty but you may add properties.",
                          ],
                        },
                        {
                          title: "Truck",
                          items: [
                            "Create a final class named Truck. Instances of this Truck class should be specialized in the way they handle freight transport.",
                            "Use a generic type parameter in the class definition. The generic parameter must have the Load interface as its upper bound.",
                            "Each truck carries freight defined by an ArrayList instance variable with elements of the generic type parameter. Do not use the Load interface as the element type.",
                            "The exact type of the load instance variable is determined at instantiation time when a variable of the Truck class is declared.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Truck properties",
                      steps: [
                        {
                          title: "freight",
                          items: [
                            "A member variable of type ArrayList named freight. The ArrayList stores objects of the generic type defined in the class definition.",
                          ],
                        },
                        {
                          title: "load(..)",
                          items: [
                            "A method named load(..) that loads one object onto the truck and adds it to the freight list.",
                            "The object is passed in as an argument and must be of the generic type defined in the class definition.",
                          ],
                        },
                        {
                          title: "unload(...)",
                          items: [
                            "A method named unload(...) which expects an index of the element in the freight list to be removed.",
                            "The removed element is returned by the method.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Solution Note",
                      paragraphs: [
                        "The completed solution below fills the Canvas blanks shown in the partial solution: Load, Car, implements, Load, implements, Load, implements, Load, <T extends Load>, <T>, <T>, and T.",
                        "The unload method uses remove(index) so the method both removes and returns the selected freight item, matching the written assignment requirement.",
                      ],
                    },
                  ],
                },
                codeBlocks: [
                  {
                    title: "Completed Truck Generics Solution",
                    language: "java",
                    code: `import java.util.ArrayList;

interface Load {
}

class Car implements Load {
}

class TreeLog implements Load {
}

class RefrigeratedStorage implements Load {
}

public final class Truck<T extends Load> {
    private ArrayList<T> freight = new ArrayList<T>();

    public void load(T item) {
        this.freight.add(item);
    }

    public T unload(int index) {
        return this.freight.remove(index);
    }
}`,
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
        id: "module-6-generics",
        title: "Assignment: Generics",
        objective:
          "Complete the Generics module after reviewing generic types, wildcards, generic methods, bounded type parameters, and the reading.",
        tasks: [
          "Review Generics: Overview",
          "Complete the generics lecture and quiz sequence",
          "Read Reading: Generics",
          "Post Discussion: Generics by Jul 9",
          "Submit Assignment: Generics by Jul 12",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 12",
          "10 points",
          "Assignment content will be added separately",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Design Patterns",
    weekLabel: "Module 7",
    dateLabel: "July 12",
    overview:
      "This module introduces design patterns as reusable solutions to common software design problems. It focuses on the Singleton, Template Method, and Iterator patterns before the Design Patterns assignment.",
    topicLine:
      "Design pattern foundations, Singleton, Template Method, and Iterator",
    focusAreas: [
      "Purpose and value of design patterns",
      "Singleton pattern",
      "Template Method pattern",
      "Iterator pattern",
      "Pattern selection and implementation tradeoffs",
    ],
    objectivesAligned: [
      "Explain why developers use design patterns",
      "Identify the structure and purpose of the Singleton pattern",
      "Identify the structure and purpose of the Template Method pattern",
      "Identify the structure and purpose of the Iterator pattern",
      "Apply design-pattern thinking to Java class design",
    ],
    outcomeAlignment: [
      "Recognize common reusable design structures in Java programs",
      "Improve object-oriented design vocabulary and implementation choices",
      "Prepare for larger Java programs that use established design patterns",
    ],
    syllabusContext: [
      "Module: Design Patterns includes overview, lecture pages, quizzes, and an assignment task",
      "Visible Canvas deadlines: quizzes and Assignment Design Patterns due Jul 12",
    ],
    starterTasks: [
      "Review Design Patterns: Overview",
      "Complete the lecture sequence on design patterns",
      "Complete the Singleton, Template Method, and Iterator quizzes",
      "Submit Assignment Design Patterns",
    ],
    artifacts: [
      "Quiz: The Singleton Design Pattern",
      "Quiz: The Template Method Design Pattern",
      "Quiz: The Iterator Design Pattern",
      "Assignment Design Patterns",
    ],
    importantDates: [
      "Jul 12 - Quiz: The Singleton Design Pattern",
      "Jul 12 - Quiz: The Template Method Design Pattern",
      "Jul 12 - Quiz: The Iterator Design Pattern",
      "Jul 12 - Assignment Design Patterns",
    ],
    assessmentContext: [
      "Quiz: The Singleton Design Pattern - 3 pts",
      "Quiz: The Template Method Design Pattern - 3 pts",
      "Quiz: The Iterator Design Pattern - 3 pts",
      "Assignment Design Patterns - 10 pts",
    ],
    milestone: "Design patterns quizzes and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the design patterns overview and connect patterns to reusable Java design solutions.",
      },
      {
        step: "Lecture",
        description:
          "Study the introduction to design patterns, Singleton, Template Method, and Iterator patterns.",
      },
      {
        step: "Tasks",
        description:
          "Complete the quizzes and submit Assignment Design Patterns by Jul 12.",
      },
    ],
    readingHighlights: [
      "Design Patterns: Overview",
      "Lecture: Intro to Design Patterns",
      "Lecture: The Singleton Design Pattern",
      "Lecture: The Template Method Design Pattern",
      "Lecture: The Iterator Design Pattern",
    ],
    canvasSections: [
      {
        id: "design-patterns",
        title: "Module: Design Patterns",
        groups: [
          {
            items: [
              {
                title: "Design Patterns: Overview",
                type: "page",
                defaultCollapsed: true,
                prompt: {
                  title: "Welcome to the Design Patterns Module",
                  sections: [
                    {
                      title: "Welcome",
                      paragraphs: [
                        "In this module we will cover design patterns. Get ready to dive into the world of design patterns, where you'll discover the secret recipes to solve common programming challenges with elegance and efficiency! This module isn't just about learning solutions; it's about becoming a part of a tradition of excellence shared by seasoned developers around the globe. By mastering design patterns, you'll unlock the ability to write cleaner, more maintainable code, and speak the language of experienced programmers.",
                        "Module link: https://online.smc.edu/courses/83001/modules/619512",
                      ],
                    },
                    {
                      title:
                        "Here's what you'll uncover in this exhilarating journey",
                      steps: [
                        {
                          title: "The three categories of design patterns",
                          items: [
                            "Unveil the different families of design patterns and understand how they address various aspects of software design.",
                          ],
                        },
                        {
                          title: "Overview of 21 design patterns",
                          items: [
                            "Get a whirlwind tour of the most influential design patterns that have stood the test of time, each one a proven solution to a specific problem.",
                          ],
                        },
                        {
                          title: "In-depth study of three key design patterns",
                          items: [
                            "Singleton: Learn how to ensure a class has only one instance and provides a global point of access to it.",
                            "Template Method Pattern: Discover how to define the skeleton of an algorithm in a method, deferring some steps to subclasses.",
                            "Iterator: Master the art of sequentially accessing elements of a collection without exposing its underlying representation.",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Module Goal",
                      paragraphs: [
                        "This module will ignite your passion for design patterns, empowering you to create more robust and elegant software solutions. Get ready to elevate your coding skills and join the ranks of developers who craft code with finesse and precision!",
                      ],
                    },
                    {
                      title: "Tasks",
                      steps: [
                        {
                          title: "Watch the lectures",
                          items: [
                            "Complete the Design Patterns lecture sequence.",
                          ],
                        },
                        {
                          title: "Take the quizzes",
                          items: ["Complete the module quizzes."],
                        },
                        {
                          title: "Complete the assignment",
                          items: ["Submit Assignment Design Patterns."],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: Intro to Design Patterns",
                type: "page",
              },
              {
                title: "Lecture: The Singleton Design Pattern",
                type: "page",
              },
              {
                title: "Quiz: The Singleton Design Pattern",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: The Template Method Design Pattern",
                type: "page",
              },
              {
                title: "Quiz: The Template Method Design Pattern",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: The Iterator Design Pattern",
                type: "page",
              },
              {
                title: "Quiz: The Iterator Design Pattern",
                type: "quiz",
                dueLabel: "Jul 12",
                pointsLabel: "3 pts",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Assignment Design Patterns",
                type: "assignment",
                dueLabel: "Jul 12",
                pointsLabel: "10 pts",
                scoreLabel: "Score: 10 / 10 pts",
                defaultCollapsed: true,
                description:
                  "Complete the Design Patterns assignment covering pattern categories and the Iterator design pattern.",
                prompt: {
                  title: "Assignment Design Patterns Instructions",
                  sections: [
                    {
                      title: "Attempt Notice",
                      paragraphs: [
                        "You only have a single attempt to submit. Please be very careful not to submit by accident and make sure to have all questions answered to your satisfaction.",
                        "You have unlimited time and you may move away from the quiz and come back another time as long as you don't submit.",
                        "Score for this quiz: 10 out of 10.",
                      ],
                    },
                    {
                      title: "Question 1 - 1 / 1 pts",
                      paragraphs: [
                        "Design Patterns provide solutions to common problems. They are organized into which categories? Check all that apply.",
                      ],
                      steps: [
                        {
                          title: "Correct selections",
                          items: ["Creational", "Behavioral", "Structural"],
                        },
                        {
                          title: "Not selected",
                          items: [
                            "Programmable",
                            "Relational",
                            "Destructional",
                          ],
                        },
                      ],
                    },
                    {
                      title: "Question 2 - 4.5 / 4.5 pts",
                      paragraphs: [
                        "Please fill in the blanks in the code below that follows the Iterator design pattern. The code below defines two interfaces for creating an iterator and iterating over a string collection. It then implements two classes that implement the interfaces. Note that the code does not use the interfaces provided by the java.util package.",
                        "WARNING: Watch out for correct spelling and proper syntax! Any incorrect syntax would be a compile error and will be flagged as incorrect.",
                      ],
                    },
                    {
                      title: "Solution Note",
                      paragraphs: [
                        "The completed solution below fills the Canvas blanks shown in the partial solution: hasNext(), next(), Iterator, Iterator, Iterable, createIterator(), and MyListIterator().",
                        "The MyListIterator body is filled in so this example is self-contained and compiles while preserving the Iterator design pattern from the prompt.",
                      ],
                    },
                  ],
                },
                codeBlocks: [
                  {
                    title: "Completed Iterator Design Pattern Solution",
                    language: "java",
                    code: `interface Iterator {
    boolean hasNext();

    String next();
}

interface Iterable {
    Iterator createIterator();
}

class MyListIterator implements Iterator {
    private final String[] items = {"Singleton", "Template Method", "Iterator"};
    private int currentIndex = 0;

    @Override
    public boolean hasNext() {
        return currentIndex < items.length;
    }

    @Override
    public String next() {
        return items[currentIndex++];
    }
}

class MyList implements Iterable {
    public Iterator createIterator() {
        return new MyListIterator();
    }
}`,
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
        id: "module-7-design-patterns",
        title: "Assignment Design Patterns",
        objective:
          "Complete the Design Patterns module after reviewing the introduction, Singleton, Template Method, and Iterator pattern materials.",
        tasks: [
          "Review Design Patterns: Overview",
          "Complete the design patterns lecture and quiz sequence",
          "Submit Assignment Design Patterns by Jul 12",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 12",
          "10 points",
          "Assignment content will be added separately",
        ],
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
