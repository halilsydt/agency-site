# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (handled automatically)
- **CDN/Edge:** Vercel Edge Network (automatic)

**Backend Deployment:**
- **Platform:** N/A — No custom backend
- **Third-Party Services:** Formspree, ConvertKit, Cal.com, Plausible (managed externally)

## CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type check
        run: npm run typecheck

      - name: Run unit tests
        run: npm run test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
          NEXT_PUBLIC_CONVERTKIT_FORM_ID: ${{ secrets.CONVERTKIT_FORM_ID }}
          NEXT_PUBLIC_CONVERTKIT_API_KEY: ${{ secrets.CONVERTKIT_API_KEY }}
          NEXT_PUBLIC_CAL_USERNAME: ${{ secrets.CAL_USERNAME }}
          NEXT_PUBLIC_PLAUSIBLE_DOMAIN: ${{ secrets.PLAUSIBLE_DOMAIN }}

  e2e:
    runs-on: ubuntu-latest
    needs: lint-and-test

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
          NEXT_PUBLIC_CONVERTKIT_FORM_ID: ${{ secrets.CONVERTKIT_FORM_ID }}
          NEXT_PUBLIC_CONVERTKIT_API_KEY: ${{ secrets.CONVERTKIT_API_KEY }}
          NEXT_PUBLIC_CAL_USERNAME: ${{ secrets.CAL_USERNAME }}
          NEXT_PUBLIC_PLAUSIBLE_DOMAIN: ${{ secrets.PLAUSIBLE_DOMAIN }}
```

## Environments

| Environment | URL | Purpose | Deploy Trigger |
|-------------|-----|---------|----------------|
| Development | http://localhost:3000 | Local development | `npm run dev` |
| Preview | https://{branch}.agency-site.vercel.app | PR preview | Push to any branch |
| Production | https://yourdomain.com | Live environment | Push to `main` |

## Vercel Configuration

```json
// vercel.json (optional - zero-config works)

{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```
