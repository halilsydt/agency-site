# Tech Stack

This is the **definitive technology selection** for the project. All development must use these exact technologies and versions.

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.x | Type-safe JavaScript | PRD specifies TypeScript; catches errors at build time |
| Frontend Framework | Next.js | 14.x | React framework with SSG | PRD recommendation; optimal static export + image optimization |
| UI Component Library | shadcn/ui | latest | Accessible, styled components | Built on Radix UI + Tailwind; copy-paste components, full customization, excellent a11y |
| State Management | React Context | Built-in | Light global state | No complex state needs; Context sufficient for menu/modal states |
| CSS Framework | Tailwind CSS | 3.x | Utility-first styling | PRD specified; rapid development, easy responsive design |
| Backend Language | N/A | - | No custom backend | Static site with third-party integrations only |
| Backend Framework | N/A | - | No custom backend | All dynamic features via third-party services |
| API Style | N/A | - | No custom API | Forms/booking handled by third-party services |
| Database | N/A | - | No database | Content in markdown/JSON files |
| Cache | Vercel Edge | Managed | CDN caching | Automatic with Vercel deployment |
| File Storage | Git + Vercel | Managed | Static assets | Images in /public, optimized at build |
| Authentication | N/A | - | No auth required | Public marketing site |
| Frontend Testing | Vitest + Testing Library | 1.x / 14.x | Component unit tests | Fast, modern, React-focused |
| Backend Testing | N/A | - | No backend | - |
| E2E Testing | Playwright | 1.x | Critical path testing | PRD specifies light E2E coverage |
| Build Tool | Next.js CLI | 14.x | Build orchestration | Built into Next.js |
| Bundler | Turbopack/Webpack | Built-in | Module bundling | Next.js default; Turbopack for dev speed |
| IaC Tool | N/A | - | Not needed | Vercel handles infrastructure |
| CI/CD | GitHub Actions | - | Automated testing/deploy | Industry standard; free for public repos |
| Monitoring | Vercel Analytics | Managed | Performance monitoring | Native integration, Core Web Vitals |
| Logging | Console + Vercel Logs | Managed | Debug logging | Sufficient for static site |

## Third-Party Service Stack

| Service Type | Selected Option | Alternative | Purpose |
|--------------|-----------------|-------------|---------|
| Booking/Calendar | Cal.com | Calendly | Free consultation scheduling |
| Contact Forms | Formspree | Netlify Forms | Lead capture and inquiries |
| Email Marketing | ConvertKit | Mailchimp | Newsletter signups |
| Analytics | Plausible | GA4 | Privacy-friendly traffic tracking |
| Cookie Consent | Cookie Consent JS | Osano | GDPR compliance |
