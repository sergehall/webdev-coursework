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
    title: "Midterm",
    weekLabel: "Module 8",
    dateLabel: "July 13",
    overview:
      "This module is the midterm checkpoint for CS 56. It includes a module overview and the Midterm assessment.",
    topicLine: "Midterm overview and assessment",
    focusAreas: ["Midterm preparation", "Midterm assessment"],
    objectivesAligned: [
      "Review the course topics covered before the midterm",
      "Complete the Midterm assessment in Canvas",
    ],
    outcomeAlignment: [
      "Demonstrate understanding of the first half of CS 56",
      "Use the midterm as a checkpoint before continuing to later modules",
    ],
    syllabusContext: [
      "Module: Midterm includes a module overview and the Midterm assessment",
      "Visible Canvas deadline: Midterm due Jul 13",
    ],
    starterTasks: ["Review Module Overview", "Complete the Midterm"],
    artifacts: ["Midterm"],
    importantDates: ["Jul 13 - Midterm"],
    assessmentContext: ["Midterm - 100 pts"],
    milestone: "Midterm completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Review the midterm module overview and prepare for the assessment.",
      },
      {
        step: "Assessment",
        description: "Complete the Midterm assessment by Jul 13.",
      },
    ],
    readingHighlights: ["Module Overview"],
    canvasSections: [
      {
        id: "midterm",
        title: "Module: Midterm",
        groups: [
          {
            items: [
              {
                title: "Module Overview",
                type: "page",
                defaultCollapsed: true,
                prompt: {
                  title: "Welcome to the Module: Midterm",
                  sections: [
                    {
                      title: "Welcome",
                      paragraphs: [
                        "Welcome to the Module: Midterm.",
                        "Module link: https://online.smc.edu/courses/83001/modules/619513",
                        "This week will be the midterm. Here's more info:",
                        "Midterm link: https://online.smc.edu/courses/83001/quizzes/512238",
                      ],
                    },
                    {
                      title: "What?",
                      paragraphs: [
                        "The midterm will consist of 33 questions. It will cover all modules so far. The multiple choice part will be similar to the quizzes you have completed in the modules. The programming questions will be similar to the assignments you have completed in the modules.",
                        "You should also know what design patterns are and the three categories. In particular you should know the design patterns discussed: Singleton, Template Method, Iterator.",
                      ],
                    },
                    {
                      title: "How?",
                      paragraphs: [
                        "You need to answer all questions on Canvas without any other program open. Please be sure to close all notifications on your desktop. Leave the Canvas exam tab open at all times.",
                        "You may use notes or the book while taking the exam but be sure to not close the exam tab on your computer. Also, be mindful of the time available. Answer easier questions first and those that may result in a higher score.",
                      ],
                    },
                    {
                      title: "When?",
                      paragraphs: [
                        "Please reserve an uninterrupted block of 60 minutes to complete the midterm. You may take it at any time during the dates specified.",
                      ],
                    },
                    {
                      title: "Anything else?",
                      paragraphs: [
                        "No, the main focus for you will be to review topics and study for the midterm. There won't be any new material covered and no other tasks to be completed in this module.",
                        "Happy programming!",
                      ],
                    },
                  ],
                },
              },
              {
                title: "Midterm",
                type: "assignment",
                dueLabel: "Jul 13",
                pointsLabel: "100 pts",
              },
            ],
          },
        ],
      },
    ],
    textTasks: [
      {
        id: "module-8-midterm",
        title: "Midterm",
        objective:
          "Complete the midterm checkpoint after reviewing the module overview.",
        tasks: ["Review Module Overview", "Complete the Midterm by Jul 13"],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 13",
          "100 points",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Collections (Data Structures)",
    weekLabel: "Module 9",
    dateLabel: "July 19",
    overview:
      "This module introduces Java collections and data structures. It covers ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, HashMap, examples, reading, and the Collections assignment.",
    topicLine:
      "Collections, ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, and HashMap",
    focusAreas: [
      "ArrayList and LinkedList",
      "Hashing",
      "equals and hashCode",
      "Set and HashSet",
      "Map and HashMap",
      "Collection examples and reading",
    ],
    objectivesAligned: [
      "Use Java list implementations for ordered collections",
      "Explain how hashing supports efficient lookup",
      "Implement or reason about equals and hashCode behavior",
      "Use Set and Map collections appropriately",
      "Read and adapt Java collection examples",
    ],
    outcomeAlignment: [
      "Build Java programs that choose appropriate data structures",
      "Prepare for later modules that rely on collections and lookup structures",
    ],
    syllabusContext: [
      "Module: Collections (Data Structures) includes overview, lecture pages, quizzes, examples, reading, and an assignment task",
      "Visible Canvas deadlines: collection quizzes and Assignment: Collections due Jul 19",
    ],
    starterTasks: [
      "Review Collections: Overview",
      "Complete the collections lecture sequence",
      "Complete the ArrayList, LinkedList, Equals, HashCode, and Set & Map quizzes",
      "Review the Java example files",
      "Read Reading: Collections",
      "Submit Assignment: Collections",
    ],
    artifacts: [
      "Quiz: ArrayList",
      "Quiz: LinkedList",
      "Quiz: Equals",
      "Quiz: HashCode",
      "Quiz: Set & Map",
      "Employee.java",
      "ListExample.java",
      "SetExample.java",
      "MapExample.java",
      "Assignment: Collections",
    ],
    importantDates: [
      "Jul 19 - Quiz: ArrayList",
      "Jul 19 - Quiz: LinkedList",
      "Jul 19 - Quiz: Equals",
      "Jul 19 - Quiz: HashCode",
      "Jul 19 - Quiz: Set & Map",
      "Jul 19 - Assignment: Collections",
    ],
    assessmentContext: [
      "Quiz: ArrayList - 4 pts",
      "Quiz: LinkedList - 3 pts",
      "Quiz: Equals - 3 pts",
      "Quiz: HashCode - 3 pts",
      "Quiz: Set & Map - 4 pts",
      "Assignment: Collections - 10 pts",
    ],
    milestone:
      "Collections quizzes, examples, reading, and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the collections overview and connect the module to Java data structure choices.",
      },
      {
        step: "Lecture",
        description:
          "Study ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, and HashMap.",
      },
      {
        step: "Examples",
        description:
          "Review Employee.java, ListExample.java, SetExample.java, and MapExample.java.",
      },
      {
        step: "Tasks",
        description:
          "Complete the quizzes, reading, and Assignment: Collections by Jul 19.",
      },
    ],
    readingHighlights: [
      "Collections: Overview",
      "Lecture: The ArrayList Class",
      "Lecture: The LinkedList Class",
      "Lecture: Hashing",
      "Lecture: The equals Methods",
      "Lecture: The hashCode Method",
      "Lecture: Set and HashSet",
      "Lecture: Map and HashMap",
      "Reading: Collections",
    ],
    canvasSections: [
      {
        id: "collections-data-structures",
        title: "Module: Collections (Data Structures)",
        groups: [
          {
            items: [
              {
                title: "Collections: Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: The ArrayList Class",
                type: "page",
              },
              {
                title: "Quiz: ArrayList",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "4 pts",
              },
              {
                title: "Lecture: The LinkedList Class",
                type: "page",
              },
              {
                title: "Quiz: LinkedList",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: ArrayList & LinkedList Example",
                type: "page",
              },
              {
                title: "Lecture: Hashing",
                type: "page",
              },
              {
                title: "Lecture: The equals Methods",
                type: "page",
              },
              {
                title: "Quiz: Equals",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: The hashCode Method",
                type: "page",
              },
              {
                title: "Quiz: HashCode",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Set and HashSet",
                type: "page",
              },
              {
                title: "Lecture: Map and HashMap",
                type: "page",
              },
              {
                title: "Quiz: Set & Map",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "4 pts",
              },
              {
                title: "Lecture: HashCode & Equals Example",
                type: "page",
              },
              {
                title: "Reading: Collections",
                type: "page",
              },
            ],
          },
          {
            title: "Examples",
            items: [
              {
                title: "Employee.java",
                type: "attachment",
              },
              {
                title: "ListExample.java",
                type: "attachment",
              },
              {
                title: "SetExample.java",
                type: "attachment",
              },
              {
                title: "MapExample.java",
                type: "attachment",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Assignment: Collections",
                type: "assignment",
                dueLabel: "Jul 19",
                pointsLabel: "10 pts",
                defaultCollapsed: true,
                description:
                  "Assignment details will be filled in separately after the module shell matches Canvas.",
              },
            ],
          },
        ],
      },
    ],
    textTasks: [
      {
        id: "module-9-collections",
        title: "Assignment: Collections",
        objective:
          "Complete the Collections module after reviewing lists, hashing, equals, hashCode, sets, maps, examples, and reading.",
        tasks: [
          "Review Collections: Overview",
          "Complete the collections lecture and quiz sequence",
          "Review the Java example files",
          "Read Reading: Collections",
          "Submit Assignment: Collections by Jul 19",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 19",
          "10 points",
          "Assignment content will be added separately",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Networking",
    weekLabel: "Module 10",
    dateLabel: "July 19",
    overview:
      "This module introduces networking concepts for Java applications. It covers client-server applications, web applications, networking code examples, and a discussion task.",
    topicLine: "Networking, client-server applications, and web applications",
    focusAreas: [
      "Client-server applications",
      "Web applications",
      "Java networking code examples",
      "Networking discussion",
    ],
    objectivesAligned: [
      "Explain the structure of client-server applications",
      "Describe how web applications fit into networking concepts",
      "Review Java networking examples",
      "Participate in the networking discussion",
    ],
    outcomeAlignment: [
      "Prepare for network-aware Java programs",
      "Connect Java application structure to client-server and web communication",
    ],
    syllabusContext: [
      "Module: Networking includes overview, lecture pages, quizzes, code examples, and a discussion task",
      "Visible Canvas deadlines: networking quizzes due Jul 19 and Discussion: Networking due Jul 16",
    ],
    starterTasks: [
      "Review Networking Overview",
      "Complete the client-server and web application lecture sequence",
      "Complete the Client-Server Application and Web Application quizzes",
      "Review ChatClient.java and EchoServer.java",
      "Post on Discussion: Networking",
    ],
    artifacts: [
      "Quiz: Client-Server Application",
      "Quiz: Web Application",
      "ChatClient.java",
      "EchoServer.java",
      "Discussion: Networking",
    ],
    importantDates: [
      "Jul 16 - Discussion: Networking",
      "Jul 19 - Quiz: Client-Server Application",
      "Jul 19 - Quiz: Web Application",
    ],
    assessmentContext: [
      "Quiz: Client-Server Application - 3 pts",
      "Quiz: Web Application - 4 pts",
      "Discussion: Networking - 5 pts",
    ],
    milestone:
      "Networking lectures, quizzes, code examples, and discussion completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the networking overview and connect the module to Java communication patterns.",
      },
      {
        step: "Lecture",
        description: "Study client-server applications and web applications.",
      },
      {
        step: "Examples",
        description: "Review ChatClient.java and EchoServer.java.",
      },
      {
        step: "Tasks",
        description:
          "Complete the quizzes and Discussion: Networking by the Canvas due dates.",
      },
    ],
    readingHighlights: [
      "Networking Overview",
      "Lecture: Client Server Application",
      "Lecture: Web Application",
      "ChatClient.java",
      "EchoServer.java",
    ],
    canvasSections: [
      {
        id: "networking",
        title: "Module: Networking",
        groups: [
          {
            items: [
              {
                title: "Networking Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: Client Server Application",
                type: "page",
              },
              {
                title: "Quiz: Client-Server Application",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: Web Application",
                type: "page",
              },
              {
                title: "Quiz: Web Application",
                type: "quiz",
                dueLabel: "Jul 19",
                pointsLabel: "4 pts",
              },
            ],
          },
          {
            title: "Code Example",
            items: [
              {
                title: "ChatClient.java",
                type: "attachment",
              },
              {
                title: "EchoServer.java",
                type: "attachment",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Discussion: Networking",
                type: "discussion",
                dueLabel: "Jul 16",
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
        id: "module-10-networking",
        title: "Discussion: Networking",
        objective:
          "Complete the Networking module after reviewing client-server applications, web applications, and Java networking code examples.",
        tasks: [
          "Review Networking Overview",
          "Complete the networking lecture and quiz sequence",
          "Review ChatClient.java and EchoServer.java",
          "Post on Discussion: Networking by Jul 16",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 16",
          "5 points",
          "Discussion content will be added separately",
        ],
      },
    ],
  },
  {
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
  },
  {
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
  },
  {
    id: 13,
    title: "Multithreading",
    weekLabel: "Module 13",
    dateLabel: "July 31",
    overview:
      "This module introduces multithreading and synchronization in Java. It covers thread-based execution, synchronization, quizzes, and the Multithreading assignment.",
    topicLine: "Multithreading, synchronization, and thread-safe Java code",
    focusAreas: [
      "Multithreading",
      "Thread execution",
      "Synchronization",
      "Thread-safe behavior",
    ],
    objectivesAligned: [
      "Explain basic Java multithreading concepts",
      "Recognize when synchronization is needed",
      "Complete the multithreading and synchronization quizzes",
      "Submit the Multithreading assignment",
    ],
    outcomeAlignment: [
      "Build Java programs that can reason about concurrent execution",
      "Prepare for safer shared-state programming",
    ],
    syllabusContext: [
      "Module: Multithreading includes overview, lecture pages, quizzes, and an assignment task",
      "Visible Canvas deadlines: multithreading quizzes and Assignment: Multithreading due Jul 31",
    ],
    starterTasks: [
      "Review Multithreading: Overview",
      "Complete the Multithreading and Synchronization lectures",
      "Complete the Multithreading and Synchronization quizzes",
      "Submit Assignment: Multithreading",
    ],
    artifacts: [
      "Quiz: Multithreading",
      "Quiz: Synchronization",
      "Assignment: Multithreading",
    ],
    importantDates: [
      "Jul 31 - Quiz: Multithreading",
      "Jul 31 - Quiz: Synchronization",
      "Jul 31 - Assignment: Multithreading",
    ],
    assessmentContext: [
      "Quiz: Multithreading - 4 pts",
      "Quiz: Synchronization - 3 pts",
      "Assignment: Multithreading - 10 pts",
    ],
    milestone: "Multithreading lectures, quizzes, and assignment completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the multithreading overview and connect the module to concurrent Java execution.",
      },
      {
        step: "Lecture",
        description: "Study multithreading and synchronization.",
      },
      {
        step: "Tasks",
        description:
          "Complete the quizzes and Assignment: Multithreading by Jul 31.",
      },
    ],
    readingHighlights: [
      "Multithreading: Overview",
      "Lecture: Multithreading",
      "Lecture: Synchronization",
    ],
    canvasSections: [
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
    ],
    textTasks: [
      {
        id: "module-13-multithreading",
        title: "Assignment: Multithreading",
        objective:
          "Complete the Multithreading module after reviewing thread execution and synchronization.",
        tasks: [
          "Review Multithreading: Overview",
          "Complete the multithreading lecture and quiz sequence",
          "Submit Assignment: Multithreading by Jul 31",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 31",
          "10 points",
          "Assignment content will be added separately",
        ],
      },
    ],
  },
  {
    id: 14,
    title: "Database with JDBC",
    weekLabel: "Module 14",
    dateLabel: "July 31",
    overview:
      "This module introduces relational databases, MySQL, SQL, and Java database connectivity. It covers database setup, SQL basics, connecting to MySQL, example Java files, and a database discussion.",
    topicLine: "Relational databases, MySQL, SQL, and JDBC connections",
    focusAreas: [
      "Relational databases",
      "MySQL installation",
      "Structured Query Language (SQL)",
      "Connecting Java to MySQL",
      "NetBeans project setup with MySQL",
      "Database code examples",
    ],
    objectivesAligned: [
      "Explain the role of relational databases",
      "Review MySQL installation and connection workflows",
      "Understand introductory SQL concepts",
      "Connect Java project setup to MySQL database usage",
      "Participate in the database discussion",
    ],
    outcomeAlignment: [
      "Prepare Java applications to work with persistent relational data",
      "Connect database concepts to Java application code",
    ],
    syllabusContext: [
      "Database with JDBC includes overview, lecture pages, a quiz, code examples, and a discussion task",
      "Visible Canvas deadlines: Quiz: Databases and Discussion: Database due Jul 31",
    ],
    starterTasks: [
      "Review Database: Overview",
      "Complete the database and MySQL lecture sequence",
      "Complete Quiz: Databases",
      "Review Database.java and Employee.java",
      "Post on Discussion: Database",
    ],
    artifacts: [
      "Quiz: Databases",
      "Database.java",
      "Employee.java",
      "Discussion: Database",
    ],
    importantDates: [
      "Jul 31 - Quiz: Databases",
      "Jul 31 - Discussion: Database",
    ],
    assessmentContext: [
      "Quiz: Databases - 3 pts",
      "Discussion: Database - 3 pts",
    ],
    milestone:
      "Database with JDBC lectures, quiz, examples, and discussion completed",
    moduleSummary: [
      {
        step: "Overview",
        description:
          "Start with the database overview and connect the module to relational data.",
      },
      {
        step: "Lecture",
        description:
          "Study relational databases, MySQL installation, SQL, MySQL connections, and NetBeans setup.",
      },
      {
        step: "Examples",
        description: "Review Database.java and Employee.java.",
      },
      {
        step: "Tasks",
        description:
          "Complete Quiz: Databases and Discussion: Database by Jul 31.",
      },
    ],
    readingHighlights: [
      "Database: Overview",
      "Lecture: Intro to relational Databases",
      "Lecture: How to install MySQL",
      "Lecture: Structured Query Language (SQL)",
      "Lecture: How to connect to MySQL",
      "Project Setup with MySQL - NetBeans",
    ],
    canvasSections: [
      {
        id: "database-with-jdbc",
        title: "Database with JDBC",
        groups: [
          {
            items: [
              {
                title: "Database: Overview",
                type: "page",
              },
            ],
          },
          {
            title: "Lecture",
            items: [
              {
                title: "Lecture: Intro to relational Databases",
                type: "page",
              },
              {
                title: "Lecture: How to install MySQL",
                type: "page",
              },
              {
                title: "Lecture: Structured Query Language (SQL)",
                type: "page",
              },
              {
                title: "Quiz: Databases",
                type: "quiz",
                dueLabel: "Jul 31",
                pointsLabel: "3 pts",
              },
              {
                title: "Lecture: How to connect to MySQL",
                type: "page",
              },
              {
                title: "Project Setup with MySQL - NetBeans",
                type: "page",
              },
            ],
          },
          {
            title: "Code Example",
            items: [
              {
                title: "Database.java",
                type: "attachment",
              },
              {
                title: "Employee.java",
                type: "attachment",
              },
            ],
          },
          {
            title: "Tasks",
            items: [
              {
                title: "Discussion: Database",
                type: "discussion",
                dueLabel: "Jul 31",
                pointsLabel: "3 pts",
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
        id: "module-14-database-discussion",
        title: "Discussion: Database",
        objective:
          "Complete the Database with JDBC module after reviewing relational databases, MySQL, SQL, Java database connection setup, and code examples.",
        tasks: [
          "Review Database: Overview",
          "Complete the database lecture and quiz sequence",
          "Review Database.java and Employee.java",
          "Post on Discussion: Database by Jul 31",
        ],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 31",
          "3 points",
          "Discussion content will be added separately",
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Final Exam",
    weekLabel: "Module 15",
    dateLabel: "July 31",
    overview:
      "The final module contains the course overview page and the Final Exam assessment.",
    topicLine: "Final Exam overview and assessment",
    focusAreas: ["Final Exam", "Course completion"],
    objectivesAligned: [
      "Review the final module overview",
      "Complete the Final Exam assessment",
    ],
    outcomeAlignment: [
      "Demonstrate understanding of CS 56 course topics",
      "Complete the final assessment checkpoint",
    ],
    syllabusContext: [
      "Module: Final Exam includes the overview page and Final Exam assessment",
      "Visible Canvas deadline: Final Exam due Jul 31",
    ],
    starterTasks: ["Review Module: Overview", "Complete the Final Exam"],
    artifacts: ["Final Exam"],
    importantDates: ["Jul 31 - Final Exam"],
    assessmentContext: ["Final Exam - 98 pts"],
    milestone: "Final Exam completed",
    moduleSummary: [
      {
        step: "Overview",
        description: "Review the final module overview before the exam.",
      },
      {
        step: "Assessment",
        description: "Complete the Final Exam by Jul 31.",
      },
    ],
    readingHighlights: ["Module: Overview"],
    canvasSections: [
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
    ],
    textTasks: [
      {
        id: "module-15-final-exam",
        title: "Final Exam",
        objective: "Complete the CS 56 Final Exam assessment.",
        tasks: ["Review Module: Overview", "Complete Final Exam by Jul 31"],
        submissionInstructions: [
          "Submit through SMC Canvas",
          "Due: Jul 31",
          "98 points",
        ],
      },
    ],
  },
];
