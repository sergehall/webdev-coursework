// src/utils/normalizeCourseIdToCode.ts
import { courseCodes } from "@/data/types/CourseCode";
import type { CourseCode } from "@/data/types/CourseCode";

export function normalizeCourseIdToCode(
  courseId: string
): CourseCode | undefined {
  // Normalize casing and ensure a space between prefix and number/letter
  const normalized = courseId
    .toUpperCase()
    .replace(/^([A-Z]+)(\d.*)$/, "$1 $2");

  if (courseCodes.includes(normalized as CourseCode)) {
    return normalized as CourseCode;
  }

  return undefined;
}
