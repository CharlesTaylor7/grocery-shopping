import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  base: '/grocery-shopping/',
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "docs",
    copyPublicDir: true,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const marker = "/node_modules/";
          const idx = id.lastIndexOf(marker);
          if (idx === -1) return;

          const pkgPath = id.slice(idx + marker.length);
          const parts = pkgPath.split("/");

          if (parts[0].startsWith("@")) {
            return `${parts[0]}/${parts[1]}`;
          }

          return parts[0];
        },
      },
    },
  },
  worker: {
    format: "es",
  },

})
