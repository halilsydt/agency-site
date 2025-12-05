# Backend Architecture

**This section is largely N/A** — there is no custom backend. However, we document the "backend equivalent" infrastructure.

## Service Architecture

### Serverless Architecture (Via Third Parties)

There is no custom serverless architecture. All "backend" functionality is delegated:

| Function | "Backend" Provider | Our Code |
|----------|-------------------|----------|
| Form Processing | Formspree | POST to endpoint |
| Email Delivery | Formspree + ConvertKit | Managed by services |
| Calendar/Booking | Cal.com | Embed component |
| Analytics Processing | Plausible | Script tag |
| Static Hosting | Vercel Edge | Build output |

### Function Organization

```
N/A — No custom backend functions

If future needs arise, Next.js API routes could be added:

app/
└── api/
    └── (future endpoints here)
```

## Database Architecture

**N/A** — No database. See "Database Schema" section for file-based content approach.

## Authentication and Authorization

**N/A** — Public marketing site with no user accounts or protected content.

If authentication were needed in the future:
- Next-Auth would be the recommended solution
- Integrate with Cal.com API for booking management
- Add protected `/admin` routes if CMS needed
