import { useState } from "react";

import { presentationSlides } from "../../courseContent";
import {
  MUSIC_BASE_PATH,
  PHOTO_SLIDE_COUNT,
  VIDEO_SLIDE_COUNT,
} from "../config";
import { usePresentationPlayback } from "../application/usePresentationPlayback";

import { PresentationStage } from "./PresentationStage";
import { PresentationControls } from "./PresentationControls";
import { PresentationProgress } from "./PresentationProgress";
import { PlaybackGuidance } from "./PlaybackGuidance";

export function PresentationViewer() {
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
  } = usePresentationPlayback();
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
      id="presentation-1"
      aria-labelledby="presentation-heading"
      className="scroll-mt-24"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Introduced in Week 3 · Presented in Week 5
          </p>
          <h1
            id="presentation-heading"
            className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            A little about myself
          </h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {presentationSlides.length} slides · {PHOTO_SLIDE_COUNT} photos ·{" "}
          {VIDEO_SLIDE_COUNT} video · target 2:30–3:30
        </p>
      </div>
      <div
        ref={viewerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Presentation 1 slide viewer"
        style={expanded && viewportBounds ? viewportBounds : undefined}
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-sky-400 dark:border-slate-700 ${isFullscreen ? "flex h-dvh h-screen w-full flex-col rounded-none border-0" : ""} ${expanded ? "fixed top-0 left-0 z-[100]" : "relative"}`}
      >
        <audio
          ref={bookendAudioRef}
          src={`${MUSIC_BASE_PATH}/upbeat-acoustic-the-mountain.mp3`}
          preload={musicEnabled ? "auto" : "none"}
          loop
          aria-hidden="true"
        />
        <audio
          ref={storyAudioRef}
          src={`${MUSIC_BASE_PATH}/acoustic-paulyudin.mp3`}
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
        <PresentationControls
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
      <PlaybackGuidance />
    </section>
  );
}
