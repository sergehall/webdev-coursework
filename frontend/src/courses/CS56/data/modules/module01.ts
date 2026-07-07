import type { CS56ModuleBlueprint } from "../types";

export const cs56Module01Blueprint = {
  id: 1,
  title: "Getting Started and Java Review",
  weekLabel: "Module 1",
  dateLabel: "June 23-28",
  overview:
    "This opening module combines the course orientation materials with a focused Java review. It starts with policies, guidelines, and welcome tasks, then moves into setup, lectures, quizzes, reading, and the Java Review assignment.",
  topicLine: "Getting Started, setup, Java basics review, and first assignment",
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
} satisfies CS56ModuleBlueprint;
