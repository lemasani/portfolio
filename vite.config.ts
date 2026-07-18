import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

/**
 * mermaid is only ever imported client-side (see src/components/mdx/Mermaid.tsx),
 * but its huge diagram-renderer dependency graph (cytoscape, katex, dagre, d3,
 * ~25 renderers) still gets statically bundled into the SSR chunk, which OOMs
 * memory-constrained build containers (e.g. Cloudflare Workers Builds).
 * `ssr.external` isn't an option — the Cloudflare Vite plugin requires a
 * self-contained Worker bundle — and an `environments.ssr.resolve.alias` in
 * this config gets silently overwritten when later plugins (tanstackStart)
 * supply their own `environments.ssr` config. Intercepting via `resolveId`
 * with `this.environment.name` isn't subject to that config-merge ordering.
 */
function mermaidSsrStub(): Plugin {
  const stubPath = fileURLToPath(new URL('./src/lib/mermaid-ssr-stub.ts', import.meta.url))

  return {
    name: 'mermaid-ssr-stub',
    enforce: 'pre',
    resolveId(source) {
      if (source === 'mermaid' && this.environment?.name === 'ssr') {
        return stubPath
      }
      return null
    },
  }
}

const config = defineConfig({
  plugins: [
    mermaidSsrStub(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
