import type { CS56ModuleBlueprint } from "../types";

import { cs56Module13CanvasSections } from "./module13CanvasSections";
import { cs56Module13TextTasks } from "./module13TextTasks";

export const cs56Module13Blueprint = {
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
  canvasSections: cs56Module13CanvasSections,
  textTasks: cs56Module13TextTasks,
} satisfies CS56ModuleBlueprint;
