import { defineConfig } from "@solidjs/start/config";
import Sonda from "sonda/vite";

export default defineConfig({
  middleware: "./src/middleware/index.ts",
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["node:async_hooks"],
    },
  },
  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [Sonda({ open: false })],
  },
});
