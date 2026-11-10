import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

export function PlaybackGuidance({
  comic = false,
}: {
  readonly comic?: boolean;
}) {
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
    <div className="relative mt-3 flex items-start justify-between gap-3">
      <p className="min-w-0 flex-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {comic ? (
          <>
            Music:{" "}
            <a
              href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100202"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sky-700 dark:hover:text-sky-300"
            >
              Hot Swing
            </a>
            {" · "}
            <a
              href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700068"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sky-700 dark:hover:text-sky-300"
            >
              Backbay Lounge
            </a>
            {" by "}
            <a
              href="https://incompetech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sky-700 dark:hover:text-sky-300"
            >
              Kevin MacLeod (incompetech.com)
            </a>
            {" · Licensed under "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sky-700 dark:hover:text-sky-300"
            >
              Creative Commons Attribution 4.0
            </a>
            {
              " · Playback uses excerpts, looping, volume adjustment, and crossfades."
            }
          </>
        ) : (
          <>
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
          </>
        )}
      </p>
      <div ref={infoContainer} className="shrink-0">
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
          className={`absolute right-0 bottom-full z-20 mb-2 max-h-[60dvh] w-[min(24rem,100%)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${infoOpen ? "block" : suppressInfoHover ? "hidden" : "hidden peer-hover:block peer-focus-visible:block"}`}
        >
          {comic
            ? "Play shows the cover and ending for 10 seconds each. The six chapters share 3 minutes 10 seconds, with more time for longer paragraphs. Subtitles show the original PDF text below the artwork."
            : "Play shows the opening and closing for 10 seconds each and each story slide for 23.75 seconds. The Web Development video loops automatically when you open that slide."}{" "}
          Playback stops at 3:30. Manual navigation pauses the timer. Music is
          off until you press Music. Volume starts at 12%. Pause also pauses
          music during timed playback.
        </div>
      </div>
    </div>
  );
}
