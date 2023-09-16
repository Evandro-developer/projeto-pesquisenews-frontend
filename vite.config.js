import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
