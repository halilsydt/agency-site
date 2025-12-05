# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics (Core Web Vitals, page performance)
- **Backend Monitoring:** N/A — third-party services handle their own monitoring
- **Error Tracking:** Vercel Logs + optional Sentry (if needed)
- **Performance Monitoring:** Vercel Speed Insights + Lighthouse CI
- **User Analytics:** Plausible (privacy-friendly, GDPR compliant)

## Key Metrics

**Frontend Metrics:**

| Metric | Target | Tool |
|--------|--------|------|
| Core Web Vitals (LCP, FID, CLS) | Pass all | Vercel Analytics |
| Page load time | < 3s | Vercel Speed Insights |
| JavaScript errors | 0 in production | Vercel Logs |
| Lighthouse Performance | > 90 | Lighthouse CI |

**Business Metrics (via Plausible):**

| Metric | Description | Tracking Method |
|--------|-------------|-----------------|
| Page views | Traffic volume | Automatic |
| Bounce rate | Engagement indicator | Automatic |
| Pricing page views | Purchase intent | Page view |
| Contact page views | Lead intent | Page view |
| Form submissions | Lead captures | Custom event |
| Booking clicks | Consultation interest | Custom event |

## Custom Event Tracking

```typescript
// lib/analytics.ts

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

/**
 * Tracks a custom analytics event via Plausible.
 * Safe to call even if Plausible is not loaded.
 *
 * @param event - The event name to track
 * @param props - Optional properties to attach to the event
 *
 * @example
 * ```ts
 * trackEvent('Contact Form Submitted', { platform: 'amazon' });
 * trackEvent('Booking Clicked');
 * ```
 */
export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props });
  }
}
```

## Alerting

| Alert | Condition | Response |
|-------|-----------|----------|
| Site Down | Vercel deployment fails | Check build logs |
| Slow Pages | LCP > 4s | Investigate performance |
| Form Errors | Multiple failed submissions | Check Formspree dashboard |
| Traffic Spike | Unusual traffic patterns | Check Plausible for source |
