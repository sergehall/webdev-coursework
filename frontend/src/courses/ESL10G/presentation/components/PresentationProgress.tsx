import { MAX_DURATION_MS, PROGRESS_COLOR_CHANGE_MS } from "../config";
import { formatElapsedTime, type PlaybackState } from "../domain/playback";

export function PresentationProgress({
  playback,
}: {
  readonly playback: PlaybackState;
}) {
  const timeProgress = Math.min(1, playback.elapsedMs / MAX_DURATION_MS);

  const colorProgress = Math.min(
    1,
    Math.max(
      0,
      (playback.elapsedMs - PROGRESS_COLOR_CHANGE_MS) /
        (MAX_DURATION_MS - PROGRESS_COLOR_CHANGE_MS)
    )
  );

  const progressHue = Math.round(130 * (1 - colorProgress));
  return (
    <div
      role="progressbar"
      aria-label="Presentation speaking time progress"
      aria-valuemin={0}
      aria-valuemax={MAX_DURATION_MS / 1000}
      aria-valuenow={Math.min(
        Math.floor(playback.elapsedMs / 1000),
        MAX_DURATION_MS / 1000
      )}
      aria-valuetext={`${formatElapsedTime(playback.elapsedMs)} elapsed`}
      className="h-1 w-full shrink-0 bg-white/15"
    >
      <div
        className="h-full rounded-r-full opacity-80 motion-safe:animate-pulse motion-reduce:opacity-100"
        style={{
          width: `${timeProgress * 100}%`,
          backgroundColor: `hsl(${progressHue} 70% 65%)`,
        }}
      />
    </div>
  );
}
