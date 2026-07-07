import type { CS56ModuleBlueprint } from "../types";

import { cs56Module06CanvasSections } from "./module06CanvasSections";
import { cs56Module06TextTasks } from "./module06TextTasks";

export const cs56Module06Blueprint = {
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
  milestone: "Generics discussion, quizzes, reading, and assignment completed",
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
  canvasSections: cs56Module06CanvasSections,
  textTasks: cs56Module06TextTasks,
} satisfies CS56ModuleBlueprint;
