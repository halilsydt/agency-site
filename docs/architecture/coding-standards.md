# Coding Standards

## Critical Fullstack Rules

- **Type Everything:** All functions must have explicit TypeScript types; no `any` usage
- **Content via Accessors:** Never import JSON content directly; use `lib/content.ts` functions
- **Environment Variables:** Access only through `process.env.NEXT_PUBLIC_*`; never hardcode endpoints
- **Component Props:** All components must have typed props interfaces
- **Form Validation:** All forms use Zod schemas; no manual validation logic
- **Image Handling:** All images via `next/image`; never use raw `<img>` tags
- **API Calls:** All third-party calls via `lib/api/*` functions; never inline fetch in components
- **Accessibility:** All interactive elements must be keyboard accessible; use shadcn/ui components
- **No Console Logs:** Remove all `console.log` before merging; use proper error handling
- **JSDoc Documentation:** All public functions, interfaces, types, and components MUST have JSDoc comments

## JSDoc Documentation Standards

**All public-facing code must include JSDoc comments.** This is critical for AI agent comprehension and codebase maintainability.

### Required JSDoc Coverage

| Element | Required | Example |
|---------|----------|---------|
| Public functions | ✅ Yes | Exported utility functions, API clients |
| Public interfaces/types | ✅ Yes | All types in `lib/types.ts` |
| React components | ✅ Yes | All components in `components/` |
| Component props interfaces | ✅ Yes | Props type definitions |
| Hooks | ✅ Yes | Custom hooks |
| Constants | ✅ When non-obvious | Exported constants with meaning |
| Private/internal functions | Optional | Document if complex |

### JSDoc Format Examples

**Interfaces and Types:**

```typescript
/**
 * Represents a service offering for Amazon or Etsy sellers.
 * Used throughout the site for service cards, listings, and detail pages.
 */
export interface Service {
  /** Unique identifier for the service */
  id: string;
  /** Target marketplace platform */
  platform: 'amazon' | 'etsy';
  /** Display title for the service */
  title: string;
  /** Brief description shown on service cards */
  description: string;
  /** Icon name from the icon library */
  icon: string;
  /** List of features included in this service */
  features: string[];
}
```

**Utility Functions:**

```typescript
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
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse> {
  // implementation
}
```

**React Components:**

```typescript
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
  // implementation
}

/**
 * Props for the ServiceCard component.
 */
interface ServiceCardProps {
  /** The service to display */
  service: Service;
}
```

**Custom Hooks:**

```typescript
/**
 * Manages contact form state and submission logic.
 * Provides form methods, submission status, and error handling.
 *
 * @returns Form control object with methods and state
 *
 * @example
 * ```tsx
 * function ContactPage() {
 *   const { form, status, errorMessage, onSubmit } = useContactForm();
 *
 *   return (
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       {status === 'error' && <Alert>{errorMessage}</Alert>}
 *       ...
 *     </form>
 *   );
 * }
 * ```
 */
export function useContactForm() {
  // implementation
}
```

### JSDoc Best Practices

- **Be concise but complete** — Describe what, not how (implementation is visible)
- **Include `@example`** — For functions/components with non-obvious usage
- **Document parameters** — Use `@param` for all function parameters
- **Document return values** — Use `@returns` for non-void functions
- **Use inline comments for properties** — `/** Description */` above or inline with interface properties
- **Skip obvious getters** — Don't document `getName()` if the name says it all
- **Update when code changes** — Stale docs are worse than no docs

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ServiceCard.tsx` |
| Component files | PascalCase or kebab | `service-card.tsx` |
| Hooks | camelCase with 'use' | `useContactForm.ts` |
| Utilities | camelCase | `formatPrice.ts` |
| Types/Interfaces | PascalCase | `Service`, `PricingPackage` |
| Constants | SCREAMING_SNAKE | `MAX_TESTIMONIALS` |
| CSS classes | Tailwind utilities | `className="flex items-center"` |
| Content files | kebab-case | `amazon-services.json` |
| Routes | kebab-case | `/services/amazon` |

## File Organization Rules

- **One component per file** — Exception: small, tightly coupled sub-components
- **Index files for folders** — Use `index.ts` to re-export from component folders
- **Co-locate tests** — OR put in `tests/` with matching structure (we chose the latter)
- **Co-locate styles** — N/A; using Tailwind utility classes

## Code Style

```typescript
// ✅ Good: Typed, using content accessor, proper imports, JSDoc
import { getAmazonServices } from '@/lib/content';
import { ServiceCard } from '@/components/cards/service-card';
import type { Service } from '@/lib/types';

/**
 * Displays the Amazon services page with all Amazon-specific offerings.
 */
export function AmazonServicesPage() {
  const services: Service[] = getAmazonServices();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

// ❌ Bad: Direct import, no types, inline styles, no JSDoc
import amazonServices from '../../content/services/amazon.json';

export function AmazonServicesPage() {
  return (
    <div style={{ padding: '4rem' }}>
      {amazonServices.map((s) => (
        <div>{s.title}</div>
      ))}
    </div>
  );
}
```
