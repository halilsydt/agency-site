# Security and Performance

## Security Requirements

**Frontend Security:**
- **CSP Headers:** Configured via Vercel; allow self, trusted third-party scripts (Cal.com, Plausible)
- **XSS Prevention:** React's default escaping; no `dangerouslySetInnerHTML` usage
- **Secure Storage:** No sensitive data stored client-side; no auth tokens

**Backend Security:**
- **Input Validation:** Zod validation on all form inputs before submission
- **Rate Limiting:** Handled by third-party services (Formspree, ConvertKit)
- **CORS Policy:** N/A — no custom API endpoints

**Authentication Security:**
- **N/A** — No authentication; public marketing site

**Third-Party Security:**
- All third-party scripts loaded from HTTPS
- API keys for public operations only (ConvertKit public API key)
- No secrets exposed in client bundle

## Performance Optimization

**Frontend Performance:**
- **Bundle Size Target:** < 100KB initial JS (gzipped)
- **Loading Strategy:**
  - Static HTML served from edge
  - Critical CSS inlined
  - Non-critical JS lazy-loaded
  - Images lazy-loaded with `next/image`
- **Caching Strategy:**
  - Static assets: immutable, 1 year
  - HTML pages: stale-while-revalidate
  - Third-party embeds: per-service defaults

**Performance Targets:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | Lighthouse CI |
| First Contentful Paint | < 1.5s | Core Web Vitals |
| Largest Contentful Paint | < 2.5s | Core Web Vitals |
| Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| Time to Interactive | < 3.5s | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |

**Image Optimization:**
- All images served via `next/image`
- Automatic WebP/AVIF conversion
- Responsive srcsets generated
- Lazy loading with blur placeholder
- Dashboard screenshots compressed appropriately

**Font Optimization:**
- Self-host chosen font (Nunito/Poppins) or use `next/font`
- Font subsetting for used characters
- `font-display: swap` for fast initial render
- Preload critical font weights
