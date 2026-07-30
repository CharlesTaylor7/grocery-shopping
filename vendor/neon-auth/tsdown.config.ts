import { defineConfig } from "tsdown";
import { preserveDirectives } from "./build/preserve-directives.ts";
import { createPackageConfig } from "./build/tsdown-base.ts";

export default defineConfig(
  createPackageConfig({
    entry: [
      "src/index.ts",
      "src/types/index.ts",

      "src/react/index.ts",
      "src/react/adapters/index.ts",

      "src/vanilla/index.ts",
      "src/vanilla/adapters/index.ts",
    ],
    plugins: [preserveDirectives()],
    report: {
      gzip: true,
      brotli: true,
    },
    treeshake: true,
  }),
);
