import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  icon: ReactNode; // decorative icon
  label: string; // accessible name
  external?: boolean;
}

export default function SidebarItem({
  to,
  icon,
  label,
  external = false,
}: SidebarItemProps) {
  const location = useLocation();
  const noTapHighlightStyle = {
    WebkitTapHighlightColor: "transparent",
  } as const;

  const baseLinkStyle =
    "[-webkit-tap-highlight-color:transparent] flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 " +
    "rounded border border-transparent text-sm font-medium min-h-[44px] min-w-[44px] " +
    "transition-[background-color,border-color,color] duration-150 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

  const isActive =
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const activeStyle = isActive
    ? "border border-green-400 bg-gradient-to-l from-emerald-100 to-emerald-200 " +
      "dark:border-green-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950 font-semibold"
    : "";

  const inactiveStyle =
    "bg-transparent hover:bg-gray-200 hover:text-gray-900 " +
    "dark:hover:bg-gray-700 dark:hover:text-white dark:active:bg-emerald-800 dark:active:text-white";

  const Content = (
    <>
      {/* icon is decorative for a11y */}
      <span aria-hidden="true">{icon}</span>

      {/* one text node: hidden visually on mobile, visible on md+ */}
      <span className="sr-only md:not-sr-only md:inline">{label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={noTapHighlightStyle}
        className={`${baseLinkStyle} ${inactiveStyle}`}
      >
        {Content}
      </a>
    );
  }

  return (
    <Link
      to={to}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      style={noTapHighlightStyle}
      className={`${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}
    >
      {Content}
    </Link>
  );
}
