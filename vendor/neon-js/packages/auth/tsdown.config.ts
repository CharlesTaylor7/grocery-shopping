import { defineConfig } from 'tsdown';
import path from 'node:path';
import { createPackageConfig } from '../../build/tsdown-base.ts';
import { preserveDirectives } from '../../build/preserve-directives.ts';
import { copyCssBundle } from '../../build/build-utils.ts';

export default defineConfig(
  createPackageConfig({
    entry: [
      'src/index.ts',
      'src/types/index.ts',

      'src/react/index.ts',
      'src/react/adapters/index.ts',

      'src/vanilla/index.ts',
      'src/vanilla/adapters/index.ts',

    ],
    skipNodeModulesBundle: true,
    // Explicitly externalize workspace deps that skipNodeModulesBundle misses
    // (pnpm workspace symlinks resolve outside node_modules, so the
    // node_modules-based heuristic doesn't catch them)
    external: [/^@neondatabase\/auth-ui/],
    noExternal: ['@neondatabase/internal'],
    plugins: [preserveDirectives()],
    report: {
      gzip: true,
      brotli: true,
    },
    treeshake: true,
  })
);
