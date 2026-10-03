export const jsonLdScriptHash =
  "'sha256-mqaaJKyEBAtrHnTmEqRs3kIzLcqrfe/bwtUYbNSfq2s='";
export const themeInitScriptHash =
  "'sha256-Orgl5GLIWAxo2cVhnRI7Hg/ZhvZWB44SthGfceJ8RT4='";

type PolicyOptions = {
  nonce?: string;
  allowInlineStyles?: boolean;
};

export function buildContentSecurityPolicy({
  nonce,
  allowInlineStyles = false,
}: PolicyOptions = {}) {
  return [
    "default-src 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    `script-src 'self' ${jsonLdScriptHash} ${themeInitScriptHash}${nonce ? ` 'nonce-${nonce}'` : ""} 'wasm-unsafe-eval' https://cdn.jsdelivr.net https://code.jquery.com https://challenges.cloudflare.com https://static.cloudflareinsights.com`,
    `style-src 'self'${allowInlineStyles ? " 'unsafe-inline'" : ""}`,
    "img-src 'self' data: blob: https://images.unsplash.com https://avatars.githubusercontent.com https://randomuser.me https://www.smc.edu https://www.google.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.webdev-coursework.com https://cdn.jsdelivr.net https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
    "media-src 'self' data: blob:",
    "worker-src 'self' blob:",
    "frame-src 'self' blob: https://challenges.cloudflare.com",
    "manifest-src 'self'",
  ].join("; ");
}
