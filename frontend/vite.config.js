import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/product": "http://localhost:8080",
      "/problem": "http://localhost:8080",
    },
  },
});
