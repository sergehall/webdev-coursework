import { expectTypeOf, it } from "vitest";

import type {
  PresentationPlaybackConfig,
  PresentationSlide,
  PresentationSlides,
} from "./playback";

// These assertions are checked by the frontend's tsc gate, not Vitest alone.
it("requires a nonempty deck and both playback adapters", () => {
  expectTypeOf<readonly []>().not.toExtend<PresentationSlides>();
  expectTypeOf<
    Pick<PresentationPlaybackConfig, "slides">
  >().not.toExtend<PresentationPlaybackConfig>();
  expectTypeOf<
    Omit<PresentationPlaybackConfig, "imageUrl">
  >().not.toExtend<PresentationPlaybackConfig>();
  expectTypeOf<
    Omit<PresentationPlaybackConfig, "duration">
  >().not.toExtend<PresentationPlaybackConfig>();
});

it("accepts independent video content and requires its media fields", () => {
  const video = {
    kind: "video",
    title: "A different video",
    text: "A new caption",
    image: "another-poster",
    alt: "A different scene",
    video: "another-video.mp4",
  } as const satisfies PresentationSlide;

  expectTypeOf(video).toExtend<PresentationSlide>();
  expectTypeOf<readonly [typeof video]>().toExtend<PresentationSlides>();
  expectTypeOf<Omit<typeof video, "video">>().not.toExtend<PresentationSlide>();
  expectTypeOf<Omit<typeof video, "image">>().not.toExtend<PresentationSlide>();
});
