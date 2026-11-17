---
name: Lemasani
description: Brian Lemasani's site as a hands-on science museum. Every project is an exhibit with a placard, a working thing to push, and a note on how it was built.
colors:
  wall: "oklch(0.955 0.004 255)"
  wall-deep: "oklch(0.915 0.006 255)"
  placard: "oklch(0.995 0 0)"
  ink: "oklch(0.17 0.012 260)"
  ink-soft: "oklch(0.36 0.014 260)"
  rule: "oklch(0.17 0.012 260 / 0.14)"
  enamel-orange: "oklch(0.68 0.2 38)"
  enamel-orange-deep: "oklch(0.58 0.19 36)"
  enamel-blue: "oklch(0.42 0.19 265)"
  enamel-blue-deep: "oklch(0.33 0.16 266)"
  enamel-green: "oklch(0.63 0.15 152)"
  enamel-yellow: "oklch(0.86 0.16 92)"
  on-blue-soft: "oklch(0.86 0.05 265)"
  ply: "oklch(0.82 0.065 78)"
  ply-edge: "oklch(0.66 0.075 66)"
typography:
  name:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.3vw, 4.15rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.6vw, 4rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 650
    letterSpacing: "0.04em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 72"
  numeral:
    fontFamily: "'Big Shoulders Stencil Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(6rem, 13vw, 11rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1"
  code:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  stage-inset: "3px"
  crate: "4px"
  chip: "0.3rem"
  control: "0.4rem"
  placard: "6px"
  device-phone: "18px"
  round: "9999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  hall-max: "1320px"
  placard-pad: "20px"
  placard-pad-lg: "32px"
  section: "80px"
  section-lg: "112px"
  exhibit-gap: "64px"
  exhibit-gap-lg: "96px"
components:
  push-button:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.round}"
    size: "clamp(104px, 9vw, 136px)"
  push-button-cap:
    backgroundColor: "{colors.enamel-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
  key-button:
    backgroundColor: "{colors.enamel-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  sign-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.placard}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  sign-button-hover:
    backgroundColor: "{colors.enamel-orange}"
    textColor: "{colors.ink}"
  exhibit-visit-link:
    backgroundColor: "{colors.enamel-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  exhibit-visit-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.placard}"
  placard:
    backgroundColor: "{colors.placard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.placard}"
    padding: "{spacing.placard-pad}"
  ply-frame:
    backgroundColor: "{colors.ply}"
    rounded: "{rounded.placard}"
    padding: "clamp(8px, 1vw, 14px)"
  stage:
    backgroundColor: "{colors.enamel-blue}"
    textColor: "{colors.placard}"
    rounded: "{rounded.stage-inset}"
  signage-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.placard}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "44px"
  signage-sign-active:
    backgroundColor: "{colors.enamel-orange}"
    textColor: "{colors.ink}"
  crate:
    backgroundColor: "{colors.ply}"
    textColor: "{colors.ink}"
    rounded: "{rounded.crate}"
    padding: "20px"
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    height: "36px"
    padding: "0 12px"
  tag-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.placard}"
  search-field:
    backgroundColor: "{colors.placard}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px 0 44px"
---

# Design System: Lemasani

## Overview

**Creative North Star: "The Exhibit Hall"**

The site is a hands-on science museum of Brian's work, lit like a daytime gallery. A neutral, faintly cool gallery wall carries everything; on it hang white placards with heavy black borders, birch-plywood frames around deep-blue stages, and enamel signage in signal orange, museum blue and exhibit green. Each project is an exhibit with a stencilled number, a label-printer spec strip, a placard, and something real to look at or push. Wayfinding is literal: a black sign strip with arrows, a "Map" on phones, a front desk with a bell, a reading room with a literature rack.

