"use client";

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
      {/* Круглое свечение под прогрессбаром */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[110%] w-[110%] rounded-full bg-green-500 opacity-20 blur-2xl" />
      </div>

      {/* Сам прогрессбар */}
      <div className="relative z-10 h-full w-full rounded-full bg-transparent">
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: isDark ? "#ffffff" : "#111827",
            pathColor: "#22c55e",
            trailColor: isDark ? "#1f2937" : "#e5e7eb",
            textSize: "18px",
          })}
        />
      </div>
    </div>
  );
}

// // components/CircularProgress.tsx
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useEffect, useState } from "react";
//
// export default function CircularProgress({
//   value,
//   max,
// }: {
//   value: number;
//   max: number;
// }) {
//   const percent = Math.round((value / max) * 100);
//   const [isDark, setIsDark] = useState(false);
//
//   useEffect(() => {
//     const checkDark = () => document.documentElement.classList.contains("dark");
//
//     setIsDark(checkDark());
//
//     // Optional: Listen to changes if you're toggling theme manually
//     const observer = new MutationObserver(() => {
//       setIsDark(checkDark());
//     });
//
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//
//     return () => observer.disconnect();
//   }, []);
//
//   return (
//     <div className="h-20 w-20">
//       <CircularProgressbar
//         value={percent}
//         text={`${percent}%`}
//         strokeWidth={12}
//         styles={buildStyles({
//           textColor: isDark ? "#ffffff" : "#1f2937",
//           pathColor: "#10b981",
//           trailColor: isDark ? "#1f2937" : "#d1d5db",
//         })}
//       />
//     </div>
//   );
// }
