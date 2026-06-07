"use client";

export default function CircularProgress({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative h-24 w-24">
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${percent}% completed`}
      >
        <circle
          className="fill-transparent stroke-gray-200 dark:stroke-gray-800"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
        />
        <circle
          className="fill-transparent stroke-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)] transition-[stroke-dashoffset] duration-700 ease-out"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-900 dark:text-white">
        {percent}%
      </span>
    </div>
  );
}
