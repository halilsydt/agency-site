# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# Required
node >= 18.17.0
npm >= 9.0.0

# Recommended
git >= 2.40.0
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/{org}/agency-site.git
cd agency-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your API keys:
# - NEXT_PUBLIC_FORMSPREE_ENDPOINT
# - NEXT_PUBLIC_CONVERTKIT_FORM_ID
# - NEXT_PUBLIC_CONVERTKIT_API_KEY
# - NEXT_PUBLIC_CAL_USERNAME
# - NEXT_PUBLIC_PLAUSIBLE_DOMAIN

# Start development server
npm run dev
```

### Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Format code
npm run format

# Check formatting
npm run format:check
```

## Environment Configuration

### Required Environment Variables

```bash
# .env.local (local development)
# .env.production (production - set in Vercel dashboard)

# ============================================
# Third-Party Service Configuration
# ============================================

# Formspree - Contact form endpoint
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# ConvertKit - Email signup
NEXT_PUBLIC_CONVERTKIT_FORM_ID=your-form-id
NEXT_PUBLIC_CONVERTKIT_API_KEY=your-public-api-key

# Cal.com - Booking calendar
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
NEXT_PUBLIC_CAL_EVENT_TYPE=consultation

# Plausible - Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# ============================================
# Optional / Development
# ============================================

# Enable analytics in development (default: false)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Git Workflow

```bash
# Feature development
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Create PR → Review → Merge to main

# Main branch triggers production deploy automatically
```