The world is physical and tactile but never costume. Depth comes from objects (plywood casts a soft drop shadow, a push button has a skirt and travels when pressed), not from decorative effects. Type is one family, Archivo, used at three widths: expanded black for names, wide heavy for display, condensed caps for labels. A stencil face appears only on exhibit numerals. Motion is mechanical and specific to each object: placards swing on a hinge, numerals stamp, spec strips print, crates flip, pamphlets drop into the rack. Every motion is opt-in, every scene degrades, and the reading room calms down so long technical writing stays comfortable.

It is a light theme by use scene (daylit desks, bright gallery light). It rejects the generic dev-portfolio template, the SaaS landing page, the hacker/terminal costume, and anything overdesigned enough to get in the way of the work or the writing.

**Key Characteristics:**
- Neutral cool gallery-wall ground, black ink, white placards with 3px ink borders.
- Full enamel palette with fixed roles: orange acts, blue stages, green means live, plywood frames.
- One family at three widths (125% / 112% / 72%), a stencil for exhibit numerals only, mono for code only.
- Depth from physical objects only: plywood drop, button skirts, device shadows inside a stage.
- Object-specific GSAP reveals, visible by default, skipped entirely under reduced motion.
- Two Three.js scenes (sync demo, front-desk bell), lazy and client-only, paused off screen.

## Colors

A full, saturated enamel palette on a near-colourless wall, where every hue has one job.

### Primary
- **Signal Enamel Orange** (enamel-orange): the colour of acting. The PUSH cap, the "Ring for service" and "Bring the phone forward" keys, the "Visit" exhibit link, sign hover and the active sign ("Writing" on blog routes), text selection, caret and form accent. Always carries ink text, never white.
- **Fired Orange** (enamel-orange-deep): orange's shadow side. The skirt under every orange pressable, list markers in prose, and the deep step for an orange layer edge.

### Secondary
- **Museum Blue** (enamel-blue): the stage. Fills the blue box inside every plywood frame (sync scene, display case), the focus ring (3px outline, 3px offset), and in-text links in the reading room.
- **Deep Museum Blue** (enamel-blue-deep): link hover in prose and the edge of a blue plate in the exploded view.
- **Stage Caption Blue** (on-blue-soft): secondary captions on the blue stage ("Click a block to nudge it"), where white would compete with the primary stage labels.

### Tertiary
- **Exhibit Green** (enamel-green): live and synced. The "Online" status dot, the "Live" status dot on exhibits, the antenna tip and synced blocks in the sync scene, and one of the three guide bands in the reading rack.
- **Label Yellow** (enamel-yellow): reserved for labels on dark grounds. Declared and owner-confirmed, but not yet placed on any shipped surface; labels on the blue stage currently use placard white and Stage Caption Blue.
- **Birch Ply** (ply) and **Laminated Edge** (ply-edge): framing material, never a fill for content. Ply is the face of every frame and crate (with the procedurally generated birch-face texture laid over it); the edge colour sits under the laminated-edge texture on sills and the rack ledge.

### Neutral
- **Gallery Wall** (wall): the page ground and the sticky signage background. A cool off-white (hue 255, chroma 0.004), never warm cream.
- **Deep Wall** (wall-deep): secondary floor. The reading-room band on the homepage, "What's going on?" panels inside placards, inline code, blockquotes, the browser chrome on display-case screenshots, the scrollbar track.
- **Placard White** (placard): placards, cards, code blocks, the search field, text on ink and on blue.
- **Ink** (ink): all text, all structural borders and rules, the signage strip, the push-button well, the "Coming to the hall" section ground.
- **Soft Ink** (ink-soft): secondary copy, captions, dates, excerpts.
- **Hairline** (rule): ink at 14% for table cell rules and the shadcn border bridge. Structural lines use full ink instead.

3D and diagram materials cannot read CSS custom properties, so the Three.js scenes and the Mermaid theme carry hex approximations of these tokens (orange, green, yellow and white blocks; ink-black device; pale-yellow note fill in diagrams).

### Named Rules
**The Enamel Roles Rule.** Orange is something you press or follow, blue is a stage or a link, green means live or synced, plywood is a frame. A hue never borrows another's job: no green buttons, no orange status-of-success, no plywood behind body text.

