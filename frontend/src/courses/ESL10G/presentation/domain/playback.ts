interface SlideContent {
  readonly title: string;
  readonly text: string;
}

interface SlideImage {
  readonly image: string;
  readonly alt: string;
}

export type PresentationSlide =
  | (SlideContent & { readonly kind: "opening" | "closing" })
  | (SlideContent &
      SlideImage & { readonly kind: "image" | "opening" | "closing" })
  | (SlideContent &
      SlideImage & { readonly kind: "video"; readonly video: string });

export type PresentationSlides = readonly [
  PresentationSlide,
  ...PresentationSlide[],
];

export interface PresentationPlaybackConfig {
  readonly slides: PresentationSlides;
  readonly imageUrl: (image: string) => string;
  readonly duration: (index: number) => number;
}

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
