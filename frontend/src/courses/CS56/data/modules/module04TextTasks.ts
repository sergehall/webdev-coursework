import type { CS56ModuleBlueprint } from "../types";

export const cs56Module04TextTasks = [
  {
    id: "module-4-uml-discussion",
    title: "Discussion: UML",
    objective:
      "Participate in the UML discussion after reviewing the overview and lecture materials.",
    tasks: [
      "Review what UML is and why developers use it",
      "Review the class diagram and sequence diagram lecture pages",
      "Use the text-only Library Management System response as the discussion answer",
      "Post on Discussion: UML by Jul 2",
    ],
    submissionInstructions: [
      "Submit through SMC Canvas discussion",
      "Due: Jul 2",
      "5 points",
    ],
  },
  {
    id: "module-4-uml-assignment",
    title: "Assignment: UML",
    objective:
      "Complete the UML assignment after studying UML foundations, class diagrams, sequence diagrams, and PlantUML setup.",
    tasks: [
      "Complete the UML overview and lecture sequence",
      "Use UML notation to model program structure or behavior as required by Canvas",
      "Submit Assignment: UML by Jul 5",
    ],
    submissionInstructions: [
      "Submit through SMC Canvas",
      "Due: Jul 5",
      "10 points",
    ],
  },
] satisfies CS56ModuleBlueprint["textTasks"];
