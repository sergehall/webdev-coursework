// frontend/vite.config.ts
import { fileURLToPath } from "url";
import * as path from "path";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { envSchema } from "./src/config/env/env.schema";
import { buildContentSecurityPolicy } from "./content-security-policy";
import { workerContentSecurityPolicy } from "./worker-content-security-policy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brooklynImageVersion = createHash("sha256")
  .update(
    readFileSync(
      path.resolve(
        __dirname,
        "public/course-materials/esl10g/presentation/brooklyn.png"
      )
    )
  )
  .digest("hex")
  .slice(0, 12);
// Production preview has no Cloudflare injection, so its CSP needs no nonce.
const productionContentSecurityPolicy = buildContentSecurityPolicy();

// Standalone course HTML and the sandboxed playground preview need embedded CSS.
const courseMaterialsContentSecurityPolicy = buildContentSecurityPolicy({
  allowInlineStyles: true,
});

const productionSecurityHeaders = {
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
  const localApiProxyTarget =
    rawEnv.VITE_LOCAL_API_URL || "http://localhost:5050";

  if (!isProd) {
    console.log("✅ mode:", mode);
  }

  return {
    base: "/",
    plugins: [
      {
        name: "preview-content-security-policy",
        configureServer(server) {
          server.middlewares.use((request, response, next) => {
            if (
              request.method === "GET" &&
              request.headers.host === "localhost:3000" &&
              request.headers.accept?.includes("text/html")
            ) {
              response.writeHead(307, {
                Location: `http://127.0.0.1:3000${request.url ?? "/"}`,
              });
              response.end();
              return;
            }
            const policy = workerContentSecurityPolicy(
              request.url?.split("?", 1)[0] ?? ""
            );
            if (policy) response.setHeader("Content-Security-Policy", policy);
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((request, response, next) => {
            const pathname = request.url?.split("?", 1)[0] ?? "";
            response.setHeader(
              "Content-Security-Policy",
              workerContentSecurityPolicy(pathname) ??
                (pathname.startsWith("/course-materials/") ||
                pathname.startsWith("/code-playground")
                  ? courseMaterialsContentSecurityPolicy
                  : productionContentSecurityPolicy)
            );
            if (
              !pathname.startsWith("/course-materials/") &&
              !pathname.startsWith("/code-playground")
            ) {
              response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            }
            next();
          });
        },
      },
      react({
        jsxImportSource: undefined,
      }),
    ],
    server: {
      host: "127.0.0.1",
      port: 3000,
      strictPort: true,
      hmr: false,
      open: "http://127.0.0.1:3000",
      headers: developmentSecurityHeaders,
      proxy: {
        "/api": {
          target: localApiProxyTarget,
          changeOrigin: true,
          secure: true,
          timeout: 10_000,
          proxyTimeout: 10_000,
        },
        "/quizzes": {
          target: localApiProxyTarget,
          changeOrigin: true,
          secure: true,
          timeout: 10_000,
          proxyTimeout: 10_000,
        },
        "/tokens": {
          target: localApiProxyTarget,
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
      __ESL10G_BROOKLYN_IMAGE_VERSION__: JSON.stringify(brooklynImageVersion),
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
      },
      chunkSizeWarningLimit: 700,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
      coverage: {
        exclude: ["src/courses/ESL10G/tests/**"],
        thresholds: {
          statements: 65,
          branches: 55,
          functions: 60,
          lines: 65,
        },
      },
    },
  };
});
