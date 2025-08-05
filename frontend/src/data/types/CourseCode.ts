// courseCodes.ts

export const courseCodes = [
  "CS 60",
  "CS 70",
  "CS 79A",
  "CS 80",
  "CS 81",
  "CS 82",
  "CS 83",
  "CS 83R",
  "CS 85",
  "CS 87A",
  "CS 73A",
  "CS 73B",
  "CS 73C",
  "CS 73L",
  "CS 79D",
  "CS 77A",
  "CS 77B",
  "CS 79B",
  "CS 79C",
  "CS 79E",
  "CS 79Y",
  "CS 79Z",
  "CIS 67",
] as const;

export type CourseCode = (typeof courseCodes)[number];
