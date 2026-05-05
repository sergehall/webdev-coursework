// frontend/vite.config.ts
import { fileURLToPath } from "url";
import * as path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { envSchema } from "./src/config/env/env.schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const courseChunkGroups: Array<[pathSegment: string, chunkName: string]> = [
  ["/courses/CS60/", "course-cs60"],
  ["/courses/CS70/", "course-cs70"],
  ["/courses/CS79A/", "course-cs79a"],
  ["/courses/CS79C/", "course-cs79c"],
  ["/courses/CS79D/", "course-cs79d"],
  ["/courses/CS80/", "course-cs80"],
  ["/courses/CS81/", "course-cs81"],
  ["/courses/CS87A/", "course-cs87a"],
];

const jsonLdScriptHash =
  "'sha256-mqaaJKyEBAtrHnTmEqRs3kIzLcqrfe/bwtUYbNSfq2s='";

const productionContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' ${jsonLdScriptHash} 'wasm-unsafe-eval' https://cdn.jsdelivr.net https://code.jquery.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://avatars.githubusercontent.com https://randomuser.me https://www.smc.edu https://www.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cdn.jsdelivr.net https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
  "media-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "frame-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

const productionSecurityHeaders = {
  "Content-Security-Policy": productionContentSecurityPolicy,
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

const developmentSecurityHeaders = {
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

export default defineConfig(({ mode }) => {
  const rawEnv = loadEnv(mode, process.cwd(), "");
  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("❌ Environment validation failed. Check your .env file.");
  }

  const env = parsed.data;
  const isProd = mode === "production";

  if (!isProd) {
    console.log("✅ mode:", mode);
  }

  return {
    base: "/",
    plugins: [
      react({
        jsxImportSource: undefined,
        babel: isProd ? { plugins: [] } : undefined,
      }),
    ],
    server: {
      host: "127.0.0.1",
      port: 3000,
      strictPort: true,
      hmr: false,
      open: "http://localhost:3000",
      headers: developmentSecurityHeaders,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5050",
          changeOrigin: true,
          secure: true,
          timeout: 10_000,
          proxyTimeout: 10_000,
        },
      },
    },
    preview: {
      headers: productionSecurityHeaders,
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT),
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      ),
    },
    optimizeDeps: {
      exclude: ["fsevents", "pyodide"],
    },
    build: {
      outDir: "dist",
      sourcemap: !isProd,
      target: "es2020",
      cssCodeSplit: true,
      minify: "esbuild",
      modulePreload: { polyfill: false },
      treeshake: isProd ? "recommended" : true,
      esbuild: isProd
        ? {
            drop: ["console", "debugger"],
            legalComments: "none",
          }
        : undefined,
      rollupOptions: {
        external: ["fsevents"],
        output: {
          manualChunks(id) {
            const matchedCourse = courseChunkGroups.find(([segment]) =>
              id.includes(segment)
            );
            if (matchedCourse) {
              return matchedCourse[1];
            }

            if (id.includes("node_modules")) {
              if (
                id.includes("react") ||
                id.includes("scheduler") ||
                id.includes("react-router")
              ) {
                return "vendor-react";
              }
              if (
                id.includes("framer-motion") ||
                id.includes("canvas-confetti") ||
                id.includes("react-confetti")
              ) {
                return "vendor-motion";
              }
              if (
                id.includes("lucide-react") ||
                id.includes("react-icons") ||
                id.includes("@floating-ui")
              ) {
                return "vendor-ui";
              }
              if (id.includes("@sentry")) {
                return "vendor-sentry";
              }
              if (id.includes("zod")) {
                return "vendor-zod";
              }

              return "vendor-misc";
            }

            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 700,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
    },
  };
});
