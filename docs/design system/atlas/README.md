# Scalenty — Website (Atlas)

A bilingual (English / Turkish) marketing site for Scalenty, an honest Amazon & Etsy
seller-consulting agency. Static HTML/CSS/JS — no build step, no dependencies.

---

## What's included

| File | Purpose |
|------|---------|
| `Home.html` | Landing page (hero, services, results, process, pricing, CTA) |
| `Amazon.html` / `Etsy.html` | Service detail pages |
| `Pricing.html` | 3-tier pricing with Amazon/Etsy toggle + bundle |
| `About.html` | Mission, approach, stats, founders |
| `FAQ.html` | Filterable FAQ |
| `Contact.html` | Contact form + booking + LAUNCH CONFIG |
| `Privacy.html` / `Terms.html` | Legal pages |
| `atlas.css` | The entire design system (one file) |
| `atlas.js` | Shared nav + footer, scroll bar, reveals, counters |
| `i18n.js` | EN/TR translation engine + dictionary |
| `home.js` | Home-only hero entrance + interactive results chart |

Every page links `atlas.css`, `i18n.js`, then `atlas.js` (Home also adds `home.js`).
The `?v=NN` on those URLs is just a cache-buster — bump it if a browser serves a stale file.

---

## Run / deploy

It's fully static. Any of these work:

- **Locally:** open `Home.html` in a browser, or run `npx serve` in this folder.
- **Deploy:** drop the whole folder on Netlify, Vercel, GitHub Pages, Cloudflare Pages,
  or any static host. No configuration needed. Set `Home.html` as the entry/index
  (rename to `index.html` if your host requires it — then update internal links, or add a redirect).

---

## Go-live checklist

### 1. Contact form + booking  →  `Contact.html`
Near the bottom of the file there's a `LAUNCH CONFIG` block:

```js
const FORMSPREE_ENDPOINT = "";  // e.g. "https://formspree.io/f/abcdwxyz"
const CAL_LINK           = "";  // e.g. "https://cal.com/scalenty/consultation"
```

- **FORMSPREE_ENDPOINT** — create a free form at formspree.io and paste its endpoint.
  Until set, the form runs in demo mode (shows a thank-you but doesn't send).
- **CAL_LINK** — your Cal.com (or any) booking URL. Until set, the "Book Free
  Consultation" button scrolls to the form instead.

### 2. Real imagery (replace placeholders)
Placeholders are marked with a pill labelled "… photo":
- **Home / Amazon / Etsy** service cards — marketplace/product imagery
- **About** — "Team / workspace photo" block (`.ph-img`)
- **Results** numbers and the **dashboard** card on Home/About are illustrative —
  swap in anonymized real screenshots/figures when ready.

### 3. Real proof (replace samples)
The results figures, case framing, and any client references are credible placeholders.
Replace with real, anonymized client data before publishing.

### 4. Legal review
`Privacy.html` and `Terms.html` are honest starting templates, **not legal advice** —
have a qualified professional review them.

### 5. Translation review
Turkish copy is in `i18n.js` (the `DICT` object). Have a native speaker review before
launch. To edit a translation, find the English string (the key) and change its value.

---

## How the language toggle works

- The globe pill in the nav switches the whole site EN↔TR and remembers the choice
  (localStorage key `scalenty-lang`).
- Translations live in `i18n.js` → `DICT` as `"English": "Türkçe"` pairs.
- A MutationObserver re-translates content rendered by JS (FAQ filter, pricing toggle).
- **Adding/editing copy:** if you add new English text to a page, add a matching entry
  to `DICT` so it translates. Untranslated strings simply stay in English (safe fallback).

---

## Design system quick reference (`atlas.css`)

- **Fonts:** Space Grotesk (display) + Hanken Grotesk (text) — loaded from Google Fonts.
- **Color tokens** (CSS variables at the top of `atlas.css`):
  - `--green #0E8C5A` primary · `--clay #C2683C` Etsy accent
  - `--ink #15201B` text · `--bg #F7F6F1` page · `--surface #FFF` cards
- **Edit once, applies everywhere** — nav, footer, buttons, and all components are
  defined in `atlas.css`; the nav/footer markup lives in `atlas.js`.

---

© 2026 Scalenty. Built as a static site — no framework, no build tooling required.
