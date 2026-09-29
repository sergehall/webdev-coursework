import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ESL10GPage, { ESL10GPresentationPage } from "./ESL10GPage";

function renderPage(route = "/coursework/ESL10G") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/coursework/ESL10G" element={<ESL10GPage />} />
        <Route
          path="/coursework/ESL10G/presentation-1"
          element={<ESL10GPresentationPage />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ESL 10G coursework page", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

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
      act(() => vi.advanceTimersByTime(111_750));
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
      act(() => vi.advanceTimersByTime(22_500));
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
      expect(screen.getByRole("timer")).toHaveTextContent("0:00");
      expect(
        screen.getByRole("button", { name: "Play presentation" })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
      expect(screen.queryByLabelText(videoLabel)).not.toBeInTheDocument();
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
      expect(screen.getByLabelText(videoLabel)).toBeInTheDocument();
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
      expect(screen.getByRole("timer")).toHaveTextContent("0:00");
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });

  it("shows instructor, syllabus summary, and 16 weeks without the slideshow", () => {
    renderPage();
    expect(screen.getByText("Matthew Stivener")).toBeInTheDocument();
    expect(screen.getByText("ESL 10G · Section 2203")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Syllabus overview" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Course textbooks" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Elements of Success 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Pathways: Listening, Speaking, and Critical Thinking 1",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("ISBN: 9780194028202")).toBeInTheDocument();
    expect(screen.getByText("ISBN: 9780357978733")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /^Cover of / })).toHaveLength(2);
    expect(
      screen.getByRole("link", {
        name: /View Elements of Success 1 on the publisher's website/i,
      })
    ).toHaveAttribute(
      "href",
      "https://elt.oup.com/catalogue/items/global/grammar_vocabulary/elements_of_success/elements_of_success_1/9780194028202?cc=us&selLanguage=en&mode=hub&srsltid=AU7gw4WvMd70KZJz1AXSikh6Tn7PnHXMvArghg_1VI8OS53eXtaX-52a"
    );
    expect(
      screen.getByRole("link", {
        name: /View Pathways: Listening, Speaking, and Critical Thinking 1 on the publisher's website/i,
      })
    ).toHaveAttribute("href", "https://www.eltngl.com/products/9780357978733");
    expect(screen.getAllByText(/^Week \d+:/)).toHaveLength(16);
    expect(
      screen.getByText(/Presentation 1 assignment introduced/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/^Presentation 1$/)).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Presentation 1 slide viewer")
    ).not.toBeInTheDocument();
  });

  it("opens the written presentation from week 3 in a text modal with the original PDF download", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText(/Week 3: Present simple/i));
    const button = screen.getByRole("button", {
      name: "Open Presentation 1 text →",
    });
    await user.click(button);

    expect(
      screen.getByRole("dialog", { name: "File preview" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^Good morning, everyone\. My name is Sergei\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^Thank you very much for listening\./)
    ).toBeInTheDocument();
    expect(screen.queryByTitle("Presentation_1.pdf")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Presentation_1.pdf" })
    ).toHaveAttribute(
      "href",
      "/course-materials/esl10g/presentation/Presentation_1.pdf"
    );
    expect(
      screen.queryByLabelText("Presentation 1 slide viewer")
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ESL 10G" })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it("opens the slideshow from week 5", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText(/Week 5: The Marketing Machine/i));
    const link = screen.getByRole("link", {
      name: /Open Presentation 1/i,
    });
    expect(link).toHaveAttribute("href", "/coursework/ESL10G/presentation-1");
    await user.click(link);

    expect(
      screen.getByLabelText("Presentation 1 slide viewer")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to ESL 10G/i })
    ).toHaveAttribute("href", "/coursework/ESL10G");
  });

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
    expect(next).toBeDisabled();
  });

  it("toggles subtitles across the opening, story, and closing slides", async () => {
    const user = userEvent.setup();
    renderPage("/coursework/ESL10G/presentation-1");

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
    expect(
      screen.queryByText(
        "I am from Belarus. Belarus is a small country in Eastern Europe."
      )
    ).not.toBeInTheDocument();

    await user.click(subtitles);
    expect(subtitles).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(
        "I am from Belarus. Belarus is a small country in Eastern Europe."
      )
    ).toBeInTheDocument();

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

  it("automatically advances slides, pauses, and shows the speaking time window", () => {
    vi.useFakeTimers();
    const { unmount } = renderPage("/coursework/ESL10G/presentation-1");

    try {
      const timer = screen.getByRole("timer", {
        name: "Presentation elapsed time",
      });
      const progress = screen.getByRole("progressbar", {
        name: "Presentation speaking time progress",
      });
      expect(timer).toHaveTextContent(/^0:00$/);
      expect(progress).toHaveAttribute("aria-valuenow", "0");
      expect(progress.firstElementChild).toHaveStyle({ width: "0%" });
      expect(
        screen.getByText("10 slides · 7 photos · 1 video · target 2:30–3:30")
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Play presentation" })
      );
      act(() => vi.advanceTimersByTime(12_000));
      expect(screen.getByText("2 / 10")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(10_500));
      expect(timer).toHaveTextContent("0:22");

      fireEvent.click(
        screen.getByRole("button", { name: "Pause presentation" })
      );
      act(() => vi.advanceTimersByTime(10_000));
      expect(timer).toHaveTextContent("0:22");
      expect(screen.getByText("2 / 10")).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Restart presentation" })
      );
      expect(timer).toHaveTextContent("0:00");
      expect(screen.getByText("1 / 10")).toBeInTheDocument();

      act(() => vi.advanceTimersByTime(150_000));
      expect(timer).toHaveTextContent(/^2:30$/);
      expect(progress).toHaveAttribute("aria-valuenow", "150");
      expect(
        parseFloat((progress.firstElementChild as HTMLElement).style.width)
      ).toBeCloseTo((150 / 210) * 100);
      act(() => vi.advanceTimersByTime(61_000));
      expect(timer).toHaveTextContent(/^3:31$/);
      expect(progress).toHaveAttribute("aria-valuenow", "210");
      expect(progress.firstElementChild).toHaveStyle({
        width: "100%",
        backgroundColor: "hsl(0 70% 65%)",
      });

      fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
      expect(
        screen.getByRole("button", { name: "Play presentation" })
      ).toBeInTheDocument();
    } finally {
      unmount();
      vi.useRealTimers();
    }
  });

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
});
