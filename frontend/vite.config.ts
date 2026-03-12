// frontend/vite.config.ts
import { fileURLToPath } from "url";
import * as path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Use relative path instead of "@/..." alias here
// Because Vite config is executed before alias resolution is applied
import { envSchema } from "./src/config/env/env.schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const courseChunkGroups: Array<[pathSegment: string, chunkName: string]> = [
  ["/courses/CS60/", "course-cs60"],
  ["/courses/CS70/", "course-cs70"],
  ["/courses/CS79A/", "course-cs79a"],
  ["/courses/CS80/", "course-cs80"],
  ["/courses/CS81/", "course-cs81"],
  ["/courses/CS87A/", "course-cs87a"],
];

export default defineConfig(({ mode }) => {
  const envVars = loadEnv(mode, process.cwd(), "");
  const parsed = envSchema.safeParse(envVars);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("❌ Environment validation failed. Check your .env file.");
  }
  const env = parsed.data;
  const isProd = mode === "production";
  const isDebugConfig = process.env.VITE_DEBUG_CONFIG === "1";

  if (!isProd) {
    console.log("✅ mode:", mode);
  }

  if (!isProd && isDebugConfig) {
    console.log("✅ Loaded env keys:", Object.keys(env).sort());
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
      port: 5173,
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
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
