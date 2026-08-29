import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import solid from '@solidjs/vite-plugin'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "solid",
      autoCodeSpliting: true,
    }),
    solid(),
    tailwindcss(),
  ],
  base: "/grocery-v2/",
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "docs",
    copyPublicDir: true,
    cssMinify: false,
    rolldownOptions: {
      plugins: [],
      output: {
        minify: false,
        manualChunks(id: string) {
          // Handle vendored packages
          const vendorMarker = "/vendor/";
          const vendorIdx = id.lastIndexOf(vendorMarker);

          if (vendorIdx !== -1) {
            const pkgPath = id.slice(vendorIdx + vendorMarker.length);
            const pkgName = pkgPath.split("/")[0];

            return pkgName;
          }

          // Handle node_modules packages
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
