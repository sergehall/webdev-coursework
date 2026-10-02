import type { RefObject } from "react";

import {
  ANIMATED_SLIDE,
  ANIMATION_URL,
  MAX_DURATION_MS,
  MIN_DURATION_MS,
  presentationImageUrl,
} from "../config";
import {
  formatElapsedTime,
  type PlaybackState,
  type PresentationSlide,
} from "../domain/playback";

import { PresentationBookend } from "./PresentationBookend";
import {
  BelarusFlight,
  HikingJourney,
  MatthewAnnotation,
  Route66Journey,
  TeacherAnnotation,
} from "./SlideAnnotations";

interface PresentationStageProps {
  readonly playback: PlaybackState;
  readonly slide: PresentationSlide;
  readonly slideVideo: string | undefined;
  readonly videoRef: RefObject<HTMLVideoElement | null>;
  readonly isOpening: boolean;
  readonly isClosing: boolean;
  readonly isFullscreen: boolean;
  readonly showSubtitles: boolean;
}

export function PresentationStage({
  playback,
  slide,
  slideVideo,
  videoRef,
  isOpening,
  isClosing,
  isFullscreen,
  showSubtitles,
}: PresentationStageProps) {
  return (
    <div
      className={`esl10g-slide-stage relative overflow-hidden ${isFullscreen ? "esl10g-slide-stage--fullscreen min-h-0 flex-1" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${isFullscreen ? "h-full" : "aspect-video"}`}
      >
        {ANIMATION_URL && (
          <video
            ref={videoRef}
            src={ANIMATION_URL}
            poster={presentationImageUrl(ANIMATED_SLIDE?.image ?? "")}
            aria-label={slideVideo && "alt" in slide ? slide.alt : undefined}
            aria-hidden={!slideVideo}
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full ${slideVideo ? "" : "hidden"} ${isFullscreen ? "object-contain" : "object-cover"}`}
          />
        )}
        {!slideVideo && "image" in slide && (
          <img
            src={presentationImageUrl(slide.image)}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full ${isFullscreen ? "object-contain" : "object-cover"}`}
          />
        )}
        {(isOpening || isClosing) && (
          <PresentationBookend
            isOpening={isOpening}
            showSubtitles={showSubtitles}
          />
        )}
        {!isOpening && !isClosing && (
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent ${isFullscreen ? "" : "hidden sm:block"}`}
            aria-hidden="true"
          />
        )}
        {!isOpening && !isClosing && slide.title === "Where I’m from" && (
          <BelarusFlight />
        )}
        {!isOpening && !isClosing && slide.title === "Life in California" && (
          <HikingJourney />
        )}
        {!isOpening &&
          !isClosing &&
          "image" in slide &&
          slide.image === "classroom" && <TeacherAnnotation />}
        {!isOpening &&
          !isClosing &&
          slide.title === "A new start in Los Angeles" && <Route66Journey />}
        {!isOpening && !isClosing && slide.title === "Learning together" && (
          <MatthewAnnotation />
        )}
        {playback.playing && (
          <div
            role="timer"
            aria-label="Presentation elapsed time"
            className={`absolute top-4 right-4 rounded-xl border px-3 py-2 text-right text-white shadow-lg backdrop-blur-sm sm:top-6 sm:right-6 ${playback.elapsedMs > MAX_DURATION_MS ? "border-red-300/70 bg-red-900/50" : playback.elapsedMs >= MIN_DURATION_MS ? "border-emerald-300/70 bg-emerald-900/50" : "border-white/30 bg-slate-950/45"}`}
          >
            <span className="block font-mono text-xl font-bold tabular-nums sm:text-2xl">
              {formatElapsedTime(playback.elapsedMs)}
            </span>
          </div>
        )}
      </div>
      {!isOpening && !isClosing && (
        <div
          className={`p-5 text-white sm:p-8 md:p-10 ${isFullscreen ? "absolute inset-x-0 bottom-0" : "sm:absolute sm:inset-x-0 sm:bottom-0"}`}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-sky-200 uppercase">
            Sergei · My story
          </p>
          <h3
            className={`font-bold ${isFullscreen ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl md:text-5xl"}`}
          >
            {slide.title}
          </h3>
          {showSubtitles && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg">
              {slide.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
