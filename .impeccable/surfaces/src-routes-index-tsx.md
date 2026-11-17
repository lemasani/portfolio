---
version: 1
slug: "src-routes-index-tsx"
primary_target: "src/routes/index.tsx"
related_targets: ["src/routes/blog/index.tsx","src/routes/blog/$slug.tsx"]
---

# Surface brief: home (and site-wide world)

**Scope:** `/` homepage, plus the shared world for nav, `/blog` index and `/blog/$slug` posts. Visitor mode: Experience on `/`; Read on blog pages.

**Audience and job:** hiring managers, freelance clients, developers, and Brian himself, equal weight. Leave remembering this site; hiring managers and clients find contact without friction.

**Proof and content:** Exhibit 01 dramatizes Yournextepisode's offline-first sync. Real content only: 2 projects, 4 posts, the "currently exploring" list, the confirmed 3+ years / 10+ projects. Skills section dissolved into exhibit spec slots plus a compact workshop inventory. No experiments section until real demos exist.

**Constraints:** GSAP + Three.js client-only, lazy, paused off screen; Cloudflare SSR memory; reduced-motion alternatives everywhere; content readable without JS/WebGL; blog bodies stay calm (no scroll-driven effects in article text).

## Direction contract

THESIS: The site is a hands-on science museum of Brian's work: each project is an exhibit with a placard, a working thing to push, and a "What's going on?" panel that shows how it was built. It refuses the hero + cards + skills-badges portfolio and the dark-shader developer hero it replaces.

OWN-WORLD: Neutral gallery-wall ground (true off-white, no warm cream), black ink, enamel placards in signal orange, deep museum blue and exhibit green, birch-plywood frame edges, white placards with heavy black borders, stencilled exhibit numerals, chunky round push buttons that physically depress. Archivo across widths (expanded black for names, normal for text, condensed for labels) plus a stencil face for exhibit numbers only.

STORY: Visitors push the button and watch the offline-first sync work, read how it was built, walk the hall of exhibits, check what's coming to the hall, browse the reading room, and ring the front desk to make contact.

FIRST VIEWPORT: Left ~60%: a plywood-framed blue stage holding a live Three.js scene (a phone slab queuing coloured episode blocks, a cloud shelf receiving them), stencil "01" top-left. Right ~40%: white placard, "Brian Lemasani" in expanded black type, one-line positioning, "What's going on?" explanation, live status readout, and the big orange PUSH button (primary action) at the bottom. Wayfinding signage bar above.

FORM: Exhibit Hall, IMPECCABLE'S PICK (position 1 on my grounded list), seed:e16b857f641dcb76. Signature interaction: PUSH cuts the network; blocks queue on the device and reconcile when it returns. Motion grammar (GSAP): one hall-lights-on load timeline; per-element scroll entrances (placards swing on a hinge, numerals stamp, spec slots print, the "coming to the hall" tiles flip); one pinned exhibit that scrubs an exploded view of how this site is built; a 3D front-desk bell that rings.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
