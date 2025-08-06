// frontend/src/pages/CodePlaygroundPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunPlayground } from "@/hooks/useRunPlayground";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import { CodePlaygroundControls } from "@/components/CodePlaygroundControls";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";

export default function CodePlaygroundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);

  const { fileExists } = useCodePlaygroundFileCheck(file);

  // Reset filename and uploaded code when file changes
  useEffect(() => {
    setFilename(null);
    setLastUploadedCode(null);
  }, [file]);

  // Show warning if file not found
  useEffect(() => {
    if (file && fileExists === false) {
      console.warn(`❌ File not found: /code-playground/${file}`);
    }
  }, [file, fileExists]);

  // Intercept console and iframe logs
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev.slice(-99), msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev.slice(-99), msg]));

  // Load code-playground file script
  useEffect(() => {
    if (!file || fileExists !== true) return;

    const existingScript = document.querySelector(
      `script[src="/code-playground/${file}"]`
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `/code-playground/${file}`;
    script.async = true;
    script.type = "module";
    script.setAttribute("data-code-playground-initial", "true");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [file, fileExists]);

  const handleRunAgain = useRunPlayground(
    file,
    fileExists,
    lastUploadedCode,
    setLogs
  );

  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Code Playground
      </h2>

      {/* Loading or error state */}
      {file && fileExists === false && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-800 dark:bg-red-800 dark:text-red-100">
          Error: File <code>{file}</code> not found in Code Playground.
        </div>
      )}
      {file && fileExists === null && (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
          Checking file <code>{file}</code>...
        </div>
      )}

      <CodePlaygroundStatus
        file={file}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      <CodePlaygroundControls
        onClear={() => setLogs([])}
        onRunAgain={handleRunAgain}
        onUpload={(code, name) => {
          void (async () => {
            const search = new URLSearchParams(location.search);
            search.delete("file");
            await navigate({
              pathname: location.pathname,
              search: search.toString(),
            });

            setFilename(name);
            setLastUploadedCode(code);
            runInSandboxedIframe(code);
          })();
        }}
        showRunAgain={Boolean(file || lastUploadedCode)}
      />

      <ConsoleOutput logs={logs} />
    </div>
  );
}
