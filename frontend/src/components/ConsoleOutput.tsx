import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  logs: string[];
  onInput?: (value: string) => void; // when present, show input bar
  awaitingPrompt?: string; // prompt text from worker
};

export function ConsoleOutput({ logs, onInput, awaitingPrompt }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  // Join logs into a single pre block and drop empty/whitespace-only lines
  const joined = useMemo(() => {
    if (!logs.length) return "";
    const lines: string[] = [];
    for (const chunk of logs) {
      // Normalize chunk into lines
      const parts = String(chunk ?? "").split(/\r?\n/);
      for (const line of parts) {
        if (line.trim() === "") continue; // skip empty lines
        lines.push(line);
      }
    }
    return lines.join("\n");
  }, [logs]);

  // Auto-scroll to bottom on new output or prompt
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [joined, awaitingPrompt]);

  // Autofocus input when awaiting user input
  useEffect(() => {
    if (onInput && inputRef.current) inputRef.current.focus();
  }, [onInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onInput) return;
    const v = value;
    setValue("");
    onInput(v);
  };

  return (
    <div className="relative mt-4 w-full rounded-lg border border-slate-700/50 bg-black text-slate-100">
      {/* Output area */}
      <div
        ref={listRef}
        className="max-h-[60vh] w-full overflow-auto p-3 font-mono text-sm leading-relaxed"
        aria-live="polite"
      >
        {joined ? (
          <pre className="whitespace-pre-wrap break-words">{joined}</pre>
        ) : (
          <div className="opacity-60">console is empty…</div>
        )}
      </div>

      {/* Bottom input bar */}
      {onInput && (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-slate-800 bg-[#0f0f10] p-2"
        >
          <span className="select-none font-mono text-xs text-slate-400">
            {awaitingPrompt || "Input:"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-md border border-slate-700 bg-black px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="type and press Enter…"
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
