"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

export default function CircularProgress({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const percent = Math.round((value / max) * 100);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");

    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-24 w-24">
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        strokeWidth={10}
        className="fill-transparent text-[18px]"
        styles={{
          text: {
            fill: isDark ? "#ffffff" : "#111827",
          },
          path: {
            stroke: "#22c55e",
            filter: "drop-shadow(0 0 6px rgba(34,197,94,0.6))", // только на заполненной части
          },
          trail: {
            stroke: isDark ? "#1f2937" : "#e5e7eb",
          },
        }}
      />
    </div>
  );
}
