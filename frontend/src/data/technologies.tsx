// src/data/technologies.tsx
import {
  FileCode2,
  Paintbrush2,
  Code2,
  Atom,
  Palette,
  BadgeHelp,
  Sparkles,
  Wrench,
  Rocket,
  Route,
  CloudSun,
  Braces,
  LayoutTemplate,
  GaugeCircle,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Tech {
  icon: LucideIcon;
  color: string;
  label: string;
  url: string;
}

export type TechnologyGroup = {
  [courseLabel: string]: Tech[];
};

export const technologies: TechnologyGroup = {
  "CS 80 - Internet Programming": [
    {
      icon: FileCode2,
      color: "text-blue-500",
      label: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      icon: Paintbrush2,
      color: "text-cyan-500",
      label: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      icon: Code2,
      color: "text-yellow-500",
      label: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      icon: Code2,
      color: "text-rose-600",
      label: "PHP",
      url: "https://www.php.net",
    },
    {
      icon: Braces,
      color: "text-orange-500",
      label: "JSON",
      url: "https://www.json.org",
    },
    {
      icon: Braces,
      color: "text-indigo-500",
      label: "XML",
      url: "https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction",
    },
    {
      icon: Braces,
      color: "text-green-700",
      label: "SQL",
      url: "https://www.w3schools.com/sql/",
    },
    {
      icon: Route,
      color: "text-blue-400",
      label: "DOM Manipulation",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    },
    {
      icon: Cloud,
      color: "text-purple-600",
      label: "Ajax",
      url: "https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX",
    },
    {
      icon: Cloud,
      color: "text-blue-600",
      label: "Web Services",
      url: "https://en.wikipedia.org/wiki/Web_service",
    },
    {
      icon: Cloud,
      color: "text-cyan-700",
      label: "TCP/IP",
      url: "https://en.wikipedia.org/wiki/Internet_protocol_suite",
    },
    {
      icon: Wrench,
      color: "text-gray-500",
      label: "CGI",
      url: "https://en.wikipedia.org/wiki/Common_Gateway_Interface",
    },
    {
      icon: Wrench,
      color: "text-red-500",
      label: "ASP.NET",
      url: "https://dotnet.microsoft.com/en-us/apps/aspnet",
    },
    {
      icon: Code2,
      color: "text-blue-800",
      label: "VB.NET",
      url: "https://learn.microsoft.com/en-us/dotnet/visual-basic/",
    },
  ],

  "CS 81 - JavaScript Programming": [
    {
      icon: Code2,
      color: "text-yellow-500",
      label: "JavaScript (ES6+)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      icon: BadgeHelp,
      color: "text-violet-500",
      label: "TypeScript",
      url: "https://www.typescriptlang.org",
    },
    {
      icon: Wrench,
      color: "text-rose-500",
      label: "ESLint + Prettier",
      url: "https://eslint.org",
    },
    {
      icon: Atom,
      color: "text-sky-500",
      label: "React 19",
      url: "https://react.dev",
    },
    {
      icon: Palette,
      color: "text-green-500",
      label: "Tailwind CSS",
      url: "https://tailwindcss.com",
    },
    {
      icon: Sparkles,
      color: "text-pink-500",
      label: "Framer Motion",
      url: "https://www.framer.com/motion/",
    },
    {
      icon: Rocket,
      color: "text-indigo-500",
      label: "Vite",
      url: "https://vitejs.dev",
    },
    {
      icon: Route,
      color: "text-purple-500",
      label: "React Router DOM",
      url: "https://reactrouter.com",
    },
    {
      icon: CloudSun,
      color: "text-emerald-500",
      label: "Fetch API + useEffect",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    },
    {
      icon: GaugeCircle,
      color: "text-teal-500",
      label: "React Progressbar",
      url: "https://www.npmjs.com/package/react-circular-progressbar",
    },
    {
      icon: LayoutTemplate,
      color: "text-fuchsia-500",
      label: "Lucide Icons",
      url: "https://lucide.dev/icons/",
    },
    {
      icon: Cloud,
      color: "text-indigo-400",
      label: "Heroku",
      url: "https://www.heroku.com",
    },
    {
      icon: Braces,
      color: "text-orange-500",
      label: "JS Functions & Closures",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    },
    {
      icon: Braces,
      color: "text-lime-500",
      label: "JavaScript Objects & Arrays",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
    },
    {
      icon: Code2,
      color: "text-yellow-600",
      label: "Higher-Order Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#nesting",
    },
    {
      icon: Route,
      color: "text-purple-400",
      label: "Form Validation",
      url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation",
    },
    {
      icon: Cloud,
      color: "text-blue-400",
      label: "Ajax (XMLHttp... & Fetch)",
      url: "https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX",
    },
    {
      icon: Sparkles,
      color: "text-pink-600",
      label: "jQuery",
      url: "https://jquery.com",
    },
    {
      icon: Atom,
      color: "text-sky-600",
      label: "React Props & State",
      url: "https://react.dev/learn/passing-props-to-a-component",
    },
    {
      icon: Atom,
      color: "text-cyan-600",
      label: "React Events & Side Effects",
      url: "https://react.dev/learn/responding-to-events",
    },
    {
      icon: Atom,
      color: "text-emerald-600",
      label: "React Forms",
      url: "https://react.dev/learn/sharing-state-between-components#step-3-rendering-the-form",
    },
    {
      icon: CloudSun,
      color: "text-indigo-500",
      label: "Public APIs",
      url: "https://github.com/public-apis/public-apis",
    },
    {
      icon: BadgeHelp,
      color: "text-fuchsia-600",
      label: "JavaScript Prototype Model",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes",
    },
  ],

  "CS 87A - Python Programming": [
    {
      icon: Code2,
      color: "text-yellow-600",
      label: "Python",
      url: "https://www.python.org",
    },
    {
      icon: Braces,
      color: "text-purple-600",
      label: "Tkinter (GUI)",
      url: "https://docs.python.org/3/library/tkinter.html",
    },
    {
      icon: Sparkles,
      color: "text-pink-600",
      label: "Random module (Python)",
      url: "https://docs.python.org/3/library/random.html",
    },
    {
      icon: FileCode2,
      color: "text-blue-600",
      label: "Custom Python Modules",
      url: "https://docs.python.org/3/tutorial/modules.html",
    },
    {
      icon: BadgeHelp,
      color: "text-green-600",
      label: "Data Processing (.tab files)",
      url: "https://en.wikipedia.org/wiki/Tab-separated_values",
    },
  ],
};
