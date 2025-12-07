import { Container } from "@/components/layout/container";

/**
 * Props for the AboutHero component.
 */
export interface AboutHeroProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline: string;
}

/**
 * Hero section for the About page.
 * Displays a centered headline and subheadline with a welcoming design.
 *
 * @param props - AboutHero component props
 * @param props.headline - Main headline text displayed as h1
 * @param props.subheadline - Supporting text below the headline
 *
 * @example
 * ```tsx
 * <AboutHero
 *   headline="About Us"
 *   subheadline="We help marketplace sellers succeed."
 * />
 * ```
 */
export function AboutHero({
  headline,
  subheadline,
}: AboutHeroProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-transparent">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            {subheadline}
          </p>
        </div>
      </Container>
    </section>
  );
}
