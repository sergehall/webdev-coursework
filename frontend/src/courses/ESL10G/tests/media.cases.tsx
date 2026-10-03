import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { renderPage } from "./renderPage";

export function registerMediaCases() {
  it("buffers the same video from page entry through slide changes", async () => {
    const user = userEvent.setup();
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("preload", "auto");
    expect(video).toHaveAttribute(
      "src",
      "/course-materials/esl10g/presentation/web-development.mp4"
    );
    expect(video).toHaveClass("hidden");
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    for (let i = 0; i < 6; i++)
      await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(container.querySelector("video")).toBe(video);
    expect(video).not.toHaveClass("hidden");
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(container.querySelector("video")).toBe(video);
    expect(video).toHaveClass("hidden");
  });

  it("preloads images in a bounded queue and continues after a failed image", async () => {
    const images: HTMLImageElement[] = [];
    vi.stubGlobal("Image", function () {
      const image = document.createElement("img");
      images.push(image);
      return image;
    });
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
    try {
      expect(images).toHaveLength(2);
      expect(images[0].src).toContain("/brooklyn.png");
      expect(images[0].src).toMatch(/\/brooklyn\.png\?v=[a-f0-9]{12}$/);
      expect(images[0].fetchPriority).toBe("low");
      fireEvent.error(images[0]);
      expect(images).toHaveLength(3);
      await act(async () => {
        fireEvent.load(images[1]);
      });
      expect(images).toHaveLength(4);
      unmount();
      expect(images[2].onload).toBeNull();
    } finally {
      unmount();
      vi.unstubAllGlobals();
    }
  });

  it("plays the video only during the Web Development slide's allotted time", () => {
    vi.useFakeTimers();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
    const videoLabel = "Code being typed and scrolled on a laptop and monitor";

    try {
      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      act(() => vi.advanceTimersByTime(128_500));
      expect(screen.queryByLabelText(videoLabel)).not.toBeInTheDocument();
      act(() => vi.advanceTimersByTime(250));
      const video = screen.getByLabelText(videoLabel) as HTMLVideoElement;
      expect(video).toHaveAttribute(
        "src",
        "/course-materials/esl10g/presentation/web-development.mp4"
      );
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.playsInline).toBe(true);
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

      fireEvent.click(
        screen.getByRole("button", { name: "Pause presentation" })
      );
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(5_000));
      expect(screen.getByText("7 / 10")).toBeInTheDocument();
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
      act(() => vi.advanceTimersByTime(23_750));
      expect(screen.getByText("8 / 10")).toBeInTheDocument();
      expect(screen.queryByLabelText(videoLabel)).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
      expect(screen.getByLabelText(videoLabel)).toBeInTheDocument();
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });

  it("autoplays the video on Next and Previous without starting the presentation timer", () => {
    vi.useFakeTimers();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
    const videoLabel = "Code being typed and scrolled on a laptop and monitor";

    try {
      for (let i = 0; i < 6; i += 1) {
        fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      }
      expect(screen.getByLabelText(videoLabel)).toBeInTheDocument();
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
      act(() => vi.advanceTimersByTime(30_000));
      expect(screen.getByText("7 / 10")).toBeInTheDocument();
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Play presentation" })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      expect(screen.queryByLabelText(videoLabel)).not.toBeInTheDocument();
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
      expect(screen.getByLabelText(videoLabel)).toBeInTheDocument();
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });
}
