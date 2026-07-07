import type { CS85ModuleBlueprint } from "./types";

const weeklyAssignmentContext = [
  "Confirm the current Canvas module instructions before submitting.",
  "Track reading notes, code experiments, screenshots, and reflection notes here as assignments are released.",
  "Disclose AI assistance when used, including the tool and how it supported the work.",
];

export const standardAssessmentContext = [
  "Canvas module assignment — details to be filled as released",
  "Canvas discussion or engagement activity — details to be filled as released",
  "Canvas quiz — details to be filled as released",
  "Course grading context: quizzes 40%, weekly assignments/discussions 40%, final project 20%",
];

export const createModule = (
  id: number,
  title: string,
  weekLabel: string,
  dateLabel: string,
  dueLabel: string,
  focusAreas: string[],
  starterTasks: string[],
  milestone: string,
  isFinalProject = false
): CS85ModuleBlueprint => ({
  id,
  title,
  weekLabel,
  dateLabel,
  dueLabel,
  overview: `${title} anchors ${weekLabel.toLowerCase()} of CS 85. This portal entry captures the syllabus topic now and leaves room to add Canvas assignment details, code artifacts, screenshots, quiz notes, and reflection once the module opens.`,
  topicLine: `Scheduled topic: ${title}`,
  focusAreas,
  objectivesAligned: [
    "Write practical server-side PHP code.",
    "Connect PHP concepts to dynamic web application behavior.",
    "Build toward a portfolio-ready Laravel final project.",
  ],
  outcomeAlignment: [
    "Process data from online forms and web requests.",
    "Use PHP with MySQL to generate dynamic web pages.",
    "Apply modern server-side development workflow habits.",
  ],
  syllabusContext: [
    "CS 85 Summer 2026 is a fast-paced 6-week online Canvas course.",
    "Two modules are released each Monday.",
    "Late work is accepted with syllabus penalties unless accommodations apply.",
    "AI usage must be disclosed when used on assignments.",
  ],
  starterTasks,
  artifacts: [
    "Canvas assignment submission",
    "Development notes and code snippets",
    "Screenshots or terminal output when required",
    "AI-use disclosure note when applicable",
  ],
  importantDates: [
    `${dateLabel} — module start window`,
    `${dueLabel} — expected Canvas deadline checkpoint`,
  ],
  assessmentContext: standardAssessmentContext,
  milestone,
  isFinalProject,
  moduleSummary: [
    {
      step: "Read",
      description:
        "Review the Canvas module materials and record the exact assignment requirements here.",
    },
    {
      step: "Build",
      description:
        "Complete the PHP, MySQL, Composer, or Laravel work for the module.",
    },
    {
      step: "Submit",
      description:
        "Submit through Canvas and keep a local record of files, screenshots, notes, and AI disclosure.",
    },
  ],
  textTasks: [
    {
      id: `module-${id}-canvas-assignment-shell`,
      title: `Module ${id}: Assignment Shell`,
      objective:
        "Hold the official Canvas instructions, deliverables, and notes once this module assignment is released.",
      tasks: weeklyAssignmentContext,
      submissionInstructions: [
        "Submit through SMC Canvas.",
        `Target checkpoint: ${dueLabel}.`,
        "Do not submit by email unless the instructor explicitly requests it.",
      ],
      whyItMatters:
        "This keeps the course portal ready on day one while preserving space for the real assignment text, code samples, rubric details, and reflections as they arrive.",
    },
  ],
});
