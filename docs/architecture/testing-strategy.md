# Testing Strategy

## Testing Pyramid

```
        ┌─────────────┐
        │   E2E (5%)  │  ← Critical paths only
        ├─────────────┤
        │Integration  │  ← Page rendering (20%)
        │   Tests     │
        ├─────────────┤
        │    Unit     │  ← Components + Utils (75%)
        │    Tests    │
        └─────────────┘
```

## Test Organization

### Frontend Tests (Vitest + Testing Library)

```
tests/
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   └── accordion.test.tsx
│   ├── layout/
│   │   ├── header.test.tsx
│   │   └── footer.test.tsx
│   ├── sections/
│   │   └── hero.test.tsx
│   ├── cards/
│   │   ├── service-card.test.tsx
│   │   └── pricing-card.test.tsx
│   └── forms/
│       ├── contact-form.test.tsx
│       └── email-signup-form.test.tsx
├── lib/
│   ├── content.test.ts
│   └── utils.test.ts
└── setup.ts
```

### E2E Tests (Playwright)

```
tests/
└── e2e/
    ├── homepage.spec.ts       # Homepage loads, CTAs work
    ├── navigation.spec.ts     # All nav links work
    ├── contact-form.spec.ts   # Form submission flow
    └── booking.spec.ts        # Calendar embed loads
```

## Test Examples

### Frontend Component Test

```typescript
// tests/components/cards/service-card.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ServiceCard } from '@/components/cards/service-card';

const mockService = {
  id: 'account-setup',
  platform: 'amazon' as const,
  title: 'Account Setup',
  description: 'Get your Amazon seller account configured correctly.',
  icon: 'user-plus',
  features: ['Account verification', 'Initial settings'],
};

describe('ServiceCard', () => {
  it('renders service title and description', () => {
    render(<ServiceCard service={mockService} />);

    expect(screen.getByText('Account Setup')).toBeInTheDocument();
    expect(screen.getByText(/Amazon seller account/)).toBeInTheDocument();
  });

  it('renders learn more button', () => {
    render(<ServiceCard service={mockService} />);

    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });
});
```

### Form Test

```typescript
// tests/components/forms/contact-form.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ContactForm } from '@/components/forms/contact-form';

describe('ContactForm', () => {
  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockResolvedValue({ ok: true });

    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/platform/i), 'amazon');
    await user.type(screen.getByLabelText(/message/i), 'I need help with my store.');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        platform: 'amazon',
        message: 'I need help with my store.',
      });
    });
  });
});
```

### E2E Test

```typescript
// tests/e2e/contact-form.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/contact');

    // Fill form
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/platform/i).selectOption('amazon');
    await page.getByLabel(/message/i).fill('Test message');

    // Mock Formspree response
    await page.route('**/formspree.io/**', route => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    // Submit
    await page.getByRole('button', { name: /send/i }).click();

    // Verify success
    await expect(page.getByText(/thank you/i)).toBeVisible();
  });

  test('shows error on submission failure', async ({ page }) => {
    await page.goto('/contact');

    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/platform/i).selectOption('etsy');
    await page.getByLabel(/message/i).fill('Test message');

    // Mock failure
    await page.route('**/formspree.io/**', route => {
      route.fulfill({ status: 500 });
    });

    await page.getByRole('button', { name: /send/i }).click();

    await expect(page.getByText(/error|failed/i)).toBeVisible();
  });
});
```