**The Gallery Wall Rule.** The ground is neutral and faintly cool (hue 255, chroma at or below 0.006). Warm cream, beige or paper tones are out; warmth in this world comes only from plywood.

**The Ink-on-Enamel Rule.** Text on orange, green, yellow and plywood is ink. Text on blue and on ink is placard white.

## Typography

**Display Font:** Archivo Variable, width axis (fallback Archivo, ui-sans-serif, system-ui)
**Body Font:** Archivo Variable at normal width
**Numeral Font:** Big Shoulders Stencil Variable (exhibit numerals only)
**Code Font:** JetBrains Mono Variable (code only)

All self-hosted through @fontsource. Synthetic faces are disabled (`font-synthesis: none`).

**Character:** One grotesque stretched to three widths does the work of a whole museum sign shop: expanded black for the name on the door, wide heavy for exhibit titles, condensed caps for the labels on the wall. The stencil numerals are painted onto crates and walls; they are wayfinding, not decoration.

### Hierarchy
- **Name** (900, 125% width, clamp(2.6rem, 4.3vw, 4.15rem), line-height 0.9, -0.025em): "Brian Lemasani" on the first placard and the LEMASANI wordmark in signage (1.35–1.6rem) and footers (1.15rem). Only the name uses this voice.
- **Display** (850, 112% width, clamp(2.4rem, 4.6vw, 4rem), line-height 0.98, -0.02em): section headings ("The hall", "Coming to the hall", "Reading room", "Front desk"). Exhibit titles use clamp(2.1rem, 4vw, 3.4rem); the blog index title runs to 5rem and post titles to 3.75rem.
- **Title** (850, 112% width, 1.2–1.5rem, line-height about 1.08): "What's going on?" panel headings, guide titles in the rack, crate names, the PUSH caption.
- **Body** (400, 1.0625rem, line-height 1.6): placard copy at 38–60ch. The first placard's positioning line steps up to 1.125rem.
- **Prose** (400, 1.0625rem, line-height 1.72, max 68ch): blog article text. Prose h2 is display at 1.65rem with a 3px ink underline rule; h3 is 800 at 105% width, 1.3rem.
- **Label** (650, 72% width, 0.8–1.05rem, +0.04em, uppercase, tabular figures): signs, buttons, spec-slot terms (700, +0.05em, 0.8125rem), stage captions, dates and reading times, tags.
- **Numeral** (Big Shoulders Stencil 800, line-height 0.82, tabular): exhibit numbers at clamp(6rem, 13vw, 11rem) on the wall, clamp(4.5rem, 9vw, 8rem) on the first stage, and the "??" placeholder on crates waiting for a number.
- **Code** (JetBrains Mono, 0.875rem blocks, 0.86em inline): code blocks with Shiki github-light, inline code chips.

### Named Rules
**The Three Widths Rule.** Archivo is set at exactly three widths with fixed jobs: 125% for names, 112% for display and titles, 72% for labels. Body stays at 100%. Do not introduce a second sans family.

**The Stencil Is Wayfinding Rule.** The stencil face is used only for exhibit numerals and the empty numeral slot on crates. It never sets a heading, a label or a word.

**The No Eyebrow Rule.** Headings stand alone. No small uppercase kicker or category label sits above any heading, anywhere on the site. Labels describe things on the wall (a stage, a spec, a date), never announce the heading below them.

## Layout

The hall is a single centred column of exhibits, capped at 1320px (hall-max) with a fluid side gutter of clamp(16px, 4vw, 48px). Everything aligns to that frame: signage, sections, the blog and the footer.

