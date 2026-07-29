import {
  projectShowcaseItems,
  type ProjectShowcaseItem,
} from "@/data/projectShowcase";
import { technologies, type CourseName, type Tech } from "@/data/technologies";

export type HomeCourseDomain =
  | "Programming"
  | "Data"
  | "Networking"
  | "Web"
  | "Cloud"
  | "Security";

type HomeCoursePresentation = {
  readonly code: string;
  readonly title: string;
  readonly domain: HomeCourseDomain;
  readonly moduleCount: number;
  readonly summary: string;
};

export type HomeCourse = HomeCoursePresentation & {
  readonly name: CourseName;
  readonly technologies: readonly Tech[];
  readonly assignmentPath: string;
};

const coursePresentationByName = {
  "CS 56 - Advanced Java Programming": {
    code: "CS 56",
    title: "Advanced Java Programming",
    domain: "Programming",
    moduleCount: 15,
    summary:
      "Advanced object-oriented Java, desktop interfaces, concurrency, networking, databases, and application architecture.",
  },
  "CS 60 - Database Concepts & Applications": {
    code: "CS 60",
    title: "Database Concepts & Applications",
    domain: "Data",
    moduleCount: 10,
    summary:
      "Relational modeling, normalization, SQL, database design, integrity, and transaction management.",
  },
  "CS 70 - Network Fundamentals and Architecture": {
    code: "CS 70",
    title: "Network Fundamentals and Architecture",
    domain: "Networking",
    moduleCount: 16,
    summary:
      "Network architecture, routing, switching, services, monitoring, wireless systems, cloud networking, and security.",
  },
  "CS 79A - Introduction to Cloud Computing": {
    code: "CS 79A",
    title: "Introduction to Cloud Computing",
    domain: "Cloud",
    moduleCount: 8,
    summary:
      "Hands-on AWS foundations across EC2, S3, IAM, VPC, Linux and Windows servers, WordPress, and secure remote access.",
  },
  "CS 80 - Internet Programming": {
    code: "CS 80",
    title: "Internet Programming",
    domain: "Web",
    moduleCount: 6,
    summary:
      "Web fundamentals with HTML, CSS, JavaScript, DOM scripting, forms, jQuery, XML, JSON, and AJAX.",
  },
  "CS 81 - JavaScript Programming": {
    code: "CS 81",
    title: "JavaScript Programming",
    domain: "Web",
    moduleCount: 12,
    summary:
      "JavaScript fundamentals through asynchronous browser applications, React components, forms, state, and public APIs.",
  },
  "CS 85 - PHP Programming": {
    code: "CS 85",
    title: "PHP Programming",
    domain: "Web",
    moduleCount: 12,
    summary:
      "Server-side development with PHP, Laravel, MVC, Eloquent, authentication, APIs, clean architecture, and OpenAI.",
  },
  "CS 79D - Security in Amazon Web Services": {
    code: "CS 79D",
    title: "Security in Amazon Web Services",
    domain: "Security",
    moduleCount: 8,
    summary:
      "AWS identity, monitoring, network defense, application hardening, edge security, encryption, and secure architecture.",
  },
  "CS 79C - Compute Engines in Amazon Web Services": {
    code: "CS 79C",
    title: "Compute Engines in Amazon Web Services",
    domain: "Cloud",
    moduleCount: 10,
    summary:
      "Scalable AWS compute with EC2, containers, EKS, Lambda, messaging, Elastic Beanstalk, and CloudFormation.",
  },
  "CS 87A - Python Programming": {
    code: "CS 87A",
    title: "Python Programming",
    domain: "Programming",
    moduleCount: 6,
    summary:
      "Python fundamentals, reusable functions, algorithms, data processing, object-oriented design, and Tkinter visualization.",
  },
} as const satisfies Record<CourseName, HomeCoursePresentation>;

function toAssignmentPath(code: string): string {
  return `/coursework/${code.replace(/\s/g, "")}/assignment`;
}

const technologyEntries = Object.entries(technologies) as Array<
  [CourseName, readonly Tech[]]
>;

export const homeCourses: readonly HomeCourse[] = technologyEntries.map(
  ([name, courseTechnologies]) => {
    const presentation = coursePresentationByName[name];

    return {
      ...presentation,
      name,
      technologies: courseTechnologies,
      assignmentPath: toAssignmentPath(presentation.code),
    };
  }
);

const totalModuleCount = homeCourses.reduce(
  (total, course) => total + course.moduleCount,
  0
);

const totalTechnologyCount = homeCourses.reduce(
  (total, course) => total + course.technologies.length,
  0
);

export const homeStats = [
  {
    value: String(homeCourses.length),
    label: "SMC courses",
    description: "A documented Web Development pathway.",
  },
  {
    value: String(totalModuleCount),
    label: "Learning modules",
    description: "Assignments, labs, quizzes, and final projects.",
  },
  {
    value: String(totalTechnologyCount),
    label: "Technologies mapped",
    description: "Skills connected directly to course evidence.",
  },
  {
    value: String(projectShowcaseItems.length),
    label: "Projects showcased",
    description: "Academic work applied in working systems.",
  },
] as const;

const featuredProjectIds = [
  "aws-learning-portal",
  "sergioartg",
  "lens-lounge",
] as const;

function requireProject(projectId: (typeof featuredProjectIds)[number]) {
  const project = projectShowcaseItems.find(({ id }) => id === projectId);

  if (!project) {
    throw new Error(`Featured home project not found: ${projectId}`);
  }

  return project satisfies ProjectShowcaseItem;
}

export const featuredHomeProjects = featuredProjectIds.map(requireProject);
