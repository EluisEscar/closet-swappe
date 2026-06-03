import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        landing: resolve(__dirname, "index.html"),
        mvp: resolve(__dirname, "mvp-react/index.html")
      }
    }
  }
});
