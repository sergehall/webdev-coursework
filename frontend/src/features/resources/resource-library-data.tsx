import type { ReactNode } from "react";
import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Coffee,
  Database,
  ExternalLink,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

export type ResourceTone = "sky" | "violet" | "emerald" | "amber";

export type ResourceEntry = {
  readonly title: string;
  readonly href: string;
  readonly icon: ReactNode;
  readonly description: string;
  readonly course?: string;
};

export type ResourceCollection = {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly icon: ReactNode;
  readonly tone: ResourceTone;
  readonly courses: readonly string[];
  readonly resources: readonly ResourceEntry[];
};

const iconClassName = "h-5 w-5";

export const resourceCollections = [
  {
    id: "daily-workflow",
    title: "Project, AI, and Daily Workflow",
    shortTitle: "Project & AI",
    eyebrow: "Build and ship",
    description:
      "Core references for this portfolio, GitHub, and AI-assisted development.",
    icon: <Sparkles className={iconClassName} />,
    tone: "violet",
    courses: [],
    resources: [
      {
        title: "GitHub Profile",
        href: "https://github.com/SergeHall",
        icon: <SiGithub className={iconClassName} />,
        description: "Serge's GitHub with this project and related coursework.",
      },
      {
        title: "ChatGPT",
        href: "https://chatgpt.com",
        icon: <Bot className={iconClassName} />,
        description:
          "AI assistant for planning, debugging, and understanding code.",
      },
      {
        title: "OpenAI Codex",
        href: "https://openai.com/codex/",
        icon: <Terminal className={iconClassName} />,
        description:
          "OpenAI coding agent powered by ChatGPT for building, reviewing, and shipping code.",
      },
      {
        title: "Using Codex with ChatGPT",
        href: "https://help.openai.com/en/articles/11369540-codex-in-chatgpt",
        icon: <Bot className={iconClassName} />,
        description:
          "Official OpenAI Help Center guide for using Codex with a ChatGPT plan.",
      },
      {
        title: "OpenAI API Quickstart",
        href: "https://platform.openai.com/docs/quickstart/make-your-first-api-request",
        icon: <Sparkles className={iconClassName} />,
        description:
          "Official guide for secure API requests, model responses, streaming, and tools.",
        course: "CS 85",
      },
    ],
  },
  {
    id: "programming-and-data",
    title: "Database, Internet, JavaScript, PHP, and Python",
    shortTitle: "Programming & data",
    eyebrow: "Languages and persistence",
    description:
      "Reference material for CS 60, CS 80, CS 81, CS 85, and CS 87A programming work.",
    icon: <Braces className={iconClassName} />,
    tone: "emerald",
    courses: ["CS 60", "CS 80", "CS 81", "CS 85", "CS 87A"],
    resources: [
      {
        title: "MDN Web Docs",
        href: "https://developer.mozilla.org/en-US/docs/Web",
        icon: <ExternalLink className={iconClassName} />,
        description:
          "Reference for HTML, CSS, JavaScript, browser APIs, and HTTP.",
        course: "CS 80 / CS 81",
      },
      {
        title: "React Docs",
        href: "https://react.dev/learn",
        icon: <Code2 className={iconClassName} />,
        description:
          "Official React learning path for components, state, and effects.",
        course: "CS 81",
      },
      {
        title: "Next.js Documentation",
        href: "https://nextjs.org/docs",
        icon: <Code2 className={iconClassName} />,
        description:
          "Official App Router reference for rendering, routing, data, and deployment.",
        course: "Portfolio projects",
      },
      {
        title: "NestJS Documentation",
        href: "https://docs.nestjs.com/",
        icon: <Server className={iconClassName} />,
        description:
          "Official backend guide for modules, controllers, providers, validation, and security.",
        course: "Portfolio projects",
      },
      {
        title: "MySQL Documentation",
        href: "https://dev.mysql.com/doc/",
        icon: <Database className={iconClassName} />,
        description:
          "Official MySQL reference for SQL, schemas, and database operations.",
        course: "CS 60",
      },
      {
        title: "PostgreSQL Documentation",
        href: "https://www.postgresql.org/docs/",
        icon: <Database className={iconClassName} />,
        description:
          "Official PostgreSQL guides for SQL and relational database concepts.",
        course: "CS 60",
      },
      {
        title: "PHP Manual",
        href: "https://www.php.net/manual/en/",
        icon: <Server className={iconClassName} />,
        description:
          "Official PHP language reference and server-side programming guide.",
        course: "CS 85",
      },
      {
        title: "Laravel 13 Documentation",
        href: "https://laravel.com/docs/13.x",
        icon: <Server className={iconClassName} />,
        description:
          "Official Laravel reference for routing, Blade, Eloquent, authentication, queues, and testing.",
        course: "CS 85",
      },
      {
        title: "Vite Guide",
        href: "https://vite.dev/guide/",
        icon: <Sparkles className={iconClassName} />,
        description:
          "Official guide for local development, asset bundling, and production builds.",
        course: "CS 85",
      },
      {
        title: "Python Documentation",
        href: "https://docs.python.org/3/",
        icon: <Terminal className={iconClassName} />,
        description:
          "Official Python language, standard library, and tutorial docs.",
        course: "CS 87A",
      },
    ],
  },
  {
    id: "cloud-and-networking",
    title: "Networking, Cloud, and AWS",
    shortTitle: "Cloud & networking",
    eyebrow: "Infrastructure and security",
    description:
      "Resources aligned with CS 70, CS 79A, CS 79C, and CS 79D cloud infrastructure work.",
    icon: <Cloud className={iconClassName} />,
    tone: "sky",
    courses: ["CS 70", "CS 79A", "CS 79C", "CS 79D"],
    resources: [
      {
        title: "CompTIA Network+",
        href: "https://www.comptia.org/certifications/network",
        icon: <Network className={iconClassName} />,
        description:
          "Networking fundamentals, terminology, and certification objectives.",
        course: "CS 70",
      },
      {
        title: "Cloudflare Learning Center",
        href: "https://www.cloudflare.com/learning/",
        icon: <Network className={iconClassName} />,
        description:
          "Clear explanations of DNS, networking, security, and web performance.",
        course: "CS 70",
      },
      {
        title: "AWS Documentation",
        href: "https://docs.aws.amazon.com/",
        icon: <Cloud className={iconClassName} />,
        description:
          "Official AWS service guides for cloud computing labs and projects.",
        course: "CS 79A / CS 79C / CS 79D",
      },
      {
        title: "AWS Skill Builder",
        href: "https://skillbuilder.aws/",
        icon: <Cloud className={iconClassName} />,
        description: "AWS training courses, labs, and cloud learning paths.",
        course: "CS 79A",
      },
      {
        title: "AWS Well-Architected",
        href: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
        icon: <ShieldCheck className={iconClassName} />,
        description:
          "Framework for secure, reliable, efficient, and cost-aware cloud architecture.",
        course: "CS 79C",
      },
      {
        title: "AWS IAM User Guide",
        href: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
        icon: <ShieldCheck className={iconClassName} />,
        description:
          "Identity, access management, policies, users, groups, and roles.",
        course: "CS 79D",
      },
    ],
  },
  {
    id: "advanced-java",
    title: "CS 56 - Advanced Java Programming",
    shortTitle: "Advanced Java",
    eyebrow: "Enterprise Java foundations",
    description:
      "Java language, APIs, concurrency, JDBC, servlets, RMI, and networking references.",
    icon: <Coffee className={iconClassName} />,
    tone: "amber",
    courses: ["CS 56"],
    resources: [
      {
        title: "Oracle Java Tutorials",
        href: "https://docs.oracle.com/javase/tutorial/",
        icon: <Code2 className={iconClassName} />,
        description:
          "Official Java lessons for language features and core APIs.",
        course: "CS 56",
      },
      {
        title: "Java API Documentation",
        href: "https://docs.oracle.com/en/java/javase/",
        icon: <Braces className={iconClassName} />,
        description: "Official Java SE API documentation and platform guides.",
        course: "CS 56",
      },
      {
        title: "JDBC Tutorial",
        href: "https://docs.oracle.com/javase/tutorial/jdbc/",
        icon: <Database className={iconClassName} />,
        description:
          "Oracle guide for connecting Java applications to databases.",
        course: "CS 56",
      },
      {
        title: "Jakarta Servlet",
        href: "https://jakarta.ee/specifications/servlet/",
        icon: <Server className={iconClassName} />,
        description:
          "Servlet specifications for server-side Java web programming.",
        course: "CS 56",
      },
      {
        title: "JavaFX Documentation",
        href: "https://openjfx.io/openjfx-docs/",
        icon: <Coffee className={iconClassName} />,
        description:
          "Official OpenJFX guides for Maven, FXML, controls, and desktop application setup.",
        course: "CS 56",
      },
      {
        title: "Spring Boot Reference",
        href: "https://docs.spring.io/spring-boot/index.html",
        icon: <Server className={iconClassName} />,
        description:
          "Official reference for web APIs, data access, application security, and testing.",
        course: "CS 56",
      },
    ],
  },
] as const satisfies readonly ResourceCollection[];

export const resourceCount = resourceCollections.reduce(
  (total, collection) => total + collection.resources.length,
  0
);

export const representedCourseCount = new Set(
  resourceCollections.flatMap(({ courses }) => courses)
).size;
