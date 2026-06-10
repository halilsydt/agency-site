# Epic 6: Atlas Design System Redesign

## Status

Draft

## Epic Goal

Re-skin the entire Scalenty marketing site to match the "Atlas" design system (`docs/design system/atlas/`) — an emerald + ink, editorial, spacious visual language with Space Grotesk + Hanken Grotesk typography — while preserving the existing Next.js 14 architecture, internationalization (EN/TR), content structure, routing, SEO, and analytics. As part of this redesign, **dark mode is removed entirely** (Atlas is light-only).

## Background

The site currently uses a generic blue/orange SaaS theme (Nunito font, blue `#3b82f6` primary, orange `#f97316` accent). The Atlas reference is a complete, production-quality static HTML/CSS/JS design delivered in `docs/design system/atlas/`. It defines a different color story (emerald `#0E8C5A` + clay `#C2683C` on warm paper `#F7F6F1`), different typography, richer shadows, and several net-new components (animated hero, marquee, interactive results chart, split service panels) that have no current React equivalent.

This is a **brownfield UI rework**: keep the engine, replace the skin.

## Scope Decisions (confirmed)

- **Full re-skin** — adopt Atlas tokens, typography, and component styling across the whole site, not just key sections.
- **Drop dark mode** — remove the `ThemeProvider`, theme toggle, `.dark` CSS, `darkMode` Tailwind strategy, theme-detection layout script, and all `dark:` utilities. This partially reverts Epic 5's dark-mode work; i18n from Epic 5 is **kept**.
- **Preserve** — i18n (EN/TR), content JSON, routing, server/client split, SEO metadata, OG/Twitter images, analytics, cookie consent, Cal.com booking, Formspree/contact form behavior.

## Source of Truth

`docs/design system/atlas/`:
- `atlas.css` — full design system (tokens, all component styles)
- `*.html` — per-page reference markup (Home, About, Contact, Pricing, FAQ, Amazon, Etsy, Privacy, Terms)
- `atlas.js` — shared nav/footer markup, scroll bar, reveal-on-scroll, counters
- `home.js` — hero entrance animation + interactive results chart
- `assets/` — logo marks (light + on-dark), favicon

## Acceptance Criteria (Epic-level)

1. The site's visual design matches the Atlas reference across all pages (colors, typography, spacing, shadows, radii, component styling).
2. Dark mode is fully removed — no theme toggle, no `.dark` styles, no `dark:` utilities, no theme provider; `next build` and tests pass with no dark-mode references.
3. Internationalization (EN/TR) continues to work on every page after the re-skin; the language switcher is restyled to the Atlas `.lang` globe pill.
4. All net-new Atlas components (animated hero, marquee, interactive results chart, split service panels) are implemented as React components honoring i18n and `prefers-reduced-motion`.
5. The test suite is updated to match the new markup/classes and passes (`npm test`).
6. `npm run build` succeeds; no console errors; Lighthouse a11y not regressed.
7. Responsive behavior matches Atlas breakpoints (notably the `860px` / `820px` / `760px` collapses).

## Stories

- **6.1 — Design Tokens & Typography Foundation**: Port Atlas tokens (colors, fonts, shadows, radii) into `tailwind.config.ts` + `globals.css`; load Space Grotesk + Hanken Grotesk via `next/font`; establish base typographic + `.wrap` layout primitives. No visual component changes yet beyond what tokens cascade.
- **6.2 — Remove Dark Mode**: Delete `ThemeProvider`, `theme-toggle`, theme-detection script, `.dark` CSS, `darkMode` strategy, and all `dark:` utilities across the ~14 affected files; remove related provider/toggle tests; keep `LanguageProvider` intact.
- **6.3 — Header & Footer Re-skin**: Rebuild header (sticky nav, emerald underline links, `.lang` globe pill, mobile nav) and footer (ink background, 4-col grid) to Atlas; wire the scroll-progress bar; integrate Atlas logo marks.
- **6.4 — Buttons & UI Primitives**: Re-skin `button.tsx` (btn-green / btn-ink / btn-ghost), inputs/select/textarea (Atlas `.field`), badges/pills, cards, accordion (`details.q` style) to Atlas tokens.
- **6.5 — Homepage Re-skin (incl. new components)**: Animated hero with viz card + float, marquee, split service panels, interactive results chart (ink showcase), process steps, pricing preview + bundle, CTA. Includes the bespoke hero entrance + chart JS ported to React with reduced-motion support.
- **6.6 — Service Pages Re-skin (Amazon/Etsy)**: `phero` interior hero, `svc-detail` grid (incl. `.sd.wide`), platform-accented styling (green for Amazon, clay for Etsy).
- **6.7 — Pricing Page Re-skin**: Segmented Amazon/Etsy toggle, 3-tier cards with "popular" treatment, bundle highlight.
- **6.8 — About Page Re-skin**: `about-grid`, points list, ink stats band, team member cards, photo placeholder block.
- **6.9 — Contact Page Re-skin**: `contact-grid` form card, ink call/booking card, contact-info list; preserve Formspree + Cal.com behavior.
- **6.10 — FAQ Page Re-skin**: Filterable category pills, `details.q` accordion styling.
- **6.11 — Legal Pages Re-skin (Privacy/Terms)**: `.legal` typographic layout + callouts.
- **6.12 — Reveal Animations, Polish & QA**: Reveal-on-scroll + counter utilities as a shared hook/component, OG/Twitter image color updates, favicon/logo swap, cross-page responsive + a11y pass, full test green, build green.

## Risks & Notes

- **Tests**: 57 test files assert on classes/text; expect broad updates. Each story owns updating its own tests (no separate "fix tests" story).
- **Animation/JS**: Atlas uses vanilla JS (MutationObserver, manual DOM). Port intent to idiomatic React (hooks, refs, IntersectionObserver) rather than copying DOM manipulation. Respect `prefers-reduced-motion` (Atlas already does).
- **i18n + JS-rendered content**: Atlas re-translates via MutationObserver; in React this is automatic via `useLanguage()` — ensure new interactive components read translations through the existing hook, not hardcoded strings.
- **Dark mode removal vs Epic 5**: Coordinate so i18n (5.1–5.4) stays intact while only the theming half is reverted.
- **Net-new copy**: Marquee items, hero stats, viz-card figures are illustrative placeholders in Atlas — route them through `lib/translations.ts` / content JSON with sensible EN/TR values.

## Compatibility Requirements

- [x] Existing routes unchanged
- [x] i18n (EN/TR) preserved and working on every page
- [x] Content JSON structure preserved (extend, don't restructure, where new fields needed)
- [x] SEO metadata, OG/Twitter images, sitemap, robots preserved (colors may update)
- [x] Analytics, cookie consent, booking, contact form behavior preserved
- [x] `next build` + `npm test` green at end of each story
