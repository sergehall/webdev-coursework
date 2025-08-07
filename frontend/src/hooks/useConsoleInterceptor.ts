import { useEffect, useRef } from "react";

// Safe serialization with depth and loop handling
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
        const innerVal = (val as Record<string, unknown>)[key];
        result[key] = stringifyInternal(innerVal, depth + 1);
      }
      return result;
    }

    if (typeof val === "function") {
      const fn = val as (...args: unknown[]) => unknown;
      return `[Function: ${fn.name || "anonymous"}]`;
    }

    if (typeof val === "undefined") {
      return "[undefined]";
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
        .map((arg) => {
          if (typeof arg === "object" && arg !== null) {
            return safeStringify(arg);
          }
          if (typeof arg === "function") {
            const fn = arg as (...args: unknown[]) => unknown;
            return `[Function: ${fn.name || "anonymous"}]`;
          }
          if (typeof arg === "undefined") {
            return "[undefined]";
          }
          return String(arg);
        })
        .join(" ");

      onLogRef.current(formatted);
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);
}
