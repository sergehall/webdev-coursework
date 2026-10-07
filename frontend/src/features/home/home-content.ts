import {
  projectShowcaseItems,
  type ProjectShowcaseItem,
} from "@/features/projects/data/projectShowcase";
import { technologies, type CourseName, type Tech } from "@/data/technologies";
import {
  activeCourses,
  type ActiveCourseId,
} from "@/courses/catalog/activeCourses";

export type HomeCourseDomain =
  | "Programming"
  | "Data"
  | "Networking"
  | "Web"
  | "Cloud"
  | "Security";

type HomeCoursePresentation = {
  readonly id: ActiveCourseId;
  readonly domain: HomeCourseDomain;
  readonly summary: string;
};

export type HomeCourse = HomeCoursePresentation & {
  readonly name: CourseName;
  readonly code: string;
  readonly title: string;
  readonly moduleCount: number;
  readonly technologies: readonly Tech[];
  readonly assignmentPath: string;
};

const coursePresentationByName = {
  "CS 56 - Advanced Java Programming": {
    id: "CS56",
    domain: "Programming",
    summary:
      "Advanced object-oriented Java, desktop interfaces, concurrency, networking, databases, and application architecture.",
  },
  "CS 60 - Database Concepts & Applications": {
    id: "CS60",
    domain: "Data",
    summary:
      "Relational modeling, normalization, SQL, database design, integrity, and transaction management.",
  },
  "CS 70 - Network Fundamentals and Architecture": {
    id: "CS70",
    domain: "Networking",
    summary:
      "Network architecture, routing, switching, services, monitoring, wireless systems, cloud networking, and security.",
  },
  "CS 79A - Introduction to Cloud Computing": {
    id: "CS79A",
    domain: "Cloud",
    summary:
      "Hands-on AWS foundations across EC2, S3, IAM, VPC, Linux and Windows servers, WordPress, and secure remote access.",
  },
  "CS 80 - Internet Programming": {
    id: "CS80",
    domain: "Web",
    summary:
      "Web fundamentals with HTML, CSS, JavaScript, DOM scripting, forms, jQuery, XML, JSON, and AJAX.",
  },
  "CS 81 - JavaScript Programming": {
    id: "CS81",
    domain: "Web",
    summary:
      "JavaScript fundamentals through asynchronous browser applications, React components, forms, state, and public APIs.",
  },
  "CS 85 - PHP Programming": {
    id: "CS85",
    domain: "Web",
    summary:
      "Server-side development with PHP, Laravel, MVC, Eloquent, authentication, APIs, clean architecture, and OpenAI.",
  },
  "CS 79D - Security in Amazon Web Services": {
    id: "CS79D",
    domain: "Security",
    summary:
      "AWS identity, monitoring, network defense, application hardening, edge security, encryption, and secure architecture.",
  },
  "CS 79C - Compute Engines in Amazon Web Services": {
    id: "CS79C",
    domain: "Cloud",
    summary:
      "Scalable AWS compute with EC2, containers, EKS, Lambda, messaging, Elastic Beanstalk, and CloudFormation.",
  },
  "CS 87A - Python Programming": {
    id: "CS87A",
    domain: "Programming",
    summary:
      "Python fundamentals, reusable functions, algorithms, data processing, object-oriented design, and Tkinter visualization.",
  },
} as const satisfies Record<CourseName, HomeCoursePresentation>;

const technologyEntries = Object.entries(technologies) as Array<
  [CourseName, readonly Tech[]]
>;

export const homeCourses: readonly HomeCourse[] = technologyEntries.map(
  ([name, courseTechnologies]) => {
    const presentation = coursePresentationByName[name];
    const course = activeCourses[presentation.id];

    return {
      ...presentation,
      name,
      code: course.code,
      title: course.title,
      moduleCount: course.maxModules,
      technologies: courseTechnologies,
      assignmentPath: `/coursework/${presentation.id}/assignment`,
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
    label: "SMC classes",
    description: "A documented Web Development pathway.",
    href: "/coursework",
    action: "Explore the classes",
  },
  {
    value: String(totalModuleCount),
    label: "Learning modules",
    description: "Assignments, labs, quizzes, and final projects.",
    href: "/coursework",
    action: "Browse the modules",
  },
  {
    value: String(totalTechnologyCount),
    label: "Technologies mapped",
    description: "Skills connected directly to class evidence.",
    href: "/web-developer-path",
    action: "See the learning path",
  },
  {
    value: String(projectShowcaseItems.length),
    label: "Projects showcased",
    description: "Academic work applied in working systems.",
    href: "/projects",
    action: "View the projects",
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

export const featuredHomeProjects: readonly ProjectShowcaseItem[] =
  featuredProjectIds.map(requireProject);
