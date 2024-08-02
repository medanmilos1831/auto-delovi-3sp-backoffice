import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/auto-delovi-3sp-backoffice/",
  // base: "./",
  server: {
    port: 4202,
  },
});