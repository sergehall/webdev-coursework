// frontend/src/ui/course-theme.ts
import type { CourseName } from "@/data/technologies";

export const courseGradients = {
  python: "from-teal-200 to-emerald-300 dark:from-teal-900 dark:to-emerald-950",
  js: "from-lime-200 to-emerald-300 dark:from-lime-900 dark:to-emerald-950",
  php: "from-green-200 to-teal-300 dark:from-green-900 dark:to-teal-950",
  database: "from-rose-200 to-red-300 dark:from-rose-900 dark:to-red-950",
  internetJs:
    "from-emerald-200 to-green-300 dark:from-emerald-900 dark:to-green-950",
  network: "from-slate-200 to-gray-300 dark:from-slate-800 dark:to-gray-950",
  cloud: "from-sky-200 to-blue-300 dark:from-sky-900 dark:to-blue-950",
  awsSecurity: "from-red-200 to-rose-300 dark:from-red-900 dark:to-rose-950",
  awsCompute: "from-cyan-200 to-blue-300 dark:from-cyan-900 dark:to-blue-950",
  default: "from-sky-200 to-indigo-300 dark:from-sky-900 dark:to-indigo-950",
} as const;

export type CourseGradientKey = keyof typeof courseGradients;

export const COURSE_THEME_BY_NAME = {
  "CS 60 - Database Concepts & Applications": "database",
  "CS 70 - Network Fundamentals and Architecture": "network",
  "CS 79A - Introduction to Cloud Computing": "cloud",
  "CS 80 - Internet Programming": "internetJs",
  "CS 81 - JavaScript Programming": "js",
  "CS 85 - PHP Programming": "php",
  "CS 79D - Security in Amazon Web Services": "awsSecurity",
  "CS 79C - Compute Engines in Amazon Web Services": "awsCompute",
  "CS 87A - Python Programming": "python",
} satisfies Record<CourseName, Exclude<CourseGradientKey, "default">>;

export function gradientForCourse(courseName: CourseName): string {
  const key = COURSE_THEME_BY_NAME[courseName] ?? "default";
  return courseGradients[key] ?? courseGradients.default;
}
