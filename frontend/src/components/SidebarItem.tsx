import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}

export default function SidebarItem({
  to,
  icon,
  label,
  external = false,
}: SidebarItemProps) {
  const location = useLocation();

  const baseLinkStyle =
    "flex items-center gap-2 px-4 py-3 rounded text-sm font-medium transition-colors";

  const isActive =
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const activeStyle = isActive
    ? "bg-blue-200 dark:bg-blue-600 font-semibold"
    : "";

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseLinkStyle}`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </a>
    );
  }

  return (
    <Link to={to} className={`${baseLinkStyle} ${activeStyle}`}>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
