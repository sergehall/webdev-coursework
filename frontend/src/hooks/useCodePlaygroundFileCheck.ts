import { useEffect, useState } from "react";

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
    if (!safeFile) {
      setFileExists(false);
      return;
    }

    const path = toCodePlaygroundUrl(safeFile);
    const lower = safeFile.toLowerCase();
    const isJS = lower.endsWith(".js") || lower.endsWith(".mjs");
    const isPy = lower.endsWith(".py");

    const checkFile = async () => {
      try {
        const res = await fetch(path, { method: "GET", cache: "no-store" });
        const contentType = res.headers.get("Content-Type") || "";
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

            const isSafeType = safeContentTypes.some((type) =>
              contentType.includes(type)
            );

            if (isSafeType) {
              setFileExists(true);
              return;
            }
          }
        }

        console.warn(
          `❌ File not valid or not found: ${path}\nStatus: ${res.status}, Type: ${contentType}`
        );
        setFileExists(false);
      } catch (err) {
        console.warn(`❌ Error checking file at ${path}`, err);
        setFileExists(false);
      }
    };

    void checkFile();
  }, [file]);

  return { fileExists };
}
