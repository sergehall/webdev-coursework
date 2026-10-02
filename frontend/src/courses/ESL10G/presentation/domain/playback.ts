import type { presentationSlides } from "../../courseContent";

export type PresentationSlide = (typeof presentationSlides)[number];

export type PlaybackState = {
  slideIndex: number;
  elapsedMs: number;
  slideElapsedMs: number;
  playing: boolean;
};

export const initialPlayback: PlaybackState = {
  slideIndex: 0,
  elapsedMs: 0,
  slideElapsedMs: 0,
  playing: false,
};

export function formatElapsedTime(elapsedMs: number) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}
