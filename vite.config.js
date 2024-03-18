import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    ViteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      algorithm: "gzip",
    }),
  ],
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
