import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  TerminalSquare,
} from "lucide-react";

import SidebarItem from "../components/SidebarItem";

export default function SidebarPage() {
  return (
    <aside className="flex w-full flex-row items-center justify-between gap-1 border-t border-gray-300 bg-gray-100 px-2 py-2 dark:border-gray-700 dark:bg-gray-800 md:w-56 md:flex-col md:items-start md:justify-start md:gap-3 md:border-r md:border-t-0 md:px-4 md:py-6">
      <nav className="flex w-full flex-row justify-around space-x-3 md:flex-col md:justify-start md:space-x-0 md:space-y-4">
        <div className="flex w-full flex-row justify-around gap-3 md:flex-col md:justify-start md:gap-2">
          <SidebarItem
            to="/"
            icon={<LayoutDashboard className="h-6 w-6" />}
            label="Home"
          />
          <SidebarItem
            to="/coursework"
            icon={<BookOpen className="h-6 w-6" />}
            label="Coursework"
          />
          <SidebarItem
            to="/web-developer-path"
            icon={<GraduationCap className="h-6 w-6" />}
            label="Roadmap"
          />
          <SidebarItem
            to="/code-playground"
            icon={<TerminalSquare className="h-6 w-6" />}
            label="Code Playground"
          />
          <SidebarItem
            to="/resources"
            icon={<ExternalLink className="h-6 w-6" />}
            label="Reference Hub"
          />
        </div>
      </nav>
    </aside>
  );
}
