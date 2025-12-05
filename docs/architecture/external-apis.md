# External APIs

## Cal.com API

- **Purpose:** Free consultation booking/scheduling
- **Documentation:** https://cal.com/docs
- **Base URL(s):** https://cal.com, https://api.cal.com/v1
- **Authentication:** API key for API access; embed requires no auth
- **Rate Limits:** Generous for embed usage; API has standard limits

**Key Endpoints Used:**
- Embed only — `<Cal>` React component or iframe embed
- No direct API calls needed for MVP

**Integration Notes:** Use Cal.com's React component (`@calcom/embed-react`) for seamless embedding. Style customization available through embed parameters.

---

## Formspree API

- **Purpose:** Contact form submission handling
- **Documentation:** https://formspree.io/docs
- **Base URL(s):** https://formspree.io/f/{form_id}
- **Authentication:** Form ID in URL; no API key for form submissions
- **Rate Limits:** 50 submissions/month (free tier); 1000/month (paid)

**Key Endpoints Used:**
- `POST https://formspree.io/f/{form_id}` — Submit contact form

**Integration Notes:** Simple form POST; supports AJAX submissions. Returns JSON response for success/error handling. Spam filtering included.

---

## ConvertKit API

- **Purpose:** Email newsletter signups
- **Documentation:** https://developers.convertkit.com/
- **Base URL(s):** https://api.convertkit.com/v3
- **Authentication:** API key (public for form subscriptions)
- **Rate Limits:** Standard API limits; generous for form subscriptions

**Key Endpoints Used:**
- `POST /forms/{form_id}/subscribe` — Add email subscriber

**Integration Notes:** Can use embed form (simpler) or API call (more control over UX). API allows custom success handling without redirect.

---

## Plausible Analytics

- **Purpose:** Privacy-friendly website analytics
- **Documentation:** https://plausible.io/docs
- **Base URL(s):** https://plausible.io
- **Authentication:** Script tag with domain; API key for stats API
- **Rate Limits:** N/A for tracking; API has limits

**Key Endpoints Used:**
- Script inclusion only: `<script src="https://plausible.io/js/script.js" data-domain="yourdomain.com">`
- Optional: Events API for custom goal tracking

**Integration Notes:** No cookies by default (GDPR-friendly). Custom events can track form submissions, booking clicks. EU-hosted option available.
