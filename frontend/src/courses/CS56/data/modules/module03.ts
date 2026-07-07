import type { CS56ModuleBlueprint } from "../types";

import { cs56Module03CanvasSections } from "./module03CanvasSections";
import { cs56Module03TextTasks } from "./module03TextTasks";

export const cs56Module03Blueprint = {
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
  canvasSections: cs56Module03CanvasSections,
  textTasks: cs56Module03TextTasks,
} satisfies CS56ModuleBlueprint;
