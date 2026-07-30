import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import alias from "@rollup/plugin-alias";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({ reactAliasesEnabled: false }), tailwindcss()],
  base: "/grocery-shopping/",
  resolve: {
    tsconfigPaths: true,
  },
  worker: {
    format: "es",
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "docs",
    copyPublicDir: true,
    rolldownOptions: {
      plugins: [
        alias({
          entries: [
            { find: "react/client", replacement: "preact/compat" },
            { find: "react", replacement: "preact/compat" },
            { find: "react-dom", replacement: "preact/compat" },
            { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
          ],
        }),
      ],
      output: {
        minify: false,
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
});
