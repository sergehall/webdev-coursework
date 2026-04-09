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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: phase === "fading" ? 0 : 1,
      }}
    >
      {/* Radial ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(34,197,94,0.06) 40%, transparent 70%)",
          animation: "splashPulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Wave icon */}
      <div
        style={{
          position: "relative",
          width: 96,
          height: 96,
          animation: "splashFadeIn 500ms ease-out forwards",
          opacity: 0,
        }}
      >
        <img
          src="/animated-wave.svg"
          alt=""
          width={96}
          height={96}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </div>

      <style>{`
        @keyframes splashFadeIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashPulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.12); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
