import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { renderPage } from "./renderPage";

export function registerFullscreenCases() {
  it("shows the slide viewer and progress in full screen, then exits", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
    const viewer = screen.getByLabelText("Presentation 1 slide viewer");
    const originalFullscreenElement = Object.getOwnPropertyDescriptor(
      document,
      "fullscreenElement"
    );
    const originalExitFullscreen = Object.getOwnPropertyDescriptor(
      document,
      "exitFullscreen"
    );
    let fullscreenElement: Element | null = null;

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => fullscreenElement,
    });
    Object.defineProperty(viewer, "requestFullscreen", {
      configurable: true,
      value: vi.fn(async () => {
        fullscreenElement = viewer;
        fireEvent(document, new Event("fullscreenchange"));
      }),
    });
    Object.defineProperty(document, "exitFullscreen", {
      configurable: true,
      value: vi.fn(async () => {
        fullscreenElement = null;
        fireEvent(document, new Event("fullscreenchange"));
      }),
    });

    try {
      await user.click(
        screen.getByRole("button", { name: "Show full screen" })
      );
      expect(viewer).toHaveClass("h-dvh");
      expect(viewer.querySelector(".esl10g-slide-stage")).toHaveClass(
        "esl10g-slide-stage--fullscreen"
      );
      expect(
        screen.getByRole("button", { name: "Exit full screen" })
      ).toHaveAttribute("aria-pressed", "true");
      expect(viewer).toContainElement(
        screen.getByRole("progressbar", {
          name: "Presentation speaking time progress",
        })
      );

      await user.click(
        screen.getByRole("button", { name: "Exit full screen" })
      );
      expect(viewer).not.toHaveClass("h-dvh");
      expect(viewer.querySelector(".esl10g-slide-stage")).not.toHaveClass(
        "esl10g-slide-stage--fullscreen"
      );
      expect(
        screen.getByRole("button", { name: "Show full screen" })
      ).toHaveAttribute("aria-pressed", "false");
    } finally {
      unmount();
      if (originalFullscreenElement) {
        Object.defineProperty(
          document,
          "fullscreenElement",
          originalFullscreenElement
        );
      } else {
        Reflect.deleteProperty(document, "fullscreenElement");
      }
      if (originalExitFullscreen) {
        Object.defineProperty(
          document,
          "exitFullscreen",
          originalExitFullscreen
        );
      } else {
        Reflect.deleteProperty(document, "exitFullscreen");
      }
    }
  });

  it.each(["missing", "rejected"])(
    "uses viewport full screen when the API is %s",
    async (availability) => {
      const user = userEvent.setup();
      const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
      const viewer = screen.getByLabelText("Presentation 1 slide viewer");
      Object.defineProperty(viewer, "requestFullscreen", {
        configurable: true,
        value:
          availability === "missing"
            ? undefined
            : vi.fn().mockRejectedValue(new Error("Unsupported")),
      });
      const previousOverflow = document.body.style.overflow;
      await user.click(
        screen.getByRole("button", { name: "Show full screen" })
      );
      expect(viewer).toHaveClass("fixed", "h-dvh");
      expect(document.body.style.overflow).toBe("hidden");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Next slide" }));
      await user.click(screen.getByRole("button", { name: "Next slide" }));
      expect(
        screen.getByRole("heading", { name: "My first years in the U.S." })
      ).toBeInTheDocument();
      await user.click(
        screen.getByRole("button", { name: "Exit full screen" })
      );
      expect(viewer).not.toHaveClass("fixed");
      expect(document.body.style.overflow).toBe(previousOverflow);
      await user.click(
        screen.getByRole("button", { name: "Show full screen" })
      );
      await user.keyboard("{Escape}");
      expect(viewer).not.toHaveClass("fixed");
      await user.click(
        screen.getByRole("button", { name: "Show full screen" })
      );
      unmount();
      expect(document.body.style.overflow).toBe(previousOverflow);
    }
  );

  it("fits the visible viewport as mobile browser toolbars resize it", async () => {
    const viewport = new EventTarget();
    Object.assign(viewport, {
      height: 280,
      width: 844,
      offsetTop: 25,
      offsetLeft: 0,
    });
    vi.stubGlobal("visualViewport", viewport);
    const user = userEvent.setup();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");
    try {
      const viewer = screen.getByLabelText("Presentation 1 slide viewer");
      Object.defineProperty(viewer, "requestFullscreen", { value: undefined });
      await user.click(
        screen.getByRole("button", { name: "Show full screen" })
      );
      expect(viewer).toHaveStyle({
        height: "280px",
        width: "844px",
        top: "25px",
      });
      Object.assign(viewport, { height: 240, offsetTop: 40 });
      act(() => {
        viewport.dispatchEvent(new Event("resize"));
      });
      expect(viewer).toHaveStyle({ height: "240px", top: "40px" });
      await user.click(
        screen.getByRole("button", { name: "Close full screen" })
      );
      expect(viewer).not.toHaveClass("fixed");
      expect(viewer.style.height).toBe("");
    } finally {
      unmount();
      vi.unstubAllGlobals();
    }
  });
}
