import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, vi } from "vitest";

import {
  registerControlsCases,
  registerGuidanceCase,
} from "./tests/controls.cases";
import { registerCoursePageCases } from "./tests/course-page.cases";
import { registerFullscreenCases } from "./tests/fullscreen.cases";
import { registerMediaCases } from "./tests/media.cases";
import { registerNavigationCases } from "./tests/navigation.cases";
import { registerPlaybackCases } from "./tests/playback.cases";
import { registerVisualCases } from "./tests/visuals.cases";

describe("ESL 10G coursework page", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  registerMediaCases();
  registerCoursePageCases();
  registerNavigationCases();
  registerVisualCases();
  registerControlsCases();
  registerPlaybackCases();
  registerFullscreenCases();
  registerGuidanceCase();
});
