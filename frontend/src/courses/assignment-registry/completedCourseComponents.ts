// src/components/completedCourseComponents.tsx
import type { FC } from "react";

import { activeCourses } from "@/courses/catalog/activeCourses";
import CS56 from "@/courses/CS56/CS56";
import CS60 from "@/courses/CS60/CS60";
import CS70 from "@/courses/CS70/CS70";
import CS79A from "@/courses/CS79A/CS79A";
import CS79C from "@/courses/CS79C/CS79C";
import CS79D from "@/courses/CS79D/CS79D";
import CS80 from "@/courses/CS80/CS80";
import CS81 from "@/courses/CS81/CS81";
import CS85 from "@/courses/CS85/CS85";
import CS87A from "@/courses/CS87A/CS87A";

export type CourseComponentMap = Record<
  string,
  {
    title: string;
    component: FC | null;
  }
>;

const completedCourseComponents: CourseComponentMap = {
  "CS 56": {
    title: activeCourses.CS56.title,
    component: CS56,
  },
  "CS 60": {
    title: activeCourses.CS60.assignmentTitle,
    component: CS60,
  },
  "CS 70": {
    title: activeCourses.CS70.title,
    component: CS70,
  },
  "CS 79A": {
    title: activeCourses.CS79A.title,
    component: CS79A,
  },
  "CS 80": {
    title: activeCourses.CS80.title,
    component: CS80,
  },
  "CS 81": {
    title: activeCourses.CS81.title,
    component: CS81,
  },
  "CS 82": {
    title: "ASP.NET Programming in C#",
    component: null,
  },
  "CS 83": {
    title: "Server-Side Java Web Programming",
    component: null,
  },
  "CS 83R": {
    title: "Server-Side Ruby Web Programming",
    component: null,
  },
  "CS 85": {
    title: activeCourses.CS85.title,
    component: CS85,
  },
  "CS 87A": {
    title: activeCourses.CS87A.title,
    component: CS87A,
  },
  "CS 73A": {
    title: "Fundamentals of Computer Security",
    component: null,
  },
  "CS 73B": {
    title: "Computer Forensics Fundamentals",
    component: null,
  },
  "CS 73C": {
    title: "Cybersecurity and Ethical Hacking",
    component: null,
  },
  "CS 73L": {
    title: "Cybersecurity Literacy",
    component: null,
  },
  "CS 79D": {
    title: activeCourses.CS79D.title,
    component: CS79D,
  },
  "CS 77A": {
    title: "Salesforce Administration Essentials",
    component: null,
  },
  "CS 77B": {
    title: "Salesforce Developer Essentials",
    component: null,
  },
  "CS 79B": {
    title: "Database Essentials in Amazon Web Services",
    component: null,
  },
  "CS 79C": {
    title: activeCourses.CS79C.title,
    component: CS79C,
  },
  "CS 79E": {
    title: "Best Practices in Amazon Web Services",
    component: null,
  },
  "CS 79Y": {
    title: "Microsoft Azure Database Essentials",
    component: null,
  },
  "CS 79Z": {
    title: "Microsoft Azure Essentials",
    component: null,
  },
  "CIS 67": {
    title: "WordPress",
    component: null,
  },
};

export default completedCourseComponents;
