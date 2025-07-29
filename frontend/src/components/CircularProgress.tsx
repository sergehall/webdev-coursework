// components/CircularProgress.tsx
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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

    // Optional: Listen to changes if you're toggling theme manually
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
    <div className="h-20 w-20">
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        strokeWidth={12}
        styles={buildStyles({
          textColor: isDark ? "#ffffff" : "#1f2937",
          pathColor: "#10b981",
          trailColor: isDark ? "#1f2937" : "#d1d5db",
        })}
      />
    </div>
  );
}
