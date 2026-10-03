/** Minimal official browser API used by account verification. */
export type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light" | "dark" | "auto";
  size: "flexible" | "compact";
  "response-field": false;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "timeout-callback": () => void;
};
export type Turnstile = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
// Share one script load across forms/StrictMode mounts; widget instances remain component-owned.
let scriptPromise: Promise<Turnstile> | undefined;
export function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      // Failed loads are retryable; preserve a successful load for future form navigation.
      scriptPromise = undefined;
      reject(new Error("Human verification could not load."));
    };
    const timer = window.setTimeout(fail, 15000);
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      clearTimeout(timer);
      if (window.turnstile) resolve(window.turnstile);
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return scriptPromise;
}
