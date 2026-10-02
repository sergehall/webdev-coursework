// Served as a same-origin external script so CSP does not need unsafe-inline.
export const swaggerTurnstileScript = `
const host = document.getElementById('human-verification');
const status = document.getElementById('verification-status');
const retry = document.getElementById('retry');
let widget;
function render() {
  retry.hidden = true;
  status.textContent = 'Complete human verification to open the API documentation.';
  if (widget !== undefined) window.turnstile.remove(widget);
  widget = window.turnstile.render(host, {
    sitekey: host.dataset.sitekey, action: 'api_docs', theme: 'auto', size: host.getBoundingClientRect().width < 300 ? 'compact' : 'flexible', 'response-field': false,
    callback: async token => {
      status.textContent = 'Verifying…';
      try {
        const response = await fetch('/docs/turnstile-verify', {
          method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ token }), signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) throw new Error('Verification failed');
        window.location.replace('/docs');
      } catch {
        status.textContent = 'Verification failed. Please try again.';
        retry.hidden = false;
      }
    },
    'error-callback': () => { status.textContent = 'Verification could not complete. Please try again.'; retry.hidden = false; },
    'timeout-callback': () => { status.textContent = 'Verification timed out. Please try again.'; retry.hidden = false; },
    'expired-callback': () => { status.textContent = 'Verification expired. Please try again.'; retry.hidden = false; }
  });
}
function load() {
  if (window.turnstile) return render();
  const element = document.createElement('script');
  element.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  element.async = true;
  const timer = setTimeout(fail, 15000);
  function fail() { clearTimeout(timer); element.remove(); status.textContent = 'Human verification could not load. Check your connection and try again.'; retry.hidden = false; }
  element.onload = () => { clearTimeout(timer); if (window.turnstile) render(); else fail(); };
  element.onerror = fail;
  document.head.appendChild(element);
}
retry.addEventListener('click', () => { retry.hidden = true; load(); });
load();
`;

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!
  );
}

/** Escape the public site key at the HTML attribute boundary. */
export function swaggerTurnstilePage(siteKey: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Verify access — API documentation</title><style>
      :root { color-scheme: light dark; font-family: system-ui, sans-serif; } body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #111827; color: #f1f5f9; } main { box-sizing: border-box; width: min(460px, calc(100% - 32px)); padding: 28px; border: 1px solid #637287; border-radius: 12px; background: #151d29; } h1 { font-size: 1.5rem; } p { line-height: 1.6; } button { padding: 12px 18px; cursor: pointer; } button:focus-visible { outline: 3px solid #a4d8b9; outline-offset: 3px; } #human-verification { min-height: 65px; }
      </style><script src="/docs/turnstile.js" defer></script></head><body><main><h1>API documentation</h1><p id="verification-status" role="status">Complete human verification to open the API documentation.</p><div id="human-verification" data-sitekey="${escapeHtml(siteKey)}"></div><button id="retry" hidden>Retry verification</button><noscript>Enable JavaScript to complete human verification.</noscript></main></body></html>`;
}