- **First viewport (lg and up):** a two-column grid at 1.45fr / 1fr with a 28px gap, filling `100svh` minus the 68px sign bar. Left is the plywood-framed blue stage; right is the white placard with the push button pinned to its bottom.
- **Exhibits:** a 12-column grid (lg) with the stencil numeral and spec slot in 4 columns and the placard in 8. Alternate exhibits flip sides. Each exhibit opens with a 3px ink top rule and is followed by its full-width display case. Exhibits are separated by 64px (96px from sm).
- **Section rhythm:** sections pad 80px vertically, 112px from sm. The ground changes by section to mark rooms: wall (hall, about), ink ("Coming to the hall"), deep wall (reading room), wall (front desk).
- **Reading room:** the blog index is a ruled list (3px ink rules between rows) with a 10rem date column, title and excerpt, and reading time. A post is a full-width placard header, then a prose column (68ch) beside a 240px sticky aside holding the table of contents and share keys (lg only).
- **Responsive:** Tailwind breakpoints sm 640px, md 768px, lg 1024px. Below lg the first placard reorders for action first: push button, spec slot, name, then the explanation. Below md the sign strip collapses into a single "Map" key that opens a full-width ink panel with 56px rows. Stages keep a 324–340px minimum height on phones.

## Elevation & Depth

Depth is physical. Only objects that would cast a shadow in a real gallery do: plywood frames and crates sit slightly off the wall, pressable keys have a solid skirt below the cap, and device screenshots float above the blue stage. Placards, rules, lists and prose are flat; a placard is defined by its 3px ink border, not by a shadow. Z-order is a semantic scale: base 1, raised 10, sticky 30 (signage), overlay 40, toast 60 (skip link).

### Shadow Vocabulary
- **Frame drop** (`box-shadow: inset 0 0 0 1.5px oklch(0.6 0.07 66 / 0.7), 0 18px 30px -18px oklch(0.17 0.012 260 / 0.45)`): every plywood frame; the inset line is the cut edge of the ply.
- **Crate drop** (`box-shadow: inset 0 0 0 1.5px oklch(0.6 0.07 66 / 0.7), 0 10px 18px -12px oklch(0 0 0 / 0.6)`): crates on the dark "Coming to the hall" floor.
- **Ledge drop** (`box-shadow: 0 10px 16px -10px oklch(0.17 0.012 260 / 0.5)`): the plywood shelf under the literature rack.
- **Button skirt, rest** (`box-shadow: 0 7px 0 0 var(--enamel-orange-deep), 0 12px 14px -4px oklch(0.17 0.012 260 / 0.55)`): the PUSH cap; 9px on hover, 1px when pressed.
- **Key skirt** (`box-shadow: 0 4px 0 0 var(--enamel-orange-deep)`): smaller orange keys; collapses to 1px on press.
- **Device float** (`box-shadow: 0 24px 40px -24px oklch(0.1 0.05 265 / 0.8)`): screenshots standing on the blue stage.

### Named Rules
**The Physical Depth Rule.** A shadow must belong to an object: a frame off the wall, a key's skirt, a device on a stage. Content surfaces (placards, cards, panels, prose) stay flat and take their edge from ink borders.

**The Skirt Rule.** The solid offset under a key is the key's own side in a deeper shade of its own enamel, straight down, and it shortens when pressed. It is never a black diagonal offset block behind a card.

## Shapes

Corners are slightly softened, never pill-shaped except where the object is round. Placards and frames use 6px; the blue stage inside a frame uses 3px so it reads as an opening cut into the ply; crates use 4px; controls use 0.4rem and chips 0.3rem; the phone screenshot uses an 18px device radius. Round things are fully round: the push button, status dots.

Borders are the system's main structural device. Placards, exhibit rules, section rules, the scrolled signage edge and display-case captions use 3px solid ink. Reading-room objects inside prose (code blocks, blockquotes, diagrams, the search field, tag chips, share keys) use 2px ink so long-form pages stay lighter. Dashed 2px ink at 60% marks an empty numeral slot on a crate. Plywood shows its laminated edge as an 8px sill under each frame and a 22px ledge under the rack, both drawn with the generated birch-edge texture.

