import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/grocery-vanilla/",
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    watch: {
      // Ignore the .nvim directory entirely
      ignored: ['.nvim/**'],
    },
  },
  build: {
    outDir: "docs",
    copyPublicDir: true,
    cssMinify: false,
  }
});
