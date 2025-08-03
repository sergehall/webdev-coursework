"use client";

export default function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const percent = Math.round((value / max) * 100);

  return (
    <div className="w-full max-w-md">
      <div className="mb-1 flex items-center justify-between text-sm font-medium tracking-wide text-gray-800 dark:text-gray-200">
        <span>
          {value} of {max} modules completed
        </span>
        <span>{percent}%</span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300 shadow-inner dark:bg-gray-700">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-950"
          style={{
            width: `${percent}%`,
            transition: "width 0.6s ease-in-out",
            borderRadius: "9999px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/5 mix-blend-overlay dark:bg-white/5" />
      </div>
    </div>
  );
}

// // components/ProgressBar.tsx
// export default function ProgressBar({
//   value,
//   max,
// }: {
//   value: number;
//   max: number;
// }) {
//   const percent = Math.round((value / max) * 100);
//
//   return (
//     <div className="w-full max-w-md">
//       <div className="mb-1 flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
//         <span>
//           {value} of {max} modules completed
//         </span>
//         <span>{percent}%</span>
//       </div>
//       <div className="h-3 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
//         <div
//           className="h-full bg-gradient-to-r from-green-400 to-lime-500 transition-all duration-500"
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }
