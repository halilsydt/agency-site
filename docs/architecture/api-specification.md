# API Specification

**This section is N/A for this project.**

There is no custom API — this is a static site with all dynamic functionality handled by third-party services:

| Function | Service | Integration Method |
|----------|---------|-------------------|
| Contact Form Submission | Formspree | Form `action` POST to Formspree endpoint |
| Consultation Booking | Cal.com | Embedded iframe/widget |
| Email Signup | ConvertKit | Embedded form or API POST |
| Analytics | Plausible | Script tag inclusion |

## Third-Party Endpoints (Reference)

```typescript
// lib/config.ts

export const endpoints = {
  // Formspree - Contact form submissions
  contactForm: 'https://formspree.io/f/{form_id}',

  // ConvertKit - Email signups
  emailSignup: 'https://api.convertkit.com/v3/forms/{form_id}/subscribe',

  // Cal.com - Booking embed
  calendarEmbed: 'https://cal.com/{username}/{event-type}',

  // Plausible - Analytics (script src)
  analytics: 'https://plausible.io/js/script.js',
} as const;
```

These endpoints will be configured via environment variables for flexibility across environments.
