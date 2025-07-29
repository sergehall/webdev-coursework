// src/components/completedCourseComponents.tsx

import type { FC } from "react";

import CS81 from "@/courses/CS81/CS81";

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
    component: null,
  },
  "CS 70": {
    title: "Network Fundamentals and Architecture",
    component: null,
  },
  "CS 79A": {
    title: "Introduction to Cloud Computing",
    component: null,
  },
  "CS 80": {
    title: "Internet Programming",
    component: null,
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
    component: null,
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
