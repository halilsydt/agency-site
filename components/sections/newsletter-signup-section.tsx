import { Container } from "@/components/layout/container";
import { EmailSignupForm } from "@/components/forms/email-signup-form";

/**
 * Props for the NewsletterSignupSection component.
 */
export interface NewsletterSignupSectionProps {
  /** Section headline */
  headline: string;
  /** Supporting description text */
  subheadline: string;
}

/**
 * Newsletter signup section with centered form.
 * Displays opt-in form for email updates with introductory text.
 *
 * @param props - Component props
 *
 * @example
 * ```tsx
 * <NewsletterSignupSection
 *   headline="Stay Updated"
 *   subheadline="Get tips delivered to your inbox."
 * />
 * ```
 */
export function NewsletterSignupSection({
  headline,
  subheadline,
}: NewsletterSignupSectionProps): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
          <div className="mt-8">
            <EmailSignupForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
