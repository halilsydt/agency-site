# Backup and Recovery Documentation

## Deployment Configuration

### Platform
- **Hosting:** Vercel
- **Domain:** scalenty.net (with www redirect)
- **SSL:** Let's Encrypt (auto-renewed by Vercel)
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (automatic)
- **CDN:** Vercel Edge Network (automatic)

### Current Domain Configuration
- Primary: `https://www.scalenty.net`
- Apex redirect: `scalenty.net` → `www.scalenty.net`
- HTTP → HTTPS redirect enabled
- SSL certificate issued by Let's Encrypt (R13)

## Environment Variables

All environment variables are configured in Vercel project settings.

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact form submission endpoint | Yes |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking embed (format: username/event-type) | Yes |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain (without https://) | Yes |
| `NEXT_PUBLIC_COOKIE_CONSENT_ENABLED` | Enable/disable cookie banner | Optional (default: true) |

**Note:** Never commit actual values to git. Use Vercel dashboard or `.env.local` for local development.

## Vercel Project Settings

### Build & Development
- Framework Preset: Next.js
- Node.js Version: 18.x
- Build Command: `npm run build`
- Install Command: `npm install`

### Custom Headers (via next.config.mjs)
- Static assets: 1-year cache (`max-age=31536000, immutable`)
- `poweredByHeader: false` for security

### Domain Configuration
- Custom domain: scalenty.net
- www subdomain: www.scalenty.net (primary)
- DNS: Configured via Vercel nameservers or A/CNAME records

## Rollback Procedures

### Via Vercel Dashboard
1. Log into Vercel dashboard
2. Navigate to project → Deployments
3. Find the previous working deployment
4. Click "..." menu → "Promote to Production"
5. Confirm the rollback

### Via Git Revert
```bash
# View recent commits
git log --oneline -10

# Revert to specific commit (creates new commit)
git revert <commit-hash>
git push origin main

# OR reset to previous commit (destructive - use with caution)
git reset --hard <commit-hash>
git push --force origin main
```

### Via Vercel CLI
```bash
# List deployments
vercel ls

# Promote specific deployment to production
vercel promote <deployment-url>
```

## Third-Party Service Credentials

### Formspree
- **Purpose:** Contact form submissions
- **Dashboard:** https://formspree.io/
- **Account Owner:** [Document owner email]
- **Recovery:** Reset password via registered email

### Cal.com
- **Purpose:** Free consultation booking
- **Dashboard:** https://app.cal.com/
- **Account Owner:** [Document owner email]
- **Recovery:** Reset password via registered email

### Plausible Analytics
- **Purpose:** Privacy-friendly website analytics
- **Dashboard:** https://plausible.io/
- **Account Owner:** [Document owner email]
- **Recovery:** Reset password via registered email

### Google Search Console
- **Purpose:** SEO monitoring and sitemap submission
- **Dashboard:** https://search.google.com/search-console
- **Verified Domain:** scalenty.net
- **Verification Method:** HTML meta tag in layout.tsx
- **Account Owner:** [Document owner Google account]

### Vercel
- **Purpose:** Hosting and deployment
- **Dashboard:** https://vercel.com/
- **Account Owner:** [Document owner email]
- **Recovery:** Reset password via registered email

## Disaster Recovery Checklist

### If Site is Down
1. Check Vercel status page: https://www.vercel-status.com/
2. Check Vercel dashboard for deployment errors
3. If recent deployment caused issue, rollback via dashboard
4. Check DNS propagation: https://dnschecker.org/
5. Verify SSL certificate validity

### If Third-Party Service Fails
- **Formspree down:** Contact form shows error; users can email directly
- **Cal.com down:** Booking embed shows fallback message
- **Plausible down:** Analytics stops collecting (no user impact)

### Data Recovery
- **Code:** All code stored in Git repository
- **Content:** JSON files in `/content` directory (in Git)
- **Images:** Static files in `/public` directory (in Git)
- **Environment Variables:** Backed up in password manager / Vercel dashboard

## Maintenance Contacts

| Role | Contact | Responsibility |
|------|---------|----------------|
| Site Owner | [Owner email] | Business decisions, content updates |
| Technical Lead | [Tech lead email] | Code changes, deployments |
| Vercel Account | [Account holder] | Hosting, domain management |

---

*Last Updated: December 7, 2025*
