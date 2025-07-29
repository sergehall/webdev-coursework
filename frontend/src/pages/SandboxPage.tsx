import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { SandboxStatus } from "@/components/SandboxStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunSandbox } from "@/hooks/useRunSandbox";
import { useSandboxFileCheck } from "@/hooks/useSandboxFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import { SandboxControls } from "@/components/SandboxControls";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";

export default function SandboxPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);

  const { fileExists } = useSandboxFileCheck(file);

  useEffect(() => {
    if (file && fileExists === false) {
      console.warn(`❌ File not found: /sandbox/${file}`);
    }
  }, [file, fileExists]);

  useConsoleInterceptor((msg) => setLogs((prev) => [...prev, msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev, msg]));

  useEffect(() => {
    if (!file || fileExists !== true) return;

    const script = document.createElement("script");
    script.src = `/sandbox/${file}`;
    script.async = true;
    script.type = "module";
    script.setAttribute("data-sandbox-initial", "true");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [file, fileExists]);

  const handleRunAgain = useRunSandbox(
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

      <SandboxStatus
        file={file}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      <SandboxControls
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
