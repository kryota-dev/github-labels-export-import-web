import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: "./docs",
  },
  base: "https://ryota-k0827.github.io/github-labels-export-import-web/",
});
