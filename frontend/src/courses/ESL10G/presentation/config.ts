import { presentationSlides, storySlides } from "../courseContent";

import type { PresentationPlaybackConfig } from "./domain/playback";
import { versionedPresentationImageUrl } from "./imageUrl";

export const MIN_DURATION_MS = 2.5 * 60 * 1000;

export const MAX_DURATION_MS = 3.5 * 60 * 1000;

export const PROGRESS_COLOR_CHANGE_MS = 2 * 60 * 1000;

export const BOOKEND_DURATIONS_MS = [10 * 1000, 10 * 1000] as const;

export const STORY_SLIDE_DURATION_MS =
  (MAX_DURATION_MS - BOOKEND_DURATIONS_MS[0] - BOOKEND_DURATIONS_MS[1]) /
  storySlides.length;

export const MUSIC_FADE_MS = 700;

export const DEFAULT_MUSIC_VOLUME = 12;

export const MUSIC_BASE_PATH = "/course-materials/esl10g/presentation/music";

export const presentationImageUrl = (image: string) =>
  versionedPresentationImageUrl(
    `/course-materials/esl10g/presentation/${image}.webp`
  );

export const slideDuration = (index: number) =>
  index === 0
    ? BOOKEND_DURATIONS_MS[0]
    : index === presentationSlides.length - 1
      ? BOOKEND_DURATIONS_MS[1]
      : STORY_SLIDE_DURATION_MS;

export const VIDEO_SLIDE_COUNT = storySlides.filter(
  (slide) => "video" in slide
).length;

export const PHOTO_SLIDE_COUNT = storySlides.length - VIDEO_SLIDE_COUNT;

export const ANIMATED_SLIDE = storySlides.find((slide) => "video" in slide);

export const ANIMATION_URL =
  ANIMATED_SLIDE && "video" in ANIMATED_SLIDE
    ? `/course-materials/esl10g/presentation/${ANIMATED_SLIDE.video}`
    : undefined;

export const defaultPlaybackConfig = {
  slides: presentationSlides,
  imageUrl: presentationImageUrl,
  duration: slideDuration,
} satisfies PresentationPlaybackConfig;
