import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

import ShowModalButton from "../../components/buttons/ShowModalButton";

import {
  courseWeeks,
  presentationSlides,
  presentationTextParagraphs,
} from "./courseContent";

const SWIPE_THRESHOLD = 50;
const REHEARSAL_DURATION_MS = 3 * 60 * 1000;
const MIN_DURATION_MS = 2.5 * 60 * 1000;
const MAX_DURATION_MS = 3.5 * 60 * 1000;
const PROGRESS_COLOR_CHANGE_MS = 2 * 60 * 1000;
const SLIDE_DURATION_MS = REHEARSAL_DURATION_MS / presentationSlides.length;
const VIDEO_SLIDE_COUNT = presentationSlides.filter(
  (slide) => "video" in slide
).length;
const PHOTO_SLIDE_COUNT = presentationSlides.length - VIDEO_SLIDE_COUNT;
const ANIMATED_SLIDE = presentationSlides.find((slide) => "video" in slide);
const ANIMATION_URL =
  ANIMATED_SLIDE && "video" in ANIMATED_SLIDE
    ? `/course-materials/esl10g/presentation/${ANIMATED_SLIDE.video}`
    : undefined;
const PRESENTATION_TEXT_FILES = [
  {
    fileUrl: "/course-materials/esl10g/presentation/Presentation_1.pdf",
    filename: "Presentation_1.pdf",
    preview: (
      <article className="mx-auto max-w-3xl space-y-4 rounded-xl bg-white p-5 text-base leading-7 text-slate-800 sm:p-8 dark:bg-slate-900 dark:text-slate-200">
        <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
          A little about myself
        </h3>
        {presentationTextParagraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0 || index === presentationTextParagraphs.length - 1
                ? "font-semibold"
                : ""
            }
          >
            {paragraph}
          </p>
        ))}
      </article>
    ),
  },
];

const courseBooks = [
  {
    title: "Elements of Success 1",
    edition: "1st edition",
    authors: "Anne M. Ediger, Randee Falk, and Mari Vargo",
    publisher: "Oxford University Press",
    year: "2014",
    isbn: "9780194028202",
    cover: "/course-materials/esl10g/books/elements-of-success-1.png",
    url: "https://elt.oup.com/catalogue/items/global/grammar_vocabulary/elements_of_success/elements_of_success_1/9780194028202?cc=us&selLanguage=en&mode=hub&srsltid=AU7gw4WvMd70KZJz1AXSikh6Tn7PnHXMvArghg_1VI8OS53eXtaX-52a",
  },
  {
    title: "Pathways: Listening, Speaking, and Critical Thinking 1",
    edition: "3rd edition",
    authors: "John Hughes and Becky Tarver Chase",
    publisher: "Cengage National Geographic Learning",
    year: "2023",
    isbn: "9780357978733",
    cover:
      "/course-materials/esl10g/books/pathways-listening-speaking-critical-thinking-1.png",
    url: "https://www.eltngl.com/products/9780357978733",
  },
];

type PlaybackState = {
  slideIndex: number;
  elapsedMs: number;
  slideElapsedMs: number;
  playing: boolean;
};

const initialPlayback: PlaybackState = {
  slideIndex: 0,
  elapsedMs: 0,
  slideElapsedMs: 0,
  playing: false,
};

