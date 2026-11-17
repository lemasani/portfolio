# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

lemasani.com is Brian Lemasani's personal site and home base. Four audiences visit, with equal weight; none outranks the others on the homepage:

- **Hiring managers and recruiters** evaluating Brian for a full-time engineering role. Job: decide quickly whether he is worth an interview.
- **Freelance and contract clients** (founders, small teams) looking for someone to take a build from idea to shipped. Job: judge whether he can deliver and how to reach him.
- **Fellow developers** arriving from GitHub, socials, or search, mostly to read the blog. Job: learn something specific (VPS hardening, git profiles, agent tooling) and maybe follow along.
- **Brian himself.** The site is his lab: a place to write, ship experiments, and try techniques on a real production surface.

When these needs conflict, the site behaves as a home base first. The right visitor should be able to find the proof they need, but the site is not optimised into a single-audience funnel.

## Product Purpose

Show who Brian is and what he builds, publish his writing, and give each kind of visitor an easy route to the work, the posts, or a conversation. Success means a visitor leaves remembering this site specifically (not "another dev portfolio") and, if they are a hiring manager or client, makes contact.

## Positioning

An engineer with a designer's eye: Brian ships the architecture and sweats the interface details. The site itself is the primary evidence for that claim, so its craft has to hold up to scrutiny by both engineers and designers.

## Operating Context

- Visitors land on `/` (single-page: Navbar, Hero, About, Projects, Skills, Contact) or directly on a blog post at `/blog/$slug` from search or a shared link. `/blog` is the index; `/blog/rss.xml` and `/sitemap.xml` exist for feeds and indexing.
- Blog posts are long-form technical writing in MDX with code blocks (Shiki) and Mermaid diagrams. Reading comfort on these pages matters as much as first impression on the homepage.
- Contact happens by email (mailto link in `src/components/sections/Contact.tsx`), GitHub, and LinkedIn. No contact form.

## Capabilities and Constraints

- TanStack Start SSR app (React 19) on Cloudflare Workers. Cloudflare SSR memory limits have bitten before (see commit b0b3a24); heavy client-only work such as Three.js and Mermaid must stay off the server render path.
- Content sources: `src/lib/data/projects.ts`, `src/lib/data/skills.ts`, `src/content/blog/*.mdx`.
- SEO metadata via `src/lib/seo.ts`; site URL https://lemasani.com.
- Undecided: whether more shipped projects will be added to `projects.ts` (they exist but are not listed yet), and whether the site will ever take freelance enquiries through anything other than email.

## Brand Commitments

- **Name:** Brian Lemasani; the wordmark/handle is "LEMASANI" / `lemasani`.
- **Personality:** experimental, playful, a lab. The site should feel like a place where things are being tried, not a static brochure.
- **Visual identity is not binding.** Brian is open to a full redesign. The current look (near-black `#120f17`, teal `#27d0ab` accent, all-JetBrains-Mono type, Beams shader hero, glitch wordmark) is evidence of past choices, not a commitment.
- **Must never read as:**
  - a generic dev-portfolio template (Hero, About, Projects grid, Skills badges, Contact, nothing memorable);
  - a SaaS landing page (gradient blobs, metric tiles, "trusted by" energy);
  - hacker/terminal costume (green-on-black, fake CLI prompts, matrix rain);
  - overdesigned or hard to read: effects must never get in the way of the work or the writing.

## Evidence on Hand

- **Projects (2 listed):** Yournextepisode, an offline-first PWA for tracking movies, series and anime with optional Supabase sync (https://yournextepisode.com, featured); and this portfolio site.
- **Blog posts (4):** "Hello World" (2025-04-20); "Superpowers: The Plugin That Teaches Your AI Agent How to Think" (2026-04-28); "Securely Hosting Apps on a VPS" (2026-07-18); "One Machine, Two Identities: Separating Work and Personal Git Profiles" (2026-11-12).
- **Stats:** "3+ years building" and "10+ projects shipped" are confirmed accurate by Brian, though most of those projects are not yet listed on the site.
- **Skills inventory:** `src/lib/data/skills.ts` (frontend, backend, infrastructure, currently exploring, each with core/proficient/familiar levels).
- **Absent, never fabricate:** testimonials, client names or logos, employer names, case-study metrics, press mentions. Ask Brian before adding any of these.

## Product Principles

1. **The site is the proof.** Every surface is a demonstration of the engineer-with-a-designer's-eye claim; sloppy details undercut the core message more than missing content does.
2. **Lab, not brochure.** Experiments are welcome and expected, but each one has to work, perform, and degrade gracefully.
3. **Reading wins over effect.** On blog posts and any long copy, legibility and comfort beat spectacle.
4. **Real evidence only.** Show actual projects, actual writing, actual numbers; never pad with invented social proof.
5. **Every visitor finds their door.** Hiring managers, clients, and developers should each reach work, writing, or contact without fighting the experience.
