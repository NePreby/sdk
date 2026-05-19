import { defineConfig } from 'tsup'

/**
 * One entry per subpath export — produces tree-shakable ESM + CJS
 * bundles + .d.ts under dist/. package.json `exports` mirrors this
 * matrix; every change to entries should be reflected there.
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'iam/index': 'src/iam/index.ts',
    'kms/index': 'src/kms/index.ts',
    'commerce/index': 'src/commerce/index.ts',
    'commerce/admin/index': 'src/commerce/admin/index.ts',
    'commerce/store/index': 'src/commerce/store/index.ts',
    'commerce/types': 'src/commerce/types.ts',
    'billing/index': 'src/billing/index.ts',
    'mpc/index': 'src/mpc/index.ts',
    'paas/index': 'src/paas/index.ts',
    'team/index': 'src/team/index.ts',
    'api/index': 'src/api/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: true,
})
