import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { PresentationViewer } from "../components/PresentationViewer";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it("navigates immediately without native transitions when reduced motion is requested", () => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.stubGlobal(
    "matchMedia",
    (query: string): MediaQueryList => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    })
  );
  const originalTransition = Object.getOwnPropertyDescriptor(
    document,
    "startViewTransition"
  );
  const startTransition = vi.fn();
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    value: startTransition,
  });

  try {
    render(<PresentationViewer />);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByText("2 / 10")).toBeInTheDocument();

    fireEvent.keyDown(screen.getByLabelText("Presentation 1 slide viewer"), {
      key: "ArrowLeft",
    });
    expect(screen.getByText("1 / 10")).toBeInTheDocument();
    expect(startTransition).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Play presentation" })
    ).toBeInTheDocument();
  } finally {
    if (originalTransition) {
      Object.defineProperty(
        document,
        "startViewTransition",
        originalTransition
      );
    } else {
      Reflect.deleteProperty(document, "startViewTransition");
    }
  }
});
