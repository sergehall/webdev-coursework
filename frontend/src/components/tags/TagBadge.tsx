import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";
import { useEffect, useState } from "react";

import type { TagIconLabel } from "./TagIcons";
import { tagIconMap } from "./TagIcons";

export const TagBadge = ({ label }: { label: TagIconLabel }) => {
  const tag = tagIconMap[label];
  const [open, setOpen] = useState(false);

  // Initialize floating UI positioning with middleware
  const { refs, floatingStyles, update } = useFloating({
    placement: "top", // Position tooltip above the icon by default
    middleware: [
      offset(8), // Add space between icon and tooltip
      flip(), // Flip tooltip below if there's not enough space on top
      shift(), // Shift tooltip horizontally if it overflows the viewport
    ],
  });

  // Automatically reposition tooltip on scroll, resize, or DOM changes
  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) return;

    return autoUpdate(
      refs.reference.current,
      refs.floating.current,
      update // Function that recalculates position
    );
  }, [refs.reference, refs.floating, update]);

  return (
    <div
      // Set reference element for positioning (the icon container)
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)} // Show tooltip on hover
      onMouseLeave={() => setOpen(false)} // Hide tooltip when not hovered
      className="inline-block"
    >
      {/* Icon with background color */}
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${tag.bg}`}
      >
        {tag.icon}
      </span>

      {/* Tooltip */}
      {open && (
        <div
          ref={refs.setFloating} // Tooltip element
          style={floatingStyles} // Inline styles calculated by Floating UI
          className="z-50 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-lg dark:bg-gray-200 dark:text-gray-900"
        >
          {label}
        </div>
      )}
    </div>
  );
};