## Components

### Buttons
Tactile and physical: the primary action is a real push button, secondary actions are enamel keys, and navigation is signage.
- **Push button:** an ink well (clamp(104px, 9vw, 136px), round) holding an orange cap inset 10%, set in "PUSH" at 900, 112% width. The cap sits 7px proud on its skirt, rises to 9px on hover, and drops to 1px on press in 60ms (140ms otherwise, ease-out-quart). Focus ring offsets 6px and follows the circle. One per exhibit at most.
- **Key button (orange):** 44px tall, 0.4rem radius, label type in ink on orange with a 4px Fired Orange skirt; lifts 2px on hover, sinks 2px on press. Used for "Bring the phone forward" and "Ring for service".
- **Exhibit visit link:** 48px, 3px ink border, orange fill, label type; inverts to ink with white text on hover.
- **Sign button (ink):** 48px, ink fill, white label type; turns orange with ink text on hover. Used for "All guides", GitHub and LinkedIn.
- **Share keys:** 40px, 2px ink border, transparent; fill ink on hover.
- **Text links:** semibold, underlined 2px at 0.22em offset. Blue in prose and placards, ink for "Source on GitHub"; prose link hover swaps the underline to orange.

### Chips
- **Style:** tag filters on the blog index are 36px, 2px ink border, 0.3rem radius, label type, transparent at rest with a white hover.
- **State:** active is ink with white text (`aria-pressed`). On posts and in the list, tags are plain label text with a `#` prefix, not chips.

### Cards / Containers
- **Placard:** placard white, 3px ink border, 6px radius, no shadow, 20px padding (32px from sm). Holds the name, exhibit copy, about text, blog post headers and empty states.
- **Plywood frame:** birch ply face texture, 8–14px padding, 6px radius, frame drop, and a laminated 8px sill under the opening. Always holds a stage: the blue sync stage, the display case, the exploded view (deep wall stage) or the bell (placard stage).
- **"What's going on?" panel:** deep wall, 0.4rem radius, 16–20px padding, set inside a placard.
- **Guide (rack card):** a placard link with a 16px enamel band on top (cycling orange, blue, green), tilted between -1.5° and 1°; straightens and lifts 8px on hover.
- **Crate:** birch ply, 4px radius, crate drop, each cut from a different part of the texture sheet; a dashed stencil "??" slot top right and the topic name in display type.

### Inputs / Fields
- **Search:** 48px, placard white, 2px ink border, 0.4rem radius, ink search icon inset 14px, Soft Ink placeholder.
- **Focus:** 3px Museum Blue outline at 2–3px offset, the same ring used everywhere.

### Navigation
- **Signage:** sticky on the wall colour. The LEMASANI wordmark sits left in the name voice; signs sit right on a single ink strip with 20% white dividers, each 44px tall in label type with a leading arrow (down for in-page rooms, right for Writing) and a GitHub mark. Hover and the active route turn a sign orange with ink text. A 3px ink bottom edge appears once the page scrolls past 24px.
- **Mobile:** a single ink "Map" key toggles a full-width ink panel of 56px rows; Escape closes it.
- **Footer:** a 3px ink top rule, the wordmark left, a quiet line of stack or an RSS link right.

### Spec Slot (signature)
A label-printer strip: a 3px ink top rule, a two-column definition grid (condensed caps terms, tabular values), 15px text. Carries live status on the first exhibit (Network with a green or orange dot, Queued, Synced) and Stack and Status on every exhibit. Its lines print in left to right on reveal.

### Stage and Live Scenes (signature)
The blue stage is where working things live. The sync scene (a phone slab queuing coloured episode blocks for a cloud shelf) and the front-desk bell are Three.js scenes, lazily imported inside client-only boundaries, rendering continuously only while in view (`frameloop` drops to demand off screen) and at reduced pixel ratio on low-power devices. Stage captions in condensed caps sit in the corners. Under reduced motion the scenes keep working without sway, shake or travel: blocks transfer instantly and the bell does not swing.

