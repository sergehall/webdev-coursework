const nativePostMessage = self.postMessage.bind(self);

function stringify(value) {
  if (value === undefined) return "[undefined]";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "function")
    return `[Function: ${value.name || "anonymous"}]`;

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function disableCapability(name) {
  try {
    Object.defineProperty(self, name, {
      configurable: false,
      enumerable: false,
      value: undefined,
      writable: false,
    });
  } catch {
    // Best-effort ergonomics only. The worker response CSP enforces network
    // restrictions even when uploaded code recovers a native prototype method.
  }
}

self.onmessage = (event) => {
  const { type, code, token } = event.data || {};
  if (
    type !== "start" ||
    typeof code !== "string" ||
    typeof token !== "string"
  ) {
    return;
  }

  [
    "fetch",
    "XMLHttpRequest",
    "WebSocket",
    "EventSource",
    "WebTransport",
    "Worker",
    "SharedWorker",
    "BroadcastChannel",
    "importScripts",
    "indexedDB",
    "caches",
  ].forEach(disableCapability);

  const send = (messageType, text = "") =>
    nativePostMessage({
      token,
      type: messageType,
      text: String(text).slice(0, 10_000),
    });

  self.console = Object.freeze({
    log: (...values) => send("log", values.map(stringify).join(" ")),
    info: (...values) => send("log", values.map(stringify).join(" ")),
    warn: (...values) => send("log", `⚠️ ${values.map(stringify).join(" ")}`),
    error: (...values) => send("log", `❌ ${values.map(stringify).join(" ")}`),
  });

  try {
    Function(`"use strict";\n${code}\n//# sourceURL=uploaded-playground.js`)();
    send("result");
  } catch (error) {
    send("error", error?.stack || error?.message || String(error));
  }
};
