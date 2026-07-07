import type { CS56ModuleBlueprint } from "../types";

import { cs56Module02CanvasSections } from "./module02CanvasSections";
import { cs56Module02TextTasks } from "./module02TextTasks";

export const cs56Module02Blueprint = {
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
  canvasSections: cs56Module02CanvasSections,
  textTasks: cs56Module02TextTasks,
} satisfies CS56ModuleBlueprint;
