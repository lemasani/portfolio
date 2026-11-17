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

**Visual world: "Exhibit Hall"** — The site is a hands-on science museum: projects are numbered exhibits with placards. Product context lives in `PRODUCT.md`, the visual system in `DESIGN.md`, and the homepage direction contract in `.impeccable/surfaces/`. Tokens (wall, ink, enamel orange/blue/green, plywood) and type voices (`.type-name`, `.type-display`, `.type-label`, `.type-stencil`) are in `src/styles.css`. Homepage pieces live in `src/components/hall/`.

**Motion** — GSAP (+ ScrollTrigger) via `getGsap()` in `src/lib/motion.ts`; scroll entrances are declared with `data-reveal="hinge|stamp|print|flip|rack"` and wired by `useHallReveals`. Content must stay visible without JS; every animation has a reduced-motion path.

**3D** — `@react-three/fiber` and `@react-three/drei` power `SyncScene` (Exhibit 01) and `BellScene` (front desk). Three.js must stay client-only: load scenes with `React.lazy` inside `<ClientOnly>` so they never run during SSR on the Worker.

**Deployment** — The app runs as a Cloudflare Worker. `wrangler.jsonc` configures the Worker. The SSR entry point is `@tanstack/react-start/server-entry`.
