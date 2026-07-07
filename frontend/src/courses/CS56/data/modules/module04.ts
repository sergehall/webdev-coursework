import type { CS56ModuleBlueprint } from "../types";

import { cs56Module04CanvasSections } from "./module04CanvasSections";
import { cs56Module04TextTasks } from "./module04TextTasks";

export const cs56Module04Blueprint = {
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
  canvasSections: cs56Module04CanvasSections,
  textTasks: cs56Module04TextTasks,
} satisfies CS56ModuleBlueprint;
