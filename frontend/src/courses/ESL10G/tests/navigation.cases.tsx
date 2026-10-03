import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { renderPage } from "./renderPage";

export function registerNavigationCases() {
  it("navigates the presentation with buttons, keyboard, and a horizontal swipe", async () => {
    const user = userEvent.setup();
    renderPage("/coursework/ESL10G/presentation-1");

    const viewer = screen.getByLabelText("Presentation 1 slide viewer");
    const previous = screen.getByRole("button", { name: "Previous slide" });
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(previous).toBeDisabled();
    expect(screen.getByText("1 / 10")).toBeInTheDocument();

    await user.click(next);
    expect(screen.getByText("2 / 10")).toBeInTheDocument();
    fireEvent.keyDown(viewer, { key: "ArrowRight" });
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
    fireEvent.touchStart(viewer, { touches: [{ clientX: 200, clientY: 50 }] });
    fireEvent.touchEnd(viewer, {
      changedTouches: [{ clientX: 100, clientY: 55 }],
    });
    expect(screen.getByText("4 / 10")).toBeInTheDocument();

    for (let i = 0; i < 6; i += 1) await user.click(next);
    expect(screen.getByText("10 / 10")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /We learn together/i })
    ).toBeInTheDocument();
    const qrLink = screen.getByRole("link", {
      name: /Open this presentation on your phone/i,
    });
    expect(qrLink).toHaveAttribute(
      "href",
      "https://webdev-coursework.com/coursework/ESL10G/presentation-1?source=esl10g-presentation-qr"
    );
    expect(qrLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(qrLink).toHaveClass("bookend__qr");
    expect(
      screen.getByRole("img", { name: "QR code for this presentation" })
    ).toHaveAttribute(
      "src",
      "/course-materials/esl10g/presentation/presentation-qr.svg"
    );
    expect(screen.getByText("Let’s stay in touch!")).toBeInTheDocument();
    expect(
      screen.getByText("Scan to view • My presentation")
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Subtitles" }));
    expect(qrLink).toHaveClass("bookend__qr");
    expect(screen.getByText("Let’s stay in touch!")).toBeInTheDocument();
    expect(next).toBeDisabled();
  });

  it("waits for the next photo before a native slide transition", async () => {
    renderPage("/coursework/ESL10G/presentation-1");
    const originalTransition = Object.getOwnPropertyDescriptor(
      document,
      "startViewTransition"
    );
    let updateSlide: (() => Promise<void>) | undefined;
    let finishDecode: (() => void) | undefined;
    const decoded = new Promise<void>((resolve) => {
      finishDecode = resolve;
    });
    const startTransition = vi.fn((update: () => Promise<void>) => {
      updateSlide = update;
      return {
        skipTransition: vi.fn(),
        ready: Promise.resolve(),
        finished: new Promise<void>(() => {}),
      } as unknown as ViewTransition;
    });
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: startTransition,
    });
    vi.stubGlobal("Image", function () {
      return { src: "", decode: () => decoded };
    });

    try {
      fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      expect(startTransition).toHaveBeenCalledOnce();
      expect(screen.getByText("1 / 10")).toBeInTheDocument();
      expect(updateSlide).toBeDefined();

      await act(async () => {
        const update = updateSlide?.();
        expect(screen.getByText("1 / 10")).toBeInTheDocument();
        finishDecode?.();
        await update;
      });
      expect(screen.getByText("2 / 10")).toBeInTheDocument();
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
      vi.unstubAllGlobals();
    }
  });
}
