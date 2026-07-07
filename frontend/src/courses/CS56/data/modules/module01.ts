import type { CS56ModuleBlueprint } from "../types";

import { cs56Module01CanvasSections } from "./module01CanvasSections";
import { cs56Module01TextTasks } from "./module01TextTasks";

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
  canvasSections: cs56Module01CanvasSections,
  textTasks: cs56Module01TextTasks,
} satisfies CS56ModuleBlueprint;
