import { type Course, courses } from "./web-developer-courses";

function extractCodes(courseList: Course[]): string[] {
  const codes: string[] = [];

  for (const course of courseList) {
    if (course.code) {
      codes.push(course.code.replace(/\s+/g, "").toUpperCase());
    }

    if (course.options && Array.isArray(course.options)) {
      codes.push(...extractCodes(course.options));
    }
  }

  return codes;
}

export const courseCodes = Array.from(new Set(extractCodes(courses))).sort();
