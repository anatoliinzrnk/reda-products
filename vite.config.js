import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // This creates an alias for the 'src' directory
      "@components": resolve(__dirname, "src/components"), // Example for components folder
    },
  },
});