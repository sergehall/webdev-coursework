import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { renderPage } from "../tests/renderPage";

import { presentation2Slides } from "./presentation2";

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("opens from Week 11, pairs every chapter with its transcript, and stops navigation at slide eight", () => {
  renderPage();
  fireEvent.click(screen.getByText("Week 11: Food and quantities"));
  fireEvent.click(screen.getByRole("link", { name: "Open Presentation 2 →" }));
  const next = screen.getByRole("button", { name: "Next slide" });
  for (const slide of presentation2Slides) {
    expect(screen.getByRole("img", { name: slide.alt })).toHaveAttribute(
      "src",
      expect.stringMatching(
        new RegExp(
          `/course-materials/esl10g/presentation-2/${slide.image}\\.webp\\?v=[a-f0-9]{12}$`
        )
      )
    );
    if (slide.text) {
      expect(screen.getByText(slide.text)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
      expect(screen.queryByText(slide.text)).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
    }
    fireEvent.click(next);
  }
  expect(next).toBeDisabled();
  expect(screen.getByText("8 / 8")).toBeInTheDocument();
});

it("finishes the eight-slide rehearsal and restarts from the cover", () => {
  vi.useFakeTimers();
  renderPage("/coursework/ESL10G/presentation-2");
  fireEvent.click(screen.getByRole("button", { name: "Play presentation" }));
  act(() => vi.advanceTimersByTime(211_000));
  expect(screen.getByText("8 / 8")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Play presentation" })
  ).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "210"
  );
  fireEvent.click(screen.getByRole("button", { name: "Restart presentation" }));
  expect(screen.getByText("1 / 8")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Pause presentation" })
  ).toBeInTheDocument();
});
