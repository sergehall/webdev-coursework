import {
  cs56Technologies,
  cs80Technologies,
  cs81Technologies,
  cs85Technologies,
  cs87aTechnologies,
} from "./technology-stacks/programming";
import {
  cs60Technologies,
  cs70Technologies,
  cs79aTechnologies,
  cs79dTechnologies,
  cs79cTechnologies,
} from "./technology-stacks/infrastructure";

export type { Tech } from "./technology-stacks/types";

export const technologies = {
  "CS 56 - Advanced Java Programming": cs56Technologies,
  "CS 60 - Database Concepts & Applications": cs60Technologies,
  "CS 70 - Network Fundamentals and Architecture": cs70Technologies,
  "CS 79A - Introduction to Cloud Computing": cs79aTechnologies,
  "CS 80 - Internet Programming": cs80Technologies,
  "CS 81 - JavaScript Programming": cs81Technologies,
  "CS 85 - PHP Programming": cs85Technologies,
  "CS 79D - Security in Amazon Web Services": cs79dTechnologies,
  "CS 79C - Compute Engines in Amazon Web Services": cs79cTechnologies,
  "CS 87A - Python Programming": cs87aTechnologies,
} as const;

export type CourseName = keyof typeof technologies;
