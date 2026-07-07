import type { CS56ModuleBlueprint } from "../types";

import { cs56Module09CanvasSections } from "./module09CanvasSections";
import { cs56Module09TextTasks } from "./module09TextTasks";

export const cs56Module09Blueprint = {
  id: 9,
  title: "Collections (Data Structures)",
  weekLabel: "Module 9",
  dateLabel: "July 19",
  overview:
    "This module introduces Java collections and data structures. It covers ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, HashMap, examples, reading, and the Collections assignment.",
  topicLine:
    "Collections, ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, and HashMap",
  focusAreas: [
    "ArrayList and LinkedList",
    "Hashing",
    "equals and hashCode",
    "Set and HashSet",
    "Map and HashMap",
    "Collection examples and reading",
  ],
  objectivesAligned: [
    "Use Java list implementations for ordered collections",
    "Explain how hashing supports efficient lookup",
    "Implement or reason about equals and hashCode behavior",
    "Use Set and Map collections appropriately",
    "Read and adapt Java collection examples",
  ],
  outcomeAlignment: [
    "Build Java programs that choose appropriate data structures",
    "Prepare for later modules that rely on collections and lookup structures",
  ],
  syllabusContext: [
    "Module: Collections (Data Structures) includes overview, lecture pages, quizzes, examples, reading, and an assignment task",
    "Visible Canvas deadlines: collection quizzes and Assignment: Collections due Jul 19",
  ],
  starterTasks: [
    "Review Collections: Overview",
    "Complete the collections lecture sequence",
    "Complete the ArrayList, LinkedList, Equals, HashCode, and Set & Map quizzes",
    "Review the Java example files",
    "Read Reading: Collections",
    "Submit Assignment: Collections",
  ],
  artifacts: [
    "Quiz: ArrayList",
    "Quiz: LinkedList",
    "Quiz: Equals",
    "Quiz: HashCode",
    "Quiz: Set & Map",
    "Employee.java",
    "ListExample.java",
    "SetExample.java",
    "MapExample.java",
    "Assignment: Collections",
  ],
  importantDates: [
    "Jul 19 - Quiz: ArrayList",
    "Jul 19 - Quiz: LinkedList",
    "Jul 19 - Quiz: Equals",
    "Jul 19 - Quiz: HashCode",
    "Jul 19 - Quiz: Set & Map",
    "Jul 19 - Assignment: Collections",
  ],
  assessmentContext: [
    "Quiz: ArrayList - 4 pts",
    "Quiz: LinkedList - 3 pts",
    "Quiz: Equals - 3 pts",
    "Quiz: HashCode - 3 pts",
    "Quiz: Set & Map - 4 pts",
    "Assignment: Collections - 10 pts",
  ],
  milestone: "Collections quizzes, examples, reading, and assignment completed",
  moduleSummary: [
    {
      step: "Overview",
      description:
        "Start with the collections overview and connect the module to Java data structure choices.",
    },
    {
      step: "Lecture",
      description:
        "Study ArrayList, LinkedList, hashing, equals, hashCode, Set, HashSet, Map, and HashMap.",
    },
    {
      step: "Examples",
      description:
        "Review Employee.java, ListExample.java, SetExample.java, and MapExample.java.",
    },
    {
      step: "Tasks",
      description:
        "Complete the quizzes, reading, and Assignment: Collections by Jul 19.",
    },
  ],
  readingHighlights: [
    "Collections: Overview",
    "Lecture: The ArrayList Class",
    "Lecture: The LinkedList Class",
    "Lecture: Hashing",
    "Lecture: The equals Methods",
    "Lecture: The hashCode Method",
    "Lecture: Set and HashSet",
    "Lecture: Map and HashMap",
    "Reading: Collections",
  ],
  canvasSections: cs56Module09CanvasSections,
  textTasks: cs56Module09TextTasks,
} satisfies CS56ModuleBlueprint;
