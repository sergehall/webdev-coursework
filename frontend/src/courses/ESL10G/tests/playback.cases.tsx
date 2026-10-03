import { act, fireEvent, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { renderPage } from "./renderPage";

export function registerPlaybackCases() {
  it("automatically advances slides, pauses, and shows the speaking time window", () => {
    vi.useFakeTimers();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");

    try {
      const progress = screen.getByRole("progressbar", {
        name: "Presentation speaking time progress",
      });
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(progress).toHaveAttribute("aria-valuenow", "0");
      expect(progress.firstElementChild).toHaveStyle({ width: "0%" });
      expect(
        screen.getByText("10 slides · 7 photos · 1 video · target 2:30–3:30")
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      let timer = screen.getByRole("timer", {
        name: "Presentation elapsed time",
      });
      expect(timer).toHaveTextContent(/^0:00$/);
      act(() => vi.advanceTimersByTime(9_750));
      expect(screen.getByText("1 / 10")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(250));
      expect(screen.getByText("2 / 10")).toBeInTheDocument();
      expect(timer).toHaveTextContent("0:10");
      act(() => vi.advanceTimersByTime(10_500));
      expect(timer).toHaveTextContent("0:20");
      act(() => vi.advanceTimersByTime(13_000));
      expect(screen.getByText("2 / 10")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(250));
      expect(screen.getByText("3 / 10")).toBeInTheDocument();
      expect(timer).toHaveTextContent("0:33");

      fireEvent.click(
        screen.getByRole("button", { name: "Pause presentation" })
      );
      act(() => vi.advanceTimersByTime(10_000));
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(screen.getByText("3 / 10")).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      timer = screen.getByRole("timer");
      expect(timer).toHaveTextContent("0:33");

      fireEvent.click(
        screen.getByRole("button", { name: "Restart presentation" })
      );
      timer = screen.getByRole("timer");
      expect(timer).toHaveTextContent("0:00");
      expect(screen.getByText("1 / 10")).toBeInTheDocument();

      act(() => vi.advanceTimersByTime(150_000));
      expect(timer).toHaveTextContent(/^2:30$/);
      expect(progress).toHaveAttribute("aria-valuenow", "150");
      expect(
        parseFloat((progress.firstElementChild as HTMLElement).style.width)
      ).toBeCloseTo((150 / 210) * 100);
      act(() => vi.advanceTimersByTime(49_750));
      expect(timer).toHaveTextContent(/^3:19$/);
      expect(screen.getByText("9 / 10")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(250));
      expect(timer).toHaveTextContent(/^3:20$/);
      expect(screen.getByText("10 / 10")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(9_750));
      expect(timer).toHaveTextContent(/^3:29$/);
      act(() => vi.advanceTimersByTime(250));
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Play presentation" })
      ).toBeInTheDocument();
      expect(progress).toHaveAttribute("aria-valuenow", "210");
      expect(progress.firstElementChild).toHaveStyle({
        width: "100%",
        backgroundColor: "hsl(0 70% 65%)",
      });

      act(() => vi.advanceTimersByTime(10_000));
      expect(screen.getByText("10 / 10")).toBeInTheDocument();
      expect(progress).toHaveAttribute("aria-valuenow", "210");

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      expect(screen.getByText("1 / 10")).toBeInTheDocument();
      expect(screen.getByRole("timer")).toHaveTextContent(/^0:00$/);

      fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      expect(screen.queryByRole("timer")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Play presentation" })
      ).toBeInTheDocument();
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });
}
