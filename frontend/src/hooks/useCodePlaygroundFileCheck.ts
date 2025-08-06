import { useEffect, useState } from "react";

export function useCodePlaygroundFileCheck(file: string | null) {
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!file) {
      setFileExists(null);
      return;
    }

    const path = `/code-playground/${file}`;
    const isJS = file.endsWith(".js") || file.endsWith(".mjs");
    const isPy = file.endsWith(".py");

    const checkFile = async () => {
      try {
        const res = await fetch(path, { method: "GET", cache: "no-store" });
        const contentType = res.headers.get("Content-Type") || "";
        if (res.ok) {
          if (isJS && contentType.includes("javascript")) {
            setFileExists(true);
            return;
          }

          if (
            isPy &&
            (contentType === "" || // fallback for dev server
              contentType.includes("x-python") ||
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
      }
    };

    void checkFile();
  }, [file]);

  return { fileExists };
}
