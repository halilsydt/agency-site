# Unified Project Structure

```
agency-site/
├── .github/                        # CI/CD workflows
│   └── workflows/
│       ├── ci.yml                  # Test + lint on PR
│       └── preview.yml             # Preview deploys (Vercel handles main)
├── app/                            # Next.js App Router pages
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Homepage
│   ├── services/
│   │   ├── amazon/
│   │   │   └── page.tsx
│   │   └── etsy/
│   │       └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── globals.css                 # Global styles + Tailwind imports
│   └── favicon.ico
├── components/                     # React components
│   ├── ui/                         # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   └── ...
│   ├── layout/                     # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── container.tsx
│   ├── sections/                   # Page sections
│   │   ├── hero.tsx
│   │   ├── services-overview.tsx
│   │   └── ...
│   ├── cards/                      # Card components
│   │   ├── service-card.tsx
│   │   ├── pricing-card.tsx
│   │   └── testimonial-card.tsx
│   └── forms/                      # Form components
│       ├── contact-form.tsx
│       ├── email-signup-form.tsx
│       └── calendar-embed.tsx
├── content/                        # JSON content files
│   ├── services/
│   │   ├── amazon.json
│   │   └── etsy.json
│   ├── pricing/
│   │   └── packages.json
│   ├── testimonials.json
│   ├── faqs.json
│   ├── team.json
│   ├── results.json
│   └── site-config.json
├── lib/                            # Utilities and helpers
│   ├── types.ts                    # TypeScript interfaces
│   ├── content.ts                  # Content accessors
│   ├── utils.ts                    # Utility functions (cn, etc.)
│   └── api/                        # API client functions
│       ├── formspree.ts
│       └── convertkit.ts
├── public/                         # Static assets
│   ├── images/
│   │   ├── hero-illustration.svg
│   │   ├── results/                # Dashboard screenshots
│   │   └── team/                   # Team photos
│   ├── fonts/                      # Self-hosted fonts (if needed)
│   └── favicon.ico
├── styles/                         # Additional styles (if needed)
│   └── (empty - using Tailwind)
├── tests/                          # Test files
│   ├── components/                 # Component unit tests
│   ├── e2e/                        # Playwright E2E tests
│   └── setup.ts                    # Test setup
├── docs/                           # Documentation
│   ├── prd.md
│   └── architecture.md
├── .env.example                    # Environment variable template
├── .env.local                      # Local env vars (git ignored)
├── .eslintrc.json                  # ESLint configuration
├── .gitignore
├── .prettierrc                     # Prettier configuration
├── components.json                 # shadcn/ui configuration
├── next.config.js                  # Next.js configuration
├── package.json
├── postcss.config.js               # PostCSS for Tailwind
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.ts                # Vitest configuration
├── playwright.config.ts            # Playwright configuration
└── README.md
```
