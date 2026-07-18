/**
 * Stand-in for the real `mermaid` package during the SSR build only (see
 * vite.config.ts). Mermaid.tsx imports mermaid inside a browser-only
 * useEffect, so this code path never runs on the server — but bundling
 * mermaid's actual dependency graph into the SSR chunk anyway OOMs
 * memory-constrained build containers.
 */
export default {
  initialize() {},
  render(): never {
    throw new Error('mermaid must not be invoked during SSR')
  },
}
