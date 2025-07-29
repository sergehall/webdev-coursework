import { useEffect, useState } from "react";

export function useSandboxFileCheck(file: string | null) {
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!file) {
      setFileExists(null);
      return;
    }

    const path = `/sandbox/${file}`;
    const isLikelyScript = file.endsWith(".js") || file.endsWith(".mjs");

    const checkFile = async () => {
      try {
        const res = await fetch(path, { method: "GET", cache: "no-store" });
        const contentType = res.headers.get("Content-Type") || "";
        const isJavaScript = contentType.includes("javascript");

        if (res.ok && isJavaScript && isLikelyScript) {
          setFileExists(true);
        } else {
          console.warn(
            `❌ File not valid or not found: ${path}\nStatus: ${res.status}, Type: ${contentType}`
          );
          setFileExists(false);
        }
      } catch (err) {
        console.warn(`❌ Error checking file at ${path}`, err);
        setFileExists(false);
      }
    };

    void checkFile();
  }, [file]);

  return { fileExists };
}
