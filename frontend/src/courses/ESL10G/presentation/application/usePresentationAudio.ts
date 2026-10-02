import { useEffect, useRef, useState } from "react";

import { DEFAULT_MUSIC_VOLUME, MUSIC_FADE_MS } from "../config";

interface PresentationAudioOptions {
  readonly isOpening: boolean;
  readonly isClosing: boolean;
}

export function usePresentationAudio({
  isOpening,
  isClosing,
}: PresentationAudioOptions) {
  const [musicEnabled, setMusicEnabled] = useState(false);

  const [musicPaused, setMusicPaused] = useState(false);

  const [musicVolume, setMusicVolume] = useState(DEFAULT_MUSIC_VOLUME);

  const bookendAudioRef = useRef<HTMLAudioElement | null>(null);

  const storyAudioRef = useRef<HTMLAudioElement | null>(null);

  const musicSection = isOpening || isClosing ? "bookend" : "story";

  useEffect(() => {
    if (isOpening || isClosing) {
      if (bookendAudioRef.current) bookendAudioRef.current.currentTime = 0;
    }
  }, [isOpening, isClosing]);

  useEffect(() => {
    const bookend = bookendAudioRef.current;
    const story = storyAudioRef.current;
    if (!bookend || !story) return;
    if (!musicEnabled || musicPaused) {
      bookend.pause();
      story.pause();
      return;
    }

    const active = musicSection === "bookend" ? bookend : story;
    const outgoing = musicSection === "bookend" ? story : bookend;
    const startVolume = active.paused ? 0 : active.volume;
    const outgoingVolume = outgoing.paused ? 0 : outgoing.volume;
    const targetVolume = musicVolume / 100;
    active.volume = startVolume;
    void active.play().catch(() => setMusicEnabled(false));

    const startedAt = Date.now();
    const fade = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - startedAt) / MUSIC_FADE_MS);
      active.volume = startVolume + (targetVolume - startVolume) * progress;
      outgoing.volume = outgoingVolume * (1 - progress);
      if (progress === 1) {
        outgoing.pause();
        window.clearInterval(fade);
      }
    }, 40);

    return () => window.clearInterval(fade);
  }, [musicEnabled, musicPaused, musicSection, musicVolume]);

  useEffect(() => {
    const bookend = bookendAudioRef.current;
    const story = storyAudioRef.current;
    return () => {
      bookend?.pause();
      story?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (musicEnabled) {
      setMusicEnabled(false);
      return;
    }
    const active =
      musicSection === "bookend"
        ? bookendAudioRef.current
        : storyAudioRef.current;
    if (active) {
      active.volume = 0;
      void active.play().catch(() => setMusicEnabled(false));
    }
    setMusicPaused(false);
    setMusicEnabled(true);
  };

  return {
    bookendAudioRef,
    storyAudioRef,
    musicEnabled,
    musicVolume,
    setMusicVolume,
    setMusicPaused,
    toggleMusic,
  };
}
