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
  MousePointerClick,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tech {
  icon: LucideIcon;
  color: string;
  label: string;
  url: string;
}

export const technologies: Tech[] = [
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
    label: "JavaScript (ES6+)",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
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
    icon: BadgeHelp,
    color: "text-violet-500",
    label: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  {
    icon: Sparkles,
    color: "text-pink-500",
    label: "Framer Motion",
    url: "https://www.framer.com/motion/",
  },
  {
    icon: Wrench,
    color: "text-rose-500",
    label: "ESLint + Prettier",
    url: "https://eslint.org",
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
    icon: Braces,
    color: "text-orange-500",
    label: "JSON",
    url: "https://www.json.org",
  },
  {
    icon: LayoutTemplate,
    color: "text-fuchsia-500",
    label: "Lucide Icons",
    url: "https://lucide.dev/icons/",
  },
  {
    icon: GaugeCircle,
    color: "text-teal-500",
    label: "React Progressbar",
    url: "https://www.npmjs.com/package/react-circular-progressbar",
  },
  {
    icon: MousePointerClick,
    color: "text-blue-400",
    label: "DOM Manipulation",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
  },
  {
    icon: Cloud,
    color: "text-indigo-400",
    label: "Heroku",
    url: "https://www.heroku.com",
  },
];