function formatElapsedTime(elapsedMs: number) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function resetPageScroll() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function PresentationViewer() {
  const [playback, setPlayback] = useState<PlaybackState>(initialPlayback);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [suppressInfoHover, setSuppressInfoHover] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isFullscreen = nativeFullscreen || expanded;
  const [viewportBounds, setViewportBounds] = useState<{
    height: number;
    width: number;
    top: number;
    left: number;
  } | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const infoContainer = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastTickAt = useRef(0);
  const slide = presentationSlides[playback.slideIndex];
  const slideVideo = "video" in slide ? slide.video : undefined;

  useEffect(() => {
    // Two low-priority image requests at a time avoid flooding a slow connection.
    const queue = [
      ...new Set(presentationSlides.slice(1).map((item) => item.image)),
    ];
    const images: HTMLImageElement[] = [];
    let cancelled = false;
    const loadNext = () => {
      if (cancelled) return;
      const imageName = queue.shift();
      if (!imageName) return;
      const image = new Image();
      images.push(image);
      image.decoding = "async";
      image.fetchPriority = "low";
      image.onload = () => {
        const decoded =
          typeof image.decode === "function"
            ? image.decode()
            : Promise.resolve();
        void decoded.catch(() => {}).then(loadNext);
      };
      image.onerror = loadNext;
      image.src = `/course-materials/esl10g/presentation/${imageName}.png`;
    };
    loadNext();
    loadNext();
    return () => {
      cancelled = true;
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    if (slideVideo && videoRef.current) videoRef.current.currentTime = 0;
  }, [slideVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (videoPlaying && slideVideo) {
      void video.play().catch(() => {
        // The poster remains available if the browser blocks playback.
      });
    } else {
      video.pause();
    }

    return () => video.pause();
  }, [videoPlaying, slideVideo]);

  useEffect(() => {
    if (!playback.playing) return;

    lastTickAt.current = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const delta = Math.max(0, now - lastTickAt.current);
      lastTickAt.current = now;

      setPlayback((current) => {
        if (!current.playing) return current;

        let slideIndex = current.slideIndex;
        let slideElapsedMs = current.slideElapsedMs + delta;
        while (
          slideElapsedMs >= SLIDE_DURATION_MS &&
          slideIndex < presentationSlides.length - 1
        ) {
          slideElapsedMs -= SLIDE_DURATION_MS;
          slideIndex += 1;
        }

        return {
          ...current,
          slideIndex,
          slideElapsedMs: Math.min(slideElapsedMs, SLIDE_DURATION_MS),
          elapsedMs: current.elapsedMs + delta,
        };
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [playback.playing]);

  useEffect(() => {
    if (!infoOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!infoContainer.current?.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [infoOpen]);

  useEffect(() => {
    const syncFullscreen = () => {
      setNativeFullscreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const goToSlide = (index: number) => {
    setVideoPlaying(true);
    setPlayback((current) => ({
      ...current,
      slideIndex: Math.max(0, Math.min(index, presentationSlides.length - 1)),
      slideElapsedMs: 0,
      playing: false,
    }));
  };

  const togglePlayback = () => {
    setVideoPlaying(!playback.playing);
    setPlayback((current) => ({ ...current, playing: !current.playing }));
  };

  const restartPlayback = () => {
    setVideoPlaying(true);
    setPlayback({ ...initialPlayback, playing: true });
  };

  // Keep the complete presentation available when the browser cannot fullscreen
  // arbitrary elements (including iPhone browsers).
  useEffect(() => {
    if (!expanded) return;
    const viewport = window.visualViewport;
    const syncViewport = () => {
      setViewportBounds({
        height: viewport?.height ?? window.innerHeight,
        width: viewport?.width ?? window.innerWidth,
        top: viewport?.offsetTop ?? 0,
        left: viewport?.offsetLeft ?? 0,
      });
    };
    syncViewport();
    viewport?.addEventListener("resize", syncViewport);
    viewport?.addEventListener("scroll", syncViewport);
    window.addEventListener("resize", syncViewport);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewerRef.current?.focus();
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      viewport?.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [expanded]);

  const toggleFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (expanded) {
      setExpanded(false);
      return;
    }
    if (document.fullscreenElement === viewer) {
      await document.exitFullscreen();
      return;
    }
    if (typeof viewer.requestFullscreen === "function") {
      try {
        await viewer.requestFullscreen();
        return;
      } catch {
        // Rejected requests use the same viewport mode as unsupported browsers.
      }
    }
    setExpanded(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(playback.slideIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(playback.slideIndex - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    )
      return;
    goToSlide(playback.slideIndex + (deltaX < 0 ? 1 : -1));
  };

  const timeProgress = Math.min(1, playback.elapsedMs / MAX_DURATION_MS);
  const colorProgress = Math.min(
    1,
    Math.max(
      0,
      (playback.elapsedMs - PROGRESS_COLOR_CHANGE_MS) /
        (MAX_DURATION_MS - PROGRESS_COLOR_CHANGE_MS)
    )
  );
  const progressHue = Math.round(130 * (1 - colorProgress));

  return (
    <section
      id="presentation-1"
      aria-labelledby="presentation-heading"
      className="scroll-mt-24"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Introduced in Week 3 · Presented in Week 5
          </p>
          <h1
            id="presentation-heading"
            className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            A little about myself
          </h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {presentationSlides.length} slides · {PHOTO_SLIDE_COUNT} photos ·{" "}
          {VIDEO_SLIDE_COUNT} video · target 2:30–3:30
        </p>
      </div>

      <div
        ref={viewerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Presentation 1 slide viewer"
        style={expanded && viewportBounds ? viewportBounds : undefined}
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-sky-400 dark:border-slate-700 ${isFullscreen ? "flex h-dvh h-screen w-full flex-col rounded-none border-0" : ""} ${expanded ? "fixed top-0 left-0 z-[100]" : "relative"}`}
      >
        {isFullscreen && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Close full screen"
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-20 min-h-11 rounded-lg border border-white/30 bg-slate-950/80 px-3 py-2 text-sm font-bold text-white shadow-lg"
          >
            ✕ Exit
          </button>
        )}
        <div
          className={`relative overflow-hidden ${isFullscreen ? "min-h-0 flex-1" : ""}`}
        >
          <div
            className={`relative overflow-hidden ${isFullscreen ? "h-full" : "aspect-video"}`}
          >
            {ANIMATION_URL && (
              <video
                ref={videoRef}
                src={ANIMATION_URL}
                poster={`/course-materials/esl10g/presentation/${ANIMATED_SLIDE?.image}.png`}
                aria-label={slideVideo ? slide.alt : undefined}
                aria-hidden={!slideVideo}
                muted
                loop
                playsInline
                preload="auto"
                className={`absolute inset-0 h-full w-full ${slideVideo ? "" : "hidden"} ${isFullscreen ? "object-contain" : "object-cover"}`}
              />
            )}
            {!slideVideo && (
              <img
                src={`/course-materials/esl10g/presentation/${slide.image}.png`}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full ${isFullscreen ? "object-contain" : "object-cover"}`}
              />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent ${isFullscreen ? "" : "hidden sm:block"}`}
              aria-hidden="true"
            />
            <div
              role="timer"
              aria-label="Presentation elapsed time"
              className={`absolute top-4 right-4 rounded-xl border px-3 py-2 text-right text-white shadow-lg backdrop-blur-sm sm:top-6 sm:right-6 ${playback.elapsedMs > MAX_DURATION_MS ? "border-red-300/70 bg-red-900/50" : playback.elapsedMs >= MIN_DURATION_MS ? "border-emerald-300/70 bg-emerald-900/50" : "border-white/30 bg-slate-950/45"}`}
            >
              <span className="block font-mono text-xl font-bold tabular-nums sm:text-2xl">
                {formatElapsedTime(playback.elapsedMs)}
              </span>
            </div>
          </div>
          <div
            className={`p-5 text-white sm:p-8 md:p-10 ${isFullscreen ? "absolute inset-x-0 bottom-0" : "sm:absolute sm:inset-x-0 sm:bottom-0"}`}
          >
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-sky-200 uppercase">
              Sergei · My story
            </p>
            <h3
              className={`font-bold ${isFullscreen ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl md:text-5xl"}`}
            >
              {slide.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg">
              {slide.text}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/15 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={
                playback.playing ? "Pause presentation" : "Play presentation"
              }
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-bold text-white hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-sky-300"
            >
              {playback.playing ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
              {playback.playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={restartPlayback}
              aria-label="Restart presentation"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Restart
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen ? "Exit full screen" : "Show full screen"
              }
              aria-pressed={isFullscreen}
              className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? "Exit full screen" : "Full screen"}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goToSlide(playback.slideIndex - 1)}
              disabled={playback.slideIndex === 0}
              aria-label="Previous slide"
              className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" /> Previous
            </button>
            <span
              aria-live="polite"
              className="min-w-12 text-center text-sm font-semibold text-white"
            >
              {playback.slideIndex + 1} / {presentationSlides.length}
            </span>
            <button
              type="button"
              onClick={() => goToSlide(playback.slideIndex + 1)}
              disabled={playback.slideIndex === presentationSlides.length - 1}
              aria-label="Next slide"
              className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="Presentation speaking time progress"
          aria-valuemin={0}
          aria-valuemax={MAX_DURATION_MS / 1000}
          aria-valuenow={Math.min(
            Math.floor(playback.elapsedMs / 1000),
            MAX_DURATION_MS / 1000
          )}
          aria-valuetext={`${formatElapsedTime(playback.elapsedMs)} elapsed`}
          className="h-1 w-full shrink-0 bg-white/15"
        >
          <div
            className="h-full rounded-r-full opacity-80 motion-safe:animate-pulse motion-reduce:opacity-100"
            style={{
              width: `${timeProgress * 100}%`,
              backgroundColor: `hsl(${progressHue} 70% 65%)`,
            }}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <div ref={infoContainer} className="relative">
          <button
            type="button"
            aria-label="Playback instructions"
            aria-controls="playback-instructions"
            aria-expanded={infoOpen}
            onClick={() => {
              if (infoOpen) setSuppressInfoHover(true);
              setInfoOpen((open) => !open);
            }}
            onPointerLeave={() => setSuppressInfoHover(false)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setInfoOpen(false);
            }}
            className="peer flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-sky-400 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-400 dark:border-slate-600 dark:text-slate-300 dark:hover:text-sky-300"
          >
            <Info className="h-5 w-5" aria-hidden="true" />
          </button>
          <div
            id="playback-instructions"
            role="tooltip"
            className={`absolute right-0 bottom-full z-20 mb-2 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${infoOpen ? "block" : suppressInfoHover ? "hidden" : "hidden peer-hover:block peer-focus-visible:block"}`}
          >
            Play advances each slide about every 23 seconds for a 3-minute
            rehearsal. The timer keeps running on the final slide so you can
            check your speaking time. Manual navigation pauses the presentation
            timer. The Web Development video loops automatically when you open
            that slide.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ESL10GPage() {
  const [presentationTextOpen, setPresentationTextOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div>
        <Link
          to="/coursework"
          onClick={resetPageScroll}
          className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
        >
          ← All coursework
        </Link>
        <p className="mt-7 text-sm font-bold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
          Santa Monica College · Fall 2026
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          ESL 10G
        </h1>
        <p className="mt-2 text-xl text-slate-700 dark:text-slate-200">
          Multiple Skills Preparation: Listening, Speaking & Grammar
        </p>
        <p className="mt-5 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          A low-intermediate course focused on understanding short listening
          passages, communicating about familiar topics, and using English
          grammar with confidence. This page follows the 16-week Fall 2026
          syllabus and collects my class presentations as they become available.
        </p>
      </div>

      <section
        aria-labelledby="course-details-heading"
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 id="course-details-heading" className="sr-only">
          Course information
        </h2>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Instructor
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Matthew Stivener
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Class
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            ESL 10G · Section 2203
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tuesday & Thursday · 9 a.m.–noon
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Location
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Business 101
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Santa Monica College
          </p>
        </div>
      </section>

      <section
        aria-labelledby="outcomes-heading"
        className="rounded-2xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/35"
      >
        <h2
          id="outcomes-heading"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          Syllabus overview
        </h2>
        <p className="mt-2 max-w-4xl leading-7 text-slate-700 dark:text-slate-200">
          This low-intermediate course combines listening, speaking, and
          grammar. By the end of the semester, we practice understanding short
          talks, speaking about familiar topics, and forming clear sentences and
          questions.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Listening
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Find main ideas and supporting details, use context to understand
              vocabulary, and take notes on short passages.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Speaking
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Discuss everyday routines and past or future events, and plan and
              deliver a 3–4 minute oral presentation.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Grammar
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Practice word order, questions, nouns, pronouns, agreement,
              modals, and present, past, and future forms.
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          Coursework includes weekly quizzes, unit tests, speaking assignments,
          journals, Spark homework, participation, and a comprehensive final.
          Check Canvas for current requirements and due dates.
        </p>
      </section>

      <section aria-labelledby="course-books-heading">
        <div className="mb-5">
          <h2
            id="course-books-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Course textbooks
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Textbooks selected by the instructor for ESL 10G.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courseBooks.map((book) => (
            <a
              key={book.isbn}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${book.title} on the publisher's website (opens in a new tab)`}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:flex-row dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-500"
            >
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                className="h-32 w-24 shrink-0 self-start rounded-md border border-slate-200 object-contain shadow-sm sm:h-44 sm:w-32 dark:border-slate-700"
                loading="lazy"
              />
              <div className="min-w-0">
                <h3 className="text-lg leading-snug font-bold text-slate-900 dark:text-white">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                  {book.edition}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {book.authors}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {book.publisher} · © {book.year}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  ISBN: {book.isbn}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="weeks-heading">
        <div className="mb-5">
          <h2
            id="weeks-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            16-week course outline
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Based on the Fall 2026 syllabus. Check Canvas for current classwork
            and due dates.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {courseWeeks.map((week) => (
            <details
              key={week.number}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:open:border-sky-600"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden dark:text-white">
                <span className="flex items-center justify-between gap-3">
                  <span>
                    Week {week.number}: {week.title}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {week.dates}
                  </span>
                </span>
              </summary>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {week.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              {week.milestone && (
                <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                  {week.milestone}
                </p>
              )}
              {week.number === 3 && (
                <button
                  type="button"
                  onClick={() => setPresentationTextOpen(true)}
                  className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
                >
                  Open Presentation 1 text →
                </button>
              )}
              {week.number === 5 && (
                <Link
                  to="/coursework/ESL10G/presentation-1"
                  onClick={resetPageScroll}
                  className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
                >
                  Open Presentation 1 →
                </Link>
              )}
            </details>
          ))}
        </div>
      </section>
      <ShowModalButton
        isOpen={presentationTextOpen}
        onClose={() => setPresentationTextOpen(false)}
        files={PRESENTATION_TEXT_FILES}
      />
    </div>
  );
}

export function ESL10GPresentationPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <Link
        to="/coursework/ESL10G"
        onClick={resetPageScroll}
        className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
      >
        ← Back to ESL 10G
      </Link>
      <PresentationViewer />
    </div>
  );
}
