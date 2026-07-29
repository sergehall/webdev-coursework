// src/pages/ResourcesPage.tsx
import type { ReactNode } from "react";
import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Network,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

type Resource = {
  title: string;
  href: string;
  icon: ReactNode;
  description: string;
  course?: string;
};

type ResourceSection = {
  title: string;
  description: string;
  resources: Resource[];
};

const iconClassName = "h-5 w-5";

const resourceSections: ResourceSection[] = [
  {
    title: "Project, AI, and Daily Workflow",
    description:
      "Core references for this portfolio, GitHub, and AI-assisted development.",
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
    ],
  },
  {
    title: "Database, Internet, JavaScript, PHP, and Python",
    description:
      "Reference material for CS 60, CS 80, CS 81, CS 85, and CS 87A programming work.",
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
    title: "Networking, Cloud, and AWS",
    description:
      "Resources aligned with CS 70, CS 79A, CS 79C, and CS 79D cloud infrastructure work.",
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
    title: "CS 56 - Advanced Java Programming",
    description:
      "Java language, APIs, concurrency, JDBC, servlets, RMI, and networking references.",
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
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="space-y-3 text-center sm:text-left">
        <h1 className="bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-4xl leading-tight font-extrabold text-transparent drop-shadow-lg sm:text-5xl">
          Resources
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Reference links grouped around the current coursework: Java,
          databases, networking, cloud, AWS, web programming, Python, PHP, and
          AI-assisted development.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {resourceSections.map((section) => (
          <section key={section.title} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                {section.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {section.resources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-36 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-sky-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-sky-700 dark:hover:bg-gray-700"
                >
                  <span className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100 transition group-hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20">
                      {resource.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold text-gray-900 dark:text-white">
                        {resource.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {resource.description}
                      </span>
                    </span>
                  </span>

                  {resource.course && (
                    <span className="mt-4 inline-flex w-fit rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
                      {resource.course}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
