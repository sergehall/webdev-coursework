import { useEffect, useRef, useState } from "react";

export function usePresentationFullscreen() {
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

  useEffect(() => {
    const syncFullscreen = () => {
      setNativeFullscreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

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

  return {
    viewerRef,
    isFullscreen,
    expanded,
    viewportBounds,
    toggleFullscreen,
  };
}
