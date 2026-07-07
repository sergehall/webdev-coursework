import type { CS56ModuleBlueprint } from "../types";

import { cs56Module15CanvasSections } from "./module15CanvasSections";
import { cs56Module15TextTasks } from "./module15TextTasks";

export const cs56Module15Blueprint = {
  id: 15,
  title: "Final Exam",
  weekLabel: "Module 15",
  dateLabel: "July 31",
  overview:
    "The final module contains the course overview page and the Final Exam assessment.",
  topicLine: "Final Exam overview and assessment",
  focusAreas: ["Final Exam", "Course completion"],
  objectivesAligned: [
    "Review the final module overview",
    "Complete the Final Exam assessment",
  ],
  outcomeAlignment: [
    "Demonstrate understanding of CS 56 course topics",
    "Complete the final assessment checkpoint",
  ],
  syllabusContext: [
    "Module: Final Exam includes the overview page and Final Exam assessment",
    "Visible Canvas deadline: Final Exam due Jul 31",
  ],
  starterTasks: ["Review Module: Overview", "Complete the Final Exam"],
  artifacts: ["Final Exam"],
  importantDates: ["Jul 31 - Final Exam"],
  assessmentContext: ["Final Exam - 98 pts"],
  milestone: "Final Exam completed",
  moduleSummary: [
    {
      step: "Overview",
      description: "Review the final module overview before the exam.",
    },
    {
      step: "Assessment",
      description: "Complete the Final Exam by Jul 31.",
    },
  ],
  readingHighlights: ["Module: Overview"],
  canvasSections: cs56Module15CanvasSections,
  textTasks: cs56Module15TextTasks,
} satisfies CS56ModuleBlueprint;
