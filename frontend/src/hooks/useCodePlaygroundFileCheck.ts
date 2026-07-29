import { useEffect, useState } from "react";

import {
  PLAYGROUND_FETCH_TIMEOUT_MS,
  PLAYGROUND_MAX_ASSET_SIZE,
  isSupportedPlaygroundFile,
} from "@/features/playground/playground-security";
import {
  normalizePlaygroundRelativePath,
  toCodePlaygroundUrl,
} from "@/utils/playgroundPath";

export function useCodePlaygroundFileCheck(file: string | null) {
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!file) {
      setFileExists(null);
      return;
    }

    const safeFile = normalizePlaygroundRelativePath(file);
    if (!safeFile || !isSupportedPlaygroundFile(safeFile)) {
      setFileExists(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      PLAYGROUND_FETCH_TIMEOUT_MS
    );
    const path = toCodePlaygroundUrl(safeFile);
    const lower = safeFile.toLowerCase();
    const isJS = lower.endsWith(".js") || lower.endsWith(".mjs");
    const isPy = lower.endsWith(".py");
    const isHtml = lower.endsWith(".html") || lower.endsWith(".htm");
    const isJson = lower.endsWith(".json");

    const checkFile = async () => {
      try {
        const res = await fetch(path, {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
          redirect: "error",
          signal: controller.signal,
        });
        const contentType = res.headers.get("Content-Type") || "";
        const declaredSize = Number(res.headers.get("content-length") ?? 0);
        if (declaredSize > PLAYGROUND_MAX_ASSET_SIZE) {
          setFileExists(false);
          return;
        }
        if (res.ok) {
          if (isJS && contentType.includes("javascript")) {
            setFileExists(true);
            return;
          }

          if (isPy) {
            const safeContentTypes = [
              "text/plain",
              "application/octet-stream",
              "application/x-python-code",
              "application/x-python",
              "text/x-python",
              "",
            ];
            if (safeContentTypes.some((t) => contentType.includes(t))) {
              setFileExists(true);
              return;
            }
          }

          if (
            isHtml &&
            (contentType.includes("text/html") ||
              contentType.includes("text/plain"))
          ) {
            setFileExists(true);
            return;
          }

          if (
            isJson &&
            (contentType.includes("application/json") ||
              contentType.includes("text/plain"))
          ) {
            setFileExists(true);
            return;
          }
        }

        console.warn(
          `❌ File not valid or not found: ${path}\nStatus: ${res.status}, Type: ${contentType}`
        );
        setFileExists(false);
      } catch (err) {
        console.warn(`❌ Error checking file at ${path}`, err);
        setFileExists(false);
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void checkFile();
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [file]);

  return { fileExists };
}
