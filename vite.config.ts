import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.jsondataai.com", // API base URL
        changeOrigin: true, // Handles CORS by changing the origin header
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Removes `/api` prefix
        secure: false, // Allows https connections with self-signed certificates (if any)
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
});
