# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server on port 3000
pnpm build        # Build for production
pnpm preview      # Build then preview
pnpm test         # Run tests with vitest
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm cf-typegen   # Generate Cloudflare Worker types
```

## Architecture

This is a **TanStack Start** SSR app (React 19) deployed to **Cloudflare Workers** via Wrangler.

**Routing** — File-based via TanStack Router. Routes live in `src/routes/`. `__root.tsx` defines the HTML shell and global head. `routeTree.gen.ts` is auto-generated — never edit it manually.

**Path alias** — `#/*` maps to `src/*` (configured in `package.json` imports and tsconfig). Use `#/components/...`, `#/lib/...` etc. in imports (or `@/` which is also resolved via `vite-tsconfig-paths`).

**Styling** — Tailwind CSS v4 (Vite plugin, no config file). Global styles in `src/styles.css`. Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

**UI components** — shadcn/ui components live in `src/components/ui/`. Add new ones with `pnpm shadcn add <component>`. These wrap Radix UI primitives.

**Custom components** — `src/components/Beams.jsx` and `src/components/GlitchText.jsx` are creative/animated components used in the Hero. They have companion `.css` files for their keyframe animations.

**3D** — `@react-three/fiber` and `@react-three/drei` are available for Three.js scenes.

**Deployment** — The app runs as a Cloudflare Worker. `wrangler.jsonc` configures the Worker. The SSR entry point is `@tanstack/react-start/server-entry`.
