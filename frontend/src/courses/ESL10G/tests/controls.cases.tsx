import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { renderPage } from "./renderPage";

export function registerControlsCases() {
  it("toggles subtitles across the opening, story, and closing slides", async () => {
    const user = userEvent.setup();
    renderPage("/coursework/ESL10G/presentation-1");
    const belarusSubtitle =
      "I am from Belarus. Belarus is a small country in Eastern Europe. It is near Ukraine, Poland, Lithuania, and Russia.";

    const subtitles = screen.getByRole("button", { name: "Subtitles" });
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(subtitles).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/From Belarus to California — and what I learned/i)
    ).toBeInTheDocument();

    await user.click(subtitles);
    expect(subtitles).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.queryByText(/From Belarus to California — and what I learned/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: "A little about myself" })
    ).toHaveLength(2);

    await user.click(next);
    expect(
      screen.getByRole("heading", { name: "Where I’m from" })
    ).toBeInTheDocument();
    expect(screen.queryByText(belarusSubtitle)).not.toBeInTheDocument();

    await user.click(subtitles);
    expect(subtitles).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(belarusSubtitle)).toBeInTheDocument();

    for (let i = 0; i < 8; i += 1) await user.click(next);
    expect(
      screen.getByText(/Different journeys. One classroom. Thank you for/i)
    ).toBeInTheDocument();
    await user.click(subtitles);
    expect(
      screen.queryByText(/Different journeys. One classroom. Thank you for/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "We learn together" })
    ).toBeInTheDocument();
  });

  it("plays two licensed music tracks at a quiet adjustable volume and can turn them off", () => {
    vi.useFakeTimers();
    const { container, unmount } = renderPage(
      "/coursework/ESL10G/presentation-1"
    );

    try {
      const [bookend, story] = Array.from(container.querySelectorAll("audio"));
      const music = screen.getByRole("button", { name: "Music" });
      const volume = screen.getByRole("slider", { name: "Music volume" });

      expect(bookend).toHaveAttribute(
        "src",
        "/course-materials/esl10g/presentation/music/upbeat-acoustic-the-mountain.mp3"
      );
      expect(story).toHaveAttribute(
        "src",
        "/course-materials/esl10g/presentation/music/acoustic-paulyudin.mp3"
      );
      expect(music).toHaveAttribute("aria-pressed", "false");
      expect(volume).toHaveValue("12");
      expect(bookend).toHaveAttribute("preload", "none");

      fireEvent.click(music);
      expect(music).toHaveAttribute("aria-pressed", "true");
      expect(bookend).toHaveAttribute("preload", "auto");
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(720));
      expect(bookend.volume).toBeCloseTo(0.12);

      fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      act(() => vi.advanceTimersByTime(720));
      expect(story.volume).toBeCloseTo(0.12);
      expect(bookend.volume).toBeCloseTo(0);

      fireEvent.change(volume, { target: { value: "25" } });
      act(() => vi.advanceTimersByTime(720));
      expect(story.volume).toBeCloseTo(0.25);

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      vi.mocked(HTMLMediaElement.prototype.pause).mockClear();
      fireEvent.click(
        screen.getByRole("button", { name: "Pause presentation" })
      );
      const pausedMedia = vi.mocked(HTMLMediaElement.prototype.pause).mock
        .instances;
      expect(pausedMedia).toContain(bookend);
      expect(pausedMedia).toContain(story);

      fireEvent.click(music);
      expect(music).toHaveAttribute("aria-pressed", "false");
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });
}

export function registerGuidanceCase() {
  it("keeps playback guidance behind an information button", async () => {
    const user = userEvent.setup();
    renderPage("/coursework/ESL10G/presentation-1");

    const infoButton = screen.getByRole("button", {
      name: "Playback instructions",
    });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(infoButton).toHaveAttribute("aria-expanded", "false");
    expect(tooltip).toHaveClass("hidden");

    await user.click(infoButton);
    expect(infoButton).toHaveAttribute("aria-expanded", "true");
    expect(tooltip).toHaveClass("block");

    await user.click(tooltip);
    expect(infoButton).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByLabelText("Presentation 1 slide viewer"));
    expect(infoButton).toHaveAttribute("aria-expanded", "false");
    expect(tooltip).toHaveClass("hidden");

    await user.click(infoButton);
    expect(infoButton).toHaveAttribute("aria-expanded", "true");

    await user.click(infoButton);
    expect(infoButton).toHaveAttribute("aria-expanded", "false");
    expect(tooltip).toHaveClass("hidden");
    expect(tooltip).not.toHaveClass("peer-hover:block");

    await user.unhover(infoButton);
    expect(tooltip).toHaveClass("peer-hover:block");
  });
}
