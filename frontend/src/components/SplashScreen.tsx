import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function SplashScreen({
  onComplete,
  duration = 2200,
}: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    const fadeStart = duration - 600;
    const fadeTimer = setTimeout(() => setPhase("fading"), fadeStart);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 transition-opacity duration-[600ms] ease-in-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Radial ambient glow */}
      <div className="animate-splash-pulse pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.08)_0%,_rgba(34,197,94,0.06)_40%,_transparent_70%)] motion-reduce:animate-none" />

      {/* Wave icon */}
      <div className="animate-splash-fade-in relative h-24 w-24 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
        <img
          src="/animated-wave.svg"
          alt=""
          width={96}
          height={96}
          className="block h-full w-full"
        />
      </div>
    </div>
  );
}
