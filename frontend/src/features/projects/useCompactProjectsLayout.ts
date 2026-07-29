import { useEffect, useState } from "react";

const COMPACT_PROJECTS_QUERY = "(max-width: 767px)";

function getInitialCompactLayout() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia(COMPACT_PROJECTS_QUERY).matches;
}

export function useCompactProjectsLayout() {
  const [isCompact, setIsCompact] = useState(getInitialCompactLayout);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(COMPACT_PROJECTS_QUERY);
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  return isCompact;
}
