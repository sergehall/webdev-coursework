// src/pages/ResourcesPage.tsx
import { FileText, ExternalLink, Bot } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function ResourcesPage() {
  const resources = [
    {
      title: "GitHub Profile",
      href: "https://github.com/SergeHall",
      icon: <SiGithub className="h-5 w-5" />,
      description: "Serge's GitHub with this project and more",
    },
    {
      title: "CS81-Syllabus",
      href: "/CS81-Syllabus-Sum25-Seno.pdf",
      icon: <FileText className="h-5 w-5" />,
      description: "Official syllabus for the course",
    },
    {
      title: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web",
      icon: <ExternalLink className="h-5 w-5" />,
      description: "Reference for HTML, CSS, JavaScript & APIs",
    },
    {
      title: "W3Schools",
      href: "https://www.w3schools.com",
      icon: <ExternalLink className="h-5 w-5" />,
      description: "Tutorials and references on web development languages",
    },
    {
      title: "ChatGPT (AI Assistant)",
      href: "https://chat.openai.com",
      icon: <Bot className="h-5 w-5" />,
      description: "AI assistant that helps write and understand code",
    },
  ];

  return (
    <div className="p-3">
      <h2 className="mb-6 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        {" "}
        Resources
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((res) => (
          <a
            key={res.href}
            href={res.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="text-blue-600 dark:text-blue-400">{res.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{res.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {res.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
