import { Camera, Film, Images, LayoutDashboard, Send } from "lucide-react";

import SidebarItem from "../components/SidebarItem";

// Orientation type defines possible sidebar layouts
type Orientation = "auto" | "horizontal" | "vertical";

export default function SidebarPage({
  orientation = "auto",
}: {
  orientation?: Orientation;
}) {
  // Flags to determine forced layout type
  const isForcedHorizontal = orientation === "horizontal";
  const isForcedVertical = orientation === "vertical";

  // Base <aside> container classes depending on layout mode
  const asideClass = isForcedHorizontal
    ? "flex w-full flex-row items-center justify-between px-2 py-1 bg-transparent dark:bg-gray-900"
    : isForcedVertical
      ? "flex w-full flex-col items-start justify-start gap-3 px-4 py-6 bg-transparent dark:bg-gray-900 md:w-56"
      : "flex w-full flex-row md:flex-col items-center md:items-start justify-between md:justify-start px-2 md:px-4 py-1 md:py-6 bg-transparent dark:bg-gray-900 md:w-56";

  // Sidebar navigation items
  const items = [
    {
      to: "/",
      icon: <LayoutDashboard className="h-5 w-5 md:h-6 md:w-6" />,
      label: "Home",
    },
    {
      to: "/coursework",
      icon: <Images className="h-5 w-5 md:h-6 md:w-6" />,
      label: "Coursework",
    },
    {
      to: "/web-developer-path",
      icon: <Camera className="h-5 w-5 md:h-6 md:w-6" />,
      label: "Roadmap",
    },
    {
      to: "/code-playground",
      icon: <Film className="h-5 w-5 md:h-6 md:w-6" />,
      label: "code-playground",
    },
    {
      to: "/resources",
      icon: <Send className="h-5 w-5 md:h-6 md:w-6" />,
      label: "Reference Hub",
    },
  ];

  /**
   * HorizontalBar layout
   * - Used on mobile or when orientation is explicitly set to "horizontal"
   * - Icons only, labels hidden visually (but accessible via aria-label)
   */
  const HorizontalBar = (
    <ul
      role="list"
      className="grid h-full w-full grid-cols-5"
      aria-label="Primary navigation (horizontal)"
    >
      {items.map((it) => (
        <li key={it.to} className="flex items-center justify-center py-0.5">
          <SidebarItem to={it.to} icon={it.icon} label={it.label} />
        </li>
      ))}
    </ul>
  );

  /**
   * VerticalStack layout
   * - Used on desktop or when orientation is explicitly set to "vertical"
   * - Shows both icons and text labels
   */
  const VerticalStack = (
    <ul
      role="list"
      className="flex w-full flex-col justify-start gap-2"
      aria-label="Primary navigation (vertical)"
    >
      {items.map((it) => (
        <li key={it.to}>
          <SidebarItem to={it.to} icon={it.icon} label={it.label} />
        </li>
      ))}
    </ul>
  );

  return (
    <aside className={asideClass}>
      <nav className="w-full" aria-label="Sidebar">
        {/* Forced horizontal layout */}
        {isForcedHorizontal && HorizontalBar}

        {/* Forced vertical layout */}
        {isForcedVertical && VerticalStack}

        {/* Auto layout: horizontal on mobile, vertical on desktop */}
        {orientation === "auto" && (
          <>
            <div className="block md:hidden">{HorizontalBar}</div>
            <div className="hidden md:block">{VerticalStack}</div>
          </>
        )}
      </nav>
    </aside>
  );
}
