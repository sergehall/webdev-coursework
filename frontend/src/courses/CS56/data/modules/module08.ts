import type { CS56ModuleBlueprint } from "../types";

import { cs56Module08CanvasSections } from "./module08CanvasSections";
import { cs56Module08TextTasks } from "./module08TextTasks";

export const cs56Module08Blueprint = {
  id: 8,
  title: "Midterm",
  weekLabel: "Module 8",
  dateLabel: "July 13",
  overview:
    "This module is the midterm checkpoint for CS 56. It includes a module overview and the Midterm assessment.",
  topicLine: "Midterm overview and assessment",
  focusAreas: ["Midterm preparation", "Midterm assessment"],
  objectivesAligned: [
    "Review the course topics covered before the midterm",
    "Complete the Midterm assessment in Canvas",
  ],
  outcomeAlignment: [
    "Demonstrate understanding of the first half of CS 56",
    "Use the midterm as a checkpoint before continuing to later modules",
  ],
  syllabusContext: [
    "Module: Midterm includes a module overview and the Midterm assessment",
    "Visible Canvas deadline: Midterm due Jul 13",
  ],
  starterTasks: ["Review Module Overview", "Complete the Midterm"],
  artifacts: ["Midterm"],
  importantDates: ["Jul 13 - Midterm"],
  assessmentContext: ["Midterm - 100 pts"],
  milestone: "Midterm completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Review the midterm module overview and prepare for the assessment.",
    },
    {
      step: "Assessment",
      description: "Complete the Midterm assessment by Jul 13.",
    },
  ],
  readingHighlights: ["Module Overview"],
  canvasSections: cs56Module08CanvasSections,
  textTasks: cs56Module08TextTasks,
} satisfies CS56ModuleBlueprint;
