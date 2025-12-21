import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // added this so that electron can load assets correctly
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
