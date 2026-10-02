import { useEffect, useRef, useState } from "react";

import { storySlides } from "../../courseContent";
import { presentationImageUrl } from "../config";

export function usePresentationMedia(slideVideo: string | undefined) {
  const [videoPlaying, setVideoPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Two low-priority image requests at a time avoid flooding a slow connection.
    const queue = [...new Set(storySlides.slice(1).map((item) => item.image))];
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
      image.src = presentationImageUrl(imageName);
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

  return { videoRef, setVideoPlaying };
}
