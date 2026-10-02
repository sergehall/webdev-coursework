import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

export function PlaybackGuidance() {
  const [infoOpen, setInfoOpen] = useState(false);

  const [suppressInfoHover, setSuppressInfoHover] = useState(false);

  const infoContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!infoOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!infoContainer.current?.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [infoOpen]);
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
        Music:{" "}
        <a
          href="https://pixabay.com/music/indie-pop-acoustic-153886/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-sky-700 dark:hover:text-sky-300"
        >
          Acoustic by PaulYudin
        </a>{" "}
        ·{" "}
        <a
          href="https://pixabay.com/music/instrumental-upbeat-acoustic-593084/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-sky-700 dark:hover:text-sky-300"
        >
          Upbeat Acoustic by The_Mountain
        </a>{" "}
        · Pixabay Content License
      </p>
      <div ref={infoContainer} className="relative">
        <button
          type="button"
          aria-label="Playback instructions"
          aria-controls="playback-instructions"
          aria-expanded={infoOpen}
          onClick={() => {
            if (infoOpen) setSuppressInfoHover(true);
            setInfoOpen((open) => !open);
          }}
          onPointerLeave={() => setSuppressInfoHover(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setInfoOpen(false);
          }}
          className="peer flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-sky-400 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-400 dark:border-slate-600 dark:text-slate-300 dark:hover:text-sky-300"
        >
          <Info className="h-5 w-5" aria-hidden="true" />
        </button>
        <div
          id="playback-instructions"
          role="tooltip"
          className={`absolute right-0 bottom-full z-20 mb-2 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${infoOpen ? "block" : suppressInfoHover ? "hidden" : "hidden peer-hover:block peer-focus-visible:block"}`}
        >
          Play shows the opening for 12 seconds, each story slide for 20
          seconds, and the closing for 8 seconds in a 3-minute rehearsal. The
          timer keeps running on the final slide so you can check your speaking
          time. Manual navigation pauses the presentation timer. The Web
          Development video loops automatically when you open that slide. Music
          is off until you press Music; the volume slider starts at 12%. Pause
          also pauses music during timed playback.
        </div>
      </div>
    </div>
  );
}
