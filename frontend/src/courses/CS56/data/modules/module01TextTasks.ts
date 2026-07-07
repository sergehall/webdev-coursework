import type { CS56ModuleBlueprint } from "../types";

export const cs56Module01TextTasks = [
  {
    id: "module-1-starter",
    title: "Assignment: Java Review",
    objective:
      "Complete the first Java Review assignment after finishing setup, lectures, quizzes, and the Java Review reading.",
    tasks: [
      "Verify the JDK and Maven are installed",
      "Create the Java project described in the module setup",
      "Review Java basics through classes and objects",
      "Submit the Java Review assignment by Jun 28",
    ],
    submissionInstructions: [
      "Submit through SMC Canvas",
      "Due: Jun 28",
      "20 points",
    ],
    resourceSections: [
      {
        title: "Source Files",
        items: [
          "ExpenseTrackerApp.java",
          "ExpenseManager.java",
          "Expense.java",
        ],
      },
    ],
  },
] satisfies CS56ModuleBlueprint["textTasks"];
