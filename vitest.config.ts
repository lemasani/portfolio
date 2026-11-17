import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkWordCount from './src/lib/remark-word-count'

/**
 * Tests get their own config: vite.config.ts carries the Cloudflare Worker and
 * TanStack Start plugins, which configure a Worker environment that vitest's
 * Node runner can't use. Tests only need path aliases and MDX compilation.
 * Keep the remark plugin list in sync with vite.config.ts.
 */
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkWordCount, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
  test: {
    environment: 'node',
  },
})
