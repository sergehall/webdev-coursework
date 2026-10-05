/** API configuration is an origin, never a credential-bearing URL or a path. */
export function normalizeApiOrigin(
  value: string,
  production = import.meta.env.PROD
): string {
  if (value === "") return "";
  const url = new URL(value);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    (production && url.protocol !== "https:") ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "API URL must be an HTTP(S) origin without credentials, path, query or fragment; production requires HTTPS"
    );
  }
  return url.origin;
}

export function buildApiUrl(endpoint: string, base: string): string {
  // Keep credentials and request bodies on the configured API origin. Reject
  // URL authority changes and dot-segment normalization before calling fetch.
  if (
    !endpoint.startsWith("/") ||
    endpoint.startsWith("//") ||
    /[\\\s#]/.test(endpoint) ||
    endpoint
      .split("?", 1)[0]
      .split("/")
      .some((part) => {
        const decoded = decodeURIComponent(part);
        return decoded === "." || decoded === "..";
      })
  ) {
    throw new Error("API endpoint must be an absolute path without traversal");
  }
  return `${normalizeApiOrigin(base)}${endpoint}`;
}
