// src/components/completedCourseComponents.tsx
import type { FC } from "react";

import CS60 from "@/courses/CS60/CS60";
import CS70 from "@/courses/CS70/CS70";
import CS79A from "@/courses/CS79A/CS79A";
import CS80 from "@/courses/CS80/CS80";
import CS81 from "@/courses/CS81/CS81";
import CS87A from "@/courses/CS87A/CS87A";

export type CourseComponentMap = Record<
  string,
  {
    title: string;
    component: FC | null;
  }
>;

const completedCourseComponents: CourseComponentMap = {
  "CS 60": {
    title: "Database Concepts and Applications",
    component: CS60,
  },
  "CS 70": {
    title: "Network Fundamentals and Architecture",
    component: CS70,
  },
  "CS 79A": {
    title: "Introduction to Cloud Computing",
    component: CS79A,
  },
  "CS 80": {
    title: "Internet Programming",
    component: CS80,
  },
  "CS 81": {
    title: "JavaScript Programming",
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
    title: "PHP Programming",
    component: null,
  },
  "CS 87A": {
    title: "Python Programming",
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
    title: "Security in Amazon Web Services",
    component: null,
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
    title: "Compute Engines in Amazon Web Services",
    component: null,
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
