import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'


function getCommitSHA() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

function readReleaseVersion() {
  return readFileSync("release.txt", "utf8").trim();
}
export default defineConfig(({ command }) => ({
  define: {
    __RELEASE_VERSION__: command === "build"
      ? JSON.stringify(readReleaseVersion())
      : '"dev"',

    __COMMIT_SHA__: command === "build"
      ? JSON.stringify(getCommitSHA())
      : '"dev"',
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSpliting: true
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
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
    cssMinify: false,
    rolldownOptions: {
      plugins: [
      ],
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
}));
