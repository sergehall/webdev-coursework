// frontend/src/hooks/usePostMessageLogs.ts
import { useEffect } from "react";

type SandboxLogMessage = {
  type: "code-playground-log";
  payload: string;
};

export function usePostMessageLogs(onLog: (msg: string) => void) {
  useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      const data = event.data as Partial<SandboxLogMessage>;

      if (
        data?.type === "code-playground-log" &&
        typeof data.payload === "string"
      ) {
        onLog(data.payload);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onLog]);
}
