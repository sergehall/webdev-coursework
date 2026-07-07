import type { CS56ModuleBlueprint } from "../types";

export const cs56Module14Blueprint = {
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
  importantDates: ["Jul 31 - Quiz: Databases", "Jul 31 - Discussion: Database"],
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
} satisfies CS56ModuleBlueprint;
