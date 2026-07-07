import type { CS56ModuleBlueprint } from "../types";

import { cs56Module07CanvasSections } from "./module07CanvasSections";
import { cs56Module07TextTasks } from "./module07TextTasks";

export const cs56Module07Blueprint = {
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
  canvasSections: cs56Module07CanvasSections,
  textTasks: cs56Module07TextTasks,
} satisfies CS56ModuleBlueprint;
