# Frontend Architecture

## Component Architecture

### Component Organization

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (primitives)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── sheet.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── form.tsx
│   │   └── ...
│   ├── layout/                # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── container.tsx
│   ├── sections/              # Page section components
│   │   ├── hero.tsx
│   │   ├── services-overview.tsx
│   │   ├── how-it-works.tsx
│   │   ├── why-choose-us.tsx
│   │   ├── results-gallery.tsx
│   │   ├── testimonials.tsx
│   │   ├── pricing-preview.tsx
│   │   └── faq-preview.tsx
│   ├── cards/                 # Reusable card components
│   │   ├── service-card.tsx
│   │   ├── pricing-card.tsx
│   │   └── testimonial-card.tsx
│   └── forms/                 # Form components
│       ├── contact-form.tsx
│       ├── email-signup-form.tsx
│       └── calendar-embed.tsx
```

### Component Template

```typescript
// components/cards/service-card.tsx

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Service } from '@/lib/types';

/**
 * Props for the ServiceCard component.
 */
interface ServiceCardProps {
  /** The service to display */
  service: Service;
}

/**
 * Displays a service offering in a card format.
 * Used on homepage services overview and platform-specific service pages.
 *
 * @param props - Component props
 * @param props.service - The service data to display
 *
 * @example
 * ```tsx
 * <ServiceCard service={amazonServices[0]} />
 * ```
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="w-12 h-12 mb-4">
          {/* Icon component */}
        </div>
        <h3 className="text-xl font-semibold">{service.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## State Management Architecture

### State Structure

```typescript
// No global state store needed for MVP
// Local component state handles:
// - Mobile menu open/close
// - Accordion expanded states
// - Form input values
// - Form submission status

// Example: Form submission state
interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
}

// Example: Mobile nav state
interface MobileNavState {
  isOpen: boolean;
}
```

### State Management Patterns

- **Local state (useState)** for UI interactions (menu, accordion, modals)
- **Form state (React Hook Form)** for all forms with Zod validation
- **No global store** — No complex state sharing requirements
- **URL state** — Active page derived from Next.js router
- **Server state** — N/A (no data fetching; all content is static)

## Routing Architecture

### Route Organization

```
app/
├── layout.tsx              # Root layout (Header + Footer)
├── page.tsx                # Homepage (/)
├── services/
│   ├── amazon/
│   │   └── page.tsx        # Amazon Services (/services/amazon)
│   └── etsy/
│       └── page.tsx        # Etsy Services (/services/etsy)
├── pricing/
│   └── page.tsx            # Pricing (/pricing)
├── about/
│   └── page.tsx            # About Us (/about)
├── contact/
│   └── page.tsx            # Contact (/contact)
├── faq/
│   └── page.tsx            # FAQ (/faq)
├── privacy/
│   └── page.tsx            # Privacy Policy (/privacy)
└── terms/
    └── page.tsx            # Terms of Service (/terms)
```

### Protected Route Pattern

**N/A** — No protected routes; this is a public marketing site with no authentication.

## Frontend Services Layer

### API Client Setup

```typescript
// lib/api/formspree.ts

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!;

/**
 * Contact form data structure.
 */
export interface ContactFormData {
  /** Visitor's full name */
  name: string;
  /** Visitor's email address */
  email: string;
  /** Platform they're interested in */
  platform: 'amazon' | 'etsy' | 'both';
  /** Their message or inquiry */
  message: string;
}

/**
 * Submits contact form data to Formspree.
 * Handles network errors and returns a standardized response.
 *
 * @param data - The validated contact form data
 * @returns Promise resolving to success/error response
 *
 * @example
 * ```ts
 * const result = await submitContactForm({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   platform: 'amazon',
 *   message: 'I need help with my store.'
 * });
 *
 * if (result.ok) {
 *   showSuccessMessage();
 * } else {
 *   showError(result.error);
 * }
 * ```
 */
export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return { ok: false, error: error.error || 'Submission failed' };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}
```

### Service Example

```typescript
// lib/api/convertkit.ts

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID!;
const CONVERTKIT_API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY!;

/**
 * Subscribes an email address to the newsletter via ConvertKit.
 *
 * @param email - The email address to subscribe
 * @returns Promise resolving to success/error response
 *
 * @example
 * ```ts
 * const result = await subscribeToNewsletter('user@example.com');
 * if (result.ok) {
 *   showThankYouMessage();
 * }
 * ```
 */
export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
        }),
      }
    );

    if (!response.ok) {
      return { ok: false, error: 'Subscription failed' };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}
```
