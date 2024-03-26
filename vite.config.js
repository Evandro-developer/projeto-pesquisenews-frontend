import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteCompression from "vite-plugin-compression";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

export default defineConfig({
  plugins: [
    react(),
    ViteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      verbose: true,
    }),
  ],
  build: {
    sourcemap: process.env.NODE_ENV !== "production",
    rollupOptions: {
      plugins: [dynamicImportVars({})],
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/assets/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/v2": {
        target: "https://newsapi.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2/, "/v2"),
      },
    },
  },
});