### Exploded View
Exhibit 03 shows this site as four stacked plates (Cloudflare Worker on ply, TanStack Start on blue, MDX on white, browser-only GSAP and Three.js on orange), each with a 3px ink border and a darker edge plate below. On desktop with motion allowed, the case pins and scrolling scrubs the plates apart while a numbered legend highlights the current layer with an orange rule. On phones and under reduced motion the plates are shown already apart.

### Motion Grammar
- **Hall lights on:** one load timeline for the first viewport (signage drops in, the stage opens from its centre, the stage lights flicker on, the numeral stamps, the placard swings down on its top hinge, its lines rise in, the push button scales up). It runs only when `<html data-motion="on">` is set by a pre-paint script that checks reduced motion; a CSS failsafe reveals every gated element after 2.4s if the timeline never runs.
- **Scroll reveals** (`data-reveal`): hinge (placards swing from -72° on their top edge), stamp (numerals land from 1.9x and -9°), print (spec lines clip in left to right in 12 steps), flip (crates turn over from 92°), rack (guides drop in with alternating tilt). Each fires once, with exponential ease-outs (expo.out, power4.out, power3.out); no bounce, no elastic.
- **Reduced motion:** the reveals register only under `prefers-reduced-motion: no-preference`, CSS clamps all transitions and animations to 0.01ms, and `useReducedMotion` defaults to true on the server so SSR never assumes motion.

## Do's and Don'ts

### Do:
- **Do** keep the ground on Gallery Wall (oklch(0.955 0.004 255)) and Deep Wall, and let plywood supply the only warmth.
- **Do** give each enamel its role: orange to press or follow, blue to stage or link, green for live or synced, ply to frame, yellow for labels on dark.
- **Do** set text on orange, green, yellow and ply in ink, and text on blue and ink in placard white.
- **Do** build containers as placards: placard white, 3px ink border, 6px radius, no shadow.
- **Do** put every live or visual demonstration inside a plywood frame on a stage, with condensed-caps captions in its corners.
- **Do** use Archivo at its three widths (125% names, 112% display, 72% labels) and keep body copy at normal width.
- **Do** number exhibits with the stencil face, and only exhibits.
- **Do** give every pressable a physical response: a skirt in its own deeper enamel that shortens on press.
- **Do** keep content visible without JavaScript: gate intros behind `data-motion="on"` with the 2.4s failsafe, and register reveals only under `prefers-reduced-motion: no-preference`.
- **Do** load Three.js and Mermaid lazily, client-only, and pause scenes off screen.
- **Do** keep the reading room calm: 68ch prose at 1.72 line-height, 2px borders on code and quotes, no scroll-driven effects in article text.

### Don't:
- **Don't** let the site read as a generic dev-portfolio template: no hero + about + project-card grid + skills badges + contact stack. Skills live in spec slots and the workshop inventory.
- **Don't** let any surface read as a SaaS landing page: no gradient blobs, metric tiles, logo walls or "trusted by" strips.
- **Don't** drift into hacker/terminal costume: no green-on-black text, fake CLI prompts, matrix rain, or monospace outside code.
- **Don't** make anything overdesigned or hard to read: no effect may sit on top of copy, and no motion may delay reading.
- **Don't** put an eyebrow or kicker label above any heading.
- **Don't** use the stencil face for headings, labels or words.
- **Don't** introduce warm cream, beige or paper grounds, or a dark theme mode. A single ink room such as "Coming to the hall" is part of the hall; a dark site is not.
- **Don't** put shadows on placards, cards or panels, and don't use black diagonal offset shadows anywhere; the only solid offset is a key's own skirt.
- **Don't** use green for buttons or orange for success; status colour follows the Enamel Roles Rule.
- **Don't** use bounce or elastic easing; the hall moves with exponential ease-outs.
- **Don't** ship an animation without a reduced-motion path, or render WebGL on the server.
