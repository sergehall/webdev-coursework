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

export default defineConfig(({ mode }) => {
  const envVars = loadEnv(mode, process.cwd(), "");
  const parsed = envSchema.safeParse(envVars);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("❌ Environment validation failed. Check your .env file.");
  }
  const env = parsed.data;
  const isProd = mode === "production";

  if (!isProd) {
    console.log("✅ mode:", mode);
    console.log("✅ Loaded env:", env);
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
        // Let Rollup decide chunking. This avoids pulling an oversized vendor bundle on Home.
        // If needed later, we can re-introduce very targeted splits.
        output: {},
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
