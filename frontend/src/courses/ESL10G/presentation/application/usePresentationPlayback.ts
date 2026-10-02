import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { flushSync } from "react-dom";

import { presentationSlides } from "../../courseContent";
import { presentationImageUrl, slideDuration } from "../config";
import { initialPlayback, type PlaybackState } from "../domain/playback";

import { usePresentationAudio } from "./usePresentationAudio";
import { usePresentationMedia } from "./usePresentationMedia";
import { usePresentationFullscreen } from "./usePresentationFullscreen";

const SWIPE_THRESHOLD = 50;

export function usePresentationPlayback() {
  const [playback, setPlayback] = useState<PlaybackState>(initialPlayback);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const lastTickAt = useRef(0);

  const slideTransition = useRef<ViewTransition | null>(null);

  const navigationRequest = useRef(0);

  const targetSlideIndex = useRef(0);

  const slide = presentationSlides[playback.slideIndex];

  const slideVideo = "video" in slide ? slide.video : undefined;

  const isOpening = "kind" in slide && slide.kind === "opening";

  const isClosing = "kind" in slide && slide.kind === "closing";

  const fullscreen = usePresentationFullscreen();
  const { isFullscreen } = fullscreen;
  const audio = usePresentationAudio({ isOpening, isClosing });
  const { setMusicPaused, bookendAudioRef, storyAudioRef } = audio;
  const media = usePresentationMedia(slideVideo);
  const { setVideoPlaying } = media;

  useEffect(() => {
    targetSlideIndex.current = playback.slideIndex;
  }, [playback.slideIndex]);

  useEffect(
    () => () => {
      slideTransition.current?.skipTransition();
      document.documentElement.classList.remove("esl10g-slide-transition");
      document.documentElement.classList.remove(
        "esl10g-slide-transition--fullscreen"
      );
    },
    []
  );

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
          slideElapsedMs >= slideDuration(slideIndex) &&
          slideIndex < presentationSlides.length - 1
        ) {
          slideElapsedMs -= slideDuration(slideIndex);
          slideIndex += 1;
        }

        const finished =
          slideIndex === presentationSlides.length - 1 &&
          slideElapsedMs >= slideDuration(slideIndex);
        const overshoot = finished
          ? slideElapsedMs - slideDuration(slideIndex)
          : 0;

        return {
          ...current,
          slideIndex,
          slideElapsedMs: Math.min(slideElapsedMs, slideDuration(slideIndex)),
          elapsedMs: current.elapsedMs + delta - overshoot,
          playing: !finished,
        };
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [playback.playing]);

  useEffect(() => {
    if (
      !playback.playing &&
      playback.slideIndex === presentationSlides.length - 1 &&
      playback.slideElapsedMs >= slideDuration(playback.slideIndex)
    ) {
      setMusicPaused(true);
    }
  }, [
    playback.playing,
    playback.slideIndex,
    playback.slideElapsedMs,
    setMusicPaused,
  ]);

  const goToSlide = (index: number) => {
    const nextIndex = Math.max(
      0,
      Math.min(index, presentationSlides.length - 1)
    );
    if (nextIndex === targetSlideIndex.current) return;

    targetSlideIndex.current = nextIndex;
    const request = ++navigationRequest.current;
    const updateSlide = () => {
      if (request !== navigationRequest.current) return;
      setVideoPlaying(true);
      setPlayback((current) => ({
        ...current,
        slideIndex: nextIndex,
        slideElapsedMs: 0,
        playing: false,
      }));
    };

    slideTransition.current?.skipTransition();
    if (
      !document.startViewTransition ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      updateSlide();
      return;
    }

    document.documentElement.classList.add("esl10g-slide-transition");
    document.documentElement.classList.toggle(
      "esl10g-slide-transition--fullscreen",
      isFullscreen
    );
    const transition = document.startViewTransition(async () => {
      const nextSlide = presentationSlides[nextIndex];
      if ("image" in nextSlide && !("video" in nextSlide)) {
        const image = new Image();
        image.src = presentationImageUrl(nextSlide.image);
        if (typeof image.decode === "function") {
          await image.decode().catch(() => {});
        }
      }
      if (request === navigationRequest.current) flushSync(updateSlide);
    });
    slideTransition.current = transition;
    void transition.ready.catch(() => {
      // Rapid navigation can skip a transition before its animation starts.
    });
    const finish = () => {
      if (slideTransition.current !== transition) return;
      slideTransition.current = null;
      document.documentElement.classList.remove("esl10g-slide-transition");
      document.documentElement.classList.remove(
        "esl10g-slide-transition--fullscreen"
      );
    };
    void transition.finished.then(finish, finish);
  };

  const togglePlayback = () => {
    if (
      !playback.playing &&
      playback.slideIndex === presentationSlides.length - 1 &&
      playback.slideElapsedMs >= slideDuration(playback.slideIndex)
    ) {
      restartPlayback();
      return;
    }
    setVideoPlaying(!playback.playing);
    setMusicPaused(playback.playing);
    setPlayback((current) => ({ ...current, playing: !current.playing }));
  };

  const restartPlayback = () => {
    navigationRequest.current += 1;
    slideTransition.current?.skipTransition();
    targetSlideIndex.current = 0;
    setVideoPlaying(true);
    setMusicPaused(false);
    if (bookendAudioRef.current) bookendAudioRef.current.currentTime = 0;
    if (storyAudioRef.current) storyAudioRef.current.currentTime = 0;
    setPlayback({ ...initialPlayback, playing: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(targetSlideIndex.current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(targetSlideIndex.current - 1);
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
    goToSlide(targetSlideIndex.current + (deltaX < 0 ? 1 : -1));
  };

  return {
    playback,
    slide,
    slideVideo,
    isOpening,
    isClosing,
    togglePlayback,
    restartPlayback,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
    previousSlide: () => goToSlide(targetSlideIndex.current - 1),
    nextSlide: () => goToSlide(targetSlideIndex.current + 1),
    audio,
    media,
    fullscreen,
  };
}
