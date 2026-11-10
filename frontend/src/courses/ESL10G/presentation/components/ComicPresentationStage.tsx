import {
  formatElapsedTime,
  type PlaybackState,
  type PresentationSlide,
} from "../domain/playback";
import { presentation2ImageUrl } from "../presentation2";

export function ComicPresentationStage({
  slide,
  playback,
  showSubtitles,
  isFullscreen,
}: {
  readonly slide: PresentationSlide;
  readonly playback: PlaybackState;
  readonly showSubtitles: boolean;
  readonly isFullscreen: boolean;
}) {
  return (
    <div
      className={`esl10g-slide-stage flex flex-col ${isFullscreen ? "esl10g-slide-stage--fullscreen min-h-0 flex-1" : ""}`}
    >
      <div
        className={`relative ${slide.kind === "closing" ? "comic-ending" : ""} ${isFullscreen ? "min-h-0 flex-1" : "aspect-video"}`}
      >
        {"image" in slide && (
          <img
            src={presentation2ImageUrl(slide.image)}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
        {playback.playing && (
          <div
            role="timer"
            aria-label="Presentation elapsed time"
            className="absolute top-3 right-3 rounded-lg bg-slate-950/85 px-3 py-1 font-mono text-white"
          >
            {formatElapsedTime(playback.elapsedMs)}
          </div>
        )}
      </div>
      {showSubtitles && slide.text && (
        <div
          className={`shrink-0 overflow-y-auto border-t border-white/15 px-5 py-4 text-white ${isFullscreen ? "max-h-[30vh]" : ""}`}
        >
          <h2 className="mb-2 text-sm font-bold text-amber-200">
            {slide.title}
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">{slide.text}</p>
        </div>
      )}
    </div>
  );
}
