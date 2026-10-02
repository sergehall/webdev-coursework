import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

import { presentationSlides } from "../../courseContent";
import type { PlaybackState } from "../domain/playback";

interface PresentationControlsProps {
  readonly playback: PlaybackState;
  readonly showSubtitles: boolean;
  readonly musicEnabled: boolean;
  readonly musicVolume: number;
  readonly isFullscreen: boolean;
  readonly onTogglePlayback: () => void;
  readonly onRestartPlayback: () => void;
  readonly onToggleSubtitles: () => void;
  readonly onToggleMusic: () => void;
  readonly onMusicVolumeChange: (volume: number) => void;
  readonly onToggleFullscreen: () => Promise<void>;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
}

export function PresentationControls({
  playback,
  showSubtitles,
  musicEnabled,
  musicVolume,
  isFullscreen,
  onTogglePlayback,
  onRestartPlayback,
  onToggleSubtitles,
  onToggleMusic,
  onMusicVolumeChange,
  onToggleFullscreen,
  onPrevious,
  onNext,
}: PresentationControlsProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/15 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onTogglePlayback}
          aria-label={
            playback.playing ? "Pause presentation" : "Play presentation"
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-bold text-white hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          {playback.playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
          {playback.playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onRestartPlayback}
          aria-label="Restart presentation"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Restart
        </button>
        <button
          type="button"
          onClick={onToggleSubtitles}
          aria-label="Subtitles"
          aria-pressed={showSubtitles}
          className={`inline-flex min-h-10 items-center rounded-lg border px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-sky-300 ${showSubtitles ? "border-sky-300/70 bg-sky-500/20 hover:bg-sky-500/30" : "border-white/30 hover:bg-white/15"}`}
        >
          Subtitles
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label="Music"
            aria-pressed={musicEnabled}
            className={`inline-flex min-h-10 items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-sky-300 ${musicEnabled ? "border-sky-300/70 bg-sky-500/20 hover:bg-sky-500/30" : "border-white/30 hover:bg-white/15"}`}
          >
            {musicEnabled ? (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            )}
            Music
          </button>
          <label htmlFor="presentation-music-volume" className="sr-only">
            Music volume
          </label>
          <input
            id="presentation-music-volume"
            type="range"
            min="0"
            max="100"
            value={musicVolume}
            onChange={(event) =>
              onMusicVolumeChange(Number(event.target.value))
            }
            aria-valuetext={`${musicVolume}%`}
            className="w-16 cursor-pointer accent-sky-400 sm:w-20"
          />
        </div>
        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "Show full screen"}
          aria-pressed={isFullscreen}
          className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">
            {isFullscreen ? "Exit full screen" : "Full screen"}
          </span>
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrevious}
          disabled={playback.slideIndex === 0}
          aria-label="Previous slide"
          className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" /> Previous
        </button>
        <span
          aria-live="polite"
          className="min-w-12 text-center text-sm font-semibold text-white"
        >
          {playback.slideIndex + 1} / {presentationSlides.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={playback.slideIndex === presentationSlides.length - 1}
          aria-label="Next slide"
          className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
