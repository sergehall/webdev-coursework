import type { CS56ModuleBlueprint } from "../types";

import { cs56Module05CanvasSections } from "./module05CanvasSections";
import { cs56Module05TextTasks } from "./module05TextTasks";

export const cs56Module05Blueprint = {
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
  canvasSections: cs56Module05CanvasSections,
  textTasks: cs56Module05TextTasks,
} satisfies CS56ModuleBlueprint;
