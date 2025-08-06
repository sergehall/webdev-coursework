import { useEffect } from "react";

// Helper: Deep-safe stringify for non-string objects
function safeStringify(value: unknown, depth = 2): string {
  const seen = new WeakSet();

  function recurse(val: unknown, level: number): unknown {
    if (level > depth) return "[Max depth]";
    if (val && typeof val === "object") {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);

      if (Array.isArray(val)) return val.map((v) => recurse(v, level + 1));

      const result: Record<string, unknown> = {};
      for (const key in val as Record<string, unknown>) {
        result[key] = recurse((val as Record<string, unknown>)[key], level + 1);
      }
      return result;
    }

    return val;
  }

  try {
    return JSON.stringify(recurse(value, 0), null, 2);
  } catch {
    return "[Unserializable]";
  }
}

type SandboxLogMessage = {
  source?: "sandbox";
  type: "log";
  payload: unknown[]; // real args from console.log(...)
};

export function usePostMessageLogs(onLog: (msg: string) => void): void {
  useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      const data = event.data as Partial<SandboxLogMessage>;

      if (
        data?.type === "log" &&
        data?.source === "sandbox" &&
        Array.isArray(data.payload)
      ) {
        const formatted = data.payload
          .map((item) =>
            typeof item === "string" ? item : safeStringify(item)
          )
          .join(" ");

        onLog(formatted);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onLog]);
}
