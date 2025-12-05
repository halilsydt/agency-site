# Technical Assumptions

## Repository Structure: Monorepo

Single repository containing all website code, components, content, and configuration. Clean separation between:
- Components/UI elements
- Page templates
- Content/data files
- Static assets (images, fonts)
- Configuration files

## Service Architecture: Static Site with Third-Party Integrations

**Core Architecture:**
- Static site generator or modern frontend framework with static export capability
- No custom backend required for MVP—all dynamic functionality via third-party services
- JAMstack approach: pre-built markup, client-side JavaScript for interactivity, APIs for dynamic features

**Recommended Technology Stack:**
- **Framework**: Next.js (React-based, excellent static export, built-in image optimization, SEO-friendly)
- **Styling**: Tailwind CSS (utility-first, rapid development, easy responsive design)
- **Hosting**: Vercel or Netlify (optimized for static sites, automatic SSL, CDN, easy deploys)
- **Alternative**: Astro (if simpler content-focused approach preferred)

**Third-Party Integrations:**
| Service Type | Recommended Options | Purpose |
|--------------|---------------------|---------|
| **Booking/Calendar** | Calendly, Cal.com | Free consultation scheduling |
| **Contact Forms** | Formspree, Netlify Forms, Basin | Lead capture and inquiries |
| **Email Marketing** | Mailchimp, ConvertKit, Buttondown | Newsletter signups and nurturing |
| **Analytics** | Google Analytics 4, Plausible, Fathom | Traffic and conversion tracking |
| **Cookie Consent** | CookieConsent.js, Osano | GDPR compliance if needed |

## Testing Requirements: Unit + Integration

- **Unit Tests**: Component-level tests for interactive elements (forms, navigation, FAQ accordion)
- **Integration Tests**: Page-level tests ensuring sections render correctly
- **Visual Regression**: Optional—screenshot comparison for design consistency
- **E2E Tests**: Light coverage for critical paths (contact form submission, booking flow)
- **Manual Testing**: Cross-browser and responsive testing before launch

## Additional Technical Assumptions and Requests

- **Content Management**: Content stored in markdown/JSON files or simple headless CMS (e.g., Sanity, Contentful, or file-based) for easy non-technical updates
- **Image Optimization**: Automatic image optimization and responsive images (Next.js Image or similar)
- **SEO Foundation**: Static generation ensures crawlable pages; structured data for rich snippets
- **Performance Budget**: Lighthouse score targets: Performance > 90, Accessibility > 90, SEO > 90
- **Deployment**: Git-based workflow with automatic deploys on push to main branch
- **Environment**: No complex environment variables for MVP; API keys for third-party services stored securely
- **No Backend Database**: All content is static; form submissions go directly to third-party services
