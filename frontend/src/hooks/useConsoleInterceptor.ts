// frontend/src/hooks/useConsoleInterceptor.ts
import { useEffect, useRef } from "react";

function safeStringify(value: unknown, depthLimit = 3): string {
  const seen = new WeakSet();

  function stringifyInternal(val: unknown, depth: number): unknown {
    if (depth > depthLimit) return "[Max depth exceeded]";
    if (val && typeof val === "object") {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);

      if (Array.isArray(val)) {
        return val.map((item) => stringifyInternal(item, depth + 1));
      }

      const result: Record<string, unknown> = {};
      for (const key in val as Record<string, unknown>) {
        const value = (val as Record<string, unknown>)[key];
        result[key] = stringifyInternal(value, depth + 1);
      }
      return result;
    }

    return val;
  }

  try {
    return JSON.stringify(stringifyInternal(value, 0), null, 2);
  } catch {
    return "[Unserializable object]";
  }
}

export function useConsoleInterceptor(onLog: (msg: string) => void) {
  const onLogRef = useRef(onLog);

  useEffect(() => {
    onLogRef.current = onLog;
  }, [onLog]);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: unknown[]) => {
      const formatted = args
        .map((arg) =>
          typeof arg === "object" && arg !== null
            ? safeStringify(arg)
            : String(arg)
        )
        .join(" ");

      onLogRef.current(formatted);
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);
}
