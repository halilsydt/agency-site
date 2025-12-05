# Agency Site

Marketing website for an Amazon/Etsy seller services agency. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd agency-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:3000 |
| `npm run build` | Build for production (static export) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Project Structure

```
agency-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles + Tailwind
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Header, Footer, Container
│   ├── sections/           # Page sections
│   ├── cards/              # Card components
│   └── forms/              # Form components
├── content/                # JSON content files
│   ├── services/           # Service definitions
│   └── pricing/            # Pricing data
├── lib/                    # Utilities and helpers
│   ├── types.ts            # TypeScript interfaces
│   ├── content.ts          # Content accessors
│   ├── utils.ts            # Utility functions
│   └── api/                # API client functions
├── public/                 # Static assets
│   ├── images/             # Image files
│   └── fonts/              # Font files
├── tests/                  # Test files
│   ├── components/         # Component tests
│   └── e2e/                # End-to-end tests
└── docs/                   # Documentation
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui |
| Form Handling | Formspree |
| Booking | Cal.com |
| Analytics | Plausible |

## Development

```bash
# Start development server with hot reload
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
