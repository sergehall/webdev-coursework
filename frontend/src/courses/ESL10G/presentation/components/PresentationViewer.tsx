import { useState } from "react";

import { presentationSlides } from "../../courseContent";
import {
  MUSIC_BASE_PATH,
  PHOTO_SLIDE_COUNT,
  VIDEO_SLIDE_COUNT,
} from "../config";
import { usePresentationPlayback } from "../application/usePresentationPlayback";
import {
  presentation2Slides,
  presentation2Duration,
  presentation2ImageUrl,
} from "../presentation2";

import { ComicPresentationStage } from "./ComicPresentationStage";
import { PresentationStage } from "./PresentationStage";
import { PresentationControls } from "./PresentationControls";
import { PresentationProgress } from "./PresentationProgress";
import { PlaybackGuidance } from "./PlaybackGuidance";

export function PresentationViewer({
  comic = false,
}: {
  readonly comic?: boolean;
}) {
  const slides = comic ? presentation2Slides : presentationSlides;
  const [showSubtitles, setShowSubtitles] = useState(true);
  const {
    playback,
    slide,
    slideVideo,
    isOpening,
    isClosing,
    togglePlayback,
    restartPlayback,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
    previousSlide,
    nextSlide,
    audio,
    media,
    fullscreen,
  } = usePresentationPlayback(
    comic
      ? {
          slides,
          imageUrl: presentation2ImageUrl,
          duration: presentation2Duration,
        }
      : undefined
  );
  const {
    bookendAudioRef,
    storyAudioRef,
    musicEnabled,
    musicVolume,
    setMusicVolume,
    toggleMusic,
  } = audio;
  const { videoRef } = media;
  const {
    viewerRef,
    isFullscreen,
    expanded,
    viewportBounds,
    toggleFullscreen,
  } = fullscreen;

  return (
    <section
      id={comic ? "presentation-2" : "presentation-1"}
      aria-labelledby="presentation-heading"
      className="scroll-mt-24"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            {comic
              ? "Week 11 · November 10 & 12 · Presentation 2"
              : "Introduced in Week 3 · Presented in Week 5"}
          </p>
          <h1
            id="presentation-heading"
            className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            {comic
              ? "The Flowers We Shouldn’t Have Taken"
              : "A little about myself"}
          </h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {comic
            ? "8 slides · 8 illustrations"
            : `${presentationSlides.length} slides · ${PHOTO_SLIDE_COUNT} photos · ${VIDEO_SLIDE_COUNT} video`}{" "}
          · target 2:30–3:30
        </p>
      </div>
      <div
        ref={viewerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={`Presentation ${comic ? 2 : 1} slide viewer`}
        style={expanded && viewportBounds ? viewportBounds : undefined}
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-sky-400 dark:border-slate-700 ${isFullscreen ? "flex h-dvh h-screen w-full flex-col rounded-none border-0" : ""} ${expanded ? "fixed top-0 left-0 z-[100]" : "relative"}`}
      >
        <audio
          ref={bookendAudioRef}
          src={
            comic
              ? "/course-materials/esl10g/presentation-2/music/hot-swing-kevin-macleod.mp3"
              : `${MUSIC_BASE_PATH}/upbeat-acoustic-the-mountain.mp3`
          }
          preload={musicEnabled ? "auto" : "none"}
          loop
          aria-hidden="true"
        />
        <audio
          ref={storyAudioRef}
          src={
            comic
              ? "/course-materials/esl10g/presentation-2/music/backbay-lounge-kevin-macleod.mp3"
              : `${MUSIC_BASE_PATH}/acoustic-paulyudin.mp3`
          }
          preload={musicEnabled ? "auto" : "none"}
          loop
          aria-hidden="true"
        />
        {isFullscreen && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Close full screen"
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-20 min-h-11 rounded-lg border border-white/30 bg-slate-950/80 px-3 py-2 text-sm font-bold text-white shadow-lg"
          >
            ✕ Exit
          </button>
        )}
        {comic ? (
          <ComicPresentationStage
            slide={slide}
            playback={playback}
            showSubtitles={showSubtitles}
            isFullscreen={isFullscreen}
          />
        ) : (
          <PresentationStage
            playback={playback}
            slide={slide}
            slideVideo={slideVideo}
            videoRef={videoRef}
            isOpening={isOpening}
            isClosing={isClosing}
            isFullscreen={isFullscreen}
            showSubtitles={showSubtitles}
          />
        )}
        <PresentationControls
          slideCount={slides.length}
          playback={playback}
          showSubtitles={showSubtitles}
          musicEnabled={musicEnabled}
          musicVolume={musicVolume}
          isFullscreen={isFullscreen}
          onTogglePlayback={togglePlayback}
          onRestartPlayback={restartPlayback}
          onToggleSubtitles={() => setShowSubtitles((visible) => !visible)}
          onToggleMusic={toggleMusic}
          onMusicVolumeChange={setMusicVolume}
          onToggleFullscreen={toggleFullscreen}
          onPrevious={previousSlide}
          onNext={nextSlide}
        />
        <PresentationProgress playback={playback} />
      </div>
      <PlaybackGuidance comic={comic} />
      {comic && (
        <a
          className="mt-3 inline-block text-sm font-semibold text-sky-700 underline dark:text-sky-300"
          href="/course-materials/esl10g/presentation-2/Presentation_2.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Presentation 2 text (PDF) →
        </a>
      )}
    </section>
  );
}
