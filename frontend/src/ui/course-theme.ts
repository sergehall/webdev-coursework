// frontend/src/ui/course-theme.ts
import type { CourseName } from "@/data/technologies";

export const courseGradients = {
  python:
    "from-emerald-200 to-green-300 dark:from-emerald-900 dark:to-green-950",
  js: "from-orange-200 to-orange-300 dark:from-orange-900 dark:to-orange-950",
  database: "from-teal-200 to-cyan-300 dark:from-teal-900 dark:to-cyan-950",
  internetJs:
    "from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-950",
  network:
    "from-yellow-200 to-yellow-300 dark:from-yellow-900 dark:to-yellow-950",
  cloud:
    "from-violet-200 to-purple-300 dark:from-violet-900 dark:to-purple-950",
  default: "from-sky-200 to-indigo-300 dark:from-sky-900 dark:to-indigo-950",
} as const;

export type CourseGradientKey = keyof typeof courseGradients;

export const COURSE_THEME_BY_NAME = {
  "CS 60 - Database Concepts & Applications": "database",
  "CS 70 - Network Fundamentals and Architecture": "network",
  "CS 79A - Introduction to Cloud Computing": "cloud",
  "CS 80 - Internet Programming": "internetJs",
  "CS 81 - JavaScript Programming": "js",
  "CS 87A - Python Programming": "python",
} satisfies Record<CourseName, Exclude<CourseGradientKey, "default">>;

export function gradientForCourse(courseName: CourseName): string {
  const key = COURSE_THEME_BY_NAME[courseName] ?? "default";
  return courseGradients[key] ?? courseGradients.default;
}
