import { next } from "@vercel/functions";

import { buildContentSecurityPolicy } from "./content-security-policy";

// Only HTML entry points need a per-response nonce. Static files bypass this function.
export const config = {
  matcher: ["/((?!course-materials/|assets/|.*\\.).*)", "/index.html"],
  runtime: "edge",
};

export default function middleware(request: Request) {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...bytes));
  const allowInlineStyles = new URL(request.url).pathname.startsWith(
    "/code-playground"
  );

  return next({
    headers: {
      "Content-Security-Policy": buildContentSecurityPolicy({
        nonce,
        allowInlineStyles,
      }),
    },
  });
}
